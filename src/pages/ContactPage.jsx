import React from "react";
import Layout from "../components/Layout/Layout";
import ContactForm from "../components/contact-us/ContactForm";
import ContactSidebar from "../components/contact-us/ContactSidebar";
import "../App.css";
import "./ContactPage.css";

function ContactPage() {
  return (
    <Layout>
      <div className="contact-page">
        <h1 className="page-heading">CONTACT US</h1>
        <div className="contact-grid">
          <div className="contact-form-column">
            <ContactForm />
          </div>
          <div className="contact-sidebar-column">
            <ContactSidebar />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ContactPage;

