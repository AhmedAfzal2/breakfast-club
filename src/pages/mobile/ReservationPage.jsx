import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import "../../App.css";
import "./ReservationPage.css";
import Calendar from "./components/Calendar";
import Time from "./components/Time";
import SlotDetails from "./components/SlotDetails";
import Button from "../../components/Button";
import ConfirmationPopup from "../../components/ConfirmationPopup";
import SelectTablePopup from "./components/SelectTablePopup";
import ContactInfoPopup from "./components/ContactInfoPopup";
import tables from "../../components/reservation/game/tables";

function MobileReservationPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [reservedTables, setReservedTables] = useState([]);
  const [showValidationPopup, setShowValidationPopup] = useState(false);
  const [showSelectTablePopup, setShowSelectTablePopup] = useState(false);
  const [showContactInfoPopup, setShowContactInfoPopup] = useState(false);
  const [selectedTables, setSelectedTables] = useState([]);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [showRestaurantClosedPopup, setShowRestaurantClosedPopup] = useState(false);
  const [showAllTablesReservedPopup, setShowAllTablesReservedPopup] = useState(false);

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
        // Check if all tables are reserved
        if (result.length === tables.length) {
          setShowAllTablesReservedPopup(true);
        } else {
          setShowAllTablesReservedPopup(false);
        }
      });
    } else {
      setReservedTables([]);
      setShowAllTablesReservedPopup(false);
    }
  }, [selectedDate, selectedTime]);

  // Check if restaurant is closed for today
  const isRestaurantClosedForToday = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // Restaurant closes at 4pm (16:00)
    return currentHour >= 16;
  };

  // Check if selected date is today
  const isSelectedDateToday = (date) => {
    if (!date) return false;
    const today = new Date();
    const selectedDateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return selectedDateOnly.getTime() === todayOnly.getTime();
  };

  const handleDateChange = (date) => {
    // Check if restaurant is closed for today and user is selecting today's date
    if (date && isSelectedDateToday(date) && isRestaurantClosedForToday()) {
      setShowRestaurantClosedPopup(true);
      setSelectedDate(null);
      setSelectedTime(null);
      return;
    }
    
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

  const handleContinueClick = () => {
    // Validate that both date and time are selected
    if (!selectedDate || !selectedTime) {
      setShowValidationPopup(true);
      return;
    }
    
    // Check if all tables are reserved
    if (reservedTables.length === tables.length) {
      setShowAllTablesReservedPopup(true);
      return;
    }
    
    // If both are selected, show the select table popup
    setShowSelectTablePopup(true);
  };

  const getTableCapacity = (tableId) => {
    return tables.find((t) => t.id === tableId)?.capacity || 0;
  };

  const handleTableSelect = (tableId) => {
    // Check if table is already selected
    const isAlreadySelected = selectedTables.some(
      (table) => table.id === tableId
    );

    if (!isAlreadySelected) {
      // Add the table to the selected list with capacity from tables configuration
      const capacity = getTableCapacity(tableId);
      setSelectedTables((prevTables) => [
        ...prevTables,
        { id: tableId, capacity: capacity },
      ]);
    }
  };

  const handleTableDeselect = (tableId) => {
    setSelectedTables((prevTables) =>
      prevTables.filter((table) => table.id !== tableId)
    );
  };

  const handleTableContinue = () => {
    // Open contact info popup without closing select table popup
    setShowContactInfoPopup(true);
  };

  const calculateMaxGuests = () => {
    if (selectedTables.length === 0) return 0;
    return selectedTables.reduce((total, table) => total + table.capacity, 0);
  };

  const handleContactFormSubmit = async (formData) => {
    // Validate that date and time are selected
    if (!selectedDate || !selectedTime) {
      setShowContactInfoPopup(false);
      setShowValidationPopup(true);
      return;
    }

    // Validate that at least one table is selected
    if (selectedTables.length === 0) {
      setShowContactInfoPopup(false);
      setShowSelectTablePopup(true);
      // The SelectTablePopup will show its own validation popup
      return;
    }

    const tableNumbers = selectedTables.map((table) => table.id);
    const maxGuests = calculateMaxGuests();

    const reservationData = {
      date: selectedDate ? selectedDate.toISOString() : null,
      time: selectedTime ? selectedTime.toISOString() : null,
      tableNumbers: tableNumbers,
      name: formData.name,
      contactNumber: formData.contactNumber,
      occasion: formData.occasion || null,
      additionalNotes: formData.additionalNotes || null,
      maxGuests: maxGuests,
      tables: selectedTables,
    };

    try {
      const response = await fetch(
        "http://localhost:3001/api/reservations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reservationData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("Reservation submitted successfully:", reservationData);
        // Close all popups first
        setShowSelectTablePopup(false);
        setShowContactInfoPopup(false);
        setShowValidationPopup(false);
        // Show confirmation popup (state will be cleared when popup is closed)
        setIsConfirmationOpen(true);
      } else {
        console.error("Failed to submit reservation:", result.message);
      }
    } catch (error) {
      console.error("Error submitting reservation:", error);
    }
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
        <div className="mobile-reservation-button-section">
          <Button text="continue" onClick={handleContinueClick} />
        </div>
      </div>
      <ConfirmationPopup
        isOpen={showValidationPopup}
        onClose={() => setShowValidationPopup(false)}
        type="error"
      />
      <SelectTablePopup
        isOpen={showSelectTablePopup}
        onClose={() => setShowSelectTablePopup(false)}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        reservedTables={reservedTables}
        selectedTables={selectedTables}
        onTableSelect={handleTableSelect}
        onTableDeselect={handleTableDeselect}
        onContinue={handleTableContinue}
      />
      <ContactInfoPopup
        isOpen={showContactInfoPopup}
        onClose={() => setShowContactInfoPopup(false)}
        onSubmit={handleContactFormSubmit}
      />
      <ConfirmationPopup
        isOpen={isConfirmationOpen}
        onClose={() => {
          setIsConfirmationOpen(false);
          // Ensure all popups are closed and state is cleared
          setShowSelectTablePopup(false);
          setShowContactInfoPopup(false);
          setShowValidationPopup(false);
          setSelectedDate(null);
          setSelectedTime(null);
          setSelectedTables([]);
          setReservedTables([]);
          setDateError("");
          setTimeError("");
        }}
        type="reservation"
      />
      <ConfirmationPopup
        isOpen={showRestaurantClosedPopup}
        onClose={() => setShowRestaurantClosedPopup(false)}
        type="restaurant-closed"
      />
      <ConfirmationPopup
        isOpen={showAllTablesReservedPopup}
        onClose={() => {
          setShowAllTablesReservedPopup(false);
          // Clear date and time when all tables are reserved
          setSelectedDate(null);
          setSelectedTime(null);
        }}
        type="all-tables-reserved"
      />
    </Layout>
  );
}

export default MobileReservationPage;

