import { prisma } from '../prisma/client';
import { Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

interface CreateUserParams {
  userType: 'student' | 'faculty' | 'hod';
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  department: string; // This is the department name
  sendWelcomeEmail?: boolean;
  forcePasswordChange?: boolean;
  isActive?: boolean;
  
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
  private static async generateUniqueEmail(firstName: string, lastName: string): Promise<string> {
    const cleanFirst = firstName.trim().toLowerCase().replace(/[^a-z]/g, '');
    const cleanLast = lastName.trim().toLowerCase().replace(/[^a-z]/g, '');
    const lastInitial = cleanLast.charAt(0);
    
    let baseEmail = `${cleanFirst}.${lastInitial}@mystory.edu`;
    
    // Check if exists
    let user = await prisma.user.findUnique({ where: { email: baseEmail } });
    if (!user) return baseEmail;
    
    // If duplicate, append number
    let counter = 1;
    while (true) {
      const email = `${cleanFirst}.${lastInitial}${counter}@mystory.edu`;
      user = await prisma.user.findUnique({ where: { email } });
      if (!user) return email;
      counter++;
    }
  }

  private static generatePassword(): string {
    return crypto.randomBytes(6).toString('hex'); // 12 character random string
  }

  public static async getUsers(page: number, limit: number, role?: Role) {
    const skip = (page - 1) * limit;
    
    const whereClause = role ? { role } : {};

    const users = await prisma.user.findMany({
      where: whereClause,
      skip,
      take: limit,
      include: {
        studentProfile: {
          include: { department: true }
        },
        facultyProfile: {
          include: { department: true }
        },
        hodProfile: {
          include: { department: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const totalCount = await prisma.user.count({ where: whereClause });

    return {
      data: users.map(user => {
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
            institutionId: user.id, // HoD doesn't have employeeId in schema
            department: user.hodProfile.department.name,
          };
        }

        return {
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          role: user.role === Role.HOD ? 'HoD' : user.role === Role.FACULTY ? 'Faculty' : 'Student',
          joined: `Joined ${user.createdAt.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`,
          isActive: user.isActive,
          ...profileData
        };
      }),
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit)
      }
    };
  }

  public static async createUser(data: CreateUserParams) {
    const email = await this.generateUniqueEmail(data.firstName, data.lastName);
    const password = this.generatePassword();
    const passwordHash = await bcrypt.hash(password, 10);

    const departmentRecord = await prisma.department.findUnique({
      where: { name: data.department }
    });

    if (!departmentRecord) {
      throw new Error(`Department "${data.department}" not found`);
    }

    let resultUser;

    await prisma.$transaction(async (tx) => {
      let role: Role = Role.STUDENT;
      if (data.userType === 'faculty') role = Role.FACULTY;
      if (data.userType === 'hod') role = Role.HOD;

      const user = await tx.user.create({
        data: {
          email,
          passwordHash,
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          role,
          isActive: data.isActive
        }
      });

      resultUser = user;

      if (role === Role.STUDENT) {
        if (!data.rollNumber) throw new Error("Roll Number is required for students");
        
        let programId = null;
        if (data.program) {
           const prog = await tx.program.findUnique({ where: { name: data.program } });
           if (prog) programId = prog.id;
        }

        let semesterId = null;
        if (data.semester && programId) {
          // Attempt to find semester by number within the program
          const semNumber = parseInt(data.semester.replace(/\D/g, '')) || 1;
          let sem = await tx.semester.findUnique({
            where: { programId_semesterNumber: { programId, semesterNumber: semNumber } }
          });
          if (!sem) {
            // Create semester if it doesn't exist for flexibility
            sem = await tx.semester.create({
              data: {
                semesterNumber: semNumber,
                programId
              }
            });
          }
          semesterId = sem.id;
        }

        let sectionId = null;
        if (data.section && semesterId) {
          let sec = await tx.section.findUnique({
            where: { semesterId_name: { semesterId, name: data.section } }
          });
          if (!sec) {
            sec = await tx.section.create({
              data: {
                name: data.section,
                semesterId
              }
            });
          }
          sectionId = sec.id;
        }

        await tx.studentProfile.create({
          data: {
            userId: user.id,
            departmentId: departmentRecord.id,
            rollNumber: data.rollNumber,
            batch: data.admissionYear || new Date().getFullYear().toString(),
            currentSemester: parseInt(data.semester?.replace(/\D/g, '') || "1"),
            programId,
            semesterId,
            sectionId
          }
        });
      } else if (role === Role.FACULTY) {
        if (!data.employeeId) throw new Error("Employee ID is required for faculty");
        if (!data.designation) throw new Error("Designation is required for faculty");

        await tx.facultyProfile.create({
          data: {
            userId: user.id,
            departmentId: departmentRecord.id,
            employeeId: data.employeeId,
            designation: data.designation,
            officeLocation: data.officeExtension
          }
        });
      } else if (role === Role.HOD) {
        await tx.hodProfile.create({
          data: {
            userId: user.id,
            departmentId: departmentRecord.id
          }
        });
      }
    });

    return {
      user: resultUser,
      generatedCredentials: {
        email,
        password
      }
    };
  }
}
