import { Request, Response } from "express";

import { handleError, handleSuccess } from '../../lib/errors';
import { AnalyticsService } from '../../modules/faculty/analytics/analytics.service';
import { reportQuerySchema } from '../../modules/faculty/analytics/analytics.validation';

/**
 * GET /api/faculty/analytics/reports/attendance
 * Retrieves paginated attendance report data with filtering.
 */
export async function GET(req: Request, res: Response) {
  try {
    const params = req.params as any;
    const user = req.user!;
    const searchParams = { get: (key: string) => req.query[key] as string | undefined };

    const rawQuery = {
      page: searchParams.get('page') || undefined,
      limit: searchParams.get('limit') || undefined,
      courseId: searchParams.get('courseId') || undefined,
      section: searchParams.get('section') || undefined,
      semester: searchParams.get('semester') || undefined,
      dateFrom: searchParams.get('dateFrom') || undefined,
      dateTo: searchParams.get('dateTo') || undefined,
    };

    const query = reportQuerySchema.parse(rawQuery);
    const result = await AnalyticsService.getAttendanceReport(user.id, query);

    handleSuccess(res, result, 200, 'Attendance report retrieved successfully.');
  } catch (error) {
    handleError(error, res);
  }
}
