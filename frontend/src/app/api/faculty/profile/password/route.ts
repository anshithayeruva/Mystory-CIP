import { NextRequest } from 'next/server';
import { getAuthenticatedUser } from '@/lib/request';
import { handleError, handleSuccess } from '@/lib/errors';
import { ProfileService } from '@/modules/faculty/profile/profile.service';
import { changePasswordSchema } from '@/modules/faculty/profile/profile.validation';

/**
 * PUT /api/faculty/profile/password
 * Securely changes the authenticated faculty member's password.
 */
export async function PUT(req: NextRequest) {
  try {
    const user = getAuthenticatedUser(req);
    const body = await req.json();
    const data = changePasswordSchema.parse(body);

    const result = await ProfileService.changePassword(user.id, data);
    return handleSuccess(result, 200, result.message);
  } catch (error) {
    return handleError(error);
  }
}

/**
 * POST /api/faculty/profile/password
 * Securely changes the authenticated faculty member's password.
 */
export async function POST(req: NextRequest) {
  return PUT(req);
}
