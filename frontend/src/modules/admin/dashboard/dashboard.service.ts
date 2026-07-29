import db from '@/lib/db';

export class DashboardService {
  static async getDashboardStats() {
    const [staffCount, hodCount, departmentCount, courseCount] = await Promise.all([
      0,
      db.hodProfile.count(),
      db.department.count(),
      db.course.count(),
    ]);

    return {
      staffCount,
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
    const sessions: any[] = [];
    
    return sessions;
  }
}
