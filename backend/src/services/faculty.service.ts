import db from '@/lib/db';
import { NotFoundError, ForbiddenError } from '@/lib/errors';
import { AttendanceStatus } from '@prisma/client';
import { AnalyticsService } from './analytics.service';

export class FacultyService {
  /**
   * Fetch faculty profile by user ID.
   */
  static async getProfile(userId: string) {
    const faculty = await db.facultyProfile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true,
          },
        },
        department: {
          select: {
            name: true,
            code: true,
          },
        },
      },
    });

    if (!faculty) {
      throw new NotFoundError('Faculty profile not found');
    }

    return faculty;
  }

  /**
   * List all courses assigned to this faculty member for the current semester.
   */
  static async getAssignedCourses(facultyId: string) {
    return db.facultyCourse.findMany({
      where: { facultyId },
      include: {
        course: {
          select: {
            name: true,
            code: true,
            credits: true,
          },
        },
      },
    });
  }

  /**
   * Fetch all students enrolled in a specific course + section taught by the faculty.
   */
  static async getEnrolledStudents(facultyId: string, courseId: string, section: string) {
    // 1. Verify that this faculty is indeed assigned to teach this course section
    const assignment = await db.facultyCourse.findFirst({
      where: { facultyId, courseId, section },
    });

    if (!assignment) {
      throw new ForbiddenError('You are not authorized to view student records for this course section');
    }

    // 2. Query students who have matching department/course enrollments
    return db.enrollment.findMany({
      where: {
        courseId,
        student: {
          // If students belong to the class where this section is offered
          enrollments: {
            some: {
              courseId,
            },
          },
        },
      },
      include: {
        student: {
          include: {
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
    });
  }

  /**
   * Record daily attendance for a list of students in a course.
   */
  static async submitAttendance(
    facultyId: string,
    courseId: string,
    records: Array<{ studentId: string; date: Date; status: AttendanceStatus; remarks?: string }>
  ) {
    // Check if faculty is assigned to this course
    const assignment = await db.facultyCourse.findFirst({
      where: { facultyId, courseId },
    });

    if (!assignment) {
      throw new ForbiddenError('You are not authorized to post attendance for this course');
    }

    // Process attendance submissions in a transaction
    const operations = records.map((record) => {
      return db.attendance.upsert({
        where: {
          studentId_courseId_date: {
            studentId: record.studentId,
            courseId,
            date: new Date(record.date),
          },
        },
        update: {
          status: record.status,
          remarks: record.remarks,
        },
        create: {
          studentId: record.studentId,
          courseId,
          date: new Date(record.date),
          status: record.status,
          remarks: record.remarks,
        },
      });
    });

    const result = await db.$transaction(operations);

    // Invalidate cached department analytics (fetch department ID from faculty profile)
    const faculty = await db.facultyProfile.findUnique({
      where: { id: facultyId },
      select: { departmentId: true },
    });
    if (faculty?.departmentId) {
      await AnalyticsService.invalidateCache(faculty.departmentId);
    }

    return result;
  }

  /**
   * Submit marks and grade for an enrollment.
   */
  static async submitGrade(
    facultyId: string,
    enrollmentId: string,
    marks: number,
    grade: string,
    gpa: number
  ) {
    const enrollment = await db.enrollment.findUnique({
      where: { id: enrollmentId },
      include: { student: true },
    });

    if (!enrollment) {
      throw new NotFoundError('Enrollment record not found');
    }

    // Verify faculty assignment to this course
    const assignment = await db.facultyCourse.findFirst({
      where: { facultyId, courseId: enrollment.courseId },
    });

    if (!assignment) {
      throw new ForbiddenError('You are not authorized to grade this student');
    }

    const updatedEnrollment = await db.enrollment.update({
      where: { id: enrollmentId },
      data: {
        marks,
        grade,
        gpa,
      },
    });

    // Invalidate dashboard analytics cache
    await AnalyticsService.invalidateCache(enrollment.student.departmentId);

    return updatedEnrollment;
  }
}
