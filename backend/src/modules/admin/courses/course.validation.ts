import { z } from 'zod';

/**
 * Validation schema for creating a course.
 */
export const createCourseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Course name must be at least 2 characters long.')
    .max(100, 'Course name cannot exceed 100 characters.'),

  code: z
    .string()
    .trim()
    .toUpperCase()
    .min(2, 'Course code must be at least 2 characters long.')
    .max(10, 'Course code cannot exceed 10 characters.')
    .regex(
      /^[A-Z0-9_]+$/,
      'Course code can only contain uppercase letters, numbers, and underscores.'
    ),

  credits: z
    .number()
    .int('Credits must be a whole number.')
    .min(1, 'Credits must be at least 1.')
    .max(10, 'Credits cannot exceed 10.'),

  departmentId: z
    .string()
    .uuid('Department ID must be a valid UUID.'),
});

export type CreateCourseInput = z.infer<
  typeof createCourseSchema
>;

/**
 * Validation schema for updating a course.
 */
export const updateCourseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Course name must be at least 2 characters long.')
    .max(100, 'Course name cannot exceed 100 characters.')
    .optional(),

  code: z
    .string()
    .trim()
    .toUpperCase()
    .min(2, 'Course code must be at least 2 characters long.')
    .max(10, 'Course code cannot exceed 10 characters.')
    .regex(
      /^[A-Z0-9_]+$/,
      'Course code can only contain uppercase letters, numbers, and underscores.'
    )
    .optional(),

  credits: z
    .number()
    .int('Credits must be a whole number.')
    .min(1, 'Credits must be at least 1.')
    .max(10, 'Credits cannot exceed 10.')
    .optional(),

  departmentId: z
    .string()
    .uuid('Department ID must be a valid UUID.')
    .optional(),
});

export type UpdateCourseInput = z.infer<
  typeof updateCourseSchema
>;