import {
  PulseSessionType,
  PulseQuestionType,
  PulseDifficultyLevel,
  PulseAttendanceRule,
  PulseResultVisibility,
} from '@prisma/client';

export {
  PulseSessionType,
  PulseQuestionType,
  PulseDifficultyLevel,
  PulseAttendanceRule,
  PulseResultVisibility,
};

/**
 * Data Transfer Object for creating a Classroom Pulse Session.
 */
export interface CreatePulseSessionDTO {
  courseId: string;
  topicId: string;
  departmentId: string;
  programId?: string;
  semester: number;
  section: string;
  sessionType: PulseSessionType;
  title: string;
  description?: string;
  date: string | Date;
  startTime: string;
  durationMinutes: number;
  questionCount: number;
  questionType: PulseQuestionType;
  difficultyLevel: PulseDifficultyLevel;
  attendanceRule: PulseAttendanceRule;
  resultVisibility: PulseResultVisibility;
}

/**
 * Data Transfer Object for updating a Classroom Pulse Session.
 */
export interface UpdatePulseSessionDTO {
  courseId?: string;
  topicId?: string;
  departmentId?: string;
  programId?: string;
  semester?: number;
  section?: string;
  sessionType?: PulseSessionType;
  title?: string;
  description?: string;
  date?: string | Date;
  startTime?: string;
  durationMinutes?: number;
  questionCount?: number;
  questionType?: PulseQuestionType;
  difficultyLevel?: PulseDifficultyLevel;
  attendanceRule?: PulseAttendanceRule;
  resultVisibility?: PulseResultVisibility;
}

/**
 * Query parameters for listing pulse sessions with search, filter, and pagination.
 */
export interface PulseSessionQueryDTO {
  page?: number;
  limit?: number;
  search?: string;
  courseId?: string;
  topicId?: string;
  sessionType?: PulseSessionType;
  difficultyLevel?: PulseDifficultyLevel;
  date?: string;
}

/**
 * Response structure for a Classroom Pulse Session.
 */
export interface PulseSessionResponse {
  id: string;
  courseId: string;
  topicId: string;
  departmentId: string;
  programId: string | null;
  semester: number;
  section: string;
  facultyId: string;
  sessionType: PulseSessionType;
  title: string;
  description: string | null;
  date: Date;
  startTime: string;
  durationMinutes: number;
  questionCount: number;
  questionType: PulseQuestionType;
  difficultyLevel: PulseDifficultyLevel;
  attendanceRule: PulseAttendanceRule;
  resultVisibility: PulseResultVisibility;
  createdAt: Date;
  updatedAt: Date;
  course?: {
    id: string;
    name: string;
    code: string;
  };
  topic?: {
    id: string;
    topicName: string;
    unitId: string;
  };
  department?: {
    id: string;
    name: string;
    code: string;
  };
}

/**
 * Response structure for paginated list of pulse sessions.
 */
export interface PulseSessionListResponse {
  sessions: PulseSessionResponse[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
