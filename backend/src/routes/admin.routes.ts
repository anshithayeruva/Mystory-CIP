import { Router } from 'express';
import { AdminDashboardController } from '../controllers/admin.dashboard.controller';
import { requireAdmin } from '../middleware/auth.middleware';

const router = Router();

// Apply auth middleware to all admin routes
router.use(requireAdmin);

// Dashboard routes
router.get('/dashboard', AdminDashboardController.getDashboard);

export default router;
