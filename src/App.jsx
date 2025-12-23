import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ReservationPageWrapper from "./pages/ReservationPageWrapper";
import MenuPageWrapper from "./pages/MenuPageWrapper";
import ContactPage from "./pages/ContactPage";
import ReviewsPage from "./pages/ReviewsPage";
import AboutUs from "./pages/AboutUs";
import AdminPage from "./pages/AdminPage";
import Game from "./components/reservation/game/Game";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99999
      }}>
        <video 
          src="/assets/HomePage/loading.mp4" 
          autoPlay 
          muted 
          playsInline
          style={{
            width: '400px',
            height: 'auto',
            marginBottom: '1rem'
          }}
        />
        <h1 style={{
          fontFamily: "'Pixelify Sans', sans-serif",
          color: 'var(--gamboge)',
          fontSize: '2rem',
          margin: 0
        }}>
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPageWrapper />} />
        <Route path="/reservations" element={<ReservationPageWrapper />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>

    // <div style={{ width: 1200, height: 580, margin: "auto" }}>
    //   <Game reservedTables={[]} enabled={true}></Game>
    // </div>
  );
}

export default App;
