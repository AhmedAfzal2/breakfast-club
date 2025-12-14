import React from "react";
import QuantityControl from "../cart/QuantityControl";
import "./MenuItem.css";

function MenuItem({
  item,
  onAddToBasket,
  onItemClick,
  getItemQuantity,
  updateQuantity,
}) {
  const handleItemClick = (e) => {
    // Don't trigger if clicking the button
    if (e.target.closest(".add-to-basket-button")) {
      return;
    }
    if (onItemClick) {
      onItemClick(item);
    }
  };

  return (
    <div className="menu-item" onClick={handleItemClick}>
      <div className="menu-item-image-container">
        <img src={item.src} alt={item.name} className="menu-item-image" />
      </div>
      <div className="menu-item-content">
        <h3 className="menu-item-title">{item.name}</h3>
        <span className="menu-item-price">Rs. {item.price}</span>
        {/* <AddToBasketButton onAddToBasket={onAddToBasket} item={item} /> */}
        <QuantityControl
          item={item}
          onAddToBasket={onAddToBasket}
          getItemQuantity={getItemQuantity}
          updateQuantity={updateQuantity}
        />
      </div>
    </div>
  );
}

export default MenuItem;
