import React from "react";
import { useCart } from "./CartContext";
import "./CartIcon.css";

function CartIcon({ className, onClick }) {
  const numberOfItems = useCart().cartItems.length;
  return (
    <div className={`container ${className}`} onClick={onClick}>
      <img
        src={
          numberOfItems > 0
            ? "/assets/images/icons/cart.png"
            : "/assets/images/icons/cart_empty.png"
        }
      />
      {numberOfItems > 0 && <div className="number">{numberOfItems}</div>}
    </div>
  );
}

export default CartIcon;
