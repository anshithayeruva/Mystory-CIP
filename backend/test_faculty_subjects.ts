import { PrismaClient, Role } from '@prisma/client';
import { SubjectService } from './src/modules/faculty/subjects/subject.service';
import { ForbiddenError, ConflictError } from './src/lib/errors';

const prisma = new PrismaClient();

async function main() {
  console.log('=== Starting Faculty Subject Configuration Verification Test ===\n');

  let testDeptId = '';
  let testProgramId = '';
  let faculty1UserId = '';
  let faculty1ProfileId = '';
  let faculty2UserId = '';
  let createdCourseId = '';

  try {
    // 1. Create prerequisite test entities: Department, Program, and 2 Faculty Users
    console.log('1. Creating test prerequisites (Department, Program, Faculty Users)...');
    
    const dept = await prisma.department.create({
      data: {
        name: 'Test Computer Science Dept ' + Date.now(),
        code: 'TEST_CS_' + Math.floor(Math.random() * 10000),
      },
    });
    testDeptId = dept.id;

    const program = await prisma.program.create({
      data: {
        name: 'Test B.Tech CS ' + Date.now(),
        code: 'TEST_BTECH_' + Math.floor(Math.random() * 10000),
        departmentId: testDeptId,
      },
    });
    testProgramId = program.id;

    const user1 = await prisma.user.create({
      data: {
        email: `faculty1_${Date.now()}@test.edu`,
        passwordHash: 'hashedpassword',
        role: Role.FACULTY,
        firstName: 'Alan',
        lastName: 'Turing',
      },
    });
    faculty1UserId = user1.id;

    const profile1 = await prisma.facultyProfile.create({
      data: {
        userId: faculty1UserId,
        employeeId: 'EMP_' + Math.floor(Math.random() * 100000),
        designation: 'Professor',
        departmentId: testDeptId,
      },
    });
    faculty1ProfileId = profile1.id;

    const user2 = await prisma.user.create({
      data: {
        email: `faculty2_${Date.now()}@test.edu`,
        passwordHash: 'hashedpassword',
        role: Role.FACULTY,
        firstName: 'Ada',
        lastName: 'Lovelace',
      },
    });
    faculty2UserId = user2.id;

    await prisma.facultyProfile.create({
      data: {
        userId: faculty2UserId,
        employeeId: 'EMP_' + Math.floor(Math.random() * 100000),
        designation: 'Assistant Professor',
        departmentId: testDeptId,
      },
    });

    console.log('✔ Prerequisites created successfully.\n');

    // 2. Test Create Subject
    console.log('2. Testing Create Subject...');
    const createdSubject = await SubjectService.createSubject(faculty1UserId, {
      name: 'Advanced Artificial Intelligence',
      code: 'CS_' + Math.floor(Math.random() * 10000),
      credits: 4,
      departmentId: testDeptId,
      programId: testProgramId,
      semester: 5,
    });
    createdCourseId = createdSubject.id;
    console.log(`✔ Subject created: "${createdSubject.name}" (${createdSubject.code}) with ID ${createdCourseId}`);
    console.log(`✔ Assigned Faculty Count: ${createdSubject.assignedFaculty?.length} (Creator auto-assigned)\n`);

    // 3. Test Get Subject Details
    console.log('3. Testing Get Subject Details...');
    const subjectDetails = await SubjectService.getSubjectById(faculty1UserId, createdCourseId);
    if (subjectDetails.name !== 'Advanced Artificial Intelligence' || subjectDetails.credits !== 4) {
      throw new Error('Subject details mismatch!');
    }
    console.log('✔ Subject details retrieved and verified.\n');

    // 4. Test Course Outcomes CRUD
    console.log('4. Testing Course Outcomes CRUD...');
    const co1 = await SubjectService.addOutcome(faculty1UserId, createdCourseId, {
      coNumber: 'CO1',
      title: 'Understand Neural Networks',
      description: 'Students will understand feedforward and recurrent architectures.',
    });
    const co2 = await SubjectService.addOutcome(faculty1UserId, createdCourseId, {
      coNumber: 'CO2',
      title: 'Implement Deep Learning Models',
      description: 'Students will implement models using modern frameworks.',
    });
    console.log(`✔ Added outcomes: ${co1.coNumber} and ${co2.coNumber}`);

    // Test duplicate CO number error
    try {
      await SubjectService.addOutcome(faculty1UserId, createdCourseId, {
        coNumber: 'CO1',
        title: 'Duplicate CO',
        description: 'Should fail',
      });
      throw new Error('Failed to catch duplicate CO number!');
    } catch (err) {
      if (err instanceof ConflictError) {
        console.log('✔ Correctly prevented duplicate CO number.');
      } else {
        throw err;
      }
    }

    await SubjectService.updateOutcome(faculty1UserId, createdCourseId, co1.id, {
      title: 'Understand Advanced Neural Networks',
    });
    console.log('✔ Updated outcome CO1 title successfully.\n');

    // 5. Test Units and Topics CRUD
    console.log('5. Testing Units and Topics CRUD...');
    const unit1 = await SubjectService.addUnit(faculty1UserId, createdCourseId, {
      unitNumber: 1,
      unitName: 'Introduction to Deep Learning',
      description: 'Foundation concepts and math.',
    });
    console.log(`✔ Added Unit ${unit1.unitNumber}: "${unit1.unitName}"`);

    const topic1 = await SubjectService.addTopic(faculty1UserId, createdCourseId, unit1.id, {
      topicName: 'Backpropagation Calculus',
      description: 'Chain rule applied to neural networks.',
    });
    const topic2 = await SubjectService.addTopic(faculty1UserId, createdCourseId, unit1.id, {
      topicName: 'Activation Functions',
      description: 'ReLU, Sigmoid, and GELU.',
    });
    console.log(`✔ Added Topics to Unit 1: "${topic1.topicName}" and "${topic2.topicName}"\n`);

    // 6. Test Syllabus Upload/Delete
    console.log('6. Testing Syllabus PDF Attachment...');
    const syllabus = await SubjectService.uploadSyllabus(faculty1UserId, createdCourseId, {
      fileUrl: 'https://cdn.test.edu/syllabi/cs501_syllabus.pdf',
      originalFileName: 'AI_Syllabus_Fall2026.pdf',
    });
    console.log(`✔ Syllabus attached: "${syllabus.originalFileName}" at ${syllabus.fileUrl}\n`);

    // 7. Test List Subjects with Search, Filter, and Pagination
    console.log('7. Testing List Subjects (Pagination & Search)...');
    const listRes = await SubjectService.listSubjects(faculty1UserId, {
      page: 1,
      limit: 10,
      search: 'Artificial',
    });
    console.log(`✔ List query returned ${listRes.subjects.length} subjects (Total in DB for faculty: ${listRes.pagination.total})`);
    if (listRes.subjects[0].id !== createdCourseId) {
      throw new Error('Search result did not include the created subject!');
    }
    console.log('✔ Pagination and Search verified.\n');

    // 8. Test Authorization Constraints (Faculty 2 accessing Faculty 1 subject)
    console.log('8. Testing Authorization Enforcement...');
    try {
      await SubjectService.getSubjectById(faculty2UserId, createdCourseId);
      throw new Error('Faculty 2 should NOT be authorized to view Faculty 1 unassigned subject!');
    } catch (err) {
      if (err instanceof ForbiddenError) {
        console.log('✔ Successfully blocked unauthorized faculty from viewing unassigned subject.');
      } else {
        throw err;
      }
    }
    try {
      await SubjectService.updateSubject(faculty2UserId, createdCourseId, { credits: 5 });
      throw new Error('Faculty 2 should NOT be authorized to edit Faculty 1 unassigned subject!');
    } catch (err) {
      if (err instanceof ForbiddenError) {
        console.log('✔ Successfully blocked unauthorized faculty from editing unassigned subject.\n');
      } else {
        throw err;
      }
    }

    // 9. Test Delete Subject
    console.log('9. Testing Delete Subject...');
    await SubjectService.deleteSubject(faculty1UserId, createdCourseId);
    const checkDeleted = await prisma.course.findUnique({ where: { id: createdCourseId } });
    if (checkDeleted) {
      throw new Error('Subject was not deleted!');
    }
    console.log('✔ Subject deleted successfully (and cascaded cleanly).\n');

    console.log('=== ALL TESTS PASSED SUCCESSFULLY! ===');
  } catch (error) {
    console.error('❌ TEST FAILED:', error);
    process.exit(1);
  } finally {
    // Cleanup test data
    console.log('\nCleaning up test prerequisites...');
    try {
      if (createdCourseId) await prisma.course.deleteMany({ where: { id: createdCourseId } });
      if (testProgramId) await prisma.program.deleteMany({ where: { id: testProgramId } });
      if (faculty1ProfileId) await prisma.facultyProfile.deleteMany({ where: { id: faculty1ProfileId } });
      await prisma.facultyProfile.deleteMany({ where: { userId: faculty2UserId } });
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
