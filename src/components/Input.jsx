import React, { useId } from "react";
import PropTypes from "prop-types";

const Input = React.forwardRef(function Input(
  {
    label,
    type = "text",
    className = "",
    error,        // can be boolean or string message
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
        <label htmlFor={id} className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        ref={ref}
        disabled={disabled}
        className={`
          w-full px-3 py-2 text-black bg-white border rounded-lg outline-none
          focus:ring-2 focus:ring-blue-400 focus:border-blue-400
          disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200
          ${error ? "border-red-500" : "border-gray-300"}
          ${className}
          transition duration-200
        `}
        {...props}
      />
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
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