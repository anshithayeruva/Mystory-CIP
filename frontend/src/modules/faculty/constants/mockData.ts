import { KPI, Session, Subject } from '../types';

import { Presentation, CheckCircle, BookOpen, Users, BrainCircuit } from 'lucide-react';

export const mockKPIs: KPI[] = [
  { 
    title: 'Total Sessions', 
    value: '124', 
    icon: Presentation,
    subtext: '+12 this semester',
    subtextType: 'positive'
  },
  { 
    title: 'Avg. Attendance', 
    value: '92%', 
    icon: Users,
    subtext: '+5% from last week',
    subtextType: 'positive'
  },
  { 
    title: 'Avg. Understanding', 
    value: '78%', 
    icon: BrainCircuit,
    subtext: 'Requires improvement',
    subtextType: 'negative'
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

export const mockUpcomingEvents: import('../types').Event[] = [
  {
    id: '1',
    title: 'HOD Senate Meeting',
    location: 'Conference Hall',
    time: '14:00 PM',
    day: '14',
    month: 'OCT',
    theme: 'dark'
  },
  {
    id: '2',
    title: 'End-Term Prep Review',
    location: 'Administrative Office',
    time: '11:30 AM',
    day: '18',
    month: 'OCT',
    theme: 'light'
  }
];
