import React from "react";
import "./AboutUs.css";
import Layout from "../components/Layout/Layout";
import OurHistory from "../components/about-us/OurHistory";
import OurMission from "../components/about-us/OurMission";
import OurTeam from "../components/about-us/OurTeam";

function AboutUs() {
  return (
    <Layout>
      <h1 className="page-heading">ABOUT US</h1>
      <div className="aboutus-container">
        <OurHistory />
        <OurMission />
        <OurTeam />
      </div>
    </Layout>
  );
}

export default AboutUs;

