import React from "react";
import AddToBasketButton from "./AddToBasketButton";
import "./MenuItem.css";

function MenuItem({ title, price, imageSrc, description, toppings, onAddToBasket, onItemClick }) {
  const item = { title, price, imageSrc, description, toppings };

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
        <img src={imageSrc} alt={title} className="menu-item-image" />
      </div>
      <div className="menu-item-content">
        <h3 className="menu-item-title">{title}</h3>
        <span className="menu-item-price">Rs. {price}</span>
        <AddToBasketButton onAddToBasket={onAddToBasket} item={item} />
      </div>
    </div>
  );
}

export default MenuItem;

