import { Request, Response } from 'express';
import { FacultyDashboardService } from '../services/faculty.dashboard.service';

export class FacultyDashboardController {
  static async getDashboard(req: Request, res: Response) {
    try {
      const data = await FacultyDashboardService.getDashboardData(req.user?.id!);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
