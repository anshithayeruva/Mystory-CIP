import { Router } from 'express';
import { AdminDashboardController } from '../controllers/admin.dashboard.controller';
import { AdminUserController } from '../controllers/admin.user.controller';
import { requireAdmin } from '../middleware/auth.middleware';
import adminReportsRoutes from './admin.reports.routes';
import adminSettingsRoutes from './admin.settings.routes';

const router = Router();

// Apply ADMIN auth middleware to all admin routes
router.use(requireAdmin);

// ── Dashboard ──────────────────────────────────────
router.get('/dashboard', AdminDashboardController.getDashboard);
router.get('/audit-logs', AdminDashboardController.getAuditLogs);
router.get('/system-health', AdminDashboardController.getSystemHealth);

// ── User Management ──────────────────────────────────────
router.post('/users', AdminUserController.createUser);
router.post('/users/:id/resend-credentials', AdminUserController.resendCredentials);

// ── Reports & Settings ──────────────────────────────────────
router.use('/reports', adminReportsRoutes);
router.use('/settings', adminSettingsRoutes);

export default router;
