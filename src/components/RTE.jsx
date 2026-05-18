import React, { useId } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";

const RTE = ({ name = "content", control, label, defaultValue = "", error }) => {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div
        className={`border rounded-xl overflow-hidden transition ${
          error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
        }`}
      >
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { onChange, value } }) => (
            <Editor
              id={id}
              value={value}
              tinymceScriptSrc="/tinymce/tinymce.min.js" // or use CDN
              init={{
                height: 400,
                menubar: true,
                license_key: "gpl",      // ✅ free tier – removes paid warning
                promotion: false,         // no upgrade button
                branding: false,
                skin: document.documentElement.classList.contains("dark") ? "oxide-dark" : "oxide",
                content_css: document.documentElement.classList.contains("dark") ? "dark" : "default",
                plugins: [
                  "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
                  "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
                  "insertdatetime", "media", "table", "help", "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | bold italic underline forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table | code fullscreen | removeformat help",
                content_style:
                  "body { font-family: Inter, Helvetica, Arial, sans-serif; font-size: 14px }",
              }}
              onEditorChange={onChange}
            />
          )}
        />
      </div>
      {error && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{error.message || error}</p>}
    </div>
  );
};

RTE.propTypes = {
  name: PropTypes.string,
  control: PropTypes.object.isRequired,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default RTE;