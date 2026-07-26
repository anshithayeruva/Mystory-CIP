"use client";

import styles from "../dashboard.module.css";
import Link from "next/link";

export default function OverviewCard() {
  return (
    <div className={styles.overviewCard}>
      <div className={styles.overviewTop}>
        {/* Left Panel */}
        <div className={styles.leftPanel}>
          <div className={styles.universityInfo}>
            <div className={styles.universityLogo}>
              {/* Placeholder for university logo */}
              <div style={{
                width: "100%", height: "100%", backgroundColor: "#e2e8f0", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", fontSize: "0.75rem", fontWeight: 600
              }}>Logo</div>
            </div>
            <div className={styles.universityDetails}>
              <h2 className={styles.universityName}>SRM AP<br/>University</h2>
            </div>
          </div>
          
          <div className={styles.leftPanelDivider} />
          
          <div className={styles.academicInfo}>
            <div>
              <span className={styles.statLabel}>ACADEMIC YEAR</span>
              <div className={styles.academicValue}>2023 - 24</div>
            </div>
            <div>
              <span className={styles.statLabel}>SEMESTER</span>
              <div className={styles.academicValue}>Fall 2024</div>
            </div>
          </div>
        </div>

        {/* Right Panel (Stats Grid) */}
        <div className={styles.statsGrid}>
          {/* Column 1 */}
          <div className={styles.statsColumn}>
            <div className={styles.statGroup}>
              <span className={styles.statLabel}>DEPARTMENTS</span>
              <div className={styles.statValue}>
                18 <span className={styles.statChange}>+2 New</span>
              </div>
            </div>
            
            <div className={styles.statGroup}>
              <span className={styles.statLabel}>FACULTY STRENGTH</span>
              <div className={styles.statValue}>
                312 <span className={styles.statChangeNeutral}>Members</span>
              </div>
            </div>
            
            <div className={styles.statGroup}>
              <span className={styles.statLabel}>STUDENT BODY</span>
              <div className={styles.statValue}>
                1,240 <span className={styles.statChangeNeutral}>Enrolled</span>
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className={styles.statsColumn}>
            <div className={styles.statGroup}>
              <span className={styles.statLabel}>ACTIVE SUBJECTS</span>
              <div className={styles.statValue}>
                156 <span className={styles.statChangeNeutral}>Courses</span>
              </div>
            </div>
            
            <div className={styles.liveSessionsBox}>
              <span className={styles.statLabel}>LIVE SESSIONS TODAY</span>
              <div className={styles.statValue}>42</div>
              <div className={styles.progressBarContainer}>
                <div className={styles.progressBarFill} style={{ width: "78%" }} />
              </div>
              <div className={styles.progressText}>78% Daily Capacity Utilization</div>
            </div>
          </div>

          {/* Column 3 */}
          <div className={styles.statsColumn}>
            <div className={styles.statGroup}>
              <span className={styles.statLabel}>AVG. ATTENDANCE</span>
              <div className={styles.statValue}>
                88% <span className={styles.statChange} style={{ color: "#166534", backgroundColor: "transparent", padding: 0 }}>↗ 3.2%</span>
              </div>
            </div>
            
            <div className={styles.statGroup}>
              <span className={styles.statLabel}>UNDERSTANDING SCORE</span>
              <div className={styles.statValue}>
                4.2 <span style={{ fontSize: "1rem", color: "#22c55e", letterSpacing: "2px" }}>★★★★☆</span>
              </div>
              <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", marginTop: "4px" }}>Based on student feedback</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
