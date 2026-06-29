import { z } from 'zod';

/**
 * Validation schema for creating a section.
 */
export const createSectionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Section name is required.')
    .max(20, 'Section name cannot exceed 20 characters.'),

  semesterId: z
    .string()
    .uuid('Semester ID must be a valid UUID.'),
});

export type CreateSectionInput = z.infer<
  typeof createSectionSchema
>;

/**
 * Validation schema for updating a section.
 */
export const updateSectionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Section name is required.')
    .max(20, 'Section name cannot exceed 20 characters.')
    .optional(),

  semesterId: z
    .string()
    .uuid('Semester ID must be a valid UUID.')
    .optional(),
});

export type UpdateSectionInput = z.infer<
  typeof updateSectionSchema
>;