import { NextRequest } from 'next/server';
import db from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/request';
import { handleError, handleSuccess, NotFoundError, ForbiddenError } from '@/lib/errors';
import { Role } from '@prisma/client';

/**
 * GET /api/student/subjects
 * Retrieves all course enrollments and assigned faculties for the authenticated student.
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

    // 3. Find the student's StudentProfile
    const studentProfile = await db.studentProfile.findUnique({
      where: { userId: userContext.id },
    });

    if (!studentProfile) {
      throw new NotFoundError('Student profile not found');
    }

    // 4. Fetch all enrollments for that student with Course and FacultyCourse details
    const enrollments = await db.enrollment.findMany({
      where: { studentId: studentProfile.id },
      select: {
        semester: true,
        academicYear: true,
        course: {
          select: {
            id: true,
            name: true,
            code: true,
            credits: true,
            facultyCourses: {
              select: {
                semester: true,
                academicYear: true,
                faculty: {
                  select: {
                    id: true,
                    user: {
                      select: {
                        firstName: true,
                        lastName: true,
                        email: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    // 5. Map the database results to the required clean JSON structure
    const subjects = enrollments.map((enrollment) => {
      // Find the assigned faculty course matching the enrollment's semester and academicYear
      const facultyCourse = enrollment.course.facultyCourses.find(
        (fc) =>
          fc.semester === enrollment.semester &&
          fc.academicYear === enrollment.academicYear
      );

      const faculty = facultyCourse
        ? {
            id: facultyCourse.faculty.id,
            firstName: facultyCourse.faculty.user.firstName,
            lastName: facultyCourse.faculty.user.lastName,
            email: facultyCourse.faculty.user.email,
          }
        : null;

      return {
        id: enrollment.course.id,
        name: enrollment.course.name,
        code: enrollment.course.code,
        credits: enrollment.course.credits,
        semester: enrollment.semester,
        academicYear: enrollment.academicYear,
        faculty,
      };
    });

    // 6. Return success response with the clean JSON array of subjects
    return handleSuccess(subjects);
  } catch (error) {
    // Standard error responder formats standard HTTP status responses
    return handleError(error);
  }
}
