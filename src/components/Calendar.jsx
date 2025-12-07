import React, { useState } from "react";
import "./Calendar.css";

function Calendar({ onDateSelect }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const currentMonth = new Date();

  const today = new Date();
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

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
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date);
    }
  };


  const isDatePast = (day) => {
    const date = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isDateSelected = (day) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year
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
      const isSelected = isDateSelected(day);
      
      days.push(
        <div
          key={day}
          className={`calendar-day ${isPast ? "past" : ""} ${isSelected ? "selected" : ""}`}
          onClick={() => !isPast && handleDateClick(day)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
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
  );
}

export default Calendar;

