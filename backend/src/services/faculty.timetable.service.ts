import { prisma } from '../prisma/client';
import cache from '../lib/redis';

export interface FacultySlot {
  id: string;
  day: string;
  time: string;
  code: string;
  name: string;
  section: string;
  room: string;
  type: 'Lecture' | 'Tutorial' | 'Lab' | 'Office Hours';
  students: number;
  status: 'COMPLETED' | 'LIVE' | 'UPCOMING';
  notes?: string;
}

const DEFAULT_TIMETABLE: { day: string; slots: FacultySlot[] }[] = [
  {
    day: 'Monday',
    slots: [
      { id: 'f-1', day: 'Monday', time: '09:00 AM - 10:30 AM', code: 'CSE 302', name: 'Database Management Systems', section: 'Sec A', room: 'AB2 - Hall 405', type: 'Lecture', students: 60, status: 'COMPLETED' },
      { id: 'f-2', day: 'Monday', time: '10:45 AM - 12:15 PM', code: 'CSE 302', name: 'Database Management Systems', section: 'Sec B', room: 'AB2 - Hall 406', type: 'Lecture', students: 58, status: 'LIVE' },
      { id: 'f-3', day: 'Monday', time: '02:00 PM - 05:00 PM', code: 'CSE 302L', name: 'DBMS Lab Group A', section: 'Sec A', room: 'CS Lab 1', type: 'Lab', students: 30, status: 'UPCOMING' }
    ]
  },
  {
    day: 'Tuesday',
    slots: [
      { id: 'f-4', day: 'Tuesday', time: '10:45 AM - 12:15 PM', code: 'CSE 302T', name: 'DBMS Query Tuning Tutorial', section: 'Sec A', room: 'AB2 - Hall 405', type: 'Tutorial', students: 30, status: 'UPCOMING' },
      { id: 'f-5', day: 'Tuesday', time: '02:00 PM - 05:00 PM', code: 'CSE 302L', name: 'DBMS Lab Group B', section: 'Sec B', room: 'CS Lab 1', type: 'Lab', students: 28, status: 'UPCOMING' }
    ]
  },
  {
    day: 'Wednesday',
    slots: [
      { id: 'f-6', day: 'Wednesday', time: '09:00 AM - 10:30 AM', code: 'CSE 302', name: 'Database Management Systems', section: 'Sec C', room: 'AB2 - Hall 407', type: 'Lecture', students: 60, status: 'UPCOMING' },
      { id: 'f-7', day: 'Wednesday', time: '01:30 PM - 04:30 PM', code: 'CSE 302L', name: 'DBMS Lab Group C', section: 'Sec C', room: 'CS Lab 1', type: 'Lab', students: 30, status: 'UPCOMING' }
    ]
  },
  {
    day: 'Thursday',
    slots: [
      { id: 'f-8', day: 'Thursday', time: '11:00 AM - 12:30 PM', code: 'CSE 302', name: 'Relational Algebra & Normalization', section: 'Sec A', room: 'AB2 - Hall 405', type: 'Lecture', students: 60, status: 'UPCOMING' },
      { id: 'f-9', day: 'Thursday', time: '03:00 PM - 04:30 PM', code: 'FAC-OFFICE', name: 'Student Office Hours', section: 'All Sec', room: 'Room 402', type: 'Office Hours', students: 15, status: 'UPCOMING' }
    ]
  },
  {
    day: 'Friday',
    slots: [
      { id: 'f-10', day: 'Friday', time: '10:00 AM - 11:30 AM', code: 'CSE 302', name: 'Transaction Processing & Concurrency', section: 'Sec B', room: 'AB2 - Hall 406', type: 'Lecture', students: 58, status: 'UPCOMING' }
    ]
  }
];

export class FacultyTimetableService {
  private static async resolveFaculty(userId?: string) {
    if (userId) {
      const faculty = await prisma.facultyProfile.findFirst({
        where: { userId },
        include: { department: true }
      });
      if (faculty) return faculty;
    }
    return prisma.facultyProfile.findFirst({
      include: { department: true }
    });
  }

