import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import ContactForm from "../components/contact-us/ContactForm";
import ContactSidebar from "../components/contact-us/ContactSidebar";
import ConfirmationPopup from "../components/ConfirmationPopup";
import "../App.css";
import "./ContactPage.css";

const locations = [
  { 
    id: 1, 
    name: "Concordia 1", 
    address: "Wannabe Breakfast Club", 
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.412483328007!2d72.99020759999999!3d33.64647250000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df9674e3b3610d%3A0x7eedc02774b86117!2sConcordia%201%20(C1)%20NUST!5e0!3m2!1sen!2s!4v1766417459788!5m2!1sen!2s"
  },
  { 
    id: 2, 
    name: "Concordia 2", 
    address: "Real Breakfast Club", 
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.5462936566223!2d72.9880843!3d33.6430042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df967404deb029%3A0x509a14032eba434!2sConcordia%202%2C%20Indus%20Loop%2C%20H-12%2C%20Islamabad!5e0!3m2!1sen!2s!4v1766417318860!5m2!1sen!2s"
  },
  { 
    id: 3, 
    name: "Concordia 3", 
    address: "Breakfast Club (monal version)", 
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.5887301656876!2d72.99394389999999!3d33.6419042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df951c3e95c429%3A0xd7b14e1db800e119!2sConcordia%203%20(Center%20Point%20Cafe)!5e0!3m2!1sen!2s!4v1766417201634!5m2!1sen!2s"
  }
];

function ContactPage() {
  const [selectedLocation, setSelectedLocation] = React.useState(locations[0]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleFormSubmit = () => {
    setShowConfirmation(true);
  };

  return (
    <Layout>
      <div className="contact-page">
        <h1 className="page-heading">CONTACT US</h1>
        <div className="contact-grid">
          <div className="contact-form-column">
            <ContactForm onSuccess={handleFormSubmit} />
          </div>
          <div className="contact-sidebar-column">
            <ContactSidebar 
              locations={locations} 
              selectedLocation={selectedLocation} 
              onLocationSelect={setSelectedLocation} 
            />
          </div>
        </div>
        
        <div className="map-section">
          <h3 className="map-title">LOCATION</h3>
          <div className="map-container">
            <iframe
              title="Location Map"
              width="100%"
              height="400"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src={selectedLocation.mapUrl}
              style={{ borderRadius: '10px', border: '2px solid var(--gamboge)' }}
            ></iframe>
          </div>
        </div>
      </div>
      <ConfirmationPopup
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        type="contact"
      />
    </Layout>
  );
}

export default ContactPage;

