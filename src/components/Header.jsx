import React from "react";
import "./MainView.css";
import navBarImage from "../../assets/images/icons/nav-bar.png";
import breakfastClubLogo from "../../assets/images/breakfast_club_logo.png";

function Header() {
  return (
    <header className="header">
      <div className="nav-bar-button">
        <img src={navBarImage} alt="Navigation" />
      </div>
      <div className="logo-container">
        <img src={breakfastClubLogo} alt="Breakfast Club Logo" />
      </div>
    </header>
  );
}

export default Header;

