import { NextRequest } from 'next/server';
import db from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/request';
import { handleError, handleSuccess, NotFoundError, ForbiddenError } from '@/lib/errors';
import { Role } from '@prisma/client';

/**
 * GET /api/student/dashboard
 * Aggregates and retrieves dashboard details (profile, subjects, attendance, and course info)
 * for the authenticated student in a single efficient query.
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

    // 3. Query all necessary data for the student dashboard using Prisma relations
    const studentProfile = await db.studentProfile.findUnique({
      where: { userId: userContext.id },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        department: {
          select: {
            name: true,
            code: true,
          },
        },
        enrollments: {
          include: {
            course: {
              select: {
                name: true,
                code: true,
                credits: true,
              },
            },
          },
        },
        attendance: {
          select: {
            status: true,
          },
        },
      },
    });

    if (!studentProfile) {
      throw new NotFoundError('Student profile not found');
    }

    // 4. Map profile details
    const profile = {
      firstName: studentProfile.user.firstName,
      lastName: studentProfile.user.lastName,
      email: studentProfile.user.email,
      rollNumber: studentProfile.rollNumber,
      departmentName: studentProfile.department.name,
      departmentCode: studentProfile.department.code,
      currentSemester: studentProfile.currentSemester,
      batch: studentProfile.batch,
    };

    // 5. Map subjects list
    const subjects = studentProfile.enrollments.map((e) => ({
      courseName: e.course.name,
      courseCode: e.course.code,
      credits: e.course.credits,
    }));

    // 6. Compute attendance counts & percentages
    let totalPresent = 0;
    let totalAbsent = 0;
    let totalLate = 0;
    let totalExcused = 0;

    studentProfile.attendance.forEach((record) => {
      switch (record.status) {
        case 'PRESENT':
          totalPresent++;
          break;
        case 'ABSENT':
          totalAbsent++;
          break;
        case 'LATE':
          totalLate++;
          break;
        case 'EXCUSED':
          totalExcused++;
          break;
      }
    });

    const totalSessions = studentProfile.attendance.length;
    const attendedCount = totalPresent + totalLate + totalExcused;
    const attendancePercentage = totalSessions > 0
      ? parseFloat(((attendedCount / totalSessions) * 100).toFixed(2))
      : 100.0;

    const attendance = {
      totalPresent,
      totalAbsent,
      totalLate,
      totalExcused,
      totalSessions,
      attendancePercentage,
    };

    // 7. Map course information
    const courseInfo = {
      departmentName: studentProfile.department.name,
      departmentCode: studentProfile.department.code,
      currentSemester: studentProfile.currentSemester,
      batch: studentProfile.batch,
    };

    // 8. Return success response with aggregated student dashboard data
    return handleSuccess({
      profile,
      subjects,
      attendance,
      courseInfo,
    });
  } catch (error) {
    // Standard error responder formats standard HTTP status responses
    return handleError(error);
  }
}
