import React, { useState } from "react";
import "./MenuCategories.css";
import CartIcon from "./CartIcon";

function MenuCategories({
  onCategorySelect,
  onClick,
  selectedCategory: externalSelectedCategory,
}) {
  const [internalSelectedCategory, setInternalSelectedCategory] =
    useState("BREAKFAST");
  const selectedCategory =
    externalSelectedCategory !== undefined
      ? externalSelectedCategory
      : internalSelectedCategory;

  const categories = ["BREAKFAST", "DESSERTS", "BEVERAGES"];

  const handleCategoryClick = (category) => {
    setInternalSelectedCategory(category);
    if (onCategorySelect) {
      onCategorySelect(category);
    }
  };

  return (
    <div className="menu-categories">
      {categories.map((category, index) => (
        <button
          key={index}
          className={`menu-category-button ${
            selectedCategory === category ? "active" : ""
          }`}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </button>
      ))}
      <CartIcon className="cart-icon" onClick={onClick}></CartIcon>
    </div>
  );
}

export default MenuCategories;
