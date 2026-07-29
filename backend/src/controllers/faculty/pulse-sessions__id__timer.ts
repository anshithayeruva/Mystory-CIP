import { Request, Response } from "express";

import { handleError, handleSuccess } from '../../lib/errors';
import { ExecutionService } from '../../modules/faculty/pulse-execution/execution.service';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/faculty/pulse-sessions/[id]/timer
 * Retrieves current timer status and remaining time for a pulse session.
 */
export async function GET(req: Request, { params }: RouteContext) {
  try {
    const user = req.user!;
    const { id } = await params;

    const result = await ExecutionService.getTimerStatus(user.id, id);
    handleSuccess(res, result, 200, 'Timer status retrieved successfully.');
  } catch (error) {
    handleError(error, res);
  }
}
