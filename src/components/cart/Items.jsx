import React from "react";
import CartRow from "./CartRow";
import { useCart } from "../menu/CartContext";

const MIN_ROWS = 6;

function Items({ items, readOnly }) {
  const ctx = useCart();
  const sourceItems = items || (ctx ? ctx.cartItems : []);
  
  const isScroll = sourceItems.length > MIN_ROWS;
  // extend the array with nulls if < min rows
  const newItems =
    sourceItems.length < MIN_ROWS
      ? [...sourceItems, ...Array(MIN_ROWS - sourceItems.length).fill(null)]
      : sourceItems;
  return (
    <div className={(!isScroll && "no-fade") + " items-list"}>
      {newItems.map((item, index) => (
        <CartRow key={index} id={index} item={item} readOnly={readOnly} />
      ))}
    </div>
  );
}

export default Items;
