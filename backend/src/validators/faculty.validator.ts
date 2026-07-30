import { z } from 'zod';

export const SubjectQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  search: z.string().optional(),
  semester: z.string().optional(),
});

export const SubjectCreateSchema = z.object({
  name: z.string().min(1),
  code: z.string().min(1),
  credits: z.number().min(1),
  departmentId: z.string().min(1),
  description: z.string().optional(),
});

export const SubjectUpdateSchema = SubjectCreateSchema.partial();

export const PulseSessionCreateSchema = z.object({
  title: z.string().min(1),
  courseId: z.string().min(1),
  topicId: z.string().min(1),
  departmentId: z.string().min(1),
  sessionType: z.enum(['MID_CLASS_CHECK', 'END_OF_CLASS_CHECK', 'END_OF_DAY_REVIEW', 'WEEKLY_REVISION', 'LAB_UNDERSTANDING_CHECK', 'TUTORIAL_SESSION', 'REMEDIAL_SESSION', 'PLACEMENT_TRAINING_SESSION', 'CONTEST_PREPARATION_SESSION']),
  date: z.string(),
  startTime: z.string(),
  durationMinutes: z.number(),
  questionCount: z.number(),
  questionType: z.enum(['MCQ', 'TRUE_FALSE', 'SHORT_ANSWER']),
  difficultyLevel: z.enum(['EASY', 'MEDIUM', 'HARD', 'MIXED']),
  attendanceRule: z.enum(['ATTEMPT_REQUIRED', 'QR_ATTENDANCE_ONLY', 'BOTH']),
  resultVisibility: z.enum(['FACULTY_ONLY', 'STUDENTS_AFTER_SESSION', 'IMMEDIATE']),
  publishImmediately: z.boolean().optional()
});

export const PulseSessionUpdateSchema = PulseSessionCreateSchema.partial();

export const SettingsUpdateSchema = z.object({
  officeHours: z.string().optional(),
  bio: z.string().optional(),
  specialization: z.string().optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
});

export const ReportExportSchema = z.object({
  reportId: z.string().optional(),
  type: z.string(),
  format: z.enum(['PDF', 'CSV', 'EXCEL']).optional(),
  filters: z.any().optional()
});
