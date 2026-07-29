import { Request, Response } from "express";

import { handleError, handleSuccess } from '../../lib/errors';
import { SubjectService } from '../../modules/faculty/subjects/subject.service';
import { unitSchema } from '../../modules/faculty/subjects/subject.validation';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/faculty/subjects/[id]/units
 * Adds a new Unit / Module to the specified subject.
 */
export async function POST(req: Request, { params }: RouteContext) {
  try {
    const user = req.user!;
    const { id } = await params;
    const body = req.body;
    const data = unitSchema.parse(body);

    const result = await SubjectService.addUnit(user.id, id, data);

    handleSuccess(res, result, 201, 'Unit added successfully.');
  } catch (error) {
    handleError(error, res);
  }
}
