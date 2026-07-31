import React from 'react';

import FacultyMetricsRow from '@/modules/faculty/components/dashboard/FacultyMetricsRow';
import FacultyRecentSessions from '@/modules/faculty/components/dashboard/FacultyRecentSessions';
import FacultyAttendanceOverview from '@/modules/faculty/components/dashboard/FacultyAttendanceOverview';
import FacultyTodaysSchedule from '@/modules/faculty/components/dashboard/FacultyTodaysSchedule';
import FacultyUpcomingEvents from '@/modules/faculty/components/dashboard/FacultyUpcomingEvents';
import UniversityBanner from '@/modules/faculty/components/dashboard/UniversityBanner';
import styles from '@/modules/faculty/styles/faculty-dashboard.module.css';

export default function FacultyDashboard() {
  return (
    <div className={styles.dashboardContainer}>
      {/* University Banner */}
      <UniversityBanner />

      {/* 3 compact KPI cards */}
      <FacultyMetricsRow />

      {/* Main Two-Column Layout */}
      <div className={styles.mainGrid}>
        <div className={styles.leftColumn}>
          <FacultyRecentSessions />
          <FacultyAttendanceOverview />
        </div>
        <div className={styles.rightColumn}>
          <FacultyTodaysSchedule />
          <FacultyUpcomingEvents />
        </div>
      </div>
    </div>
  );
}
