import dotenv from 'dotenv';
dotenv.config({ path: "./config/config.env" });

// DEBUG: check email env vars
console.log("Loaded EMAIL_USER:", process.env.EMAIL_USER);
console.log("Loaded EMAIL_PASS:", process.env.EMAIL_PASS ? "********" : "NOT SET");

import app from './app.js';
import Razorpay from 'razorpay';
import mongoose from 'mongoose';

// MongoDB URI
const DB = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(DB)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Server port
const port = process.env.PORT || 3000;

// Razorpay instance
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
