import { Request, Response } from "express";

import { handleError, handleSuccess } from '../../lib/errors';
import { AnalyticsService } from '../../modules/faculty/analytics/analytics.service';
import { conceptGapQuerySchema } from '../../modules/faculty/analytics/analytics.validation';

export async function GET(req: Request, res: Response) {
  try {
    const params = req.params as any;
    const user = req.user!;
    const searchParams = Object.fromEntries(req.nextUrl.searchParams);
    const query = conceptGapQuerySchema.parse(searchParams);
    
    const result = await AnalyticsService.getConceptGapTrend(user.id, query);

    handleSuccess(res, result, 200, 'Concept gap trend retrieved successfully.');
  } catch (error) {
    handleError(error, res);
  }
}
