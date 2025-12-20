import React, { useState } from "react";
import "./StarRating.css";
import starFilled from "/assets/images/icons/star_filled.png";
import starUnfilled from "/assets/images/icons/star_unfilled.png";

function StarRating({ value, onChange, label }) {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleStarClick = (rating) => {
    if (onChange) {
      onChange(rating);
    }
  };

  const handleStarHover = (rating) => {
    setHoveredRating(rating);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  return (
    <div className="star-rating-container" onMouseLeave={handleMouseLeave}>
      {label && <div className="star-rating-label">{label}</div>}
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= (hoveredRating || value);
          return (
            <img
              key={star}
              src={isFilled ? starFilled : starUnfilled}
              alt={isFilled ? "Filled star" : "Unfilled star"}
              className="star"
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => handleStarHover(star)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default StarRating;

