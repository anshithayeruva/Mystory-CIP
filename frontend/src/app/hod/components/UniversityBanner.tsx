"use client";

import styles from "../dashboard.module.css";

interface UniversityBannerProps {
  department?: {
    name?: string;
    code?: string;
  };
}

export default function UniversityBanner({ department }: UniversityBannerProps) {
  return (
    <div className={styles.universityBanner}>
      {/* Left: Logo + Name */}
      <div className={styles.universityInfo}>
        <div className={styles.universityLogo}>
          <div className={styles.universityLogoPlaceholder}>
            {department?.code || "SRM"}
          </div>
        </div>
        <div className={styles.universityDetails}>
          <h2 className={styles.universityName}>
            {department?.name ? `${department.name} Department` : "SRM AP University"}
          </h2>
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
          <div className={styles.bannerStatValue}>2024 – 25</div>
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
