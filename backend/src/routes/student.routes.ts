import { Router } from 'express';
import { studentController } from '../controllers/student.controller';
const router = Router();

// Student Dashboard & Analytics
router.get('/:studentId/dashboard/info', studentController.getDashboardInfo);
router.get('/:studentId/dashboard/today-classes', studentController.getTodayClasses);
router.get('/:studentId/dashboard/courses', studentController.getCourses);
router.get('/:studentId/dashboard/assignments', studentController.getAssignments);
router.get('/:studentId/dashboard/insights', studentController.getInsights);

// Student Reports
router.get('/:studentId/reports/attendance', studentController.getAttendanceReport);
router.get('/:studentId/reports/understanding', studentController.getUnderstandingReport);
router.post('/:studentId/reports/export', studentController.exportReport);

// Student Settings
router.get('/:studentId/settings', studentController.getSettings);
router.put('/:studentId/settings/profile', studentController.updateProfileSettings);
router.put('/:studentId/settings/academic', studentController.updateAcademicSettings);
router.put('/:studentId/settings/notifications', studentController.updateNotificationSettings);
router.put('/:studentId/settings/security', studentController.updateSecuritySettings);

// Student Documents
router.get('/:studentId/documents', studentController.getDocuments);

// Cross-Module Shared Endpoints (Faculty <-> Student)
router.get('/resources', studentController.getCourseResources);
router.get('/pulse/active', studentController.getActivePulseSessions);
router.post('/pulse/respond', studentController.submitPulseResponse);

export default router;
