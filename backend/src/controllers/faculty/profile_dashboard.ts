import { Request, Response } from "express";

import { handleError, handleSuccess } from '../../lib/errors';
import { ProfileService } from '../../modules/faculty/profile/profile.service';

/**
 * GET /api/faculty/profile/dashboard
 * Retrieves lightweight dashboard summary information for the profile page.
 */
export async function GET(req: Request, res: Response) {
  try {
    const params = req.params as any;
    const user = req.user!;
    const result = await ProfileService.getDashboardSummary(user.id);
    handleSuccess(res, result, 200, 'Profile dashboard summary retrieved successfully.');
  } catch (error) {
    handleError(error, res);
  }
}
