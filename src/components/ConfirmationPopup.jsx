import React from "react";
import "./ConfirmationPopup.css";
import henImg from "/assets/images/hen.png";

function ConfirmationPopup({ isOpen, onClose, type = "contact" }) {
  if (!isOpen) return null;

  // Define messages based on type
  const messages = {
    contact: {
      title: "Thank You for Contacting Us!",
      text: "We've received your message and will get back to you soon. We appreciate your feedback!"
    },
    reservation: {
      title: "Reservation Received!",
      text: "Your reservation has been confirmed. We're looking forward to seeing you!"
    },
    error: {
      title: "Please Select Date and Time",
      text: "You need to select both date and time before continuing."
    },
    "error-table": {
      title: "Please Select a Table",
      text: "You need to select at least one table before continuing."
    }
  };

  const message = messages[type] || messages.contact;

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

        <img src={henImg} alt="hen" className="cute-confirm-img" />

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
