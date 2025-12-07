import React from "react";
import "./Layout.css";
import navBarImage from "../../../assets/images/icons/nav-bar.png";
import breakfastClubLogo from "../../../assets/images/breakfast_club_logo.png";

function Header({ onNavClick }) {
  return (
    <header className="header">
      <div className="nav-bar-button" onClick={onNavClick}>
        <img src={navBarImage} alt="Navigation" />
      </div>
      <div className="logo-container">
        <img src={breakfastClubLogo} alt="Breakfast Club Logo" />
      </div>
    </header>
  );
}

export default Header;

