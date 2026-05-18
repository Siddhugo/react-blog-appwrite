import React from "react";
import PropTypes from "prop-types";

const Logo = ({ width = "120px", height = "auto", className = "" }) => {
  return (
    <div
      style={{ width, height }}
      className={`flex items-center gap-2 ${className}`}
      aria-label="Logo"
    >
      <svg
        viewBox="0 0 40 40"
        className="w-8 h-8 text-blue-600 dark:text-blue-400"
        fill="currentColor"
        aria-hidden="true"
      >
        <circle cx="20" cy="20" r="18" className="opacity-20" />
        <path d="M12 20L18 26L28 14" stroke="currentColor" strokeWidth="3" fill="none" />
      </svg>
      <span className="text-xl font-bold text-gray-800 dark:text-white tracking-wide">
        DevApp
      </span>
    </div>
  );
};

Logo.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
};

export default Logo;