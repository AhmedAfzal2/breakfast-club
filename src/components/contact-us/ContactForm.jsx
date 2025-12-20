import React, { useState, useRef } from "react";
import FormCard from "./FormCard";
import FormLabel from "./FormLabel";
import InputField from "./InputField";
import StarRating from "./StarRating";
import TextAreaField from "./TextAreaField";
import SubmitButton from "./SubmitButton";
import ValidationMessage from "./ValidationMessage";
import "./ContactForm.css";

function ContactForm() {
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const validateField = (fieldName, value) => {
    let error = "";
    
    if (fieldName === "name") {
      if (!value.trim()) {
        error = "Please fill out this field.";
      } else if (value.trim().length < 2) {
        error = "Please enter at least 2 characters.";
      }
    } else if (fieldName === "email") {
      if (!value.trim()) {
        error = "Please fill out this field.";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
        error = "Please include an '@' in the email address.";
      }
    }
    
    return error;
  };

  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    
    // Clear error when user starts typing
    if (showErrors) {
      const error = validateField(fieldName, value);
      setErrors((prev) => ({
        ...prev,
        [fieldName]: error,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const form = e.target;
    const formData = {
      name: form.name.value,
      email: form.email.value,
      comments: form.comments.value,
      rating: rating,
    };

    // Validate all fields
    const nameError = validateField("name", form.name.value);
    const emailError = validateField("email", form.email.value);
    
    const newErrors = {
      name: nameError,
      email: emailError,
    };
    
    setErrors(newErrors);
    setShowErrors(true);

    // Set custom validation messages for native HTML5 validation
    if (nameError) {
      nameInputRef.current.setCustomValidity(nameError);
    } else {
      nameInputRef.current.setCustomValidity("");
    }

    if (emailError) {
      emailInputRef.current.setCustomValidity(emailError);
    } else {
      emailInputRef.current.setCustomValidity("");
    }

    // Check if form is valid
    if (nameError || emailError || !form.checkValidity()) {
      return;
    }

    // Print JSON data to console
    console.log("=== CONTACT FORM SUBMISSION ===");
    console.log(JSON.stringify(formData, null, 2));
    console.log("===============================");

    alert("Thank you for your feedback!");
    
    // Reset form
    form.reset();
    setRating(0);
    setErrors({});
    setShowErrors(false);
  };

  return (
    <FormCard>
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <FormLabel htmlFor="name" required>
            Name
          </FormLabel>
          <div className="input-wrapper">
            <InputField
              ref={nameInputRef}
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              required
              minLength={2}
              onChange={handleInputChange}
            />
            <ValidationMessage
              message={errors.name}
              fieldId="name"
              isVisible={showErrors}
            />
          </div>
        </div>

        <div className="form-group">
          <FormLabel htmlFor="email" required>
            Email
          </FormLabel>
          <div className="input-wrapper">
            <InputField
              ref={emailInputRef}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              onChange={handleInputChange}
            />
            <ValidationMessage
              message={errors.email}
              fieldId="email"
              isVisible={showErrors}
            />
          </div>
        </div>

        <div className="form-group">
          <StarRating 
            value={rating} 
            onChange={handleRatingChange} 
            label="rate your experience"
          />
        </div>

        <div className="form-group">
          <FormLabel htmlFor="comments">
            Comments
          </FormLabel>
          <TextAreaField
            id="comments"
            name="comments"
            placeholder="Enter your comments or feedback"
            rows={3}
          />
        </div>

        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </FormCard>
  );
}

export default ContactForm;

