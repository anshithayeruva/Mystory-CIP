"use client";

import React from "react";
import styles from "../dashboard.module.css";
import { TrendingUp } from "lucide-react";

interface OverallIndexCardProps {
  score?: number;
}

export default function OverallIndexCard({ score }: OverallIndexCardProps) {
  const displayScore = score !== undefined ? (score > 10 ? (score / 10).toFixed(1) : score.toFixed(1)) : "9.4";
  const percentage = score !== undefined ? (score > 10 ? score : score * 10) : 94;

  return (
    <div className={styles.deptIndexCard}>
      <div className={styles.deptIndexHeader}>
        Overall Dept. Index
      </div>

      <div className={styles.deptIndexValueContainer}>
        <span className={styles.deptIndexBigNum}>{displayScore}</span>
        <span className={styles.deptIndexMax}>/ 10</span>
      </div>

      <div className={styles.deptProgressBar}>
        <div 
          className={styles.deptProgressFill} 
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>

      <div className={styles.deptIndexBannerText}>
        <span>EXCEEDING ACADEMIC BENCHMARKS</span>
        <TrendingUp size={16} />
      </div>
    </div>
  );
}
