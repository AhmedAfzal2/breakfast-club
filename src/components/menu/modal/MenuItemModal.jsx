import React, { useState, useEffect } from "react";
import ModalHeader from "./ModalHeader";
import ModalDescription from "./ModalDescription";
import ModalToppings from "./ModalToppings";
import "./MenuItemModal.css";

function MenuItemModal({ item, isOpen, onClose, onAddToBasket }) {
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

  const handleAddToBasketClick = (itemData) => {
    const itemWithAddOn = {
      ...item,
      selectedAddOn: selectedAddOn
    };
    if (onAddToBasket) {
      onAddToBasket(itemWithAddOn);
    }
    handleClose();
  };

  return (
    <div className="menu-item-modal-overlay" onClick={handleOverlayClick}>
      <div className={`menu-item-modal ${isClosing ? 'closing' : ''}`}>
        <ModalHeader item={item} onClose={handleClose} />
        <ModalDescription description={item.description} />
        <ModalToppings 
          addOns={item.addOns} 
          selectedAddOn={selectedAddOn}
          onAddOnChange={handleAddOnChange}
        />
        <div className="modal-footer">
          <button 
            className="modal-add-to-basket-button"
            onClick={handleAddToBasketClick}
          >
            Add to Basket
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuItemModal;

