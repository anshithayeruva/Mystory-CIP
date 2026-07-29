export interface FacultyProfile {
  id: string;
  name: string;
  designation: string;
  department: string;
  email: string;
  imageUrl?: string;
  assignedSubjectsCount: number;
}

export interface KPIData {
  label: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
}

export interface Session {
  id: string;
  subjectCode: string;
  subjectName: string;
  date: string;
  duration: string;
  attendancePct: number;
  understandingScore: number;
  status: 'Completed' | 'Live' | 'Scheduled';
}

export interface ConceptGap {
  subject: string;
  topic: string;
  gapScore: number;
  status: 'Critical' | 'Warning' | 'On Track';
}
