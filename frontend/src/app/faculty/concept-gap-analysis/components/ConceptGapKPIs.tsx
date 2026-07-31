import React from "react";
import styles from "../concept-gap.module.css";

interface ConceptGapKPIStats {
  sessionsAnalyzed: number;
  conceptsCovered: number;
  studentsAssessed: number;
  averageUnderstanding: number;
}

interface ConceptGapKPIsProps {
  stats: ConceptGapKPIStats;
}

export default function ConceptGapKPIs({ stats }: ConceptGapKPIsProps) {
  return (
    <div className={styles.kpiRow}>
      <div className={styles.kpiCard}>
        <div className={styles.kpiLabel}>Sessions Analyzed</div>
        <div className={styles.kpiValue}>{stats.sessionsAnalyzed}</div>
      </div>
      <div className={styles.kpiCard}>
        <div className={styles.kpiLabel}>Concepts Covered</div>
        <div className={styles.kpiValue}>{stats.conceptsCovered}</div>
      </div>
      <div className={styles.kpiCard}>
        <div className={styles.kpiLabel}>Students Assessed</div>
        <div className={styles.kpiValue}>{stats.studentsAssessed}</div>
      </div>
      <div className={styles.kpiCard}>
        <div className={styles.kpiLabel}>Average Understanding</div>
        <div className={styles.kpiValue}>{stats.averageUnderstanding}%</div>
      </div>
    </div>
  );
}
