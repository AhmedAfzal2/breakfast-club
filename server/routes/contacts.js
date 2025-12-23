import express from 'express';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { sendContactEmail, sendConfirmationEmail } from '../services/emailService.js';
import Review from '../models/Review.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to data directory
const dataDir = join(__dirname, '..', 'data');
const contactsFile = join(dataDir, 'contacts.json');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Read existing contact submissions
async function readContacts() {
  try {
    const data = await fs.readFile(contactsFile, 'utf8');
    return JSON.parse(data);
  } catch {
    return { contacts: [] };
  }
}

// Write contacts to file
async function writeContacts(data) {
  await fs.writeFile(contactsFile, JSON.stringify(data, null, 2));
}

// POST /api/contacts - Handle contact form submission
router.post('/', async (req, res) => {
  try {
    await ensureDataDir();
    
    const submission = {
      type: 'contact',
      ...req.body,
      timestamp: new Date().toISOString()
    };

    // Print to console
    console.log('=== CONTACT FORM SUBMISSION ===');
    console.log(JSON.stringify(submission, null, 2));
    console.log('===============================\n');

    // Save to JSON file
    const data = await readContacts();
    if (!data.contacts) {
      data.contacts = [];
    }
    data.contacts.push(submission);
    await writeContacts(data);

    // If rating and comments are provided, also save as a review
    let reviewCreated = false;
    if (req.body.rating && req.body.rating > 0 && req.body.comments && req.body.comments.trim()) {
      try {
        const review = new Review({
          name: req.body.name,
          rating: Math.min(Math.max(parseInt(req.body.rating) || 1, 1), 5), // Ensure rating is between 1-5
          quote: req.body.comments.trim()
        });
        await review.save();
        reviewCreated = true;
        console.log('✅ Review created from contact form submission');
      } catch (error) {
        console.warn('⚠️  Failed to create review from contact form:', error.message);
        // Don't fail the request if review creation fails, just log it
      }
    }

    // Return response immediately after saving to database
    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully',
      reviewCreated: reviewCreated
    });

    // Send emails in the background (non-blocking)
    // Don't await - let it run asynchronously
    sendContactEmail(req.body).then((emailResult) => {
      if (!emailResult.success) {
        console.warn('Email sending failed:', emailResult.message);
      } else {
        console.log('✅ Contact email sent successfully');
      }
    }).catch((error) => {
      console.error('Error sending contact email:', error);
    });

    // Optionally send confirmation email to customer (also non-blocking)
    if (process.env.SEND_CONFIRMATION_EMAIL === 'true') {
      sendConfirmationEmail(req.body).then((confirmationResult) => {
        if (!confirmationResult.success) {
          console.warn('Confirmation email sending failed:', confirmationResult.message);
        } else {
          console.log('✅ Confirmation email sent successfully');
        }
      }).catch((error) => {
        console.error('Error sending confirmation email:', error);
      });
    }
  } catch (error) {
    console.error('Error processing contact submission:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing submission'
    });
  }
});

// GET /api/contacts - Get all contact submissions (optional, for admin)
router.get('/', async (req, res) => {
  try {
    const data = await readContacts();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error reading contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Error reading contacts'
    });
  }
});

export default router;

