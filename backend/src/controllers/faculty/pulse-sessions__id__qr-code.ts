import { Request, Response } from "express";

import { handleError, handleSuccess } from '../../lib/errors';
import { ExecutionService } from '../../modules/faculty/pulse-execution/execution.service';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/faculty/pulse-sessions/[id]/qr-code
 * Retrieves the generated QR code for a pulse session.
 */
export async function GET(req: Request, { params }: RouteContext) {
  try {
    const user = req.user!;
    const { id } = await params;

    const result = await ExecutionService.getQrCode(user.id, id);
    handleSuccess(res, result, 200, 'QR code retrieved successfully.');
  } catch (error) {
    handleError(error, res);
  }
}

/**
 * POST /api/faculty/pulse-sessions/[id]/qr-code
 * Generates or regenerates a QR code for a pulse session.
 */
export async function POST(req: Request, { params }: RouteContext) {
  try {
    const user = req.user!;
    const { id } = await params;

    const result = await ExecutionService.generateQrCode(user.id, id);
    handleSuccess(res, result, 200, 'QR code generated successfully.');
  } catch (error) {
    handleError(error, res);
  }
}
