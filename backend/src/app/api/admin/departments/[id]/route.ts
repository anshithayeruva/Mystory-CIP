import { NextRequest } from 'next/server';
import { Role } from '@prisma/client';

import { getAuthenticatedUser } from '@/lib/request';
import {
  ForbiddenError,
  handleError,
  handleSuccess,
} from '@/lib/errors';

import { DepartmentService } from '@/modules/admin/departments/department.service';

import {
  updateDepartmentSchema,
  UpdateDepartmentInput,
} from '@/modules/admin/departments/department.validation';

/**
 * GET /api/admin/departments/:id
 *
 * Retrieves a single department.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authenticatedUser = getAuthenticatedUser(request);

    if (authenticatedUser.role !== Role.ADMIN) {
      throw new ForbiddenError('Admin access required');
    }

    const { id } = params;

    const department =
      await DepartmentService.getDepartmentById(id);

    return handleSuccess(
      department,
      200,
      'Department retrieved successfully'
    );
  } catch (error) {
    return handleError(error);
  }
}

/**
 * PATCH /api/admin/departments/:id
 *
 * Updates an existing department.
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authenticatedUser = getAuthenticatedUser(request);

    if (authenticatedUser.role !== Role.ADMIN) {
      throw new ForbiddenError('Admin access required');
    }

    const { id } = params;

    const body = await request.json();

    const validatedData: UpdateDepartmentInput =
      updateDepartmentSchema.parse(body);

    const updatedDepartment =
      await DepartmentService.updateDepartment(
        id,
        validatedData
      );

    return handleSuccess(
      updatedDepartment,
      200,
      'Department updated successfully'
    );
  } catch (error) {
    return handleError(error);
  }
}

/**
 * DELETE /api/admin/departments/:id
 *
 * Deletes a department.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Authenticate user
    const authenticatedUser = getAuthenticatedUser(request);

    // 2. Only ADMIN users can delete departments
    if (authenticatedUser.role !== Role.ADMIN) {
      throw new ForbiddenError('Admin access required');
    }

    // 3. Get department ID
    const { id } = params;

    // 4. Delete department
    await DepartmentService.deleteDepartment(id);

    // 5. Return success response
    return handleSuccess(
      null,
      200,
      'Department deleted successfully'
    );
  } catch (error) {
    return handleError(error);
  }
}