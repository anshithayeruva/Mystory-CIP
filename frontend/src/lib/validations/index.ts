import { z } from 'zod';
import { AttendanceStatus } from '@prisma/client';

/**
 * Authentication Validation Schemas
 */
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const studentRegisterSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  rollNumber: z.string().min(3, 'Roll number must be at least 3 characters long'),
  departmentId: z.string().uuid('Invalid department ID'),
  currentSemester: z.number().int().min(1).max(8),
  batch: z.string().regex(/^\d{4}-\d{4}$/, 'Batch must follow format YYYY-YYYY (e.g. 2023-2027)'),
});

export const facultyRegisterSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  employeeId: z.string().min(3, 'Employee ID is required'),
  designation: z.string().min(1, 'Designation is required'),
  departmentId: z.string().uuid('Invalid department ID'),
});

/**
 * Grading Validation Schema
 */
export const submitGradeSchema = z.object({
  enrollmentId: z.string().uuid('Invalid enrollment ID'),
  marks: z.number().min(0, 'Marks cannot be negative').max(100, 'Marks cannot exceed 100'),
  grade: z.string().min(1, 'Grade code is required (e.g., A, B, F)'),
  gpa: z.number().min(0.0).max(10.0), // Assuming 10-point GPA scale
});

/**
 * Attendance Submission Validation Schema
 */
export const attendanceRecordSchema = z.object({
  studentId: z.string().uuid('Invalid student ID'),
  date: z.string().datetime({ message: 'Invalid ISO date string' }),
  status: z.nativeEnum(AttendanceStatus, {
    message: 'Status must be PRESENT, ABSENT, LATE, or EXCUSED',
  }),
  remarks: z.string().optional(),
});

export const submitAttendanceSchema = z.object({
  courseId: z.string().uuid('Invalid course ID'),
  records: z.array(attendanceRecordSchema).min(1, 'At least one attendance record must be provided'),
});
