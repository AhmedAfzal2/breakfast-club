import React from "react";
import "./ConfirmationPopup.css";
import henImg from "/assets/images/hen.png"; // <-- replace with your image

function ConfirmationPopup({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="cute-confirm-overlay" onClick={onClose}>
      <div
        className="cute-confirm-popup"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="cute-close-btn" onClick={onClose}>
          ×
        </button>

        <h2 className="cute-confirm-title">Reservation Received!</h2>

        <img src={henImg} alt="hen" className="cute-confirm-img" />

        <p className="cute-confirm-text">
          Your details were submitted successfully.
        </p>

        <button className="cute-ok-btn" onClick={onClose}>
          Okay!
        </button>
      </div>
    </div>
  );
}

export default ConfirmationPopup;
