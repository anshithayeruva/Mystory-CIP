import { Request, Response } from "express";

import { handleError, handleSuccess } from '../../lib/errors';
import { PulseService } from '../../modules/faculty/pulse/pulse.service';

/**
 * GET /api/faculty/pulse-sessions/summary
 * Retrieves summary statistics for pulse sessions.
 */
export async function GET(req: Request, res: Response) {
  try {
    const params = req.params as any;
    const user = req.user!;
    const result = await PulseService.getSessionSummary(user.id);
    handleSuccess(res, result, 200, 'Summary retrieved successfully.');
  } catch (error) {
    handleError(error, res);
  }
}
