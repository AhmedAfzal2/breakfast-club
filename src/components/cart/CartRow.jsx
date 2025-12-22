import React from "react";
import "./Cart.css";
import QuantityControl from "./QuantityControl";
import { Trash2 } from "lucide-react";
import { useCart } from "../menu/CartContext";

function CartRow({ id, item, readOnly }) {
  let colors = ["#fff", "#b25a68"];
  let primaryColor = colors[id % 2];
  let secondaryColor = colors[(id + 1) % 2];

  const ctx = useCart();

  const itemDetails =
    item !== null ? (
      <div className="item-details">
        <div>
          <div style={{ fontSize: "1.35em" }}>{item.name}</div>
          {readOnly ? (
            <div style={{ fontSize: "1.2em", fontWeight: "bold" }}>x{item.quantity}</div>
          ) : (
            <QuantityControl item={item} fixed={true} />
          )}
        </div>
        <div style={{ alignItems: "flex-end" }}>
          <div>Rs. {item.price * item.quantity}</div>
          {!readOnly && (
            <Trash2
              className="delete"
              onClick={() => {
                ctx.onDelete(item.id);
              }}
            />
          )}
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
