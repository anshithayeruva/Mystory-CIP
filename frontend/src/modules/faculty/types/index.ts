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
