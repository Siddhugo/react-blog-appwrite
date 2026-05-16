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
      <div className="min-h-screen bg-gray-50 py-10">
        <Container>
          <div className="animate-pulse space-y-6">
            <div className="h-80 bg-gray-200 rounded-xl"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
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
    <div className="py-8 min-h-screen bg-gray-50">
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
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="prose max-w-full">{parse(post.content)}</div>
      </Container>
    </div>
  );
};

export default Post;