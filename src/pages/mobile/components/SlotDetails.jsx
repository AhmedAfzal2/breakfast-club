import React from "react";
import "./SlotDetails.css";

function SlotDetails({ selectedDate, selectedTime, reservedTables = [], tables = [] }) {
  const formatDate = (date) => {
    if (!date) return "--";
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (time) => {
    if (!time) return "--";
    const h = time.getHours();
    const m = time.getMinutes();
    const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
    const ampm = h >= 12 ? "PM" : "AM";
    return `${hour12.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")} ${ampm}`;
  };

  // Calculate free tables and total seats from MongoDB data
  const getFreeNSeaters = (n) => {
    let total = 0;
    for (const table of tables) {
      if (!reservedTables.includes(table.id) && table.capacity === n) {
        total += 1;
      }
    }
    return total;
  };

  const getTotalSeats = () => {
    let total = 0;
    for (const table of tables) {
      if (!reservedTables.includes(table.id)) {
        total += table.capacity;
      }
    }
    return total;
  };

  const isDateAndTimeSelected = selectedDate && selectedTime;

  return (
    <div className="mobile-slot-details-container">
      <h3 className="heading section-label">slot details</h3>
      <div className="mobile-slot-line" />
      <div className="mobile-slot-content">
        <div className="mobile-slot-item">
          <span className="mobile-slot-label">Date:</span>
          <span className="mobile-slot-value">{formatDate(selectedDate)}</span>
        </div>
        <div className="mobile-slot-item">
          <span className="mobile-slot-label">Time:</span>
          <span className="mobile-slot-value">{formatTime(selectedTime)}</span>
        </div>
        {isDateAndTimeSelected && (
          <>
            <div className="mobile-slot-item">
              <span className="mobile-slot-label">Available Tables:</span>
              <span className="mobile-slot-value">
                {getFreeNSeaters(4)} x 4-seaters • {getFreeNSeaters(2)} x 2-seaters
              </span>
            </div>
            <div className="mobile-slot-item">
              <span className="mobile-slot-label">Max Guests:</span>
              <span className="mobile-slot-value">{getTotalSeats()}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SlotDetails;

