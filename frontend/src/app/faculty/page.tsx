import React from 'react';

import FacultyMetricsRow from '@/modules/faculty/components/dashboard/FacultyMetricsRow';
import FacultyRecentSessions from '@/modules/faculty/components/dashboard/FacultyRecentSessions';
import FacultyConceptGapSummary from '@/modules/faculty/components/dashboard/FacultyConceptGapSummary';
import FacultyQuickActions from '@/modules/faculty/components/dashboard/FacultyQuickActions';
import FacultyUpcomingEvents from '@/modules/faculty/components/dashboard/FacultyUpcomingEvents';
import styles from '@/modules/faculty/styles/faculty-dashboard.module.css';

export default function FacultyDashboard() {
  return (
    <div className={styles.dashboardContainer}>
      {/* 4 compact KPI cards */}
      <FacultyMetricsRow />

      {/* Main Two-Column Layout */}
      <div className={styles.mainGrid}>
        <div className={styles.leftColumn}>
          <FacultyRecentSessions />
          <FacultyConceptGapSummary />
        </div>
        <div className={styles.rightColumn}>
          <FacultyUpcomingEvents />
          <FacultyQuickActions />
        </div>
      </div>
    </div>
  );
}
