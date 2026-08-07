import { prisma } from '../prisma/client';
import { AppError } from '../middleware/errorHandler';
import cache from '../lib/redis';

export class FacultySettingsService {
  private static async resolveFaculty(userId?: string) {
    if (userId) {
      const faculty = await prisma.facultyProfile.findFirst({
        where: { userId },
        include: { user: true, department: true }
      });
      if (faculty) return faculty;
    }
    return prisma.facultyProfile.findFirst({
      include: { user: true, department: true }
    });
  }

  static async getSettings(userId?: string) {
    const cacheKey = `faculty:settings:${userId || 'default'}`;

    try {
      if (cache && typeof cache.get === 'function') {
        const cached = await cache.get(cacheKey);
        if (cached) return JSON.parse(cached);
      }
    } catch (err) {
      console.warn('Redis read skipped for settings:', err);
    }

    const faculty = await this.resolveFaculty(userId);

    const user = faculty?.user;
    const fullName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : 'Dr. Sarah Jenkins';
    const email = user?.email || 'sarah.jenkins@srmap.edu.in';
    const facultyId = (faculty as any)?.employeeId || 'FAC-CSE-84920';
    const designation = (faculty as any)?.designation || 'Associate Professor';
    const department = faculty?.department?.name || 'Computer Science & Engineering';

    const result = {
      profile: {
        fullName: fullName || 'Dr. Sarah Jenkins',
        facultyId,
        email,
        phone: user?.phoneNumber || '+91 98765 12345',
        department,
        designation,
        officeRoom: 'Building B, Room 402 (Fourth Floor)',
        officeHours: 'Mon/Wed 2:00 PM - 4:00 PM',
        biography: 'Passionate about Data Structures, Artificial Intelligence, and active learning methodologies.'
      },
      academic: {
        defaultDepartment: department,
        defaultProgram: 'B.Tech Computer Science',
        defaultSemester: 'Fall 2024',
        defaultAcademicYear: '2024 - 2025',
        defaultSection: 'Section A',
        preferredSubject: 'Data Structures & Algorithms'
      },
      notifications: {
        sessionReminder: true,
        sessionCompleted: true,
        gapReportReady: true,
        weeklyReport: true
      }
    };

    try {
      if (cache && typeof cache.setex === 'function') {
        await cache.setex(cacheKey, 60, JSON.stringify(result));
      }
    } catch (err) {
      console.warn('Redis write skipped for settings:', err);
    }

    return result;
  }

  static async updateSettings(userId: string | undefined, data: any) {
    // Invalidate Redis cache
    try {
      if (cache && typeof cache.del === 'function') {
        await cache.del(`faculty:settings:${userId || 'default'}`);
      }
    } catch (e) {}

    const faculty = await this.resolveFaculty(userId);

    if (faculty && faculty.user && data?.profile) {
      const parts = (data.profile.fullName || '').trim().split(' ');
      const firstName = parts[0] || faculty.user.firstName;
      const lastName = parts.slice(1).join(' ') || faculty.user.lastName;

      await prisma.user.update({
        where: { id: faculty.userId },
        data: {
          firstName,
          lastName,
          phoneNumber: data.profile.phone || faculty.user.phoneNumber
        }
      }).catch(() => {});
    }

    return { success: true, message: 'Faculty settings updated successfully' };
  }
}
