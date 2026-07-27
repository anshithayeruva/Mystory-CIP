import { NextRequest } from 'next/server';
import { getAuthenticatedUser } from '@/lib/request';
import { handleError, handleSuccess } from '@/lib/errors';
import { AnalyticsService } from '@/modules/faculty/analytics/analytics.service';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/faculty/analytics/sessions/[id]
 * Retrieves detailed summary metrics for a single completed classroom pulse session.
 */
export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    const user = getAuthenticatedUser(req);
    const { id } = await params;

    const result = await AnalyticsService.getSessionSummary(user.id, id);

    return handleSuccess(result, 200, 'Session summary retrieved successfully.');
  } catch (error) {
    return handleError(error);
  }
}
