import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout/Layout";
import FormContainer from "../components/FormContainer";
import Button from "../components/Button";
import StarRating from "../components/StarRating";
import Toast from "../components/Toast";
import "../App.css";
import "./ContactPage.css";

function ContactPage() {
  const [rating, setRating] = useState(0);
  const [toast, setToast] = useState(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: "onChange"
  });

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      rating: rating
    };

    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setToast({
          message: "Message sent successfully!",
          type: "success"
        });
        reset();
        setRating(0);
      } else {
        setToast({
          message: result.message || "Failed to send message. Please try again.",
          type: "error"
        });
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setToast({
        message: "Failed to send message. Please try again.",
        type: "error"
      });
    }
  };

  const onError = (errors) => {
    // Show first error as toast
    const firstError = Object.values(errors)[0];
    if (firstError?.message) {
      setToast({
        message: firstError.message,
        type: "error"
      });
    }
  };

  const formFields = [
    {
      label: "name",
      component: (
        <input
          type="text"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters"
            },
            maxLength: {
              value: 50,
              message: "Name must be less than 50 characters"
            },
          })}
          className="contact-input"
          placeholder="Enter your name"
          maxLength={50}
        />
      ),
      sectionClassName: "form-section",
      wrapperClassName: "form-field-wrapper"
    },
    {
      label: "email",
      component: (
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address"
            },
            maxLength: {
              value: 100,
              message: "Email must be less than 100 characters"
            }
          })}
          className="contact-input"
          placeholder="Enter your email"
          maxLength={100}
        />
      ),
      sectionClassName: "form-section",
      wrapperClassName: "form-field-wrapper"
    },
    {
      label: "rate experience",
      component: (
        <StarRating 
          value={rating}
          onChange={(rating) => setRating(rating)}
        />
      ),
      sectionClassName: "form-section",
      wrapperClassName: "form-field-wrapper"
    },
    {
      label: "comments",
      component: (
        <textarea
          {...register("message", {
            maxLength: {
              value: 500,
              message: "Comments must be less than 500 characters"
            }
          })}
          className="contact-textarea"
          placeholder="Enter your comments"
          rows="6"
          maxLength={500}
        />
      ),
      sectionClassName: "form-section",
      wrapperClassName: "form-field-wrapper"
    }
  ];

  return (
    <Layout>
      <div className="contact-page">
        <h1 className="page-heading">CONTACT US</h1>
        
        <div className="contact-page-content">
          <div className="contact-form-section">
            <form onSubmit={handleSubmit(onSubmit, onError)} className="contact-form">
              <FormContainer fields={formFields} />
              
              <div className="contact-form-actions">
                <Button text="send message" type="submit" />
              </div>
            </form>
          </div>

          <div className="contact-info-section">
            <div className="contact-details-section">
              <h2 className="contact-section-title">Contact Details</h2>
              <div className="contact-detail-item">
                <span className="contact-detail-label">Phone:</span>
                <span className="contact-detail-value">+1 (555) 123-4567</span>
              </div>
              <div className="contact-detail-item">
                <span className="contact-detail-label">Email:</span>
                <span className="contact-detail-value">info@breakfastclub.com</span>
              </div>
              <div className="contact-detail-column">
                <span className="contact-detail-label">Address:</span>
                <span className="contact-detail-value">
                  123 Breakfast Street, Morning City, MC 12345
                </span>
              </div>
              <div className="contact-detail-column">
                <span className="contact-detail-label">Hours:</span>
                <span className="contact-detail-value">
                  Monday - Friday: 7:00 AM - 3:00 PM<br />
                  Saturday - Sunday: 8:00 AM - 4:00 PM
                </span>
              </div>
            </div>

            <div className="other-branches-section">
              <h2 className="contact-section-title">Other Branches</h2>
              <div className="branch-item">
                <h3 className="branch-name">Downtown Branch</h3>
                <p className="branch-address">456 Main Street, Downtown</p>
                <p className="branch-phone">+1 (555) 234-5678</p>
              </div>
              <div className="branch-item">
                <h3 className="branch-name">Riverside Branch</h3>
                <p className="branch-address">789 River Road, Riverside</p>
                <p className="branch-phone">+1 (555) 345-6789</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </Layout>
  );
}

export default ContactPage;