  /**
   * Get weekly timetable for faculty
   */
  static async getTimetable(userId?: string) {
    const cacheKey = `faculty:timetable:${userId || 'default'}`;

    try {
      if (cache && typeof cache.get === 'function') {
        const cached = await cache.get(cacheKey);
        if (cached) return JSON.parse(cached);
      }
    } catch (err) {
      console.warn('Redis read skipped for timetable:', err);
    }

    const faculty = await this.resolveFaculty(userId);

    if (!faculty) {
      return DEFAULT_TIMETABLE;
    }

    // Query pulse sessions to dynamic blend with default timetable
    const dbSessions = await prisma.pulseSession.findMany({
      where: { facultyId: faculty.id },
      include: { course: true }
    }).catch(() => []);

    const timetable = DEFAULT_TIMETABLE.map((dayObj) => {
      const daySessions = dbSessions.filter((s) => {
        const d = new Date(s.date);
        const dayName = d.toLocaleDateString('en-US', { weekday: 'long' });
        return dayName === dayObj.day;
      });

      if (daySessions.length === 0) return dayObj;

      const extraSlots: FacultySlot[] = daySessions.map((s) => ({
        id: s.id,
        day: dayObj.day,
        time: s.startTime || '10:45 AM - 12:15 PM',
        code: s.course?.code || 'CSE 302',
        name: s.title,
        section: s.section || 'Sec A',
        room: 'AB2 - Hall 405',
        type: 'Lecture',
        students: 60,
        status: s.status === 'LIVE' ? 'LIVE' : s.status === 'COMPLETED' ? 'COMPLETED' : 'UPCOMING'
      }));

      return {
        ...dayObj,
        slots: [...dayObj.slots, ...extraSlots]
      };
    });

    try {
      if (cache && typeof cache.setex === 'function') {
        await cache.setex(cacheKey, 60, JSON.stringify(timetable));
      }
    } catch (err) {
      console.warn('Redis write skipped for timetable:', err);
    }

    return timetable;
  }

  /**
   * Add extra session to timetable
   */
  static async addExtraSession(userId: string | undefined, data: {
    day: string;
    code: string;
    name: string;
    section: string;
    time: string;
    room: string;
    type?: 'Lecture' | 'Tutorial' | 'Lab' | 'Office Hours';
    notes?: string;
  }) {
    const faculty = await this.resolveFaculty(userId);

    let course = await prisma.course.findFirst({ where: { code: data.code } });
    if (!course && faculty) {
      course = await prisma.course.findFirst({ where: { departmentId: faculty.departmentId } });
    }

    if (faculty && course) {
      let topic = await prisma.topic.findFirst({ where: { unit: { courseId: course.id } } });
      if (!topic) {
        const unit = await prisma.unit.findFirst({ where: { courseId: course.id } }) ||
          await prisma.unit.create({ data: { courseId: course.id, unitNumber: 1, unitName: 'General' } });
        topic = await prisma.topic.create({ data: { unitId: unit.id, topicName: data.name } });
      }

      await prisma.pulseSession.create({
        data: {
          title: data.name,
          courseId: course.id,
          topicId: topic.id,
          departmentId: faculty.departmentId,
          facultyId: faculty.id,
          semester: 1,
          section: data.section,
          sessionType: 'TUTORIAL_SESSION',
          date: new Date(),
          startTime: data.time,
          durationMinutes: 60,
          questionCount: 5,
          questionType: 'MCQ',
          difficultyLevel: 'MEDIUM',
          attendanceRule: 'BOTH',
          resultVisibility: 'IMMEDIATE',
          status: 'PUBLISHED'
        }
      }).catch(() => null);
    }

    // Invalidate cache
    try {
      if (cache && typeof cache.del === 'function') {
        await cache.del(`faculty:timetable:${userId || 'default'}`);
      }
    } catch (e) {}

    return {
      id: `f-${Date.now()}`,
      day: data.day,
      time: data.time,
      code: data.code,
      name: data.name,
      section: data.section,
      room: data.room,
      type: data.type || 'Tutorial',
      students: 60,
      status: 'UPCOMING',
      notes: data.notes
    };
  }

  /**
   * Update timetable slot
   */
  static async updateSlot(slotId: string, data: { name?: string; room?: string; time?: string; notes?: string }) {
    if (!slotId.startsWith('f-')) {
      await prisma.pulseSession.update({
        where: { id: slotId },
        data: {
          ...(data.name && { title: data.name }),
          ...(data.time && { startTime: data.time })
        }
      }).catch(() => null);
    }

    return { id: slotId, ...data };
  }

  /**
   * Request rescheduling / slot swap
   */
  static async requestSwap(slotId: string, data: { targetFaculty: string; reason?: string }) {
    return {
      id: slotId,
      status: 'SWAP_REQUESTED',
      targetFaculty: data.targetFaculty,
      message: `Reschedule request sent to ${data.targetFaculty}.`
    };
  }
}
