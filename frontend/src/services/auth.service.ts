import db from '@/lib/db';
import { hashPassword, comparePassword, generateToken } from '@/lib/auth';
import { BadRequestError, UnauthorizedError } from '@/lib/errors';
import { Role } from '@prisma/client';

export class AuthService {
  /**
   * Log in a user and issue a JWT token.
   * (Placeholder method - ready to connect to Auth API)
   */
  static async login(email: string, password: string) {
    // 1. Find user by email
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedError('Invalid credentials or inactive account');
    }

    // 2. Verify password hash
    const isPasswordValid = await comparePassword(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // 3. Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }

  /**
 * Register a new student.
 */
static async registerStudent(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  rollNumber: string;
  registrationNumber: string;
  departmentId: string;
  programId: string;
  semesterId: string;
  sectionId: string;
  currentSemester: number;
  batch: string;
}) {
  // Check if email already exists
  const existingUser = await db.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new BadRequestError('Email already registered');
  }

  // Check duplicate roll number
  const existingRollNumber =
    await db.studentProfile.findUnique({
      where: {
        rollNumber: data.rollNumber,
      },
    });

  if (existingRollNumber) {
    throw new BadRequestError(
      'Roll number already exists'
    );
  }

  // Check duplicate registration number
  const existingRegistrationNumber =
    await db.studentProfile.findUnique({
      where: {
        registrationNumber:
          data.registrationNumber,
      },
    });

  if (existingRegistrationNumber) {
    throw new BadRequestError(
      'Registration number already exists'
    );
  }

  // Hash password
  const passwordHash = await hashPassword(
    data.password
  );

  // Create user and student profile
  return db.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email: data.email,
        passwordHash,
        role: Role.STUDENT,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
      },
    });

    const profile =
      await tx.studentProfile.create({
        data: {
          userId: user.id,
          rollNumber: data.rollNumber,
          registrationNumber:
            data.registrationNumber,
          departmentId: data.departmentId,
          programId: data.programId,
          semesterId: data.semesterId,
          sectionId: data.sectionId,
          currentSemester:
            data.currentSemester,
          batch: data.batch,
        },
      });

    return {
      user,
      profile,
    };
  });
}
  
  /**
   * Stub for creating new HODs.
   */
  static async registerHod(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    departmentId: string;
  }) {
    const existing = await db.user.findUnique({
      where: { email: data.email },
    });
    if (existing) {
      throw new BadRequestError('Email already registered');
    }

    const passwordHash = await hashPassword(data.password);

    return db.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: data.email,
          passwordHash,
          role: Role.HOD,
          firstName: data.firstName,
          lastName: data.lastName,
        },
      });

      const profile = await tx.hodProfile.create({
        data: {
          userId: user.id,
          departmentId: data.departmentId,
        },
      });

      return { user, profile };
    });
  }
}
