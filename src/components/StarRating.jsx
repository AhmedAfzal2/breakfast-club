import React, { useState } from "react";
import "./StarRating.css";

function StarRating({ value, onChange }) {
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleStarClick = (rating) => {
    onChange(rating);
  };

  const handleStarHover = (rating) => {
    setHoveredStar(rating);
  };

  const handleMouseLeave = () => {
    setHoveredStar(0);
  };

  return (
    <div 
      className="star-rating"
      onMouseLeave={handleMouseLeave}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`star-button ${star <= (hoveredStar || value) ? "filled" : ""}`}
          onClick={() => handleStarClick(star)}
          onMouseEnter={() => handleStarHover(star)}
          aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default StarRating;

