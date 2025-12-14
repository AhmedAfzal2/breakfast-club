// src/components/HomePage/ReviewsSection.jsx

import React from 'react';
import './ReviewsSection.css';
import { Quote } from 'lucide-react'; // Using lucide-react for icons
import '../Layout/Layout.css';
import FilledStarIcon from '/assets/images/icons/star_filled.png'; // Path to filled star icon
import UnfilledStarIcon from '/assets/images/icons/star_unfilled.png'; // Path to unfilled star icon

// --- DUMMY REVIEW DATA ---
const dummyReviews = [
  {
    id: 1,
    name: "Junaid Jamshed",
    rating: 5,
    quote: "The Sweet Strawberry Milkshake was absolutely heavenly! Perfect start to my weekend. The atmosphere is so cozy and inviting.",
  },
  {
    id: 2,
    name: "Rasheeda Bano",
    rating: 4,
    quote: "Fantastic Waffles and prompt service. The coffee was excellent, too. Highly recommend for anyone looking for a great brunch spot.",
  },
  {
    id: 3,
    name: "Daniyal Khan",
    rating: 5,
    quote: "The Fluffy Buttermilk Pancakes melted in my mouth. This is officially my new favorite breakfast spot in the city!",
  },
  {
    id: 4,
    name: "Zayn Malik",
    rating: 5,
    quote: "I loved the Cinnamon Rolls—freshly baked and gooey! They have great options for quick ordering on their app.",
  },
  {
    id: 5,
    name: "Abdullah .",
    rating: 4,
    quote: "Great value and big portions. The Breakfast Burrito Bowl (from the hidden menu!) was spicy and filling. Will be back!",
  },
];
// -------------------------

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    // Determine which image path to use based on the current rating
    const starSrc = i <= rating ? FilledStarIcon : UnfilledStarIcon;
    
    stars.push(
      <img
        key={i}
        src={starSrc}
        alt={`${i} star rating`}
        // Apply the CSS class for sizing and styling the custom icon
        className='pixel-star-icon'
      />
    );
  }
  return <div className="review-rating">{stars}</div>;
};

const ReviewCard = ({ review }) => {
  return (
    <div className="review-card">
      <Quote size={24} className="quote-icon pixel-icon"/>
      <p className="review-quote">{review.quote}</p>
      
      <div className="review-footer">
        <StarRating rating={review.rating} />
        <p className="reviewer-name"> {review.name}</p>
      </div>
    </div>
  );
};

const ReviewsSection = () => {
  return (
    <section className="reviews-section">
      <h2 className="section-title">What Our <span style={{color: "var(--china-rose)"}}>Customers</span> Are Saying</h2>
      <p className="section-subtitle">Real reviews from satisfied breakfast lovers.</p>
      
      <div className="reviews-grid">
        {dummyReviews.slice(0, 3).map(review => ( // Display top 3 reviews
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      
      <div className="reviews-footer-cta">
        <a href="/reviews" className="btn-reviews">
          Read More Reviews
        </a>
      </div>
    </section>
  );
};

export default ReviewsSection;