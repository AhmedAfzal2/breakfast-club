import React from "react";
import { createContext, useContext, useMemo, useState } from "react";

const ctx = createContext();

export function useCart() {
  return useContext(ctx);
}

export function CartContext({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const onAdd = (item) => {
    setCartItems((items) => [
      ...items,
      {
        id: item.id || item._id,
        name: item.name,
        price: item.price,
        src: item.src,
        quantity: 1,
      },
    ]);
  };

  const onClear = () => {
    setCartItems([]);
  };

  const onDelete = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity === 0) onDelete(id);
    else
      setCartItems((items) =>
        items.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
  };

  const getItemQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  // only rerender when cartItems is changed
  const value = useMemo(
    () => ({
      cartItems,
      onClear,
      onDelete,
      updateQuantity,
      getItemQuantity,
      onAdd,
    }),
    [cartItems]
  );

  return <ctx.Provider value={value}>{children}</ctx.Provider>;
}
