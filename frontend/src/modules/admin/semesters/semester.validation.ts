import { z } from 'zod';

/**
 * Validation schema for creating a semester.
 */
export const createSemesterSchema = z.object({
  semesterNumber: z
    .number()
    .int('Semester number must be an integer.')
    .min(1, 'Semester number must be at least 1.')
    .max(12, 'Semester number cannot exceed 12.'),

  programId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Program ID must be a valid 24-character MongoDB ObjectId.'),
});

export type CreateSemesterInput = z.infer<
  typeof createSemesterSchema
>;

/**
 * Validation schema for updating a semester.
 */
export const updateSemesterSchema = z.object({
  semesterNumber: z
    .number()
    .int('Semester number must be an integer.')
    .min(1, 'Semester number must be at least 1.')
    .max(12, 'Semester number cannot exceed 12.')
    .optional(),

  programId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Program ID must be a valid 24-character MongoDB ObjectId.')
    .optional(),
});

export type UpdateSemesterInput = z.infer<
  typeof updateSemesterSchema
>;