import { NextRequest } from 'next/server';
import { getAuthenticatedUser } from '@/lib/request';
import { handleError, handleSuccess } from '@/lib/errors';
import { ProfileService } from '@/modules/faculty/profile/profile.service';

/**
 * GET /api/faculty/profile/dashboard
 * Retrieves lightweight dashboard summary information for the profile page.
 */
export async function GET(req: NextRequest) {
  try {
    const user = getAuthenticatedUser(req);
    const result = await ProfileService.getDashboardSummary(user.id);
    return handleSuccess(result, 200, 'Profile dashboard summary retrieved successfully.');
  } catch (error) {
    return handleError(error);
  }
}
