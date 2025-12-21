import React, { useState, useEffect } from "react";
import TimeSpinner from "../../../components/reservation/TimeSpinner";
import clockIcon from "/assets/images/icons/clock.png";
import "./Time.css";

function Time({ selectedTime, onTimeChange, timeError, selectedDate }) {
  const [isTimeSpinnerOpen, setIsTimeSpinnerOpen] = useState(false);
  const [localTimeError, setLocalTimeError] = useState(() => {
    // Initialize with error if no date is selected
    return selectedDate ? "" : "please select date first";
  });

  // Clear local error when date is selected, set error if date is not selected
  useEffect(() => {
    if (!selectedDate) {
      // Always show error if no date is selected
      setLocalTimeError("please select date first");
      setIsTimeSpinnerOpen(false);
      // Clear selected time if date is not selected
      if (selectedTime) {
        onTimeChange(null);
      }
    } else {
      setLocalTimeError("");
    }
  }, [selectedDate]);

  const now = new Date();
  const getMinTime = () => {
    if (!selectedDate) {
      // Return a far future date to prevent any time selection
      return new Date(now.getFullYear() + 1, 0, 1);
    }
    
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
    const selectedDateOnly = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    );
    const todayOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // If selected date is today, use one hour from now
    if (selectedDateOnly.getTime() === todayOnly.getTime()) {
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
    } else {
      // If selected date is in the future, allow any time from that date
      return new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        0,
        0
      );
    }
  };

  const minTime = getMinTime();

  const formatTimeDisplay = () => {
    if (!selectedTime || !selectedDate) return "";
    const h = selectedTime.getHours();
    const m = selectedTime.getMinutes();
    const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
    const ampm = h >= 12 ? "PM" : "AM";
    return `${hour12.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")} ${ampm}`;
  };

  const handleTimeInputClick = () => {
    if (!selectedDate) {
      setLocalTimeError("please select date first");
      setIsTimeSpinnerOpen(false);
      return;
    }
    setLocalTimeError("");
    setIsTimeSpinnerOpen(true);
  };

  const handleTimeIconClick = (e) => {
    e.stopPropagation();
    if (!selectedDate) {
      setLocalTimeError("please select date first");
      setIsTimeSpinnerOpen(false);
      return;
    }
    setLocalTimeError("");
    setIsTimeSpinnerOpen(!isTimeSpinnerOpen);
  };

  const handleTimeChange = (time) => {
    if (!selectedDate) {
      setLocalTimeError("please select date first");
      setIsTimeSpinnerOpen(false);
      return;
    }
    onTimeChange(time);
    setIsTimeSpinnerOpen(false);
    setLocalTimeError("");
  };

  return (
    <div className="mobile-time-container">
      <label className="heading section-label">time</label>
      <div className="mobile-time-input-wrapper">
        <input
          type="text"
          value={formatTimeDisplay()}
          onClick={handleTimeInputClick}
          placeholder="--:--"
          className="mobile-time-input"
          readOnly
          disabled={!selectedDate}
          style={{ 
            opacity: !selectedDate ? 0.5 : 1,
            cursor: !selectedDate ? 'not-allowed' : 'pointer'
          }}
        />
        <button
          type="button"
          className="mobile-clock-icon-button"
          onClick={handleTimeIconClick}
          disabled={!selectedDate}
          style={{ 
            opacity: !selectedDate ? 0.5 : 1,
            cursor: !selectedDate ? 'not-allowed' : 'pointer'
          }}
        >
          <img src={clockIcon} alt="Clock" />
        </button>
        {isTimeSpinnerOpen && selectedDate && (
          <div
            className="mobile-time-spinner-popup"
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
              requireDate={true}
              isDateSelected={!!selectedDate}
              selectedDate={selectedDate}
            />
          </div>
        )}
      </div>
      {!selectedDate && (
        <span className="mobile-field-error-message">
          please select date first
        </span>
      )}
      {selectedDate && localTimeError && (
        <span className="mobile-field-error-message">
          {localTimeError}
        </span>
      )}
      {selectedDate && !localTimeError && timeError && (
        <span className="mobile-field-error-message">
          {timeError}
        </span>
      )}
    </div>
  );
}

export default Time;

