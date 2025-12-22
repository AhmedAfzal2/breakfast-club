import React from "react";
import "./ConfirmationPopup.css";
import henImg from "/assets/images/hen.png"; // <-- replace with your image

function ConfirmationPopup({ isOpen, onClose, type = "reservation" }) {
  if (!isOpen) return null;

  // Define messages based on type
  const messages = {
    error: {
      title: "Error",
      text: "please select date and time",
      showImage: false
    },
    "error-table": {
      title: "Error",
      text: "please select a table",
      showImage: false
    },
    reservation: {
      title: "Reservation Received!",
      text: "Your details were submitted successfully.",
      showImage: true
    }
  };

  const message = messages[type] || messages.reservation;

  return (
    <div className="cute-confirm-overlay" onClick={onClose}>
      <div
        className="cute-confirm-popup"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="cute-close-btn" onClick={onClose}>
          ×
        </button>

        <h2 className="cute-confirm-title">{message.title}</h2>

        {message.showImage && (
          <img src={henImg} alt="hen" className="cute-confirm-img" />
        )}

        <p className="cute-confirm-text">
          {message.text}
        </p>

        <button className="cute-ok-btn" onClick={onClose}>
          Okay!
        </button>
      </div>
    </div>
  );
}

export default ConfirmationPopup;
