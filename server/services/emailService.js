import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  // For Gmail, you'll need to use an App Password
  // Go to: Google Account > Security > 2-Step Verification > App passwords
  const emailUser = process.env.EMAIL_USER;
  const emailPassword = process.env.EMAIL_PASSWORD;
  
  if (!emailUser || !emailPassword) {
    throw new Error('Email credentials not configured. Please set EMAIL_USER and EMAIL_PASSWORD in your .env file');
  }

  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: emailUser,
      pass: emailPassword, // Use App Password for Gmail (NOT your regular password!)
    },
  });

  return transporter;
};

/**
 * Send email notification for contact form submission
 * @param {Object} formData - Contact form data
 * @param {string} formData.name - User's name
 * @param {string} formData.email - User's email
 * @param {string} formData.comments - User's comments
 * @param {number} formData.rating - User's rating (0-5)
 * @returns {Promise<Object>} - Email sending result
 */
export const sendContactEmail = async (formData) => {
  // Check if email is configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn('Email not configured. Skipping email send.');
    return { success: false, message: 'Email not configured' };
  }

  try {
    const transporter = createTransporter();

    // Email to restaurant owner
    const ownerEmail = process.env.OWNER_EMAIL || process.env.EMAIL_USER;
    
    // Format rating stars
    const stars = '⭐'.repeat(formData.rating || 0) + '☆'.repeat(5 - (formData.rating || 0));
    
    const mailOptions = {
      from: `"Breakfast Club Contact Form" <${process.env.EMAIL_USER}>`,
      to: ownerEmail,
      replyTo: formData.email, // Allow replying directly to the customer
      subject: `Customer Feedback from ${formData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Customer Feedback from ${formData.name}</h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
            <p><strong>Rating:</strong> ${stars} (${formData.rating || 0}/5)</p>
            ${formData.comments ? `<p><strong>Comments:</strong></p><p style="white-space: pre-wrap;">${formData.comments}</p>` : '<p><em>No comments provided</em></p>'}
          </div>
          
          <p style="color: #666; font-size: 12px;">
            You can reply directly to this email to respond to ${formData.name}.
          </p>
        </div>
      `,
      text: `
Customer Feedback from ${formData.name}

Name: ${formData.name}
Email: ${formData.email}
Rating: ${formData.rating || 0}/5 ${stars}

Comments:
${formData.comments || 'No comments provided'}

---
You can reply directly to this email to respond to ${formData.name}.
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    
    return { 
      success: true, 
      messageId: info.messageId,
      message: 'Email sent successfully' 
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      error: error.message,
      message: 'Failed to send email' 
    };
  }
};

/**
 * Send confirmation email to the customer
 * @param {Object} formData - Contact form data
 * @returns {Promise<Object>} - Email sending result
 */
export const sendConfirmationEmail = async (formData) => {
  // Check if email is configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    return { success: false, message: 'Email not configured' };
  }

  // Only send confirmation if enabled
  if (process.env.SEND_CONFIRMATION_EMAIL !== 'true') {
    return { success: false, message: 'Confirmation emails disabled' };
  }

  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Breakfast Club" <${process.env.EMAIL_USER}>`,
      to: formData.email,
      subject: 'Thank you for contacting Breakfast Club!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank you for your feedback, ${formData.name}!</h2>
          
          <p>We've received your message and appreciate you taking the time to reach out to us.</p>
          
          <p>We'll review your feedback and get back to you as soon as possible.</p>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Your submission:</strong></p>
            <p>Rating: ${'⭐'.repeat(formData.rating || 0)}${'☆'.repeat(5 - (formData.rating || 0))} (${formData.rating || 0}/5)</p>
            ${formData.comments ? `<p>Comments: ${formData.comments}</p>` : ''}
          </div>
          
          <p>Best regards,<br>The Breakfast Club Team</p>
        </div>
      `,
      text: `
Thank you for your feedback, ${formData.name}!

We've received your message and appreciate you taking the time to reach out to us.

We'll review your feedback and get back to you as soon as possible.

Your submission:
Rating: ${formData.rating || 0}/5
${formData.comments ? `Comments: ${formData.comments}` : ''}

Best regards,
The Breakfast Club Team
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent successfully:', info.messageId);
    
    return { 
      success: true, 
      messageId: info.messageId,
      message: 'Confirmation email sent successfully' 
    };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return { 
      success: false, 
      error: error.message,
      message: 'Failed to send confirmation email' 
    };
  }
};

