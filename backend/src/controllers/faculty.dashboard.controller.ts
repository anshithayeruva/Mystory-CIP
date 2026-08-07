import { Request, Response, NextFunction } from 'express';
import { FacultyDashboardService } from '../services/faculty.dashboard.service';
import { DashboardQuerySchema } from '../validators/faculty.validator';
import { sendSuccess } from '../utils/response';

export class FacultyDashboardController {
  static async getDashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const query = DashboardQuerySchema.parse(req.query);
      const userId = query.facultyId || (req.user as any)?.id;
      const data = await FacultyDashboardService.getDashboardData(userId);
      return sendSuccess(res, data, 'Faculty dashboard data fetched successfully');
    } catch (error) {
      next(error);
    }
  }
}

