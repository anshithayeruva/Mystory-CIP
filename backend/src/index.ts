import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { prisma } from './prisma/client';
import adminRoutes from './routes/admin.routes';
import academicRoutes from './routes/academic.routes';
import userRoutes from './routes/user.routes';
import facultyRoutes from './routes/faculty.routes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000', // Allow the frontend to access the API
  credentials: true,
}));
app.use(express.json());

// API Routes
app.use('/api/admin', adminRoutes);
app.use('/api/academic', academicRoutes);
app.use('/api/users', userRoutes);
app.use('/api/faculty', facultyRoutes);

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running correctly!' });
});

// Error handling middleware
app.use(errorHandler as any);

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
