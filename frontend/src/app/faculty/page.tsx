import React from 'react';

import FacultyMetricsRow from '@/modules/faculty/components/dashboard/FacultyMetricsRow';
import FacultyDistributionChart from '@/modules/faculty/components/dashboard/FacultyDistributionChart';
import FacultyConceptGap from '@/modules/faculty/components/dashboard/FacultyConceptGap';
import FacultyRecentSessions from '@/modules/faculty/components/dashboard/FacultyRecentSessions';
import FacultyAssignedSubjects from '@/modules/faculty/components/dashboard/FacultyAssignedSubjects';
import styles from '@/modules/faculty/styles/faculty-dashboard.module.css';

export default function FacultyDashboard() {
  return (
    <div className={styles.dashboardContainer}>
      {/* 6 compact KPI cards */}
      <FacultyMetricsRow />

      {/* Main Two-Column Layout */}
      <div className={styles.mainGrid}>
        {/* Left Column (flex: 1) */}
        <div className={styles.leftColumn}>
          <FacultyDistributionChart />
          <FacultyConceptGap />
          <FacultyRecentSessions />
        </div>

        {/* Right Column (340px) */}
        <div className={styles.rightColumn}>
          <FacultyAssignedSubjects />
        </div>
      </div>
    </div>
  );
}
