import React from "react";
import "./Layout.css";

function NavBarRow({ icon, text }) {
  return (
    <div className="nav-item">
      <div className="nav-icon">
        {icon}
      </div>
      <span>{text}</span>
    </div>
  );
}

export default NavBarRow;

