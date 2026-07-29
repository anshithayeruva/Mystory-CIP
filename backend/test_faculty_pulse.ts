import {
  PrismaClient,
  Role,
  PulseSessionType,
  PulseQuestionType,
  PulseDifficultyLevel,
  PulseAttendanceRule,
  PulseResultVisibility,
} from '@prisma/client';
import { PulseService } from './src/modules/faculty/pulse/pulse.service';
import { SubjectService } from './src/modules/faculty/subjects/subject.service';
import { ForbiddenError, ConflictError } from './src/lib/errors';

const prisma = new PrismaClient();

async function main() {
  console.log('=== Starting Faculty Classroom Pulse Session Verification Test ===\n');

  let testDeptId = '';
  let testProgramId = '';
  let faculty1UserId = '';
  let faculty1ProfileId = '';
  let faculty2UserId = '';
  let faculty2ProfileId = '';
  let course1Id = '';
  let course2Id = '';
  let unit1Id = '';
  let topic1Id = '';
  let topic2Id = '';
  let course2UnitId = '';
  let course2TopicId = '';
  let session1Id = '';
  let session2Id = '';

  try {
    // 1. Setup Prerequisites
    console.log('1. Creating test prerequisites (Department, Program, Faculty, Courses, Units, Topics)...');

    const dept = await prisma.department.create({
      data: {
        name: 'Test Pulse CS Dept ' + Date.now(),
        code: 'PULSE_CS_' + Math.floor(Math.random() * 10000),
      },
    });
    testDeptId = dept.id;

    const program = await prisma.program.create({
      data: {
        name: 'Test B.Tech Pulse ' + Date.now(),
        code: 'PULSE_BTECH_' + Math.floor(Math.random() * 10000),
        departmentId: testDeptId,
      },
    });
    testProgramId = program.id;

    const user1 = await prisma.user.create({
      data: {
        email: `pulse_fac1_${Date.now()}@test.edu`,
        passwordHash: 'hashedpassword',
        role: Role.FACULTY,
        firstName: 'Grace',
        lastName: 'Hopper',
      },
    });
    faculty1UserId = user1.id;

    const profile1 = await prisma.facultyProfile.create({
      data: {
        userId: faculty1UserId,
        employeeId: 'EMP_PULSE1_' + Math.floor(Math.random() * 100000),
        designation: 'Professor',
        departmentId: testDeptId,
      },
    });
    faculty1ProfileId = profile1.id;

    const user2 = await prisma.user.create({
      data: {
        email: `pulse_fac2_${Date.now()}@test.edu`,
        passwordHash: 'hashedpassword',
        role: Role.FACULTY,
        firstName: 'Donald',
        lastName: 'Knuth',
      },
    });
    faculty2UserId = user2.id;

    const profile2 = await prisma.facultyProfile.create({
      data: {
        userId: faculty2UserId,
        employeeId: 'EMP_PULSE2_' + Math.floor(Math.random() * 100000),
        designation: 'Professor',
        departmentId: testDeptId,
      },
    });
    faculty2ProfileId = profile2.id;

    // Faculty 1 creates Course 1
    const course1 = await SubjectService.createSubject(faculty1UserId, {
      name: 'Compiler Construction ' + Date.now(),
      code: 'CS_COMP_' + Math.floor(Math.random() * 10000),
      credits: 4,
      departmentId: testDeptId,
      programId: testProgramId,
      semester: 6,
    });
    course1Id = course1.id;

    // Faculty 2 creates Course 2
    const course2 = await SubjectService.createSubject(faculty2UserId, {
      name: 'Algorithm Analysis ' + Date.now(),
      code: 'CS_ALGO_' + Math.floor(Math.random() * 10000),
      credits: 3,
      departmentId: testDeptId,
      programId: testProgramId,
      semester: 4,
    });
    course2Id = course2.id;

    // Add Unit & Topics to Course 1
    const unit1 = await SubjectService.addUnit(faculty1UserId, course1Id, {
      unitNumber: 1,
      unitName: 'Lexical Analysis',
      description: 'Scanner generators and finite automata',
    });
    unit1Id = unit1.id;

    const topic1 = await SubjectService.addTopic(faculty1UserId, course1Id, unit1Id, {
      topicName: 'Regular Expressions and NFA',
      description: 'Converting RE to NFA',
    });
    topic1Id = topic1.id;

    const topic2 = await SubjectService.addTopic(faculty1UserId, course1Id, unit1Id, {
      topicName: 'Subset Construction Algorithm',
      description: 'Converting NFA to DFA',
    });
    topic2Id = topic2.id;

    // Add Unit & Topic to Course 2
    const course2Unit = await SubjectService.addUnit(faculty2UserId, course2Id, {
      unitNumber: 1,
      unitName: 'Asymptotic Analysis',
    });
    course2UnitId = course2Unit.id;

    const course2Topic = await SubjectService.addTopic(faculty2UserId, course2Id, course2UnitId, {
      topicName: 'Big-O Notation',
    });
    course2TopicId = course2Topic.id;

    console.log('✔ Prerequisites created successfully.\n');

    // 2. Test Session Creation
    console.log('2. Testing Classroom Pulse Session Creation...');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const session1 = await PulseService.createSession(faculty1UserId, {
      courseId: course1Id,
      topicId: topic1Id,
      departmentId: testDeptId,
      programId: testProgramId,
      semester: 6,
      section: 'A',
      sessionType: PulseSessionType.MID_CLASS_CHECK,
      title: 'Mid-class Check on NFA',
      description: 'Quick check on RE to NFA conversion',
      date: tomorrow,
      startTime: '10:30 AM',
      durationMinutes: 10,
      questionCount: 5,
      questionType: PulseQuestionType.MCQ,
      difficultyLevel: PulseDifficultyLevel.EASY,
      attendanceRule: PulseAttendanceRule.ATTEMPT_REQUIRED,
      resultVisibility: PulseResultVisibility.IMMEDIATE,
    });
    session1Id = session1.id;

    const session2 = await PulseService.createSession(faculty1UserId, {
      courseId: course1Id,
      topicId: topic2Id,
      departmentId: testDeptId,
      programId: testProgramId,
      semester: 6,
      section: 'B',
      sessionType: PulseSessionType.END_OF_CLASS_CHECK,
      title: 'End-of-class Check on DFA',
      description: 'Assessing subset construction understanding',
      date: tomorrow,
      startTime: '02:00 PM',
      durationMinutes: 15,
      questionCount: 8,
      questionType: PulseQuestionType.SHORT_ANSWER,
      difficultyLevel: PulseDifficultyLevel.MEDIUM,
      attendanceRule: PulseAttendanceRule.BOTH,
      resultVisibility: PulseResultVisibility.STUDENTS_AFTER_SESSION,
    });
    session2Id = session2.id;

    console.log(`✔ Session 1 created: "${session1.title}" (${session1.sessionType}) ID: ${session1Id}`);
    console.log(`✔ Session 2 created: "${session2.title}" (${session2.sessionType}) ID: ${session2Id}\n`);

    // 3. Test Validation & Business Rule Failures
    console.log('3. Testing Validation & Business Rule Failures...');

    // Test creating session for unassigned course
    try {
      await PulseService.createSession(faculty2UserId, {
        courseId: course1Id, // Assigned to Faculty 1
        topicId: topic1Id,
        departmentId: testDeptId,
        semester: 6,
        section: 'A',
        sessionType: PulseSessionType.WEEKLY_REVISION,
        title: 'Unauthorized Session',
        date: tomorrow,
        startTime: '11:00 AM',
        durationMinutes: 20,
        questionCount: 10,
        questionType: PulseQuestionType.MCQ,
        difficultyLevel: PulseDifficultyLevel.HARD,
        attendanceRule: PulseAttendanceRule.ATTEMPT_REQUIRED,
        resultVisibility: PulseResultVisibility.FACULTY_ONLY,
      });
      throw new Error('Should have failed when creating session for unassigned course!');
    } catch (err: unknown) {
      if (err instanceof ForbiddenError) {
        console.log('✔ Correctly blocked faculty from creating session for unassigned course.');
      } else {
        throw err;
      }
    }

    // Test creating session with topic belonging to a different course
    try {
      await PulseService.createSession(faculty1UserId, {
        courseId: course1Id,
        topicId: course2TopicId, // Belongs to Course 2
        departmentId: testDeptId,
        semester: 6,
        section: 'A',
        sessionType: PulseSessionType.WEEKLY_REVISION,
        title: 'Mismatched Topic Session',
        date: tomorrow,
        startTime: '11:00 AM',
        durationMinutes: 20,
        questionCount: 10,
        questionType: PulseQuestionType.MCQ,
        difficultyLevel: PulseDifficultyLevel.HARD,
        attendanceRule: PulseAttendanceRule.ATTEMPT_REQUIRED,
        resultVisibility: PulseResultVisibility.FACULTY_ONLY,
      });
      throw new Error('Should have failed when topic does not belong to subject!');
    } catch (err: unknown) {
      if (err instanceof ConflictError) {
        console.log('✔ Correctly blocked session creation when topic does not belong to subject.\n');
      } else {
        throw err;
      }
    }

    // 4. Test Session Retrieval
    console.log('4. Testing Session Retrieval...');
    const fetchedSession = await PulseService.getSessionById(faculty1UserId, session1Id);
    if (fetchedSession.title !== 'Mid-class Check on NFA' || fetchedSession.durationMinutes !== 10) {
      throw new Error('Fetched session details mismatch!');
    }
    if (!fetchedSession.course || !fetchedSession.topic || !fetchedSession.department) {
      throw new Error('Fetched session is missing nested relation details!');
    }
    console.log(`✔ Successfully retrieved session with nested Course ("${fetchedSession.course.name}") and Topic ("${fetchedSession.topic.topicName}").\n`);

    // 5. Test Authorization Enforcement on Retrieval, Update, and Delete
    console.log('5. Testing Authorization Enforcement...');
    try {
      await PulseService.getSessionById(faculty2UserId, session1Id);
      throw new Error('Faculty 2 should not be able to view Faculty 1 session!');
    } catch (err: unknown) {
      if (err instanceof ForbiddenError) {
        console.log('✔ Correctly blocked unauthorized view of another faculty session.');
      } else {
        throw err;
      }
    }

    try {
      await PulseService.updateSession(faculty2UserId, session1Id, { title: 'Hacked Title' });
      throw new Error('Faculty 2 should not be able to update Faculty 1 session!');
    } catch (err: unknown) {
      if (err instanceof ForbiddenError) {
        console.log('✔ Correctly blocked unauthorized update of another faculty session.');
      } else {
        throw err;
      }
    }

    try {
      await PulseService.deleteSession(faculty2UserId, session1Id);
      throw new Error('Faculty 2 should not be able to delete Faculty 1 session!');
    } catch (err: unknown) {
      if (err instanceof ForbiddenError) {
        console.log('✔ Correctly blocked unauthorized deletion of another faculty session.\n');
      } else {
        throw err;
      }
    }

    // 6. Test Update Session
    console.log('6. Testing Update Session...');
    const updatedSession = await PulseService.updateSession(faculty1UserId, session1Id, {
      title: 'Updated Mid-class Check on NFA & DFA',
      durationMinutes: 20,
      difficultyLevel: PulseDifficultyLevel.MIXED,
    });
    if (
      updatedSession.title !== 'Updated Mid-class Check on NFA & DFA' ||
      updatedSession.durationMinutes !== 20 ||
      updatedSession.difficultyLevel !== PulseDifficultyLevel.MIXED
    ) {
      throw new Error('Session update failed to persist changes!');
    }
    console.log(`✔ Session updated successfully to title: "${updatedSession.title}", duration: ${updatedSession.durationMinutes}m.\n`);

    // 7. Test List, Search, Filter, and Pagination
    console.log('7. Testing List, Search, Filter, and Pagination...');
    
    // Total list for Faculty 1
    const allSessions = await PulseService.listSessions(faculty1UserId, {});
    if (allSessions.pagination.total !== 2) {
      throw new Error(`Expected 2 sessions for Faculty 1, got ${allSessions.pagination.total}`);
    }
    console.log('✔ Total session count for Faculty 1 verified: 2.');

    // Filter by Session Type
    const midClassSessions = await PulseService.listSessions(faculty1UserId, {
      sessionType: PulseSessionType.MID_CLASS_CHECK,
    });
    if (midClassSessions.pagination.total !== 1 || midClassSessions.sessions[0].id !== session1Id) {
      throw new Error('Filter by sessionType failed!');
    }
    console.log('✔ Filter by sessionType (MID_CLASS_CHECK) returned 1 matching session.');

    // Filter by Difficulty Level
    const mediumSessions = await PulseService.listSessions(faculty1UserId, {
      difficultyLevel: PulseDifficultyLevel.MEDIUM,
    });
    if (mediumSessions.pagination.total !== 1 || mediumSessions.sessions[0].id !== session2Id) {
      throw new Error('Filter by difficultyLevel failed!');
    }
    console.log('✔ Filter by difficultyLevel (MEDIUM) returned 1 matching session.');

    // Search keyword
    const searchResults = await PulseService.listSessions(faculty1UserId, {
      search: 'subset construction',
    });
    if (searchResults.pagination.total !== 1 || searchResults.sessions[0].id !== session2Id) {
      throw new Error('Keyword search failed!');
    }
    console.log('✔ Keyword search ("subset construction") returned 1 matching session.');

    // Pagination
    const page1 = await PulseService.listSessions(faculty1UserId, { limit: 1, page: 1 });
    const page2 = await PulseService.listSessions(faculty1UserId, { limit: 1, page: 2 });
    if (page1.sessions.length !== 1 || page2.sessions.length !== 1 || page1.pagination.totalPages !== 2) {
      throw new Error('Pagination verification failed!');
    }
    console.log('✔ Pagination verified (limit: 1, totalPages: 2).');

    // Faculty 2 isolation check
    const fac2Sessions = await PulseService.listSessions(faculty2UserId, {});
    if (fac2Sessions.pagination.total !== 0) {
      throw new Error('Faculty 2 should have 0 sessions!');
    }
    console.log('✔ Faculty 2 session isolation verified (0 sessions returned).\n');

    // 8. Test Delete Session
    console.log('8. Testing Delete Session...');
    await PulseService.deleteSession(faculty1UserId, session1Id);
    await PulseService.deleteSession(faculty1UserId, session2Id);
    const postDeleteList = await PulseService.listSessions(faculty1UserId, {});
    if (postDeleteList.pagination.total !== 0) {
      throw new Error('Sessions were not deleted!');
    }
    console.log('✔ Both pulse sessions deleted successfully.\n');

    console.log('=== ALL PULSE SESSION TESTS PASSED SUCCESSFULLY! ===');
  } catch (error) {
    console.error('❌ TEST FAILED:', error);
    process.exit(1);
  } finally {
    // Cleanup test data
    console.log('\nCleaning up test prerequisites...');
    try {
      await prisma.pulseSession.deleteMany({
        where: { id: { in: [session1Id, session2Id].filter(Boolean) } },
      });
      if (course1Id) await prisma.course.deleteMany({ where: { id: course1Id } });
      if (course2Id) await prisma.course.deleteMany({ where: { id: course2Id } });
      if (testProgramId) await prisma.program.deleteMany({ where: { id: testProgramId } });
      if (faculty1ProfileId) await prisma.facultyProfile.deleteMany({ where: { id: faculty1ProfileId } });
      if (faculty2ProfileId) await prisma.facultyProfile.deleteMany({ where: { id: faculty2ProfileId } });
      if (faculty1UserId) await prisma.user.deleteMany({ where: { id: faculty1UserId } });
      if (faculty2UserId) await prisma.user.deleteMany({ where: { id: faculty2UserId } });
      if (testDeptId) await prisma.department.deleteMany({ where: { id: testDeptId } });
      console.log('✔ Cleanup complete.');
    } catch (cleanupErr) {
      console.error('Cleanup warning:', cleanupErr);
    }
    await prisma.$disconnect();
  }
}

main();
