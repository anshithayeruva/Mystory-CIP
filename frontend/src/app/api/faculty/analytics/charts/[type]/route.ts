import { NextRequest } from 'next/server';
import { getAuthenticatedUser } from '@/lib/request';
import { handleError, handleSuccess } from '@/lib/errors';
import { AnalyticsService } from '@/modules/faculty/analytics/analytics.service';
import { chartTypeSchema } from '@/modules/faculty/analytics/analytics.validation';

interface RouteContext {
  params: Promise<{ type: string }>;
}

/**
 * GET /api/faculty/analytics/charts/[type]
 * Retrieves trend data formatted for frontend chart rendering.
 */
export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    const user = getAuthenticatedUser(req);
    const { type } = await params;

    const validatedType = chartTypeSchema.parse(type);
    const result = await AnalyticsService.getChartData(user.id, validatedType);

    return handleSuccess(result, 200, 'Chart data retrieved successfully.');
  } catch (error) {
    return handleError(error);
  }
}
