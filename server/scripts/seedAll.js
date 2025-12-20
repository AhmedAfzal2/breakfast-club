import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import connectDB from '../config/database.js';
import { seedReviews } from './seeders/seedReviews.js';
import { seedMenuItems } from './seeders/seedMenuItems.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env file from server directory
dotenv.config({ path: join(__dirname, '..', '.env') });

const seedAll = async () => {
  try {
    console.log('🚀 Starting database seeding...\n');
    console.log('Connecting to MongoDB...');
    await connectDB();

    const results = [];

    // Seed Reviews
    const reviewsResult = await seedReviews();
    results.push({ name: 'Reviews', ...reviewsResult });

    // Seed Menu Items
    const menuItemsResult = await seedMenuItems();
    results.push({ name: 'Menu Items', ...menuItemsResult });

    // Add more seeders here as needed
    // Example: const otherResult = await seedOther();
    // results.push({ name: 'Other', ...otherResult });

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 SEEDING SUMMARY');
    console.log('='.repeat(50));
    
    let totalSuccess = 0;
    let totalFailed = 0;
    
    results.forEach(result => {
      if (result.success) {
        console.log(`✅ ${result.name}: ${result.count} items seeded`);
        totalSuccess++;
      } else {
        console.log(`❌ ${result.name}: Failed - ${result.error}`);
        totalFailed++;
      }
    });
    
    console.log('='.repeat(50));
    
    if (totalFailed === 0) {
      console.log(`\n🎉 All databases seeded successfully! (${totalSuccess} collections)`);
      process.exit(0);
    } else {
      console.log(`\n⚠️  Seeding completed with ${totalFailed} error(s)`);
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Fatal error during seeding:', error);
    process.exit(1);
  }
};

seedAll();

