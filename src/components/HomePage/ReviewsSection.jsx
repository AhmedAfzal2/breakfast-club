// src/components/HomePage/ReviewsSection.jsx

import React, { useState, useEffect } from 'react';
import './ReviewsSection.css';
import { Quote } from 'lucide-react'; // Using lucide-react for icons
import '../Layout/Layout.css';
import FilledStarIcon from '/assets/images/icons/star_filled.png'; // Path to filled star icon
import UnfilledStarIcon from '/assets/images/icons/star_unfilled.png'; // Path to unfilled star icon
import { reviewsApi } from '../../services/reviewsApi';

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
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const data = await reviewsApi.getLimitedReviews(3);
        setReviews(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section className="reviews-section">
      <h2 className="section-title">What Our <span style={{color: "var(--china-rose)"}}>Customers</span> Are Saying</h2>
      <p className="section-subtitle">Real reviews from satisfied breakfast lovers.</p>
      
      {loading && <p>Loading reviews...</p>}
      {error && <p className="error-message">Error loading reviews: {error}</p>}
      
      {!loading && !error && (
        <>
          <div className="reviews-grid">
            {reviews.map(review => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
          
          <div className="reviews-footer-cta">
            <a href="/reviews" className="btn-reviews">
              Read More Reviews
            </a>
          </div>
        </>
      )}
    </section>
  );
};

export default ReviewsSection;