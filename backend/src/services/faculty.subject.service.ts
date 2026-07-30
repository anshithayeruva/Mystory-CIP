import { prisma } from '../prisma/client';
import { AppError } from '../middleware/errorHandler';

export class FacultySubjectService {
  static async getSubjects(userId: string, query: any) {
    const faculty = await prisma.facultyProfile.findUnique({ where: { userId } });
    if (!faculty) throw new AppError(404, 'Faculty profile not found');

    const page = parseInt(query.page || '1');
    const limit = parseInt(query.limit || '10');
    const skip = (page - 1) * limit;

    const where: any = {
      facultyCourses: { some: { facultyId: faculty.id } }
    };

    if (query.search) {
      where.name = { contains: query.search, mode: 'insensitive' };
    }

    if (query.semester) {
      where.semester = parseInt(query.semester);
    }

    const [total, subjects] = await Promise.all([
      prisma.course.count({ where }),
      prisma.course.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { department: true, program: true }
      })
    ]);

    return {
      data: subjects,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) }
    };
  }

  static async getSubjectById(subjectId: string) {
    const subject = await prisma.course.findUnique({
      where: { id: subjectId },
      include: { department: true, program: true, units: true, courseOutcomes: true }
    });
    if (!subject) throw new AppError(404, 'Subject not found');
    return subject;
  }

  static async createSubject(userId: string, data: any) {
    const faculty = await prisma.facultyProfile.findUnique({ where: { userId } });
    if (!faculty) throw new AppError(404, 'Faculty profile not found');

    const subject = await prisma.course.create({
      data: {
        name: data.name,
        code: data.code,
        credits: data.credits,
        departmentId: data.departmentId,
        description: data.description,
        facultyCourses: {
          create: {
            facultyId: faculty.id,
            section: 'A',
            semester: 1,
            academicYear: new Date().getFullYear().toString()
          }
        }
      }
    });

    return subject;
  }

  static async updateSubject(subjectId: string, data: any) {
    const subject = await prisma.course.update({
      where: { id: subjectId },
      data
    });
    return subject;
  }

  static async deleteSubject(subjectId: string) {
    return prisma.course.delete({ where: { id: subjectId } });
  }
}
