// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import breakfastClubLogo from "/assets/images/breakfast_club_logo.png";
import {
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Facebook,
  Github,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-indicator">
        <ChevronUp className="chevron chevron-up" size={22} />
        <ChevronDown className="chevron chevron-down" size={22} />
      </div>
      <div className="footer-top">
        <div className="footer-logo">
          <img src={breakfastClubLogo} alt="Breakfast Club Logo" />
        </div>
        <div className="footer-line"></div>
        <div className="footer-links">
          <Link to="/menu">Menu</Link>
          <Link to="/">About us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/reservations">Reservations</Link>
        </div>
      </div>
      <div className="footer-heading">
        <h1>EXPLORE OUR SERVICES!</h1>
      </div>
      <div className="footer-tools">
        <Link to="/menu" className="tool-card">
          <div className="tool-text">
            <span>
              <strong style={{ color: "var(--china-rose)" }}>ORDER</strong> now!
            </span>
            <p>
              Check out our delicious menu with everything ranging from sweet to
              savoury breakfast items.
            </p>
          </div>
          <div className="tool-image">
            <img
              src="assets/images/menu-items/breakfast/hot-breakfast/pancake.png"
              alt="Order Food"
            />
          </div>
        </Link>
        <Link to="/menu" className="tool-card">
          <div className="tool-text">
            <span>
              <strong style={{ color: "var(--china-rose)" }}>BEVERAGES</strong>{" "}
              for you
            </span>
            <p>
              Enjoy our selection of fresh juices, aromatic coffees, and
              refreshing teas to complement your meal.
            </p>
          </div>
          <div className="tool-image">
            <img src="assets\images\menu-items\drinks\Cold\sharbat.png" alt="Beverages" />
          </div>
        </Link>
        <Link to="/reservations" className="tool-card">
          <div className="tool-text">
            <span>
              <strong style={{ color: "var(--china-rose)" }}>RESERVE</strong>{" "}
              now!
            </span>
            <p>
              Book a table in advance to ensure you have a spot at the popular
              breakfast club.
            </p>
          </div>
          <div className="tool-image">
            <img src="/assets/images/hen.png" alt="Reserve Table" />
          </div>
        </Link>
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
