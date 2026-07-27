import { NextRequest } from 'next/server';
import { getAuthenticatedUser } from '@/lib/request';
import { handleError, handleSuccess } from '@/lib/errors';
import { SubjectService } from '@/modules/faculty/subjects/subject.service';
import { updateSubjectSchema } from '@/modules/faculty/subjects/subject.validation';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/faculty/subjects/[id]
 * Retrieves full details of a specific assigned subject.
 */
export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    const user = getAuthenticatedUser(req);
    const { id } = await params;

    const result = await SubjectService.getSubjectById(user.id, id);

    return handleSuccess(result, 200, 'Subject details retrieved successfully.');
  } catch (error) {
    return handleError(error);
  }
}

/**
 * PUT /api/faculty/subjects/[id]
 * Updates an assigned subject.
 */
export async function PUT(req: NextRequest, { params }: RouteContext) {
  try {
    const user = getAuthenticatedUser(req);
    const { id } = await params;
    const body = await req.json();
    const data = updateSubjectSchema.parse(body);

    const result = await SubjectService.updateSubject(user.id, id, data);

    return handleSuccess(result, 200, 'Subject updated successfully.');
  } catch (error) {
    return handleError(error);
  }
}

/**
 * DELETE /api/faculty/subjects/[id]
 * Deletes an assigned subject.
 */
export async function DELETE(req: NextRequest, { params }: RouteContext) {
  try {
    const user = getAuthenticatedUser(req);
    const { id } = await params;

    await SubjectService.deleteSubject(user.id, id);

    return handleSuccess(null, 200, 'Subject deleted successfully.');
  } catch (error) {
    return handleError(error);
  }
}
