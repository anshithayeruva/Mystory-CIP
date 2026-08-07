import { Router } from 'express';
import { AdminDashboardController } from '../controllers/admin.dashboard.controller';
import { requireAdmin } from '../middleware/auth.middleware';
import adminReportsRoutes from './admin.reports.routes';
import adminSettingsRoutes from './admin.settings.routes';

const router = Router();

// Apply auth middleware to all admin routes
router.use(requireAdmin);

// Dashboard routes
router.get('/dashboard', AdminDashboardController.getDashboard);

// Governance & Cross-Module Telemetry
router.get('/audit-logs', AdminDashboardController.getAuditLogs);
router.get('/system-health', AdminDashboardController.getSystemHealth);

// Reports routes
router.use('/reports', adminReportsRoutes);

// Settings routes
router.use('/settings', adminSettingsRoutes);

export default router;

