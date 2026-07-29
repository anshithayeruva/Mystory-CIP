import { Request, Response } from "express";

import { handleError, handleSuccess } from '../../lib/errors';
import { SubjectService } from '../../modules/faculty/subjects/subject.service';
import { updateSubjectSchema } from '../../modules/faculty/subjects/subject.validation';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/faculty/subjects/[id]
 * Retrieves full details of a specific assigned subject.
 */
export async function GET(req: Request, { params }: RouteContext) {
  try {
    const user = req.user!;
    const { id } = await params;

    const result = await SubjectService.getSubjectById(user.id, id);

    handleSuccess(res, result, 200, 'Subject details retrieved successfully.');
  } catch (error) {
    handleError(error, res);
  }
}

/**
 * PUT /api/faculty/subjects/[id]
 * Updates an assigned subject.
 */
export async function PUT(req: Request, { params }: RouteContext) {
  try {
    const user = req.user!;
    const { id } = await params;
    const body = req.body;
    const data = updateSubjectSchema.parse(body);

    const result = await SubjectService.updateSubject(user.id, id, data);

    handleSuccess(res, result, 200, 'Subject updated successfully.');
  } catch (error) {
    handleError(error, res);
  }
}

/**
 * DELETE /api/faculty/subjects/[id]
 * Deletes an assigned subject.
 */
export async function DELETE(req: Request, { params }: RouteContext) {
  try {
    const user = req.user!;
    const { id } = await params;

    await SubjectService.deleteSubject(user.id, id);

    handleSuccess(res, null, 200, 'Subject deleted successfully.');
  } catch (error) {
    handleError(error, res);
  }
}
