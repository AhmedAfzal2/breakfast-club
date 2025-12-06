import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import NavBar from "./NavBar";
import "./MainView.css";

function MainView() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="main-view">
      <Header onNavClick={toggleNav} />
      <NavBar isOpen={isNavOpen} onClose={toggleNav} />
      <Footer />
    </div>
  );
}

export default MainView;

