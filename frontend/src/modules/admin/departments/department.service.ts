import db from '@/lib/db';
import { ConflictError, NotFoundError } from '@/lib/errors';
import {
  CreateDepartmentDTO,
  UpdateDepartmentDTO,
  DepartmentResponse,
} from './department.types';

/**
 * Shared select object to avoid repetition.
 */
const departmentSelect = {
  id: true,
  name: true,
  code: true,
  createdAt: true,
  updatedAt: true,
};

export class DepartmentService {
  /**
   * Creates a new department.
   */
  static async createDepartment(
    data: CreateDepartmentDTO
  ): Promise<DepartmentResponse> {
    const name = data.name.trim();
    const code = data.code.trim().toUpperCase();

    const existingDepartment = await db.department.findFirst({
      where: {
        OR: [{ name }, { code }],
      },
    });

    if (existingDepartment) {
      if (existingDepartment.name === name) {
        throw new ConflictError(
          `Department '${name}' already exists.`
        );
      }

      throw new ConflictError(
        `Department code '${code}' already exists.`
      );
    }

    return await db.department.create({
      data: {
        name,
        code,
      },
      select: departmentSelect,
    });
  }

  /**
   * Returns all departments.
   */
  static async getAllDepartments(): Promise<DepartmentResponse[]> {
    return await db.department.findMany({
      orderBy: {
        name: 'asc',
      },
      select: departmentSelect,
    });
  }

  /**
   * Returns a department by ID.
   */
  static async getDepartmentById(
    id: string
  ): Promise<DepartmentResponse> {
    const department = await db.department.findUnique({
      where: { id },
      select: departmentSelect,
    });

    if (!department) {
      throw new NotFoundError('Department not found');
    }

    return department;
  }

  /**
   * Updates an existing department.
   */
  static async updateDepartment(
    id: string,
    data: UpdateDepartmentDTO
  ): Promise<DepartmentResponse> {
    // 1. Check if department exists
    const existingDepartment = await db.department.findUnique({
      where: { id },
    });

    if (!existingDepartment) {
      throw new NotFoundError('Department not found');
    }

    // 2. Normalize incoming values
    const name = data.name?.trim();
    const code = data.code?.trim().toUpperCase();

    // 3. Check duplicate department name
    if (name && name !== existingDepartment.name) {
      const duplicateName = await db.department.findUnique({
        where: { name },
      });

      if (duplicateName) {
        throw new ConflictError(
          `Department '${name}' already exists.`
        );
      }
    }

    // 4. Check duplicate department code
    if (code && code !== existingDepartment.code) {
      const duplicateCode = await db.department.findUnique({
        where: { code },
      });

      if (duplicateCode) {
        throw new ConflictError(
          `Department code '${code}' already exists.`
        );
      }
    }

    // 5. Update department
    return await db.department.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(code && { code }),
      },
      select: departmentSelect,
    });
  }

  /**
   * Deletes a department.
   */
  static async deleteDepartment(
    id: string
  ): Promise<void> {
    // 1. Check if department exists
    const existingDepartment = await db.department.findUnique({
      where: { id },
    });

    if (!existingDepartment) {
      throw new NotFoundError('Department not found');
    }

    // 2. Delete department
    await db.department.delete({
      where: { id },
    });
  }
}