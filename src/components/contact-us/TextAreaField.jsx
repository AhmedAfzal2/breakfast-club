import React from "react";
import "./TextAreaField.css";

function TextAreaField({ id, name, value, onChange, placeholder, required, rows = 5 }) {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      rows={rows}
      className="textarea-field"
    />
  );
}

export default TextAreaField;

