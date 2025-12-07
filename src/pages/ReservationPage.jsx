import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Layout from "../components/Layout/Layout";
import Button from "../components/Button";
import FormContainer from "../components/FormContainer";
import TimeSpinner from "../components/TimeSpinner";
import ReservationForm from "../components/ReservationForm";
import calendarIcon from "../../assets/images/icons/calendar.png";
import clockIcon from "../../assets/images/icons/clock.png";
import "../App.css";
import "./ReservationPage.css";

function ReservationPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isTimeSpinnerOpen, setIsTimeSpinnerOpen] = useState(false);
  const [isReservationFormOpen, setIsReservationFormOpen] = useState(false);
  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");
  // Default tables: 2x 4-seater, 2x 2-seater
  // This will be updated when the table selection game is implemented
  const [selectedTables, setSelectedTables] = useState([
    { id: 1, capacity: 4 },
    { id: 2, capacity: 4 },
    { id: 3, capacity: 2 },
    { id: 4, capacity: 2 },
  ]);

  // Calculate max guests based on selected tables
  const calculateMaxGuests = () => {
    if (selectedTables.length === 0) return 0;
    return selectedTables.reduce((total, table) => total + table.capacity, 0);
  };

  // Get table counts by capacity
  const getTableCounts = () => {
    const counts = {};
    selectedTables.forEach((table) => {
      counts[table.capacity] = (counts[table.capacity] || 0) + 1;
    });
    return counts;
  };

  // Validate date and time before opening reservation form
  const validateDateAndTime = () => {
    let isValid = true;
    
    if (!selectedDate) {
      setDateError("Date is required");
      isValid = false;
    } else {
      setDateError("");
    }
    
    if (!selectedTime) {
      setTimeError("Time is required");
      isValid = false;
    } else {
      setTimeError("");
    }
    
    return isValid;
  };

  // Handle reserve button click with validation
  const handleReserveClick = () => {
    if (validateDateAndTime()) {
      setIsReservationFormOpen(true);
    }
  };

  const tableCounts = getTableCounts();
  const maxGuests = calculateMaxGuests();

  // Get current month start and end dates
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  // Get minimum time (1 hour from now, rounded to next 30-minute interval)
  const getMinTime = () => {
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
    const minutes = oneHourFromNow.getMinutes();
    const roundedMinutes = minutes <= 30 ? 30 : 60;
    const minTime = new Date(oneHourFromNow);
    minTime.setMinutes(roundedMinutes === 60 ? 0 : roundedMinutes);
    if (roundedMinutes === 60) {
      minTime.setHours(minTime.getHours() + 1);
    }
    minTime.setSeconds(0);
    minTime.setMilliseconds(0);
    return minTime;
  };

  const minTime = getMinTime();

  const CustomDateInput = ({ value, onClick }) => (
    <div className="date-input-wrapper">
      <input
        type="text"
        value={value || ""}
        onClick={onClick}
        placeholder="mm/dd/yyyy"
        className="date-input"
        readOnly
      />
      <button type="button" className="calendar-icon-button" onClick={onClick}>
        <img src={calendarIcon} alt="Calendar" />
      </button>
    </div>
  );

  const formatTimeDisplay = () => {
    if (!selectedTime) return "";
    const h = selectedTime.getHours();
    const m = selectedTime.getMinutes();
    const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
    const ampm = h >= 12 ? "PM" : "AM";
    return `${hour12.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")} ${ampm}`;
  };

  const handleTimeIconClick = (e) => {
    e.stopPropagation();
    setIsTimeSpinnerOpen(!isTimeSpinnerOpen);
  };

  const handleTimeInputClick = () => {
    setIsTimeSpinnerOpen(true);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    setIsTimeSpinnerOpen(false);
    if (time) {
      setTimeError("");
    }
  };

  // Popup only closes when tick button is clicked, not on outside click

  const CustomTimeInput = ({ value, onClick }) => (
    <div className="time-input-wrapper">
      <input
        type="text"
        value={formatTimeDisplay()}
        onClick={handleTimeInputClick}
        placeholder="--:--"
        className="time-input"
        readOnly
      />
      <button
        type="button"
        className="clock-icon-button"
        onClick={handleTimeIconClick}
      >
        <img src={clockIcon} alt="Clock" />
      </button>
      {isTimeSpinnerOpen && (
        <div
          className="time-spinner-popup"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <TimeSpinner
            selectedTime={selectedTime}
            onTimeChange={handleTimeChange}
            minTime={minTime}
          />
        </div>
      )}
    </div>
  );

  const formFields = [
    {
      label: "date",
      component: (
        <div>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              if (date) {
                setDateError("");
              }
            }}
            dateFormat="MM/dd/yyyy"
            customInput={<CustomDateInput />}
            wrapperClassName="date-picker-wrapper"
            minDate={today}
            maxDate={currentMonthEnd}
            filterDate={(date) => {
              // Only allow dates in current month and not in the past
              const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
              return dateOnly >= today && dateOnly <= currentMonthEnd;
            }}
            openToDate={today}
            showMonthDropdown={false}
            showYearDropdown={false}
          />
          {dateError && <span className="field-error-message">{dateError}</span>}
        </div>
      ),
      sectionClassName: "form-section",
      wrapperClassName: "form-field-wrapper",
    },
    {
      label: "time",
      component: (
        <div>
          <CustomTimeInput />
          {timeError && <span className="field-error-message">{timeError}</span>}
        </div>
      ),
      sectionClassName: "form-section",
      wrapperClassName: "form-field-wrapper",
    },
  ];

  return (
    <Layout>
      <div className="reservation-page">
        <h1 className="page-heading">RESERVE TABLES</h1>

        <FormContainer fields={formFields} className="date-time-form" />

        <div className="table-selection-container">
          <div className="table-selection">
            <label className="heading section-label">
              select table
              <span className="help-icon">?</span>
            </label>
            <div className="table-game-container">
              {/* Game table will be added here */}
            </div>
          </div>
          <div className="details-section">
            <div className="slot-details-section">
              <h3 className="heading section-label">slot details</h3>
              <div className="slot-line" />
              <div className="slot-content">
                {selectedTables.length > 0 ? (
                  <>
                    {Object.entries(tableCounts)
                      .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
                      .map(([capacity, count], index, array) => (
                        <React.Fragment key={capacity}>
                          <span>
                            {count}x {capacity}-seater
                          </span>
                          {index < array.length - 1 && (
                            <span className="bullet">•</span>
                          )}
                        </React.Fragment>
                      ))}
                  </>
                ) : (
                  <span>No tables selected</span>
                )}
              </div>
              <div className="slot-max">max guests: {maxGuests}</div>
            </div>
            <div className="reservation-details-section">
              <h3 className="heading section-label">reservation details</h3>
              <div className="slot-line" />
              <div className="reservation-info">
                {/* Reservation details will be displayed here */}
              </div>
            </div>
            <div className="reserve-button-section">
              <Button 
                text="reserve" 
                onClick={handleReserveClick}
              />
            </div>
          </div>
        </div>
      </div>
      <ReservationForm
        isOpen={isReservationFormOpen}
        onClose={() => setIsReservationFormOpen(false)}
        onSubmit={async (formData) => {
          // Extract table numbers as a list
          const tableNumbers = selectedTables.map(table => table.id);
          
          // Format reservation data with required and optional fields clearly marked
          const reservationData = {
            // Required fields
            date: selectedDate ? selectedDate.toISOString() : null,
            time: selectedTime ? selectedTime.toISOString() : null,
            tableNumbers: tableNumbers, // List of table IDs
            name: formData.name,
            contactNumber: formData.contactNumber,
            
            // Optional fields
            occasion: formData.occasion || null,
            additionalNotes: formData.additionalNotes || null,
            
            // Additional data
            maxGuests: maxGuests,
            tables: selectedTables // Full table objects (for reference)
          };

          // Print reservation data as JSON to console
          console.log("=== RESERVATION DATA ===");
          console.log(JSON.stringify(reservationData, null, 2));
          console.log("========================");

          try {
            const response = await fetch('http://localhost:3001/api/reservations', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(reservationData),
            });

            const result = await response.json();

            if (response.ok) {
              console.log("Reservation submitted successfully:", reservationData);
              setIsReservationFormOpen(false);
              // Optionally show a success message or redirect
            } else {
              console.error("Failed to submit reservation:", result.message);
              // Optionally show an error message
            }
          } catch (error) {
            console.error('Error submitting reservation:', error);
            // Optionally show an error message
          }
        }}
      />
    </Layout>
  );
}

export default ReservationPage;
