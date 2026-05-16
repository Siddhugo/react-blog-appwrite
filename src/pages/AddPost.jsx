import React from "react";
import { Container, PostForm } from "../components";
import PropTypes from "prop-types";

const AddPost = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Create New Post</h1>
          <p className="text-gray-600 mt-2">
            Fill in the details below to publish a new blog post.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
          <PostForm />
        </div>
      </Container>
    </div>
  );
};

AddPost.propTypes = {}; // no props

export default AddPost;