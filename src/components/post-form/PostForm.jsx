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
    watch,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
      image: null,
    },
  });

  // ✅ CORRECT slug transformation (full title to slug)
  const slugTransform = useCallback((title) => {
    if (!title || typeof title !== "string") return "";
    return title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")  // remove special chars
      .replace(/\s+/g, "-")           // replace spaces with hyphens
      .replace(/-+/g, "-")            // replace multiple hyphens with single
      .replace(/^-|-$/g, "");         // trim hyphens from ends
  }, []);

  // Auto-generate slug when title input loses focus (onBlur)
  const handleTitleBlur = (e) => {
    const title = e.target.value;
    const currentSlug = getValues("slug");
    // Only auto-generate if slug is empty or still matches previous auto value
    if (!currentSlug || currentSlug === slugTransform(getValues("title"))) {
      const newSlug = slugTransform(title);
      setValue("slug", newSlug, { shouldValidate: true });
    }
  };

  // Image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
    trigger("image");
  };

  // Submit handler
  const submit = async (data) => {
    setLoading(true);
    try {
      // Ensure slug is never empty
      let finalSlug = data.slug?.trim();
      if (!finalSlug) {
        finalSlug = slugTransform(data.title);
        setValue("slug", finalSlug);
      }

      let featuredImageId = post?.featuredImage || null;

      // Upload new image if selected
      if (data.image && data.image[0]) {
        const file = await appwriteService.uploadFile(data.image[0]);
        if (file) {
          featuredImageId = file.$id;
          // Delete old image if editing
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
        dbPost = await appwriteService.updatePost(post.$id, payload);
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
      if (imagePreview) URL.revokeObjectURL(imagePreview);
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
          <label className="block mb-1 font-medium text-gray-700">
            Featured Image {!post && <span className="text-red-500">*</span>}
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full px-3 py-2 border rounded-lg"
            {...register("image", {
              required: !post && "Featured image is required",
            })}
            onChange={handleImageChange}
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* Image preview */}
        {(imagePreview || post?.featuredImage) && (
          <div className="mt-2">
            <p className="text-sm font-medium text-gray-700 mb-1">Preview:</p>
            <img
              src={imagePreview || appwriteService.getFilePreview(post.featuredImage)}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg shadow-sm border"
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