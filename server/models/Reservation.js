import mongoose from 'mongoose';

const ReservationSchema = new mongoose.Schema({
  // Date and time
  date: { type: Date, required: true },
  time: { type: Date, required: true }, // Full datetime of reservation
  
  // Contact information
  name: { type: String, required: true },
  contactNumber: { type: String, required: true },
  
  // Optional fields
  occasion: { type: String, default: null },
  additionalNotes: { type: String, default: null },
  
  // Table information
  tableNumbers: [{ type: Number, required: true }], // Array of table IDs
  maxGuests: { type: Number, required: true },
  
  // Reservation end time (date + time + 1 hour) - for auto-unreserve logic
  reservationEndTime: { type: Date, required: true },
  
  // Status
  status: { 
    type: String, 
    enum: ['active', 'completed', 'cancelled'], 
    default: 'active' 
  }
}, { timestamps: true });

// Index for efficient queries on date/time and table numbers
ReservationSchema.index({ time: 1, reservationEndTime: 1 });
ReservationSchema.index({ tableNumbers: 1 });
ReservationSchema.index({ status: 1 });

const Reservation = mongoose.model('Reservation', ReservationSchema);

export default Reservation;

