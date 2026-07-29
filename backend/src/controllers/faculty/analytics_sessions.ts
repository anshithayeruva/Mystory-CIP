import { Request, Response } from "express";

import { handleError, handleSuccess } from '../../lib/errors';
import { AnalyticsService } from '../../modules/faculty/analytics/analytics.service';
import { sessionSummaryQuerySchema } from '../../modules/faculty/analytics/analytics.validation';

/**
 * GET /api/faculty/analytics/sessions
 * Returns a paginated, filtered list of completed classroom pulse session summaries.
 */
export async function GET(req: Request, res: Response) {
  try {
    const params = req.params as any;
    const user = req.user!;
    const searchParams = { get: (key: string) => req.query[key] as string | undefined };

    const rawQuery = {
      page: searchParams.get('page') || undefined,
      limit: searchParams.get('limit') || undefined,
      search: searchParams.get('search') || undefined,
      courseId: searchParams.get('courseId') || undefined,
      topicId: searchParams.get('topicId') || undefined,
      dateFrom: searchParams.get('dateFrom') || undefined,
      dateTo: searchParams.get('dateTo') || undefined,
    };

    const query = sessionSummaryQuerySchema.parse(rawQuery);
    const result = await AnalyticsService.listSessionSummaries(user.id, query);

    handleSuccess(res, result, 200, 'Session summaries retrieved successfully.');
  } catch (error) {
    handleError(error, res);
  }
}
