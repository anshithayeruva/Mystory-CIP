"use client";

import React from "react";
import styles from "../dashboard.module.css";
import { TrendingUp } from "lucide-react";

export default function OverallIndexCard() {
  return (
    <div className={styles.deptIndexCard}>
      <div className={styles.deptIndexHeader}>
        Overall Dept. Index
      </div>

      <div className={styles.deptIndexValueContainer}>
        <span className={styles.deptIndexBigNum}>9.4</span>
        <span className={styles.deptIndexMax}>/ 10</span>
      </div>

      <div className={styles.deptProgressBar}>
        <div className={styles.deptProgressFill} />
      </div>

      <div className={styles.deptIndexBannerText}>
        <span>EXCEEDING ACADEMIC BENCHMARKS</span>
        <TrendingUp size={16} />
      </div>
    </div>
  );
}
