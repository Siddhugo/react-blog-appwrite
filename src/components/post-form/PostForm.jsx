import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";

const PostForm = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
      image: null,
    },
  });

  // Slug generator
  const slugTransform = useCallback((title) => {
    if (!title || typeof title !== "string") return "";
    return title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }, []);

  // Auto‑slug on title blur
  const handleTitleBlur = (e) => {
    const title = e.target.value;
    const currentSlug = getValues("slug");
    if (!currentSlug || currentSlug === slugTransform(getValues("title"))) {
      setValue("slug", slugTransform(title), { shouldValidate: true });
    }
  };

  // Image preview handling
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
    trigger("image");
  };

  // Pre‑fill preview when editing existing post
  useEffect(() => {
    if (post?.featuredImage) {
      setImagePreview(appwriteService.getFilePreview(post.featuredImage));
    }
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [post]);

  // Submit handler
  const submit = async (data) => {
    console.log("Current userData:", userData);
  console.log("User ID:", userData?.$id)
    setLoading(true);
    try {
      let finalSlug = data.slug?.trim();
      if (!finalSlug) {
        finalSlug = slugTransform(data.title);
        setValue("slug", finalSlug);
      }

      let featuredImageId = post?.featuredImage || null;

      if (data.image && data.image[0]) {
        const file = await appwriteService.uploadFile(data.image[0]);
        if (file) {
          featuredImageId = file.$id;
          if (post?.featuredImage) {
            await appwriteService.deleteFile(post.featuredImage);
          }
        }
      }

      const payload = {
        title: data.title,
        slug: finalSlug,
        content: data.content,
        status: data.status,
        featuredImage: featuredImageId,
      };

      let dbPost;
      if (post) {
        dbPost = await appwriteService.updatePost(post.$id, payload, userData.$id);
      } else {
        dbPost = await appwriteService.createPost({
          ...payload,
          userId: userData.$id,
        });
      }

      if (dbPost) {
        navigate(`/post/${finalSlug}`);
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap -mx-2">
      <div className="w-full md:w-2/3 px-2 space-y-4">
        <Input
          label="Title*"
          placeholder="Post title"
          {...register("title", {
            required: "Title is required",
            minLength: { value: 3, message: "Minimum 3 characters" },
          })}
          error={errors.title?.message}
          onBlur={handleTitleBlur}
        />

        <Input
          label="Slug (URL)*"
          placeholder="url-friendly-slug"
          {...register("slug", {
            required: "Slug is required",
            pattern: {
              value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
              message: "Use only lowercase letters, numbers, and hyphens",
            },
          })}
          error={errors.slug?.message}
        />

        <RTE
          label="Content*"
          name="content"
          control={control}
          defaultValue={getValues("content")}
          rules={{ required: "Content is required" }}
          error={errors.content?.message}
        />
      </div>

      <div className="w-full md:w-1/3 px-2 space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
            Featured Image {!post && <span className="text-red-500">*</span>}
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
            {...register("image", {
              required: !post && "Featured image is required",
            })}
            onChange={handleImageChange}
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        {(imagePreview || post?.featuredImage) && (
          <div className="mt-2">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preview:</p>
            <img
              src={imagePreview || appwriteService.getFilePreview(post.featuredImage)}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg shadow-sm border dark:border-gray-600"
            />
          </div>
        )}

        <Select
          label="Status"
          options={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
          ]}
          {...register("status", { required: "Status is required" })}
          error={errors.status?.message}
        />

        <Button
          type="submit"
          className="w-full"
          loading={loading}
          disabled={loading}
        >
          {post ? "Update Post" : "Create Post"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;