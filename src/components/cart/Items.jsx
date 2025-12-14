import React from "react";
import CartRow from "./CartRow";

const MIN_ROWS = 6;
const CART_ROW_HEIGHT = 80;

function Items({ items, onDelete, updateQuantity }) {
  // extend the array with nulls if < min rows
  const newItems =
    items.length < MIN_ROWS
      ? [...items, ...Array(MIN_ROWS - items.length).fill(null)]
      : items;
  return (
    <div className="items-list" style={{ height: CART_ROW_HEIGHT * MIN_ROWS }}>
      {newItems.map((item, index) => (
        <CartRow
          key={index}
          id={index}
          item={item}
          onDelete={onDelete}
          updateQuantity={updateQuantity}
        />
      ))}
    </div>
  );
}

export default Items;
