import db from '@/lib/db';
import { NotFoundError, ForbiddenError } from '@/lib/errors';

export class HodService {
  /**
   * Fetch HOD profile by user ID.
   */
  static async getProfile(userId: string) {
    const hod = await db.hodProfile.findUnique({
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
        department: true,
      },
    });

    if (!hod) {
      throw new NotFoundError('HOD profile not found');
    }

    return hod;
  }

  /**
   * Fetch all faculty members in the department.
   */
  static async getDepartmentFaculty(departmentId: string) {
    return db.facultyProfile.findMany({
      where: { departmentId },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true,
          },
        },
      },
    });
  }

  /**
   * Fetch all students in the department.
   */
  static async getDepartmentStudents(departmentId: string) {
    return db.studentProfile.findMany({
      where: { departmentId },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            isActive: true,
          },
        },
      },
      orderBy: {
        rollNumber: 'asc',
      },
    });
  }

  /**
   * Assign a course to a faculty member.
   */
  static async assignCourseToFaculty(
    hodDepartmentId: string,
    facultyId: string,
    courseId: string,
    section: string,
    semester: number,
    academicYear: string
  ) {
    // 1. Verify that the faculty belongs to the HOD's department
    const faculty = await db.facultyProfile.findUnique({
      where: { id: facultyId },
    });

    if (!faculty || faculty.departmentId !== hodDepartmentId) {
      throw new ForbiddenError('This faculty member does not belong to your department');
    }

    // 2. Verify that the course belongs to the HOD's department
    const course = await db.course.findUnique({
      where: { id: courseId },
    });

    if (!course || course.departmentId !== hodDepartmentId) {
      throw new ForbiddenError('This course does not belong to your department');
    }

    // 3. Upsert assignment
    return db.facultyCourse.upsert({
      where: {
        facultyId_courseId_section_academicYear_semester: {
          facultyId,
          courseId,
          section,
          academicYear,
          semester,
        },
      },
      update: {},
      create: {
        facultyId,
        courseId,
        section,
        semester,
        academicYear,
      },
    });
  }

  /**
   * Get all department courses.
   */
  static async getDepartmentCourses(departmentId: string) {
    return db.course.findMany({
      where: { departmentId },
      orderBy: {
        code: 'asc',
      },
    });
  }
}
