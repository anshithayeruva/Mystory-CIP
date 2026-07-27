import db from '@/lib/db';
import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
} from '@/lib/errors';
import {
  CreateSubjectInput,
  UpdateSubjectInput,
  CourseOutcomeInput,
  UpdateCourseOutcomeInput,
  UnitInput,
  UpdateUnitInput,
  TopicInput,
  UpdateTopicInput,
  SyllabusInput,
} from './subject.validation';
import {
  SubjectResponse,
  SubjectListResponse,
  CourseOutcomeResponse,
  UnitResponse,
  TopicResponse,
  SyllabusResponse,
  SubjectQueryDTO,
} from './subject.types';
import { Prisma } from '@prisma/client';

export class SubjectService {
  /**
   * Helper: Resolves authenticated user ID to FacultyProfile.
   */
  static async getFacultyProfile(userId: string) {
    const facultyProfile = await db.facultyProfile.findUnique({
      where: { userId },
    });

    if (!facultyProfile) {
      throw new ForbiddenError('Faculty profile not found for the current user.');
    }

    return facultyProfile;
  }

  /**
   * Helper: Verifies that the given course exists and is assigned to the faculty member.
   */
  static async verifyFacultyAccess(facultyId: string, courseId: string) {
    const course = await db.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundError('Subject not found.');
    }

    const assignment = await db.facultyCourse.findFirst({
      where: {
        facultyId,
        courseId,
      },
    });

    if (!assignment) {
      throw new ForbiddenError('You are not authorized to view or manage this subject.');
    }

