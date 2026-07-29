import { Request, Response } from "express";

import { handleError, handleSuccess } from '../../lib/errors';
import { PulseService } from '../../modules/faculty/pulse/pulse.service';
import { updatePulseSessionSchema } from '../../modules/faculty/pulse/pulse.validation';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/faculty/pulse-sessions/[id]
 * Retrieves details of a specific classroom pulse session.
 */
export async function GET(req: Request, { params }: RouteContext) {
  try {
    const user = req.user!;
    const { id } = await params;

    const result = await PulseService.getSessionById(user.id, id);

    handleSuccess(res, result, 200, 'Pulse session retrieved successfully.');
  } catch (error) {
    handleError(error, res);
  }
}

/**
 * PUT /api/faculty/pulse-sessions/[id]
 * Updates a classroom pulse session.
 */
export async function PUT(req: Request, { params }: RouteContext) {
  try {
    const user = req.user!;
    const { id } = await params;
    const body = req.body;
    const data = updatePulseSessionSchema.parse(body);

    const result = await PulseService.updateSession(user.id, id, data);

    handleSuccess(res, result, 200, 'Pulse session updated successfully.');
  } catch (error) {
    handleError(error, res);
  }
}

/**
 * DELETE /api/faculty/pulse-sessions/[id]
 * Deletes a classroom pulse session.
 */
export async function DELETE(req: Request, { params }: RouteContext) {
  try {
    const user = req.user!;
    const { id } = await params;

    await PulseService.deleteSession(user.id, id);

    handleSuccess(res, null, 200, 'Pulse session deleted successfully.');
  } catch (error) {
    handleError(error, res);
  }
}
