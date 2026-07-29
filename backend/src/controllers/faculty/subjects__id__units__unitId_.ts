import { Request, Response } from "express";

import { handleError, handleSuccess } from '../../lib/errors';
import { SubjectService } from '../../modules/faculty/subjects/subject.service';
import { updateUnitSchema } from '../../modules/faculty/subjects/subject.validation';

interface RouteContext {
  params: Promise<{ id: string; unitId: string }>;
}

/**
 * PUT /api/faculty/subjects/[id]/units/[unitId]
 * Updates a Unit.
 */
export async function PUT(req: Request, { params }: RouteContext) {
  try {
    const user = req.user!;
    const { id, unitId } = await params;
    const body = req.body;
    const data = updateUnitSchema.parse(body);

    const result = await SubjectService.updateUnit(user.id, id, unitId, data);

    handleSuccess(res, result, 200, 'Unit updated successfully.');
  } catch (error) {
    handleError(error, res);
  }
}

/**
 * DELETE /api/faculty/subjects/[id]/units/[unitId]
 * Deletes a Unit.
 */
export async function DELETE(req: Request, { params }: RouteContext) {
  try {
    const user = req.user!;
    const { id, unitId } = await params;

    await SubjectService.deleteUnit(user.id, id, unitId);

    handleSuccess(res, null, 200, 'Unit deleted successfully.');
  } catch (error) {
    handleError(error, res);
  }
}
