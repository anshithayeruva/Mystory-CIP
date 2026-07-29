import { FacultyProfile, KPIData, Session, ConceptGap } from '../types';

export const mockFacultyProfile: FacultyProfile = {
  id: 'fac-001',
  name: 'Dr. Aris V. K.',
  designation: 'Senior Faculty, CSE',
  department: 'Computer Science Engineering',
  email: 'aris@mystory.edu',
  assignedSubjectsCount: 0,
};

export const mockKPIs: KPIData[] = [
  { label: 'Total Sessions', value: '0' },
  { label: 'Active Sessions', value: '00' },
  { label: 'Completed', value: '0', trend: 'Total', trendUp: true },
  { label: 'Assigned Subjects', value: '00', trend: ' ', trendUp: true },
  { label: 'Attendance Rate', value: '0%', trend: 'Overall', trendUp: true },
  { label: 'Understanding', value: '0%', trend: 'Avg', trendUp: true },
];

export const mockRecentSessions: Session[] = [];

export const mockConceptGaps: ConceptGap[] = [];
