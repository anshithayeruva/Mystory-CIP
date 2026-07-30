import React from 'react';

import FacultyMetricsRow from '@/modules/faculty/components/dashboard/FacultyMetricsRow';
import FacultyRecentSessions from '@/modules/faculty/components/dashboard/FacultyRecentSessions';
import FacultyAssignedSubjects from '@/modules/faculty/components/dashboard/FacultyAssignedSubjects';
import FacultyConceptGapSummary from '@/modules/faculty/components/dashboard/FacultyConceptGapSummary';
import FacultyQuickActions from '@/modules/faculty/components/dashboard/FacultyQuickActions';
import styles from '@/modules/faculty/styles/faculty-dashboard.module.css';

export default function FacultyDashboard() {
  return (
    <div className={styles.dashboardContainer}>
      {/* 6 compact KPI cards */}
      <FacultyMetricsRow />

      {/* Main Two-Column Layout (Middle) */}
      <div className={styles.mainGrid}>
        <div className={styles.leftColumn}>
          <FacultyRecentSessions />
        </div>
        <div className={styles.rightColumn}>
          <FacultyAssignedSubjects />
        </div>
      </div>

      {/* Main Two-Column Layout (Bottom) */}
      <div className={styles.bottomGrid}>
        <div className={styles.leftColumn}>
          <FacultyConceptGapSummary />
        </div>
        <div className={styles.rightColumn}>
          <FacultyQuickActions />
        </div>
      </div>
    </div>
  );
}
