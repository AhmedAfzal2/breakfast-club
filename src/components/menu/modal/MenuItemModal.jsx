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
  const [selectedAddOn, setSelectedAddOn] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setSelectedAddOn(null); // Reset add-on selection when modal opens
    }
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
      setSelectedAddOn(null);
    }, 300); // Match animation duration
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleAddOnChange = (addOn) => {
    setSelectedAddOn(addOn);
  };

  return (
    <div className="menu-item-modal-overlay" onClick={handleOverlayClick}>
      <div className={`menu-item-modal ${isClosing ? "closing" : ""}`}>
        <ModalHeader item={item} onClose={handleClose} />
        <ModalDescription description={item.description} />
        <ModalToppings
          addOns={item.addOns}
          selectedAddOn={selectedAddOn}
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
