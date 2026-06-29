import { z } from "zod";

export const createDepartmentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Department name must be at least 2 characters long.")
    .max(100, "Department name cannot exceed 100 characters."),

  code: z
    .string()
    .trim()
    .toUpperCase()
    .min(2, "Department code must be at least 2 characters long.")
    .max(10, "Department code cannot exceed 10 characters.")
    .regex(
      /^[A-Z0-9_]+$/,
      "Department code can only contain uppercase letters, numbers, and underscores."
    ),
});

export type CreateDepartmentInput = z.infer<typeof createDepartmentSchema>;

/**
 * Validation schema for updating a department.
 * All fields are optional because the admin may update
 * only the name, only the code, or both.
 */
export const updateDepartmentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Department name must be at least 2 characters long.")
    .max(100, "Department name cannot exceed 100 characters.")
    .optional(),

  code: z
    .string()
    .trim()
    .toUpperCase()
    .min(2, "Department code must be at least 2 characters long.")
    .max(10, "Department code cannot exceed 10 characters.")
    .regex(
      /^[A-Z0-9_]+$/,
      "Department code can only contain uppercase letters, numbers, and underscores."
    )
    .optional(),
});

export type UpdateDepartmentInput = z.infer<typeof updateDepartmentSchema>;