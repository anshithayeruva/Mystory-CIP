import { Request, Response } from 'express';
import { FacultySettingsService } from '../services/faculty.settings.service';

export class FacultySettingsController {
  static async getSettings(req: Request, res: Response) {
    try {
      const settings = await FacultySettingsService.getSettings(req.user?.id!);
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async updateSettings(req: Request, res: Response) {
    try {
      const settings = await FacultySettingsService.updateSettings(req.user?.id!, req.body);
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
