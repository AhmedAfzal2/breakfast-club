import express from 'express';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to data directory
const dataDir = join(__dirname, '..', 'data');
const submissionsFile = join(dataDir, 'submissions.json');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Read existing submissions
async function readSubmissions() {
  try {
    const data = await fs.readFile(submissionsFile, 'utf8');
    return JSON.parse(data);
  } catch {
    return { contacts: [] };
  }
}

// Write submissions to file
async function writeSubmissions(data) {
  await fs.writeFile(submissionsFile, JSON.stringify(data, null, 2));
}

// POST /api/contact - Handle contact form submission
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
    console.log('==============================\n');

    // Save to JSON file
    const data = await readSubmissions();
    data.contacts.push(submission);
    await writeSubmissions(data);

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

export default router;

