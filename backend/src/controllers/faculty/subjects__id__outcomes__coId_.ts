import { Request, Response } from "express";

import { handleError, handleSuccess } from '../../lib/errors';
import { SubjectService } from '../../modules/faculty/subjects/subject.service';
import { updateCourseOutcomeSchema } from '../../modules/faculty/subjects/subject.validation';

interface RouteContext {
  params: Promise<{ id: string; coId: string }>;
}

/**
 * PUT /api/faculty/subjects/[id]/outcomes/[coId]
 * Updates a Course Outcome.
 */
export async function PUT(req: Request, { params }: RouteContext) {
  try {
    const user = req.user!;
    const { id, coId } = await params;
    const body = req.body;
    const data = updateCourseOutcomeSchema.parse(body);

    const result = await SubjectService.updateOutcome(user.id, id, coId, data);

    handleSuccess(res, result, 200, 'Course outcome updated successfully.');
  } catch (error) {
    handleError(error, res);
  }
}

/**
 * DELETE /api/faculty/subjects/[id]/outcomes/[coId]
 * Deletes a Course Outcome.
 */
export async function DELETE(req: Request, { params }: RouteContext) {
  try {
    const user = req.user!;
    const { id, coId } = await params;

    await SubjectService.deleteOutcome(user.id, id, coId);

    handleSuccess(res, null, 200, 'Course outcome deleted successfully.');
  } catch (error) {
    handleError(error, res);
  }
}
