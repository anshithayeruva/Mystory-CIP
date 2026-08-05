import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class StudentService {
  /**
   * Get basic student information and metrics
   */
  async getStudentInfo(studentId: string) {
    const student = await prisma.studentProfile.findUnique({
      where: { id: studentId },
      include: {
        user: true,
        program: true,
        department: true,
        enrollments: true,
        attendance: true,
      },
    });

    if (!student) {
      throw new Error('Student not found');
    }

    // Calculate CGPA
    let totalGPA = 0;
    let creditsEarned = 0;
    let creditsRegistered = 0;

    const enrollments = await prisma.enrollment.findMany({
      where: { studentId },
      include: { course: true }
    });

    enrollments.forEach(enr => {
      creditsRegistered += enr.course.credits;
      if (enr.gpa && enr.gpa > 0) {
        totalGPA += enr.gpa * enr.course.credits;
        creditsEarned += enr.course.credits;
      }
    });

    const cgpa = creditsEarned > 0 ? (totalGPA / creditsEarned).toFixed(2) : '0.00';

    // Calculate Attendance
    const totalClasses = student.attendance.length;
    const presentClasses = student.attendance.filter(a => a.status === 'PRESENT').length;
    const overallAttendance = totalClasses > 0 ? ((presentClasses / totalClasses) * 100).toFixed(1) : '100.0';

    return {
      id: student.id,
      name: `${student.user.firstName} ${student.user.lastName}`,
      rollNo: student.rollNumber,
      regNo: student.registrationNumber || student.rollNumber,
      email: student.user.email,
      phone: student.user.phoneNumber || 'N/A',
      program: student.program?.name || 'N/A',
      department: student.department?.name || 'N/A',
      semester: student.currentSemester,
      batch: student.batch,
      cgpa: parseFloat(cgpa),
      sgpa: parseFloat(cgpa), // simplified
      overallAttendance: parseFloat(overallAttendance),
      creditsEarned,
      creditsRegistered,
      classRank: 'N/A',
      academicStanding: 'Active',
      advisorName: 'Assigned Advisor',
      advisorEmail: 'advisor@srmap.edu.in',
      address: 'N/A',
      emergencyContact: 'N/A',
    };
  }

  /**
   * Get today's class schedule
   */
  async getTodayClasses(studentId: string) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = days[new Date().getDay()]; // E.g., "Monday"

    // Find courses student is enrolled in
    const enrollments = await prisma.enrollment.findMany({
      where: { studentId },
      select: { courseId: true }
    });
    const courseIds = enrollments.map(e => e.courseId);

    // Get schedules for these courses
    const schedules = await prisma.classSchedule.findMany({
      where: {
        dayOfWeek,
        facultyCourse: {
          courseId: { in: courseIds }
        }
      },
      include: {
        facultyCourse: {
          include: {
            course: true,
            faculty: {
              include: { user: true }
            }
          }
        }
      }
    });

    return schedules.map(sch => {
      // Determine status based on time (mocked logic for now, should parse time)
      return {
        id: sch.id,
        courseCode: sch.facultyCourse.course.code,
        courseName: sch.facultyCourse.course.name,
        faculty: `${sch.facultyCourse.faculty.user.firstName} ${sch.facultyCourse.faculty.user.lastName}`,
        room: sch.room,
        time: `${sch.startTime} - ${sch.endTime}`,
        type: sch.type,
        status: 'UPCOMING', // Or logic to check LIVE
        pulseSessionId: undefined
      };
    });
  }

  /**
   * Get all registered courses
   */
  async getStudentCourses(studentId: string) {
    const enrollments = await prisma.enrollment.findMany({
      where: { studentId },
      include: {
        course: {
          include: {
            facultyCourses: {
              include: {
                faculty: {
                  include: { user: true }
                }
              }
            }
          }
        }
      }
    });

    return enrollments.map(enr => {
      const course = enr.course;
      const facultyCourse = course.facultyCourses[0];
      const facultyName = facultyCourse ? `${facultyCourse.faculty.user.firstName} ${facultyCourse.faculty.user.lastName}` : 'TBA';
      const facultyEmail = facultyCourse ? facultyCourse.faculty.user.email : 'TBA';

      return {
        id: course.id,
        code: course.code,
        name: course.name,
        faculty: facultyName,
        facultyEmail,
        officeHours: facultyCourse?.faculty.officeHours || 'TBA',
        credits: course.credits,
        attendance: 100, // Requires complex attendance aggregation per course
        currentGrade: enr.grade || 'N/A',
        progress: 0,
        bannerColor: 'linear-gradient(135deg, #00522E 0%, #007A45 100%)',
        description: course.description || '',
        outcomes: []
      };
    });
  }

  /**
   * Get upcoming assignments
   */
  async getStudentAssignments(studentId: string) {
    const submissions = await prisma.assignmentSubmission.findMany({
      where: { studentId },
      include: {
        assignment: {
          include: {
            facultyCourse: {
              include: {
                course: true,
                faculty: { include: { user: true } }
              }
            }
          }
        }
      },
      orderBy: {
        assignment: { dueDate: 'asc' }
      }
    });

    return submissions.map(sub => {
      const asg = sub.assignment;
      const daysRemaining = Math.max(0, Math.ceil((new Date(asg.dueDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)));
      
      return {
        id: sub.id,
        title: asg.title,
        courseCode: asg.facultyCourse.course.code,
        courseName: asg.facultyCourse.course.name,
        faculty: `${asg.facultyCourse.faculty.user.firstName} ${asg.facultyCourse.faculty.user.lastName}`,
        dueDate: asg.dueDate.toISOString().split('T')[0],
        dueTime: asg.dueTime || '11:59 PM',
        daysRemaining,
        maxMarks: asg.maxMarks,
        obtainedMarks: sub.obtainedMarks,
        status: sub.status,
        priority: asg.priority,
        instructions: asg.description || '',
        feedback: sub.feedback,
        submissionDate: sub.submissionDate ? sub.submissionDate.toISOString() : undefined,
        fileAttachment: sub.fileUrl || undefined
      };
    });
  }

  /**
   * Get learning insights
   */
  async getLearningInsights(studentId: string) {
    // Return statically derived insights for now
    return {
      strongestSubject: {
        name: 'Advanced Data Structures',
        percentage: 91
      },
      needsAttention: {
        name: 'Computer Networks',
        reason: 'Understanding dropped by 12% this week.'
      },
      currentStreak: '5 classes attended consecutively',
      aiRecommendation: {
        text: 'Review Binary Trees before tomorrow\'s quiz.',
        estimatedTime: '25 mins'
      }
    };
  }
  /**
   * Get attendance analytics and daily logs
   */
  async getAttendanceAnalytics(studentId: string, semesterFilter: string) {
    const student = await prisma.studentProfile.findUnique({
      where: { id: studentId },
    });

    if (!student) throw new Error('Student not found');

    // For demonstration, we'll fetch real enrollments to build the subjects
    const enrollments = await prisma.enrollment.findMany({
      where: { studentId },
      include: {
        course: {
          include: {
            facultyCourses: {
              include: {
                faculty: {
                  include: { user: true }
                }
              }
            }
          }
        }
      }
    });

    // Mocked data structure built from real course list
    const attendanceData = enrollments.map(enr => {
      const course = enr.course;
      const facultyCourse = course.facultyCourses[0];
      const facultyName = facultyCourse ? `${facultyCourse.faculty.user.firstName} ${facultyCourse.faculty.user.lastName}` : 'TBA';
      
      return {
        code: course.code,
        name: course.name,
        faculty: facultyName,
        percent: 92.5, // Mock calculated percentage
        attended: 30,
        total: 32
      };
    });

    // Generate some daily logs for these courses
    const dailyLogs = enrollments.flatMap(enr => [
      {
        date: new Date().toISOString().split('T')[0],
        code: enr.course.code,
        subject: enr.course.name,
        time: '09:00 AM - 10:00 AM',
        status: 'Present'
      },
      {
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        code: enr.course.code,
        subject: enr.course.name,
        time: '10:00 AM - 11:00 AM',
        status: Math.random() > 0.8 ? 'Absent' : 'Present'
      }
    ]);

    return {
      attendanceData,
      dailyLogs: dailyLogs.sort((a, b) => new Date(b.date as string).getTime() - new Date(a.date as string).getTime())
    };
  }

  /**
   * Get concept understanding analytics
   */
  async getConceptUnderstanding(studentId: string, semesterFilter: string) {
    const enrollments = await prisma.enrollment.findMany({
      where: { studentId },
      include: { course: true }
    });

    return enrollments.map(enr => ({
      code: enr.course.code,
      name: enr.course.name,
      overallClarity: 85 + Math.floor(Math.random() * 10), // mock stat
      quizzes: '10 / 10 Completed',
      topics: [
        { name: 'Introduction to ' + enr.course.name, clarity: 95, status: 'Mastery', quizzes: '3/3 Passed' },
        { name: 'Advanced Concepts in ' + enr.course.name, clarity: 80, status: 'Good Understanding', quizzes: '2/3 Passed' },
        { name: 'Final Applications', clarity: 75, status: 'Needs Practice', quizzes: '1/2 Passed' }
      ]
    }));
  }

  /**
   * Save a generated report
   */
  async generateAndSaveReport(studentId: string, title: string, type: string) {
    const student = await prisma.studentProfile.findUnique({
      where: { id: studentId }
    });
    
    if (!student) throw new Error('Student not found');

    const fileUrl = `https://s3.university.edu/reports/${studentId}/${Date.now()}_${type}.pdf`;

    const report = await prisma.generatedReport.create({
      data: {
        studentId,
        title,
        type,
        fileUrl
      }
    });

    return report;
  }
  /**
   * Get all settings and preferences for the student
   */
  async getSettings(studentId: string) {
    let student = await prisma.studentProfile.findUnique({
      where: { id: studentId },
      include: {
        user: true,
        program: true,
        department: true,
        notificationSettings: true,
      }
    });

    if (!student) {
      student = await prisma.studentProfile.findFirst({
        include: {
          user: true,
          program: true,
          department: true,
          notificationSettings: true,
        }
      });
    }

    if (!student) throw new Error('Student not found');

    return {
      profile: {
        name: `${student.user.firstName} ${student.user.lastName}`,
        rollNo: student.rollNumber,
        email: student.user.email,
        phone: student.user.phoneNumber || '',
        regNo: student.registrationNumber || '',
        address: student.address || '',
        emergencyContact: student.emergencyContact || '',
      },
      academic: {
        program: student.program?.name || 'N/A',
        department: student.department?.name || 'N/A',
        academicYear: '2025 - 2026', // Can be derived dynamically
        semester: `Semester ${student.currentSemester}`,
        advisorName: 'Assigned Advisor', // Hardcoded for now until Advisor model exists
        learningMode: student.learningMode || 'Hybrid / Classroom',
      },
      notifications: student.notificationSettings || {
        timetableReminders: true,
        attendanceAlerts: true,
        resourceUploads: true,
        weeklyDigest: false,
      },
      security: {
        enable2FA: student.user.twoFactorEnabled,
      }
    };
  }

  /**
   * Update Profile Settings
   */
  async updateProfile(studentId: string, data: any) {
    let student = await prisma.studentProfile.findUnique({ where: { id: studentId } });
    if (!student) student = await prisma.studentProfile.findFirst();
    if (!student) throw new Error('Student not found');
    const validStudentId = student.id;

    // Update user details
    if (data.phone !== undefined || data.name !== undefined) {
      const updateData: any = {};
      if (data.phone !== undefined) updateData.phoneNumber = data.phone;
      if (data.name !== undefined) {
        const parts = data.name.split(' ');
        updateData.firstName = parts[0];
        updateData.lastName = parts.slice(1).join(' ');
      }
      await prisma.user.update({
        where: { id: student.userId },
        data: updateData
      });
    }

    // Update student details
    if (data.address !== undefined || data.emergencyContact !== undefined) {
      await prisma.studentProfile.update({
        where: { id: validStudentId },
        data: {
          address: data.address,
          emergencyContact: data.emergencyContact,
        }
      });
    }

    return { success: true };
  }

  /**
   * Update Academic Settings
   */
  async updateAcademic(studentId: string, data: any) {
    let student = await prisma.studentProfile.findUnique({ where: { id: studentId } });
    if (!student) student = await prisma.studentProfile.findFirst();
    if (!student) throw new Error('Student not found');

    await prisma.studentProfile.update({
      where: { id: student.id },
      data: {
        learningMode: data.learningMode,
      }
    });
    return { success: true };
  }

  /**
   * Update Notification Settings
   */
  async updateNotifications(studentId: string, data: any) {
    let student = await prisma.studentProfile.findUnique({ where: { id: studentId } });
    if (!student) student = await prisma.studentProfile.findFirst();
    if (!student) throw new Error('Student not found');
    const validStudentId = student.id;

    await prisma.studentNotificationSettings.upsert({
      where: { studentId: validStudentId },
      create: {
        studentId: validStudentId,
        ...data
      },
      update: {
        ...data
      }
    });
    return { success: true };
  }

  /**
   * Update Security Settings
   */
  async updateSecurity(studentId: string, data: any) {
    let student = await prisma.studentProfile.findUnique({ where: { id: studentId } });
    if (!student) student = await prisma.studentProfile.findFirst();
    if (!student) throw new Error('Student not found');

    const updateData: any = {};
    
    if (data.enable2FA !== undefined) {
      updateData.twoFactorEnabled = data.enable2FA;
    }

    if (data.newPassword) {
      // In a real application, you would verify currentPassword, hash newPassword using bcrypt, etc.
      // Skipping auth logic implementation per user instructions, just updating the hash directly
      updateData.passwordHash = data.newPassword; // Mock hashing
    }

    await prisma.user.update({
      where: { id: student.userId },
      data: updateData
    });

    return { success: true };
  }

  /**
   * Get Student Documents
   */
  async getDocuments(studentId: string) {
    let student = await prisma.studentProfile.findUnique({ where: { id: studentId } });
    if (!student) student = await prisma.studentProfile.findFirst();
    if (!student) throw new Error('Student not found');
    const validStudentId = student.id;

    let documents = await prisma.studentDocument.findMany({
      where: { studentId: validStudentId },
      orderBy: { createdAt: 'desc' }
    });

    // Seed default documents if none exist (for demonstration)
    if (documents.length === 0) {
      await prisma.studentDocument.createMany({
        data: [
          { studentId: validStudentId, name: 'Digital Student ID Card', category: 'Identity', status: 'VERIFIED' },
          { studentId: validStudentId, name: 'Official Academic Transcript (Sem 1-5)', category: 'Academic Record', status: 'VERIFIED' },
          { studentId: validStudentId, name: 'Semester 6 Fee Payment Receipt', category: 'Financial', status: 'PAID' },
          { studentId: validStudentId, name: 'Bonafide Student Certificate', category: 'Administrative', status: 'ISSUED' },
        ]
      });
      documents = await prisma.studentDocument.findMany({
        where: { studentId: validStudentId },
        orderBy: { createdAt: 'desc' }
      });
    }

    return documents;
  }
}

export const studentService = new StudentService();

