/**
 * Data Transfer Object for creating a course.
 */
export interface CreateCourseDTO {
  /**
   * Course name.
   */
  name: string;

  /**
   * Unique course code.
   */
  code: string;

  /**
   * Number of credits.
   */
  credits: number;

  /**
   * Department ID.
   */
  departmentId: string;
}

/**
 * Data Transfer Object for updating a course.
 */
export interface UpdateCourseDTO {
  /**
   * Course name.
   */
  name?: string;

  /**
   * Unique course code.
   */
  code?: string;

  /**
   * Number of credits.
   */
  credits?: number;

  /**
   * Department ID.
   */
  departmentId?: string;
}

/**
 * Response returned for a course.
 */
export interface CourseResponse {
  /**
   * Course ID.
   */
  id: string;

  /**
   * Course name.
   */
  name: string;

  /**
   * Course code.
   */
  code: string;

  /**
   * Credits.
   */
  credits: number;

  /**
   * Department ID.
   */
  departmentId: string;

  /**
   * Created timestamp.
   */
  createdAt: Date;

  /**
   * Updated timestamp.
   */
  updatedAt: Date;
}