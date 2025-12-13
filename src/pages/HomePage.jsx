import React from "react";
import Layout from "../components/Layout/Layout";
import HeroSection from "../components/HomePage/HeroSection";

function HomePage() {
  return (
    <Layout>
      <div className="homepage-container">
      <HeroSection />
      {/* Future sections will go here: */}
      {/* <DishesSection /> */}
      {/* <ReviewsSection /> */}
    </div>
    </Layout>
  );
}

export default HomePage;
