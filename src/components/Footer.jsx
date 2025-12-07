// src/components/Footer.jsx
import React from "react";
import "./Footer.css";
import breakfastClubLogo from "../../assets/images/breakfast_club_logo.png";
import { Instagram, Linkedin, Twitter, Youtube, Facebook, Github } from "lucide-react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">
          <img src={breakfastClubLogo} alt="Breakfast Club Logo" />
        </div>
        <div className="footer-line"></div>
        <div className="footer-links">
          <a href="#menu">Menu</a>
          <a href="#about">About us</a>
          <a href="#contact">Contact</a>
          <a href="#reservations">Reservations</a>
        </div>
      </div>
      <div><h>Explore our services!</h></div>
      <div className="footer-tools">
        <div className="tool-card">
          <span><strong>ORDER</strong> now!</span>
          <p>Check out our delicious menu with everything rangind from sweet to savoury breakfast items.</p>
        </div>
        <div className="tool-card">
          <span><strong>BEVERAGES</strong> for yous</span>
          <p>Enjoy our selection of fresh juices, aromatic coffees, and refreshing teas to complement your meal.</p>
        </div>
        <div className="tool-card">
          <span><strong>RESERVE</strong> now!</span>
          <p>Book a table in advance to ensure you have a spot at the popular breakfast club.</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-legal">
          <a href="#legal">Legal Center</a>
          <a href="#status">Status</a>
        </div>
        <div className="footer-line"></div>
        <div className="footer-social">
          <Instagram size={20} />
          <Linkedin size={20} />
          <Twitter size={20} />
          <Youtube size={20} />
          <Facebook size={20} />
          <Github size={20} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
