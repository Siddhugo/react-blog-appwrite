import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";

function PostCard({ $id, title, featuredImage, slug }) {  // add slug prop
  const imageUrl = featuredImage
    ? appwriteService.getFilePreview(featuredImage).toString()
    : "/placeholder-image.jpg";

  return (
    <Link to={`/post/${slug}`} className="block group">
      <div className="w-full bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100">
        <div className="w-full h-60 overflow-hidden relative">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 line-clamp-2">
            {title}
          </h2>
          <div className="mt-4 flex items-center text-blue-500 font-medium text-sm">
            Read Article
            <span className="ml-2 group-hover:translate-x-2 transition-transform">
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;