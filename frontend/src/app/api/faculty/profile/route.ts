import { NextRequest } from 'next/server';
import { getAuthenticatedUser } from '@/lib/request';
import { handleError, handleSuccess } from '@/lib/errors';
import { ProfileService } from '@/modules/faculty/profile/profile.service';
import { updateProfileSchema } from '@/modules/faculty/profile/profile.validation';

/**
 * GET /api/faculty/profile
 * Retrieves the authenticated faculty member's profile.
 */
export async function GET(req: NextRequest) {
  try {
    const user = getAuthenticatedUser(req);
    const result = await ProfileService.getProfile(user.id);
    return handleSuccess(result, 200, 'Profile retrieved successfully.');
  } catch (error) {
    return handleError(error);
  }
}

/**
 * PUT /api/faculty/profile
 * Updates editable profile fields for the authenticated faculty member.
 */
export async function PUT(req: NextRequest) {
  try {
    const user = getAuthenticatedUser(req);
    const body = await req.json();
    const data = updateProfileSchema.parse(body);

    const result = await ProfileService.updateProfile(user.id, data);
    return handleSuccess(result, 200, 'Profile updated successfully.');
  } catch (error) {
    return handleError(error);
  }
}

/**
 * PATCH /api/faculty/profile
 * Updates editable profile fields for the authenticated faculty member.
 */
export async function PATCH(req: NextRequest) {
  return PUT(req);
}
