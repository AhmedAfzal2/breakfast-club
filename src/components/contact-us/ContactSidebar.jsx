import React from "react";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube, Linkedin } from "lucide-react";
import "./ContactSidebar.css";

function ContactSidebar() {
  return (
    <div className="contact-sidebar">
      {/* Contact Info */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">Contact Information</h3>
        <div className="contact-info-item">
          <Mail className="contact-icon" size={20} />
          <a href="mailto:breakfastclubresturant@gmail.com" className="contact-link">
            breakfastclubresturant@gmail.com
          </a>
        </div>
        <div className="contact-info-item">
          <Phone className="contact-icon" size={20} />
          <a href="tel:+1234567890" className="contact-link">
            +1 (234) 567-890
          </a>
        </div>
      </div>

      {/* Other Branches */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">Other Branches</h3>
        <div className="branch-item">
          <MapPin className="branch-icon" size={18} />
          <div className="branch-details">
            <p className="branch-name">Downtown Branch</p>
            <p className="branch-address">123 Main Street, City Center</p>
          </div>
        </div>
        <div className="branch-item">
          <MapPin className="branch-icon" size={18} />
          <div className="branch-details">
            <p className="branch-name">Mall Branch</p>
            <p className="branch-address">456 Shopping Mall, North District</p>
          </div>
        </div>
        <div className="branch-item">
          <MapPin className="branch-icon" size={18} />
          <div className="branch-details">
            <p className="branch-name">Airport Branch</p>
            <p className="branch-address">789 Airport Road, Terminal 2</p>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">Follow Us</h3>
        <div className="social-links">
          <a href="#" className="social-link" aria-label="Instagram">
            <Instagram size={24} />
          </a>
          <a href="#" className="social-link" aria-label="Facebook">
            <Facebook size={24} />
          </a>
          <a href="#" className="social-link" aria-label="Twitter">
            <Twitter size={24} />
          </a>
          <a href="#" className="social-link" aria-label="YouTube">
            <Youtube size={24} />
          </a>
          <a href="#" className="social-link" aria-label="LinkedIn">
            <Linkedin size={24} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactSidebar;

