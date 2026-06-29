import db from '@/lib/db';
import {
  ConflictError,
  NotFoundError,
} from '@/lib/errors';

import {
  CreateCourseDTO,
  UpdateCourseDTO,
  CourseResponse,
} from './course.types';

/**
 * Shared select object to avoid repetition.
 */
const courseSelect = {
  id: true,
  name: true,
  code: true,
  credits: true,
  departmentId: true,
  createdAt: true,
  updatedAt: true,
};

export class CourseService {
  /**
   * Creates a new course.
   */
  static async createCourse(
    data: CreateCourseDTO
  ): Promise<CourseResponse> {
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

    // Check duplicate course name or code
    const existingCourse = await db.course.findFirst({
      where: {
        OR: [
          { name },
          { code },
        ],
      },
    });

    if (existingCourse) {
      if (existingCourse.name === name) {
        throw new ConflictError(
          `Course '${name}' already exists.`
        );
      }

      throw new ConflictError(
        `Course code '${code}' already exists.`
      );
    }

    return await db.course.create({
      data: {
        name,
        code,
        credits: data.credits,
        departmentId: data.departmentId,
      },
      select: courseSelect,
    });
  }

  /**
   * Returns all courses.
   */
  static async getAllCourses(): Promise<
    CourseResponse[]
  > {
    return await db.course.findMany({
      orderBy: {
        name: 'asc',
      },
      select: courseSelect,
    });
  }

  /**
   * Returns a course by ID.
   */
  static async getCourseById(
    id: string
  ): Promise<CourseResponse> {
    const course = await db.course.findUnique({
      where: { id },
      select: courseSelect,
    });

    if (!course) {
      throw new NotFoundError('Course not found');
    }

    return course;
  }

  /**
   * Updates an existing course.
   */
  static async updateCourse(
    id: string,
    data: UpdateCourseDTO
  ): Promise<CourseResponse> {
    // Check if course exists
    const existingCourse = await db.course.findUnique({
      where: { id },
    });

    if (!existingCourse) {
      throw new NotFoundError('Course not found');
    }

    const name = data.name?.trim();
    const code = data.code?.trim().toUpperCase();
    const credits = data.credits;
    const departmentId = data.departmentId;

    // Check if new department exists
    if (
      departmentId &&
      departmentId !== existingCourse.departmentId
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
      name !== existingCourse.name
    ) {
      const duplicateName = await db.course.findUnique({
        where: { code: existingCourse.code },
      });

      const courseWithName =
        await db.course.findFirst({
          where: {
            name,
            NOT: {
              id,
            },
          },
        });

      if (courseWithName || duplicateName?.name === name) {
        throw new ConflictError(
          `Course '${name}' already exists.`
        );
      }
    }

    // Check duplicate code
    if (
      code &&
      code !== existingCourse.code
    ) {
      const duplicateCode = await db.course.findUnique({
        where: { code },
      });

      if (duplicateCode) {
        throw new ConflictError(
          `Course code '${code}' already exists.`
        );
      }
    }

    return await db.course.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(code && { code }),
        ...(credits !== undefined && { credits }),
        ...(departmentId && { departmentId }),
      },
      select: courseSelect,
    });
  }

  /**
   * Deletes a course.
   */
  static async deleteCourse(
    id: string
  ): Promise<void> {
    const course = await db.course.findUnique({
      where: { id },
    });

    if (!course) {
      throw new NotFoundError('Course not found');
    }

    await db.course.delete({
      where: { id },
    });
  }
}