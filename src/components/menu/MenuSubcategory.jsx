import React from "react";
import "./MenuSubcategory.css";

function MenuSubcategory({ text }) {
  if (!text) return null;

  return (
    <h2 className="menu-subcategory">{text}</h2>
  );
}

export default MenuSubcategory;

