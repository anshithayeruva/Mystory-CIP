/**
 * TypeScript Data Transfer Objects (DTOs) and interfaces for Faculty Dashboard Analytics.
 */

export interface DashboardSummaryResponse {
  totalSessionsCreated: number;
  activeSessions: number;
  completedSessions: number;
  totalAssignedSubjects: number;
  totalStudents: number;
  totalStudentsAttempted: number;
  totalStudentsNotAttempted: number;
  overallAttendancePercentage: number;
  overallTopicUnderstandingPercentage: number;
}

export interface QuestionStatistic {
  questionId: string;
  questionNumber: number;
  questionText: string;
  totalAttempts: number;
  correctAnswers: number;
  accuracyPercentage: number;
  averageTimeTakenSeconds: number | null;
}

export interface TimeTakenStatistic {
  averageSeconds: number | null;
  minSeconds: number | null;
  maxSeconds: number | null;
}

export interface SessionSummaryResponse {
  sessionId: string;
  sessionName: string;
  subject: string;
  topic: string;
  date: string | Date;
  durationMinutes: number;
  totalStudents: number;
  studentsAttempted: number;
  studentsNotAttempted: number;
  attendanceCount: number;
  attendancePercentage: number;
  averageScore: number | null;
  highestScore: number | null;
  lowestScore: number | null;
  questionWiseStatistics: QuestionStatistic[];
  timeTakenStatistics: TimeTakenStatistic;
}

export interface SessionSummaryListItem {
  sessionId: string;
  sessionName: string;
  subject: string;
  topic: string;
  date: string | Date;
  durationMinutes: number;
  totalStudents: number;
  studentsAttempted: number;
  studentsNotAttempted: number;
  attendanceCount: number;
  attendancePercentage: number;
  averageScore: number | null;
  highestScore: number | null;
  lowestScore: number | null;
}

export interface PaginatedSessionSummariesResponse {
  data: SessionSummaryListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface TopicGapStatistic {
  topicId: string;
  topicName: string;
  subjectName: string;
  averageScorePercentage: number;
  totalAttempts: number;
}

export interface QuestionGapStatistic {
  questionId: string;
  questionText: string;
  sessionName: string;
  subjectName: string;
  accuracyPercentage: number;
  totalAttempts: number;
}

export interface ConceptGapAnalysisResponse {
  stronglyUnderstoodTopics: TopicGapStatistic[];
  weaklyUnderstoodTopics: TopicGapStatistic[];
  questionsWithLowestAccuracy: QuestionGapStatistic[];
  questionsWithHighestAccuracy: QuestionGapStatistic[];
  studentParticipationPercentage: number;
  overallTopicUnderstandingPercentage: number;
}

export interface AttendanceReportItem {
  sessionId: string;
  sessionName: string;
  subject: string;
  date: string | Date;
  totalStudents: number;
  present: number;
  absent: number;
  attendancePercentage: number;
}

export interface UnderstandingReportItem {
  topicId: string;
  subject: string;
  topic: string;
  averageScore: number | null;
  highestScore: number | null;
  lowestScore: number | null;
  topicUnderstandingPercentage: number;
}

export interface PaginatedReportResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type ChartType =
  | 'attendance-trend'
  | 'average-score-trend'
  | 'topic-understanding-trend'
  | 'session-count-per-subject'
  | 'participation-trend';

export interface AttendanceTrendPoint {
  date: string;
  sessionName: string;
  attendancePercentage: number;
}

export interface AverageScoreTrendPoint {
  date: string;
  sessionName: string;
  averageScore: number;
}

export interface TopicUnderstandingTrendPoint {
  topic: string;
  subject: string;
  understandingPercentage: number;
}

export interface SessionCountPerSubjectPoint {
  subject: string;
  sessionCount: number;
}

export interface ParticipationTrendPoint {
  date: string;
  sessionName: string;
  participationPercentage: number;
}

export type ChartDataResponse =
  | AttendanceTrendPoint[]
  | AverageScoreTrendPoint[]
  | TopicUnderstandingTrendPoint[]
  | SessionCountPerSubjectPoint[]
  | ParticipationTrendPoint[];

export interface SessionSummaryQuery {
  page?: number;
  limit?: number;
  search?: string;
  courseId?: string;
  topicId?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface ReportQuery {
  page?: number;
  limit?: number;
  courseId?: string;
  section?: string;
  semester?: number;
  dateFrom?: string;
  dateTo?: string;
}

export interface ConceptGapDashboardResponse {
  overallClassMastery: number;
  strongConceptsCount: number;
  needsImprovementCount: number;
  criticalGapsCount: number;
  conceptMasteryOverview: { conceptName: string; masteryPercentage: number; category: 'Strong' | 'Needs Improvement' | 'Critical' }[];
  studentPerformanceDistribution: { category: string; count: number; percentage: number; color: string }[];
  totalStudents: number;
}

export interface ConceptMasteryTrendResponse {
  trends: { conceptName: string; dataPoints: { date: string; masteryPercentage: number }[] }[];
}

export interface ConceptGapInsightsResponse {
  insights: string[];
}
