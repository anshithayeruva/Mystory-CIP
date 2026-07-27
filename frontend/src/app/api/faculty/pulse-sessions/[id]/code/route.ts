import { NextRequest } from 'next/server';
import { getAuthenticatedUser } from '@/lib/request';
import { handleError, handleSuccess } from '@/lib/errors';
import { ExecutionService } from '@/modules/faculty/pulse-execution/execution.service';
import { GenerateCodeSchema } from '@/modules/faculty/pulse-execution/execution.validation';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/faculty/pulse-sessions/[id]/code
 * Retrieves the session code for a pulse session.
 */
export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    const user = getAuthenticatedUser(req);
    const { id } = await params;

    const result = await ExecutionService.getCode(user.id, id);
    return handleSuccess(result, 200, 'Session code retrieved successfully.');
  } catch (error) {
    return handleError(error);
  }
}

/**
 * POST /api/faculty/pulse-sessions/[id]/code
 * Generates a new session code for a pulse session.
 */
export async function POST(req: NextRequest, { params }: RouteContext) {
  try {
    const user = getAuthenticatedUser(req);
    const { id } = await params;
    let body = {};
    try {
      body = await req.json();
    } catch {
      // Empty body is acceptable; defaults will be used
    }
    const data = GenerateCodeSchema.parse(body);

    const result = await ExecutionService.generateCode(user.id, id, data);
    return handleSuccess(result, 201, 'Session code generated successfully.');
  } catch (error) {
    return handleError(error);
  }
}

/**
 * PUT /api/faculty/pulse-sessions/[id]/code
 * Regenerates the session code for a pulse session.
 */
export async function PUT(req: NextRequest, { params }: RouteContext) {
  try {
    const user = getAuthenticatedUser(req);
    const { id } = await params;
    let body = {};
    try {
      body = await req.json();
    } catch {
      // Empty body is acceptable
    }
    const data = GenerateCodeSchema.parse(body);

    const result = await ExecutionService.regenerateCode(user.id, id, data);
    return handleSuccess(result, 200, 'Session code regenerated successfully.');
  } catch (error) {
    return handleError(error);
  }
}
