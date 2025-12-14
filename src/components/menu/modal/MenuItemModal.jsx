import React, { useState, useEffect } from "react";
import ModalHeader from "./ModalHeader";
import ModalDescription from "./ModalDescription";
import ModalToppings from "./ModalToppings";
import "./MenuItemModal.css";

function MenuItemModal({ item, isOpen, onClose, onAddToBasket }) {
  const [isClosing, setIsClosing] = useState(false);
  const [selectedTopping, setSelectedTopping] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setSelectedTopping(null); // Reset topping selection when modal opens
    }
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
      setSelectedTopping(null);
    }, 300); // Match animation duration
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleToppingChange = (topping) => {
    setSelectedTopping(topping);
  };

  const handleAddToBasketClick = (itemData) => {
    const itemWithTopping = {
      ...item,
      selectedTopping: selectedTopping
    };
    if (onAddToBasket) {
      onAddToBasket(itemWithTopping);
    }
    handleClose();
  };

  return (
    <div className="menu-item-modal-overlay" onClick={handleOverlayClick}>
      <div className={`menu-item-modal ${isClosing ? 'closing' : ''}`}>
        <ModalHeader item={item} onClose={handleClose} />
        <ModalDescription description={item.description} />
        <ModalToppings 
          toppings={item.toppings} 
          selectedTopping={selectedTopping}
          onToppingChange={handleToppingChange}
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

