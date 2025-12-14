import React from "react";
import MenuItem from "./MenuItem";
import "./MenuItemList.css";

function MenuItemList({
  items,
  onAddToBasket,
  onItemClick,
  getItemQuantity,
  updateQuantity,
}) {
  if (!items || items.length === 0) {
    return (
      <div className="menu-item-list-empty">
        <p>No items available</p>
      </div>
    );
  }

  return (
    <div className="menu-item-list">
      {items.map((item, index) => (
        <MenuItem
          key={item.id || index}
          item={item}
          onAddToBasket={onAddToBasket}
          onItemClick={onItemClick}
          getItemQuantity={getItemQuantity}
          updateQuantity={updateQuantity}
        />
      ))}
    </div>
  );
}

export default MenuItemList;
