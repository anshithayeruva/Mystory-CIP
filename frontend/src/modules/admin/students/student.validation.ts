import { StudentStatus } from '@prisma/client';
import { z } from 'zod';

/**
 * Validation schema for creating a student.
 */
export const createStudentSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address.'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.'),

  firstName: z
    .string()
    .trim()
    .min(2, 'First name must be at least 2 characters long.')
    .max(100, 'First name cannot exceed 100 characters.'),

  lastName: z
    .string()
    .trim()
    .min(2, 'Last name must be at least 2 characters long.')
    .max(100, 'Last name cannot exceed 100 characters.'),

  phoneNumber: z
    .string()
    .trim()
    .optional(),

  rollNumber: z
    .string()
    .trim()
    .min(2, 'Roll number is required.'),

  registrationNumber: z
    .string()
    .trim()
    .min(2, 'Registration number is required.'),

  departmentId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Department ID must be a valid 24-character MongoDB ObjectId.'),

  programId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Program ID must be a valid 24-character MongoDB ObjectId.'),

  semesterId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Semester ID must be a valid 24-character MongoDB ObjectId.'),

  sectionId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Section ID must be a valid 24-character MongoDB ObjectId.'),

  batch: z
    .string()
    .trim()
    .min(2, 'Batch is required.'),

  currentSemester: z
    .number()
    .int('Current semester must be a whole number.')
    .min(1, 'Semester must be at least 1.')
    .max(8, 'Semester cannot exceed 8.'),
});

export type CreateStudentInput = z.infer<
  typeof createStudentSchema
>;

/**
 * Validation schema for updating a student.
 */
export const updateStudentSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2)
    .max(100)
    .optional(),

  lastName: z
    .string()
    .trim()
    .min(2)
    .max(100)
    .optional(),

  phoneNumber: z
    .string()
    .trim()
    .optional(),

  rollNumber: z
    .string()
    .trim()
    .optional(),

  registrationNumber: z
    .string()
    .trim()
    .optional(),

  departmentId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Must be a valid 24-character MongoDB ObjectId.')
    .optional(),

  programId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Must be a valid 24-character MongoDB ObjectId.')
    .optional(),

  semesterId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Must be a valid 24-character MongoDB ObjectId.')
    .optional(),

  sectionId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Must be a valid 24-character MongoDB ObjectId.')
    .optional(),

  batch: z
    .string()
    .trim()
    .optional(),

  currentSemester: z
    .number()
    .int()
    .min(1)
    .max(8)
    .optional(),

  status: z
    .nativeEnum(StudentStatus)
    .optional(),
});

export type UpdateStudentInput = z.infer<
  typeof updateStudentSchema
>;