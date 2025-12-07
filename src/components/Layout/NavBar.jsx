import React from "react";
import "./Layout.css";
import crossIcon from "../../../assets/images/icons/cross.png";
import chickens from "../../../assets/images/icons/chickens.png";
import menuIcon from "../../../assets/images/icons/menu.png";
import aboutIcon from "../../../assets/images/icons/about.png";
import contactIcon from "../../../assets/images/icons/contact.png";
import reservationIcon from "../../../assets/images/icons/reservation.png";
import NavBarRow from "./NavBarRow";

function NavBar({ isOpen, onClose }) {
  const navItems = [
    { icon: menuIcon, text: "menu", path: "/" },
    { icon: aboutIcon, text: "about us", path: "/" },
    { icon: contactIcon, text: "contact us", path: "/contact" },
    { icon: reservationIcon, text: "reservations", path: "/reservations" },
  ];

  return (
    <>
      <div
        className={`nav-overlay ${isOpen ? "active" : ""}`}
        onClick={onClose}
      ></div>
      <nav className={`nav-bar ${isOpen ? "active" : ""}`}>
        <div className="nav-content">
          <div className="nav-close-button" onClick={onClose}>
            <img src={crossIcon} alt="Close" />
          </div>
          <div className="nav-items">
            {navItems.map((item, index) => (
              <NavBarRow 
                key={index} 
                icon={item.icon} 
                text={item.text} 
                path={item.path}
                onClose={onClose}
              />
            ))}
          </div>
          <div className="nav-chickens">
            <img src={chickens} alt="Chickens" />
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;

