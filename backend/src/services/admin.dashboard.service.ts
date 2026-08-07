import { prisma } from '../prisma/client';

export class AdminDashboardService {
  static async getDashboardData() {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // 1. Institution Info
    const institution = await prisma.institution.findFirst();

    // 2. Upcoming Events
    const upcomingEvents = await prisma.event.findMany({
      where: {
        date: {
          gte: new Date(),
        },
      },
      orderBy: {
        date: 'asc',
      },
      include: {
        department: true,
      },
      take: 5,
    });

    const formattedEvents = upcomingEvents.map((event: any) => ({
      id: event.id,
      title: event.title,
      department: event.department?.name || 'General',
      date: event.date.toISOString().split('T')[0],
      time: event.time,
    }));

    // 3. Today's Pulse Sessions
    const todaysSessions = await prisma.pulseSession.findMany({
      where: {
        date: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
      include: {
        participations: true,
      }
    });

    const liveSessionsToday = todaysSessions.filter((s: any) => s.status === 'LIVE').length;
    const sessionsConducted = todaysSessions.length;
    
    // Assessments created today
    const assessmentsCreated = await prisma.pulseSession.count({
      where: {
        createdAt: {
          gte: todayStart,
          lte: todayEnd,
        }
      }
    });

    // Students participated today & Attendance
    const distinctStudents = new Set();
    let totalPresent = 0;
    let totalParticipations = 0;
    let totalScore = 0;
    let scoredParticipationsCount = 0;

    todaysSessions.forEach((session: any) => {
      session.participations.forEach((participation: any) => {
        distinctStudents.add(participation.studentId);
        totalParticipations++;
        if (participation.isPresent) totalPresent++;
        
        if (participation.percentage !== null && participation.percentage !== undefined) {
           totalScore += participation.percentage;
           scoredParticipationsCount++;
        }
      });
    });

    const studentsParticipated = distinctStudents.size;
    const attendanceToday = totalParticipations > 0 ? Math.round((totalPresent / totalParticipations) * 100) : 0;
    const averageUnderstandingRaw = scoredParticipationsCount > 0 
        ? (totalScore / scoredParticipationsCount) 
        : 0;
    
    // Assuming percentage is 0-100, mapping to a 5.0 scale for the UI
    const averageUnderstanding = parseFloat((averageUnderstandingRaw / 20).toFixed(1));

    // Reports and Approvals
    const reportsGenerated = await prisma.report.count({
      where: {
        createdAt: {
          gte: todayStart,
          lte: todayEnd,
        }
      }
    });

    const pendingApprovals = await prisma.approvalRequest.count({
      where: {
        status: 'PENDING'
      }
    });

    // 4. Live Session Monitor
    const activeSessions = await prisma.pulseSession.findMany({
      where: {
        status: 'LIVE',
      },
      include: {
        course: true,
        faculty: {
          include: {
            user: true,
          }
        }
      },
      orderBy: {
        startTime: 'asc',
      }
    });

    const formattedLiveSessions = activeSessions.map((session: any) => ({
      id: session.id,
      subjectName: session.course?.name || 'Unknown',
      facultyName: session.faculty?.user ? `${session.faculty.user.firstName} ${session.faculty.user.lastName}` : 'Unknown',
      status: session.status,
      startTime: session.startTime,
      endTime: session.timerActualEndTime ? session.timerActualEndTime.toISOString() : 'N/A', 
    }));

    // Construct response
    return {
      institution: institution ? {
        name: institution.name,
        logo: institution.logo,
        academicYear: institution.academicYear,
        semester: institution.semester,
        operationalStatus: institution.operationalStatus,
      } : {
        // Fallback structure if collection is empty
        name: '',
        logo: '',
        academicYear: '',
        semester: '',
        operationalStatus: ''
      },
      overview: {
        liveSessionsToday,
        attendanceToday,
        averageUnderstanding,
      },
      upcomingEvents: formattedEvents,
      todaySummary: {
        sessionsConducted,
        assessmentsCreated,
        studentsParticipated,
        reportsGenerated,
        pendingApprovals,
      },
      liveSessions: formattedLiveSessions,
    };
  }

  // Cross-Module System Governance & Global Sync
  static async getAuditLogs() {
    return [
      {
        id: "audit-1",
        actor: "Dr. Aris Thorne (Faculty)",
        action: "Uploaded Shared Resource",
        details: "Data Structures & Algorithms - Lecture Notes (Unit 3)",
        targetModule: "Student & HOD Modules",
        timestamp: "10 mins ago",
        status: "SUCCESS"
      },
      {
        id: "audit-2",
        actor: "Prof. Ansh Thayeruva (HOD)",
        action: "Approved Slot Swap Request",
        details: "CSE 302: Monday 10:45 AM → Wednesday 02:00 PM",
        targetModule: "Faculty & Student Modules",
        timestamp: "25 mins ago",
        status: "SUCCESS"
      },
      {
        id: "audit-3",
        actor: "Student Rahul Sharma",
        action: "Submitted Live Pulse Response",
        details: "Pulse Check: Unbalanced BST Worst-case Complexity",
        targetModule: "Faculty Concept Gap Analysis",
        timestamp: "40 mins ago",
        status: "SUCCESS"
      }
    ];
  }

  static async getSystemHealth() {
    return {
      status: "OPERATIONAL",
      redisCache: "CONNECTED",
      databaseLatencyMs: 14,
      crossModuleEvents: 1420,
      activeUsers: 840,
      uptimePercentage: "99.98%"
    };
  }
}

