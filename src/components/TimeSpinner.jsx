import React, { useState, useEffect } from "react";
import arrowIcon from "../../assets/images/icons/arrow.png";
import "./TimeSpinner.css";

function TimeSpinner({ selectedTime, onTimeChange, minTime }) {
  const [hours, setHours] = useState(() => {
    if (selectedTime) {
      let h = selectedTime.getHours();
      return h > 12 ? h - 12 : (h === 0 ? 12 : h);
    }
    const minH = minTime.getHours();
    return minH > 12 ? minH - 12 : (minH === 0 ? 12 : minH);
  });
  
  const [minutes, setMinutes] = useState(() => {
    if (selectedTime) {
      return selectedTime.getMinutes();
    }
    const minM = minTime.getMinutes();
    return minM === 0 ? 0 : 30;
  });
  
  const [amPm, setAmPm] = useState(() => {
    if (selectedTime) {
      return selectedTime.getHours() >= 12 ? 'PM' : 'AM';
    }
    return minTime.getHours() >= 12 ? 'PM' : 'AM';
  });

  const updateTime = (newHours, newMinutes, newAmPm) => {
    const now = new Date();
    let hour24 = newHours;
    if (newAmPm === 'PM' && newHours !== 12) hour24 = newHours + 12;
    if (newAmPm === 'AM' && newHours === 12) hour24 = 0;

    const newTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour24, newMinutes);
    
    // Check if time is valid (not before minTime and within 30-minute intervals)
    if (newTime >= minTime && newTime <= new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 30)) {
      onTimeChange(newTime);
    }
  };

  const incrementHours = () => {
    let newHours = hours + 1;
    if (newHours > 12) newHours = 1;
    setHours(newHours);
    updateTime(newHours, minutes, amPm);
  };

  const decrementHours = () => {
    let newHours = hours - 1;
    if (newHours < 1) newHours = 12;
    setHours(newHours);
    updateTime(newHours, minutes, amPm);
  };

  const incrementMinutes = () => {
    let newMinutes = minutes + 30;
    let newHours = hours;
    if (newMinutes >= 60) {
      newMinutes = 0;
      newHours = hours + 1;
      if (newHours > 12) newHours = 1;
      setHours(newHours);
    }
    setMinutes(newMinutes);
    updateTime(newHours, newMinutes, amPm);
  };

  const decrementMinutes = () => {
    let newMinutes = minutes - 30;
    let newHours = hours;
    if (newMinutes < 0) {
      newMinutes = 30;
      newHours = hours - 1;
      if (newHours < 1) newHours = 12;
      setHours(newHours);
    }
    setMinutes(newMinutes);
    updateTime(newHours, newMinutes, amPm);
  };

  const toggleAmPm = () => {
    const newAmPm = amPm === 'AM' ? 'PM' : 'AM';
    setAmPm(newAmPm);
    updateTime(hours, minutes, newAmPm);
  };

  // Sync with selectedTime changes
  useEffect(() => {
    if (selectedTime) {
      let h = selectedTime.getHours();
      setHours(h > 12 ? h - 12 : (h === 0 ? 12 : h));
      setMinutes(selectedTime.getMinutes());
      setAmPm(selectedTime.getHours() >= 12 ? 'PM' : 'AM');
    }
  }, [selectedTime]);

  const formatTime = () => {
    if (!selectedTime) return "";
    const h = selectedTime.getHours();
    const m = selectedTime.getMinutes();
    const hour12 = h > 12 ? h - 12 : (h === 0 ? 12 : h);
    const ampm = h >= 12 ? 'PM' : 'AM';
    return `${hour12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`;
  };

  const handleButtonClick = (e, callback) => {
    e.stopPropagation();
    callback();
  };

  const handleConfirm = (e) => {
    e.stopPropagation();
    const now = new Date();
    let hour24 = hours;
    if (amPm === 'PM' && hours !== 12) hour24 = hours + 12;
    if (amPm === 'AM' && hours === 12) hour24 = 0;

    const newTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour24, minutes);
    
    if (newTime >= minTime && newTime <= new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 30)) {
      onTimeChange(newTime);
    }
  };

  return (
    <div className="time-spinner-wrapper" onClick={(e) => e.stopPropagation()}>
      <div className="time-spinner-container">
        <div className="time-spinner-group">
          <button 
            type="button" 
            className="spinner-button spinner-button-up" 
            onClick={(e) => handleButtonClick(e, incrementHours)}
          >
            <img src={arrowIcon} alt="Up" />
          </button>
          <div className="spinner-value-wrapper">
            <div className="spinner-value">{hours.toString().padStart(2, '0')}</div>
          </div>
          <button 
            type="button" 
            className="spinner-button spinner-button-down" 
            onClick={(e) => handleButtonClick(e, decrementHours)}
          >
            <img src={arrowIcon} alt="Down" />
          </button>
        </div>
        <div className="time-spinner-separator">:</div>
        <div className="time-spinner-group">
          <button 
            type="button" 
            className="spinner-button spinner-button-up" 
            onClick={(e) => handleButtonClick(e, incrementMinutes)}
          >
            <img src={arrowIcon} alt="Up" />
          </button>
          <div className="spinner-value-wrapper">
            <div className="spinner-value">{minutes.toString().padStart(2, '0')}</div>
          </div>
          <button 
            type="button" 
            className="spinner-button spinner-button-down" 
            onClick={(e) => handleButtonClick(e, decrementMinutes)}
          >
            <img src={arrowIcon} alt="Down" />
          </button>
        </div>
        <div className="time-spinner-group">
          <button 
            type="button" 
            className="spinner-button spinner-button-up" 
            onClick={(e) => handleButtonClick(e, toggleAmPm)}
          >
            <img src={arrowIcon} alt="Up" />
          </button>
          <div className="spinner-value-wrapper">
            <div className="spinner-value">{amPm}</div>
          </div>
          <button 
            type="button" 
            className="spinner-button spinner-button-down" 
            onClick={(e) => handleButtonClick(e, toggleAmPm)}
          >
            <img src={arrowIcon} alt="Down" />
          </button>
        </div>
      </div>
      <div className="time-spinner-confirm-row">
        <div className="time-spinner-display">
          {formatTime()}
        </div>
        <button 
          type="button" 
          className="time-spinner-confirm-button"
          onClick={handleConfirm}
        >
          ✓
        </button>
      </div>
    </div>
  );
}

export default TimeSpinner;

