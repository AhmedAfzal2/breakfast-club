import React, { useState } from "react";
import "./MenuCategories.css";

function MenuCategories({ onCategorySelect }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    "BREAKFAST",
    "DESSERTS",
    "BEVERAGES",
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
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

