import { NextRequest } from 'next/server';
import { Role } from '@prisma/client';

import { getAuthenticatedUser } from '@/lib/request';
import {
  ForbiddenError,
  handleError,
  handleSuccess,
} from '@/lib/errors';

import {
  createDepartmentSchema,
  CreateDepartmentInput,
} from '@/modules/admin/departments/department.validation';

import { DepartmentService } from '@/modules/admin/departments/department.service';

/**
 * POST /api/admin/departments
 * Create Department
 */
export async function POST(request: NextRequest) {
  try {
    const authenticatedUser = getAuthenticatedUser(request);

    if (authenticatedUser.role !== Role.ADMIN) {
      throw new ForbiddenError('Admin access required');
    }

    const body = await request.json();

    const validatedData: CreateDepartmentInput =
      createDepartmentSchema.parse(body);

    const department =
      await DepartmentService.createDepartment(validatedData);

    return handleSuccess(
      department,
      201,
      'Department created successfully'
    );
  } catch (error) {
    return handleError(error);
  }
}

/**
 * GET /api/admin/departments
 * List Departments
 */
export async function GET(request: NextRequest) {
  try {
    const authenticatedUser = getAuthenticatedUser(request);

    if (authenticatedUser.role !== Role.ADMIN) {
      throw new ForbiddenError('Admin access required');
    }

    const departments =
      await DepartmentService.getAllDepartments();

    return handleSuccess(
      departments,
      200,
      'Departments retrieved successfully'
    );
  } catch (error) {
    return handleError(error);
  }
}