import { NextRequest } from 'next/server';
import { getAuthenticatedUser } from '@/lib/request';
import { handleError, handleSuccess } from '@/lib/errors';
import { ExecutionService } from '@/modules/faculty/pulse-execution/execution.service';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/faculty/pulse-sessions/[id]/status
 * Retrieves current lifecycle status of a pulse session.
 */
export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    const user = getAuthenticatedUser(req);
    const { id } = await params;

    const result = await ExecutionService.getStatus(user.id, id);
    return handleSuccess(result, 200, 'Session status retrieved successfully.');
  } catch (error) {
    return handleError(error);
  }
}
