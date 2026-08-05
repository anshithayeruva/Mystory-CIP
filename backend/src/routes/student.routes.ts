import { Router } from 'express';
import { studentController } from '../controllers/student.controller';
const router = Router();

// Temporarily disabling `protect` middleware for the student endpoints to allow testing without login
// as per the prompt: "Authentication and authorization will be implemented later."
// If auth is already enforced globally, we can use it, but for now we'll route directly.

router.get('/:studentId/dashboard/info', studentController.getDashboardInfo);
router.get('/:studentId/dashboard/today-classes', studentController.getTodayClasses);
router.get('/:studentId/dashboard/courses', studentController.getCourses);
router.get('/:studentId/dashboard/assignments', studentController.getAssignments);
router.get('/:studentId/dashboard/insights', studentController.getInsights);

router.get('/:studentId/reports/attendance', studentController.getAttendanceReport);
router.get('/:studentId/reports/understanding', studentController.getUnderstandingReport);
router.post('/:studentId/reports/export', studentController.exportReport);

router.get('/:studentId/settings', studentController.getSettings);
router.put('/:studentId/settings/profile', studentController.updateProfileSettings);
router.put('/:studentId/settings/academic', studentController.updateAcademicSettings);
router.put('/:studentId/settings/notifications', studentController.updateNotificationSettings);
router.put('/:studentId/settings/security', studentController.updateSecuritySettings);

router.get('/:studentId/documents', studentController.getDocuments);

export default router;
