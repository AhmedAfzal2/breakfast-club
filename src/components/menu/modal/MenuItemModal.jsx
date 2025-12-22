import React, { useState, useEffect } from "react";
import ModalHeader from "./ModalHeader";
import ModalDescription from "./ModalDescription";
import ModalToppings from "./ModalToppings";
import QuantityControl from "../../cart/QuantityControl";
import { useCart } from "../CartContext";
import "./MenuItemModal.css";

function MenuItemModal({ item, isOpen, onClose }) {
  const onAdd = useCart().onAdd;
  const [isClosing, setIsClosing] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setSelectedAddOns([]); // Reset add-on selections when modal opens
    }
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
      setSelectedAddOns([]);
    }, 300); // Match animation duration
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleAddOnChange = (addOn) => {
    setSelectedAddOns(prev => {
      if (prev.includes(addOn)) {
        // Remove if already selected
        return prev.filter(a => a !== addOn);
      } else {
        // Add if not selected
        return [...prev, addOn];
      }
    });
  };

  // Get category for background color
  const category = item.category ? item.category.toLowerCase() : '';

  return (
    <div className="menu-item-modal-overlay" onClick={handleOverlayClick}>
      <div className={`menu-item-modal ${category} ${isClosing ? "closing" : ""}`}>
        <ModalHeader item={item} onClose={handleClose} />
        <ModalDescription description={item.description} />
        <ModalToppings
          addOns={item.addOns}
          selectedAddOns={selectedAddOns}
          onAddOnChange={handleAddOnChange}
        />
        <div className="modal-footer">
          <QuantityControl item={item}></QuantityControl>
        </div>
      </div>
    </div>
  );
}

export default MenuItemModal;
