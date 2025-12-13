import React, { useState, useRef, useEffect } from "react";
import "./ReservationForm.css";
import ConfirmationPopup from "../ConfirmationPopup";

function ReservationForm({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    occasion: "",
    additionalNotes: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    contactNumber: ""
  });

  const [showOccasionDropdown, setShowOccasionDropdown] = useState(false);
  const [filteredOccasions, setFilteredOccasions] = useState([]);
  const occasionInputRef = useRef(null);
  const dropdownRef = useRef(null);

  const occasionOptions = [
    "Birthday",
    "Anniversary",
    "Graduation",
    "Engagement",
    "Business Meeting",
    "Family Gathering",
    "Date Night",
    "Celebration"
  ];

  const validateName = (name) => {
    if (!name || name.trim() === "") {
      return "Name is required";
    }
    if (name.trim().length < 2) {
      return "Name must be at least 2 characters";
    }
    return "";
  };

  const validateContactNumber = (contactNumber) => {
    if (!contactNumber || contactNumber.trim() === "") {
      return "Contact number is required";
    }
    // Basic validation for phone number (digits, spaces, dashes, parentheses)
    const phoneRegex = /^[\d\s\-\(\)]+$/;
    if (!phoneRegex.test(contactNumber)) {
      return "Please enter a valid contact number";
    }
    // Remove non-digits for length check
    const digitsOnly = contactNumber.replace(/\D/g, "");
    if (digitsOnly.length < 10) {
      return "Contact number must be at least 10 digits";
    }
    return "";
  };

  // Filter occasions based on input
  useEffect(() => {
    if (formData.occasion) {
      const filtered = occasionOptions.filter(option =>
        option.toLowerCase().includes(formData.occasion.toLowerCase())
      );
      setFilteredOccasions(filtered);
    } else {
      setFilteredOccasions(occasionOptions);
    }
    // Don't auto-close dropdown when typing, only when clicking outside
  }, [formData.occasion]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        occasionInputRef.current &&
        !occasionInputRef.current.contains(event.target)
      ) {
        setShowOccasionDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }

    // Show dropdown for occasion field
    if (name === "occasion") {
      setShowOccasionDropdown(true);
    }
  };

  const handleOccasionSelect = (occasion) => {
    setFormData(prev => ({
      ...prev,
      occasion: occasion
    }));
    setShowOccasionDropdown(false);
    if (occasionInputRef.current) {
      occasionInputRef.current.focus();
    }
  };

  const handleOccasionFocus = () => {
    if (!showOccasionDropdown) {
      setFilteredOccasions(occasionOptions);
      setShowOccasionDropdown(true);
    }
  };

  const handleOccasionClick = () => {
    setFilteredOccasions(occasionOptions);
    setShowOccasionDropdown(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const nameError = validateName(formData.name);
    const contactError = validateContactNumber(formData.contactNumber);

    if (nameError || contactError) {
      setErrors({
        name: nameError,
        contactNumber: contactError
      });
      return;
    }

    // Form is valid, submit
    onSubmit(formData);
    // Reset form
    setFormData({
      name: "",
      contactNumber: "",
      occasion: "",
      additionalNotes: ""
    });
    setErrors({
      name: "",
      contactNumber: ""
    });
  };

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="reservation-form-overlay" onClick={handleClose}>
      <div className="reservation-form-popup" onClick={(e) => e.stopPropagation()}>
        <div className="reservation-form-header">
          <h2 className="reservation-form-title">Contact Details</h2>
          <button 
            type="button" 
            className="reservation-form-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <form className="reservation-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <div className="form-label-row">
              <label htmlFor="name" className="form-label">
                Name <span className="required">*</span>
              </label>
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? "error" : ""}`}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-field">
            <div className="form-label-row">
              <label htmlFor="contactNumber" className="form-label">
                Contact Number <span className="required">*</span>
              </label>
              {errors.contactNumber && <span className="error-message">{errors.contactNumber}</span>}
            </div>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className={`form-input ${errors.contactNumber ? "error" : ""}`}
              placeholder="Enter your contact number"
            />
          </div>

          <div className="form-field">
            <label htmlFor="occasion" className="form-label">
              Occasion
            </label>
            <div className="occasion-input-wrapper">
              <input
                type="text"
                id="occasion"
                name="occasion"
                ref={occasionInputRef}
                value={formData.occasion}
                onChange={handleChange}
                onFocus={handleOccasionFocus}
                onClick={handleOccasionClick}
                className="form-input"
                placeholder="Select or type your occasion"
                autoComplete="off"
              />
              {showOccasionDropdown && filteredOccasions.length > 0 && (
                <div className="occasion-dropdown" ref={dropdownRef}>
                  {filteredOccasions.map((option, index) => (
                    <div
                      key={index}
                      className="occasion-option"
                      onClick={() => handleOccasionSelect(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="additionalNotes" className="form-label">
              Additional Notes
            </label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Any special requests or notes..."
              rows="4"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="form-button cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="form-button submit">
              Confirm Reservation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReservationForm;

