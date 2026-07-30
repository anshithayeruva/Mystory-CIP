import React from "react";
import styles from "../pulse-sessions.module.css";

interface KPIStats {
  total: number;
  live: number;
  upcoming: number;
  completed: number;
}

interface PulseSessionKPIsProps {
  stats: KPIStats;
}

export default function PulseSessionKPIs({ stats }: PulseSessionKPIsProps) {
  return (
    <div className={styles.kpiRow}>
      <div className={styles.kpiCard}>
        <div className={styles.kpiLabel}>Total Sessions</div>
        <div className={styles.kpiValue}>{stats.total}</div>
      </div>
      <div className={styles.kpiCard}>
        <div className={styles.kpiLabel}>Live Sessions</div>
        <div className={styles.kpiValue}>{stats.live}</div>
      </div>
      <div className={styles.kpiCard}>
        <div className={styles.kpiLabel}>Upcoming</div>
        <div className={styles.kpiValue}>{stats.upcoming}</div>
      </div>
      <div className={styles.kpiCard}>
        <div className={styles.kpiLabel}>Completed</div>
        <div className={styles.kpiValue}>{stats.completed}</div>
      </div>
    </div>
  );
}
