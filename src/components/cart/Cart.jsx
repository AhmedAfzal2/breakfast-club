import React from "react";
import Items from "./Items";
import "./Cart.css";

function Cart({
  items,
  onClear,
  onBack,
  onDelete,
  updateQuantity,
  isOpen,
  getItemQuantity,
}) {
  return (
    <div id="cart" className={isOpen ? "open" : "closed"}>
      <div>
        <div className="cart-header">your cart</div>
        <Items
          items={items}
          onDelete={onDelete}
          updateQuantity={updateQuantity}
          getItemQuantity={getItemQuantity}
        />
        <div className="control-row">
          <div className="control-btn" onClick={onBack}>
            back to menu
          </div>
          <div className="control-btn" onClick={onClear}>
            clear cart
          </div>
        </div>
      </div>
      <div>
        <div className="price">
          <div>grand total</div>
          <div>
            Rs.{" "}
            {items.reduce((sum, item) => sum + item.quantity * item.price, 0)}
          </div>
        </div>
        <div className="place-order">place order</div>
      </div>
    </div>
  );
}

export default Cart;
