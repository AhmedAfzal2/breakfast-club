import React, { useState, useEffect } from "react";
import "./Calendar.css";

function Calendar({ selectedDate, onChange, dateError }) {
  const [internalSelectedDate, setInternalSelectedDate] = useState(selectedDate);

  useEffect(() => {
    setInternalSelectedDate(selectedDate);
  }, [selectedDate]);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleDateClick = (day) => {
    const date = new Date(year, month, day);
    setInternalSelectedDate(date);
    if (onChange) {
      onChange(date);
    }
  };

  const isDatePast = (day) => {
    const date = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isDateInFuture = (day) => {
    const date = new Date(year, month, day);
    const currentMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return date > currentMonthEnd;
  };

  const isDateSelected = (day) => {
    if (!internalSelectedDate) return false;
    return (
      internalSelectedDate.getDate() === day &&
      internalSelectedDate.getMonth() === month &&
      internalSelectedDate.getFullYear() === year
    );
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isPast = isDatePast(day);
      const isFuture = isDateInFuture(day);
      const isSelected = isDateSelected(day);
      const isDisabled = isPast || isFuture;
      
      days.push(
        <div
          key={day}
          className={`calendar-day ${isPast ? "past" : ""} ${isFuture ? "future" : ""} ${isSelected ? "selected" : ""}`}
          onClick={() => !isDisabled && handleDateClick(day)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="mobile-calendar-container">
      <label className="heading section-label">select date</label>
      <div className="calendar">
        <div className="calendar-header">
          <h3 className="calendar-month-year">
            {monthNames[month]} {year}
          </h3>
        </div>
        <div className="calendar-weekdays">
          {weekDays.map((day) => (
            <div key={day} className="calendar-weekday">
              {day}
            </div>
          ))}
        </div>
        <div className="calendar-days">
          {renderCalendarDays()}
        </div>
      </div>
      {dateError && (
        <span className="mobile-field-error-message">{dateError}</span>
      )}
    </div>
  );
}

export default Calendar;
