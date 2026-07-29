import { NextRequest } from 'next/server';
import { getAuthenticatedUser } from '@/lib/request';
import { handleError, handleSuccess } from '@/lib/errors';
import { AnalyticsService } from '@/modules/faculty/analytics/analytics.service';
import { conceptGapQuerySchema } from '@/modules/faculty/analytics/analytics.validation';

export async function GET(req: NextRequest) {
  try {
    const user = getAuthenticatedUser(req);
    const searchParams = Object.fromEntries(req.nextUrl.searchParams);
    const query = conceptGapQuerySchema.parse(searchParams);
    
    const result = await AnalyticsService.getConceptGapTrend(user.id, query);

    return handleSuccess(result, 200, 'Concept gap trend retrieved successfully.');
  } catch (error) {
    return handleError(error);
  }
}