    return course;
  }

  /**
   * Helper: Formats a Prisma course record into a structured SubjectResponse.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static formatSubjectResponse(course: any): SubjectResponse {
    return {
      id: course.id,
      name: course.name,
      code: course.code,
      credits: course.credits,
      departmentId: course.departmentId,
      programId: course.programId || null,
      semester: course.semester || null,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
      department: course.department
        ? {
            id: course.department.id,
            name: course.department.name,
            code: course.department.code,
          }
        : undefined,
      program: course.program
        ? {
            id: course.program.id,
            name: course.program.name,
            code: course.program.code,
          }
        : null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      assignedFaculty: course.facultyCourses?.map((fc: any) => ({
        facultyId: fc.faculty.id,
        employeeId: fc.faculty.employeeId,
        designation: fc.faculty.designation,
        firstName: fc.faculty.user?.firstName || '',
        lastName: fc.faculty.user?.lastName || '',
        email: fc.faculty.user?.email || '',
      })),
      syllabus: course.syllabus
        ? {
            id: course.syllabus.id,
            courseId: course.syllabus.courseId,
            fileUrl: course.syllabus.fileUrl,
            originalFileName: course.syllabus.originalFileName,
            uploadDate: course.syllabus.uploadDate,
            createdAt: course.syllabus.createdAt,
            updatedAt: course.syllabus.updatedAt,
          }
        : null,
      courseOutcomes: course.courseOutcomes || [],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      units: course.units?.map((u: any) => ({
        id: u.id,
        courseId: u.courseId,
        unitNumber: u.unitNumber,
        unitName: u.unitName,
        description: u.description,
        createdAt: u.createdAt,
        updatedAt: u.updatedAt,
        topics: u.topics || [],
      })) || [],
    };
  }

  /**
   * Standard include block for querying full subject details.
   */
  private static subjectInclude = {
    department: {
      select: { id: true, name: true, code: true },
    },
    program: {
      select: { id: true, name: true, code: true },
    },
    facultyCourses: {
      include: {
        faculty: {
          include: {
            user: {
              select: { id: true, firstName: true, lastName: true, email: true },
            },
          },
        },
      },
    },
    syllabus: true,
    courseOutcomes: {
      orderBy: { coNumber: 'asc' as const },
    },
    units: {
      orderBy: { unitNumber: 'asc' as const },
      include: {
        topics: {
          orderBy: { createdAt: 'asc' as const },
        },
      },
    },
  };

  /**
   * Creates a new subject (course) and assigns the faculty.
   */
  static async createSubject(userId: string, data: CreateSubjectInput): Promise<SubjectResponse> {
    const faculty = await this.getFacultyProfile(userId);

    const name = data.name.trim();
    const code = data.code.trim().toUpperCase();

    // Verify department exists
    const department = await db.department.findUnique({
      where: { id: data.departmentId },
    });
    if (!department) {
      throw new NotFoundError('Department not found.');
    }

    // Verify program exists if provided
    if (data.programId) {
      const program = await db.program.findUnique({
        where: { id: data.programId },
      });
      if (!program) {
        throw new NotFoundError('Program not found.');
      }
    }

    // Check duplicate name or code
    const existingCourse = await db.course.findFirst({
      where: {
        OR: [{ name }, { code }],
      },
    });

    if (existingCourse) {
      if (existingCourse.name === name) {
        throw new ConflictError(`Subject with name '${name}' already exists.`);
      }
      throw new ConflictError(`Subject with code '${code}' already exists.`);
    }

    // Determine assigned faculty IDs (ensuring creator is included)
    const assignedFacultyIds = new Set<string>(data.assignedFaculty || []);
    assignedFacultyIds.add(faculty.id);

    // Verify all faculty profiles exist
    const facultyProfiles = await db.facultyProfile.findMany({
      where: { id: { in: Array.from(assignedFacultyIds) } },
    });
    if (facultyProfiles.length !== assignedFacultyIds.size) {
      throw new NotFoundError('One or more assigned faculty profiles do not exist.');
    }

    // Create course and faculty course assignments in a transaction
    const course = await db.$transaction(async (tx) => {
      const newCourse = await tx.course.create({
        data: {
          name,
          code,
          credits: data.credits,
          departmentId: data.departmentId,
          programId: data.programId || null,
          semester: data.semester || null,
        },
      });

      // Create faculty assignments
      for (const fId of assignedFacultyIds) {
        await tx.facultyCourse.create({
          data: {
            facultyId: fId,
            courseId: newCourse.id,
            section: 'A',
            semester: data.semester || 1,
            academicYear: '2026-2027',
          },
        });
      }

      return await tx.course.findUnique({
        where: { id: newCourse.id },
        include: SubjectService.subjectInclude,
      });
    });

    return this.formatSubjectResponse(course);
  }

  /**
   * Retrieves full details of a subject.
   */
  static async getSubjectById(userId: string, courseId: string): Promise<SubjectResponse> {
    const faculty = await this.getFacultyProfile(userId);
    await this.verifyFacultyAccess(faculty.id, courseId);

    const course = await db.course.findUnique({
      where: { id: courseId },
      include: this.subjectInclude,
    });

    if (!course) {
      throw new NotFoundError('Subject not found.');
    }

    return this.formatSubjectResponse(course);
  }

  /**
   * Lists subjects assigned to the requesting faculty member with search, filter, and pagination.
   */
  static async listSubjects(userId: string, query: SubjectQueryDTO): Promise<SubjectListResponse> {
    const faculty = await this.getFacultyProfile(userId);

    const { page = 1, limit = 10, search, programId, semester, departmentId } = query;
    const skip = (page - 1) * limit;

    // Build filter query scoped strictly to assigned subjects
    const where: Prisma.CourseWhereInput = {
      facultyCourses: {
        some: {
          facultyId: faculty.id,
        },
      },
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { code: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (programId) {
      where.programId = programId;
    }

    if (semester) {
      where.semester = semester;
    }

    if (departmentId) {
      where.departmentId = departmentId;
    }

    const [total, courses] = await Promise.all([
      db.course.count({ where }),
      db.course.findMany({
        where,
        skip,
        take: limit,
        orderBy: { name: 'asc' },
        include: this.subjectInclude,
      }),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return {
      subjects: courses.map((c) => this.formatSubjectResponse(c)),
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }

  /**
   * Updates an existing subject.
   */
  static async updateSubject(
    userId: string,
    courseId: string,
    data: UpdateSubjectInput
  ): Promise<SubjectResponse> {
    const faculty = await this.getFacultyProfile(userId);
    const existingCourse = await this.verifyFacultyAccess(faculty.id, courseId);

    const name = data.name?.trim();
    const code = data.code?.trim().toUpperCase();

    // Verify new department if changing
    if (data.departmentId && data.departmentId !== existingCourse.departmentId) {
      const department = await db.department.findUnique({ where: { id: data.departmentId } });
      if (!department) {
        throw new NotFoundError('Department not found.');
      }
    }

    // Verify new program if changing
    if (data.programId && data.programId !== existingCourse.programId) {
      const program = await db.program.findUnique({ where: { id: data.programId } });
      if (!program) {
        throw new NotFoundError('Program not found.');
      }
    }

    // Check duplicate name or code
    if ((name && name !== existingCourse.name) || (code && code !== existingCourse.code)) {
      const duplicate = await db.course.findFirst({
        where: {
          NOT: { id: courseId },
          OR: [
            ...(name ? [{ name }] : []),
            ...(code ? [{ code }] : []),
          ],
        },
      });

      if (duplicate) {
        if (duplicate.name === name) {
          throw new ConflictError(`Subject with name '${name}' already exists.`);
        }
        if (duplicate.code === code) {
          throw new ConflictError(`Subject with code '${code}' already exists.`);
        }
      }
    }

    // Perform update in transaction if assignments are also changing
    const updatedCourse = await db.$transaction(async (tx) => {
      await tx.course.update({
        where: { id: courseId },
        data: {
          ...(name && { name }),
          ...(code && { code }),
          ...(data.credits !== undefined && { credits: data.credits }),
          ...(data.departmentId && { departmentId: data.departmentId }),
          ...(data.programId !== undefined && { programId: data.programId }),
          ...(data.semester !== undefined && { semester: data.semester }),
        },
      });

      if (data.assignedFaculty) {
        const newAssignedIds = new Set<string>(data.assignedFaculty);
        newAssignedIds.add(faculty.id); // Creator/editor remains assigned

        // Verify faculty profiles exist
        const profiles = await tx.facultyProfile.findMany({
          where: { id: { in: Array.from(newAssignedIds) } },
        });
        if (profiles.length !== newAssignedIds.size) {
          throw new NotFoundError('One or more assigned faculty profiles do not exist.');
        }

        // Remove existing assignments and create updated ones
        await tx.facultyCourse.deleteMany({
          where: { courseId },
        });

        for (const fId of newAssignedIds) {
          await tx.facultyCourse.create({
            data: {
              facultyId: fId,
              courseId,
              section: 'A',
              semester: data.semester || existingCourse.semester || 1,
              academicYear: '2026-2027',
            },
          });
        }
      }

      return await tx.course.findUnique({
        where: { id: courseId },
        include: SubjectService.subjectInclude,
      });
    });

    return this.formatSubjectResponse(updatedCourse);
  }

  /**
   * Deletes a subject.
   */
  static async deleteSubject(userId: string, courseId: string): Promise<void> {
    const faculty = await this.getFacultyProfile(userId);
    await this.verifyFacultyAccess(faculty.id, courseId);

    await db.course.delete({
      where: { id: courseId },
    });
  }

  // ==========================================
  // COURSE OUTCOMES METHODS
  // ==========================================

  static async addOutcome(
    userId: string,
    courseId: string,
    data: CourseOutcomeInput
  ): Promise<CourseOutcomeResponse> {
    const faculty = await this.getFacultyProfile(userId);
    await this.verifyFacultyAccess(faculty.id, courseId);

    const coNumber = data.coNumber.trim().toUpperCase();

    // Check if CO number already exists for this subject
    const existing = await db.courseOutcome.findUnique({
      where: {
        courseId_coNumber: {
          courseId,
          coNumber,
        },
      },
    });

    if (existing) {
      throw new ConflictError(`Course outcome '${coNumber}' already exists for this subject.`);
    }

    return await db.courseOutcome.create({
      data: {
        courseId,
        coNumber,
        title: data.title.trim(),
        description: data.description.trim(),
      },
    });
  }

  static async updateOutcome(
    userId: string,
    courseId: string,
    coId: string,
    data: UpdateCourseOutcomeInput
  ): Promise<CourseOutcomeResponse> {
    const faculty = await this.getFacultyProfile(userId);
    await this.verifyFacultyAccess(faculty.id, courseId);

    const outcome = await db.courseOutcome.findUnique({
      where: { id: coId },
    });

    if (!outcome || outcome.courseId !== courseId) {
      throw new NotFoundError('Course outcome not found for this subject.');
    }

    const coNumber = data.coNumber?.trim().toUpperCase();

    if (coNumber && coNumber !== outcome.coNumber) {
      const existing = await db.courseOutcome.findUnique({
        where: {
          courseId_coNumber: {
            courseId,
            coNumber,
          },
        },
      });
      if (existing && existing.id !== coId) {
        throw new ConflictError(`Course outcome '${coNumber}' already exists for this subject.`);
      }
    }

    return await db.courseOutcome.update({
      where: { id: coId },
      data: {
        ...(coNumber && { coNumber }),
        ...(data.title && { title: data.title.trim() }),
        ...(data.description && { description: data.description.trim() }),
      },
    });
  }

  static async deleteOutcome(userId: string, courseId: string, coId: string): Promise<void> {
    const faculty = await this.getFacultyProfile(userId);
    await this.verifyFacultyAccess(faculty.id, courseId);

    const outcome = await db.courseOutcome.findUnique({
      where: { id: coId },
    });

    if (!outcome || outcome.courseId !== courseId) {
      throw new NotFoundError('Course outcome not found for this subject.');
    }

    await db.courseOutcome.delete({
      where: { id: coId },
    });
  }

  // ==========================================
  // UNITS METHODS
  // ==========================================

  static async addUnit(userId: string, courseId: string, data: UnitInput): Promise<UnitResponse> {
    const faculty = await this.getFacultyProfile(userId);
    await this.verifyFacultyAccess(faculty.id, courseId);

    const existing = await db.unit.findUnique({
      where: {
        courseId_unitNumber: {
          courseId,
          unitNumber: data.unitNumber,
        },
      },
    });

    if (existing) {
      throw new ConflictError(`Unit number ${data.unitNumber} already exists for this subject.`);
    }

    const unit = await db.unit.create({
      data: {
        courseId,
        unitNumber: data.unitNumber,
        unitName: data.unitName.trim(),
        description: data.description?.trim() || null,
      },
      include: {
        topics: true,
      },
    });

    return unit;
  }

  static async updateUnit(
    userId: string,
    courseId: string,
    unitId: string,
    data: UpdateUnitInput
  ): Promise<UnitResponse> {
    const faculty = await this.getFacultyProfile(userId);
    await this.verifyFacultyAccess(faculty.id, courseId);

    const unit = await db.unit.findUnique({
      where: { id: unitId },
    });

    if (!unit || unit.courseId !== courseId) {
      throw new NotFoundError('Unit not found for this subject.');
    }

    if (data.unitNumber !== undefined && data.unitNumber !== unit.unitNumber) {
      const existing = await db.unit.findUnique({
        where: {
          courseId_unitNumber: {
            courseId,
            unitNumber: data.unitNumber,
          },
        },
      });
      if (existing && existing.id !== unitId) {
        throw new ConflictError(`Unit number ${data.unitNumber} already exists for this subject.`);
      }
    }

    const updatedUnit = await db.unit.update({
      where: { id: unitId },
      data: {
        ...(data.unitNumber !== undefined && { unitNumber: data.unitNumber }),
        ...(data.unitName && { unitName: data.unitName.trim() }),
        ...(data.description !== undefined && { description: data.description?.trim() || null }),
      },
      include: {
        topics: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    return updatedUnit;
  }

  static async deleteUnit(userId: string, courseId: string, unitId: string): Promise<void> {
    const faculty = await this.getFacultyProfile(userId);
    await this.verifyFacultyAccess(faculty.id, courseId);

    const unit = await db.unit.findUnique({
      where: { id: unitId },
    });

    if (!unit || unit.courseId !== courseId) {
      throw new NotFoundError('Unit not found for this subject.');
    }

    await db.unit.delete({
      where: { id: unitId },
    });
  }

  // ==========================================
  // TOPICS METHODS
  // ==========================================

  static async addTopic(
    userId: string,
    courseId: string,
    unitId: string,
    data: TopicInput
  ): Promise<TopicResponse> {
    const faculty = await this.getFacultyProfile(userId);
    await this.verifyFacultyAccess(faculty.id, courseId);

    const unit = await db.unit.findUnique({
      where: { id: unitId },
    });

    if (!unit || unit.courseId !== courseId) {
      throw new NotFoundError('Unit not found for this subject.');
    }

    return await db.topic.create({
      data: {
        unitId,
        topicName: data.topicName.trim(),
        description: data.description?.trim() || null,
      },
    });
  }

  static async updateTopic(
    userId: string,
    courseId: string,
    unitId: string,
    topicId: string,
    data: UpdateTopicInput
  ): Promise<TopicResponse> {
    const faculty = await this.getFacultyProfile(userId);
    await this.verifyFacultyAccess(faculty.id, courseId);

    const topic = await db.topic.findUnique({
      where: { id: topicId },
      include: { unit: true },
    });

    if (!topic || topic.unitId !== unitId || topic.unit.courseId !== courseId) {
      throw new NotFoundError('Topic not found for this unit.');
    }

    return await db.topic.update({
      where: { id: topicId },
      data: {
        ...(data.topicName && { topicName: data.topicName.trim() }),
        ...(data.description !== undefined && { description: data.description?.trim() || null }),
      },
    });
  }

  static async deleteTopic(
    userId: string,
    courseId: string,
    unitId: string,
    topicId: string
  ): Promise<void> {
    const faculty = await this.getFacultyProfile(userId);
    await this.verifyFacultyAccess(faculty.id, courseId);

    const topic = await db.topic.findUnique({
      where: { id: topicId },
      include: { unit: true },
    });

    if (!topic || topic.unitId !== unitId || topic.unit.courseId !== courseId) {
      throw new NotFoundError('Topic not found for this unit.');
    }

    await db.topic.delete({
      where: { id: topicId },
    });
  }

  // ==========================================
  // SYLLABUS UPLOAD METHODS
  // ==========================================

  static async uploadSyllabus(
    userId: string,
    courseId: string,
    data: SyllabusInput
  ): Promise<SyllabusResponse> {
    const faculty = await this.getFacultyProfile(userId);
    await this.verifyFacultyAccess(faculty.id, courseId);

    return await db.syllabus.upsert({
      where: { courseId },
      update: {
        fileUrl: data.fileUrl,
        originalFileName: data.originalFileName.trim(),
        uploadDate: new Date(),
      },
      create: {
        courseId,
        fileUrl: data.fileUrl,
        originalFileName: data.originalFileName.trim(),
        uploadDate: new Date(),
      },
    });
  }

  static async deleteSyllabus(userId: string, courseId: string): Promise<void> {
    const faculty = await this.getFacultyProfile(userId);
    await this.verifyFacultyAccess(faculty.id, courseId);

    const syllabus = await db.syllabus.findUnique({
      where: { courseId },
    });

    if (!syllabus) {
      throw new NotFoundError('Syllabus not found for this subject.');
    }

    await db.syllabus.delete({
      where: { id: syllabus.id },
    });
  }
}
