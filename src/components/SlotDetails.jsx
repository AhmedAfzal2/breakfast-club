import React from "react";
import "./SlotDetails.css";

function SlotDetails({ tables = [] }) {
  // Calculate max guests from tables
  const maxGuests = tables.reduce((total, table) => {
    return total + (table.count * table.seats);
  }, 0);

  // Format table display text
  const formatTableText = (table) => {
    return `${table.count}x ${table.seats}-seater`;
  };

  return (
    <div className="slot-details">
      <h3 className="heading section-label">slot details</h3>
      <div className="slot-line" />
      <div className="slot-content">
        {tables.map((table, index) => (
          <React.Fragment key={index}>
            <span>{formatTableText(table)}</span>
            {index < tables.length - 1 && <span className="bullet">•</span>}
          </React.Fragment>
        ))}
      </div>
      <div className="slot-max">
        max guests: {maxGuests}
      </div>
      <div className="note">
        *please pick a different time if you need more seats.
      </div>
    </div>
  );
}

export default SlotDetails;

