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
  createCourseSchema,
  CreateCourseInput,
} from '@/modules/admin/courses/course.validation';

/**
 * POST /api/admin/courses
 *
 * Creates a new course.
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
    const validatedData: CreateCourseInput =
      createCourseSchema.parse(body);

    // Create course
    const course =
      await CourseService.createCourse(validatedData);

    // Return response
    return handleSuccess(
      course,
      201,
      'Course created successfully'
    );
  } catch (error) {
    return handleError(error);
  }
}

/**
 * GET /api/admin/courses
 *
 * Retrieves all courses.
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authenticatedUser = getAuthenticatedUser(request);

    // Allow only administrators
    if (authenticatedUser.role !== Role.ADMIN) {
      throw new ForbiddenError('Admin access required');
    }

    // Fetch courses
    const courses =
      await CourseService.getAllCourses();

    // Return response
    return handleSuccess(
      courses,
      200,
      'Courses retrieved successfully'
    );
  } catch (error) {
    return handleError(error);
  }
}