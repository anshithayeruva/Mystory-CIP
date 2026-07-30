import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth';
import { FacultyDashboardController } from '../controllers/faculty.dashboard.controller';
import { FacultySubjectController } from '../controllers/faculty.subject.controller';
import { FacultyPulseSessionController } from '../controllers/faculty.pulse-session.controller';
import { FacultyReportController } from '../controllers/faculty.report.controller';
import { FacultySettingsController } from '../controllers/faculty.settings.controller';
import { FacultyProfileController } from '../controllers/faculty.profile.controller';

const router = Router();

// Apply auth middleware to all faculty routes
router.use(requireAuth);
router.use(requireRole(['FACULTY']));

// Dashboard
router.get('/dashboard', FacultyDashboardController.getDashboard);

// Subjects
router.get('/subjects', FacultySubjectController.getSubjects);
router.get('/subjects/:id', FacultySubjectController.getSubjectById);

// Pulse Sessions
router.get('/pulse-sessions', FacultyPulseSessionController.getPulseSessions);
router.post('/pulse-sessions', FacultyPulseSessionController.createPulseSession);
router.get('/pulse-sessions/:id', FacultyPulseSessionController.getPulseSessionById);
router.put('/pulse-sessions/:id', FacultyPulseSessionController.updatePulseSession);
router.delete('/pulse-sessions/:id', FacultyPulseSessionController.deletePulseSession);

// Live Session
router.post('/pulse-sessions/:id/live/start', FacultyPulseSessionController.startLiveSession);
router.post('/pulse-sessions/:id/live/end', FacultyPulseSessionController.endLiveSession);

// Session Summary
router.get('/pulse-sessions/:id/summary', FacultyPulseSessionController.getSessionSummary);

// Concept Gap Analysis
router.get('/concept-gap-analysis', FacultyPulseSessionController.getConceptGapAnalysis);

// Reports
router.get('/reports', FacultyReportController.getReports);
router.post('/reports', FacultyReportController.generateReport);

// Settings
router.get('/settings', FacultySettingsController.getSettings);
router.put('/settings', FacultySettingsController.updateSettings);

// Faculty Profile
router.get('/profile', FacultyProfileController.getProfile);
router.put('/profile', FacultyProfileController.updateProfile);

export default router;
