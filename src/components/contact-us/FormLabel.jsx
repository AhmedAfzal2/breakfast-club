import React from "react";
import "./FormLabel.css";

function FormLabel({ htmlFor, children, required }) {
  return (
    <label htmlFor={htmlFor} className="form-label">
      {children}
      {required && <span className="required">*</span>}
    </label>
  );
}

export default FormLabel;

