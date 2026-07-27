import { NextRequest } from 'next/server';
import { getAuthenticatedUser } from '@/lib/request';
import { handleError, handleSuccess } from '@/lib/errors';
import { SubjectService } from '@/modules/faculty/subjects/subject.service';
import { updateCourseOutcomeSchema } from '@/modules/faculty/subjects/subject.validation';

interface RouteContext {
  params: Promise<{ id: string; coId: string }>;
}

/**
 * PUT /api/faculty/subjects/[id]/outcomes/[coId]
 * Updates a Course Outcome.
 */
export async function PUT(req: NextRequest, { params }: RouteContext) {
  try {
    const user = getAuthenticatedUser(req);
    const { id, coId } = await params;
    const body = await req.json();
    const data = updateCourseOutcomeSchema.parse(body);

    const result = await SubjectService.updateOutcome(user.id, id, coId, data);

    return handleSuccess(result, 200, 'Course outcome updated successfully.');
  } catch (error) {
    return handleError(error);
  }
}

/**
 * DELETE /api/faculty/subjects/[id]/outcomes/[coId]
 * Deletes a Course Outcome.
 */
export async function DELETE(req: NextRequest, { params }: RouteContext) {
  try {
    const user = getAuthenticatedUser(req);
    const { id, coId } = await params;

    await SubjectService.deleteOutcome(user.id, id, coId);

    return handleSuccess(null, 200, 'Course outcome deleted successfully.');
  } catch (error) {
    return handleError(error);
  }
}
