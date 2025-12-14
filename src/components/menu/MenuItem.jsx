import React from "react";
import AddToBasketButton from "./AddToBasketButton";
import "./MenuItem.css";

function MenuItem({ name, price, src, description, toppings, onAddToBasket, onItemClick }) {
  const item = { name, price, src, description, toppings };

  const handleItemClick = (e) => {
    // Don't trigger if clicking the button
    if (e.target.closest('.add-to-basket-button')) {
      return;
    }
    if (onItemClick) {
      onItemClick(item);
    }
  };

  return (
    <div className="menu-item" onClick={handleItemClick}>
      <div className="menu-item-image-container">
        <img src={src} alt={name} className="menu-item-image" />
      </div>
      <div className="menu-item-content">
        <h3 className="menu-item-title">{name}</h3>
        <span className="menu-item-price">Rs. {price}</span>
        <AddToBasketButton onAddToBasket={onAddToBasket} item={item} />
      </div>
    </div>
  );
}

export default MenuItem;

