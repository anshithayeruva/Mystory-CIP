import { NextRequest } from 'next/server';
import { Role } from '@prisma/client';

import { getAuthenticatedUser } from '@/lib/request';
import {
  ForbiddenError,
  handleError,
  handleSuccess,
} from '@/lib/errors';

import { CourseService } from '@/modules/admin/courses/course.service';

import {
  updateCourseSchema,
  UpdateCourseInput,
} from '@/modules/admin/courses/course.validation';

/**
 * GET /api/admin/courses/:id
 *
 * Retrieves a single course.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authenticatedUser = getAuthenticatedUser(request);

    if (authenticatedUser.role !== Role.ADMIN) {
      throw new ForbiddenError('Admin access required');
    }

    const { id } = await params;

    const course =
      await CourseService.getCourseById(id);

    return handleSuccess(
      course,
      200,
      'Course retrieved successfully'
    );
  } catch (error) {
    return handleError(error);
  }
}

/**
 * PATCH /api/admin/courses/:id
 *
 * Updates an existing course.
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authenticatedUser = getAuthenticatedUser(request);

    if (authenticatedUser.role !== Role.ADMIN) {
      throw new ForbiddenError('Admin access required');
    }

    const { id } = await params;

    const body = await request.json();

    const validatedData: UpdateCourseInput =
      updateCourseSchema.parse(body);

    const updatedCourse =
      await CourseService.updateCourse(
        id,
        validatedData
      );

    return handleSuccess(
      updatedCourse,
      200,
      'Course updated successfully'
    );
  } catch (error) {
    return handleError(error);
  }
}

/**
 * DELETE /api/admin/courses/:id
 *
 * Deletes a course.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authenticatedUser = getAuthenticatedUser(request);

    if (authenticatedUser.role !== Role.ADMIN) {
      throw new ForbiddenError('Admin access required');
    }

    const { id } = await params;

    await CourseService.deleteCourse(id);

    return handleSuccess(
      null,
      200,
      'Course deleted successfully'
    );
  } catch (error) {
    return handleError(error);
  }
}