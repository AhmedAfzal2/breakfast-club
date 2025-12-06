import React from "react";
import "./MainView.css";

function NavBarRow({ icon, text }) {
  return (
    <div className="nav-item">
      <img src={icon} alt={text} />
      <span>{text}</span>
    </div>
  );
}

export default NavBarRow;

