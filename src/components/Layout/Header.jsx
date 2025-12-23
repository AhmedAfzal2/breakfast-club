import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Layout.css";
const breakfastClubLogo = "/assets/images/breakfast_club_logo.png";
import { Menu } from "lucide-react";

// Import icons
const homeIcon = "/assets/images/icons/home.png";
const menuIcon = "/assets/HomePage/menu.png";
const reservationIcon = "/assets/HomePage/reservations.png";
const aboutIcon = "/assets/HomePage/aboutus.png";
const contactIcon = "/assets/HomePage/contactus.png";
const reviewsIcon = "/assets/HomePage/reviews.png";
const aboutUsIcon = "/assets/HomePage/aboutus.png";

function Header({ onNavClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      {/* Left Side Menu Button - Visible on Mobile */}
      <div className="nav-bar-button" onClick={onNavClick}>
        <Menu size={40} />
      </div>

      {/* Left Side Home Button - Visible on Desktop */}
      <div className="desktop-home-button">
        <a 
          href="/" 
          className={`nav-link ${isActive("/") ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("/");
          }}
          title="Home"
        >
          <img src={homeIcon} alt="Home" />
        </a>
      </div>

      {/* Center Navigation - Visible on Desktop */}
      <nav className="nav-links">
        <a 
          href="/menu" 
          className={`nav-link ${isActive("/menu") ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("/menu");
          }}
          title="Menu"
        >
          <img src={menuIcon} alt="Menu" />
        </a>
        <a 
          href="/reservations" 
          className={`nav-link ${isActive("/reservations") ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("/reservations");
          }}
          title="Reservations"
        >
          <img src={reservationIcon} alt="Reservations" />
        </a>
        <a 
          href="/contact" 
          className={`nav-link ${isActive("/contact") ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("/contact");
          }}
          title="Contact"
        >
          <img src={contactIcon} alt="Contact" />
        </a>
        <a 
          href="/reviews" 
          className={`nav-link ${isActive("/reviews") ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("/reviews");
          }}
          title="Reviews"
        >
          <img src={reviewsIcon} alt="Reviews" />
        </a>
        <a 
          href="/about" 
          className={`nav-link ${isActive("/about") ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("/about");
          }}
          title="About Us"
        >
          <img src={aboutUsIcon} alt="About Us" />
        </a>
      </nav>

      {/* Right Side Logo */}
      <div 
        className="logo-container" 
        onClick={() => handleNavClick("/")} 
        style={{ cursor: 'pointer' }}
      >
        <img src={breakfastClubLogo} alt="Breakfast Club Logo" />
      </div>
    </header>
  );
}

export default Header;
