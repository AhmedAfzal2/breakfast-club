import React, { useState } from "react";
import "./QuantityControl.css";
import { useCart } from "../menu/CartContext";

function QuantityControl({ item, fixed }) {
  const ctx = useCart();
  const quantity = ctx.getItemQuantity(item.id);
  return quantity > 0 ? (
    <div
      className={`quantity-control ${fixed ? "fixed" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <button
        className="plus-minus"
        onClick={(e) => {
          e.stopPropagation();
          ctx.updateQuantity(item.id, quantity - 1);
        }}
      >
        <svg viewBox="0 0 10 10" width="50%" height="50%">
          <line
            x1="1"
            y1="5"
            x2="9"
            y2="5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </button>
      <div className="quantity-text">{quantity}</div>
      <button
        className="plus-minus"
        onClick={(e) => {
          e.stopPropagation();
          ctx.updateQuantity(item.id, quantity + 1);
        }}
      >
        <svg viewBox="0 0 10 10" width="60%" height="60%">
          <line
            x1="5"
            y1="1"
            x2="5"
            y2="9"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <line
            x1="1"
            y1="5"
            x2="9"
            y2="5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </button>
    </div>
  ) : (
    <button
      className={`quantity-control add-to-basket ${fixed ? "fixed" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        ctx.onAdd(item);
      }}
    >
      add to basket
    </button>
  );
}

export default QuantityControl;
