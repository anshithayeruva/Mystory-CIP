import db from '../../../lib/prisma';
import { BadRequestError, ForbiddenError, NotFoundError } from '../../../lib/errors';
import { comparePassword, hashPassword } from '../../../lib/auth';
import { PulseSessionStatus, Prisma } from '@prisma/client';
import {
  AssignedSubjectInfo,
  AssignedSubjectsListResponse,
  AssignedSubjectsQueryDTO,
  ChangePasswordInput,
  FacultyProfileResponse,
  ProfileDashboardSummary,
  UpdateProfileInput,
} from './profile.types';

export class ProfileService {
  /**
   * Resolves authenticated user ID to their own FacultyProfile along with User and Department data.
   */
  static async getFacultyProfile(userId: string) {
    const facultyProfile = await db.facultyProfile.findUnique({
      where: { userId },
      include: {
        user: true,
        department: true,
      },
    });

    if (!facultyProfile || !facultyProfile.user) {
      throw new ForbiddenError('Faculty profile not found for the current user.');
    }

    return facultyProfile;
  }

  /**
   * Helper: Computes Pulse session counts for a given course assigned to a faculty member.
   */
  private static async getCoursePulseStats(facultyId: string, courseId: string) {
    const [totalSessionsCreated, activeSessions, completedSessions] = await Promise.all([
      db.pulseSession.count({
        where: { facultyId, courseId },
      }),
      db.pulseSession.count({
        where: {
          facultyId,
          courseId,
          status: {
            in: [PulseSessionStatus.LIVE, PulseSessionStatus.PUBLISHED, PulseSessionStatus.PAUSED],
          },
        },
      }),
      db.pulseSession.count({
        where: {
          facultyId,
          courseId,
          status: {
            in: [PulseSessionStatus.COMPLETED, PulseSessionStatus.CLOSED, PulseSessionStatus.ARCHIVED],
          },
        },
      }),
    ]);

    return { totalSessionsCreated, activeSessions, completedSessions };
  }

  /**
   * Retrieves the authenticated faculty member's profile.
   */
  static async getProfile(userId: string): Promise<FacultyProfileResponse> {
    const facultyProfile = await this.getFacultyProfile(userId);
    const { user, department } = facultyProfile;

    const facultyCourses = await db.facultyCourse.findMany({
      where: { facultyId: facultyProfile.id },
      include: {
        course: {
          include: {
            department: true,
            program: true,
          },
        },
      },
    });

    const assignedSubjects: AssignedSubjectInfo[] = await Promise.all(
      facultyCourses.map(async (fc) => {
        const stats = await this.getCoursePulseStats(facultyProfile.id, fc.courseId);
        return {
          id: fc.id,
          courseId: fc.courseId,
          subjectName: fc.course.name,
          subjectCode: fc.course.code,
          department: fc.course.department.name,
          program: fc.course.program?.name || null,
          semester: fc.semester,
          totalSessionsCreated: stats.totalSessionsCreated,
          activeSessions: stats.activeSessions,
          completedSessions: stats.completedSessions,
        };
      })
    );

    const fullName = `${user.firstName} ${user.lastName}`.trim();

    return {
      facultyId: facultyProfile.id,
      fullName,
      email: user.email,
      employeeId: facultyProfile.employeeId,
      department: {
        id: department.id,
        name: department.name,
        code: department.code,
      },
      designation: facultyProfile.designation,
      assignedSubjects,
      profilePicture: facultyProfile.profilePicture || null,
      contactNumber: user.phoneNumber || null,
      officeLocation: facultyProfile.officeLocation || null,
      accountStatus: facultyProfile.status,
      dateJoined: facultyProfile.createdAt,
    };
  }

  /**
   * Updates editable profile fields for the authenticated faculty member.
   */
  static async updateProfile(userId: string, input: UpdateProfileInput): Promise<FacultyProfileResponse> {
    const facultyProfile = await this.getFacultyProfile(userId);

    const userUpdates: Prisma.UserUpdateInput = {};
    const facultyUpdates: Prisma.FacultyProfileUpdateInput = {};

    if (input.fullName !== undefined) {
      const trimmed = input.fullName.trim();
      const firstSpaceIdx = trimmed.indexOf(' ');
      if (firstSpaceIdx > 0) {
        userUpdates.firstName = trimmed.substring(0, firstSpaceIdx).trim();
        userUpdates.lastName = trimmed.substring(firstSpaceIdx + 1).trim();
      } else {
        userUpdates.firstName = trimmed;
        userUpdates.lastName = '';
      }
    }

    if (input.firstName !== undefined) {
      userUpdates.firstName = input.firstName.trim();
    }
    if (input.lastName !== undefined) {
      userUpdates.lastName = input.lastName.trim();
    }

    const phoneVal = input.contactNumber !== undefined ? input.contactNumber : input.phoneNumber;
    if (phoneVal !== undefined) {
      userUpdates.phoneNumber = phoneVal === '' || phoneVal === null ? null : phoneVal;
    }

    if (input.profilePicture !== undefined) {
      facultyUpdates.profilePicture = input.profilePicture === '' || input.profilePicture === null ? null : input.profilePicture;
    }

    if (input.officeLocation !== undefined) {
      facultyUpdates.officeLocation = input.officeLocation === '' || input.officeLocation === null ? null : input.officeLocation;
    }

    if (Object.keys(userUpdates).length > 0) {
      await db.user.update({
        where: { id: userId },
        data: userUpdates,
      });
    }

    if (Object.keys(facultyUpdates).length > 0) {
      await db.facultyProfile.update({
        where: { id: facultyProfile.id },
        data: facultyUpdates,
      });
    }

    return this.getProfile(userId);
  }

