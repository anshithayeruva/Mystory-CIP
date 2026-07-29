import { Request, Response } from "express";

import { handleError, handleSuccess } from '../../lib/errors';
import { ProfileService } from '../../modules/faculty/profile/profile.service';
import { changePasswordSchema } from '../../modules/faculty/profile/profile.validation';

/**
 * PUT /api/faculty/profile/password
 * Securely changes the authenticated faculty member's password.
 */
export async function PUT(req: Request, res: Response) {
  try {
    const params = req.params as any;
    const user = req.user!;
    const body = req.body;
    const data = changePasswordSchema.parse(body);

    const result = await ProfileService.changePassword(user.id, data);
    handleSuccess(res, result, 200, result.message);
  } catch (error) {
    handleError(error, res);
  }
}

/**
 * POST /api/faculty/profile/password
 * Securely changes the authenticated faculty member's password.
 */
export async function POST(req: Request, res: Response) {
  return PUT(req);
}
