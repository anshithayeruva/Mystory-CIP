"use client";

import styles from "../dashboard.module.css";

export default function OverviewCard() {
  return (
    <div className={styles.overviewCard}>
      <div className={styles.overviewHeaderRow}>
        <div className={styles.universityInfo}>
          <div className={styles.universityLogo}>
            <div style={{
              width: "100%", height: "100%", backgroundColor: "#f1f5f9", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", fontSize: "0.65rem", fontWeight: 600
            }}>Logo</div>
          </div>
          <div className={styles.universityDetails}>
            <h2 className={styles.universityName}>SRM AP University</h2>
            <div className={styles.statusBadge}>
              <div className={styles.statusDot} />
              OPERATIONAL STATUS: LIVE
            </div>
          </div>
        </div>
        
        <div className={styles.academicInfo}>
          <div style={{ textAlign: "right" }}>
            <span className={styles.statLabel}>ACADEMIC YEAR</span>
            <div className={styles.academicValue}>2023 - 24</div>
          </div>
          <div className={styles.headerDividerVertical} />
          <div>
            <span className={styles.statLabel}>SEMESTER</span>
            <div className={styles.academicValue}>Fall 2024</div>
          </div>
        </div>
      </div>

      <div className={styles.overviewMetricsGrid}>
        <div className={styles.metricBox}>
          <span className={styles.metricLabel}>LIVE SESSIONS TODAY</span>
          <div className={styles.metricValue}>42</div>
        </div>
        
        <div className={styles.metricBox}>
          <span className={styles.metricLabel}>ATTENDANCE TODAY</span>
          <div className={styles.metricValueContainer}>
            <span className={styles.metricValue}>88%</span>
          </div>
        </div>
        
        <div className={styles.metricBox}>
          <span className={styles.metricLabel}>AVERAGE UNDERSTANDING</span>
          <div className={styles.metricValueContainer}>
            <span className={styles.metricValue}>4.2 <span className={styles.metricDenominator}>/ 5</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
