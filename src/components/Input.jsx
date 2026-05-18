import React, { useId } from "react";
import PropTypes from "prop-types";

const Input = React.forwardRef(function Input(
  {
    label,
    type = "text",
    className = "",
    error,
    disabled = false,
    ...props
  },
  ref
) {
  const id = useId();
  const errorMessage = typeof error === "string" ? error : error ? "This field is invalid" : null;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        ref={ref}
        disabled={disabled}
        className={`
          w-full px-3 py-2 text-black dark:text-white bg-white dark:bg-gray-800 border rounded-lg outline-none
          focus:ring-2 focus:ring-blue-400 focus:border-blue-400
          disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:text-gray-500 dark:disabled:text-gray-400 disabled:border-gray-200 dark:disabled:border-gray-600
          ${error ? "border-red-500" : "border-gray-300 dark:border-gray-600"}
          ${className}
          transition duration-200
        `}
        {...props}
      />
      {errorMessage && (
        <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
});

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  disabled: PropTypes.bool,
};

export default Input;