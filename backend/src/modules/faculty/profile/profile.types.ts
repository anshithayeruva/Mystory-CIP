import { FacultyStatus } from '@prisma/client';

export interface AssignedSubjectInfo {
  id: string; // FacultyCourse ID
  courseId: string;
  subjectName: string;
  subjectCode: string;
  department: string;
  program: string | null;
  semester: number;
  totalSessionsCreated: number;
  activeSessions: number;
  completedSessions: number;
}

export interface FacultyProfileResponse {
  facultyId: string;
  fullName: string;
  email: string;
  employeeId: string;
  department: {
    id: string;
    name: string;
    code: string;
  };
  designation: string;
  assignedSubjects: AssignedSubjectInfo[];
  profilePicture: string | null;
  contactNumber: string | null;
  officeLocation: string | null;
  accountStatus: FacultyStatus;
  dateJoined: Date;
}

export interface UpdateProfileInput {
  fullName?: string;
  firstName?: string;
  lastName?: string;
  contactNumber?: string | null;
  phoneNumber?: string | null;
  profilePicture?: string | null;
  officeLocation?: string | null;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export interface AssignedSubjectsQueryDTO {
  search?: string;
  programId?: string;
  semester?: number;
  departmentId?: string;
  page?: number;
  limit?: number;
}

export interface AssignedSubjectsListResponse {
  data: AssignedSubjectInfo[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ProfileDashboardSummary {
  totalAssignedSubjects: number;
  totalSessionsCreated: number;
  totalActiveSessions: number;
  totalCompletedSessions: number;
  lastLogin: Date | null;
  profileCompletionPercentage: number;
}
