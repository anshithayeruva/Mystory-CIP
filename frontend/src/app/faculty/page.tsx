"use client";

import React, { useState, useEffect } from 'react';

import FacultyMetricsRow from '@/modules/faculty/components/dashboard/FacultyMetricsRow';
import FacultyRecentSessions from '@/modules/faculty/components/dashboard/FacultyRecentSessions';
import FacultyAttendanceOverview from '@/modules/faculty/components/dashboard/FacultyAttendanceOverview';
import FacultyTodaysSchedule from '@/modules/faculty/components/dashboard/FacultyTodaysSchedule';
import FacultyUpcomingEvents from '@/modules/faculty/components/dashboard/FacultyUpcomingEvents';
import UniversityBanner from '@/modules/faculty/components/dashboard/UniversityBanner';
import styles from '@/modules/faculty/styles/faculty-dashboard.module.css';
import { FacultyService } from '@/services/faculty.service';

export default function FacultyDashboard() {
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await FacultyService.getDashboard();
        if (response && response.success && response.data) {
          setDashboardData(response.data);
        }
      } catch (err) {
        console.warn('Faculty dashboard API offline, using fallback state:', err);
      }
    }
    loadDashboard();
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      {/* University Banner */}
      <UniversityBanner />

      {/* 3 compact KPI cards */}
      <FacultyMetricsRow data={dashboardData} />

      {/* Main Two-Column Layout */}
      <div className={styles.mainGrid}>
        <div className={styles.leftColumn}>
          <FacultyRecentSessions sessions={dashboardData?.recentSessions} />
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
