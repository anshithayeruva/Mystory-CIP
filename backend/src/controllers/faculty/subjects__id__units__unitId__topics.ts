import { Request, Response } from "express";

import { handleError, handleSuccess } from '../../lib/errors';
import { SubjectService } from '../../modules/faculty/subjects/subject.service';
import { topicSchema } from '../../modules/faculty/subjects/subject.validation';

interface RouteContext {
  params: Promise<{ id: string; unitId: string }>;
}

/**
 * POST /api/faculty/subjects/[id]/units/[unitId]/topics
 * Adds a new Topic to the specified Unit.
 */
export async function POST(req: Request, { params }: RouteContext) {
  try {
    const user = req.user!;
    const { id, unitId } = await params;
    const body = req.body;
    const data = topicSchema.parse(body);

    const result = await SubjectService.addTopic(user.id, id, unitId, data);

    handleSuccess(res, result, 201, 'Topic added successfully.');
  } catch (error) {
    handleError(error, res);
  }
}
