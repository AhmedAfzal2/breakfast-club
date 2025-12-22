import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ReservationPageWrapper from "./pages/ReservationPageWrapper";
import MenuPageWrapper from "./pages/MenuPageWrapper";
import ContactPage from "./pages/ContactPage";
import ReviewsPage from "./pages/ReviewsPage";
import AboutUs from "./pages/AboutUs";
import Game from "./components/reservation/game/Game";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPageWrapper />} />
        <Route path="/reservations" element={<ReservationPageWrapper />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>

    // <div style={{ width: 1200, height: 580, margin: "auto" }}>
    //   <Game reservedTables={[]} enabled={true}></Game>
    // </div>
  );
}

export default App;
