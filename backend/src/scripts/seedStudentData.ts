import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding student mock data...');

  // 1. Create a dummy student user
  const user = await prisma.user.upsert({
    where: { email: 'student_seed@srmap.edu.in' },
    update: {},
    create: {
      email: 'student_seed@srmap.edu.in',
      passwordHash: 'hashed_password_here',
      role: 'STUDENT',
      firstName: 'Jane',
      lastName: 'Doe',
      isActive: true,
    },
  });

  // 2. Create department
  const dept = await prisma.department.upsert({
    where: { code: 'CSE' },
    update: {},
    create: {
      name: 'Computer Science and Engineering',
      code: 'CSE',
    },
  });

  // 3. Create student profile
  const studentProfile = await prisma.studentProfile.upsert({
    where: { rollNumber: 'AP2111000000' },
    update: {},
    create: {
      userId: user.id,
      rollNumber: 'AP2111000000',
      departmentId: dept.id,
      currentSemester: 6,
      batch: '2023 - 2027',
      status: 'ACTIVE',
    },
  });

  // 4. Create dummy course and faculty
  const course = await prisma.course.upsert({
    where: { code: 'CSE 302' },
    update: {},
    create: {
      name: 'Database Management Systems',
      code: 'CSE 302',
      credits: 4,
      departmentId: dept.id,
    },
  });

  const facultyUser = await prisma.user.upsert({
    where: { email: 'sarah.jenkins@srmap.edu.in' },
    update: {},
    create: {
      email: 'sarah.jenkins@srmap.edu.in',
      passwordHash: 'pwd',
      role: 'FACULTY',
      firstName: 'Sarah',
      lastName: 'Jenkins',
    },
  });

  const facultyProfile = await prisma.facultyProfile.upsert({
    where: { employeeId: 'EMP-001' },
    update: {},
    create: {
      userId: facultyUser.id,
      employeeId: 'EMP-001',
      designation: 'Professor',
      departmentId: dept.id,
    },
  });

  const facultyCourse = await prisma.facultyCourse.upsert({
    where: {
      facultyId_courseId_section_academicYear_semester: {
        facultyId: facultyProfile.id,
        courseId: course.id,
        section: 'Sec A',
        academicYear: '2025-26',
        semester: 6,
      },
    },
    update: {},
    create: {
      facultyId: facultyProfile.id,
      courseId: course.id,
      section: 'Sec A',
      academicYear: '2025-26',
      semester: 6,
    },
  });

  // 5. Create Enrollment
  await prisma.enrollment.create({
    data: {
      studentId: studentProfile.id,
      courseId: course.id,
      semester: 6,
      academicYear: '2025-26',
      grade: 'A',
      marks: 92,
      gpa: 9.0,
    },
  });

  // 6. Create ClassSchedule
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = days[new Date().getDay()] as string;

  await prisma.classSchedule.create({
    data: {
      facultyCourseId: facultyCourse.id,
      dayOfWeek: today,
      startTime: '10:45 AM',
      endTime: '12:15 PM',
      room: 'AB2 - Hall 405',
      type: 'Lecture',
    },
  });

  // 7. Create Assignment
  const assignment = await prisma.assignment.create({
    data: {
      facultyCourseId: facultyCourse.id,
      title: 'SQL Optimization Project',
      dueDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // Next week
      dueTime: '11:59 PM',
    },
  });

  // 8. Create Submission
  await prisma.assignmentSubmission.create({
    data: {
      assignmentId: assignment.id,
      studentId: studentProfile.id,
      status: 'PENDING',
    },
  });

  console.log('Seeding completed! Use Student ID:', studentProfile.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
