import { z } from 'zod';

/**
 * Validation schema for creating a subject (course).
 */
export const createSubjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Subject name must be at least 2 characters long.')
    .max(100, 'Subject name cannot exceed 100 characters.'),

  code: z
    .string()
    .trim()
    .toUpperCase()
    .min(2, 'Subject code must be at least 2 characters long.')
    .max(20, 'Subject code cannot exceed 20 characters.')
    .regex(
      /^[A-Z0-9_-]+$/,
      'Subject code can only contain uppercase letters, numbers, hyphens, and underscores.'
    ),

  credits: z
    .number()
    .int('Credits must be a whole number.')
    .min(1, 'Credits must be at least 1.')
    .max(20, 'Credits cannot exceed 20.'),

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
    .max(12, 'Semester cannot exceed 12.')
    .optional(),

  assignedFaculty: z
    .array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Faculty profile ID must be a valid MongoDB ObjectId.'))
    .optional(),
});

export type CreateSubjectInput = z.infer<typeof createSubjectSchema>;

/**
 * Validation schema for updating a subject (course).
 */
export const updateSubjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Subject name must be at least 2 characters long.')
    .max(100, 'Subject name cannot exceed 100 characters.')
    .optional(),

  code: z
    .string()
    .trim()
    .toUpperCase()
    .min(2, 'Subject code must be at least 2 characters long.')
    .max(20, 'Subject code cannot exceed 20 characters.')
    .regex(
      /^[A-Z0-9_-]+$/,
      'Subject code can only contain uppercase letters, numbers, hyphens, and underscores.'
    )
    .optional(),

  credits: z
    .number()
    .int('Credits must be a whole number.')
    .min(1, 'Credits must be at least 1.')
    .max(20, 'Credits cannot exceed 20.')
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

  assignedFaculty: z
    .array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Faculty profile ID must be a valid MongoDB ObjectId.'))
    .optional(),
});

export type UpdateSubjectInput = z.infer<typeof updateSubjectSchema>;

/**
 * Validation schema for creating a Course Outcome.
 */
export const courseOutcomeSchema = z.object({
  coNumber: z
    .string()
    .trim()
    .min(1, 'CO number is required.')
    .max(20, 'CO number cannot exceed 20 characters.'),

  title: z
    .string()
    .trim()
    .min(3, 'Title must be at least 3 characters long.')
    .max(150, 'Title cannot exceed 150 characters.'),

  description: z
    .string()
    .trim()
    .min(5, 'Description must be at least 5 characters long.')
    .max(1000, 'Description cannot exceed 1000 characters.'),
});

export type CourseOutcomeInput = z.infer<typeof courseOutcomeSchema>;

/**
 * Validation schema for updating a Course Outcome.
 */
export const updateCourseOutcomeSchema = z.object({
  coNumber: z
    .string()
    .trim()
    .min(1, 'CO number is required.')
    .max(20, 'CO number cannot exceed 20 characters.')
    .optional(),

  title: z
    .string()
    .trim()
    .min(3, 'Title must be at least 3 characters long.')
    .max(150, 'Title cannot exceed 150 characters.')
    .optional(),

  description: z
    .string()
    .trim()
    .min(5, 'Description must be at least 5 characters long.')
    .max(1000, 'Description cannot exceed 1000 characters.')
    .optional(),
});

export type UpdateCourseOutcomeInput = z.infer<typeof updateCourseOutcomeSchema>;

/**
 * Validation schema for creating a Unit.
 */
export const unitSchema = z.object({
  unitNumber: z
    .number()
    .int('Unit number must be a whole number.')
    .min(1, 'Unit number must be at least 1.'),

  unitName: z
    .string()
    .trim()
    .min(2, 'Unit name must be at least 2 characters long.')
    .max(150, 'Unit name cannot exceed 150 characters.'),

  description: z
    .string()
    .trim()
    .max(1000, 'Description cannot exceed 1000 characters.')
    .optional(),
});

export type UnitInput = z.infer<typeof unitSchema>;

/**
 * Validation schema for updating a Unit.
 */
export const updateUnitSchema = z.object({
  unitNumber: z
    .number()
    .int('Unit number must be a whole number.')
    .min(1, 'Unit number must be at least 1.')
    .optional(),

  unitName: z
    .string()
    .trim()
    .min(2, 'Unit name must be at least 2 characters long.')
    .max(150, 'Unit name cannot exceed 150 characters.')
    .optional(),

  description: z
    .string()
    .trim()
    .max(1000, 'Description cannot exceed 1000 characters.')
    .optional(),
});

export type UpdateUnitInput = z.infer<typeof updateUnitSchema>;

/**
 * Validation schema for creating a Topic.
 */
export const topicSchema = z.object({
  topicName: z
    .string()
    .trim()
    .min(2, 'Topic name must be at least 2 characters long.')
    .max(150, 'Topic name cannot exceed 150 characters.'),

  description: z
    .string()
    .trim()
    .max(1000, 'Description cannot exceed 1000 characters.')
    .optional(),
});

export type TopicInput = z.infer<typeof topicSchema>;

/**
 * Validation schema for updating a Topic.
 */
export const updateTopicSchema = z.object({
  topicName: z
    .string()
    .trim()
    .min(2, 'Topic name must be at least 2 characters long.')
    .max(150, 'Topic name cannot exceed 150 characters.')
    .optional(),

  description: z
    .string()
    .trim()
    .max(1000, 'Description cannot exceed 1000 characters.')
    .optional(),
});

export type UpdateTopicInput = z.infer<typeof updateTopicSchema>;

/**
 * Validation schema for uploading a Syllabus PDF.
 */
export const syllabusSchema = z.object({
  fileUrl: z
    .string()
    .url('File URL must be a valid URL.'),

  originalFileName: z
    .string()
    .trim()
    .min(1, 'Original file name is required.')
    .max(255, 'Original file name cannot exceed 255 characters.')
    .refine((name) => name.toLowerCase().endsWith('.pdf'), {
      message: 'Syllabus file must be a PDF.',
    }),
});

export type SyllabusInput = z.infer<typeof syllabusSchema>;

/**
 * Validation schema for querying/filtering subjects.
 */
export const subjectQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().optional(),
  programId: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
  semester: z.coerce.number().int().min(1).max(12).optional(),
  departmentId: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
});

export type SubjectQueryInput = z.infer<typeof subjectQuerySchema>;
