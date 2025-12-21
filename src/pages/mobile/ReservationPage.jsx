import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import "../../App.css";
import "./ReservationPage.css";
import Calendar from "./components/Calendar";
import Time from "./components/Time";
import SlotDetails from "./components/SlotDetails";
import tables from "../../components/reservation/game/tables";

function MobileReservationPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [reservedTables, setReservedTables] = useState([]);

  // Fetch reserved tables from database for the given date and time
  const getReservedTables = async (date, time) => {
    try {
      if (!date || !time) {
        return [];
      }

      const response = await fetch(
        `http://localhost:3001/api/reservations/reserved-tables?date=${encodeURIComponent(date.toISOString())}&time=${encodeURIComponent(time.toISOString())}`
      );

      if (response.ok) {
        const result = await response.json();
        return result.reservedTableIds || [];
      } else {
        console.error('Error fetching reserved tables:', response.statusText);
        return [];
      }
    } catch (error) {
      console.error('Error fetching reserved tables:', error);
      return [];
    }
  };

  // Update reserved tables whenever date and time are selected
  useEffect(() => {
    if (selectedDate && selectedTime) {
      getReservedTables(selectedDate, selectedTime).then(result => {
        setReservedTables(result);
      });
    } else {
      setReservedTables([]);
    }
  }, [selectedDate, selectedTime]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDateError("");
    // Clear time and time error when date is selected
    if (date) {
      if (timeError === "please select date first") {
        setTimeError("");
      }
    } else {
      // If date is cleared, also clear time
      setSelectedTime(null);
      setTimeError("");
    }
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
            selectedDate={selectedDate}
          />
          
          <SlotDetails
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            reservedTables={reservedTables}
            tables={tables}
          />
        </div>
      </div>
    </Layout>
  );
}

export default MobileReservationPage;

