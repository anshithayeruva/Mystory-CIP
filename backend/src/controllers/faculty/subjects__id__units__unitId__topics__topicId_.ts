import { Request, Response } from "express";

import { handleError, handleSuccess } from '../../lib/errors';
import { SubjectService } from '../../modules/faculty/subjects/subject.service';
import { updateTopicSchema } from '../../modules/faculty/subjects/subject.validation';

interface RouteContext {
  params: Promise<{ id: string; unitId: string; topicId: string }>;
}

/**
 * PUT /api/faculty/subjects/[id]/units/[unitId]/topics/[topicId]
 * Updates a Topic.
 */
export async function PUT(req: Request, { params }: RouteContext) {
  try {
    const user = req.user!;
    const { id, unitId, topicId } = await params;
    const body = req.body;
    const data = updateTopicSchema.parse(body);

    const result = await SubjectService.updateTopic(user.id, id, unitId, topicId, data);

    handleSuccess(res, result, 200, 'Topic updated successfully.');
  } catch (error) {
    handleError(error, res);
  }
}

/**
 * DELETE /api/faculty/subjects/[id]/units/[unitId]/topics/[topicId]
 * Deletes a Topic.
 */
export async function DELETE(req: Request, { params }: RouteContext) {
  try {
    const user = req.user!;
    const { id, unitId, topicId } = await params;

    await SubjectService.deleteTopic(user.id, id, unitId, topicId);

    handleSuccess(res, null, 200, 'Topic deleted successfully.');
  } catch (error) {
    handleError(error, res);
  }
}
