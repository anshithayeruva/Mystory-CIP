import { Request, Response } from "express";

import { handleError, handleSuccess } from '../../lib/errors';
import { ProfileService } from '../../modules/faculty/profile/profile.service';
import { updateProfileSchema } from '../../modules/faculty/profile/profile.validation';

/**
 * GET /api/faculty/profile
 * Retrieves the authenticated faculty member's profile.
 */
export async function GET(req: Request, res: Response) {
  try {
    const params = req.params as any;
    const user = req.user!;
    const result = await ProfileService.getProfile(user.id);
    handleSuccess(res, result, 200, 'Profile retrieved successfully.');
  } catch (error) {
    handleError(error, res);
  }
}

/**
 * PUT /api/faculty/profile
 * Updates editable profile fields for the authenticated faculty member.
 */
export async function PUT(req: Request, res: Response) {
  try {
    const params = req.params as any;
    const user = req.user!;
    const body = req.body;
    const data = updateProfileSchema.parse(body);

    const result = await ProfileService.updateProfile(user.id, data);
    handleSuccess(res, result, 200, 'Profile updated successfully.');
  } catch (error) {
    handleError(error, res);
  }
}

/**
 * PATCH /api/faculty/profile
 * Updates editable profile fields for the authenticated faculty member.
 */
export async function PATCH(req: Request, res: Response) {
  return PUT(req);
}
