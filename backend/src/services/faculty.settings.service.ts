import { prisma } from '../prisma/client';
import { AppError } from '../middleware/errorHandler';

export class FacultySettingsService {
  static async getSettings(userId: string) {
    const faculty = await prisma.facultyProfile.findUnique({
      where: { userId },
      include: { department: true }
    });
    if (!faculty) throw new AppError(404, 'Faculty profile not found');
    return faculty;
  }

  static async updateSettings(userId: string, data: any) {
    const faculty = await prisma.facultyProfile.findUnique({ where: { userId } });
    if (!faculty) throw new AppError(404, 'Faculty profile not found');

    return prisma.facultyProfile.update({
      where: { id: faculty.id },
      data
    });
  }
}
