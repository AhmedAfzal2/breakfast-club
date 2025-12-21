import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import "../../App.css";
import "./ReservationPage.css";
import Calendar from "./components/Calendar";
import Time from "./components/Time";
import SlotDetails from "./components/SlotDetails";

function MobileReservationPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDateError("");
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    setTimeError("");
  };

  return (
    <Layout>
      <div className="mobile-reservation-page">
        <h1 className="page-heading">DATE AND TIME</h1>
        
        <div className="mobile-reservation-content">
          <Calendar
            selectedDate={selectedDate}
            onChange={handleDateChange}
            dateError={dateError}
          />
          
          <Time
            selectedTime={selectedTime}
            onTimeChange={handleTimeChange}
            timeError={timeError}
          />
          
          <SlotDetails
            selectedDate={selectedDate}
            selectedTime={selectedTime}
          />
        </div>
      </div>
    </Layout>
  );
}

export default MobileReservationPage;

