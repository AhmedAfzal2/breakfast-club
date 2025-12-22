import React from "react";
import Items from "./Items";
import { useCart } from "../menu/CartContext";
import "./Cart.css";

function Cart({ isOpen, onBack, onPlace }) {
  const ctx = useCart();
  const isEmpty = ctx.cartItems.length === 0;
  return (
    <div id="cart" className={isOpen ? "open" : "closed"}>
      <div className="cart-top-section">
        <div className="cart-header">{!isEmpty ? "your cart" : "empty"}</div>
        <Items />
        <div className="control-row">
          <div className="control-btn" onClick={onBack}>
            back to menu
          </div>
          {!isEmpty && (
            <div className="control-btn" onClick={ctx.onClear}>
              clear cart
            </div>
          )}
        </div>
      </div>
      <div style={{ flexShrink: 0 }}>
        <div className="price">
          <div>grand total</div>
          <div>
            Rs.{" "}
            {ctx.cartItems.reduce(
              (sum, item) => sum + item.quantity * item.price,
              0
            )}
          </div>
        </div>
        <div className="place-order" onClick={onPlace}>
          place order
        </div>
      </div>
    </div>
  );
}

export default Cart;
