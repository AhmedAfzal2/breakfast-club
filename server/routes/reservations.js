import express from 'express';
import Reservation from '../models/Reservation.js';

const router = express.Router();

// Cleanup function to mark expired reservations as completed
// Tables are automatically unreserved after 1 hour (reservationEndTime)
async function cleanupExpiredReservations() {
  try {
    const now = new Date();
    const result = await Reservation.updateMany(
      {
        status: 'active',
        reservationEndTime: { $lt: now }
      },
      {
        $set: { status: 'completed' }
      }
    );
    if (result.modifiedCount > 0) {
      console.log(`Marked ${result.modifiedCount} expired reservations as completed`);
    }
  } catch (error) {
    console.error('Error cleaning up expired reservations:', error);
  }
}

// Run cleanup on route initialization and then every 5 minutes
cleanupExpiredReservations();
setInterval(cleanupExpiredReservations, 5 * 60 * 1000); // Every 5 minutes

// GET /api/reservations/reserved-tables - Get reserved table IDs for a specific date and time
router.get('/reserved-tables', async (req, res) => {
  try {
    const { date, time } = req.query;

    if (!date || !time) {
      return res.status(400).json({
        success: false,
        message: 'Date and time are required'
      });
    }

    // Parse the date and time
    const reservationDateTime = new Date(time);
    const reservationEndTime = new Date(reservationDateTime.getTime() + 60 * 60 * 1000); // Add 1 hour

    // Find all active reservations that overlap with the requested time slot
    // A reservation overlaps if:
    // - reservation time <= requested time < reservation end time, OR
    // - requested time <= reservation time < requested end time
    // Also exclude expired reservations (reservationEndTime < now)
    const now = new Date();
    const overlappingReservations = await Reservation.find({
      status: 'active',
      reservationEndTime: { $gt: now }, // Only include non-expired reservations
      $or: [
        {
          // Reservation starts before or at requested time and ends after requested time
          time: { $lte: reservationDateTime },
          reservationEndTime: { $gt: reservationDateTime }
        },
        {
          // Reservation starts during the requested time slot
          time: { $gte: reservationDateTime, $lt: reservationEndTime }
        }
      ]
    });

    // Extract all reserved table IDs
    const reservedTableIds = [];
    overlappingReservations.forEach(reservation => {
      reservedTableIds.push(...reservation.tableNumbers);
    });

    // Remove duplicates
    const uniqueReservedTableIds = [...new Set(reservedTableIds)];

    res.status(200).json({
      success: true,
      reservedTableIds: uniqueReservedTableIds
    });
  } catch (error) {
    console.error('Error fetching reserved tables:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching reserved tables'
    });
}
});

// POST /api/reservations - Handle reservation form submission
router.post('/', async (req, res) => {
  try {
    const { date, time, tableNumbers, name, contactNumber, occasion, additionalNotes, maxGuests } = req.body;

    // Validate required fields
    if (!date || !time || !tableNumbers || !name || !contactNumber) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: date, time, tableNumbers, name, and contactNumber are required'
      });
    }

    // Parse dates
    const reservationDate = new Date(date);
    const reservationTime = new Date(time);
    
    // Calculate reservation end time (1 hour after reservation time)
    const reservationEndTime = new Date(reservationTime.getTime() + 60 * 60 * 1000);

    // Check if any of the requested tables are already reserved for this time slot
    // Also exclude expired reservations (reservationEndTime < now)
    const now = new Date();
    const overlappingReservations = await Reservation.find({
      status: 'active',
      reservationEndTime: { $gt: now }, // Only include non-expired reservations
      tableNumbers: { $in: tableNumbers },
      $or: [
        {
          time: { $lte: reservationTime },
          reservationEndTime: { $gt: reservationTime }
        },
        {
          time: { $gte: reservationTime, $lt: reservationEndTime }
        }
      ]
    });

    if (overlappingReservations.length > 0) {
      // Find which tables are already reserved
      const alreadyReservedTables = [];
      overlappingReservations.forEach(reservation => {
        reservation.tableNumbers.forEach(tableId => {
          if (tableNumbers.includes(tableId) && !alreadyReservedTables.includes(tableId)) {
            alreadyReservedTables.push(tableId);
          }
        });
      });

      return res.status(409).json({
        success: false,
        message: 'Some tables are already reserved for this time slot',
        reservedTables: alreadyReservedTables
      });
    }

    // Create new reservation
    const reservation = new Reservation({
      date: reservationDate,
      time: reservationTime,
      tableNumbers: tableNumbers,
      name: name,
      contactNumber: contactNumber,
      occasion: occasion || null,
      additionalNotes: additionalNotes || null,
      maxGuests: maxGuests || 0,
      reservationEndTime: reservationEndTime,
      status: 'active'
    });

    await reservation.save();

    res.status(200).json({
      success: true,
      message: 'Reservation submitted successfully',
      reservationId: reservation._id
    });
  } catch (error) {
    console.error('Error processing reservation submission:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing submission'
    });
  }
});

// GET /api/reservations - Get all reservations (for admin)
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ time: -1 });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH /api/reservations/:id/status - Update reservation status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updatedReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/reservations/:id - Delete reservation
router.delete('/:id', async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Reservation deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

