import { Request, Response } from "express";

import { handleError, handleSuccess } from '../../lib/errors';
import { AnalyticsService } from '../../modules/faculty/analytics/analytics.service';

/**
 * GET /api/faculty/analytics/concept-gaps
 * Retrieves concept gap analysis (strongly/weakly understood topics and high/low accuracy questions).
 */
export async function GET(req: Request, res: Response) {
  try {
    const params = req.params as any;
    const user = req.user!;
    const result = await AnalyticsService.getConceptGapAnalysis(user.id);

    handleSuccess(res, result, 200, 'Concept gap analysis retrieved successfully.');
  } catch (error) {
    handleError(error, res);
  }
}
