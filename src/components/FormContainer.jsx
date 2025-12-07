import React from "react";
import "./FormContainer.css";
import "../App.css";

function FormContainer({ fields = [], className = "" }) {
  return (
    <div className={`form-container ${className}`}>
      {fields.map((field, index) => (
        <div key={index} className={field.sectionClassName || "form-section"}>
          <label className="heading section-label">{field.label}:</label>
          <div className={field.wrapperClassName || "form-field-wrapper"}>
            {field.component}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FormContainer;

