export interface KPI {
  title: string;
  value: string | number;
  icon?: any;
  subtext?: string;
  subtextType?: 'positive' | 'negative' | 'neutral';
  isHighlighted?: boolean;
}

export interface Session {
  id: string;
  name: string;
  subject: string;
  date: string;
  attendance: number;
  averageScore: number;
  status: 'Active' | 'Completed' | 'Upcoming';
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  students: number;
}

export interface Event {
  id: string;
  title: string;
  location: string;
  time: string;
  day: string;
  month: string;
  theme: 'dark' | 'light';
}

export interface ScheduleItem {
  id: string;
  timeSlot: string;
  subjectName: string;
  subjectCode: string;
  section: string;
  room: string;
  studentsCount: number;
  status: 'Completed' | 'Live Now' | 'Upcoming';
}
