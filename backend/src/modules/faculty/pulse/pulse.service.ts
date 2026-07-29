import db from '../../../lib/prisma';
import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
} from '../../../lib/errors';
import {
  CreatePulseSessionInput,
  UpdatePulseSessionInput,
} from './pulse.validation';
import {
  PulseSessionResponse,
  PulseSessionListResponse,
  PulseSessionQueryDTO,
} from './pulse.types';
import { Prisma, PulseSession, Course, Topic, Department } from '@prisma/client';

type PulseSessionWithRelations = PulseSession & {
  course?: Course | null;
  topic?: Topic | null;
  department?: Department | null;
};

export class PulseService {
  /**
   * Helper: Resolves authenticated user ID to FacultyProfile.
   */
  static async getFacultyProfile(userId: string) {
    const facultyProfile = await db.facultyProfile.findUnique({
      where: { userId },
    });

    if (!facultyProfile) {
      throw new ForbiddenError('Faculty profile not found for the current user.');
    }

    return facultyProfile;
  }

  /**
   * Helper: Verifies that the given course exists and is assigned to the faculty member.
   */
  static async verifyFacultyCourseAccess(facultyId: string, courseId: string) {
    const course = await db.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundError('Subject not found.');
    }

    const assignment = await db.facultyCourse.findFirst({
      where: {
        facultyId,
        courseId,
      },
    });

    if (!assignment) {
      throw new ForbiddenError('You are not authorized to manage pulse sessions for this subject.');
    }

