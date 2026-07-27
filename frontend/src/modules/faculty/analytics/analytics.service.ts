import { db } from '@/lib/db';
import { NotFoundError, ForbiddenError } from '@/lib/errors';
import { PulseSessionStatus, Prisma } from '@prisma/client';
import {
  DashboardSummaryResponse,
  SessionSummaryResponse,
  SessionSummaryListItem,
  PaginatedSessionSummariesResponse,
  ConceptGapAnalysisResponse,
  AttendanceReportItem,
  UnderstandingReportItem,
  PaginatedReportResponse,
  ChartDataResponse,
  TopicGapStatistic,
  QuestionGapStatistic,
} from './analytics.types';
import {
  ValidatedSessionSummaryQuery,
  ValidatedReportQuery,
  ValidatedChartType,
} from './analytics.validation';

export class AnalyticsService {
  /**
   * Helper to retrieve and validate faculty profile for a user.
   */
  private static async getFacultyProfile(userId: string) {
    const profile = await db.facultyProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new ForbiddenError('Only faculty members can access analytics.');
    }
    return profile;
  }

  /**
   * 1. DASHBOARD SUMMARY
   * Returns overview statistics across all sessions owned by this faculty member.
   */
  static async getDashboardSummary(userId: string): Promise<DashboardSummaryResponse> {
    const profile = await this.getFacultyProfile(userId);

    const sessions = await db.pulseSession.findMany({
      where: { facultyId: profile.id },
      include: {
        participations: true,
      },
    });

    const totalSessionsCreated = sessions.length;
    const activeSessions = sessions.filter(
      (s) => s.status === PulseSessionStatus.LIVE || s.status === PulseSessionStatus.PAUSED
    ).length;
    const completedSessions = sessions.filter(
      (s) =>
        s.status === PulseSessionStatus.COMPLETED ||
        s.status === PulseSessionStatus.CLOSED ||
        s.status === PulseSessionStatus.ARCHIVED
    ).length;

    // Distinct assigned courses for this faculty
    const facultyCourses = await db.facultyCourse.findMany({
      where: { facultyId: profile.id },
      select: { courseId: true },
    });
    const distinctCourseIds = Array.from(new Set(facultyCourses.map((fc) => fc.courseId)));
    const totalAssignedSubjects = distinctCourseIds.length;

    // Total distinct students enrolled across assigned courses
    let totalStudents = 0;
    if (distinctCourseIds.length > 0) {
      const enrollments = await db.enrollment.findMany({
        where: { courseId: { in: distinctCourseIds } },
        select: { studentId: true },
      });
      totalStudents = new Set(enrollments.map((e) => e.studentId)).size;
    }

    // Attempted vs Not Attempted distinct students
    const attemptedStudentIds = new Set<string>();
    let totalAttendanceCount = 0;
    let totalPossibleAttendance = 0;
    let totalPercentageSum = 0;
    let totalAttemptedParticipations = 0;

    for (const session of sessions) {
      const sessionEnrollmentCount = await db.enrollment.count({
        where: { courseId: session.courseId },
      });
      totalPossibleAttendance += sessionEnrollmentCount;

      for (const part of session.participations) {
        if (part.isPresent) {
          totalAttendanceCount++;
        }
        if (part.hasAttempted) {
          attemptedStudentIds.add(part.studentId);
          if (part.percentage !== null && part.percentage !== undefined) {
            totalPercentageSum += part.percentage;
            totalAttemptedParticipations++;
          }
        }
      }
    }

    const totalStudentsAttempted = attemptedStudentIds.size;
    const totalStudentsNotAttempted = Math.max(0, totalStudents - totalStudentsAttempted);

    const overallAttendancePercentage =
      totalPossibleAttendance > 0 ? (totalAttendanceCount / totalPossibleAttendance) * 100 : 0;

    const overallTopicUnderstandingPercentage =
      totalAttemptedParticipations > 0 ? totalPercentageSum / totalAttemptedParticipations : 0;

    return {
      totalSessionsCreated,
      activeSessions,
      completedSessions,
      totalAssignedSubjects,
      totalStudents,
      totalStudentsAttempted,
      totalStudentsNotAttempted,
      overallAttendancePercentage: Math.round(overallAttendancePercentage * 100) / 100,
      overallTopicUnderstandingPercentage: Math.round(overallTopicUnderstandingPercentage * 100) / 100,
    };
  }

  /**
   * 2. SESSION SUMMARY - List
   */
  static async listSessionSummaries(
    userId: string,
    query: ValidatedSessionSummaryQuery
  ): Promise<PaginatedSessionSummariesResponse> {
    const profile = await this.getFacultyProfile(userId);

    const where: Prisma.PulseSessionWhereInput = {
      facultyId: profile.id,
      status: {
        in: [PulseSessionStatus.COMPLETED, PulseSessionStatus.CLOSED, PulseSessionStatus.ARCHIVED],
      },
    };

    if (query.courseId) where.courseId = query.courseId;
    if (query.topicId) where.topicId = query.topicId;

    if (query.dateFrom || query.dateTo) {
      where.date = {};
      if (query.dateFrom) where.date.gte = new Date(query.dateFrom);
      if (query.dateTo) where.date.lte = new Date(query.dateTo);
    }

    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { course: { name: { contains: query.search, mode: 'insensitive' } } },
        { topic: { topicName: { contains: query.search, mode: 'insensitive' } } },
      ];
    }

    const total = await db.pulseSession.count({ where });
    const skip = (query.page - 1) * query.limit;

    const sessions = await db.pulseSession.findMany({
      where,
      include: {
        course: true,
        topic: true,
        participations: true,
      },
      orderBy: { date: 'desc' },
      skip,
      take: query.limit,
    });

    const data: SessionSummaryListItem[] = [];

    for (const session of sessions) {
      const totalStudents = await db.enrollment.count({
        where: { courseId: session.courseId, semester: session.semester },
      });

      const attemptedParts = session.participations.filter((p) => p.hasAttempted);
      const studentsAttempted = attemptedParts.length;
      const studentsNotAttempted = Math.max(0, totalStudents - studentsAttempted);
      const attendanceCount = session.participations.filter((p) => p.isPresent).length;
      const attendancePercentage = totalStudents > 0 ? (attendanceCount / totalStudents) * 100 : 0;

      const scores = attemptedParts.map((p) => p.score ?? 0);
      const averageScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : null;
      const highestScore = scores.length > 0 ? Math.max(...scores) : null;
      const lowestScore = scores.length > 0 ? Math.min(...scores) : null;

      data.push({
        sessionId: session.id,
        sessionName: session.title,
        subject: session.course.name,
        topic: session.topic.topicName,
        date: session.date,
        durationMinutes: session.durationMinutes,
        totalStudents,
        studentsAttempted,
        studentsNotAttempted,
        attendanceCount,
        attendancePercentage: Math.round(attendancePercentage * 100) / 100,
        averageScore: averageScore !== null ? Math.round(averageScore * 100) / 100 : null,
        highestScore: highestScore !== null ? Math.round(highestScore * 100) / 100 : null,
        lowestScore: lowestScore !== null ? Math.round(lowestScore * 100) / 100 : null,
      });
    }

    return {
      data,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit) || 1,
      },
    };
  }

  /**
   * 2. SESSION SUMMARY - Get Single
   */
  static async getSessionSummary(userId: string, sessionId: string): Promise<SessionSummaryResponse> {
    const profile = await this.getFacultyProfile(userId);

    const session = await db.pulseSession.findUnique({
      where: { id: sessionId },
      include: {
        course: true,
        topic: true,
        questions: {
          include: {
            answers: true,
          },
          orderBy: { questionNumber: 'asc' },
        },
        participations: {
          include: {
            answers: true,
          },
        },
      },
    });

    if (!session) {
      throw new NotFoundError('Session not found.');
    }

    if (session.facultyId !== profile.id) {
      throw new ForbiddenError('You do not have permission to view analytics for this session.');
    }

    const totalStudents = await db.enrollment.count({
      where: { courseId: session.courseId, semester: session.semester },
    });

    const attemptedParts = session.participations.filter((p) => p.hasAttempted);
    const studentsAttempted = attemptedParts.length;
    const studentsNotAttempted = Math.max(0, totalStudents - studentsAttempted);
    const attendanceCount = session.participations.filter((p) => p.isPresent).length;
    const attendancePercentage = totalStudents > 0 ? (attendanceCount / totalStudents) * 100 : 0;

    const scores = attemptedParts.map((p) => p.score ?? 0);
    const averageScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : null;
    const highestScore = scores.length > 0 ? Math.max(...scores) : null;
    const lowestScore = scores.length > 0 ? Math.min(...scores) : null;

    // Question-wise statistics
    const questionWiseStatistics = session.questions.map((q) => {
      const totalAttempts = q.answers.length;
      const correctAnswers = q.answers.filter((a) => a.isCorrect).length;
      const accuracyPercentage = totalAttempts > 0 ? (correctAnswers / totalAttempts) * 100 : 0;
      const validTimes = q.answers.filter((a) => a.timeTakenSeconds !== null).map((a) => a.timeTakenSeconds as number);
      const avgTime = validTimes.length > 0 ? validTimes.reduce((a, b) => a + b, 0) / validTimes.length : null;

      return {
        questionId: q.id,
        questionNumber: q.questionNumber,
        questionText: q.questionText,
        totalAttempts,
        correctAnswers,
        accuracyPercentage: Math.round(accuracyPercentage * 100) / 100,
        averageTimeTakenSeconds: avgTime !== null ? Math.round(avgTime) : null,
      };
    });

    // Time taken statistics
    const validPartTimes = attemptedParts
      .filter((p) => p.timeTakenSeconds !== null)
      .map((p) => p.timeTakenSeconds as number);
    const avgTimeTaken =
      validPartTimes.length > 0 ? validPartTimes.reduce((a, b) => a + b, 0) / validPartTimes.length : null;
    const minTimeTaken = validPartTimes.length > 0 ? Math.min(...validPartTimes) : null;
    const maxTimeTaken = validPartTimes.length > 0 ? Math.max(...validPartTimes) : null;

    return {
      sessionId: session.id,
      sessionName: session.title,
      subject: session.course.name,
      topic: session.topic.topicName,
      date: session.date,
      durationMinutes: session.durationMinutes,
      totalStudents,
      studentsAttempted,
      studentsNotAttempted,
      attendanceCount,
      attendancePercentage: Math.round(attendancePercentage * 100) / 100,
      averageScore: averageScore !== null ? Math.round(averageScore * 100) / 100 : null,
      highestScore: highestScore !== null ? Math.round(highestScore * 100) / 100 : null,
      lowestScore: lowestScore !== null ? Math.round(lowestScore * 100) / 100 : null,
      questionWiseStatistics,
      timeTakenStatistics: {
        averageSeconds: avgTimeTaken !== null ? Math.round(avgTimeTaken) : null,
        minSeconds: minTimeTaken,
        maxSeconds: maxTimeTaken,
      },
    };
  }

  /**
   * 3. CONCEPT GAP ANALYSIS
   */
  static async getConceptGapAnalysis(userId: string): Promise<ConceptGapAnalysisResponse> {
    const profile = await this.getFacultyProfile(userId);

    const sessions = await db.pulseSession.findMany({
      where: {
        facultyId: profile.id,
        status: {
          in: [PulseSessionStatus.COMPLETED, PulseSessionStatus.CLOSED, PulseSessionStatus.ARCHIVED],
        },
      },
      include: {
        course: true,
        topic: true,
        questions: {
          include: {
            answers: true,
          },
        },
        participations: true,
      },
    });

    const topicMap = new Map<string, { topicName: string; subjectName: string; totalPercentage: number; count: number }>();
    const questionList: QuestionGapStatistic[] = [];

    let totalEnrolledAcrossSessions = 0;
    let totalAttemptedAcrossSessions = 0;
    let overallPercentageSum = 0;
    let overallAttemptCount = 0;

    for (const session of sessions) {
      const enrolled = await db.enrollment.count({ where: { courseId: session.courseId } });
      totalEnrolledAcrossSessions += enrolled;

      const attemptedParts = session.participations.filter((p) => p.hasAttempted);
      totalAttemptedAcrossSessions += attemptedParts.length;

      for (const part of attemptedParts) {
        if (part.percentage !== null && part.percentage !== undefined) {
          overallPercentageSum += part.percentage;
          overallAttemptCount++;

          let existingTopic = topicMap.get(session.topicId);
          if (!existingTopic) {
            existingTopic = {
              topicName: session.topic.topicName,
              subjectName: session.course.name,
              totalPercentage: 0,
              count: 0,
            };
            topicMap.set(session.topicId, existingTopic);
          }
          existingTopic.totalPercentage += part.percentage;
          existingTopic.count += 1;
        }
      }

      for (const q of session.questions) {
        const attempts = q.answers.length;
        const correct = q.answers.filter((a) => a.isCorrect).length;
        const accuracy = attempts > 0 ? (correct / attempts) * 100 : 0;
        if (attempts > 0) {
          questionList.push({
            questionId: q.id,
            questionText: q.questionText,
            sessionName: session.title,
            subjectName: session.course.name,
            accuracyPercentage: Math.round(accuracy * 100) / 100,
            totalAttempts: attempts,
          });
        }
      }
    }

    const allTopics: TopicGapStatistic[] = Array.from(topicMap.entries()).map(([topicId, data]) => ({
      topicId,
      topicName: data.topicName,
      subjectName: data.subjectName,
      averageScorePercentage: Math.round((data.totalPercentage / data.count) * 100) / 100,
      totalAttempts: data.count,
    }));

    // Split topics by understanding threshold (75%)
    const stronglyUnderstoodTopics = allTopics
      .filter((t) => t.averageScorePercentage >= 75)
      .sort((a, b) => b.averageScorePercentage - a.averageScorePercentage);

    const weaklyUnderstoodTopics = allTopics
      .filter((t) => t.averageScorePercentage < 75)
      .sort((a, b) => a.averageScorePercentage - b.averageScorePercentage);

    const questionsWithLowestAccuracy = [...questionList]
      .sort((a, b) => a.accuracyPercentage - b.accuracyPercentage)
      .slice(0, 5);

    const questionsWithHighestAccuracy = [...questionList]
      .sort((a, b) => b.accuracyPercentage - a.accuracyPercentage)
      .slice(0, 5);

    const studentParticipationPercentage =
      totalEnrolledAcrossSessions > 0 ? (totalAttemptedAcrossSessions / totalEnrolledAcrossSessions) * 100 : 0;

    const overallTopicUnderstandingPercentage =
      overallAttemptCount > 0 ? overallPercentageSum / overallAttemptCount : 0;

    return {
      stronglyUnderstoodTopics,
      weaklyUnderstoodTopics,
      questionsWithLowestAccuracy,
      questionsWithHighestAccuracy,
      studentParticipationPercentage: Math.round(studentParticipationPercentage * 100) / 100,
      overallTopicUnderstandingPercentage: Math.round(overallTopicUnderstandingPercentage * 100) / 100,
    };
  }

  /**
   * 4. REPORTS - Attendance Report
   */
  static async getAttendanceReport(
    userId: string,
    query: ValidatedReportQuery
  ): Promise<PaginatedReportResponse<AttendanceReportItem>> {
    const profile = await this.getFacultyProfile(userId);

    const where: Prisma.PulseSessionWhereInput = {
      facultyId: profile.id,
    };

    if (query.courseId) where.courseId = query.courseId;
    if (query.semester) where.semester = query.semester;
    if (query.section) where.section = query.section;

    if (query.dateFrom || query.dateTo) {
      where.date = {};
      if (query.dateFrom) where.date.gte = new Date(query.dateFrom);
      if (query.dateTo) where.date.lte = new Date(query.dateTo);
    }

    const total = await db.pulseSession.count({ where });
    const skip = (query.page - 1) * query.limit;

    const sessions = await db.pulseSession.findMany({
      where,
      include: {
        course: true,
        participations: true,
      },
      orderBy: { date: 'desc' },
      skip,
      take: query.limit,
    });

    const data: AttendanceReportItem[] = [];

    for (const session of sessions) {
      const totalStudents = await db.enrollment.count({
        where: { courseId: session.courseId, semester: session.semester },
      });

      const present = session.participations.filter((p) => p.isPresent).length;
      const absent = Math.max(0, totalStudents - present);
      const attendancePercentage = totalStudents > 0 ? (present / totalStudents) * 100 : 0;

      data.push({
        sessionId: session.id,
        sessionName: session.title,
        subject: session.course.name,
        date: session.date,
        totalStudents,
        present,
        absent,
        attendancePercentage: Math.round(attendancePercentage * 100) / 100,
      });
    }

    return {
      data,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit) || 1,
      },
    };
  }

  /**
   * 4. REPORTS - Understanding Report
   */
  static async getUnderstandingReport(
    userId: string,
    query: ValidatedReportQuery
  ): Promise<PaginatedReportResponse<UnderstandingReportItem>> {
    const profile = await this.getFacultyProfile(userId);

    const where: Prisma.PulseSessionWhereInput = {
      facultyId: profile.id,
      status: {
        in: [PulseSessionStatus.COMPLETED, PulseSessionStatus.CLOSED, PulseSessionStatus.ARCHIVED],
      },
    };

    if (query.courseId) where.courseId = query.courseId;
    if (query.semester) where.semester = query.semester;
    if (query.section) where.section = query.section;

    if (query.dateFrom || query.dateTo) {
      where.date = {};
      if (query.dateFrom) where.date.gte = new Date(query.dateFrom);
      if (query.dateTo) where.date.lte = new Date(query.dateTo);
    }

    // Grouping by topicId across matching sessions
    const sessions = await db.pulseSession.findMany({
      where,
      include: {
        course: true,
        topic: true,
        participations: true,
      },
      orderBy: { date: 'desc' },
    });

    const topicMap = new Map<
      string,
      {
        topicId: string;
        subject: string;
        topic: string;
        scores: number[];
        percentages: number[];
      }
    >();

    for (const session of sessions) {
      let existing = topicMap.get(session.topicId);
      if (!existing) {
        existing = {
          topicId: session.topicId,
          subject: session.course.name,
          topic: session.topic.topicName,
          scores: [],
          percentages: [],
        };
        topicMap.set(session.topicId, existing);
      }

      for (const part of session.participations) {
        if (part.hasAttempted && part.score !== null && part.score !== undefined) {
          existing.scores.push(part.score);
          if (part.percentage !== null && part.percentage !== undefined) {
            existing.percentages.push(part.percentage);
          }
        }
      }
    }

    const allItems: UnderstandingReportItem[] = Array.from(topicMap.values()).map((item) => {
      const avgScore = item.scores.length > 0 ? item.scores.reduce((a, b) => a + b, 0) / item.scores.length : null;
      const highestScore = item.scores.length > 0 ? Math.max(...item.scores) : null;
      const lowestScore = item.scores.length > 0 ? Math.min(...item.scores) : null;
      const topicUnderstandingPercentage =
        item.percentages.length > 0
          ? item.percentages.reduce((a, b) => a + b, 0) / item.percentages.length
          : 0;

      return {
        topicId: item.topicId,
        subject: item.subject,
        topic: item.topic,
        averageScore: avgScore !== null ? Math.round(avgScore * 100) / 100 : null,
        highestScore: highestScore !== null ? Math.round(highestScore * 100) / 100 : null,
        lowestScore: lowestScore !== null ? Math.round(lowestScore * 100) / 100 : null,
        topicUnderstandingPercentage: Math.round(topicUnderstandingPercentage * 100) / 100,
      };
    });

    const total = allItems.length;
    const skip = (query.page - 1) * query.limit;
    const paginatedData = allItems.slice(skip, skip + query.limit);

    return {
      data: paginatedData,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit) || 1,
      },
    };
  }

  /**
   * 5. DASHBOARD CHART DATA
   */
  static async getChartData(userId: string, chartType: ValidatedChartType): Promise<ChartDataResponse> {
    const profile = await this.getFacultyProfile(userId);

    const sessions = await db.pulseSession.findMany({
      where: {
        facultyId: profile.id,
      },
      include: {
        course: true,
        topic: true,
        participations: true,
      },
      orderBy: { date: 'asc' },
    });

    switch (chartType) {
      case 'attendance-trend': {
        const trend = [];
        for (const s of sessions) {
          const totalStudents = await db.enrollment.count({ where: { courseId: s.courseId } });
          const present = s.participations.filter((p) => p.isPresent).length;
          const percentage = totalStudents > 0 ? (present / totalStudents) * 100 : 0;
          trend.push({
            date: s.date.toISOString().split('T')[0],
            sessionName: s.title,
            attendancePercentage: Math.round(percentage * 100) / 100,
          });
        }
        return trend;
      }

      case 'average-score-trend': {
        const trend = [];
        for (const s of sessions) {
          const attempted = s.participations.filter((p) => p.hasAttempted && p.score !== null);
          const avgScore =
            attempted.length > 0
              ? attempted.reduce((sum, p) => sum + (p.score as number), 0) / attempted.length
              : 0;
          trend.push({
            date: s.date.toISOString().split('T')[0],
            sessionName: s.title,
            averageScore: Math.round(avgScore * 100) / 100,
          });
        }
        return trend;
      }

      case 'topic-understanding-trend': {
        const topicMap = new Map<string, { topic: string; subject: string; sum: number; count: number }>();
        for (const s of sessions) {
          const attempted = s.participations.filter((p) => p.hasAttempted && p.percentage !== null);
          if (attempted.length > 0) {
            let existing = topicMap.get(s.topicId);
            if (!existing) {
              existing = {
                topic: s.topic.topicName,
                subject: s.course.name,
                sum: 0,
                count: 0,
              };
              topicMap.set(s.topicId, existing);
            }
            const sessionAvgPct = attempted.reduce((sum, p) => sum + (p.percentage as number), 0) / attempted.length;
            existing.sum += sessionAvgPct;
            existing.count += 1;
          }
        }
        return Array.from(topicMap.values()).map((item) => ({
          topic: item.topic,
          subject: item.subject,
          understandingPercentage: Math.round((item.sum / item.count) * 100) / 100,
        }));
      }

      case 'session-count-per-subject': {
        const subjectMap = new Map<string, number>();
        for (const s of sessions) {
          const name = s.course.name;
          subjectMap.set(name, (subjectMap.get(name) || 0) + 1);
        }
        return Array.from(subjectMap.entries()).map(([subject, sessionCount]) => ({
          subject,
          sessionCount,
        }));
      }

      case 'participation-trend': {
        const trend = [];
        for (const s of sessions) {
          const totalStudents = await db.enrollment.count({ where: { courseId: s.courseId } });
          const attempted = s.participations.filter((p) => p.hasAttempted).length;
          const percentage = totalStudents > 0 ? (attempted / totalStudents) * 100 : 0;
          trend.push({
            date: s.date.toISOString().split('T')[0],
            sessionName: s.title,
            participationPercentage: Math.round(percentage * 100) / 100,
          });
        }
        return trend;
      }
    }
  }
}
