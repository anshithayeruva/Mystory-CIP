import { Request, Response } from 'express';
import { AdminDashboardService } from '../services/admin.dashboard.service';
import { sendSuccess, sendError } from '../utils/response';

export class AdminDashboardController {
  static async getDashboard(req: Request, res: Response) {
    try {
      const data = await AdminDashboardService.getDashboardData();
      return sendSuccess(res, data, 'Dashboard data fetched successfully.');
    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      return sendError(res, 500, 'Internal Server Error', [error.message]);
    }
  }
}
