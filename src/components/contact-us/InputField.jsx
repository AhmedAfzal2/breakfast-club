import React, { forwardRef } from "react";
import "./InputField.css";

const InputField = forwardRef(({ type = "text", id, name, placeholder, required, minLength, className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      required={required}
      minLength={minLength}
      className={`input-field ${className || ""}`}
      {...props}
    />
  );
});

InputField.displayName = "InputField";

export default InputField;

