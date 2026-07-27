import { NextRequest } from 'next/server';
import { getAuthenticatedUser } from '@/lib/request';
import { handleError, handleSuccess } from '@/lib/errors';
import { PulseService } from '@/modules/faculty/pulse/pulse.service';
import { updatePulseSessionSchema } from '@/modules/faculty/pulse/pulse.validation';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/faculty/pulse-sessions/[id]
 * Retrieves details of a specific classroom pulse session.
 */
export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    const user = getAuthenticatedUser(req);
    const { id } = await params;

    const result = await PulseService.getSessionById(user.id, id);

    return handleSuccess(result, 200, 'Pulse session retrieved successfully.');
  } catch (error) {
    return handleError(error);
  }
}

/**
 * PUT /api/faculty/pulse-sessions/[id]
 * Updates a classroom pulse session.
 */
export async function PUT(req: NextRequest, { params }: RouteContext) {
  try {
    const user = getAuthenticatedUser(req);
    const { id } = await params;
    const body = await req.json();
    const data = updatePulseSessionSchema.parse(body);

    const result = await PulseService.updateSession(user.id, id, data);

    return handleSuccess(result, 200, 'Pulse session updated successfully.');
  } catch (error) {
    return handleError(error);
  }
}

/**
 * DELETE /api/faculty/pulse-sessions/[id]
 * Deletes a classroom pulse session.
 */
export async function DELETE(req: NextRequest, { params }: RouteContext) {
  try {
    const user = getAuthenticatedUser(req);
    const { id } = await params;

    await PulseService.deleteSession(user.id, id);

    return handleSuccess(null, 200, 'Pulse session deleted successfully.');
  } catch (error) {
    return handleError(error);
  }
}
