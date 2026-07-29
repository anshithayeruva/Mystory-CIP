import { Request, Response } from "express";

import { handleError, handleSuccess } from '../../lib/errors';
import { SubjectService } from '../../modules/faculty/subjects/subject.service';
import { syllabusSchema } from '../../modules/faculty/subjects/subject.validation';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/faculty/subjects/[id]/syllabus
 * Attaches or updates Syllabus PDF metadata for the specified subject.
 */
export async function POST(req: Request, { params }: RouteContext) {
  try {
    const user = req.user!;
    const { id } = await params;
    const body = req.body;
    const data = syllabusSchema.parse(body);

    const result = await SubjectService.uploadSyllabus(user.id, id, data);

    handleSuccess(res, result, 201, 'Syllabus uploaded successfully.');
  } catch (error) {
    handleError(error, res);
  }
}

/**
 * DELETE /api/faculty/subjects/[id]/syllabus
 * Deletes the Syllabus attached to the specified subject.
 */
export async function DELETE(req: Request, { params }: RouteContext) {
  try {
    const user = req.user!;
    const { id } = await params;

    await SubjectService.deleteSyllabus(user.id, id);

    handleSuccess(res, null, 200, 'Syllabus deleted successfully.');
  } catch (error) {
    handleError(error, res);
  }
}
