/**
 * Data Transfer Object for creating a semester.
 */
export interface CreateSemesterDTO {
  /**
   * Semester number.
   */
  semesterNumber: number;

  /**
   * Program ID.
   */
  programId: string;
}

/**
 * Data Transfer Object for updating a semester.
 */
export interface UpdateSemesterDTO {
  /**
   * Semester number.
   */
  semesterNumber?: number;

  /**
   * Program ID.
   */
  programId?: string;
}

/**
 * Response returned for a semester.
 */
export interface SemesterResponse {
  /**
   * Unique semester ID.
   */
  id: string;

  /**
   * Semester number.
   */
  semesterNumber: number;

  /**
   * Program ID.
   */
  programId: string;

  /**
   * Date and time when the semester was created.
   */
  createdAt: Date;

  /**
   * Date and time when the semester was last updated.
   */
  updatedAt: Date;
}