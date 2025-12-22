import React, { useState } from "react";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube, Linkedin } from "lucide-react";
import "./ContactSidebar.css";

function ContactSidebar({ locations, selectedLocation, onLocationSelect }) {
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

      {/* Locations */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">Locations</h3>
        {locations.map((location) => (
          <div 
            key={location.id} 
            className={`branch-item ${selectedLocation.id === location.id ? 'active' : ''}`}
            onClick={() => onLocationSelect(location)}
            style={{ cursor: 'pointer' }}
          >
            <MapPin className="branch-icon" size={18} />
            <div className="branch-details">
              <p className="branch-name">{location.name}</p>
              <p className="branch-address">{location.address}</p>
            </div>
          </div>
        ))}
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

