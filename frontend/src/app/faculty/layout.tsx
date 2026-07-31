import React from 'react';
import FacultyLayout from '@/modules/faculty/components/layout/FacultyLayout';

export default function FacultyRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FacultyLayout>{children}</FacultyLayout>;
}
