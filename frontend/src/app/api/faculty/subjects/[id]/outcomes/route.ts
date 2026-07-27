import { NextRequest } from 'next/server';
import { getAuthenticatedUser } from '@/lib/request';
import { handleError, handleSuccess } from '@/lib/errors';
import { SubjectService } from '@/modules/faculty/subjects/subject.service';
import { courseOutcomeSchema } from '@/modules/faculty/subjects/subject.validation';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/faculty/subjects/[id]/outcomes
 * Adds a new Course Outcome to the specified subject.
 */
export async function POST(req: NextRequest, { params }: RouteContext) {
  try {
    const user = getAuthenticatedUser(req);
    const { id } = await params;
    const body = await req.json();
    const data = courseOutcomeSchema.parse(body);

    const result = await SubjectService.addOutcome(user.id, id, data);

    return handleSuccess(result, 201, 'Course outcome added successfully.');
  } catch (error) {
    return handleError(error);
  }
}
