import React from "react";
import MenuItem from "./MenuItem";
import "./MenuItemList.css";

function MenuItemList({ items, onAddToBasket, onItemClick }) {
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
          title={item.title}
          price={item.price}
          imageSrc={item.imageSrc}
          description={item.description}
          toppings={item.toppings}
          onAddToBasket={onAddToBasket}
          onItemClick={onItemClick}
        />
      ))}
    </div>
  );
}

export default MenuItemList;

