import db from '@/lib/db';
import {
  ConflictError,
  NotFoundError,
} from '@/lib/errors';

import {
  CreateSectionDTO,
  UpdateSectionDTO,
  SectionResponse,
} from './section.types';

/**
 * Shared select object to avoid repetition.
 */
const sectionSelect = {
  id: true,
  name: true,
  semesterId: true,
  createdAt: true,
  updatedAt: true,
};

export class SectionService {
  /**
   * Creates a new section.
   */
  static async createSection(
    data: CreateSectionDTO
  ): Promise<SectionResponse> {
    const name = data.name.trim();

    // Check if semester exists
    const semester = await db.semester.findUnique({
      where: {
        id: data.semesterId,
      },
    });

    if (!semester) {
      throw new NotFoundError('Semester not found');
    }

    // Check duplicate section in the same semester
    const existingSection =
      await db.section.findUnique({
        where: {
          semesterId_name: {
            semesterId: data.semesterId,
            name,
          },
        },
      });

    if (existingSection) {
      throw new ConflictError(
        `Section '${name}' already exists in this semester.`
      );
    }

    return await db.section.create({
      data: {
        name,
        semesterId: data.semesterId,
      },
      select: sectionSelect,
    });
  }

  /**
   * Returns all sections.
   */
  static async getAllSections(): Promise<
    SectionResponse[]
  > {
    return await db.section.findMany({
      orderBy: [
        {
          semesterId: 'asc',
        },
        {
          name: 'asc',
        },
      ],
      select: sectionSelect,
    });
  }

  /**
   * Returns a section by ID.
   */
  static async getSectionById(
    id: string
  ): Promise<SectionResponse> {
    const section = await db.section.findUnique({
      where: { id },
      select: sectionSelect,
    });

    if (!section) {
      throw new NotFoundError('Section not found');
    }

    return section;
  }

  /**
   * Updates an existing section.
   */
  static async updateSection(
    id: string,
    data: UpdateSectionDTO
  ): Promise<SectionResponse> {
    const existingSection =
      await db.section.findUnique({
        where: { id },
      });

    if (!existingSection) {
      throw new NotFoundError('Section not found');
    }

    const name =
      data.name?.trim() ??
      existingSection.name;

    const semesterId =
      data.semesterId ??
      existingSection.semesterId;

    // Check if semester exists
    if (
      data.semesterId &&
      data.semesterId !==
        existingSection.semesterId
    ) {
      const semester =
        await db.semester.findUnique({
          where: {
            id: data.semesterId,
          },
        });

      if (!semester) {
        throw new NotFoundError('Semester not found');
      }
    }

    // Check duplicate section
    const duplicateSection =
      await db.section.findFirst({
        where: {
          semesterId,
          name,
          NOT: {
            id,
          },
        },
      });

    if (duplicateSection) {
      throw new ConflictError(
        `Section '${name}' already exists in this semester.`
      );
    }

    return await db.section.update({
      where: { id },
      data: {
        ...(data.name && { name }),
        ...(data.semesterId && {
          semesterId,
        }),
      },
      select: sectionSelect,
    });
  }

  /**
   * Deletes a section.
   */
  static async deleteSection(
    id: string
  ): Promise<void> {
    const existingSection =
      await db.section.findUnique({
        where: { id },
      });

    if (!existingSection) {
      throw new NotFoundError('Section not found');
    }

    await db.section.delete({
      where: { id },
    });
  }
}