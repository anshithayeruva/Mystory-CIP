import { NextRequest } from 'next/server';
import { getAuthenticatedUser } from '@/lib/request';
import { handleError, handleSuccess } from '@/lib/errors';
import { SubjectService } from '@/modules/faculty/subjects/subject.service';
import { updateTopicSchema } from '@/modules/faculty/subjects/subject.validation';

interface RouteContext {
  params: Promise<{ id: string; unitId: string; topicId: string }>;
}

/**
 * PUT /api/faculty/subjects/[id]/units/[unitId]/topics/[topicId]
 * Updates a Topic.
 */
export async function PUT(req: NextRequest, { params }: RouteContext) {
  try {
    const user = getAuthenticatedUser(req);
    const { id, unitId, topicId } = await params;
    const body = await req.json();
    const data = updateTopicSchema.parse(body);

    const result = await SubjectService.updateTopic(user.id, id, unitId, topicId, data);

    return handleSuccess(result, 200, 'Topic updated successfully.');
  } catch (error) {
    return handleError(error);
  }
}

/**
 * DELETE /api/faculty/subjects/[id]/units/[unitId]/topics/[topicId]
 * Deletes a Topic.
 */
export async function DELETE(req: NextRequest, { params }: RouteContext) {
  try {
    const user = getAuthenticatedUser(req);
    const { id, unitId, topicId } = await params;

    await SubjectService.deleteTopic(user.id, id, unitId, topicId);

    return handleSuccess(null, 200, 'Topic deleted successfully.');
  } catch (error) {
    return handleError(error);
  }
}
