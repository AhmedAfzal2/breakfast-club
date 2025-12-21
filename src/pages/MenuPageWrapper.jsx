import React from "react";
import { CartContext, useCart } from "../components/menu/CartContext";
import { useContext } from "react";
import MenuPage from "./MenuPage";

export default function MenuPageWrapper() {
  return (
    <CartContext>
      <MenuPage></MenuPage>
    </CartContext>
  );
}
