import { NextRequest } from 'next/server';
import { getAuthenticatedUser } from '@/lib/request';
import { handleError, handleSuccess } from '@/lib/errors';
import { SubjectService } from '@/modules/faculty/subjects/subject.service';
import { syllabusSchema } from '@/modules/faculty/subjects/subject.validation';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/faculty/subjects/[id]/syllabus
 * Attaches or updates Syllabus PDF metadata for the specified subject.
 */
export async function POST(req: NextRequest, { params }: RouteContext) {
  try {
    const user = getAuthenticatedUser(req);
    const { id } = await params;
    const body = await req.json();
    const data = syllabusSchema.parse(body);

    const result = await SubjectService.uploadSyllabus(user.id, id, data);

    return handleSuccess(result, 201, 'Syllabus uploaded successfully.');
  } catch (error) {
    return handleError(error);
  }
}

/**
 * DELETE /api/faculty/subjects/[id]/syllabus
 * Deletes the Syllabus attached to the specified subject.
 */
export async function DELETE(req: NextRequest, { params }: RouteContext) {
  try {
    const user = getAuthenticatedUser(req);
    const { id } = await params;

    await SubjectService.deleteSyllabus(user.id, id);

    return handleSuccess(null, 200, 'Syllabus deleted successfully.');
  } catch (error) {
    return handleError(error);
  }
}
