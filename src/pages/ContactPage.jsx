import React from "react";
import Layout from "../components/Layout/Layout";
import ContactForm from "../components/contact-us/ContactForm";
import "../App.css";
import "./ContactPage.css";

function ContactPage() {
  return (
    <Layout>
      <div className="contact-page">
        <h1 className="page-heading">CONTACT US</h1>
        <ContactForm />
      </div>
    </Layout>
  );
}

export default ContactPage;

