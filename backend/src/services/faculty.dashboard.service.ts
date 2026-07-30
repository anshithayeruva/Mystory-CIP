import { prisma } from '../prisma/client';
import { AppError } from '../middleware/errorHandler';

export class FacultyDashboardService {
  static async getDashboardData(userId: string) {
    const faculty = await prisma.facultyProfile.findUnique({
      where: { userId }
    });
    
    if (!faculty) throw new AppError(404, 'Faculty profile not found');

    const subjectsCount = await prisma.facultyCourse.count({
      where: { facultyId: faculty.id }
    });

    const sessionsCount = await prisma.pulseSession.count({
      where: { facultyId: faculty.id }
    });

    const recentSessions = await prisma.pulseSession.findMany({
      where: { facultyId: faculty.id },
      orderBy: { date: 'desc' },
      take: 5,
      include: { course: true, topic: true }
    });

    return {
      kpis: { subjects: subjectsCount, totalSessions: sessionsCount },
      recentSessions,
      conceptGapSummary: []
    };
  }
}
