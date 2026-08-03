import { Router } from 'express';
import { AdminSettingsController } from '../controllers/admin.settings.controller';

const router = Router();

// Institution Settings
router.get('/institution', AdminSettingsController.getInstitution);
router.put('/institution', AdminSettingsController.updateInstitution);

// Academic Settings
router.get('/academic', AdminSettingsController.getAcademic);
router.put('/academic', AdminSettingsController.updateAcademic);

// Security Settings
router.get('/security', AdminSettingsController.getSecurity);
router.put('/security', AdminSettingsController.updateSecurity);

// Integration Settings
router.get('/integrations', AdminSettingsController.getIntegrations);
router.put('/integrations', AdminSettingsController.updateIntegrations);

// Audit Logs
router.get('/audit-logs', AdminSettingsController.getAuditLogs);

export default router;
