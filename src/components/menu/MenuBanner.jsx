import React from "react";
import "./MenuBanner.css";

function MenuBanner({ imageSrc, alt = "Banner" }) {
  return (
    <div className="menu-banner">
      <img src={imageSrc} alt={alt} className="menu-banner-image" />
    </div>
  );
}

export default MenuBanner;

