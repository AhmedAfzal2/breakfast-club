import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import NavBar from "./NavBar";
import "./Layout.css";

function Layout({ children }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="main-view">
      <Header onNavClick={toggleNav} />
      <NavBar isOpen={isNavOpen} onClose={toggleNav} />
      <div className="layout-content">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;

