import React, { useId } from "react";

/**
 * Reusable Select Component
 *
 * Props:
 * - options: array of strings OR [{ label, value }]
 * - label: optional label text
 * - error: validation error object
 * - className: extra Tailwind classes
 * - disabled: boolean
 */

const Select = React.forwardRef(function Select(
  {
    options = [],
    label,
    error,
    className = "",
    disabled = false,
    ...props
  },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <select
        id={id}
        ref={ref}
        disabled={disabled}
        className={`
          w-full px-3 py-2 rounded-lg border bg-white text-black
          outline-none transition duration-200
          focus:ring-2 focus:ring-blue-400 focus:border-blue-400
          disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
          ${error ? "border-red-500" : "border-gray-300"}
          ${className}
        `}
        {...props}
      >
        {options.map((option, index) => {
          if (typeof option === "string") {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          }

          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>

      {error && (
  <p className="text-red-500 text-sm mt-1">
    {typeof error === "string" ? error : error.message}
  </p>
)}

    </div>
  );
});

export default Select;