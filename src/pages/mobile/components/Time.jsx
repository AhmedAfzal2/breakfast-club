import React, { useState } from "react";
import TimeSpinner from "../../../components/reservation/TimeSpinner";
import clockIcon from "/assets/images/icons/clock.png";
import "./Time.css";

function Time({ selectedTime, onTimeChange, timeError }) {
  const [isTimeSpinnerOpen, setIsTimeSpinnerOpen] = useState(false);

  const now = new Date();
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

  const handleTimeInputClick = () => {
    setIsTimeSpinnerOpen(true);
  };

  const handleTimeIconClick = (e) => {
    e.stopPropagation();
    setIsTimeSpinnerOpen(!isTimeSpinnerOpen);
  };

  const handleTimeChange = (time) => {
    onTimeChange(time);
    setIsTimeSpinnerOpen(false);
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
        />
        <button
          type="button"
          className="mobile-clock-icon-button"
          onClick={handleTimeIconClick}
        >
          <img src={clockIcon} alt="Clock" />
        </button>
        {isTimeSpinnerOpen && (
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
            />
          </div>
        )}
      </div>
      {timeError && (
        <span className="mobile-field-error-message">{timeError}</span>
      )}
    </div>
  );
}

export default Time;

