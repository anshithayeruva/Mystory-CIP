import { Request, Response } from 'express';
import { AdminSettingsService } from '../services/admin.settings.service';
import { 
  updateInstitutionSchema, 
  updateAcademicSchema, 
  updateSecuritySchema, 
  updateIntegrationSchema 
} from '../validators/admin.settings.validator';

export class AdminSettingsController {
  
  // Institution
  static async getInstitution(req: Request, res: Response) {
    try {
      const data = await AdminSettingsService.getInstitution();
      res.status(200).json({ success: true, data });
    } catch (error: any) {
      console.error('Error fetching institution settings:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch settings', error: error.message });
    }
  }

  static async updateInstitution(req: Request, res: Response) {
    try {
      const validatedData = updateInstitutionSchema.parse(req.body);
      const data = await AdminSettingsService.updateInstitution(validatedData);
      
      // Attempt to log action
      if (req.user?.id) {
        await AdminSettingsService.logAction(req.user.id, "Updated Institution Settings", req.ip);
      }

      res.status(200).json({ success: true, data, message: "Institution settings updated successfully" });
    } catch (error: any) {
      console.error('Error updating institution settings:', error);
      res.status(400).json({ success: false, message: 'Invalid data', error: error.errors || error.message });
    }
  }

  // Academic
  static async getAcademic(req: Request, res: Response) {
    try {
      const data = await AdminSettingsService.getAcademic();
      res.status(200).json({ success: true, data });
    } catch (error: any) {
      console.error('Error fetching academic settings:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch settings', error: error.message });
    }
  }

  static async updateAcademic(req: Request, res: Response) {
    try {
      const validatedData = updateAcademicSchema.parse(req.body);
      const data = await AdminSettingsService.updateAcademic(validatedData);

      if (req.user?.id) {
        await AdminSettingsService.logAction(req.user.id, "Updated Academic Settings", req.ip);
      }

      res.status(200).json({ success: true, data, message: "Academic settings updated successfully" });
    } catch (error: any) {
      console.error('Error updating academic settings:', error);
      res.status(400).json({ success: false, message: 'Invalid data', error: error.errors || error.message });
    }
  }

  // Security
  static async getSecurity(req: Request, res: Response) {
    try {
      const data = await AdminSettingsService.getSecurity();
      res.status(200).json({ success: true, data });
    } catch (error: any) {
      console.error('Error fetching security settings:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch settings', error: error.message });
    }
  }

  static async updateSecurity(req: Request, res: Response) {
    try {
      const validatedData = updateSecuritySchema.parse(req.body);
      const data = await AdminSettingsService.updateSecurity(validatedData);

      if (req.user?.id) {
        await AdminSettingsService.logAction(req.user.id, "Updated Security Settings", req.ip);
      }

      res.status(200).json({ success: true, data, message: "Security settings updated successfully" });
    } catch (error: any) {
      console.error('Error updating security settings:', error);
      res.status(400).json({ success: false, message: 'Invalid data', error: error.errors || error.message });
    }
  }

  // Integrations
  static async getIntegrations(req: Request, res: Response) {
    try {
      const data = await AdminSettingsService.getIntegrations();
      res.status(200).json({ success: true, data });
    } catch (error: any) {
      console.error('Error fetching integration settings:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch settings', error: error.message });
    }
  }

  static async updateIntegrations(req: Request, res: Response) {
    try {
      const validatedData = updateIntegrationSchema.parse(req.body);
      const data = await AdminSettingsService.updateIntegrations(validatedData);

      if (req.user?.id) {
        await AdminSettingsService.logAction(req.user.id, "Updated Integration Settings", req.ip);
      }

      res.status(200).json({ success: true, data, message: "Integration settings updated successfully" });
    } catch (error: any) {
      console.error('Error updating integration settings:', error);
      res.status(400).json({ success: false, message: 'Invalid data', error: error.errors || error.message });
    }
  }

  // Audit Logs
  static async getAuditLogs(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const data = await AdminSettingsService.getAuditLogs(page, limit);
      res.status(200).json({ success: true, data });
    } catch (error: any) {
      console.error('Error fetching audit logs:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch audit logs', error: error.message });
    }
  }
}
