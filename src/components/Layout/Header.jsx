import React from "react";
import "./Layout.css";
import breakfastClubLogo from "/assets/images/breakfast_club_logo.png";
import { Menu } from "lucide-react";

function Header({ onNavClick }) {
  return (
    <header className="header">

      {/* Left Side Menu Button */}
      <div className="nav-bar-button" onClick={onNavClick}>
        <Menu size={40} />
      </div>

      {/* Center Navigation */}
      <nav className="nav-links">
        <a href="#" className="nav-link">Home</a>
        <a href="#" className="nav-link">Menu</a>
        <a href="#" className="nav-link active">Reservations</a>
        <a href="#" className="nav-link">Contact</a>
      </nav>

      {/* Right Side Logo */}
      <div className="logo-container">
        <img src={breakfastClubLogo} alt="Breakfast Club Logo" />
      </div>

    </header>
  );
}

export default Header;
