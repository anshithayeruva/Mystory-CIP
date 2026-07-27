import { NextRequest } from 'next/server';
import { getAuthenticatedUser } from '@/lib/request';
import { handleError, handleSuccess } from '@/lib/errors';
import { AnalyticsService } from '@/modules/faculty/analytics/analytics.service';

/**
 * GET /api/faculty/analytics/concept-gaps
 * Retrieves concept gap analysis (strongly/weakly understood topics and high/low accuracy questions).
 */
export async function GET(req: NextRequest) {
  try {
    const user = getAuthenticatedUser(req);
    const result = await AnalyticsService.getConceptGapAnalysis(user.id);

    return handleSuccess(result, 200, 'Concept gap analysis retrieved successfully.');
  } catch (error) {
    return handleError(error);
  }
}
