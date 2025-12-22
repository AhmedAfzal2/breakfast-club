import React from "react";
import "./AboutUs.css";
import Layout from "../components/Layout/Layout";

function AboutUs() {
  return (
    <Layout>
      <div className="aboutus-container">
        <h1 className="page-heading">ABOUT US</h1>
        <div className="aboutus-content">
          <p>Welcome to Breakfast Club, where every morning starts with a smile!</p>
        </div>
      </div>
    </Layout>
  );
}

export default AboutUs;

