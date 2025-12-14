import React, { useState } from "react";
import "./MenuCategories.css";

function MenuCategories({ onCategorySelect, selectedCategory: externalSelectedCategory }) {
  const [internalSelectedCategory, setInternalSelectedCategory] = useState("BREAKFAST");
  const selectedCategory = externalSelectedCategory !== undefined ? externalSelectedCategory : internalSelectedCategory;

  const categories = [
    "BREAKFAST",
    "DESSERTS",
    "BEVERAGES",
  ];

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
          className={`menu-category-button ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default MenuCategories;

