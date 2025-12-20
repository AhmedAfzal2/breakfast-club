import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import reservationRoutes from './routes/reservations.js';
<<<<<<< Updated upstream
import menuItemRoutes from './routes/menuItems.js';
=======
import reviewRoutes from './routes/reviews.js';
>>>>>>> Stashed changes
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/reservations', reservationRoutes);
<<<<<<< Updated upstream
app.use('/api/menu-items', menuItemRoutes);
=======
app.use('/api/reviews', reviewRoutes);
>>>>>>> Stashed changes

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

