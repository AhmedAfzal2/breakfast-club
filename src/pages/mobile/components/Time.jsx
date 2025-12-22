import React, { useState, useEffect } from "react";
import TimeSpinner from "../../../components/reservation/TimeSpinner";
import "./Time.css";

function Time({ selectedTime, onTimeChange, timeError, selectedDate }) {
  const [localTimeError, setLocalTimeError] = useState("");

  // Clear local error when date is selected, set error if date is not selected
  useEffect(() => {
    if (!selectedDate) {
      // Clear selected time if date is not selected
      if (selectedTime) {
        onTimeChange(null);
      }
      setLocalTimeError("");
    } else {
      setLocalTimeError("");
      // Don't automatically set time - user must confirm with tick button
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

  const handleTimeChange = (time) => {
    if (!selectedDate) {
      setLocalTimeError("please select date first");
      return;
    }
    onTimeChange(time);
    setLocalTimeError("");
  };

  return (
    <div className="mobile-time-container">
      <label className="heading section-label">select time ( resturant timings: 10am - 4pm )</label>
      <div className="mobile-time-spinner-wrapper">
        <TimeSpinner
          selectedTime={selectedTime}
          onTimeChange={handleTimeChange}
          minTime={minTime}
          requireDate={true}
          isDateSelected={!!selectedDate}
          selectedDate={selectedDate}
        />
      </div>
    </div>
  );
}

export default Time;
