import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DateTimePage from "./pages/DateTimePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reservations" element={<DateTimePage />} />
      </Routes>
    </Router>
  );
}

export default App;