    return course;
  }

  /**
   * Helper: Formats a Prisma PulseSession record into a structured PulseSessionResponse.
   */
  private static formatPulseSessionResponse(session: PulseSessionWithRelations): PulseSessionResponse {
    return {
      id: session.id,
      courseId: session.courseId,
      topicId: session.topicId,
      departmentId: session.departmentId,
      programId: session.programId || null,
      semester: session.semester,
      section: session.section,
      facultyId: session.facultyId,
      sessionType: session.sessionType,
      title: session.title,
      description: session.description || null,
      date: session.date,
      startTime: session.startTime,
      durationMinutes: session.durationMinutes,
      questionCount: session.questionCount,
      questionType: session.questionType,
      difficultyLevel: session.difficultyLevel,
      attendanceRule: session.attendanceRule,
      resultVisibility: session.resultVisibility,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
      course: session.course
        ? {
            id: session.course.id,
            name: session.course.name,
            code: session.course.code,
          }
        : undefined,
      topic: session.topic
        ? {
            id: session.topic.id,
            topicName: session.topic.topicName,
            unitId: session.topic.unitId,
          }
        : undefined,
      department: session.department
        ? {
            id: session.department.id,
            name: session.department.name,
            code: session.department.code,
          }
        : undefined,
    };
  }

  /**
   * Create a new Classroom Pulse Session.
   * Enforces that the subject is assigned to the faculty and the topic belongs to the subject.
   */
  static async createSession(userId: string, input: CreatePulseSessionInput): Promise<PulseSessionResponse> {
    const facultyProfile = await this.getFacultyProfile(userId);

    // Verify subject assignment
    await this.verifyFacultyCourseAccess(facultyProfile.id, input.courseId);

    // Verify topic exists and belongs to the specified course
    const topic = await db.topic.findUnique({
      where: { id: input.topicId },
      include: { unit: true },
    });

    if (!topic) {
      throw new NotFoundError('Topic not found.');
    }

    if (topic.unit.courseId !== input.courseId) {
      throw new ConflictError('The specified topic does not belong to the selected subject.');
    }

    const session = await db.pulseSession.create({
      data: {
        courseId: input.courseId,
        topicId: input.topicId,
        departmentId: input.departmentId,
        programId: input.programId || null,
        semester: input.semester,
        section: input.section,
        facultyId: facultyProfile.id,
        sessionType: input.sessionType,
        title: input.title,
        description: input.description || null,
        date: input.date,
        startTime: input.startTime,
        durationMinutes: input.durationMinutes,
        questionCount: input.questionCount,
        questionType: input.questionType,
        difficultyLevel: input.difficultyLevel,
        attendanceRule: input.attendanceRule,
        resultVisibility: input.resultVisibility,
      },
      include: {
        course: true,
        topic: true,
        department: true,
      },
    });

    return this.formatPulseSessionResponse(session);
  }

  /**
   * Retrieve session details by ID.
   * Enforces that faculty can only view their own sessions or sessions belonging to assigned subjects.
   */
  static async getSessionById(userId: string, sessionId: string): Promise<PulseSessionResponse> {
    const facultyProfile = await this.getFacultyProfile(userId);

    const session = await db.pulseSession.findUnique({
      where: { id: sessionId },
      include: {
        course: true,
        topic: true,
        department: true,
      },
    });

    if (!session) {
      throw new NotFoundError('Pulse session not found.');
    }

    // Verify ownership
    if (session.facultyId !== facultyProfile.id) {
      throw new ForbiddenError('You are not authorized to view this pulse session.');
    }

    return this.formatPulseSessionResponse(session);
  }

  /**
   * Update an existing Classroom Pulse Session.
   * Enforces that faculty can only update their own sessions.
   */
  static async updateSession(
    userId: string,
    sessionId: string,
    input: UpdatePulseSessionInput
  ): Promise<PulseSessionResponse> {
    const facultyProfile = await this.getFacultyProfile(userId);

    const existingSession = await db.pulseSession.findUnique({
      where: { id: sessionId },
    });

    if (!existingSession) {
      throw new NotFoundError('Pulse session not found.');
    }

    if (existingSession.facultyId !== facultyProfile.id) {
      throw new ForbiddenError('You are not authorized to update this pulse session.');
    }

    const targetCourseId = input.courseId || existingSession.courseId;

    // If courseId is changing, verify assignment
    if (input.courseId && input.courseId !== existingSession.courseId) {
      await this.verifyFacultyCourseAccess(facultyProfile.id, input.courseId);
    }

    // If topicId is changing or courseId changed, verify topic belongs to the target course
    if (input.topicId || input.courseId) {
      const targetTopicId = input.topicId || existingSession.topicId;
      const topic = await db.topic.findUnique({
        where: { id: targetTopicId },
        include: { unit: true },
      });

      if (!topic) {
        throw new NotFoundError('Topic not found.');
      }

      if (topic.unit.courseId !== targetCourseId) {
        throw new ConflictError('The specified topic does not belong to the selected subject.');
      }
    }

    const updatedSession = await db.pulseSession.update({
      where: { id: sessionId },
      data: {
        ...(input.courseId && { courseId: input.courseId }),
        ...(input.topicId && { topicId: input.topicId }),
        ...(input.departmentId && { departmentId: input.departmentId }),
        ...(input.programId !== undefined && { programId: input.programId || null }),
        ...(input.semester !== undefined && { semester: input.semester }),
        ...(input.section && { section: input.section }),
        ...(input.sessionType && { sessionType: input.sessionType }),
        ...(input.title && { title: input.title }),
        ...(input.description !== undefined && { description: input.description || null }),
        ...(input.date && { date: input.date }),
        ...(input.startTime && { startTime: input.startTime }),
        ...(input.durationMinutes !== undefined && { durationMinutes: input.durationMinutes }),
        ...(input.questionCount !== undefined && { questionCount: input.questionCount }),
        ...(input.questionType && { questionType: input.questionType }),
        ...(input.difficultyLevel && { difficultyLevel: input.difficultyLevel }),
        ...(input.attendanceRule && { attendanceRule: input.attendanceRule }),
        ...(input.resultVisibility && { resultVisibility: input.resultVisibility }),
      },
      include: {
        course: true,
        topic: true,
        department: true,
      },
    });

    return this.formatPulseSessionResponse(updatedSession);
  }

  /**
   * Delete a Classroom Pulse Session.
   * Enforces that faculty can only delete their own sessions.
   */
  static async deleteSession(userId: string, sessionId: string): Promise<void> {
    const facultyProfile = await this.getFacultyProfile(userId);

    const existingSession = await db.pulseSession.findUnique({
      where: { id: sessionId },
    });

    if (!existingSession) {
      throw new NotFoundError('Pulse session not found.');
    }

    if (existingSession.facultyId !== facultyProfile.id) {
      throw new ForbiddenError('You are not authorized to delete this pulse session.');
    }

    await db.pulseSession.delete({
      where: { id: sessionId },
    });
  }

  /**
   * List and search Classroom Pulse Sessions for the authenticated faculty member.
   * Supports filtering by courseId, topicId, sessionType, difficultyLevel, date, and keyword search.
   */
  static async listSessions(userId: string, query: PulseSessionQueryDTO): Promise<PulseSessionListResponse> {
    const facultyProfile = await this.getFacultyProfile(userId);

    const { page = 1, limit = 10, search, courseId, topicId, sessionType, difficultyLevel, date, status } = query;
    const skip = (page - 1) * limit;

    // Build Prisma where clause
    // Faculty should only access sessions belonging to them
    const where: Prisma.PulseSessionWhereInput = {
      facultyId: facultyProfile.id,
    };

    if (status) {
      // @ts-ignore
      where.status = status;
    }

    if (courseId) {
      where.courseId = courseId;
    }

    if (topicId) {
      where.topicId = topicId;
    }

    if (sessionType) {
      where.sessionType = sessionType;
    }

    if (difficultyLevel) {
      where.difficultyLevel = difficultyLevel;
    }

    if (date) {
      // Parse date string (e.g. "2026-07-27") to filter exact date range from 00:00:00 to 23:59:59
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate.getTime())) {
        const startOfDay = new Date(parsedDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(parsedDate);
        endOfDay.setHours(23, 59, 59, 999);
        where.date = {
          gte: startOfDay,
          lte: endOfDay,
        };
      }
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { section: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [total, sessions] = await Promise.all([
      db.pulseSession.count({ where }),
      db.pulseSession.findMany({
        where,
        skip,
        take: limit,
        orderBy: { date: 'desc' },
        include: {
          course: true,
          topic: true,
          department: true,
        },
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      sessions: sessions.map((s) => this.formatPulseSessionResponse(s)),
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }

  /**
   * Action methods for pulse sessions
   */
  static async publishSession(userId: string, sessionId: string): Promise<PulseSessionResponse> {
    const facultyProfile = await this.getFacultyProfile(userId);
    const session = await db.pulseSession.findUnique({ where: { id: sessionId } });
    if (!session) throw new NotFoundError('Pulse session not found.');
    if (session.facultyId !== facultyProfile.id) throw new ForbiddenError('Unauthorized.');
    
    const updated = await db.pulseSession.update({
      where: { id: sessionId },
      data: { status: 'PUBLISHED' },
      include: { course: true, topic: true, department: true }
    });
    return this.formatPulseSessionResponse(updated);
  }

  static async startSession(userId: string, sessionId: string): Promise<PulseSessionResponse> {
    const facultyProfile = await this.getFacultyProfile(userId);
    const session = await db.pulseSession.findUnique({ where: { id: sessionId } });
    if (!session) throw new NotFoundError('Pulse session not found.');
    if (session.facultyId !== facultyProfile.id) throw new ForbiddenError('Unauthorized.');
    
    const updated = await db.pulseSession.update({
      where: { id: sessionId },
      data: { status: 'LIVE', timerStatus: 'RUNNING', timerActualStartTime: new Date() },
      include: { course: true, topic: true, department: true }
    });
    return this.formatPulseSessionResponse(updated);
  }

  static async closeSession(userId: string, sessionId: string): Promise<PulseSessionResponse> {
    const facultyProfile = await this.getFacultyProfile(userId);
    const session = await db.pulseSession.findUnique({ where: { id: sessionId } });
    if (!session) throw new NotFoundError('Pulse session not found.');
    if (session.facultyId !== facultyProfile.id) throw new ForbiddenError('Unauthorized.');
    
    const updated = await db.pulseSession.update({
      where: { id: sessionId },
      data: { status: 'CLOSED', timerStatus: 'COMPLETED', timerActualEndTime: new Date() },
      include: { course: true, topic: true, department: true }
    });
    return this.formatPulseSessionResponse(updated);
  }

  static async archiveSession(userId: string, sessionId: string): Promise<PulseSessionResponse> {
    const facultyProfile = await this.getFacultyProfile(userId);
    const session = await db.pulseSession.findUnique({ where: { id: sessionId } });
    if (!session) throw new NotFoundError('Pulse session not found.');
    if (session.facultyId !== facultyProfile.id) throw new ForbiddenError('Unauthorized.');
    
    const updated = await db.pulseSession.update({
      where: { id: sessionId },
      data: { status: 'ARCHIVED' },
      include: { course: true, topic: true, department: true }
    });
    return this.formatPulseSessionResponse(updated);
  }

  static async generateSessionCode(userId: string, sessionId: string): Promise<PulseSessionResponse> {
    const facultyProfile = await this.getFacultyProfile(userId);
    const session = await db.pulseSession.findUnique({ where: { id: sessionId } });
    if (!session) throw new NotFoundError('Pulse session not found.');
    if (session.facultyId !== facultyProfile.id) throw new ForbiddenError('Unauthorized.');
    
    // Generate a random 6 character code like PULSE-X1Y2
    const code = 'PULSE-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    
    const updated = await db.pulseSession.update({
      where: { id: sessionId },
      data: { 
        sessionCode: code,
        isCodeActive: true,
        codeCreatedAt: new Date(),
        // Expires in 24 hours
        codeExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
      },
      include: { course: true, topic: true, department: true }
    });
    return this.formatPulseSessionResponse(updated);
  }

  static async generateQrCode(userId: string, sessionId: string): Promise<PulseSessionResponse> {
    const facultyProfile = await this.getFacultyProfile(userId);
    const session = await db.pulseSession.findUnique({ where: { id: sessionId } });
    if (!session) throw new NotFoundError('Pulse session not found.');
    if (session.facultyId !== facultyProfile.id) throw new ForbiddenError('Unauthorized.');
    
    const mockQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=mysession_${sessionId}`;
    
    const updated = await db.pulseSession.update({
      where: { id: sessionId },
      data: { qrCodeUrl: mockQrUrl },
      include: { course: true, topic: true, department: true }
    });
    return this.formatPulseSessionResponse(updated);
  }

  static async getSessionSummary(userId: string) {
    const facultyProfile = await this.getFacultyProfile(userId);
    
    const [total, live, upcoming, completed] = await Promise.all([
      db.pulseSession.count({ where: { facultyId: facultyProfile.id } }),
      db.pulseSession.count({ where: { facultyId: facultyProfile.id, status: 'LIVE' } }),
      db.pulseSession.count({ where: { facultyId: facultyProfile.id, status: { in: ['DRAFT', 'PUBLISHED'] } } }),
      db.pulseSession.count({ where: { facultyId: facultyProfile.id, status: { in: ['CLOSED', 'COMPLETED', 'ARCHIVED'] } } }),
    ]);
    
    return {
      total,
      live,
      upcoming,
      completed
    };
  }

  static async getLiveSessionData(userId: string, sessionId: string) {
    const facultyProfile = await this.getFacultyProfile(userId);
    
    const session = await db.pulseSession.findUnique({
      where: { id: sessionId },
      include: {
        course: true,
        topic: true,
        department: true,
        questions: {
          orderBy: { questionNumber: 'asc' }
        },
        participations: {
          include: {
            student: {
              include: {
                user: true
              }
            },
            answers: true
          }
        }
      }
    });

    if (!session) throw new NotFoundError('Pulse session not found.');
    if (session.facultyId !== facultyProfile.id) throw new ForbiddenError('Unauthorized.');

    const studentsJoined = session.participations.length;
    const responsesSubmitted = session.participations.filter(p => p.hasAttempted).length;
    
    let totalScore = 0;
    let scoredStudents = 0;
    session.participations.forEach(p => {
      if (p.score !== null && p.score !== undefined) {
        totalScore += p.percentage || 0;
        scoredStudents++;
      }
    });
    
    const averageScore = scoredStudents > 0 ? (totalScore / scoredStudents).toFixed(1) : 0;
    const participationPercentage = session.section ? 100 : 0; // Ideally needs total section count, mock 100 for now if no total

    // Question Progress
    const questionProgress = session.questions.map(q => {
      let answersCount = 0;
      let correctCount = 0;
      session.participations.forEach(p => {
        const answer = p.answers.find(a => a.questionId === q.id);
        if (answer) {
          answersCount++;
          if (answer.isCorrect) correctCount++;
        }
      });
      return {
        questionId: q.id,
        questionNumber: q.questionNumber,
        totalAnswers: answersCount,
        correctAnswers: correctCount
      };
    });

    return {
      session: {
        id: session.id,
        title: session.title,
        courseName: session.course?.name || 'N/A',
        status: session.status,
        sessionCode: session.sessionCode,
        qrCodeUrl: session.qrCodeUrl,
        timerActualStartTime: session.timerActualStartTime,
        durationMinutes: session.durationMinutes,
        questionCount: session.questionCount,
        createdAt: session.createdAt
      },
      kpis: {
        studentsJoined,
        responsesSubmitted,
        averageScore,
        participationPercentage,
        studentsRemaining: Math.max(0, studentsJoined - responsesSubmitted)
      },
      questionProgress,
      students: session.participations.map(p => ({
        id: p.id,
        studentName: `${p.student.user?.firstName || ''} ${p.student.user?.lastName || ''}`.trim() || 'Unknown',
        rollNumber: p.student.rollNumber || 'N/A',
        joinedAt: p.createdAt,
        hasAttempted: p.hasAttempted,
        score: p.score,
        percentage: p.percentage,
        timeTakenSeconds: p.timeTakenSeconds,
        status: p.hasAttempted ? 'Submitted' : 'In Progress'
      }))
    };
  }
}
