import { StudentStatus } from '@prisma/client';

/**
 * Data Transfer Object for creating a student.
 */
export interface CreateStudentDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;

  rollNumber: string;
  registrationNumber: string;
  departmentId: string;
  programId: string;
  semesterId: string;
  sectionId: string;
  batch: string;
  currentSemester: number;
}

/**
 * Data Transfer Object for updating a student.
 */
export interface UpdateStudentDTO {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;

  rollNumber?: string;
  registrationNumber?: string;
  departmentId?: string;
  programId?: string;
  semesterId?: string;
  sectionId?: string;
  batch?: string;
  currentSemester?: number;
  status?: StudentStatus;
}

/**
 * Student response.
 */
export interface StudentResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string | null;

  rollNumber: string;
  registrationNumber: string | null;

  departmentId: string;
  programId: string | null;
  semesterId: string | null;
  sectionId: string | null;

  batch: string;
  currentSemester: number;
  status: StudentStatus;

  createdAt: Date;
  updatedAt: Date;
}