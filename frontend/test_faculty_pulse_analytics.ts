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
import { AnalyticsService } from './src/modules/faculty/analytics/analytics.service';
import {
  sessionSummaryQuerySchema,
  reportQuerySchema,
  chartTypeSchema,
} from './src/modules/faculty/analytics/analytics.validation';
import { ForbiddenError, NotFoundError } from './src/lib/errors';

const prisma = new PrismaClient();

async function main() {
  console.log('=== Starting Faculty Dashboard Analytics Verification Test ===\n');

  let testDeptId = '';
  let testProgramId = '';
  let testSemesterId = '';
  let testSectionId = '';
  let faculty1UserId = '';
  let faculty1ProfileId = '';
  let faculty2UserId = '';
  let faculty2ProfileId = '';
  let courseId = '';
  let unitId = '';
  let topic1Id = '';
  let topic2Id = '';
  let student1UserId = '';
  let student1ProfileId = '';
  let student2UserId = '';
  let student2ProfileId = '';
  let student3UserId = '';
  let student3ProfileId = '';
  let session1Id = '';
  let session2Id = '';
  let session3LiveId = '';
  let sessionFaculty2Id = '';

  try {
    console.log('1. Setting up Test Prerequisites...');
    const now = Date.now();

    // Department & Program
    const dept = await prisma.department.create({
      data: {
        name: `Test Analytics Dept ${now}`,
        code: `ANALYTICS_DEPT_${now}`,
      },
    });
    testDeptId = dept.id;

    const program = await prisma.program.create({
      data: {
        name: `Test Analytics Program ${now}`,
        code: `ANALYTICS_PROG_${now}`,
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
        name: 'A',
        semesterId: semester.id,
      },
    });
    testSectionId = section.id;

    // Faculty 1
    const f1User = await prisma.user.create({
      data: {
        email: `faculty1.analytics.${now}@test.edu`,
        passwordHash: 'hashedpassword123',
        role: Role.FACULTY,
        firstName: 'Dr. Analytics',
        lastName: 'One',
      },
    });
    faculty1UserId = f1User.id;

    const f1Profile = await prisma.facultyProfile.create({
      data: {
        userId: f1User.id,
        employeeId: `F1_ANA_${now}`,
        designation: 'Professor',
        departmentId: dept.id,
      },
    });
    faculty1ProfileId = f1Profile.id;

    // Faculty 2
    const f2User = await prisma.user.create({
      data: {
        email: `faculty2.analytics.${now}@test.edu`,
        passwordHash: 'hashedpassword123',
        role: Role.FACULTY,
        firstName: 'Dr. Analytics',
        lastName: 'Two',
      },
    });
    faculty2UserId = f2User.id;

    const f2Profile = await prisma.facultyProfile.create({
      data: {
        userId: f2User.id,
        employeeId: `F2_ANA_${now}`,
        designation: 'Assistant Professor',
        departmentId: dept.id,
      },
    });
    faculty2ProfileId = f2Profile.id;

    // Course, Unit, Topics
    const course = await prisma.course.create({
      data: {
        name: `Advanced Web Analytics ${now}`,
        code: `CS_ANA_${now}`,
        credits: 4,
        departmentId: dept.id,
      },
    });
    courseId = course.id;

    await prisma.facultyCourse.create({
      data: {
        facultyId: f1Profile.id,
        courseId: course.id,
        semester: 3,
        section: 'A',
        academicYear: '2024-2025',
      },
    });

    const unit = await prisma.unit.create({
      data: {
        unitName: 'Unit 1: Analytics Foundations',
        unitNumber: 1,
        courseId: course.id,
      },
    });
    unitId = unit.id;

    const topic1 = await prisma.topic.create({
      data: {
        topicName: 'Topic 1: Data Collection',
        unitId: unit.id,
      },
    });
    topic1Id = topic1.id;

    const topic2 = await prisma.topic.create({
      data: {
        topicName: 'Topic 2: Event Tracking',
        unitId: unit.id,
      },
    });
    topic2Id = topic2.id;

    // 3 Students & Enrollments
    const createStudent = async (index: number, roll: string) => {
      const u = await prisma.user.create({
        data: {
          email: `student${index}.ana.${now}@test.edu`,
          passwordHash: 'hash',
          role: Role.STUDENT,
          firstName: `Student`,
          lastName: `Analytics ${index}`,
        },
      });
      const p = await prisma.studentProfile.create({
        data: {
          userId: u.id,
          rollNumber: roll,
          registrationNumber: roll,
          departmentId: dept.id,
          programId: program.id,
          semesterId: semester.id,
          sectionId: section.id,
          currentSemester: 3,
          batch: '2024-2028',
          status: StudentStatus.ACTIVE,
        },
      });
      await prisma.enrollment.create({
        data: {
          studentId: p.id,
          courseId: course.id,
          semester: 3,
          academicYear: '2024-2025',
        },
      });
      return { u, p };
    };

    const s1 = await createStudent(1, `ROLL_ANA_1_${now}`);
    student1UserId = s1.u.id;
    student1ProfileId = s1.p.id;

    const s2 = await createStudent(2, `ROLL_ANA_2_${now}`);
    student2UserId = s2.u.id;
    student2ProfileId = s2.p.id;

    const s3 = await createStudent(3, `ROLL_ANA_3_${now}`);
    student3UserId = s3.u.id;
    student3ProfileId = s3.p.id;

    console.log('   ✓ Prerequisites created.');

    console.log('2. Creating Pulse Sessions & Participation Data...');
    // Session 1 (Completed, Topic 1)
    const session1 = await prisma.pulseSession.create({
      data: {
        title: 'Session 1: Data Collection Quiz',
        courseId: course.id,
        topicId: topic1.id,
        departmentId: dept.id,
        programId: program.id,
        facultyId: f1Profile.id,
        semester: 3,
        section: 'A',
        startTime: '10:00',
        questionCount: 2,
        sessionType: PulseSessionType.MID_CLASS_CHECK,
        questionType: PulseQuestionType.MCQ,
        difficultyLevel: PulseDifficultyLevel.MEDIUM,
        attendanceRule: PulseAttendanceRule.ATTEMPT_REQUIRED,
        resultVisibility: PulseResultVisibility.IMMEDIATE,
        durationMinutes: 10,
        status: PulseSessionStatus.COMPLETED,
        date: new Date('2025-01-10T10:00:00Z'),
      },
    });
    session1Id = session1.id;

    const q1 = await prisma.pulseQuestion.create({
      data: {
        sessionId: session1.id,
        questionNumber: 1,
        questionText: 'What is DOM?',
        options: ['Document Object Model', 'Data Object Model', 'Digital Order Map'],
        correctAnswer: 'Document Object Model',
        marks: 1.0,
      },
    });

    const q2 = await prisma.pulseQuestion.create({
      data: {
        sessionId: session1.id,
        questionNumber: 2,
        questionText: 'What is HTML?',
        options: ['Hyper Text Markup Language', 'High Text Main Line'],
        correctAnswer: 'Hyper Text Markup Language',
        marks: 1.0,
      },
    });

    // Student 1 participation (Score 2/2, 100%, 40s)
    const part1_s1 = await prisma.pulseParticipation.create({
      data: {
        sessionId: session1.id,
        studentId: student1ProfileId,
        isPresent: true,
        hasAttempted: true,
        score: 2.0,
        maxScore: 2.0,
        percentage: 100.0,
        timeTakenSeconds: 40,
        attemptedAt: new Date('2025-01-10T10:05:00Z'),
      },
    });
    await prisma.pulseAnswer.createMany({
      data: [
        {
          participationId: part1_s1.id,
          questionId: q1.id,
          studentAnswer: 'Document Object Model',
          isCorrect: true,
          marksAwarded: 1.0,
          timeTakenSeconds: 15,
        },
        {
          participationId: part1_s1.id,
          questionId: q2.id,
          studentAnswer: 'Hyper Text Markup Language',
          isCorrect: true,
          marksAwarded: 1.0,
          timeTakenSeconds: 25,
        },
      ],
    });

    // Student 2 participation (Score 1/2, 50%, 60s)
    const part1_s2 = await prisma.pulseParticipation.create({
      data: {
        sessionId: session1.id,
        studentId: student2ProfileId,
        isPresent: true,
        hasAttempted: true,
        score: 1.0,
        maxScore: 2.0,
        percentage: 50.0,
        timeTakenSeconds: 60,
        attemptedAt: new Date('2025-01-10T10:06:00Z'),
      },
    });
    await prisma.pulseAnswer.createMany({
      data: [
        {
          participationId: part1_s2.id,
          questionId: q1.id,
          studentAnswer: 'Document Object Model',
          isCorrect: true,
          marksAwarded: 1.0,
          timeTakenSeconds: 30,
        },
        {
          participationId: part1_s2.id,
          questionId: q2.id,
          studentAnswer: 'High Text Main Line',
          isCorrect: false,
          marksAwarded: 0.0,
          timeTakenSeconds: 30,
        },
      ],
    });

    // Student 3 participation (Present, not attempted)
    await prisma.pulseParticipation.create({
      data: {
        sessionId: session1.id,
        studentId: student3ProfileId,
        isPresent: true,
        hasAttempted: false,
      },
    });

    // Session 2 (Completed, Topic 2)
    const session2 = await prisma.pulseSession.create({
      data: {
        title: 'Session 2: Event Tracking Quiz',
        courseId: course.id,
        topicId: topic2.id,
        departmentId: dept.id,
        programId: program.id,
        facultyId: f1Profile.id,
        semester: 3,
        section: 'A',
        startTime: '10:00',
        questionCount: 1,
        sessionType: PulseSessionType.END_OF_CLASS_CHECK,
        questionType: PulseQuestionType.MCQ,
        difficultyLevel: PulseDifficultyLevel.HARD,
        attendanceRule: PulseAttendanceRule.ATTEMPT_REQUIRED,
        resultVisibility: PulseResultVisibility.IMMEDIATE,
        durationMinutes: 15,
        status: PulseSessionStatus.COMPLETED,
        date: new Date('2025-01-12T10:00:00Z'),
      },
    });
    session2Id = session2.id;

    const q3 = await prisma.pulseQuestion.create({
      data: {
        sessionId: session2.id,
        questionNumber: 1,
        questionText: 'What is event bubbling?',
        options: ['Upward propagation', 'Downward propagation'],
        correctAnswer: 'Upward propagation',
        marks: 1.0,
      },
    });

    // Student 1 participation in Session 2 (0/1, 0%, 20s)
    const part2_s1 = await prisma.pulseParticipation.create({
      data: {
        sessionId: session2.id,
        studentId: student1ProfileId,
        isPresent: true,
        hasAttempted: true,
        score: 0.0,
        maxScore: 1.0,
        percentage: 0.0,
        timeTakenSeconds: 20,
        attemptedAt: new Date('2025-01-12T10:05:00Z'),
      },
    });
    await prisma.pulseAnswer.create({
      data: {
        participationId: part2_s1.id,
        questionId: q3.id,
        studentAnswer: 'Downward propagation',
        isCorrect: false,
        marksAwarded: 0.0,
        timeTakenSeconds: 20,
      },
    });

    // Student 2 absent in Session 2
    await prisma.pulseParticipation.create({
      data: {
        sessionId: session2.id,
        studentId: student2ProfileId,
        isPresent: false,
        hasAttempted: false,
      },
    });

    // Session 3 (Live, Topic 1)
    const session3 = await prisma.pulseSession.create({
      data: {
        title: 'Session 3: Live Discussion',
        courseId: course.id,
        topicId: topic1.id,
        departmentId: dept.id,
        programId: program.id,
        facultyId: f1Profile.id,
        semester: 3,
        section: 'A',
        startTime: '11:00',
        questionCount: 0,
        sessionType: PulseSessionType.MID_CLASS_CHECK,
        questionType: PulseQuestionType.TRUE_FALSE,
        difficultyLevel: PulseDifficultyLevel.EASY,
        attendanceRule: PulseAttendanceRule.QR_ATTENDANCE_ONLY,
        resultVisibility: PulseResultVisibility.STUDENTS_AFTER_SESSION,
        durationMinutes: 5,
        status: PulseSessionStatus.LIVE,
        date: new Date(),
      },
    });
    session3LiveId = session3.id;

    // Faculty 2 Session (Completed)
    const sessionF2 = await prisma.pulseSession.create({
      data: {
        title: 'Faculty 2 Session',
        courseId: course.id,
        topicId: topic1.id,
        departmentId: dept.id,
        programId: program.id,
        facultyId: f2Profile.id,
        semester: 3,
        section: 'A',
        startTime: '12:00',
        questionCount: 0,
        sessionType: PulseSessionType.MID_CLASS_CHECK,
        questionType: PulseQuestionType.MCQ,
        difficultyLevel: PulseDifficultyLevel.EASY,
        attendanceRule: PulseAttendanceRule.ATTEMPT_REQUIRED,
        resultVisibility: PulseResultVisibility.IMMEDIATE,
        durationMinutes: 10,
        status: PulseSessionStatus.COMPLETED,
        date: new Date(),
      },
    });
    sessionFaculty2Id = sessionF2.id;
    console.log('   ✓ Test sessions and participations created.');

    // 3. Test Dashboard Summary
    console.log('3. Testing Dashboard Summary...');
    const dashboard = await AnalyticsService.getDashboardSummary(faculty1UserId);
    console.log('   Dashboard Summary Result:', JSON.stringify(dashboard, null, 2));
    if (dashboard.totalSessionsCreated !== 3) throw new Error(`Expected 3 sessions, got ${dashboard.totalSessionsCreated}`);
    if (dashboard.activeSessions !== 1) throw new Error(`Expected 1 active session, got ${dashboard.activeSessions}`);
    if (dashboard.completedSessions !== 2) throw new Error(`Expected 2 completed sessions, got ${dashboard.completedSessions}`);
    if (dashboard.totalAssignedSubjects !== 1) throw new Error(`Expected 1 assigned subject, got ${dashboard.totalAssignedSubjects}`);
    if (dashboard.totalStudents !== 3) throw new Error(`Expected 3 enrolled students, got ${dashboard.totalStudents}`);
    if (dashboard.totalStudentsAttempted !== 2) throw new Error(`Expected 2 attempted students, got ${dashboard.totalStudentsAttempted}`);
    if (dashboard.totalStudentsNotAttempted !== 1) throw new Error(`Expected 1 not attempted student, got ${dashboard.totalStudentsNotAttempted}`);
    console.log('   ✓ Dashboard Summary verified successfully.');

    // 4. Test Session Summaries List
    console.log('4. Testing Session Summaries List & Pagination...');
    const listQuery = sessionSummaryQuerySchema.parse({ page: 1, limit: 10 });
    const listRes = await AnalyticsService.listSessionSummaries(faculty1UserId, listQuery);
    if (listRes.data.length !== 2) throw new Error(`Expected 2 completed sessions in list, got ${listRes.data.length}`);
    if (listRes.pagination.total !== 2) throw new Error(`Expected total 2, got ${listRes.pagination.total}`);
    
    // Test Search filter
    const searchQuery = sessionSummaryQuerySchema.parse({ search: 'Data Collection' });
    const searchRes = await AnalyticsService.listSessionSummaries(faculty1UserId, searchQuery);
    if (searchRes.data.length !== 1 || searchRes.data[0].sessionId !== session1Id) {
      throw new Error('Search filter failed to isolate Session 1.');
    }
    console.log('   ✓ Session Summaries List, Pagination & Search verified successfully.');

    // 5. Test Single Session Summary
    console.log('5. Testing Single Session Summary (Question-wise & Time Taken stats)...');
    const singleRes = await AnalyticsService.getSessionSummary(faculty1UserId, session1Id);
    if (singleRes.totalStudents !== 3) throw new Error('Expected 3 total students');
    if (singleRes.studentsAttempted !== 2) throw new Error('Expected 2 students attempted');
    if (singleRes.attendanceCount !== 3) throw new Error('Expected 3 attendance count');
    if (singleRes.attendancePercentage !== 100) throw new Error('Expected 100% attendance');
    if (singleRes.averageScore !== 1.5) throw new Error(`Expected average score 1.5, got ${singleRes.averageScore}`);
    if (singleRes.highestScore !== 2) throw new Error('Expected highest score 2');
    if (singleRes.lowestScore !== 1) throw new Error('Expected lowest score 1');
    if (singleRes.questionWiseStatistics.length !== 2) throw new Error('Expected 2 question statistics');
    if (singleRes.questionWiseStatistics[0].accuracyPercentage !== 100) throw new Error('Expected 100% accuracy on Q1');
    if (singleRes.questionWiseStatistics[1].accuracyPercentage !== 50) throw new Error('Expected 50% accuracy on Q2');
    if (singleRes.timeTakenStatistics.averageSeconds !== 50) throw new Error('Expected 50s average time taken');
    if (singleRes.timeTakenStatistics.minSeconds !== 40) throw new Error('Expected 40s min time taken');
    if (singleRes.timeTakenStatistics.maxSeconds !== 60) throw new Error('Expected 60s max time taken');
    console.log('   ✓ Single Session Summary verified successfully.');

    // 6. Test Concept Gap Analysis
    console.log('6. Testing Concept Gap Analysis...');
    const gapsRes = await AnalyticsService.getConceptGapAnalysis(faculty1UserId);
    if (gapsRes.stronglyUnderstoodTopics.length !== 1 || gapsRes.stronglyUnderstoodTopics[0].topicId !== topic1Id) {
      throw new Error('Expected Topic 1 in strongly understood topics (>= 75%)');
    }
    if (gapsRes.weaklyUnderstoodTopics.length !== 1 || gapsRes.weaklyUnderstoodTopics[0].topicId !== topic2Id) {
      throw new Error('Expected Topic 2 in weakly understood topics (< 75%)');
    }
    if (gapsRes.questionsWithLowestAccuracy.length === 0 || gapsRes.questionsWithLowestAccuracy[0].accuracyPercentage !== 0) {
      throw new Error('Expected 0% accuracy question first in lowest accuracy list');
    }
    if (gapsRes.questionsWithHighestAccuracy.length === 0 || gapsRes.questionsWithHighestAccuracy[0].accuracyPercentage !== 100) {
      throw new Error('Expected 100% accuracy question first in highest accuracy list');
    }
    // Check no AI recommendations
    const keys = Object.keys(gapsRes);
    if (keys.some((k) => k.toLowerCase().includes('ai') || k.toLowerCase().includes('recommend') || k.toLowerCase().includes('remedial'))) {
      throw new Error('Concept gap analysis must not contain AI recommendations or remedial suggestions!');
    }
    console.log('   ✓ Concept Gap Analysis verified successfully (No AI suggestions present).');

    // 7. Test Reports (Attendance & Understanding)
    console.log('7. Testing Attendance & Understanding Reports...');
    const reportQuery = reportQuerySchema.parse({ page: 1, limit: 10 });
    const attReport = await AnalyticsService.getAttendanceReport(faculty1UserId, reportQuery);
    if (attReport.data.length !== 3) throw new Error(`Expected 3 sessions in attendance report, got ${attReport.data.length}`);
    
    const undReport = await AnalyticsService.getUnderstandingReport(faculty1UserId, reportQuery);
    if (undReport.data.length !== 2) throw new Error(`Expected 2 topics in understanding report, got ${undReport.data.length}`);
    console.log('   ✓ Attendance & Understanding Reports verified successfully.');

    // 8. Test Chart Data
    console.log('8. Testing Chart Data APIs...');
    const chartTypes = [
      'attendance-trend',
      'average-score-trend',
      'topic-understanding-trend',
      'session-count-per-subject',
      'participation-trend',
    ] as const;
    for (const cType of chartTypes) {
      const validatedType = chartTypeSchema.parse(cType);
      const chartRes = await AnalyticsService.getChartData(faculty1UserId, validatedType);
      if (!Array.isArray(chartRes)) throw new Error(`Expected array for chart type ${cType}`);
    }
    console.log('   ✓ All 5 Chart Data types verified successfully.');

    // 9. Test Authorization Isolation
    console.log('9. Testing Security & Authorization Isolation...');
    try {
      await AnalyticsService.getSessionSummary(faculty2UserId, session1Id);
      throw new Error('Security test failed: Faculty 2 was allowed to view Faculty 1 session summary!');
    } catch (err: any) {
      if (err instanceof ForbiddenError) {
        console.log('   ✓ Faculty 2 properly denied access to Faculty 1 session summary.');
      } else {
        throw err;
      }
    }

    const f2Dashboard = await AnalyticsService.getDashboardSummary(faculty2UserId);
    if (f2Dashboard.totalSessionsCreated !== 1) {
      throw new Error(`Expected 1 session for Faculty 2, got ${f2Dashboard.totalSessionsCreated}`);
    }
    console.log('   ✓ Faculty authorization isolation verified successfully.');

    console.log('\n🌟 ALL FACULTY DASHBOARD ANALYTICS TESTS PASSED SUCCESSFULLY! 🌟\n');
  } finally {
    console.log('10. Cleaning up test data...');
    if (session1Id) await prisma.pulseSession.delete({ where: { id: session1Id } }).catch(() => {});
    if (session2Id) await prisma.pulseSession.delete({ where: { id: session2Id } }).catch(() => {});
    if (session3LiveId) await prisma.pulseSession.delete({ where: { id: session3LiveId } }).catch(() => {});
    if (sessionFaculty2Id) await prisma.pulseSession.delete({ where: { id: sessionFaculty2Id } }).catch(() => {});

    if (topic1Id) await prisma.topic.delete({ where: { id: topic1Id } }).catch(() => {});
    if (topic2Id) await prisma.topic.delete({ where: { id: topic2Id } }).catch(() => {});
    if (unitId) await prisma.unit.delete({ where: { id: unitId } }).catch(() => {});
    if (courseId) await prisma.course.delete({ where: { id: courseId } }).catch(() => {});

    if (student1ProfileId) await prisma.studentProfile.delete({ where: { id: student1ProfileId } }).catch(() => {});
    if (student2ProfileId) await prisma.studentProfile.delete({ where: { id: student2ProfileId } }).catch(() => {});
    if (student3ProfileId) await prisma.studentProfile.delete({ where: { id: student3ProfileId } }).catch(() => {});
    if (student1UserId) await prisma.user.delete({ where: { id: student1UserId } }).catch(() => {});
    if (student2UserId) await prisma.user.delete({ where: { id: student2UserId } }).catch(() => {});
    if (student3UserId) await prisma.user.delete({ where: { id: student3UserId } }).catch(() => {});

    if (faculty1ProfileId) await prisma.facultyProfile.delete({ where: { id: faculty1ProfileId } }).catch(() => {});
    if (faculty2ProfileId) await prisma.facultyProfile.delete({ where: { id: faculty2ProfileId } }).catch(() => {});
    if (faculty1UserId) await prisma.user.delete({ where: { id: faculty1UserId } }).catch(() => {});
    if (faculty2UserId) await prisma.user.delete({ where: { id: faculty2UserId } }).catch(() => {});

    if (testSectionId) await prisma.section.delete({ where: { id: testSectionId } }).catch(() => {});
    if (testSemesterId) await prisma.semester.delete({ where: { id: testSemesterId } }).catch(() => {});
    if (testProgramId) await prisma.program.delete({ where: { id: testProgramId } }).catch(() => {});
    if (testDeptId) await prisma.department.delete({ where: { id: testDeptId } }).catch(() => {});

    await prisma.$disconnect();
    console.log('   ✓ Cleanup completed.');
  }
}

main().catch((err) => {
  console.error('Test failed with error:', err);
  process.exit(1);
});
