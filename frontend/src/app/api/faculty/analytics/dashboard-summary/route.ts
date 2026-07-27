import { NextRequest } from 'next/server';
import { getAuthenticatedUser } from '@/lib/request';
import { handleError, handleSuccess } from '@/lib/errors';
import { AnalyticsService } from '@/modules/faculty/analytics/analytics.service';

/**
 * GET /api/faculty/analytics/dashboard-summary
 * Returns overview statistics across all sessions owned by the authenticated faculty member.
 */
export async function GET(req: NextRequest) {
  try {
    const user = getAuthenticatedUser(req);
    const result = await AnalyticsService.getDashboardSummary(user.id);
    return handleSuccess(result, 200, 'Dashboard summary retrieved successfully.');
  } catch (error) {
    return handleError(error);
  }
}
