import * as dotenv from 'dotenv';
dotenv.config();
import { prisma } from './src/prisma/client';

async function main() {
  console.log('Seeding dashboard collections...');

  // 1. Institution
  const institutionCount = await prisma.institution.count();
  if (institutionCount === 0) {
    await prisma.institution.create({
      data: {
        name: 'SRM AP University',
        logo: 'https://example.com/logo.png',
        academicYear: '2023-24',
        semester: 'Fall 2024',
        operationalStatus: 'LIVE',
      },
    });
    console.log('Created Institution record.');
  }

  // 2. Find or Create a Dummy User for relations
  let user = await prisma.user.findFirst();
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: 'admin@srmap.edu.in',
        passwordHash: 'dummyhash',
        firstName: 'System',
        lastName: 'Admin',
        role: 'ADMIN',
      },
    });
    console.log('Created dummy Admin User.');
  }

  // 3. Event
  const eventCount = await prisma.event.count();
  if (eventCount === 0) {
    await prisma.event.createMany({
      data: [
        {
          title: 'Faculty Orientation',
          date: new Date(new Date().getTime() + 86400000), // Tomorrow
          time: '10:00 AM',
        },
        {
          title: 'Mid-Term Examinations Start',
          date: new Date(new Date().getTime() + 86400000 * 7), // Next week
          time: '09:00 AM',
        },
      ],
    });
    console.log('Created Event records.');
  }

  // 4. Report
  const reportCount = await prisma.report.count();
  if (reportCount === 0) {
    await prisma.report.create({
      data: {
        title: 'Weekly Attendance Summary',
        type: 'ATTENDANCE',
        generatedBy: user.id,
      },
    });
    console.log('Created Report record.');
  }

  // 5. Approval Request
  const approvalCount = await prisma.approvalRequest.count();
  if (approvalCount === 0) {
    await prisma.approvalRequest.create({
      data: {
        title: 'New Course Curriculum Approval',
        type: 'CURRICULUM',
        status: 'PENDING',
        requestedBy: user.id,
      },
    });
    console.log('Created ApprovalRequest record.');
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
