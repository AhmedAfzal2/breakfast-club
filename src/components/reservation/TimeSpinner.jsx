import React, { useState, useEffect } from "react";
const arrowIcon = "/assets/images/icons/arrow.png";
const tickIcon = "/assets/images/icons/tick.png";
import "./TimeSpinner.css";

function TimeSpinner({ selectedTime, onTimeChange, minTime, requireDate, isDateSelected, selectedDate }) {
  const [hours, setHours] = useState(() => {
    if (selectedTime) {
      let h = selectedTime.getHours();
      return h > 12 ? h - 12 : h === 0 ? 12 : h;
    }
    const minH = minTime.getHours();
    return minH > 12 ? minH - 12 : minH === 0 ? 12 : minH;
  });

  const [minutes, setMinutes] = useState(() => {
    if (selectedTime) {
      return selectedTime.getMinutes();
    }
    // Use the actual minutes from minTime (which is already rounded to next available slot)
    return minTime.getMinutes();
  });

  const [amPm, setAmPm] = useState(() => {
    if (selectedTime) {
      return selectedTime.getHours() >= 12 ? "PM" : "AM";
    }
    return minTime.getHours() >= 12 ? "PM" : "AM";
  });

  const [error, setError] = useState("");

  const updateTime = (newHours, newMinutes, newAmPm) => {
    const now = new Date();
    let hour24 = newHours;
    if (newAmPm === "PM" && newHours !== 12) hour24 = newHours + 12;
    if (newAmPm === "AM" && newHours === 12) hour24 = 0;

    const newTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hour24,
      newMinutes
    );

    // Clear error when user changes time
    setError("");

    // Check if time is valid (not before minTime and within 30-minute intervals)
    if (
      newTime >= minTime &&
      newTime <=
        new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 30)
    ) {
      // Don't call onTimeChange here, just update local state
      // onTimeChange will be called only on confirm
    }
  };

  const incrementHours = () => {
    // Restaurant hours: 10 AM, 11 AM, 12 PM, 1 PM, 2 PM, 3 PM, 4 PM (circular)
    // Convert current time to 24-hour format to check
    let currentHour24 = hours;
    if (amPm === "PM" && hours !== 12) currentHour24 = hours + 12;
    if (amPm === "AM" && hours === 12) currentHour24 = 0;
    
    let newHour24;
    if (currentHour24 === 10) {
      newHour24 = 11;
    } else if (currentHour24 === 11) {
      newHour24 = 12;
    } else if (currentHour24 === 12) {
      newHour24 = 13;
    } else if (currentHour24 === 13) {
      newHour24 = 14;
    } else if (currentHour24 === 14) {
      newHour24 = 15;
    } else if (currentHour24 === 15) {
      newHour24 = 16;
    } else if (currentHour24 === 16) {
      // Wrap around to 10 AM
      newHour24 = 10;
    } else {
      // If outside range, default to 10 AM
      newHour24 = 10;
    }
    
    // Convert back to 12-hour format
    let newHours = newHour24 > 12 ? newHour24 - 12 : newHour24 === 0 ? 12 : newHour24;
    let newAmPm = newHour24 >= 12 ? "PM" : "AM";
    
    setHours(newHours);
    setAmPm(newAmPm);
    updateTime(newHours, minutes, newAmPm);
  };

  const decrementHours = () => {
    // Restaurant hours: 10 AM, 11 AM, 12 PM, 1 PM, 2 PM, 3 PM, 4 PM (circular)
    // Convert current time to 24-hour format to check
    let currentHour24 = hours;
    if (amPm === "PM" && hours !== 12) currentHour24 = hours + 12;
    if (amPm === "AM" && hours === 12) currentHour24 = 0;
    
    let newHour24;
    if (currentHour24 === 10) {
      // Wrap around to 4 PM
      newHour24 = 16;
    } else if (currentHour24 === 11) {
      newHour24 = 10;
    } else if (currentHour24 === 12) {
      newHour24 = 11;
    } else if (currentHour24 === 13) {
      newHour24 = 12;
    } else if (currentHour24 === 14) {
      newHour24 = 13;
    } else if (currentHour24 === 15) {
      newHour24 = 14;
    } else if (currentHour24 === 16) {
      newHour24 = 15;
    } else {
      // If outside range, default to 10 AM
      newHour24 = 10;
    }
    
    // Convert back to 12-hour format
    let newHours = newHour24 > 12 ? newHour24 - 12 : newHour24 === 0 ? 12 : newHour24;
    let newAmPm = newHour24 >= 12 ? "PM" : "AM";
    
    setHours(newHours);
    setAmPm(newAmPm);
    updateTime(newHours, minutes, newAmPm);
  };

  const incrementMinutes = () => {
    let newMinutes = minutes + 30;
    let newHours = hours;
    let newAmPm = amPm;
    
    if (newMinutes >= 60) {
      newMinutes = 0;
      // Use the same circular logic as incrementHours
      // Convert current time to 24-hour format
      let currentHour24 = hours;
      if (amPm === "PM" && hours !== 12) currentHour24 = hours + 12;
      if (amPm === "AM" && hours === 12) currentHour24 = 0;
      
      let newHour24;
      if (currentHour24 === 10) {
        newHour24 = 11;
      } else if (currentHour24 === 11) {
        newHour24 = 12;
      } else if (currentHour24 === 12) {
        newHour24 = 13;
      } else if (currentHour24 === 13) {
        newHour24 = 14;
      } else if (currentHour24 === 14) {
        newHour24 = 15;
      } else if (currentHour24 === 15) {
        newHour24 = 16;
      } else if (currentHour24 === 16) {
        // Wrap around to 10 AM
        newHour24 = 10;
      } else {
        // If outside range, default to 10 AM
        newHour24 = 10;
      }
      
      // Convert back to 12-hour format
      newHours = newHour24 > 12 ? newHour24 - 12 : newHour24 === 0 ? 12 : newHour24;
      newAmPm = newHour24 >= 12 ? "PM" : "AM";
      setHours(newHours);
      setAmPm(newAmPm);
    }
    setMinutes(newMinutes);
    updateTime(newHours, newMinutes, newAmPm);
  };

  const decrementMinutes = () => {
    let newMinutes = minutes - 30;
    let newHours = hours;
    let newAmPm = amPm;
    
    if (newMinutes < 0) {
      newMinutes = 30;
      // Use the same circular logic as decrementHours
      // Convert current time to 24-hour format
      let currentHour24 = hours;
      if (amPm === "PM" && hours !== 12) currentHour24 = hours + 12;
      if (amPm === "AM" && hours === 12) currentHour24 = 0;
      
      let newHour24;
      if (currentHour24 === 10) {
        // Wrap around to 4 PM
        newHour24 = 16;
      } else if (currentHour24 === 11) {
        newHour24 = 10;
      } else if (currentHour24 === 12) {
        newHour24 = 11;
      } else if (currentHour24 === 13) {
        newHour24 = 12;
      } else if (currentHour24 === 14) {
        newHour24 = 13;
      } else if (currentHour24 === 15) {
        newHour24 = 14;
      } else if (currentHour24 === 16) {
        newHour24 = 15;
      } else {
        // If outside range, default to 10 AM
        newHour24 = 10;
      }
      
      // Convert back to 12-hour format
      newHours = newHour24 > 12 ? newHour24 - 12 : newHour24 === 0 ? 12 : newHour24;
      newAmPm = newHour24 >= 12 ? "PM" : "AM";
      setHours(newHours);
      setAmPm(newAmPm);
    }
    setMinutes(newMinutes);
    updateTime(newHours, newMinutes, newAmPm);
  };

  const toggleAmPm = () => {
    const newAmPm = amPm === "AM" ? "PM" : "AM";
    setAmPm(newAmPm);
    updateTime(hours, minutes, newAmPm);
  };

  // Sync with selectedTime changes
  useEffect(() => {
    if (selectedTime) {
      let h = selectedTime.getHours();
      setHours(h > 12 ? h - 12 : h === 0 ? 12 : h);
      setMinutes(selectedTime.getMinutes());
      setAmPm(selectedTime.getHours() >= 12 ? "PM" : "AM");
    }
  }, [selectedTime]);

  // Sync with minTime changes when no selectedTime (to update default display)
  useEffect(() => {
    if (!selectedTime && minTime) {
      let h = minTime.getHours();
      setHours(h > 12 ? h - 12 : h === 0 ? 12 : h);
      setMinutes(minTime.getMinutes());
      setAmPm(minTime.getHours() >= 12 ? "PM" : "AM");
    }
  }, [minTime, selectedTime]);

  const formatTime = () => {
    if (!selectedTime) return "";
    const h = selectedTime.getHours();
    const m = selectedTime.getMinutes();
    const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
    const ampm = h >= 12 ? "PM" : "AM";
    return `${hour12.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")} ${ampm}`;
  };

  const handleButtonClick = (e, callback) => {
    e.preventDefault();
    e.stopPropagation();
    callback();
  };

  const validateTime = (timeToValidate, dateToValidate) => {
    const now = new Date();
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

    // Check if date+time combination is before current date+time
    // Compare the full date+time, not just time
    if (timeToValidate < now) {
      return "cannot select a time in the past";
    }

    // Check if date+time combination is before one hour from now
    // This considers both the selected date and time
    if (timeToValidate < oneHourFromNow) {
      return "reservations must be at least 1 hour from now";
    }

    // Check if time is within valid range (before 11:30 PM)
    // Use the selected date or current date for max time
    const dateForMax = dateToValidate || now;
    const maxTime = new Date(
      dateForMax.getFullYear(),
      dateForMax.getMonth(),
      dateForMax.getDate(),
      23,
      30
    );
    if (timeToValidate > maxTime) {
      return "reservations must be before 11:30 pm";
    }

    return null; // Valid time
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Check if date is required and selected - this check comes FIRST
    if (requireDate && !isDateSelected) {
      setError("please select date first");
      return;
    }
    
    const now = new Date();
    let hour24 = hours;
    if (amPm === "PM" && hours !== 12) hour24 = hours + 12;
    if (amPm === "AM" && hours === 12) hour24 = 0;

    // Use selectedDate if available, otherwise use current date
    const dateToUse = selectedDate || now;
    const newTime = new Date(
      dateToUse.getFullYear(),
      dateToUse.getMonth(),
      dateToUse.getDate(),
      hour24,
      minutes
    );

    const validationError = validateTime(newTime, dateToUse);
    if (validationError) {
      setError(validationError);
      return;
    }

    // Time is valid, clear error and proceed
    setError("");
    onTimeChange(newTime);
  };

  return (
    <div
      className="time-spinner-wrapper"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div
        className="time-spinner-container"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className="time-spinner-left">
          <div className="time-spinner-group">
            <button
              type="button"
              className="spinner-button spinner-button-up"
              onClick={(e) => handleButtonClick(e, decrementHours)}
            >
              <img src={arrowIcon} alt="Up" />
            </button>
            <div className="spinner-value-wrapper">
              <div className="spinner-value">
                {hours.toString().padStart(2, "0")}
              </div>
            </div>
            <button
              type="button"
              className="spinner-button spinner-button-down"
              onClick={(e) => handleButtonClick(e, incrementHours)}
            >
              <img src={arrowIcon} alt="Down" />
            </button>
          </div>
          <div className="time-spinner-separator">:</div>
          <div className="time-spinner-group">
            <button
              type="button"
              className="spinner-button spinner-button-up"
              onClick={(e) => handleButtonClick(e, decrementMinutes)}
            >
              <img src={arrowIcon} alt="Up" />
            </button>
            <div className="spinner-value-wrapper">
              <div className="spinner-value">
                {minutes.toString().padStart(2, "0")}
              </div>
            </div>
            <button
              type="button"
              className="spinner-button spinner-button-down"
              onClick={(e) => handleButtonClick(e, incrementMinutes)}
            >
              <img src={arrowIcon} alt="Down" />
            </button>
          </div>
          <div className="time-spinner-group">
            <div className="spinner-value-wrapper">
              <div className="spinner-value">{amPm}</div>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="time-spinner-confirm-button"
          onClick={handleConfirm}
        >
          <img src={tickIcon} alt="Confirm" />
        </button>
      </div>
      {error && <div className="time-spinner-error">{error}</div>}
    </div>
  );
}

export default TimeSpinner;
