import React from "react";
import CartRow from "./CartRow";
import { useCart } from "../menu/CartContext";

const MIN_ROWS = 6;

function Items() {
  const ctx = useCart();
  // extend the array with nulls if < min rows
  const newItems =
    ctx.cartItems.length < MIN_ROWS
      ? [...ctx.cartItems, ...Array(MIN_ROWS - ctx.cartItems.length).fill(null)]
      : ctx.cartItems;
  return (
    <div className="items-list" style={{ height: "80%" }}>
      {newItems.map((item, index) => (
        <CartRow key={index} id={index} item={item} />
      ))}
    </div>
  );
}

export default Items;