  /**
   * Securely changes the authenticated user's password.
   */
  static async changePassword(userId: string, input: ChangePasswordInput): Promise<{ success: boolean; message: string }> {
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    const isCurrentValid = await comparePassword(input.currentPassword, user.passwordHash);
    if (!isCurrentValid) {
      throw new BadRequestError('Incorrect current password.');
    }

    const isSameAsOld = await comparePassword(input.newPassword, user.passwordHash);
    if (isSameAsOld) {
      throw new BadRequestError('New password cannot be the same as current password.');
    }

    const newHash = await hashPassword(input.newPassword);

    await db.user.update({
      where: { id: userId },
      data: { passwordHash: newHash },
    });

    return { success: true, message: 'Password changed successfully.' };
  }

  /**
   * Returns assigned subjects with search, filtering, pagination, and Classroom Pulse statistics.
   */
  static async getAssignedSubjects(userId: string, query: AssignedSubjectsQueryDTO): Promise<AssignedSubjectsListResponse> {
    const facultyProfile = await this.getFacultyProfile(userId);

    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const courseFilter: Prisma.CourseWhereInput = {};
    if (query.programId) {
      courseFilter.programId = query.programId;
    }
    if (query.departmentId) {
      courseFilter.departmentId = query.departmentId;
    }
    if (query.search) {
      courseFilter.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { code: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const where: Prisma.FacultyCourseWhereInput = {
      facultyId: facultyProfile.id,
      ...(query.semester ? { semester: query.semester } : {}),
      ...(Object.keys(courseFilter).length > 0 ? { course: courseFilter } : {}),
    };

    const [total, facultyCourses] = await Promise.all([
      db.facultyCourse.count({ where }),
      db.facultyCourse.findMany({
        where,
        include: {
          course: {
            include: {
              department: true,
              program: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const data: AssignedSubjectInfo[] = await Promise.all(
      facultyCourses.map(async (fc) => {
        const stats = await this.getCoursePulseStats(facultyProfile.id, fc.courseId);
        return {
          id: fc.id,
          courseId: fc.courseId,
          subjectName: fc.course.name,
          subjectCode: fc.course.code,
          department: fc.course.department.name,
          program: fc.course.program?.name || null,
          semester: fc.semester,
          totalSessionsCreated: stats.totalSessionsCreated,
          activeSessions: stats.activeSessions,
          completedSessions: stats.completedSessions,
        };
      })
    );

    const totalPages = Math.ceil(total / limit) || 1;

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  /**
   * Retrieves lightweight dashboard summary information for the profile page.
   */
  static async getDashboardSummary(userId: string): Promise<ProfileDashboardSummary> {
    const facultyProfile = await this.getFacultyProfile(userId);
    const { user } = facultyProfile;

    const [totalAssignedSubjects, totalSessionsCreated, totalActiveSessions, totalCompletedSessions] = await Promise.all([
      db.facultyCourse.count({
        where: { facultyId: facultyProfile.id },
      }),
      db.pulseSession.count({
        where: { facultyId: facultyProfile.id },
      }),
      db.pulseSession.count({
        where: {
          facultyId: facultyProfile.id,
          status: {
            in: [PulseSessionStatus.LIVE, PulseSessionStatus.PUBLISHED, PulseSessionStatus.PAUSED],
          },
        },
      }),
      db.pulseSession.count({
        where: {
          facultyId: facultyProfile.id,
          status: {
            in: [PulseSessionStatus.COMPLETED, PulseSessionStatus.CLOSED, PulseSessionStatus.ARCHIVED],
          },
        },
      }),
    ]);

    let completionScore = 70; // Base score for Name, Email, Employee ID, Designation, Department
    if (user.phoneNumber) completionScore += 10;
    if (facultyProfile.officeLocation) completionScore += 10;
    if (facultyProfile.profilePicture) completionScore += 10;
    const profileCompletionPercentage = Math.min(100, completionScore);

    return {
      totalAssignedSubjects,
      totalSessionsCreated,
      totalActiveSessions,
      totalCompletedSessions,
      lastLogin: user.lastLoginAt || null,
      profileCompletionPercentage,
    };
  }
}
