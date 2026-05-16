import React from "react";
import PropTypes from "prop-types";

/**
 * Reusable Container Component
 * - Centers content horizontally
 * - Responsive max-width and padding
 * - Supports custom className and forwardRef
 */
const Container = React.forwardRef(
  (
    {
      children,
      className = "",
      size = "xl", // sm | md | lg | xl | full
      padding = true,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "max-w-md",
      md: "max-w-3xl",
      lg: "max-w-5xl",
      xl: "max-w-7xl",
      full: "max-w-full",
    };

    const paddingClass = 
      padding === true ? "px-4 sm:px-6 lg:px-8" :
      padding === false ? "" :
      `px-${padding}`; // allow custom padding like "px-2"

    return (
      <div
        ref={ref}
        className={`
          w-full 
          mx-auto 
          ${sizeClasses[size] || sizeClasses.xl}
          ${paddingClass}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg", "xl", "full"]),
  padding: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default Container;