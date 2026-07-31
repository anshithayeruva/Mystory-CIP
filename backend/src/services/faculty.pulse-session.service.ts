import { prisma } from '../prisma/client';
import { AppError } from '../middleware/errorHandler';

export class FacultyPulseSessionService {
  static async getFaculty(userId: string) {
    const faculty = await prisma.facultyProfile.findUnique({ where: { userId } });
    if (!faculty) throw new AppError(404, 'Faculty profile not found');
    return faculty;
  }

  static async getPulseSessions(userId: string) {
    const faculty = await this.getFaculty(userId);
    return prisma.pulseSession.findMany({
      where: { facultyId: faculty.id },
      orderBy: { createdAt: 'desc' },
      include: { course: true, topic: true }
    });
  }

  static async createPulseSession(userId: string, data: any) {
    const faculty = await this.getFaculty(userId);
    return prisma.pulseSession.create({
      data: {
        ...data,
        facultyId: faculty.id,
        semester: 1, // Defaulting for now
        section: 'A', // Defaulting for now
        date: new Date(data.date),
      }
    });
  }

  static async getPulseSessionById(sessionId: string) {
    const session = await prisma.pulseSession.findUnique({
      where: { id: sessionId },
      include: { course: true, topic: true, questions: true }
    });
    if (!session) throw new AppError(404, 'Pulse session not found');
    return session;
  }

  static async updatePulseSession(sessionId: string, data: any) {
    if (data.date) data.date = new Date(data.date);
    return prisma.pulseSession.update({
      where: { id: sessionId },
      data
    });
  }

  static async deletePulseSession(sessionId: string) {
    return prisma.pulseSession.delete({ where: { id: sessionId } });
  }

  static async startLiveSession(sessionId: string) {
    let liveSession = await prisma.liveSession.findUnique({ where: { pulseSessionId: sessionId } });
    if (!liveSession) {
      liveSession = await prisma.liveSession.create({
        data: {
          pulseSessionId: sessionId,
          status: 'IN_PROGRESS',
          startedAt: new Date()
        }
      });
    } else {
      liveSession = await prisma.liveSession.update({
        where: { id: liveSession.id },
        data: { status: 'IN_PROGRESS' }
      });
    }
    
    await prisma.pulseSession.update({
      where: { id: sessionId },
      data: { status: 'LIVE' }
    });

    return liveSession;
  }

  static async pauseLiveSession(sessionId: string) {
    const liveSession = await prisma.liveSession.update({
      where: { pulseSessionId: sessionId },
      data: { status: 'PAUSED' }
    });
    return liveSession;
  }

  static async resumeLiveSession(sessionId: string) {
    const liveSession = await prisma.liveSession.update({
      where: { pulseSessionId: sessionId },
      data: { status: 'IN_PROGRESS' }
    });
    return liveSession;
  }

  static async endLiveSession(sessionId: string) {
    const liveSession = await prisma.liveSession.update({
      where: { pulseSessionId: sessionId },
      data: { status: 'ENDED', endedAt: new Date() }
    });

    await prisma.pulseSession.update({
      where: { id: sessionId },
      data: { status: 'COMPLETED' }
    });

    return liveSession;
  }

  static async getLiveSession(sessionId: string) {
    const liveSession = await prisma.liveSession.findUnique({
      where: { pulseSessionId: sessionId },
      include: { currentQuestion: true }
    });
    if (!liveSession) throw new AppError(404, 'Live session not active');
    return liveSession;
  }

  static async getSessionSummary(sessionId: string) {
    const summary = await prisma.sessionSummary.findUnique({
      where: { pulseSessionId: sessionId },
      include: { pulseSession: { include: { course: true, topic: true } } }
    });
    if (!summary) throw new AppError(404, 'Session summary not found');
    return summary;
  }

  static async getAllSessionSummaries(userId: string) {
    const faculty = await this.getFaculty(userId);
    return prisma.sessionSummary.findMany({
      where: { pulseSession: { facultyId: faculty.id } },
      include: { pulseSession: { include: { course: true, topic: true } } },
      orderBy: { createdAt: 'desc' }
    });
  }

  static async getConceptGapAnalysis(subjectId: string) {
    return prisma.conceptGapAnalysis.findMany({
      where: { courseId: subjectId },
      include: { topic: true },
      orderBy: { averageUnderstanding: 'asc' }
    });
  }

  static async getAllConceptGaps(userId: string) {
    const faculty = await this.getFaculty(userId);
    return prisma.conceptGapAnalysis.findMany({
      where: { course: { facultyCourses: { some: { facultyId: faculty.id } } } },
      include: { course: true, topic: true }
    });
  }
}
