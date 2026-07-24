import db from '@/lib/db';

export class DashboardService {
  static async getDashboardStats() {
    const [facultyCount, hodCount, departmentCount, courseCount] = await Promise.all([
      db.facultyProfile.count(),
      db.hodProfile.count(),
      db.department.count(),
      db.course.count(),
    ]);

    return {
      facultyCount,
      hodCount,
      departmentCount,
      courseCount,
    };
  }

  static async getRecentEnrollments() {
    const enrollments = await db.enrollment.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' },
      include: {
        course: true,
        student: {
          include: {
            section: true,
            semester: true,
          }
        }
      }
    });
    
    return enrollments;
  }

  static async getActiveSessions() {
    const sessions = await db.facultyCourse.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' },
      include: {
        course: true,
        faculty: {
          include: {
            user: true
          }
        }
      }
    });
    
    return sessions;
  }
}
