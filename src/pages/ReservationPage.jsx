import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Layout from "../components/Layout/Layout";
import Button from "../components/Button";
import FormContainer from "../components/reservation/FormContainer";
import TimeSpinner from "../components/reservation/TimeSpinner";
import ReservationForm from "../components/reservation/ReservationForm";
import calendarIcon from "../../assets/images/icons/calendar.png";
import clockIcon from "../../assets/images/icons/clock.png";
import Game from "../components/reservation/game/Game";
import tables from "../components/reservation/game/tables";
import "../App.css";
import "./ReservationPage.css";
import ConfirmationPopup from "../components/ConfirmationPopup";
import MobileReservationPage from "./mobile/ReservationPage";

function ReservationPage() {
  // Initialize with actual window width check
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 1000;
    }
    return false;
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isTimeSpinnerOpen, setIsTimeSpinnerOpen] = useState(false);
  const [isReservationFormOpen, setIsReservationFormOpen] = useState(false);
  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [isHelpPopupOpen, setIsHelpPopupOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  // Default tables: 2x 4-seater, 2x 2-seater
  // This will be updated when the table selection game is implemented
  const [selectedTables, setSelectedTables] = useState([]);
  const [gameEnable, setGameEnable] = useState(false);
  const [reservedTables, setReservedTables] = useState([]);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 1000;
      setIsMobile(mobile);
      console.log('Mobile check:', mobile, 'Width:', window.innerWidth);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Render mobile version on mobile devices
  if (isMobile) {
    console.log('Rendering mobile version');
    return <MobileReservationPage />;
  }
  
  console.log('Rendering desktop version');

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

  const getTableCapacity = (tableId) => {
    return tables.find((t) => t.id == tableId).capacity;
  };

  // Handle table selection - adds a table to the selectedTables list
  const handleTableSelect = (tableId) => {
    // Check if table is already selected
    const isAlreadySelected = selectedTables.some(
      (table) => table.id === tableId
    );

    if (!isAlreadySelected) {
      // Add the table to the selected list with dummy capacity
      // Capacity will be fetched from database later
      const capacity = getTableCapacity(tableId);
      setSelectedTables((prevTables) => [
        ...prevTables,
        { id: tableId, capacity: capacity },
      ]);
    }
  };

  // Handle table deselection - removes a table from the selectedTables list
  const handleTableDeselect = (tableId) => {
    setSelectedTables((prevTables) =>
      prevTables.filter((table) => table.id !== tableId)
    );
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

  const getTotalSeats = () => {
    let total = 0;
    for (const table of tables)
      if (!reservedTables.includes(table.id)) total += table.capacity;

    return total;
  };

  const getFreeNSeaters = (n) => {
    let total = 0;
    for (const table of tables)
      if (!reservedTables.includes(table.id) && table.capacity == n) total += 1;
    return total;
  };

  // Handle reserve button click with validation
  const handleReserveClick = () => {
    if (validateDateAndTime()) {
      setGameEnable(false);
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

  // Check if both date and time are selected
  const isDateAndTimeSelected = () => {
    if (selectedDate && selectedTime && !gameEnable && !isReservationFormOpen)
      setGameEnable(true);
    return selectedDate && selectedTime;
  };

  // dummy function which should lookup database to see already reserved tables
  // for the given time and return a list of table ids for that
  const getReservedTables = (date, time) => {
    // 2 random tables as dummy data
    let a = Math.floor(Math.random() * 6) + 1;
    let b;

    do {
      b = Math.floor(Math.random() * 6) + 1;
    } while (b === a);

    return [a, b];
  };

  // Handle date and time selection - unified function
  const handleDateAndTimeSelection = (date, time) => {
    if (date !== undefined) {
      setSelectedDate(date);
      if (date) {
        setDateError("");
      }
    }
    if (time !== undefined) {
      setSelectedTime(time);
      setIsTimeSpinnerOpen(false);
      if (time) {
        setTimeError("");
      }
    }
    // Slot details will automatically update via React re-render
    // when both selectedDate and selectedTime are truthy
  };

  // sets reserved tables whenever time and date are selected
  useEffect(() => {
    if (selectedDate && selectedTime) {
      const result = getReservedTables(selectedDate, selectedTime);
      setReservedTables(result);
    }
  }, [selectedDate, selectedTime]);

  const handleTimeChange = (time) => {
    handleDateAndTimeSelection(undefined, time);
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
              handleDateAndTimeSelection(date, undefined);
            }}
            dateFormat="MM/dd/yyyy"
            customInput={<CustomDateInput />}
            wrapperClassName="date-picker-wrapper"
            minDate={today}
            maxDate={currentMonthEnd}
            filterDate={(date) => {
              // Only allow dates in current month and not in the past
              const dateOnly = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate()
              );
              return dateOnly >= today && dateOnly <= currentMonthEnd;
            }}
            openToDate={today}
            showMonthDropdown={false}
            showYearDropdown={false}
          />
          {dateError && (
            <span className="field-error-message">{dateError}</span>
          )}
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
          {timeError && (
            <span className="field-error-message">{timeError}</span>
          )}
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
              <span
                className="help-icon"
                onClick={() => setIsHelpPopupOpen(!isHelpPopupOpen)}
                onMouseEnter={() => setIsHelpPopupOpen(true)}
                onMouseLeave={() => setIsHelpPopupOpen(false)}
              >
                ?
                {isHelpPopupOpen && (
                  <div className="help-popup">
                    <div className="help-popup-content">
                      <h4 className="help-popup-title">Game Instructions</h4>
                      <ul className="help-popup-list">
                        <li>
                          <strong>WASD</strong> - Move character
                        </li>
                        <li>
                          <strong>E</strong> - Reserve table (when at table)
                        </li>
                        <li>
                          <strong>F</strong> - Unreserve table (when at table)
                        </li>
                        <li>
                          Selected tables will appear in reservation details
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </span>
            </label>
            <div
              className={`table-game-container ${
                !isDateAndTimeSelected() ? "disabled" : ""
              }`}
            >
              {!isDateAndTimeSelected() && (
                <div className="table-game-overlay">
                  <span className="overlay-message">
                    Please select date and time
                  </span>
                </div>
              )}
              <Game
                onSelect={handleTableSelect}
                onUnselect={handleTableDeselect}
                enabled={gameEnable}
                reservedTables={reservedTables}
              />
            </div>
          </div>
          <div className="details-section">
            <div className="slot-details-section">
              <h3 className="heading section-label">slot details</h3>
              <div className="slot-line" />
              <div className="slot-content">
                {isDateAndTimeSelected() ? (
                  <>
                    <span>{getFreeNSeaters(4)} x 4-seaters</span>
                    <span className="bullet">•</span>
                    <span>{getFreeNSeaters(2)} x 2-seaters</span>
                  </>
                ) : (
                  <span>Please select date and time</span>
                )}
              </div>
              <div className="slot-max">
                max guests: {isDateAndTimeSelected() ? getTotalSeats() : 0}
              </div>
            </div>
            <div className="reservation-details-section">
              <h3 className="heading section-label margin-top">
                reservation details
              </h3>
              <div className="slot-line" />
              <div className="reservation-info">
                {selectedTables.length > 0 ? (
                  <div className="table-numbers">
                    <span className="reservation-label">Selected Tables: </span>
                    <span className="table-ids">
                      {selectedTables.map((table, index) => (
                        <React.Fragment key={table.id}>
                          <span>Table {table.id}</span>
                          {index < selectedTables.length - 1 && (
                            <span className="bullet">•</span>
                          )}
                        </React.Fragment>
                      ))}
                    </span>
                  </div>
                ) : (
                  <span>No tables selected</span>
                )}
              </div>
            </div>
            <div className="reserve-button-section">
              <Button text="reserve" onClick={handleReserveClick} />
            </div>
          </div>
        </div>
      </div>
      <ReservationForm
        isOpen={isReservationFormOpen}
        onClose={() => {
          setIsReservationFormOpen(false);
          setGameEnable(true);
        }}
        onSubmit={async (formData) => {
          // Extract table numbers as a list
          setIsReservationFormOpen(false);
          setIsConfirmationOpen(true); // show confirmation popup
          const tableNumbers = selectedTables.map((table) => table.id);

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
            tables: selectedTables, // Full table objects (for reference)
          };

          // Print reservation data as JSON to console
          console.log("=== RESERVATION DATA ===");
          console.log(JSON.stringify(reservationData, null, 2));
          console.log("========================");

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
              console.log(
                "Reservation submitted successfully:",
                reservationData
              );
              setIsReservationFormOpen(false);
              // Optionally show a success message or redirect
            } else {
              console.error("Failed to submit reservation:", result.message);
              // Optionally show an error message
            }
          } catch (error) {
            console.error("Error submitting reservation:", error);
            // Optionally show an error message
          }
        }}
      />
      <ConfirmationPopup
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        type="reservation"
      />
    </Layout>
  );
}

export default ReservationPage;
