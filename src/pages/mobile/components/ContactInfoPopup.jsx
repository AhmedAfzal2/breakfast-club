import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import Button from "../../../components/Button";
import "./ContactInfoPopup.css";

function ContactInfoPopup({ isOpen, onClose, onSubmit }) {
  const [isClosing, setIsClosing] = useState(false);
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

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

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
    const phoneRegex = /^[\d\s\-\(\)]+$/;
    if (!phoneRegex.test(contactNumber)) {
      return "Please enter a valid contact number";
    }
    const digitsOnly = contactNumber.replace(/\D/g, "");
    if (digitsOnly.length < 10) {
      return "Contact number must be at least 10 digits";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }

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

  const handleBackClick = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      if (onClose) {
        onClose();
      }
    }, 500);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleReserveClick();
  };

  const handleReserveClick = () => {
    const nameError = validateName(formData.name);
    const contactError = validateContactNumber(formData.contactNumber);

    if (nameError || contactError) {
      setErrors({
        name: nameError,
        contactNumber: contactError
      });
      return;
    }

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

  if (!isOpen && !isClosing) return null;

  return (
    <div className={`mobile-contact-info-popup ${isClosing ? 'slide-down' : ''}`}>
      <div className="mobile-popup-header">
        <button className="mobile-popup-back-button" onClick={handleBackClick}>
          <ChevronLeft size={24} />
        </button>
      </div>
      <div className="mobile-popup-content">
        <label className="heading section-label mobile-popup-heading">contact details</label>
        <form className="mobile-contact-form" onSubmit={handleFormSubmit}>
          <div className="mobile-form-field">
            <div className="mobile-form-label-row">
              <label htmlFor="name" className="mobile-form-label">
                Name <span className="required">*</span>
              </label>
              {errors.name && <span className="mobile-error-message">{errors.name}</span>}
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mobile-form-input ${errors.name ? "error" : ""}`}
              placeholder="Enter your name"
            />
          </div>

          <div className="mobile-form-field">
            <div className="mobile-form-label-row">
              <label htmlFor="contactNumber" className="mobile-form-label">
                Contact Number <span className="required">*</span>
              </label>
              {errors.contactNumber && <span className="mobile-error-message">{errors.contactNumber}</span>}
            </div>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className={`mobile-form-input ${errors.contactNumber ? "error" : ""}`}
              placeholder="Enter your contact number"
            />
          </div>

          <div className="mobile-form-field">
            <label htmlFor="occasion" className="mobile-form-label">
              Occasion
            </label>
            <div className="mobile-occasion-input-wrapper">
              <input
                type="text"
                id="occasion"
                name="occasion"
                ref={occasionInputRef}
                value={formData.occasion}
                onChange={handleChange}
                onFocus={handleOccasionFocus}
                onClick={handleOccasionClick}
                className="mobile-form-input"
                placeholder="Select or type your occasion"
                autoComplete="off"
              />
              {showOccasionDropdown && filteredOccasions.length > 0 && (
                <div className="mobile-occasion-dropdown" ref={dropdownRef}>
                  {filteredOccasions.map((option, index) => (
                    <div
                      key={index}
                      className="mobile-occasion-option"
                      onClick={() => handleOccasionSelect(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mobile-form-field">
            <label htmlFor="additionalNotes" className="mobile-form-label">
              Additional Notes
            </label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              className="mobile-form-textarea"
              placeholder="Any special requests or notes..."
              rows="3"
            />
          </div>

        </form>
      </div>
      
      {/* Reserve Button Section - Fixed at bottom */}
      <div className="mobile-popup-button-section">
        <Button text="reserve" onClick={handleReserveClick} />
      </div>
    </div>
  );
}

export default ContactInfoPopup;

