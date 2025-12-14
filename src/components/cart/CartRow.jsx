import React from "react";
import "./Cart.css";
import QuantityControl from "./QuantityControl";
import { Trash2 } from "lucide-react";

function CartRow({ id, item, onDelete, updateQuantity, getItemQuantity }) {
  let colors = ["#fff", "#b25a68"];
  let primaryColor = colors[id % 2];
  let secondaryColor = colors[(id + 1) % 2];

  const itemDetails =
    item !== null ? (
      <div className="item-details">
        <div>
          <div style={{ fontSize: "1.35em" }}>{item.name}</div>
          <QuantityControl
            updateQuantity={updateQuantity}
            item={item}
            getItemQuantity={getItemQuantity}
            fixed={true}
          />
        </div>
        <div style={{ alignItems: "flex-end" }}>
          <div>Rs. {item.price * item.quantity}</div>
          <Trash2
            className="delete"
            onClick={() => {
              onDelete(item.id);
            }}
          />
        </div>
      </div>
    ) : (
      <></>
    );

  return (
    <div
      className="cart-row"
      style={{
        backgroundColor: primaryColor,
        color: secondaryColor,
      }}
    >
      <div className="image-container" style={{ borderColor: secondaryColor }}>
        {item !== null && <img src={item.src} />}
      </div>
      {itemDetails}
    </div>
  );
}

export default CartRow;
