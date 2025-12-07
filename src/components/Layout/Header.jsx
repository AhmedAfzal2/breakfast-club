import React from "react";
import "./Layout.css";
import breakfastClubLogo from "/assets/images/breakfast_club_logo.png";
import { Menu } from 'lucide-react';

function Header({ onNavClick }) {
  return (
    <header className="header">
      <div className="nav-bar-button" onClick={onNavClick}>
        <Menu size={50}/>
      </div>
      <div className="logo-container">
        <img src={breakfastClubLogo} alt="Breakfast Club Logo" />
      </div>
    </header>
  );
}

export default Header;
