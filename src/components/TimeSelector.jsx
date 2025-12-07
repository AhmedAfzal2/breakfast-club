import React, { useState, useEffect } from "react";
import "./TimeSelector.css";
import arrowIcon from "../../assets/images/icons/arrow.png";

function TimeSelector({ onTimeSelect }) {
  const now = new Date();
  const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
  
  // Round up to next 30-minute interval
  const currentMinutes = oneHourFromNow.getMinutes();
  const roundedMinutes = currentMinutes <= 30 ? 30 : 60;
  const startTime = new Date(oneHourFromNow);
  startTime.setMinutes(roundedMinutes === 60 ? 0 : roundedMinutes);
  if (roundedMinutes === 60) {
    startTime.setHours(startTime.getHours() + 1);
  }
  startTime.setSeconds(0);
  startTime.setMilliseconds(0);

  const getInitialHour = () => {
    let hour = startTime.getHours();
    return hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  };

  const getInitialPeriod = () => {
    return startTime.getHours() >= 12 ? 'pm' : 'am';
  };

  const [hour, setHour] = useState(getInitialHour());
  const [minute, setMinute] = useState(startTime.getMinutes());
  const [period, setPeriod] = useState(getInitialPeriod());

  // Update parent when time changes
  useEffect(() => {
    if (onTimeSelect) {
      const hours24 = period === 'pm' 
        ? (hour === 12 ? 12 : hour + 12)
        : (hour === 12 ? 0 : hour);
      const selectedDate = new Date();
      selectedDate.setHours(hours24);
      selectedDate.setMinutes(minute);
      selectedDate.setSeconds(0);
      selectedDate.setMilliseconds(0);
      onTimeSelect(selectedDate);
    }
  }, [hour, minute, period, onTimeSelect]);

  const incrementHour = () => {
    setHour((prev) => {
      if (prev === 12) return 1;
      return prev + 1;
    });
  };

  const decrementHour = () => {
    setHour((prev) => {
      if (prev === 1) return 12;
      return prev - 1;
    });
  };

  const incrementMinute = () => {
    setMinute((prev) => {
      if (prev === 30) return 0;
      return prev + 30;
    });
  };

  const decrementMinute = () => {
    setMinute((prev) => {
      if (prev === 0) return 30;
      return prev - 30;
    });
  };

  const togglePeriod = () => {
    setPeriod((prev) => prev === 'am' ? 'pm' : 'am');
  };

  return (
    <div className="time-selector">
      <div className="time-spinner-container">
        {/* Hour Spinner */}
        <div className="time-spinner">
          <button className="spinner-arrow up" onClick={incrementHour}>
            <img src={arrowIcon} alt="Up" className="arrow-icon up" />
          </button>
          <div className="spinner-value">{hour.toString().padStart(2, '0')}</div>
          <button className="spinner-arrow down" onClick={decrementHour}>
            <img src={arrowIcon} alt="Down" className="arrow-icon down" />
          </button>
        </div>

        <div className="time-separator">:</div>

        {/* Minute Spinner */}
        <div className="time-spinner">
          <button className="spinner-arrow up" onClick={incrementMinute}>
            <img src={arrowIcon} alt="Up" className="arrow-icon up" />
          </button>
          <div className="spinner-value">{minute.toString().padStart(2, '0')}</div>
          <button className="spinner-arrow down" onClick={decrementMinute}>
            <img src={arrowIcon} alt="Down" className="arrow-icon down" />
          </button>
        </div>

        {/* AM/PM Spinner */}
        <div className="time-spinner">
          <button className="spinner-arrow up" onClick={togglePeriod}>
            <img src={arrowIcon} alt="Up" className="arrow-icon up" />
          </button>
          <div className="spinner-value">{period.toUpperCase()}</div>
          <button className="spinner-arrow down" onClick={togglePeriod}>
            <img src={arrowIcon} alt="Down" className="arrow-icon down" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TimeSelector;

