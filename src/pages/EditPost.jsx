import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";

const EditPost = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        navigate("/");
        return;
      }
      try {
        const data = await appwriteService.getPostBySlug(slug);
        if (!data) {
          setError("Post not found");
          return;
        }
        setPost(data);
      } catch (err) {
        setError(err?.message || "Failed to fetch post");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <Container>
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </Container>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <Container>
          <p className="text-red-500 text-center">{error || "Post not found"}</p>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Edit Post</h1>
          <p className="text-gray-600 mt-2">Make changes to your post below.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
          <PostForm post={post} />
        </div>
      </Container>
    </div>
  );
};

EditPost.propTypes = {};

export default EditPost;