"use client";

import React from "react";
import styles from "../../styles/faculty-dashboard.module.css";

export default function UniversityBanner() {
  return (
    <div className={styles.universityBanner}>
      {/* Left: Logo + Name */}
      <div className={styles.universityInfo}>
        <div className={styles.universityLogo}>
          <div className={styles.universityLogoPlaceholder}>Logo</div>
        </div>
        <div className={styles.universityDetails}>
          <h2 className={styles.universityName}>SRM AP University</h2>
          <div className={styles.statusBadge}>
            <div className={styles.statusDot} />
            OPERATIONAL STATUS: LIVE
          </div>
        </div>
      </div>

      {/* Right: Academic Info */}
      <div className={styles.bannerAcademicInfo}>
        <div style={{ textAlign: "right" }}>
          <span className={styles.bannerStatLabel}>ACADEMIC YEAR</span>
          <div className={styles.bannerStatValue}>2023 – 24</div>
        </div>
        <div className={styles.bannerDividerVertical} />
        <div>
          <span className={styles.bannerStatLabel}>SEMESTER</span>
          <div className={styles.bannerStatValue}>Fall 2024</div>
        </div>
      </div>
    </div>
  );
}
