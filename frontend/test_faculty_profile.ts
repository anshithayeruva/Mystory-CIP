import {
  PrismaClient,
  Role,
  PulseSessionType,
  PulseQuestionType,
  PulseDifficultyLevel,
  PulseAttendanceRule,
  PulseResultVisibility,
  PulseSessionStatus,
  StudentStatus,
} from '@prisma/client';
import { ProfileService } from './src/modules/faculty/profile/profile.service';
import {
  updateProfileSchema,
  changePasswordSchema,
  assignedSubjectsQuerySchema,
} from './src/modules/faculty/profile/profile.validation';
import { hashPassword, comparePassword } from './src/lib/auth';
import { BadRequestError, ForbiddenError } from './src/lib/errors';

const prisma = new PrismaClient();

async function main() {
  console.log('=== Starting Faculty Profile Verification Test ===\n');

  let testDeptId = '';
  let testProgramId = '';
  let testSemesterId = '';
  let testSectionId = '';
  let faculty1UserId = '';
  let faculty1ProfileId = '';
  let studentUserId = '';
  let studentProfileId = '';
  let course1Id = '';
  let course2Id = '';
  let facultyCourse1Id = '';
  let facultyCourse2Id = '';
  let unitId = '';
  let topicId = '';

  try {
    console.log('1. Setting up Test Prerequisites...');
    const now = Date.now();

    // 1.1 Department & Program
    const dept = await prisma.department.create({
      data: {
        name: `Test Profile Dept ${now}`,
        code: `PROF_DEPT_${now}`,
      },
    });
    testDeptId = dept.id;

    const program = await prisma.program.create({
      data: {
        name: `Test Profile Program ${now}`,
        code: `PROF_PROG_${now}`,
        departmentId: dept.id,
      },
    });
    testProgramId = program.id;

    const semester = await prisma.semester.create({
      data: {
        semesterNumber: 3,
        programId: program.id,
      },
    });
    testSemesterId = semester.id;

    const section = await prisma.section.create({
      data: {
        name: 'P1',
        semesterId: semester.id,
      },
    });
    testSectionId = section.id;

    // 1.2 Faculty 1
    const initialPassHash = await hashPassword('OldValidPass@123');
    const f1User = await prisma.user.create({
      data: {
        email: `faculty.prof.${now}@test.edu`,
        passwordHash: initialPassHash,
        role: Role.FACULTY,
        firstName: 'Dr. John',
        lastName: 'Smith',
        phoneNumber: '+1 555-0100',
        lastLoginAt: new Date(),
      },
    });
    faculty1UserId = f1User.id;

    const f1Profile = await prisma.facultyProfile.create({
      data: {
        userId: f1User.id,
        employeeId: `EMP_PROF_${now}`,
        designation: 'Associate Professor',
        departmentId: dept.id,
        profilePicture: 'https://example.com/avatar1.png',
        officeLocation: 'Room 301, Science Block',
      },
    });
    faculty1ProfileId = f1Profile.id;

    // 1.3 Student (for authorization failure test)
    const stUser = await prisma.user.create({
      data: {
        email: `student.prof.${now}@test.edu`,
        passwordHash: 'dummyhash',
        role: Role.STUDENT,
        firstName: 'Student',
        lastName: 'One',
      },
    });
    studentUserId = stUser.id;

    const stProfile = await prisma.studentProfile.create({
      data: {
        userId: stUser.id,
        rollNumber: `ROLL_PROF_${now}`,
        registrationNumber: `REG_PROF_${now}`,
        departmentId: dept.id,
        currentSemester: 3,
        batch: '2024-2028',
        programId: program.id,
        semesterId: semester.id,
        sectionId: section.id,
        status: StudentStatus.ACTIVE,
      },
    });
    studentProfileId = stProfile.id;

    // 1.4 Courses & Faculty Assignments
    const course1 = await prisma.course.create({
      data: {
        name: `Web Development ${now}`,
        code: `WEB_${now}`,
        credits: 4,
        departmentId: dept.id,
        programId: program.id,
        semester: 3,
      },
    });
    course1Id = course1.id;

    const fc1 = await prisma.facultyCourse.create({
      data: {
        facultyId: f1Profile.id,
        courseId: course1.id,
        section: 'P1',
        semester: 3,
        academicYear: '2025-2026',
      },
    });
    facultyCourse1Id = fc1.id;

    const course2 = await prisma.course.create({
      data: {
        name: `Database Systems ${now}`,
        code: `DB_${now}`,
        credits: 3,
        departmentId: dept.id,
        programId: program.id,
        semester: 3,
      },
    });
    course2Id = course2.id;

    const fc2 = await prisma.facultyCourse.create({
      data: {
        facultyId: f1Profile.id,
        courseId: course2.id,
        section: 'P1',
        semester: 3,
        academicYear: '2025-2026',
      },
    });
    facultyCourse2Id = fc2.id;

    // 1.5 Unit & Topic for Pulse Sessions
    const unit = await prisma.unit.create({
      data: {
        courseId: course1.id,
        unitNumber: 1,
        unitName: 'Intro to Web',
      },
    });
    unitId = unit.id;

    const topic = await prisma.topic.create({
      data: {
        unitId: unit.id,
        topicName: 'HTML & CSS',
      },
    });
    topicId = topic.id;

    // 1.6 Create Pulse Sessions
    // Course 1: 1 LIVE, 1 PAUSED, 1 COMPLETED
    await prisma.pulseSession.createMany({
      data: [
        {
          courseId: course1.id,
          topicId: topic.id,
          departmentId: dept.id,
          programId: program.id,
          semester: 3,
          section: 'P1',
          facultyId: f1Profile.id,
          sessionType: PulseSessionType.MID_CLASS_CHECK,
          title: 'Session Live',
          date: new Date(),
          startTime: '10:00 AM',
          durationMinutes: 15,
          questionCount: 5,
          questionType: PulseQuestionType.MCQ,
          difficultyLevel: PulseDifficultyLevel.MEDIUM,
          attendanceRule: PulseAttendanceRule.ATTEMPT_REQUIRED,
          resultVisibility: PulseResultVisibility.IMMEDIATE,
          status: PulseSessionStatus.LIVE,
        },
        {
          courseId: course1.id,
          topicId: topic.id,
          departmentId: dept.id,
          programId: program.id,
          semester: 3,
          section: 'P1',
          facultyId: f1Profile.id,
          sessionType: PulseSessionType.MID_CLASS_CHECK,
          title: 'Session Paused',
          date: new Date(),
          startTime: '11:00 AM',
          durationMinutes: 15,
          questionCount: 5,
          questionType: PulseQuestionType.MCQ,
          difficultyLevel: PulseDifficultyLevel.MEDIUM,
          attendanceRule: PulseAttendanceRule.ATTEMPT_REQUIRED,
          resultVisibility: PulseResultVisibility.IMMEDIATE,
          status: PulseSessionStatus.PAUSED,
        },
        {
          courseId: course1.id,
          topicId: topic.id,
          departmentId: dept.id,
          programId: program.id,
          semester: 3,
          section: 'P1',
          facultyId: f1Profile.id,
          sessionType: PulseSessionType.MID_CLASS_CHECK,
          title: 'Session Completed',
          date: new Date(),
          startTime: '12:00 PM',
          durationMinutes: 15,
          questionCount: 5,
          questionType: PulseQuestionType.MCQ,
          difficultyLevel: PulseDifficultyLevel.MEDIUM,
          attendanceRule: PulseAttendanceRule.ATTEMPT_REQUIRED,
          resultVisibility: PulseResultVisibility.IMMEDIATE,
          status: PulseSessionStatus.COMPLETED,
        },
        // Course 2: 1 ARCHIVED
        {
          courseId: course2.id,
          topicId: topic.id,
          departmentId: dept.id,
          programId: program.id,
          semester: 3,
          section: 'P1',
          facultyId: f1Profile.id,
          sessionType: PulseSessionType.END_OF_CLASS_CHECK,
          title: 'Session Archived',
          date: new Date(),
          startTime: '01:00 PM',
          durationMinutes: 10,
          questionCount: 3,
          questionType: PulseQuestionType.TRUE_FALSE,
          difficultyLevel: PulseDifficultyLevel.EASY,
          attendanceRule: PulseAttendanceRule.QR_ATTENDANCE_ONLY,
          resultVisibility: PulseResultVisibility.STUDENTS_AFTER_SESSION,
          status: PulseSessionStatus.ARCHIVED,
        },
      ],
    });

    console.log('✔ Prerequisites created successfully.\n');

    // =========================================================================
    // TEST 1: VIEW PROFILE
    // =========================================================================
    console.log('--- Test 1: View Profile ---');
    const profileRes = await ProfileService.getProfile(faculty1UserId);
    if (
      profileRes.facultyId !== faculty1ProfileId ||
      profileRes.fullName !== 'Dr. John Smith' ||
      profileRes.email !== `faculty.prof.${now}@test.edu` ||
      profileRes.employeeId !== `EMP_PROF_${now}` ||
      profileRes.department.id !== dept.id ||
      profileRes.assignedSubjects.length !== 2 ||
      profileRes.profilePicture !== 'https://example.com/avatar1.png' ||
      profileRes.contactNumber !== '+1 555-0100' ||
      profileRes.officeLocation !== 'Room 301, Science Block'
    ) {
      throw new Error(`View Profile mismatch: ${JSON.stringify(profileRes, null, 2)}`);
    }
    // Check that sensitive auth data is NOT present
    if ('passwordHash' in profileRes || 'password' in profileRes || 'salt' in profileRes) {
      throw new Error('Sensitive authentication data exposed in profile response!');
    }
    console.log('✔ Correctly retrieved faculty profile with assigned subjects and zero sensitive auth data.\n');

    // =========================================================================
    // TEST 2: UPDATE PROFILE
    // =========================================================================
    console.log('--- Test 2: Update Profile (Editable Fields) ---');
    const updateInput = updateProfileSchema.parse({
      fullName: 'Dr. Jane Doe',
      contactNumber: '+1 555-0199',
      profilePicture: 'https://example.com/jane.jpg',
      officeLocation: 'Room 404, Building B',
      // Pass read-only fields to verify they are stripped/ignored by Zod
      email: 'hack@test.com',
      employeeId: 'HACK001',
      designation: 'Hacker',
    });

    const updatedProfile = await ProfileService.updateProfile(faculty1UserId, updateInput);
    if (
      updatedProfile.fullName !== 'Dr. Jane Doe' ||
      updatedProfile.contactNumber !== '+1 555-0199' ||
      updatedProfile.profilePicture !== 'https://example.com/jane.jpg' ||
      updatedProfile.officeLocation !== 'Room 404, Building B' ||
      updatedProfile.email !== `faculty.prof.${now}@test.edu` || // Read-only preserved
      updatedProfile.employeeId !== `EMP_PROF_${now}` // Read-only preserved
    ) {
      throw new Error(`Update Profile failed or read-only field overwritten: ${JSON.stringify(updatedProfile, null, 2)}`);
    }
    console.log('✔ Correctly updated editable fields while preserving read-only fields.\n');

    // =========================================================================
    // TEST 3: CHANGE PASSWORD
    // =========================================================================
    console.log('--- Test 3: Change Password ---');
    // 3.1 Verify wrong current password fails
    try {
      await ProfileService.changePassword(faculty1UserId, {
        currentPassword: 'WrongPassword!',
        newPassword: 'NewValidPass@456',
      });
      throw new Error('Should have rejected wrong current password');
    } catch (err) {
      if (!(err instanceof BadRequestError) && !((err as Error).message.includes('Incorrect current password'))) {
        throw err;
      }
      console.log('✔ Correctly rejected wrong current password.');
    }

    // 3.2 Verify password reuse fails
    try {
      await ProfileService.changePassword(faculty1UserId, {
        currentPassword: 'OldValidPass@123',
        newPassword: 'OldValidPass@123',
      });
      throw new Error('Should have rejected reuse of current password');
    } catch (err) {
      if (!(err instanceof BadRequestError) && !((err as Error).message.includes('New password cannot be the same'))) {
        throw err;
      }
      console.log('✔ Correctly prevented reuse of current password.');
    }

    // 3.3 Successful password change
    const pwdRes = await ProfileService.changePassword(faculty1UserId, {
      currentPassword: 'OldValidPass@123',
      newPassword: 'NewValidPass@456',
    });
    if (!pwdRes.success) {
      throw new Error('Password change failed unexpectedly');
    }
    // Verify in DB with comparePassword
    const dbUser = await prisma.user.findUniqueOrThrow({ where: { id: faculty1UserId } });
    const isNewValid = await comparePassword('NewValidPass@456', dbUser.passwordHash);
    if (!isNewValid) {
      throw new Error('New password was not properly hashed and stored in database');
    }
    console.log('✔ Correctly changed and hashed new password in database.\n');

    // =========================================================================
    // TEST 4: ASSIGNED SUBJECTS (WITH PULSE STATS)
    // =========================================================================
    console.log('--- Test 4: Assigned Subjects (with Pulse Stats) ---');
    const subjectsRes = await ProfileService.getAssignedSubjects(faculty1UserId, {});
    if (subjectsRes.data.length !== 2) {
      throw new Error(`Expected 2 assigned subjects, got ${subjectsRes.data.length}`);
    }

    const c1Stat = subjectsRes.data.find((s) => s.courseId === course1Id);
    const c2Stat = subjectsRes.data.find((s) => s.courseId === course2Id);

    if (!c1Stat || c1Stat.totalSessionsCreated !== 3 || c1Stat.activeSessions !== 2 || c1Stat.completedSessions !== 1) {
      throw new Error(`Course 1 pulse stats mismatch: ${JSON.stringify(c1Stat)}`);
    }
    if (!c2Stat || c2Stat.totalSessionsCreated !== 1 || c2Stat.activeSessions !== 0 || c2Stat.completedSessions !== 1) {
      throw new Error(`Course 2 pulse stats mismatch: ${JSON.stringify(c2Stat)}`);
    }
    console.log('✔ Correctly aggregated total, active, and completed Pulse session counts per assigned subject.\n');

    // =========================================================================
    // TEST 5: PROFILE DASHBOARD
    // =========================================================================
    console.log('--- Test 5: Profile Dashboard ---');
    const dashSummary = await ProfileService.getDashboardSummary(faculty1UserId);
    if (
      dashSummary.totalAssignedSubjects !== 2 ||
      dashSummary.totalSessionsCreated !== 4 ||
      dashSummary.totalActiveSessions !== 2 ||
      dashSummary.totalCompletedSessions !== 2 ||
      dashSummary.profileCompletionPercentage !== 100 || // Phone, office, and picture all set!
      !dashSummary.lastLogin
    ) {
      throw new Error(`Dashboard summary mismatch: ${JSON.stringify(dashSummary, null, 2)}`);
    }
    console.log('✔ Correctly generated dashboard summary KPIs and 100% completion percentage.\n');

    // =========================================================================
    // TEST 6: SEARCH & FILTERING ON ASSIGNED SUBJECTS
    // =========================================================================
    console.log('--- Test 6: Search & Filtering on Assigned Subjects ---');
    // Search by code
    const searchRes = await ProfileService.getAssignedSubjects(faculty1UserId, { search: 'WEB_' });
    if (searchRes.data.length !== 1 || searchRes.data[0].courseId !== course1Id) {
      throw new Error(`Search filter failed: ${JSON.stringify(searchRes.data)}`);
    }
    // Filter by programId
    const progRes = await ProfileService.getAssignedSubjects(faculty1UserId, { programId: testProgramId });
    if (progRes.data.length !== 2) {
      throw new Error(`Program filter failed: expected 2, got ${progRes.data.length}`);
    }
    console.log('✔ Correctly filtered assigned subjects by search query and program ID.\n');

    // =========================================================================
    // TEST 7: PAGINATION ON ASSIGNED SUBJECTS
    // =========================================================================
    console.log('--- Test 7: Pagination on Assigned Subjects ---');
    const pageRes = await ProfileService.getAssignedSubjects(faculty1UserId, { page: 1, limit: 1 });
    if (
      pageRes.data.length !== 1 ||
      pageRes.meta.page !== 1 ||
      pageRes.meta.limit !== 1 ||
      pageRes.meta.total !== 2 ||
      pageRes.meta.totalPages !== 2
    ) {
      throw new Error(`Pagination metadata mismatch: ${JSON.stringify(pageRes.meta)}`);
    }
    console.log('✔ Correctly paginated assigned subjects with accurate metadata.\n');

    // =========================================================================
    // TEST 8: AUTHORIZATION FAILURES
    // =========================================================================
    console.log('--- Test 8: Authorization Failures ---');
    try {
      await ProfileService.getProfile(studentUserId);
      throw new Error('Should have rejected student user accessing faculty profile');
    } catch (err) {
      if (!(err instanceof ForbiddenError)) {
        throw err;
      }
      console.log('✔ Correctly rejected unauthorized non-faculty user access.\n');
    }

    // =========================================================================
    // TEST 9: VALIDATION FAILURES
    // =========================================================================
    console.log('--- Test 9: Validation Failures ---');
    // Invalid phone number format
    const phoneParse = updateProfileSchema.safeParse({ contactNumber: 'abc-invalid' });
    if (phoneParse.success) {
      throw new Error('Should have failed validation for invalid phone number');
    }
    // Invalid image URL format
    const imgParse = updateProfileSchema.safeParse({ profilePicture: 'not-a-url' });
    if (imgParse.success) {
      throw new Error('Should have failed validation for invalid profile picture URL');
    }
    // Weak password
    const pwdParse = changePasswordSchema.safeParse({ currentPassword: 'valid', newPassword: '123' });
    if (pwdParse.success) {
      throw new Error('Should have failed validation for short new password');
    }
    console.log('✔ Correctly rejected invalid inputs via Zod validation schemas.\n');

    console.log('=== ALL FACULTY PROFILE INTEGRATION TESTS PASSED SUCCESSFULLY! ===\n');
  } catch (error) {
    console.error('❌ Test Failed:', error);
    process.exit(1);
  } finally {
    console.log('Cleaning up test prerequisites...');
    try {
      // Delete pulse sessions
      await prisma.pulseSession.deleteMany({
        where: { departmentId: testDeptId },
      });
      // Delete topic & unit
      if (topicId) await prisma.topic.delete({ where: { id: topicId } }).catch(() => {});
      if (unitId) await prisma.unit.delete({ where: { id: unitId } }).catch(() => {});
      // Delete faculty courses & courses
      await prisma.facultyCourse.deleteMany({ where: { facultyId: faculty1ProfileId } });
      if (course1Id) await prisma.course.delete({ where: { id: course1Id } }).catch(() => {});
      if (course2Id) await prisma.course.delete({ where: { id: course2Id } }).catch(() => {});
      // Delete student profile & user
      if (studentProfileId) await prisma.studentProfile.delete({ where: { id: studentProfileId } }).catch(() => {});
      if (studentUserId) await prisma.user.delete({ where: { id: studentUserId } }).catch(() => {});
      // Delete faculty profile & user
      if (faculty1ProfileId) await prisma.facultyProfile.delete({ where: { id: faculty1ProfileId } }).catch(() => {});
      if (faculty1UserId) await prisma.user.delete({ where: { id: faculty1UserId } }).catch(() => {});
      // Delete section, semester, program, dept
      if (testSectionId) await prisma.section.delete({ where: { id: testSectionId } }).catch(() => {});
      if (testSemesterId) await prisma.semester.delete({ where: { id: testSemesterId } }).catch(() => {});
      if (testProgramId) await prisma.program.delete({ where: { id: testProgramId } }).catch(() => {});
      if (testDeptId) await prisma.department.delete({ where: { id: testDeptId } }).catch(() => {});
      console.log('✔ Cleanup complete.');
    } catch (cleanupError) {
      console.error('Warning during cleanup:', cleanupError);
    }
    await prisma.$disconnect();
  }
}

main();
