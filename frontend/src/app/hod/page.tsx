"use client";

import React, { useEffect, useState } from "react";
import MetricsRow from "./components/MetricsRow";
import LiveSessionMonitor from "./components/LiveSessionMonitor";
import ProgramsCard from "./components/ProgramsCard";
import UpcomingEvents from "./components/UpcomingEvents";
import QuickActions from "./components/QuickActions";
import OverallIndexCard from "./components/OverallIndexCard";
import UniversityBanner from "./components/UniversityBanner";
import { HodService } from "@/services/hod.service";
import styles from "./dashboard.module.css";

export default function HodDashboard() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response = await HodService.getDashboard();
        if (response && response.success) {
          setDashboardData(response.data);
        }
      } catch (err) {
        console.warn("Could not load backend dashboard data, using initial interface state:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      {/* University Banner */}
      <UniversityBanner department={dashboardData?.department} />

      {/* Top 3 Metrics Cards */}
      <MetricsRow data={dashboardData?.metrics} />

      {/* Main Two-Column Layout */}
      <div className={styles.mainGrid}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          <ProgramsCard programsData={dashboardData?.programs} />
          <LiveSessionMonitor sessionsData={dashboardData?.liveSessions} />
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          <UpcomingEvents eventsData={dashboardData?.events} />
          <QuickActions />
          <OverallIndexCard score={dashboardData?.metrics?.overallIndex} />
        </div>
      </div>
    </div>
  );
}
