import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  items: [{
    menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    src: { type: String } // Image URL
  }],
  totalAmount: { type: Number, required: true },
  customerName: { type: String, default: 'Guest' },
  tableNumber: { type: String },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending'
  }
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);

export default Order;
