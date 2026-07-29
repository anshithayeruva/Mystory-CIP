import { z } from 'zod';

export const updateProfileSchema = z.object({
  fullName: z.string().min(1, 'Full name cannot be empty').optional(),
  firstName: z.string().min(1, 'First name cannot be empty').optional(),
  lastName: z.string().optional(),
  contactNumber: z
    .string()
    .refine((val) => val === '' || /^\+?[\d\s-]{7,15}$/.test(val), {
      message: 'Invalid phone number format',
    })
    .optional()
    .nullable(),
  phoneNumber: z
    .string()
    .refine((val) => val === '' || /^\+?[\d\s-]{7,15}$/.test(val), {
      message: 'Invalid phone number format',
    })
    .optional()
    .nullable(),
  profilePicture: z
    .string()
    .refine((val) => val === '' || z.string().url().safeParse(val).success, {
      message: 'Invalid profile picture URL format',
    })
    .optional()
    .nullable(),
  officeLocation: z.string().max(100, 'Office location cannot exceed 100 characters').optional().nullable(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters long'),
});

export const assignedSubjectsQuerySchema = z.object({
  search: z.string().optional(),
  programId: z.string().optional(),
  semester: z
    .union([z.string(), z.number()])
    .optional()
    .transform((val) => (val ? Number(val) : undefined)),
  departmentId: z.string().optional(),
  page: z
    .union([z.string(), z.number()])
    .optional()
    .default(1)
    .transform((val) => Math.max(1, Number(val) || 1)),
  limit: z
    .union([z.string(), z.number()])
    .optional()
    .default(10)
    .transform((val) => Math.min(100, Math.max(1, Number(val) || 10))),
});
