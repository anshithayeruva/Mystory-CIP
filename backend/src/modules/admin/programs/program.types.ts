/**
 * Data Transfer Object for creating a program.
 */
export interface CreateProgramDTO {
  /**
   * Program name.
   */
  name: string;

  /**
   * Unique program code.
   */
  code: string;

  /**
   * Department ID.
   */
  departmentId: string;
}

/**
 * Data Transfer Object for updating a program.
 */
export interface UpdateProgramDTO {
  /**
   * Program name.
   */
  name?: string;

  /**
   * Unique program code.
   */
  code?: string;

  /**
   * Department ID.
   */
  departmentId?: string;
}

/**
 * Response returned for a program.
 */
export interface ProgramResponse {
  /**
   * Unique program ID.
   */
  id: string;

  /**
   * Program name.
   */
  name: string;

  /**
   * Unique program code.
   */
  code: string;

  /**
   * Department ID to which the program belongs.
   */
  departmentId: string;

  /**
   * Date and time when the program was created.
   */
  createdAt: Date;

  /**
   * Date and time when the program was last updated.
   */
  updatedAt: Date;
}