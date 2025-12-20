import React from "react";
import "./Layout.css";
import chickens from "/assets/images/icons/chickens.png";
import NavBarRow from "./NavBarRow";
import { Menu, Info, Phone, Calendar, Star, X} from "lucide-react";

function NavBar({ isOpen, onClose }) {
  const navItems = [
    { icon: Menu, text: "menu", path: "/menu" },
    { icon: Info, text: "about us", path: "/" },
    { icon: Phone, text: "contact us", path: "/contact" },
    { icon: Calendar, text: "reservations", path: "/reservations" },
    { icon: Star, text: "reviews", path: "/reviews" },
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
            <X className="pixel-icon" size={40} strokeWidth={3} />
          </div>
          <div className="nav-items">
            {navItems.map((item, index) => (
              <NavBarRow 
                key={index} 
                icon={<item.icon className="pixel-icon" />} 
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