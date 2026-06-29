import { NextRequest } from 'next/server';
import db from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/request';
import { handleError, handleSuccess, NotFoundError, ForbiddenError } from '@/lib/errors';
import { Role } from '@prisma/client';

/**
 * GET /api/student/attendance
 * Retrieves the overall attendance summary for the authenticated student.
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

    // 4. Fetch all attendance records for that student
    const attendanceRecords = await db.attendance.findMany({
      where: { studentId: studentProfile.id },
      select: {
        status: true,
      },
    });

    // 5. Compute the counts for each status
    let totalPresent = 0;
    let totalAbsent = 0;
    let totalLate = 0;
    let totalExcused = 0;

    attendanceRecords.forEach((record) => {
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

    const totalSessions = attendanceRecords.length;
    const attendedCount = totalPresent + totalLate + totalExcused;
    const attendancePercentage = totalSessions > 0
      ? parseFloat(((attendedCount / totalSessions) * 100).toFixed(2))
      : 100.0;

    // 6. Return success response with the attendance summary
    return handleSuccess({
      totalPresent,
      totalAbsent,
      totalLate,
      totalExcused,
      totalSessions,
      attendancePercentage,
    });
  } catch (error) {
    // Standard error responder formats standard HTTP status responses
    return handleError(error);
  }
}
