import db from '@/lib/db';
import { NotFoundError } from '@/lib/errors';

export class StudentService {
  /**
   * Fetch complete student profile including department and user credentials.
   */
  static async getProfile(userId: string) {
    const student = await db.studentProfile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true,
            isActive: true,
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

    if (!student) {
      throw new NotFoundError('Student profile not found');
    }

    return student;
  }

  /**
   * Fetch all courses in which the student is currently enrolled.
   */
  static async getEnrolledCourses(studentId: string) {
    return db.enrollment.findMany({
      where: { studentId },
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
   * Fetch overall and course-wise attendance metrics for a student.
   */
  static async getAttendanceReport(studentId: string) {
    const enrollments = await db.enrollment.findMany({
      where: { studentId },
      include: {
        course: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });

    const attendanceRecords = await db.attendance.findMany({
      where: { studentId },
    });

    const report = enrollments.map((enrollment) => {
      const courseId = enrollment.courseId;
      const records = attendanceRecords.filter((a) => a.courseId === courseId);

      const totalClasses = records.length;
      const presentCount = records.filter(
        (a) => a.status === 'PRESENT' || a.status === 'LATE' || a.status === 'EXCUSED'
      ).length;

      const percentage = totalClasses > 0 ? parseFloat(((presentCount / totalClasses) * 100).toFixed(2)) : 100.0;

      return {
        courseId,
        courseCode: enrollment.course.code,
        courseName: enrollment.course.name,
        classesAttended: presentCount,
        totalClasses,
        percentage,
      };
    });

    // Calculate aggregated overall attendance
    const totalClassesAllCourses = report.reduce((sum, item) => sum + item.totalClasses, 0);
    const totalAttendedAllCourses = report.reduce((sum, item) => sum + item.classesAttended, 0);
    const overallPercentage =
      totalClassesAllCourses > 0
        ? parseFloat(((totalAttendedAllCourses / totalClassesAllCourses) * 100).toFixed(2))
        : 100.0;

    return {
      courses: report,
      summary: {
        totalClasses: totalClassesAllCourses,
        classesAttended: totalAttendedAllCourses,
        overallPercentage,
      },
    };
  }

  /**
   * Fetch semester-wise grade sheet/transcript.
   */
  static async getGrades(studentId: string) {
    const enrollments = await db.enrollment.findMany({
      where: { studentId },
      select: {
        semester: true,
        academicYear: true,
        course: {
          select: {
            code: true,
            name: true,
            credits: true,
          },
        },
        grade: true,
        marks: true,
        gpa: true,
      },
      orderBy: [
        { semester: 'asc' },
      ],
    });

    // Group by semester
    const semestersMap: Record<string, typeof enrollments> = {};
    enrollments.forEach((enrollment) => {
      const key = `Semester ${enrollment.semester}`;
      if (!semestersMap[key]) {
        semestersMap[key] = [];
      }
      semestersMap[key].push(enrollment);
    });

    return semestersMap;
  }
}
