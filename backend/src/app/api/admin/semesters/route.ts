import { NextRequest } from 'next/server';
import { Role } from '@prisma/client';

import { getAuthenticatedUser } from '@/lib/request';
import {
  ForbiddenError,
  handleError,
  handleSuccess,
} from '@/lib/errors';

import {
  createSemesterSchema,
  CreateSemesterInput,
} from '@/modules/admin/semesters/semester.validation';

import { SemesterService } from '@/modules/admin/semesters/semester.service';

/**
 * POST /api/admin/semesters
 *
 * Creates a new semester.
 */
export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const authenticatedUser = getAuthenticatedUser(request);

    // Allow only administrators
    if (authenticatedUser.role !== Role.ADMIN) {
      throw new ForbiddenError('Admin access required');
    }

    // Parse request body
    const body = await request.json();

    // Validate request body
    const validatedData: CreateSemesterInput =
      createSemesterSchema.parse(body);

    // Create semester
    const semester =
      await SemesterService.createSemester(
        validatedData
      );

    // Return response
    return handleSuccess(
      semester,
      201,
      'Semester created successfully'
    );
  } catch (error) {
    return handleError(error);
  }
}

/**
 * GET /api/admin/semesters
 *
 * Retrieves all semesters.
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authenticatedUser = getAuthenticatedUser(request);

    // Allow only administrators
    if (authenticatedUser.role !== Role.ADMIN) {
      throw new ForbiddenError('Admin access required');
    }

    // Fetch semesters
    const semesters =
      await SemesterService.getAllSemesters();

    // Return response
    return handleSuccess(
      semesters,
      200,
      'Semesters retrieved successfully'
    );
  } catch (error) {
    return handleError(error);
  }
}