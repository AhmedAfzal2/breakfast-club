import React from "react";
import "./InputField.css";

function InputField({ type = "text", id, name, value, onChange, placeholder, required }) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="input-field"
    />
  );
}

export default InputField;

