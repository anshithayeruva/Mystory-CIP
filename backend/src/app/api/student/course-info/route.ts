import { NextRequest } from 'next/server';
import db from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/request';
import { handleError, handleSuccess, NotFoundError, ForbiddenError } from '@/lib/errors';
import { Role } from '@prisma/client';

/**
 * GET /api/student/course-info
 * Retrieves course/academic information (department, semester, batch) for the authenticated student.
 * Protected by Edge Middleware.
 */
export async function GET(request: NextRequest) {
  try {
    // 1. Retrieve the authenticated user context from request headers
    const userContext = getAuthenticatedUser(request);

    // 2. Extra safety check to verify student clearance level
    if (userContext.role !== Role.STUDENT) {
      throw new ForbiddenError('Student access required');
    }

    // 3. Find the student's StudentProfile with the department details
    const studentProfile = await db.studentProfile.findUnique({
      where: { userId: userContext.id },
      include: {
        department: {
          select: {
            name: true,
            code: true,
          },
        },
      },
    });

    if (!studentProfile) {
      throw new NotFoundError('Student profile not found');
    }

    // 4. Return success response containing department name, department code, current semester, and batch
    return handleSuccess({
      departmentName: studentProfile.department.name,
      departmentCode: studentProfile.department.code,
      currentSemester: studentProfile.currentSemester,
      batch: studentProfile.batch,
    });
  } catch (error) {
    // Standard error responder formats standard HTTP status responses
    return handleError(error);
  }
}
