import { prisma } from '../prisma/client';
import { Role } from '@prisma/client';
import { hashPassword, comparePassword, generateToken } from '../lib/auth';
import { MailService } from './mail.service';
import crypto from 'crypto';

interface CreateUserParams {
  userType: 'student' | 'faculty' | 'hod' | 'admin';
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  department?: string; // department name — optional for ADMIN
  createdBy?: string;  // admin userId

  // Student
  program?: string;
  semester?: string;
  section?: string;
  rollNumber?: string;
  admissionYear?: string;

  // Faculty/HoD
  designation?: string;
  employmentType?: string;
  employeeId?: string;
  joiningDate?: string;
  officeExtension?: string;
}

export class UserService {
  // ─────────────────────────────────────────────
  // Helpers
  // ─────────────────────────────────────────────

  /** Generate a cryptographically random temp password (8 chars, URL-safe base64) */
  private static generateTempPassword(): string {
    return crypto.randomBytes(6).toString('base64url'); // e.g. "aB3_xZ9q"
  }

  // ─────────────────────────────────────────────
  // Auth Endpoints
  // ─────────────────────────────────────────────

  /**
   * Authenticate a user by email + password.
   * Role is always read from the DB — never trusted from the client.
   * Returns { token, user, mustChangePassword }.
   */
  public static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.isActive) {
      throw new Error('Invalid credentials or inactive account');
    }

    const isValid = await comparePassword(password, user.passwordHash);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    // Update lastLoginAt
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const token = generateToken({
      sub: user.id,
      role: user.role,
      mustChangePassword: user.mustChangePassword,
    });

    return {
      token,
      mustChangePassword: user.mustChangePassword,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  /**
   * Change a user's own password.
   * Verifies currentPassword, hashes the new one, clears mustChangePassword.
   * Email is NOT a parameter — it cannot be changed here.
   */
  public static async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    const isValid = await comparePassword(currentPassword, user.passwordHash);
    if (!isValid) throw new Error('Current password is incorrect');

    if (newPassword.length < 8) {
      throw new Error('New password must be at least 8 characters');
    }

    const newHash = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: userId },
      data: {
        passwordHash: newHash,
        mustChangePassword: false,
      },
    });

    // Issue a fresh token with mustChangePassword: false
    const newToken = generateToken({
      sub: user.id,
      role: user.role,
      mustChangePassword: false,
    });

    return { token: newToken };
  }

  // ─────────────────────────────────────────────
  // User Listing (Admin)
  // ─────────────────────────────────────────────

  public static async getUsers(page: number, limit: number, role?: Role) {
    const skip = (page - 1) * limit;
    const whereClause = role ? { role } : {};

    const users = await prisma.user.findMany({
      where: whereClause,
      skip,
      take: limit,
      include: {
        studentProfile: { include: { department: true } },
        facultyProfile: { include: { department: true } },
        hodProfile: { include: { department: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const totalCount = await prisma.user.count({ where: whereClause });

    return {
      data: users.map((user) => {
        let profileData = {};
        if (user.role === Role.STUDENT && user.studentProfile) {
          profileData = {
            institutionId: user.studentProfile.rollNumber,
            department: user.studentProfile.department.name,
          };
        } else if (user.role === Role.FACULTY && user.facultyProfile) {
          profileData = {
            institutionId: user.facultyProfile.employeeId,
            department: user.facultyProfile.department.name,
            designation: user.facultyProfile.designation,
          };
        } else if (user.role === Role.HOD && user.hodProfile) {
          profileData = {
            institutionId: user.id,
            department: user.hodProfile.department.name,
          };
        }

        return {
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          role:
            user.role === Role.HOD
              ? 'HoD'
              : user.role === Role.FACULTY
              ? 'Faculty'
              : user.role === Role.ADMIN
              ? 'Admin'
              : 'Student',
          joined: `Joined ${user.createdAt.toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
          })}`,
          isActive: user.isActive,
          mustChangePassword: user.mustChangePassword,
          ...profileData,
        };
      }),
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  }

  // ─────────────────────────────────────────────
  // Admin — Provision User
  // ─────────────────────────────────────────────

  /**
   * Admin-provisioned user creation.
   * Generates a temp password, hashes it, emails it to the user.
   * The temp password is NEVER returned in the API response.
   */
  public static async createUser(data: CreateUserParams) {
    const tempPassword = this.generateTempPassword();
    const passwordHash = await hashPassword(tempPassword);

    // Validate department (required for all non-admin roles)
    let departmentRecord = null;
    if (data.userType !== 'admin') {
      if (!data.department) throw new Error('Department is required');
      departmentRecord = await prisma.department.findUnique({
        where: { name: data.department },
      });
      if (!departmentRecord) {
        throw new Error(`Department "${data.department}" not found`);
      }
    }

    let resultUser: any;

    await prisma.$transaction(async (tx) => {
      const roleMap: Record<string, Role> = {
        student: Role.STUDENT,
        faculty: Role.FACULTY,
        hod: Role.HOD,
        admin: Role.ADMIN,
      };
      const role: Role = roleMap[data.userType] ?? Role.STUDENT;

      const user = await tx.user.create({
        data: {
          email: data.email,
          passwordHash,
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          role,
          isActive: true,
          mustChangePassword: true,
          createdBy: data.createdBy ?? null,
        },
      });

      resultUser = user;

      if (role === Role.STUDENT && departmentRecord) {
        if (!data.rollNumber) throw new Error('Roll Number is required for students');

        let programId: string | null = null;
        if (data.program) {
          const prog = await tx.program.findUnique({ where: { name: data.program } });
          if (prog) programId = prog.id;
        }

        let semesterId: string | null = null;
        if (data.semester && programId) {
          const semNumber = parseInt(data.semester.replace(/\D/g, '')) || 1;
          let sem = await tx.semester.findUnique({
            where: { programId_semesterNumber: { programId, semesterNumber: semNumber } },
          });
          if (!sem) {
            sem = await tx.semester.create({
              data: { semesterNumber: semNumber, programId },
            });
          }
          semesterId = sem.id;
        }

        let sectionId: string | null = null;
        if (data.section && semesterId) {
          let sec = await tx.section.findUnique({
            where: { semesterId_name: { semesterId, name: data.section } },
          });
          if (!sec) {
            sec = await tx.section.create({ data: { name: data.section, semesterId } });
          }
          sectionId = sec.id;
        }

        await tx.studentProfile.create({
          data: {
            userId: user.id,
            departmentId: departmentRecord.id,
            rollNumber: data.rollNumber,
            registrationNumber: data.rollNumber, // Fix: MongoDB enforces unique constraint on null values
            batch: data.admissionYear || new Date().getFullYear().toString(),
            currentSemester: parseInt(data.semester?.replace(/\D/g, '') || '1'),
            programId,
            semesterId,
            sectionId,
          },
        });
      } else if (role === Role.FACULTY && departmentRecord) {
        if (!data.employeeId) throw new Error('Employee ID is required for faculty');
        if (!data.designation) throw new Error('Designation is required for faculty');

        await tx.facultyProfile.create({
          data: {
            userId: user.id,
            departmentId: departmentRecord.id,
            employeeId: data.employeeId,
            designation: data.designation,
            officeLocation: data.officeExtension,
          },
        });
      } else if (role === Role.HOD && departmentRecord) {
        await tx.hodProfile.create({
          data: {
            userId: user.id,
            departmentId: departmentRecord.id,
          },
        });
      } else if (role === Role.ADMIN) {
        await tx.adminProfile.create({
          data: { userId: user.id },
        });
      }
    });

    // Send credentials email AFTER the transaction — never blocks creation
    await MailService.sendCredentialsEmail(data.email, data.firstName, tempPassword);

    return {
      id: resultUser.id,
      email: resultUser.email,
      firstName: resultUser.firstName,
      lastName: resultUser.lastName,
      role: resultUser.role,
    };
  }

  /**
   * Admin: regenerate a fresh temp password, re-hash, set mustChangePassword=true, re-email.
   * Used as admin-driven password reset / account recovery.
   */
  public static async resendCredentials(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    const tempPassword = this.generateTempPassword();
    const passwordHash = await hashPassword(tempPassword);

    await prisma.user.update({
      where: { id: userId },
      data: {
        passwordHash,
        mustChangePassword: true,
      },
    });

    // Send new credentials — never throws
    await MailService.sendCredentialsEmail(user.email, user.firstName, tempPassword);

    return { success: true };
  }
}
