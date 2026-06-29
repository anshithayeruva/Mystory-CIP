import db from '@/lib/db';
import {
  ConflictError,
  NotFoundError,
} from '@/lib/errors';

import {
  CreateSemesterDTO,
  UpdateSemesterDTO,
  SemesterResponse,
} from './semester.types';

/**
 * Shared select object to avoid repetition.
 */
const semesterSelect = {
  id: true,
  semesterNumber: true,
  programId: true,
  createdAt: true,
  updatedAt: true,
};

export class SemesterService {
  /**
   * Creates a new semester.
   */
  static async createSemester(
    data: CreateSemesterDTO
  ): Promise<SemesterResponse> {
    // Check if program exists
    const program = await db.program.findUnique({
      where: {
        id: data.programId,
      },
    });

    if (!program) {
      throw new NotFoundError('Program not found');
    }

    // Check duplicate semester for the same program
    const existingSemester =
      await db.semester.findUnique({
        where: {
          programId_semesterNumber: {
            programId: data.programId,
            semesterNumber: data.semesterNumber,
          },
        },
      });

    if (existingSemester) {
      throw new ConflictError(
        `Semester ${data.semesterNumber} already exists for this program.`
      );
    }

    return await db.semester.create({
      data,
      select: semesterSelect,
    });
  }

  /**
   * Returns all semesters.
   */
  static async getAllSemesters(): Promise<
    SemesterResponse[]
  > {
    return await db.semester.findMany({
      orderBy: [
        {
          programId: 'asc',
        },
        {
          semesterNumber: 'asc',
        },
      ],
      select: semesterSelect,
    });
  }

  /**
   * Returns a semester by ID.
   */
  static async getSemesterById(
    id: string
  ): Promise<SemesterResponse> {
    const semester = await db.semester.findUnique({
      where: { id },
      select: semesterSelect,
    });

    if (!semester) {
      throw new NotFoundError('Semester not found');
    }

    return semester;
  }

  /**
   * Updates an existing semester.
   */
  static async updateSemester(
    id: string,
    data: UpdateSemesterDTO
  ): Promise<SemesterResponse> {
    const existingSemester =
      await db.semester.findUnique({
        where: { id },
      });

    if (!existingSemester) {
      throw new NotFoundError('Semester not found');
    }

    const semesterNumber =
      data.semesterNumber ??
      existingSemester.semesterNumber;

    const programId =
      data.programId ??
      existingSemester.programId;

    // Check program exists if changed
    if (
      data.programId &&
      data.programId !==
        existingSemester.programId
    ) {
      const program = await db.program.findUnique({
        where: {
          id: data.programId,
        },
      });

      if (!program) {
        throw new NotFoundError('Program not found');
      }
    }

    // Check duplicate semester
    const duplicateSemester =
      await db.semester.findFirst({
        where: {
          programId,
          semesterNumber,
          NOT: {
            id,
          },
        },
      });

    if (duplicateSemester) {
      throw new ConflictError(
        `Semester ${semesterNumber} already exists for this program.`
      );
    }

    return await db.semester.update({
      where: { id },
      data: {
        semesterNumber:
          data.semesterNumber,
        programId: data.programId,
      },
      select: semesterSelect,
    });
  }

  /**
   * Deletes a semester.
   */
  static async deleteSemester(
    id: string
  ): Promise<void> {
    const existingSemester =
      await db.semester.findUnique({
        where: { id },
      });

    if (!existingSemester) {
      throw new NotFoundError('Semester not found');
    }

    await db.semester.delete({
      where: { id },
    });
  }
}