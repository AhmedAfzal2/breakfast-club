import React, { useState } from "react";
import FormCard from "./FormCard";
import FormLabel from "./FormLabel";
import InputField from "./InputField";
import StarRating from "./StarRating";
import TextAreaField from "./TextAreaField";
import SubmitButton from "./SubmitButton";
import "./ContactForm.css";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    comments: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: Add API call to submit form data
    alert("Thank you for your feedback!");
    setFormData({
      name: "",
      email: "",
      rating: 0,
      comments: "",
    });
  };

  return (
    <FormCard>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <FormLabel htmlFor="name" required>
            Name
          </FormLabel>
          <InputField
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <FormLabel htmlFor="email" required>
            Email
          </FormLabel>
          <InputField
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <StarRating 
            value={formData.rating} 
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
            value={formData.comments}
            onChange={handleInputChange}
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

