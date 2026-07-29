import { Request, Response } from "express";

import { handleError, handleSuccess } from '../../lib/errors';
import { AnalyticsService } from '../../modules/faculty/analytics/analytics.service';

/**
 * GET /api/faculty/analytics/dashboard-summary
 * Returns overview statistics across all sessions owned by the authenticated faculty member.
 */
export async function GET(req: Request, res: Response) {
  try {
    const params = req.params as any;
    const user = req.user!;
    const result = await AnalyticsService.getDashboardSummary(user.id);
    handleSuccess(res, result, 200, 'Dashboard summary retrieved successfully.');
  } catch (error) {
    handleError(error, res);
  }
}
