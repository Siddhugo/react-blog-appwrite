// pages/AllPosts.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";

function AllPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const fetchMyPosts = async () => {
      if (!userData) {
        setError("You must be logged in to see your posts.");
        setLoading(false);
        return;
      }
      try {
        // Fetch all posts by current user (no status filter)
        const data = await appwriteService.getUserPosts(userData.$id);
        setPosts(data?.documents || []);
      } catch (err) {
        setError(err?.message || "Failed to fetch your posts");
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, [userData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading your posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Posts</h1>
          <p className="text-gray-600 mt-2">
            All your posts (including drafts). Click on any post to edit.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard
                key={post.$id}
                $id={post.$id}
                title={post.title}
                slug={post.slug}
                featuredImage={post.featuredImage}
                status={post.status} // optional: you could show a badge
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-10">
            You haven't created any posts yet.
          </p>
        )}
      </Container>
    </div>
  );
}

export default AllPost;