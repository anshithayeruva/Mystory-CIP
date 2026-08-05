import { z } from 'zod';

export const getStudentDashboardParams = z.object({
  studentId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid student ID format'),
});

export const exportReportBody = z.object({
  title: z.string().min(1, 'Title is required'),
  type: z.enum(['ATTENDANCE_ANALYTICS', 'CONCEPT_UNDERSTANDING']),
});

export const updateProfileBody = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  emergencyContact: z.string().optional(),
});

export const updateAcademicBody = z.object({
  learningMode: z.string().optional(),
});

export const updateNotificationsBody = z.object({
  timetableReminders: z.boolean().optional(),
  attendanceAlerts: z.boolean().optional(),
  resourceUploads: z.boolean().optional(),
  weeklyDigest: z.boolean().optional(),
});

export const updateSecurityBody = z.object({
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
  enable2FA: z.boolean().optional(),
});
