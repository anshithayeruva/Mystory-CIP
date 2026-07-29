import { NextRequest } from 'next/server';
import { getAuthenticatedUser } from '@/lib/request';
import { handleError, handleSuccess } from '@/lib/errors';
import { PulseService } from '@/modules/faculty/pulse/pulse.service';

/**
 * GET /api/faculty/pulse-sessions/summary
 * Retrieves summary statistics for pulse sessions.
 */
export async function GET(req: NextRequest) {
  try {
    const user = getAuthenticatedUser(req);
    const result = await PulseService.getSessionSummary(user.id);
    return handleSuccess(result, 200, 'Summary retrieved successfully.');
  } catch (error) {
    return handleError(error);
  }
}
