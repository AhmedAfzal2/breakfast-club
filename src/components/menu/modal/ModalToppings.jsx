import React, { useState } from "react";
import "./ModalToppings.css";

function ModalToppings({ addOns, selectedAddOns = [], onAddOnChange }) {
  if (!addOns || addOns.length === 0) return null;

  return (
    <div className="modal-toppings">
      <h3 className="modal-toppings-heading">add-ons</h3>
      <div className="modal-toppings-list">
        {addOns.map((addOn, index) => (
          <label key={index} className="modal-topping-item">
            <input
              type="checkbox"
              value={addOn}
              checked={selectedAddOns.includes(addOn)}
              onChange={() => onAddOnChange && onAddOnChange(addOn)}
              className="modal-topping-checkbox"
            />
            <span className="modal-topping-name">{addOn}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default ModalToppings;

