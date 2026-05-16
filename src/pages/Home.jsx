import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import SearchBar from '../components/SearchBar';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await appwriteService.getPosts();
        const postsData = data?.documents || [];
        setPosts(postsData);
        setFilteredPosts(postsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  };

  // Then render SearchBar and filteredPosts
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero section ... */}
      <Container>
        <div className="py-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Latest Posts</h2>
            <SearchBar onSearch={handleSearch} />
          </div>
          {filteredPosts.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-10">
              {searchQuery ? 'No posts match your search.' : 'No posts yet.'}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPosts.map(post => <PostCard key={post.$id} {...post} />)}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Home;