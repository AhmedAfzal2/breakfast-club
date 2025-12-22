import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  // Order items
  items: [{
    itemId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, default: null }
  }],
  
  // Total amount
  totalAmount: { type: Number, required: true },
  
  // Order status
  status: {
    type: String,
    enum: ['pending', 'preparing', 'ready', 'completed', 'cancelled'],
    default: 'pending'
  },
  
  // Order timestamp
  orderDate: { type: Date, default: Date.now }
}, { timestamps: true });

// Index for efficient queries
OrderSchema.index({ orderDate: -1 });
OrderSchema.index({ status: 1 });

const Order = mongoose.model('Order', OrderSchema);

export default Order;

