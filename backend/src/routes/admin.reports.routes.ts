import { Router } from 'express';
import { AdminReportsController } from '../controllers/admin.reports.controller';

const router = Router();

// Overview metrics
router.get('/overview/metrics', AdminReportsController.getOverviewMetrics);
router.get('/overview/mastery', AdminReportsController.getMasteryDistribution);
router.get('/overview/trend', AdminReportsController.getUnderstandingTrend);
router.get('/overview/departments', AdminReportsController.getDepartmentPerformance);

// Reports available and download
router.get('/available', AdminReportsController.getAvailableReports);
router.get('/download/:id', AdminReportsController.downloadReport);

export default router;
