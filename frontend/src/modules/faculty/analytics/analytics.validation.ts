import { z } from 'zod';

export const sessionSummaryQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
  courseId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid course ID format').optional(),
  topicId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid topic ID format').optional(),
  dateFrom: z.string().refine((val) => !val || !isNaN(Date.parse(val)), 'Invalid dateFrom format').optional(),
  dateTo: z.string().refine((val) => !val || !isNaN(Date.parse(val)), 'Invalid dateTo format').optional(),
});

export const reportQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  courseId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid course ID format').optional(),
  section: z.string().optional(),
  semester: z.coerce.number().int().min(1).max(8).optional(),
  dateFrom: z.string().refine((val) => !val || !isNaN(Date.parse(val)), 'Invalid dateFrom format').optional(),
  dateTo: z.string().refine((val) => !val || !isNaN(Date.parse(val)), 'Invalid dateTo format').optional(),
});

export const chartTypeSchema = z.enum([
  'attendance-trend',
  'average-score-trend',
  'topic-understanding-trend',
  'session-count-per-subject',
  'participation-trend',
] as const);

export type ValidatedSessionSummaryQuery = z.infer<typeof sessionSummaryQuerySchema>;
export type ValidatedReportQuery = z.infer<typeof reportQuerySchema>;
export type ValidatedChartType = z.infer<typeof chartTypeSchema>;
