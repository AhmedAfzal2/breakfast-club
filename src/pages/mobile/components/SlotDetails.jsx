import React from "react";
import "./SlotDetails.css";

function SlotDetails({ selectedDate, selectedTime, reservedTables = [], tables = [] }) {
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
      <h3 className="heading section-label mobile-slot-heading">slot details</h3>
      <div className="mobile-slot-line" />
      <div className="mobile-slot-content">
        {isDateAndTimeSelected ? (
          <>
            <span>{getFreeNSeaters(4)} x 4-seaters</span>
            <span className="bullet">•</span>
            <span>{getFreeNSeaters(2)} x 2-seaters</span>
          </>
        ) : (
          <span>Please select date and time</span>
        )}
      </div>
      <div className="mobile-slot-max">
        max guests: {isDateAndTimeSelected ? getTotalSeats() : 0}
      </div>
    </div>
  );
}

export default SlotDetails;

