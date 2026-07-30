import { z } from 'zod';

export const SubjectSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  code: z.string().min(1, 'Code is required'),
});

export const PulseSessionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  courseId: z.string().min(1, 'Course ID is required'),
  date: z.string(), // Consider using z.date() or stricter string validation
});

export const ReportSchema = z.object({
  type: z.string().min(1, 'Report type is required'),
});

export const SettingsSchema = z.object({
  notifications: z.boolean().optional(),
  theme: z.string().optional(),
});

export const ProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phoneNumber: z.string().optional(),
});
