import { z } from 'zod';

export const hodDashboardQuerySchema = z.object({
  departmentId: z.string().optional(),
  academicYear: z.string().optional(),
  semester: z.string().optional(),
});

export const exportReportSchema = z.object({
  title: z.string().optional(),
  type: z.string().optional(),
  format: z.enum(['pdf', 'excel', 'csv']).optional().default('pdf'),
});

export const updateHodSettingsSchema = z.object({
  departmentName: z.string().min(2).optional(),
  departmentCode: z.string().min(2).optional(),
  academicYear: z.string().optional(),
  notifications: z.object({
    emailAlerts: z.boolean().optional(),
    sessionUpdates: z.boolean().optional(),
    weeklyReport: z.boolean().optional(),
  }).optional(),
});
