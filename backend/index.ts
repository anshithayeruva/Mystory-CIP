import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.BACKEND_PORT || (process.env.PORT !== '3000' ? process.env.PORT : null) || 5000;

app.use(cors({
  origin: 'http://localhost:3000', // Allow the frontend to access the API
  credentials: true,
}));
app.use(express.json());

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running correctly!' });
});

// Example route for fetching faculties
app.get('/api/admin/faculty', async (req, res) => {
  try {
    const faculty = await prisma.user.findMany({ where: { role: 'FACULTY' } });
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch faculty' });
  }
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
