import { KPI, Session, Subject } from '../types';

import { GraduationCap, Users, CalendarCheck, FileWarning } from 'lucide-react';

export const mockKPIs: KPI[] = [
  { 
    title: 'Total Staff', 
    value: '42', 
    icon: GraduationCap,
    subtext: '100% Active status',
    subtextType: 'positive'
  },
  { 
    title: 'Total Students', 
    value: '1,102', 
    icon: Users,
    subtext: '+12 from last month',
    subtextType: 'positive'
  },
  { 
    title: 'Avg. Attendance', 
    value: '88%', 
    icon: CalendarCheck,
    subtext: '-2% weekly trend',
    subtextType: 'negative'
  },
  { 
    title: 'Pending Tasks', 
    value: '03', 
    icon: FileWarning,
    subtext: 'Requires immediate attention',
    subtextType: 'neutral',
    isHighlighted: true
  },
];

export const mockRecentSessions: Session[] = [
  {
    id: '1',
    name: 'Intro to Data Structures',
    subject: 'CS-302',
    date: 'Today, 10:00 AM',
    attendance: 92,
    averageScore: 85,
    status: 'Completed',
  },
  {
    id: '2',
    name: 'Advanced Algorithms',
    subject: 'CS-401',
    date: 'Yesterday, 2:00 PM',
    attendance: 88,
    averageScore: 78,
    status: 'Completed',
  },
  {
    id: '3',
    name: 'Database Normalization',
    subject: 'IT-204',
    date: 'Oct 12, 11:00 AM',
    attendance: 95,
    averageScore: 90,
    status: 'Completed',
  },
];

export const mockAssignedSubjects: Subject[] = [
  { id: '1', code: 'CS-302', name: 'Data Structures', students: 120 },
  { id: '2', code: 'CS-401', name: 'Advanced Algorithms', students: 85 },
  { id: '3', code: 'IT-204', name: 'Database Systems', students: 150 },
  { id: '4', code: 'CS-501', name: 'AI & Robotics', students: 60 },
];
