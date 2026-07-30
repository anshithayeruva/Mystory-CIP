import { Router } from 'express';
import { AcademicController } from '../controllers/academic.controller';

const router = Router();

router.get('/departments', AcademicController.getDepartments);
router.post('/departments', AcademicController.createDepartment);

router.get('/programs', AcademicController.getPrograms);
router.post('/programs', AcademicController.createProgram);
router.get('/programs/:id', AcademicController.getProgram);
router.put('/programs/:id', AcademicController.updateProgram);
router.delete('/programs/:id', AcademicController.deleteProgram);

router.put('/departments/:id', AcademicController.updateDepartment);
router.delete('/departments/:id', AcademicController.deleteDepartment);

export default router;
