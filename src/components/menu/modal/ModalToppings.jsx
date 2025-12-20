import React, { useState } from "react";
import "./ModalToppings.css";

function ModalToppings({ toppings, selectedTopping, onToppingChange }) {
  if (!toppings || toppings.length === 0) return null;

  return (
    <div className="modal-toppings">
      <h3 className="modal-toppings-heading">add-ons</h3>
      <div className="modal-toppings-list">
        {toppings.map((topping, index) => (
          <label key={index} className="modal-topping-item">
            <input
              type="radio"
              name="topping"
              value={topping}
              checked={selectedTopping === topping}
              onChange={() => onToppingChange && onToppingChange(topping)}
              className="modal-topping-radio"
            />
            <span className="modal-topping-name">{topping}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default ModalToppings;

