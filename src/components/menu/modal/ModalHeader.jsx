import React from "react";
import { X } from "lucide-react";
import "./ModalHeader.css";

function ModalHeader({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="modal-header">
      <div className="modal-header-image-container">
        <img 
          src={item.imageSrc} 
          alt={item.title} 
          className="modal-header-image" 
        />
      </div>
      
      <div className="modal-header-info">
        <h2 className="modal-header-title">{item.title}</h2>
        <p className="modal-header-price">Rs. {item.price}</p>
      </div>
      
      <button className="modal-header-close" onClick={onClose}>
        <X size={24} />
      </button>
    </div>
  );
}

export default ModalHeader;

