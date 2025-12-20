import express from 'express';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

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

    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully'
    });
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

