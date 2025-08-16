// app.js
import express from 'express';
import cors from 'cors';
import paymentRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';


const app = express();

// Middleware
app.use(express.json());

// CORS setup
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from your frontend
  credentials: true
}));

// Routes
app.use("/api/v1", paymentRoutes);
app.use("/api/auth", authRoutes);

export default app;
