import db from '@/lib/db';
import cache from '@/lib/redis';

export interface PerformanceKPI {
  gpaAverage: number;
  passingRate: number;
  totalStudents: number;
  totalCourses: number;
}

export interface AttendanceAlert {
  studentId: string;
  studentName: string;
  courseCode: string;
  courseName: string;
  attendancePercentage: number;
}

export class AnalyticsService {
  /**
   * Retrieves department performance analytics with Redis caching.
   * Cached for 15 minutes to reduce database load.
   */
  static async getDepartmentKPIs(departmentId: string): Promise<PerformanceKPI> {
    const cacheKey = `dept:${departmentId}:kpis`;

    // 1. Attempt to fetch from Redis Cache
    try {
      const cached = await cache.get(cacheKey);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (err) {
      console.warn('Failed to read from Redis cache:', err);
    }

    // 2. Cache miss - compute from Database using Prisma
    // Fetch average grades (marks/gpa) and student counts
    const enrollments = await db.enrollment.findMany({
      where: {
        student: {
          departmentId: departmentId,
        },
      },
      select: {
        gpa: true,
        grade: true,
      },
    });

    const totalStudents = await db.studentProfile.count({
      where: { departmentId },
    });

    const totalCourses = await db.course.count({
      where: { departmentId },
    });

    let totalGpa = 0;
    let gradedCount = 0;
    let passingCount = 0;

    enrollments.forEach((e) => {
      if (e.gpa !== null) {
        totalGpa += e.gpa;
        gradedCount++;
        if (e.grade !== 'F') {
          passingCount++;
        }
      }
    });

    const gpaAverage = gradedCount > 0 ? parseFloat((totalGpa / gradedCount).toFixed(2)) : 0.0;
    const passingRate = gradedCount > 0 ? parseFloat(((passingCount / gradedCount) * 100).toFixed(2)) : 100.0;

    const kpis: PerformanceKPI = {
      gpaAverage,
      passingRate,
      totalStudents,
      totalCourses,
    };

    // 3. Save to Redis Cache (expires in 900 seconds / 15 minutes)
    try {
      await cache.set(cacheKey, JSON.stringify(kpis), 'EX', 900);
    } catch (err) {
      console.warn('Failed to write to Redis cache:', err);
    }

    return kpis;
  }

  /**
   * Identifies students with attendance below 75% who are at risk.
   * Useful for Faculty, HOD, and Admin dashboards.
   */
  static async getLowAttendanceAlerts(departmentId?: string): Promise<AttendanceAlert[]> {
    const cacheKey = departmentId ? `dept:${departmentId}:low-attendance` : 'global:low-attendance';

    try {
      const cached = await cache.get(cacheKey);
      if (cached) return JSON.parse(cached);
    } catch (err) {
      console.warn('Redis read failed:', err);
    }

    // Query students, courses, and attendance records
    const students = await db.studentProfile.findMany({
      where: departmentId ? { departmentId } : {},
      include: {
        user: {
          select: { firstName: true, lastName: true },
        },
        attendance: true,
        enrollments: {
          include: {
            course: true,
          },
        },
      },
    });

    const alerts: AttendanceAlert[] = [];

    students.forEach((student) => {
      // Calculate attendance per course
      student.enrollments.forEach((enrollment) => {
        const courseId = enrollment.courseId;
        const courseAttendance = student.attendance.filter((a) => a.courseId === courseId);
        
        if (courseAttendance.length === 0) return;

        const presentCount = courseAttendance.filter(
          (a) => a.status === 'PRESENT' || a.status === 'LATE' || a.status === 'EXCUSED'
        ).length;

        const attendancePercentage = (presentCount / courseAttendance.length) * 100;

        if (attendancePercentage < 75.0) {
          alerts.push({
            studentId: student.id,
            studentName: `${student.user.firstName} ${student.user.lastName}`,
            courseCode: enrollment.course.code,
            courseName: enrollment.course.name,
            attendancePercentage: parseFloat(attendancePercentage.toFixed(1)),
          });
        }
      });
    });

    // Cache results for 5 minutes
    try {
      await cache.set(cacheKey, JSON.stringify(alerts), 'EX', 300);
    } catch (err) {
      console.warn('Redis write failed:', err);
    }

    return alerts;
  }

  /**
   * Force invalidate dashboard cache keys.
   * Call this when a new attendance record or grade is submitted.
   */
  static async invalidateCache(departmentId: string): Promise<void> {
    try {
      await cache.del(`dept:${departmentId}:kpis`);
      await cache.del(`dept:${departmentId}:low-attendance`);
      await cache.del('global:low-attendance');
      console.log(`Cache cleared for department: ${departmentId}`);
    } catch (err) {
      console.error('Failed to invalidate Redis cache:', err);
    }
  }
}
