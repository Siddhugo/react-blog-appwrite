import React from "react";
import PropTypes from "prop-types";

const Button = React.forwardRef(
  (
    {
      children,
      type = "button",
      bgColor = "bg-blue-600",
      textColor = "text-white",
      size = "md",
      rounded = "md",
      loading = false,
      className = "",
      disabled = false,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "px-3 py-1 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };
    const roundedClasses = {
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    };
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={`
          ${sizeClasses[size]} 
          ${roundedClasses[rounded]} 
          ${bgColor} ${textColor} 
          hover:opacity-90 
          focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400
          transition duration-200 
          disabled:opacity-50 disabled:cursor-not-allowed
          dark:focus:ring-offset-gray-800
          ${className}
        `}
        {...props}
      >
        {loading ? "Loading..." : children}
      </button>
    );
  }
);

Button.displayName = "Button";

Button.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  rounded: PropTypes.oneOf(["sm", "md", "lg", "full"]),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;