import React from "react";
import "./SubmitButton.css";

function SubmitButton({ children, onClick, disabled, type = "submit" }) {
  return (
    <button type={type} className="submit-button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default SubmitButton;

