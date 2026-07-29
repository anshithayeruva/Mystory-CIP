import { Request, Response } from "express";

import { handleError, handleSuccess } from '../../lib/errors';
import { SubjectService } from '../../modules/faculty/subjects/subject.service';
import { courseOutcomeSchema } from '../../modules/faculty/subjects/subject.validation';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/faculty/subjects/[id]/outcomes
 * Adds a new Course Outcome to the specified subject.
 */
export async function POST(req: Request, { params }: RouteContext) {
  try {
    const user = req.user!;
    const { id } = await params;
    const body = req.body;
    const data = courseOutcomeSchema.parse(body);

    const result = await SubjectService.addOutcome(user.id, id, data);

    handleSuccess(res, result, 201, 'Course outcome added successfully.');
  } catch (error) {
    handleError(error, res);
  }
}
