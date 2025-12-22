import React from "react";
import "./MenuBanner.css";
import CartIcon from "./CartIcon";

function MenuBanner({ imageSrc, mobileImageSrc, alt = "Banner" }) {
  return (
    <div className="menu-banner">
      <img 
        src={imageSrc} 
        alt={alt} 
        className="menu-banner-image desktop-banner" 
      />
      <img 
        src={mobileImageSrc || imageSrc} 
        alt={alt} 
        className="menu-banner-image mobile-banner" 
      />
    </div>
  );
}

export default MenuBanner;
