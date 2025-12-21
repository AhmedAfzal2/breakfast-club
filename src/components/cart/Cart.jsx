import React from "react";
import Items from "./Items";
import { useCart } from "../menu/CartContext";
import "./Cart.css";

function Cart({ isOpen, onBack, onPlace }) {
  const ctx = useCart();
  return (
    <div id="cart" className={isOpen ? "open" : "closed"}>
      <div style={{ flex: 1 }}>
        <div className="cart-header">your cart</div>
        <Items />
        <div className="control-row">
          <div className="control-btn" onClick={onBack}>
            back to menu
          </div>
          <div className="control-btn" onClick={ctx.onClear}>
            clear cart
          </div>
        </div>
      </div>
      <div>
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
