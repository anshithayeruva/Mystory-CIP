import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.BACKEND_PORT || (process.env.PORT !== '3000' ? process.env.PORT : null) || 5000;

app.use(cors({
  origin: 'http://localhost:3000', // Allow the frontend to access the API
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Mount routes

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running correctly!' });
});



async function startServer() {
  try {
    await prisma.$connect();
    console.log('MongoDB connected successfully!');
    
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

startServer();
