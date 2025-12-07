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
    return { reservations: [] };
  }
}

// Write submissions to file
async function writeSubmissions(data) {
  await fs.writeFile(submissionsFile, JSON.stringify(data, null, 2));
}

// POST /api/reservations - Handle reservation form submission
router.post('/', async (req, res) => {
  try {
    await ensureDataDir();
    
    const submission = {
      type: 'reservation',
      ...req.body,
      timestamp: new Date().toISOString()
    };

    // Print to console
    console.log('=== RESERVATION SUBMISSION ===');
    console.log(JSON.stringify(submission, null, 2));
    console.log('=============================\n');

    // Save to JSON file
    const data = await readSubmissions();
    if (!data.reservations) {
      data.reservations = [];
    }
    data.reservations.push(submission);
    await writeSubmissions(data);

    res.status(200).json({
      success: true,
      message: 'Reservation submitted successfully'
    });
  } catch (error) {
    console.error('Error processing reservation submission:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing submission'
    });
  }
});

export default router;

