"use client";

import styles from "../academic.module.css";

export default function ProgramInsights() {
  return (
    <div className={styles.insightsGrid}>
      <div className={styles.insightCard}>
        <div className={styles.insightContent}>
          <h3 className={styles.insightTitle}>Program Diversification Insight</h3>
          <p className={styles.insightText}>
            AI analytics suggests high student interest in Interdisciplinary AI modules. Adding these to "B.Tech Computer Science" could increase enrollment by up to 15%.
          </p>
        </div>
        <button className={styles.insightButton}>
          View Detailed Forecast
        </button>
      </div>

      <div className={styles.metricsCard}>
        <span className={styles.metricTitle}>Total Active Programs</span>
        <div className={styles.metricValueLarge}>48</div>
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBarFill} style={{ width: "65%" }}></div>
        </div>
        <p className={styles.metricSubtext}>
          65% of capacity utilized across all departments.
        </p>
      </div>
    </div>
  );
}
