import { Request, Response, NextFunction } from 'express';
import { FacultySettingsService } from '../services/faculty.settings.service';
import { sendSuccess } from '../utils/response';
import { SettingsUpdateSchema } from '../validators/faculty.validator';

export class FacultySettingsController {
  static async getSettings(req: Request, res: Response, next: NextFunction) {
    try {
      const settings = await FacultySettingsService.getSettings((req.user as any)?.id);
      return sendSuccess(res, settings, 'Settings fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async updateSettings(req: Request, res: Response, next: NextFunction) {
    try {
      const data = SettingsUpdateSchema.parse(req.body);
      const settings = await FacultySettingsService.updateSettings((req.user as any)?.id, data);
      return sendSuccess(res, settings, 'Settings updated successfully');
    } catch (error) {
      next(error);
    }
  }
}
