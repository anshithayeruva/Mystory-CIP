import db from '@/lib/db';
import {
  ConflictError,
  NotFoundError,
} from '@/lib/errors';

import {
  CreateProgramDTO,
  UpdateProgramDTO,
  ProgramResponse,
} from './program.types';

/**
 * Shared select object to avoid repetition.
 */
const programSelect = {
  id: true,
  name: true,
  code: true,
  departmentId: true,
  createdAt: true,
  updatedAt: true,
};

export class ProgramService {
  /**
   * Creates a new program.
   */
  static async createProgram(
    data: CreateProgramDTO
  ): Promise<ProgramResponse> {
    const name = data.name.trim();
    const code = data.code.trim().toUpperCase();

    // Check if department exists
    const department = await db.department.findUnique({
      where: {
        id: data.departmentId,
      },
    });

    if (!department) {
      throw new NotFoundError('Department not found');
    }

    // Check duplicate program name or code
    const existingProgram = await db.program.findFirst({
      where: {
        OR: [
          { name },
          { code },
        ],
      },
    });

    if (existingProgram) {
      if (existingProgram.name === name) {
        throw new ConflictError(
          `Program '${name}' already exists.`
        );
      }

      throw new ConflictError(
        `Program code '${code}' already exists.`
      );
    }

    return await db.program.create({
      data: {
        name,
        code,
        departmentId: data.departmentId,
      },
      select: programSelect,
    });
  }

  /**
   * Returns all programs.
   */
  static async getAllPrograms(): Promise<
    ProgramResponse[]
  > {
    return await db.program.findMany({
      orderBy: {
        name: 'asc',
      },
      select: programSelect,
    });
  }

  /**
   * Returns a program by ID.
   */
  static async getProgramById(
    id: string
  ): Promise<ProgramResponse> {
    const program = await db.program.findUnique({
      where: { id },
      select: programSelect,
    });

    if (!program) {
      throw new NotFoundError('Program not found');
    }

    return program;
  }

  /**
   * Updates an existing program.
   */
  static async updateProgram(
    id: string,
    data: UpdateProgramDTO
  ): Promise<ProgramResponse> {
    const existingProgram = await db.program.findUnique({
      where: { id },
    });

    if (!existingProgram) {
      throw new NotFoundError('Program not found');
    }

    const name = data.name?.trim();
    const code = data.code?.trim().toUpperCase();
    const departmentId = data.departmentId;

    // Check if new department exists
    if (
      departmentId &&
      departmentId !== existingProgram.departmentId
    ) {
      const department = await db.department.findUnique({
        where: {
          id: departmentId,
        },
      });

      if (!department) {
        throw new NotFoundError('Department not found');
      }
    }

    // Check duplicate name
    if (
      name &&
      name !== existingProgram.name
    ) {
      const duplicateName = await db.program.findUnique({
        where: { name },
      });

      if (duplicateName) {
        throw new ConflictError(
          `Program '${name}' already exists.`
        );
      }
    }

    // Check duplicate code
    if (
      code &&
      code !== existingProgram.code
    ) {
      const duplicateCode = await db.program.findUnique({
        where: { code },
      });

      if (duplicateCode) {
        throw new ConflictError(
          `Program code '${code}' already exists.`
        );
      }
    }

    return await db.program.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(code && { code }),
        ...(departmentId && { departmentId }),
      },
      select: programSelect,
    });
  }

  /**
   * Deletes a program.
   */
  static async deleteProgram(
    id: string
  ): Promise<void> {
    // Check if program exists
    const existingProgram = await db.program.findUnique({
      where: { id },
    });

    if (!existingProgram) {
      throw new NotFoundError('Program not found');
    }

    // Delete program
    await db.program.delete({
      where: { id },
    });
  }
}