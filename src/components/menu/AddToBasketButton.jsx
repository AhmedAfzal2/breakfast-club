import React from "react";
import "./AddToBasketButton.css";

function AddToBasketButton({ onAddToBasket, item }) {
  const handleClick = () => {
    if (onAddToBasket) {
      onAddToBasket(item);
    }
  };

  return (
    <button 
      className="add-to-basket-button"
      onClick={handleClick}
    >
      Add to Basket
    </button>
  );
}

export default AddToBasketButton;

