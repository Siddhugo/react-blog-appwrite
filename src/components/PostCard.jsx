import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";

const PostCard = ({ $id, title, featuredImage, slug }) => {
  const imageUrl = featuredImage
    ? appwriteService.getFilePreview(featuredImage).toString()
    : "https://placehold.co/600x400?text=No+Image"; // free placeholder

  return (
    <Link to={`/post/${slug}`} className="block h-full group">
      <div className="h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-200 dark:border-gray-700">
        <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              e.target.src = "https://placehold.co/600x400?text=Failed+Load";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2 mb-2">
            {title}
          </h2>
          <div className="mt-auto pt-2">
            <span className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium">
              Read more
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;