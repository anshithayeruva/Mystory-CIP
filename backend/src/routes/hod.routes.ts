import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth';
import { HodController } from '../controllers/hod.controller';

const router = Router();

// Require authentication for all HOD routes
router.use(requireAuth);
router.use(requireRole(['HOD', 'ADMIN']));

// Dashboard
router.get('/dashboard', HodController.getDashboard);

// Faculty Management
router.get('/faculty', HodController.getFacultyList);
router.get('/faculty/:id', HodController.getFacultyById);
router.post('/faculty', HodController.createFaculty);
router.put('/faculty/:id', HodController.updateFaculty);
router.delete('/faculty/:id', HodController.deleteFaculty);

// Students Management
router.get('/students', HodController.getStudentsList);
router.get('/students/:id', HodController.getStudentById);
router.post('/students', HodController.createStudent);
router.put('/students/:id', HodController.updateStudent);
router.delete('/students/:id', HodController.deleteStudent);

// Subjects / Courses Management
router.get('/subjects', HodController.getSubjectsList);
router.get('/subjects/:id', HodController.getSubjectById);
router.post('/subjects', HodController.createSubject);
router.put('/subjects/:id', HodController.updateSubject);
router.delete('/subjects/:id', HodController.deleteSubject);

// Reports & Analytics
router.get('/reports', HodController.getDepartmentReports);
router.post('/reports/export', HodController.exportReport);

// Settings
router.get('/settings', HodController.getSettings);
router.put('/settings', HodController.updateSettings);

// Account Profile & Security
router.get('/account', HodController.getAccountProfile);
router.put('/account', HodController.updateAccountProfile);
router.put('/account/password', HodController.updateAccountPassword);

export default router;
