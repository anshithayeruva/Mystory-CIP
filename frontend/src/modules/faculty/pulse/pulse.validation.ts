import { z } from 'zod';
import {
  PulseSessionType,
  PulseQuestionType,
  PulseDifficultyLevel,
  PulseAttendanceRule,
  PulseResultVisibility,
  PulseSessionStatus,
} from '@prisma/client';

/**
 * Validation schema for creating a Classroom Pulse Session.
 */
export const createPulseSessionSchema = z.object({
  courseId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Course ID must be a valid 24-character MongoDB ObjectId.'),

  topicId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Topic ID must be a valid 24-character MongoDB ObjectId.'),

  departmentId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Department ID must be a valid 24-character MongoDB ObjectId.'),

  programId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Program ID must be a valid 24-character MongoDB ObjectId.')
    .optional(),

  semester: z
    .number()
    .int('Semester must be a whole number.')
    .min(1, 'Semester must be at least 1.')
    .max(12, 'Semester cannot exceed 12.'),

  section: z
    .string()
    .trim()
    .min(1, 'Section is required.')
    .max(10, 'Section cannot exceed 10 characters.'),

  sessionType: z.nativeEnum(PulseSessionType, {
    message: 'Invalid pulse session type.',
  }),

  title: z
    .string()
    .trim()
    .min(3, 'Session title must be at least 3 characters long.')
    .max(200, 'Session title cannot exceed 200 characters.'),

  description: z
    .string()
    .trim()
    .max(1000, 'Description cannot exceed 1000 characters.')
    .optional(),

  date: z
    .coerce
    .date({
      message: 'Invalid session date.',
    })
    .refine((date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    }, {
      message: 'Session date cannot be in the past.',
    }),

  startTime: z
    .string()
    .trim()
    .min(1, 'Start time is required.')
    .max(20, 'Start time cannot exceed 20 characters.'),

  durationMinutes: z
    .number()
    .int('Duration must be a whole number in minutes.')
    .min(1, 'Duration must be greater than 0 minutes.')
    .max(480, 'Duration cannot exceed 480 minutes (8 hours).'),

  questionCount: z
    .number()
    .int('Question count must be a whole number.')
    .min(1, 'Question count must be greater than 0.')
    .max(200, 'Question count cannot exceed 200.'),

  questionType: z.nativeEnum(PulseQuestionType, {
    message: 'Invalid question type.',
  }),

  difficultyLevel: z.nativeEnum(PulseDifficultyLevel, {
    message: 'Invalid difficulty level.',
  }),

  attendanceRule: z.nativeEnum(PulseAttendanceRule, {
    message: 'Invalid attendance rule.',
  }),

  resultVisibility: z.nativeEnum(PulseResultVisibility, {
    message: 'Invalid result visibility.',
  }),
});

export type CreatePulseSessionInput = z.infer<typeof createPulseSessionSchema>;

/**
 * Validation schema for updating a Classroom Pulse Session.
 */
export const updatePulseSessionSchema = z.object({
  courseId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Course ID must be a valid 24-character MongoDB ObjectId.')
    .optional(),

  topicId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Topic ID must be a valid 24-character MongoDB ObjectId.')
    .optional(),

  departmentId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Department ID must be a valid 24-character MongoDB ObjectId.')
    .optional(),

  programId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Program ID must be a valid 24-character MongoDB ObjectId.')
    .optional(),

  semester: z
    .number()
    .int('Semester must be a whole number.')
    .min(1, 'Semester must be at least 1.')
    .max(12, 'Semester cannot exceed 12.')
    .optional(),

  section: z
    .string()
    .trim()
    .min(1, 'Section is required.')
    .max(10, 'Section cannot exceed 10 characters.')
    .optional(),

  sessionType: z
    .nativeEnum(PulseSessionType, {
      message: 'Invalid pulse session type.',
    })
    .optional(),

  title: z
    .string()
    .trim()
    .min(3, 'Session title must be at least 3 characters long.')
    .max(200, 'Session title cannot exceed 200 characters.')
    .optional(),

  description: z
    .string()
    .trim()
    .max(1000, 'Description cannot exceed 1000 characters.')
    .optional(),

  date: z
    .coerce
    .date({
      message: 'Invalid session date.',
    })
    .refine((date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    }, {
      message: 'Session date cannot be in the past.',
    })
    .optional(),

  startTime: z
    .string()
    .trim()
    .min(1, 'Start time is required.')
    .max(20, 'Start time cannot exceed 20 characters.')
    .optional(),

  durationMinutes: z
    .number()
    .int('Duration must be a whole number in minutes.')
    .min(1, 'Duration must be greater than 0 minutes.')
    .max(480, 'Duration cannot exceed 480 minutes.')
    .optional(),

  questionCount: z
    .number()
    .int('Question count must be a whole number.')
    .min(1, 'Question count must be greater than 0.')
    .max(200, 'Question count cannot exceed 200.')
    .optional(),

  questionType: z
    .nativeEnum(PulseQuestionType, {
      message: 'Invalid question type.',
    })
    .optional(),

  difficultyLevel: z
    .nativeEnum(PulseDifficultyLevel, {
      message: 'Invalid difficulty level.',
    })
    .optional(),

  attendanceRule: z
    .nativeEnum(PulseAttendanceRule, {
      message: 'Invalid attendance rule.',
    })
    .optional(),

  resultVisibility: z
    .nativeEnum(PulseResultVisibility, {
      message: 'Invalid result visibility.',
    })
    .optional(),
});

export type UpdatePulseSessionInput = z.infer<typeof updatePulseSessionSchema>;

/**
 * Validation schema for querying/filtering pulse sessions.
 */
export const pulseSessionQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().optional(),
  courseId: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
  topicId: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
  sessionType: z.nativeEnum(PulseSessionType).optional(),
  difficultyLevel: z.nativeEnum(PulseDifficultyLevel).optional(),
  date: z.string().optional(),
  status: z.nativeEnum(PulseSessionStatus).optional(),
});

export type PulseSessionQueryInput = z.infer<typeof pulseSessionQuerySchema>;
