import React from "react";
import "./ModalDescription.css";

function ModalDescription({ description }) {
  if (!description) return null;

  return (
    <div className="modal-description">
      <p className="modal-description-text">{description}</p>
    </div>
  );
}

export default ModalDescription;

