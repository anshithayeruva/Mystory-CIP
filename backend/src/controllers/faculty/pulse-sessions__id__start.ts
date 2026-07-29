import { Request, Response } from "express";

import { handleError, handleSuccess } from '../../lib/errors';
import { PulseService } from '../../modules/faculty/pulse/pulse.service';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(req: Request, { params }: RouteContext) {
  try {
    const user = req.user!;
    const { id } = await params;
    const result = await PulseService.startSession(user.id, id);
    handleSuccess(res, result, 200, 'Session started successfully.');
  } catch (error) {
    handleError(error, res);
  }
}
