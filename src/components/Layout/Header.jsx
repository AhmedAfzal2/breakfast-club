import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Layout.css";
import breakfastClubLogo from "/assets/images/breakfast_club_logo.png";
import { Menu } from "lucide-react";

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
      {/* Left Side Menu Button */}
      <div className="nav-bar-button" onClick={onNavClick}>
        <Menu size={40} />
      </div>

      {/* Center Navigation */}
      <nav className="nav-links">
        <a 
          href="/" 
          className={`nav-link ${isActive("/") ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("/");
          }}
        >
          Home
        </a>
        <a 
          href="/menu" 
          className={`nav-link ${isActive("/menu") ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("/menu");
          }}
        >
          Menu
        </a>
        <a 
          href="/reservations" 
          className={`nav-link ${isActive("/reservations") ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("/reservations");
          }}
        >
          Reservations
        </a>
        <a 
          href="/contact" 
          className={`nav-link ${isActive("/contact") ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("/contact");
          }}
        >
          Contact
        </a>
        <a 
          href="/reviews" 
          className={`nav-link ${isActive("/reviews") ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("/reviews");
          }}
        >
          Reviews
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
