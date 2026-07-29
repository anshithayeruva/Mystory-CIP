import React from 'react';
import { FacultyLayout } from '@/modules/faculty/components/layout/FacultyLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <FacultyLayout>{children}</FacultyLayout>;
}
