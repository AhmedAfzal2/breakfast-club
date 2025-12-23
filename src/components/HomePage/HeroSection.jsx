// src/components/HomePage/HeroSection.jsx
import React from 'react';
import './HeroSection.css'; 
const HeroImage = '/assets/HomePage/hero.png'; // Ensure the path is correct
const OrderIcon = '/assets/HomePage/menu.png'; // Ensure the path is correct
const ReserveIcon = '/assets/HomePage/reservations.png'; // Ensure the path is correct
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const navigate = useNavigate();
    const heroStyle = {
    backgroundImage: `url(${HeroImage})`
    };
    const handleReservationClick = () => {
    navigate('/reservations');
    };
  return (
    // The background image will be set using CSS on the .hero-section class
    <section className="hero-section hero-full-bg" style={heroStyle}>
      <div className="hero-content-centered">

        <h1 className="hero-title">
            The Breakfast Club
        </h1>
        <p className="hero-subtitle">
          The perfect spot for your next breakfast or brunch!
        </p>
        <div className="hero-actions">
          <button className="btn" onClick={() => navigate('/menu')}>
            <img src={OrderIcon} alt="Order Now" className="btn-icon" />
          </button>
          <button className="btn" onClick={handleReservationClick}>
            <img src={ReserveIcon} alt="Reserve a Table" className="btn-icon" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;