import React, { useState } from "react";
import "./QuantityControl.css";

function QuantityControl({ updateQuantity, item }) {
  return (
    <div className="quantity-control">
      <button
        className="plus-minus"
        onClick={() => {
          updateQuantity(item.id, item.quantity - 1);
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
      <div className="quantity-text">{item.quantity}</div>
      <button
        className="plus-minus"
        onClick={() => {
          updateQuantity(item.id, item.quantity + 1);
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
  );
}

export default QuantityControl;
