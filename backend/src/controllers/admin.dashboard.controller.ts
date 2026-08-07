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

  // Cross-Module System Governance & Global Sync
  static async getAuditLogs(req: Request, res: Response) {
    try {
      const logs = await AdminDashboardService.getAuditLogs();
      return sendSuccess(res, logs, 'System audit logs retrieved successfully.');
    } catch (error: any) {
      return sendError(res, 500, 'Failed to fetch audit logs', [error.message]);
    }
  }

  static async getSystemHealth(req: Request, res: Response) {
    try {
      const health = await AdminDashboardService.getSystemHealth();
      return sendSuccess(res, health, 'System health telemetry fetched successfully.');
    } catch (error: any) {
      return sendError(res, 500, 'Failed to fetch system health', [error.message]);
    }
  }
}

