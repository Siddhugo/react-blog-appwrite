import React from "react";

const Spinner = ({ size = "md", color = "blue" }) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };
  const colorClasses = {
    blue: "border-blue-600 dark:border-blue-400",
    white: "border-white",
    gray: "border-gray-600 dark:border-gray-400",
  };
  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-t-2 border-b-2 ${colorClasses[color]} ${sizeClasses[size]}`}
      />
    </div>
  );
};

export default Spinner;