import {
  PrismaClient,
  Role,
  PulseSessionType,
  PulseQuestionType,
  PulseDifficultyLevel,
  PulseAttendanceRule,
  PulseResultVisibility,
  PulseSessionStatus,
  PulseTimerStatus,
} from '@prisma/client';
import { PulseService } from './src/modules/faculty/pulse/pulse.service';
import { ExecutionService } from './src/modules/faculty/pulse-execution/execution.service';
import { ForbiddenError, ConflictError } from './src/lib/errors';

const prisma = new PrismaClient();

async function main() {
  console.log('=== Starting Faculty Classroom Pulse Session Execution Verification Test ===\n');

  let testDeptId = '';
  let testProgramId = '';
  let faculty1UserId = '';
  let faculty1ProfileId = '';
  let faculty2UserId = '';
  let faculty2ProfileId = '';
  let courseId = '';
  let unitId = '';
  let topicId = '';
  let session1Id = '';
  let session2Id = '';

  try {
    // 1. Setup Prerequisites
    console.log('1. Creating test prerequisites (Department, Program, Faculty, Course, Unit, Topic)...');

    const dept = await prisma.department.create({
      data: {
        name: 'Test Exec Dept ' + Date.now(),
        code: 'EXEC_DEPT_' + Math.floor(Math.random() * 10000),
      },
    });
    testDeptId = dept.id;

    const program = await prisma.program.create({
      data: {
        name: 'Test Exec Program ' + Date.now(),
        code: 'EXEC_PROG_' + Math.floor(Math.random() * 10000),
        departmentId: dept.id,
      },
    });
    testProgramId = program.id;

    // Faculty 1
    const user1 = await prisma.user.create({
      data: {
        email: `exec_fac1_${Date.now()}@test.com`,
        passwordHash: 'hashedpassword',
        role: Role.FACULTY,
        firstName: 'Alan',
        lastName: 'Turing',
      },
    });
    faculty1UserId = user1.id;

    const profile1 = await prisma.facultyProfile.create({
      data: {
        userId: user1.id,
        employeeId: `EMP_EXEC1_${Math.floor(Math.random() * 10000)}`,
        designation: 'Assistant Professor',
        departmentId: dept.id,
      },
    });
    faculty1ProfileId = profile1.id;

    // Faculty 2
    const user2 = await prisma.user.create({
      data: {
        email: `exec_fac2_${Date.now()}@test.com`,
        passwordHash: 'hashedpassword',
        role: Role.FACULTY,
        firstName: 'Ada',
        lastName: 'Lovelace',
      },
    });
    faculty2UserId = user2.id;

    const profile2 = await prisma.facultyProfile.create({
      data: {
        userId: user2.id,
        employeeId: `EMP_EXEC2_${Math.floor(Math.random() * 10000)}`,
        designation: 'Associate Professor',
        departmentId: dept.id,
      },
    });
    faculty2ProfileId = profile2.id;

    // Course & Assignment
    const course = await prisma.course.create({
      data: {
        name: 'Execution Test Course ' + Date.now(),
        code: 'EXEC_COURSE_' + Math.floor(Math.random() * 10000),
        credits: 4,
        departmentId: dept.id,
        programId: program.id,
        semester: 3,
      },
    });
    courseId = course.id;

    await prisma.facultyCourse.createMany({
      data: [
        { facultyId: faculty1ProfileId, courseId: course.id, section: 'A', semester: 3, academicYear: '2025-2026' },
        { facultyId: faculty2ProfileId, courseId: course.id, section: 'B', semester: 3, academicYear: '2025-2026' },
      ],
    });

    // Unit & Topic
    const unit = await prisma.unit.create({
      data: {
        courseId: course.id,
        unitNumber: 1,
        unitName: 'Execution Unit 1',
        description: 'Testing session execution',
      },
    });
    unitId = unit.id;

    const topic = await prisma.topic.create({
      data: {
        unitId: unit.id,
        topicName: 'Execution Topic 1',
        description: 'Topic for execution test',
      },
    });
    topicId = topic.id;

    // Create Pulse Sessions
    console.log('2. Creating Pulse Sessions for Faculty 1 and Faculty 2...');
    const session1 = await PulseService.createSession(faculty1UserId, {
      courseId: course.id,
      topicId: topic.id,
      departmentId: testDeptId,
      programId: testProgramId,
      semester: 3,
      section: 'A',
      sessionType: PulseSessionType.MID_CLASS_CHECK,
      title: 'Faculty 1 Live Execution Session',
      description: 'Testing execution features',
      date: new Date(),
      startTime: '10:00',
      durationMinutes: 15,
      questionCount: 5,
      questionType: PulseQuestionType.MCQ,
      difficultyLevel: PulseDifficultyLevel.MEDIUM,
      attendanceRule: PulseAttendanceRule.BOTH,
      resultVisibility: PulseResultVisibility.IMMEDIATE,
    });
    session1Id = session1.id;

    const session2 = await PulseService.createSession(faculty2UserId, {
      courseId: course.id,
      topicId: topic.id,
      departmentId: testDeptId,
      programId: testProgramId,
      semester: 3,
      section: 'B',
      sessionType: PulseSessionType.END_OF_CLASS_CHECK,
      title: 'Faculty 2 Session',
      date: new Date(),
      startTime: '11:00',
      durationMinutes: 20,
      questionCount: 3,
      questionType: PulseQuestionType.TRUE_FALSE,
      difficultyLevel: PulseDifficultyLevel.EASY,
      attendanceRule: PulseAttendanceRule.QR_ATTENDANCE_ONLY,
      resultVisibility: PulseResultVisibility.FACULTY_ONLY,
    });
    session2Id = session2.id;

    console.log('✔ Prerequisites and initial sessions created successfully.\n');

    // 2. Test Session Code Generation & QR Code
    console.log('3. Testing Session Code Generation & QR Code...');
    const codeResp = await ExecutionService.generateCode(faculty1UserId, session1Id, { length: 6, expiresInHours: 12 });
    if (!codeResp.sessionCode || codeResp.sessionCode.length !== 6 || !codeResp.isCodeActive) {
      throw new Error('Invalid session code response structure.');
    }
    if (!codeResp.qrCodeUrl || !codeResp.qrCodeUrl.startsWith('data:image/png;base64,')) {
      throw new Error('QR Code Base64 Data URL was not generated correctly.');
    }
    console.log(`✔ Generated Session Code: ${codeResp.sessionCode}`);

    // Retrieve Code & QR Code
    const fetchedCode = await ExecutionService.getCode(faculty1UserId, session1Id);
    if (fetchedCode.sessionCode !== codeResp.sessionCode) {
      throw new Error('Fetched session code does not match generated code.');
    }
    const fetchedQr = await ExecutionService.getQrCode(faculty1UserId, session1Id);
    if (fetchedQr.qrCodeUrl !== codeResp.qrCodeUrl) {
      throw new Error('Fetched QR code URL does not match generated QR code.');
    }
    console.log('✔ Session Code and QR Code retrieval verified.');

    // Regenerate Code
    const oldCode = codeResp.sessionCode;
    const regenResp = await ExecutionService.regenerateCode(faculty1UserId, session1Id, { length: 8, expiresInHours: 24 });
    if (regenResp.sessionCode === oldCode || regenResp.sessionCode.length !== 8) {
      throw new Error('Session code regeneration failed to produce a new 8-char code.');
    }
    if (regenResp.qrCodeUrl === codeResp.qrCodeUrl) {
      throw new Error('QR Code was not automatically regenerated when session code changed.');
    }
    console.log(`✔ Regenerated new 8-char Session Code: ${regenResp.sessionCode}`);

    // 3. Test Authorization Isolation
    console.log('\n4. Testing Authorization Isolation...');
    try {
      await ExecutionService.generateCode(faculty2UserId, session1Id);
      throw new Error('Authorization defense failed: Faculty 2 generated code for Faculty 1 session!');
    } catch (err) {
      if (err instanceof ForbiddenError) {
        console.log('✔ Faculty 2 correctly rejected from generating code for Faculty 1 session.');
      } else {
        throw err;
      }
    }

    try {
      await ExecutionService.startSession(faculty2UserId, session1Id);
      throw new Error('Authorization defense failed: Faculty 2 started Faculty 1 session!');
    } catch (err) {
      if (err instanceof ForbiddenError) {
        console.log('✔ Faculty 2 correctly rejected from starting Faculty 1 session.');
      } else {
        throw err;
      }
    }

    // 4. Test Session Lifecycle Status (State Machine)
    console.log('\n5. Testing Session Status Transitions (State Machine)...');
    let statusResp = await ExecutionService.getStatus(faculty1UserId, session1Id);
    if (statusResp.status !== PulseSessionStatus.DRAFT) {
      throw new Error(`Expected DRAFT status, got ${statusResp.status}`);
    }

    // Invalid transition defense: DRAFT -> PAUSED directly should fail
    try {
      await ExecutionService.pauseSession(faculty1UserId, session1Id);
      throw new Error('Invalid transition defense failed: Allowed DRAFT -> PAUSED directly!');
    } catch (err) {
      if (err instanceof ConflictError) {
        console.log('✔ Correctly rejected invalid transition (DRAFT -> PAUSED).');
      } else {
        throw err;
      }
    }

    // Publish Session (DRAFT -> PUBLISHED)
    statusResp = await ExecutionService.publishSession(faculty1UserId, session1Id);
    if (statusResp.status !== PulseSessionStatus.PUBLISHED) {
      throw new Error(`Expected PUBLISHED status, got ${statusResp.status}`);
    }
    console.log('✔ Session transitioned to PUBLISHED.');

    // Start Session (PUBLISHED -> LIVE)
    statusResp = await ExecutionService.startSession(faculty1UserId, session1Id);
    if (statusResp.status !== PulseSessionStatus.LIVE) {
      throw new Error(`Expected LIVE status, got ${statusResp.status}`);
    }
    console.log('✔ Session transitioned to LIVE.');

    // Reject Code Regeneration when LIVE
    try {
      await ExecutionService.regenerateCode(faculty1UserId, session1Id);
      throw new Error('Defense failed: Allowed code regeneration when session is LIVE!');
    } catch (err) {
      if (err instanceof ConflictError) {
        console.log('✔ Correctly rejected code regeneration when session is LIVE.');
      } else {
        throw err;
      }
    }

    // 5. Test Session Timer
    console.log('\n6. Testing Session Timer Lifecycle...');
    let timerResp = await ExecutionService.getTimerStatus(faculty1UserId, session1Id);
    if (timerResp.timerStatus !== PulseTimerStatus.IDLE) {
      throw new Error(`Expected timer status IDLE, got ${timerResp.timerStatus}`);
    }

    // Start Timer (e.g. 10 minutes)
    timerResp = await ExecutionService.startTimer(faculty1UserId, session1Id, 10);
    if (timerResp.timerStatus !== PulseTimerStatus.RUNNING || timerResp.durationMinutes !== 10 || timerResp.remainingSeconds !== 600) {
      throw new Error('Timer failed to start with correct duration and remaining seconds.');
    }
    if (!timerResp.actualStartTime) {
      throw new Error('Timer actualStartTime was not set.');
    }
    console.log('✔ Timer started successfully (10 minutes, 600s remaining).');

    // Pause Timer
    timerResp = await ExecutionService.pauseTimer(faculty1UserId, session1Id);
    if (timerResp.timerStatus !== PulseTimerStatus.PAUSED) {
      throw new Error(`Expected timer status PAUSED, got ${timerResp.timerStatus}`);
    }
    console.log('✔ Timer paused successfully.');

    // Resume Timer
    timerResp = await ExecutionService.resumeTimer(faculty1UserId, session1Id);
    if (timerResp.timerStatus !== PulseTimerStatus.RUNNING) {
      throw new Error(`Expected timer status RUNNING after resume, got ${timerResp.timerStatus}`);
    }
    console.log('✔ Timer resumed successfully.');

    // End Timer
    timerResp = await ExecutionService.endTimer(faculty1UserId, session1Id);
    if (timerResp.timerStatus !== PulseTimerStatus.COMPLETED || timerResp.remainingSeconds !== 0 || !timerResp.actualEndTime) {
      throw new Error('Timer failed to end properly.');
    }
    console.log('✔ Timer completed successfully.');

    // 6. Complete and Archive Session
    console.log('\n7. Testing Session Completion & Archiving...');
    statusResp = await ExecutionService.endSession(faculty1UserId, session1Id);
    if (statusResp.status !== PulseSessionStatus.COMPLETED) {
      throw new Error(`Expected COMPLETED status, got ${statusResp.status}`);
    }
    const completedCode = await ExecutionService.getCode(faculty1UserId, session1Id);
    if (completedCode.isCodeActive !== false) {
      throw new Error('Session code should be deactivated upon session completion.');
    }
    console.log('✔ Session completed and session code deactivated.');

    // Try starting twice defense (COMPLETED -> LIVE should fail)
    try {
      await ExecutionService.startSession(faculty1UserId, session1Id);
      throw new Error('Defense failed: Allowed session to start twice (COMPLETED -> LIVE)!');
    } catch (err) {
      if (err instanceof ConflictError) {
        console.log('✔ Correctly rejected starting session twice.');
      } else {
        throw err;
      }
    }

    // Close and Archive
    statusResp = await ExecutionService.closeSession(faculty1UserId, session1Id);
    if (statusResp.status !== PulseSessionStatus.CLOSED) {
      throw new Error(`Expected CLOSED status, got ${statusResp.status}`);
    }

    statusResp = await ExecutionService.archiveSession(faculty1UserId, session1Id);
    if (statusResp.status !== PulseSessionStatus.ARCHIVED) {
      throw new Error(`Expected ARCHIVED status, got ${statusResp.status}`);
    }
    console.log('✔ Session closed and archived successfully.');

    console.log('\n=== ALL SESSION EXECUTION INTEGRATION TESTS PASSED SUCCESSFULLY! ===\n');

  } catch (error) {
    console.error('❌ Test failed with error:', error);
    process.exit(1);
  } finally {
    console.log('Cleaning up test prerequisites...');
    if (session1Id) await prisma.pulseSession.deleteMany({ where: { id: session1Id } }).catch(() => {});
    if (session2Id) await prisma.pulseSession.deleteMany({ where: { id: session2Id } }).catch(() => {});
    if (topicId) await prisma.topic.deleteMany({ where: { id: topicId } }).catch(() => {});
    if (unitId) await prisma.unit.deleteMany({ where: { id: unitId } }).catch(() => {});
    if (courseId) await prisma.facultyCourse.deleteMany({ where: { courseId } }).catch(() => {});
    if (courseId) await prisma.course.deleteMany({ where: { id: courseId } }).catch(() => {});
    if (faculty1ProfileId) await prisma.facultyProfile.deleteMany({ where: { id: faculty1ProfileId } }).catch(() => {});
    if (faculty2ProfileId) await prisma.facultyProfile.deleteMany({ where: { id: faculty2ProfileId } }).catch(() => {});
    if (faculty1UserId) await prisma.user.deleteMany({ where: { id: faculty1UserId } }).catch(() => {});
    if (faculty2UserId) await prisma.user.deleteMany({ where: { id: faculty2UserId } }).catch(() => {});
    if (testProgramId) await prisma.program.deleteMany({ where: { id: testProgramId } }).catch(() => {});
    if (testDeptId) await prisma.department.deleteMany({ where: { id: testDeptId } }).catch(() => {});
    await prisma.$disconnect();
    console.log('✔ Cleanup complete.');
  }
}

main();
