import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Review from '../models/Review.js';
import connectDB from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env file from server directory
dotenv.config({ path: join(__dirname, '..', '.env') });

// Reviews data
const reviewsData = [
  {
    name: "Junaid Jamshed",
    rating: 5,
    quote: "The Sweet Strawberry Milkshake was absolutely heavenly! Perfect start to my weekend. The atmosphere is so cozy and inviting.",
  },
  {
    name: "Rasheeda Bano",
    rating: 4,
    quote: "Fantastic Waffles and prompt service. The coffee was excellent, too. Highly recommend for anyone looking for a great brunch spot.",
  },
  {
    name: "Daniyal Khan",
    rating: 5,
    quote: "The Fluffy Buttermilk Pancakes melted in my mouth. This is officially my new favorite breakfast spot in the city!",
  },
  {
    name: "Zayn Malik",
    rating: 5,
    quote: "I loved the Cinnamon Rolls—freshly baked and gooey! They have great options for quick ordering on their app.",
  },
  {
    name: "Abdullah .",
    rating: 4,
    quote: "Great value and big portions. The Breakfast Burrito Bowl (from the hidden menu!) was spicy and filling. Will be back!",
  },
];

const seedAll = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();

    // Seed Reviews
    console.log('\n=== Seeding Reviews ===');
    await Review.deleteMany({});
    console.log('Cleared existing reviews');
    const insertedReviews = await Review.insertMany(reviewsData);
    console.log(`Successfully seeded ${insertedReviews.length} reviews`);

    // Add other seed operations here as needed
    // Example: await seedMenuItems();
    // Example: await seedOtherData();

    console.log('\n✅ All databases seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding databases:', error);
    process.exit(1);
  }
};

seedAll();

