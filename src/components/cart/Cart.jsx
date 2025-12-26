import React from "react";
import Items from "./Items";
import { useRef } from "react";
import useSwipeDown from "./useSwipeDown";
import { useCart } from "../menu/CartContext";
import "./Cart.css";

function Cart({ isOpen, onBack, onPlace, isPlacingOrder = false }) {
  const ctx = useCart();
  const isEmpty = ctx.cartItems.length === 0;
  const cartRef = useRef(null);

  useSwipeDown(cartRef, onBack);

  return (
    <div ref={cartRef} id="cart" className={isOpen ? "open" : "closed"}>
      <div className="cart-top-section">
        <div className="cart-header">{!isEmpty ? "your cart" : "empty"}</div>
        <Items />
        <div className="control-row">
          <div
            className="control-btn"
            onClick={onBack}
            style={{
              opacity: isPlacingOrder ? 0.5 : 1,
              pointerEvents: isPlacingOrder ? "none" : "auto",
            }}
          >
            back to menu
          </div>
          {!isEmpty && (
            <div
              className="control-btn"
              onClick={ctx.onClear}
              style={{
                opacity: isPlacingOrder ? 0.5 : 1,
                pointerEvents: isPlacingOrder ? "none" : "auto",
              }}
            >
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
        <div
          className="place-order"
          onClick={isPlacingOrder ? undefined : onPlace}
          style={{
            opacity: isPlacingOrder ? 0.6 : 1,
            cursor: isPlacingOrder ? "not-allowed" : "pointer",
            pointerEvents: isPlacingOrder ? "none" : "auto",
          }}
        >
          {isPlacingOrder ? "placing order..." : "place order"}
        </div>
      </div>
    </div>
  );
}

export default Cart;
