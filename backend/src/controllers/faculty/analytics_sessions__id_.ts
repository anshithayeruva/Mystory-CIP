import { Request, Response } from "express";

import { handleError, handleSuccess } from '../../lib/errors';
import { AnalyticsService } from '../../modules/faculty/analytics/analytics.service';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/faculty/analytics/sessions/[id]
 * Retrieves detailed summary metrics for a single completed classroom pulse session.
 */
export async function GET(req: Request, { params }: RouteContext) {
  try {
    const user = req.user!;
    const { id } = await params;

    const result = await AnalyticsService.getSessionSummary(user.id, id);

    handleSuccess(res, result, 200, 'Session summary retrieved successfully.');
  } catch (error) {
    handleError(error, res);
  }
}
