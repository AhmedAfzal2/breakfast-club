import mongoose from 'mongoose';

const connectDB = async () => {
  // Check for MONGODB_URI when function is called, not at module load
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env. Make sure dotenv.config() is called before calling connectDB().');
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    console.error('Please verify:');
    console.error('1. Your username and password in the connection string are correct');
    console.error('2. Your password doesn\'t contain special characters that need URL encoding');
    console.error('3. Your database user has the correct permissions');
    console.error('4. Your IP address is whitelisted in MongoDB Atlas Network Access');
    process.exit(1);
  }
};

export default connectDB;


