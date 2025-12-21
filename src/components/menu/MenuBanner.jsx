import React from "react";
import "./MenuBanner.css";
import CartIcon from "./CartIcon";

const MenuBanner = React.forwardRef(({ imageSrc, alt = "Banner" }, ref) => {
  return (
    <div ref={ref} className="menu-banner">
      <img src={imageSrc} alt={alt} className="menu-banner-image" />
    </div>
  );
});

MenuBanner.displayName = "MenuBanner";

export default MenuBanner;
