import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Layout.css";
import breakfastClubLogo from "/assets/images/breakfast_club_logo.png";
import { Menu } from "lucide-react";

// Import icons
import homeIcon from "/assets/images/icons/home.png";
import menuIcon from "/assets/HomePage/menu.png";
import reservationIcon from "/assets/HomePage/reservations.png";
import aboutIcon from "/assets/HomePage/aboutus.png";
import contactIcon from "/assets/HomePage/contactus.png";
import reviewsIcon from "/assets/HomePage/reviews.png";

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
          <img src={aboutIcon} alt="About Us" />
        </a>
      </nav>

      {/* Right Side Logo */}
      <div className="logo-container">
        <img src={breakfastClubLogo} alt="Breakfast Club Logo" />
      </div>
    </header>
  );
}

export default Header;
