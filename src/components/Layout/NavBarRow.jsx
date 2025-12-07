import React from "react";
import { useNavigate } from "react-router-dom";
import "./Layout.css";

function NavBarRow({ icon, text, path, onClose }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (path) {
      navigate(path);
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <div className="nav-item" onClick={handleClick}>
      <div className="nav-icon">
        {icon}
      </div>
      <span>{text}</span>
    </div>
  );
}

export default NavBarRow;

