import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth';
import { FacultyDashboardController } from '../controllers/faculty.dashboard.controller';
import { FacultySubjectController } from '../controllers/faculty.subject.controller';
import { FacultyPulseSessionController } from '../controllers/faculty.pulse-session.controller';
import { FacultyReportController } from '../controllers/faculty.report.controller';
import { FacultySettingsController } from '../controllers/faculty.settings.controller';

const router = Router();

// Apply auth middleware to all faculty routes
router.use(requireAuth);
// Fallback if requireRole is imported
try {
  if (typeof requireRole === 'function') router.use(requireRole(['FACULTY']));
} catch(e) {}

// Dashboard
router.get('/dashboard', FacultyDashboardController.getDashboard);

// Subjects
router.get('/subjects', FacultySubjectController.getSubjects);
router.get('/subjects/:id', FacultySubjectController.getSubjectById);
router.post('/subjects', FacultySubjectController.createSubject);
router.put('/subjects/:id', FacultySubjectController.updateSubject);
router.delete('/subjects/:id', FacultySubjectController.deleteSubject);

// Pulse Sessions
router.get('/pulse-sessions', FacultyPulseSessionController.getPulseSessions);
router.post('/pulse-sessions', FacultyPulseSessionController.createPulseSession);
router.get('/pulse-sessions/:id', FacultyPulseSessionController.getPulseSessionById);
router.put('/pulse-sessions/:id', FacultyPulseSessionController.updatePulseSession);
router.delete('/pulse-sessions/:id', FacultyPulseSessionController.deletePulseSession);

// Live Session
router.post('/live-session/:id/start', FacultyPulseSessionController.startLiveSession);
router.post('/live-session/:id/pause', FacultyPulseSessionController.pauseLiveSession);
router.post('/live-session/:id/resume', FacultyPulseSessionController.resumeLiveSession);
router.post('/live-session/:id/end', FacultyPulseSessionController.endLiveSession);
router.get('/live-session/:id', FacultyPulseSessionController.getLiveSession);

// Session Summary
router.get('/session-summary', FacultyPulseSessionController.getAllSessionSummaries);
router.get('/session-summary/:id', FacultyPulseSessionController.getSessionSummary);

// Concept Gap Analysis
router.get('/concept-gap', FacultyPulseSessionController.getAllConceptGaps);
router.get('/concept-gap/:subjectId', FacultyPulseSessionController.getConceptGapAnalysis);

// Reports
router.get('/reports', FacultyReportController.getReports);
router.post('/reports/export', FacultyReportController.exportReport);

// Settings
router.get('/settings', FacultySettingsController.getSettings);
router.put('/settings', FacultySettingsController.updateSettings);

export default router;
