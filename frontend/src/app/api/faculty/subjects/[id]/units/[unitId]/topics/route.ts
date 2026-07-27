import { NextRequest } from 'next/server';
import { getAuthenticatedUser } from '@/lib/request';
import { handleError, handleSuccess } from '@/lib/errors';
import { SubjectService } from '@/modules/faculty/subjects/subject.service';
import { topicSchema } from '@/modules/faculty/subjects/subject.validation';

interface RouteContext {
  params: Promise<{ id: string; unitId: string }>;
}

/**
 * POST /api/faculty/subjects/[id]/units/[unitId]/topics
 * Adds a new Topic to the specified Unit.
 */
export async function POST(req: NextRequest, { params }: RouteContext) {
  try {
    const user = getAuthenticatedUser(req);
    const { id, unitId } = await params;
    const body = await req.json();
    const data = topicSchema.parse(body);

    const result = await SubjectService.addTopic(user.id, id, unitId, data);

    return handleSuccess(result, 201, 'Topic added successfully.');
  } catch (error) {
    return handleError(error);
  }
}
