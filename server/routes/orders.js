import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// POST /api/orders - Create a new order
router.post('/', async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Items array is required and must not be empty'
      });
    }

    if (!totalAmount || typeof totalAmount !== 'number' || totalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid totalAmount is required'
      });
    }

    // Validate each item
    for (const item of items) {
      if (!item.itemId || !item.name || !item.price || !item.quantity) {
        return res.status(400).json({
          success: false,
          message: 'Each item must have itemId, name, price, and quantity'
        });
      }
    }

    // Create new order
    const order = new Order({
      items: items,
      totalAmount: totalAmount,
      status: 'pending',
      orderDate: new Date()
    });

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order placed successfully',
      orderId: order._id,
      order: order
    });
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing order'
    });
  }
});

// GET /api/orders - Get all orders (optional, for admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });
    res.status(200).json({
      success: true,
      orders: orders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching orders'
    });
  }
});

export default router;

