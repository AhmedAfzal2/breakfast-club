import Review from '../../models/Review.js';

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

export const seedReviews = async () => {
  try {
    console.log('\n=== Seeding Reviews ===');
    await Review.deleteMany({});
    console.log('Cleared existing reviews');
    
    const insertedReviews = await Review.insertMany(reviewsData);
    console.log(`✅ Successfully seeded ${insertedReviews.length} reviews`);
    
    return { success: true, count: insertedReviews.length };
  } catch (error) {
    console.error('❌ Error seeding reviews:', error.message);
    return { success: false, error: error.message };
  }
};


