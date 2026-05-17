import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import { Button, Container } from "../components";
import appwriteService from "../appwrite/config";

const Post = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  // Helper to format Appwrite datetime to a readable string
  const formatDate = (datetime) => {
    if (!datetime) return "Unknown date";
    const date = new Date(datetime);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return navigate("/");
      try {
        const data = await appwriteService.getPostBySlug(slug);
        if (!data) return navigate("/");
        setPost(data);
      } catch (error) {
        console.error("Post fetch error:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug, navigate]);

  const deletePost = async () => {
    if (!post) return;
    const status = await appwriteService.deletePost(post.$id);
    if (status) {
      if (post.featuredImage) await appwriteService.deleteFile(post.featuredImage);
      navigate("/");
    }
  };

  const isAuthor = post && userData && post.userId === userData.$id;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
        <Container>
          <div className="animate-pulse space-y-6">
            <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (!post) return null;

  const imageUrl = post.featuredImage
    ? appwriteService.getFilePreview(post.featuredImage).toString()
    : "/placeholder-image.jpg";

  return (
    <div className="py-8 min-h-screen bg-gray-50 dark:bg-gray-900">
      <Container>
        <div className="relative w-full mb-6 border rounded-xl overflow-hidden shadow">
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full h-80 object-cover"
            loading="lazy"
          />
          {isAuthor && (
            <div className="absolute top-4 right-4 flex space-x-2">
              <Link to={`/edit-post/${post.slug}`}>
                <Button bgColor="bg-green-500">Edit</Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>

        {/* Title + Timestamps */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
            {post.title}
          </h1>
          <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
            <p>📅 Published: {formatDate(post.$createdAt)}</p>
            {post.$updatedAt !== post.$createdAt && (
              <p>✏️ Last edited: {formatDate(post.$updatedAt)}</p>
            )}
          </div>
        </div>

        {/* Post content */}
        <div className="prose max-w-full dark:prose-invert">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  );
};

export default Post;