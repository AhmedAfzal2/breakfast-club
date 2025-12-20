import express from 'express';
import MenuItem from '../models/MenuItem.js';

const router = express.Router();

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find().sort({ category: 1, subcategory: 1 });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get menu items by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const menuItems = await MenuItem.find({ category: category.toUpperCase() }).sort({ subcategory: 1 });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get menu items by category and subcategory
router.get('/category/:category/subcategory/:subcategory', async (req, res) => {
  try {
    const { category, subcategory } = req.params;
    const menuItems = await MenuItem.find({
      category: category.toUpperCase(),
      subcategory: subcategory,
    });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single menu item by ID
router.get('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new menu item
router.post('/', async (req, res) => {
  try {
    const menuItem = new MenuItem(req.body);
    const savedItem = await menuItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a menu item
router.put('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.json(menuItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a menu item
router.delete('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

