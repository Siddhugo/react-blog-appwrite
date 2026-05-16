import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";

const PostCard = ({ $id, title, featuredImage, slug }) => {
  const imageUrl = featuredImage
    ? appwriteService.getFilePreview(featuredImage).toString()
    : "/placeholder-image.jpg";

  return (
    <Link to={`/post/${slug}`} className="block h-full group">
      <div className="h-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 line-clamp-2 mb-2">
            {title}
          </h2>
          <div className="mt-auto pt-2">
            <span className="inline-flex items-center text-sm text-blue-500 font-medium">
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