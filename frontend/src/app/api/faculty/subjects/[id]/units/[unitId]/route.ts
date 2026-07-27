import { NextRequest } from 'next/server';
import { getAuthenticatedUser } from '@/lib/request';
import { handleError, handleSuccess } from '@/lib/errors';
import { SubjectService } from '@/modules/faculty/subjects/subject.service';
import { updateUnitSchema } from '@/modules/faculty/subjects/subject.validation';

interface RouteContext {
  params: Promise<{ id: string; unitId: string }>;
}

/**
 * PUT /api/faculty/subjects/[id]/units/[unitId]
 * Updates a Unit.
 */
export async function PUT(req: NextRequest, { params }: RouteContext) {
  try {
    const user = getAuthenticatedUser(req);
    const { id, unitId } = await params;
    const body = await req.json();
    const data = updateUnitSchema.parse(body);

    const result = await SubjectService.updateUnit(user.id, id, unitId, data);

    return handleSuccess(result, 200, 'Unit updated successfully.');
  } catch (error) {
    return handleError(error);
  }
}

/**
 * DELETE /api/faculty/subjects/[id]/units/[unitId]
 * Deletes a Unit.
 */
export async function DELETE(req: NextRequest, { params }: RouteContext) {
  try {
    const user = getAuthenticatedUser(req);
    const { id, unitId } = await params;

    await SubjectService.deleteUnit(user.id, id, unitId);

    return handleSuccess(null, 200, 'Unit deleted successfully.');
  } catch (error) {
    return handleError(error);
  }
}
