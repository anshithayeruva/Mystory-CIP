/**
 * Data Transfer Object for creating a department.
 */
export interface CreateDepartmentDTO {
  /**
   * The name of the department.
   */
  name: string;

  /**
   * The unique code of the department.
   */
  code: string;
}

/**
 * Data Transfer Object for updating a department.
 * All fields are optional because an admin may update
 * only the name, only the code, or both.
 */
export interface UpdateDepartmentDTO {
  /**
   * Updated department name.
   */
  name?: string;

  /**
   * Updated department code.
   */
  code?: string;
}

/**
 * Response structure representing a department.
 */
export interface DepartmentResponse {
  /**
   * Unique identifier of the department.
   */
  id: string;

  /**
   * Department name.
   */
  name: string;

  /**
   * Department code.
   */
  code: string;

  /**
   * Date and time when the department was created.
   */
  createdAt: Date;

  /**
   * Date and time when the department was last updated.
   */
  updatedAt: Date;
}