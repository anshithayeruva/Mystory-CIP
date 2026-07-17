import { NextRequest } from 'next/server';
import { Role } from '@prisma/client';

import { getAuthenticatedUser } from '@/lib/request';
import {
  ForbiddenError,
  handleError,
  handleSuccess,
} from '@/lib/errors';

import { SemesterService } from '@/modules/admin/semesters/semester.service';

import {
  updateSemesterSchema,
  UpdateSemesterInput,
} from '@/modules/admin/semesters/semester.validation';

/**
 * GET /api/admin/semesters/:id
 *
 * Retrieves a single semester.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate user
    const authenticatedUser = getAuthenticatedUser(request);

    // Allow only administrators
    if (authenticatedUser.role !== Role.ADMIN) {
      throw new ForbiddenError('Admin access required');
    }

    // Get semester ID
    const { id } = await params;

    // Fetch semester
    const semester =
      await SemesterService.getSemesterById(id);

    // Return response
    return handleSuccess(
      semester,
      200,
      'Semester retrieved successfully'
    );
  } catch (error) {
    return handleError(error);
  }
}

/**
 * PATCH /api/admin/semesters/:id
 *
 * Updates an existing semester.
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate user
    const authenticatedUser = getAuthenticatedUser(request);

    // Allow only administrators
    if (authenticatedUser.role !== Role.ADMIN) {
      throw new ForbiddenError('Admin access required');
    }

    // Get semester ID
    const { id } = await params;

    // Parse request body
    const body = await request.json();

    // Validate request body
    const validatedData: UpdateSemesterInput =
      updateSemesterSchema.parse(body);

    // Update semester
    const updatedSemester =
      await SemesterService.updateSemester(
        id,
        validatedData
      );

    // Return response
    return handleSuccess(
      updatedSemester,
      200,
      'Semester updated successfully'
    );
  } catch (error) {
    return handleError(error);
  }
}

/**
 * DELETE /api/admin/semesters/:id
 *
 * Deletes an existing semester.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate user
    const authenticatedUser = getAuthenticatedUser(request);

    // Allow only administrators
    if (authenticatedUser.role !== Role.ADMIN) {
      throw new ForbiddenError('Admin access required');
    }

    // Get semester ID
    const { id } = await params;

    // Delete semester
    await SemesterService.deleteSemester(id);

    // Return response
    return handleSuccess(
      null,
      200,
      'Semester deleted successfully'
    );
  } catch (error) {
    return handleError(error);
  }
}