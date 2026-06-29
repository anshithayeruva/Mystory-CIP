import { z } from 'zod';

/**
 * Validation schema for creating a program.
 */
export const createProgramSchema = z.object({
  name: z
    .string()
    .trim()
    .min(
      2,
      'Program name must be at least 2 characters long.'
    )
    .max(
      100,
      'Program name cannot exceed 100 characters.'
    ),

  code: z
    .string()
    .trim()
    .toUpperCase()
    .min(
      2,
      'Program code must be at least 2 characters long.'
    )
    .max(
      10,
      'Program code cannot exceed 10 characters.'
    )
    .regex(
      /^[A-Z0-9_]+$/,
      'Program code can only contain uppercase letters, numbers, and underscores.'
    ),

  departmentId: z
    .string()
    .uuid('Department ID must be a valid UUID.'),
});

export type CreateProgramInput = z.infer<
  typeof createProgramSchema
>;

/**
 * Validation schema for updating a program.
 */
export const updateProgramSchema = z.object({
  name: z
    .string()
    .trim()
    .min(
      2,
      'Program name must be at least 2 characters long.'
    )
    .max(
      100,
      'Program name cannot exceed 100 characters.'
    )
    .optional(),

  code: z
    .string()
    .trim()
    .toUpperCase()
    .min(
      2,
      'Program code must be at least 2 characters long.'
    )
    .max(
      10,
      'Program code cannot exceed 10 characters.'
    )
    .regex(
      /^[A-Z0-9_]+$/,
      'Program code can only contain uppercase letters, numbers, and underscores.'
    )
    .optional(),

  departmentId: z
    .string()
    .uuid('Department ID must be a valid UUID.')
    .optional(),
});

export type UpdateProgramInput = z.infer<
  typeof updateProgramSchema
>;