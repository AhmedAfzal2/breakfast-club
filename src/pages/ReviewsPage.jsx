import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Quote } from "lucide-react";
import { reviewsApi } from "../services/reviewsApi";
import "../App.css";
import "../components/HomePage/ReviewsSection.css";

const StarRating = ({ rating }) => {
  const FilledStarIcon = "/assets/images/icons/star_filled.png";
  const UnfilledStarIcon = "/assets/images/icons/star_unfilled.png";
  
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const starSrc = i <= rating ? FilledStarIcon : UnfilledStarIcon;
    stars.push(
      <img
        key={i}
        src={starSrc}
        alt={`${i} star rating`}
        className="pixel-star-icon"
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

function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const data = await reviewsApi.getAllReviews();
        // Filter reviews to only show those with comments (quote field)
        const reviewsWithComments = data.filter(
          (review) => review.quote && review.quote.trim().length > 0
        );
        setReviews(reviewsWithComments);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <Layout>
      <div className="reviews-page">
        <h1 className="page-heading">REVIEWS</h1>
        
        {loading && <p>Loading reviews...</p>}
        {error && <p className="error-message">Error loading reviews: {error}</p>}
        
        {!loading && !error && (
          <div className="reviews-grid">
            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default ReviewsPage;
