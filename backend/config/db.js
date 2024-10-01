import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_LINK);
    console.log('DB connected');
  } catch (error) {
    console.error('DB connection error:', error);
    process.exit(1); // Exit process if DB fails to connect
  }
};
