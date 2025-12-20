import React from "react";
import "./ValidationMessage.css";

function ValidationMessage({ message, fieldId, isVisible }) {
  if (!isVisible || !message) return null;

  return (
    <div className="validation-message-overlay" role="alert" id={`${fieldId}-error`}>
      <div className="validation-message-content">
        {message}
      </div>
    </div>
  );
}

export default ValidationMessage;

