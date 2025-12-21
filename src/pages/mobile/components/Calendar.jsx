import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Calendar.css";

function Calendar({ selectedDate, onChange, dateError }) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return (
    <div className="mobile-calendar-container">
      <label className="heading section-label">date</label>
      <div className="mobile-calendar-wrapper">
        <DatePicker
          selected={selectedDate}
          onChange={onChange}
          dateFormat="MM/dd/yyyy"
          inline
          minDate={today}
          maxDate={currentMonthEnd}
          filterDate={(date) => {
            const dateOnly = new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate()
            );
            return dateOnly >= today && dateOnly <= currentMonthEnd;
          }}
          openToDate={selectedDate || today}
          showMonthDropdown={false}
          showYearDropdown={false}
        />
      </div>
      {dateError && (
        <span className="mobile-field-error-message">{dateError}</span>
      )}
    </div>
  );
}

export default Calendar;

