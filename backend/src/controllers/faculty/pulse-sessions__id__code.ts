import { Request, Response } from "express";

import { handleError, handleSuccess } from '../../lib/errors';
import { ExecutionService } from '../../modules/faculty/pulse-execution/execution.service';
import { GenerateCodeSchema } from '../../modules/faculty/pulse-execution/execution.validation';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/faculty/pulse-sessions/[id]/code
 * Retrieves the session code for a pulse session.
 */
export async function GET(req: Request, { params }: RouteContext) {
  try {
    const user = req.user!;
    const { id } = await params;

    const result = await ExecutionService.getCode(user.id, id);
    handleSuccess(res, result, 200, 'Session code retrieved successfully.');
  } catch (error) {
    handleError(error, res);
  }
}

/**
 * POST /api/faculty/pulse-sessions/[id]/code
 * Generates a new session code for a pulse session.
 */
export async function POST(req: Request, { params }: RouteContext) {
  try {
    const user = req.user!;
    const { id } = await params;
    let body = {};
    try {
      body = req.body;
    } catch {
      // Empty body is acceptable; defaults will be used
    }
    const data = GenerateCodeSchema.parse(body);

    const result = await ExecutionService.generateCode(user.id, id, data);
    handleSuccess(res, result, 201, 'Session code generated successfully.');
  } catch (error) {
    handleError(error, res);
  }
}

/**
 * PUT /api/faculty/pulse-sessions/[id]/code
 * Regenerates the session code for a pulse session.
 */
export async function PUT(req: Request, { params }: RouteContext) {
  try {
    const user = req.user!;
    const { id } = await params;
    let body = {};
    try {
      body = req.body;
    } catch {
      // Empty body is acceptable
    }
    const data = GenerateCodeSchema.parse(body);

    const result = await ExecutionService.regenerateCode(user.id, id, data);
    handleSuccess(res, result, 200, 'Session code regenerated successfully.');
  } catch (error) {
    handleError(error, res);
  }
}
