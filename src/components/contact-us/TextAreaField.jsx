import React from "react";
import "./TextAreaField.css";

function TextAreaField({ id, placeholder, rows = 5, className, ...registerProps }) {
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      rows={rows}
      className={`textarea-field ${className || ""}`}
      {...registerProps}
    />
  );
}

export default TextAreaField;

