/**
 * Data Transfer Object for creating a section.
 */
export interface CreateSectionDTO {
  /**
   * Section name.
   */
  name: string;

  /**
   * Semester ID.
   */
  semesterId: string;
}

/**
 * Data Transfer Object for updating a section.
 */
export interface UpdateSectionDTO {
  /**
   * Section name.
   */
  name?: string;

  /**
   * Semester ID.
   */
  semesterId?: string;
}

/**
 * Response returned for a section.
 */
export interface SectionResponse {
  /**
   * Unique section ID.
   */
  id: string;

  /**
   * Section name.
   */
  name: string;

  /**
   * Semester ID.
   */
  semesterId: string;

  /**
   * Created timestamp.
   */
  createdAt: Date;

  /**
   * Updated timestamp.
   */
  updatedAt: Date;
}