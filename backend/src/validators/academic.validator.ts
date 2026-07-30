import { z } from 'zod';

export const createDepartmentSchema = z.object({
  name: z.string().min(2, "Department name must be at least 2 characters"),
  hodName: z.string().optional(),
  description: z.string().optional(),
});

export const createProgramSchema = z.object({
  name: z.string().min(2, "Program name must be at least 2 characters"),
  departmentName: z.string().min(2, "Department name is required"),
  degreeLevel: z.string().min(2, "Degree level is required"),
  duration: z.string().min(2, "Duration is required"),
  intake: z.number().int().positive().optional().or(z.string().regex(/^\d+$/).transform(Number).optional()).or(z.literal("")),
  description: z.string().optional(),
});
