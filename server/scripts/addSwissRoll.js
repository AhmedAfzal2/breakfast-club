import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MenuItem from '../models/MenuItem.js';

dotenv.config();

const addSwissRoll = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/breakfast-club');
    console.log('Connected to MongoDB');

    // Check if swiss roll already exists
    const existingItem = await MenuItem.findOne({ name: 'swiss roll' });
    if (existingItem) {
      console.log('Swiss roll already exists in the database');
      await mongoose.connection.close();
      return;
    }

    // Create new menu item
    const swissRoll = new MenuItem({
      name: "swiss roll",
      price: 350,
      src: "/assets/images/menu-items/dessert/swiss_roll.png",
      description: "Delicious Swiss roll with a light, fluffy sponge cake rolled with creamy filling. A classic dessert that's both elegant and satisfying. Perfect for any occasion.",
      addOns: ["Whipped Cream", "Chocolate Sauce", "Strawberries", "Powdered Sugar", "Vanilla Ice Cream", "Caramel Drizzle"],
      category: "DESSERTS",
      subcategory: "Sweet Treats",
    });

    const savedItem = await swissRoll.save();
    console.log('✅ Successfully added Swiss roll to MongoDB:', savedItem);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('❌ Error adding Swiss roll:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

addSwissRoll();

