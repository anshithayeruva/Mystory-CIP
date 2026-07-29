import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import styles from '../../styles/faculty.module.css';

interface FacultyLayoutProps {
  children: React.ReactNode;
}

export const FacultyLayout: React.FC<FacultyLayoutProps> = ({ children }) => {
  return (
    <div className={styles.facultyLayout}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Topbar />
        <main className={styles.pageContainer}>
          {children}
        </main>
      </div>
    </div>
  );
};
