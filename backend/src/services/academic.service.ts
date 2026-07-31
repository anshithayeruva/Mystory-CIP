import { prisma } from '../prisma/client';
import { AppError } from '../middleware/errorHandler';

export class AcademicService {
  
  static generateCode(name: string): string {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000);
  }

  static async getDepartments() {
    const departments = await prisma.department.findMany({
      include: {
        hod: {
          include: {
            user: true
          }
        },
        _count: {
          select: {
            faculty: true,
            students: true,
            programs: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return departments.map((dept: any) => ({
      id: dept.id,
      name: dept.name,
      code: dept.code,
      description: dept.description,
      hodName: dept.hod?.user ? `${dept.hod.user.firstName} ${dept.hod.user.lastName}` : 'Not Assigned',
      faculty: dept._count?.faculty || 0,
      students: dept._count?.students || 0,
      programs: dept._count?.programs || 0,
      createdAt: dept.createdAt
    }));
  }

  static async createDepartment(data: { name: string; hodName?: string; description?: string }) {
    const existing = await prisma.department.findUnique({ where: { name: data.name } });
    if (existing) {
      throw new AppError(400, 'Department with this name already exists');
    }

    const code = this.generateCode(data.name);

    // If HOD selection was provided, we'd normally link it here, but in the UI it's just a string currently.
    // For a robust system, the UI should send a User ID for the HOD, but we'll adapt to the current UI which sends a name.
    // Since we can't reliably lookup by "Dr. Sarah Jenkins", we'll just create the department for now.
    // If the HOD system is fully fleshed out, we'd find the user and create an HodProfile.

    const department = await prisma.department.create({
      data: {
        name: data.name,
        code,
        description: data.description,
      } as any
    });

    return department;
  }

  static async getPrograms() {
    const programs = await prisma.program.findMany({
      include: {
        department: true,
        courses: true,
        _count: {
          select: {
            students: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return programs.map((prog: any) => ({
      id: prog.id,
      name: prog.name,
      code: prog.code,
      department: prog.department?.name || '',
      duration: prog.duration || 'N/A',
      degreeLevel: prog.degreeLevel || 'N/A',
      students: prog._count?.students || 0,
      curriculum: "Assigned", // Always show 'View Curriculum' for now since frontend uses dummy data
      createdAt: prog.createdAt
    }));
  }

  static async createProgram(data: { name: string; departmentName: string; degreeLevel: string; duration: string; intake?: number | string; description?: string }) {
    const department = await prisma.department.findUnique({
      where: { name: data.departmentName }
    });

    if (!department) {
      throw new AppError(404, 'Department not found');
    }

    const existing = await prisma.program.findUnique({ where: { name: data.name } });
    if (existing) {
      throw new AppError(400, 'Program with this name already exists');
    }

    const code = this.generateCode(data.name);
    const parsedIntake = data.intake ? (typeof data.intake === 'string' ? parseInt(data.intake) : data.intake) : undefined;

    const program = await prisma.program.create({
      data: {
        name: data.name,
        code,
        departmentId: department.id,
        degreeLevel: data.degreeLevel,
        duration: data.duration,
        intake: parsedIntake,
        description: data.description
      } as any
    });

    return program;
  }

  static async getProgramById(id: string) {
    const program: any = await prisma.program.findUnique({
      where: { id },
      include: {
        department: true,
        _count: {
          select: { students: true }
        }
      }
    });

    if (!program) {
      throw new AppError(404, 'Program not found');
    }

    return {
      id: program.id,
      name: program.name,
      code: program.code,
      department: program.department?.name || '',
      duration: program.duration || 'N/A',
      degreeLevel: program.degreeLevel || 'N/A',
      students: program._count?.students || 0,
      createdAt: program.createdAt
    };
  }
  static async updateDepartment(id: string, data: { name?: string; description?: string }) {
    const existing = await prisma.department.findUnique({ where: { id } });
    if (!existing) throw new AppError(404, 'Department not found');

    if (data.name && data.name !== existing.name) {
      const nameTaken = await prisma.department.findUnique({ where: { name: data.name } });
      if (nameTaken) throw new AppError(400, 'Department with this name already exists');
    }

    return prisma.department.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
      }
    });
  }

  static async deleteDepartment(id: string) {
    const existing = await prisma.department.findUnique({ where: { id } });
    if (!existing) throw new AppError(404, 'Department not found');

    return prisma.department.delete({ where: { id } });
  }

  static async updateProgram(id: string, data: { name?: string; departmentName?: string; degreeLevel?: string; duration?: string; intake?: number | string; description?: string }) {
    const existing = await prisma.program.findUnique({ where: { id } });
    if (!existing) throw new AppError(404, 'Program not found');

    if (data.name && data.name !== existing.name) {
      const nameTaken = await prisma.program.findUnique({ where: { name: data.name } });
      if (nameTaken) throw new AppError(400, 'Program with this name already exists');
    }

    let departmentId = existing.departmentId;
    if (data.departmentName) {
      const dept = await prisma.department.findUnique({ where: { name: data.departmentName } });
      if (!dept) throw new AppError(404, 'Department not found');
      departmentId = dept.id;
    }

    const parsedIntake = data.intake ? (typeof data.intake === 'string' ? parseInt(data.intake) : data.intake) : undefined;

    return prisma.program.update({
      where: { id },
      data: {
        name: data.name,
        departmentId,
        degreeLevel: data.degreeLevel,
        duration: data.duration,
        intake: parsedIntake,
        description: data.description
      }
    });
  }

  static async deleteProgram(id: string) {
    const existing = await prisma.program.findUnique({ where: { id } });
    if (!existing) throw new AppError(404, 'Program not found');

    return prisma.program.delete({ where: { id } });
  }
}
