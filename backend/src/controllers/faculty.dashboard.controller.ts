import { Request, Response, NextFunction } from 'express';
import { FacultyDashboardService } from '../services/faculty.dashboard.service';
import { sendSuccess } from '../utils/response';

export class FacultyDashboardController {
  static async getDashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await FacultyDashboardService.getDashboardData((req.user as any)?.id);
      return sendSuccess(res, data, 'Dashboard data fetched successfully');
    } catch (error) {
      next(error);
    }
  }
}
