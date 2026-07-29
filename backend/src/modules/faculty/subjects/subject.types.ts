/**
 * Data Transfer Object for creating a subject (course).
 */
export interface CreateSubjectDTO {
  name: string;
  code: string;
  credits: number;
  departmentId: string;
  programId?: string;
  semester?: number;
  assignedFaculty?: string[]; // Array of faculty profile IDs
}

/**
 * Data Transfer Object for updating a subject (course).
 */
export interface UpdateSubjectDTO {
  name?: string;
  code?: string;
  credits?: number;
  departmentId?: string;
  programId?: string;
  semester?: number;
  assignedFaculty?: string[];
}

/**
 * Data Transfer Object for creating/updating a Course Outcome.
 */
export interface CourseOutcomeDTO {
  coNumber: string; // e.g., "CO1", "CO2"
  title: string;
  description: string;
}

export interface UpdateCourseOutcomeDTO {
  coNumber?: string;
  title?: string;
  description?: string;
}

/**
 * Data Transfer Object for creating/updating a Unit.
 */
export interface UnitDTO {
  unitNumber: number;
  unitName: string;
  description?: string;
}

export interface UpdateUnitDTO {
  unitNumber?: number;
  unitName?: string;
  description?: string;
}

/**
 * Data Transfer Object for creating/updating a Topic.
 */
export interface TopicDTO {
  topicName: string;
  description?: string;
}

export interface UpdateTopicDTO {
  topicName?: string;
  description?: string;
}

/**
 * Data Transfer Object for uploading/attaching a Syllabus PDF.
 */
export interface SyllabusDTO {
  fileUrl: string;
  originalFileName: string;
}

/**
 * Query parameters for listing subjects with search, filter, and pagination.
 */
export interface SubjectQueryDTO {
  page?: number;
  limit?: number;
  search?: string;
  programId?: string;
  semester?: number;
  departmentId?: string;
}

/**
 * Response structure for a Topic.
 */
export interface TopicResponse {
  id: string;
  unitId: string;
  topicName: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Response structure for a Unit with nested Topics.
 */
export interface UnitResponse {
  id: string;
  courseId: string;
  unitNumber: number;
  unitName: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  topics?: TopicResponse[];
}

/**
 * Response structure for a Course Outcome.
 */
export interface CourseOutcomeResponse {
  id: string;
  courseId: string;
  coNumber: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Response structure for a Syllabus.
 */
export interface SyllabusResponse {
  id: string;
  courseId: string;
  fileUrl: string;
  originalFileName: string;
  uploadDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Response structure for Assigned Faculty summary.
 */
export interface AssignedFacultyResponse {
  facultyId: string;
  employeeId: string;
  designation: string;
  firstName: string;
  lastName: string;
  email: string;
}

/**
 * Detailed Subject response structure.
 */
export interface SubjectResponse {
  id: string;
  name: string;
  code: string;
  credits: number;
  departmentId: string;
  programId: string | null;
  semester: number | null;
  createdAt: Date;
  updatedAt: Date;
  department?: {
    id: string;
    name: string;
    code: string;
  };
  program?: {
    id: string;
    name: string;
    code: string;
  } | null;
  assignedFaculty?: AssignedFacultyResponse[];
  syllabus?: SyllabusResponse | null;
  courseOutcomes?: CourseOutcomeResponse[];
  units?: UnitResponse[];
}

/**
 * Response structure for paginated list of subjects.
 */
export interface SubjectListResponse {
  subjects: SubjectResponse[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
