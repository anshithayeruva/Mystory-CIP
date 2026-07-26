"use client";

import { BookOpen, GraduationCap, Building2, CheckCircle } from "lucide-react";
import styles from "../academic.module.css";

export default function SummaryCards() {
  return (
    <div className={styles.summaryCardsRow}>
      <div className={styles.summaryCard}>
        <div className={styles.summaryCardHeader}>
          <div className={styles.summaryCardIcon}>
            <BookOpen size={16} />
          </div>
          <span className={styles.summaryCardBadge}>+4.2%</span>
        </div>
        <div>
          <div className={styles.summaryCardLabel}>TOTAL SUBJECTS</div>
          <div className={styles.summaryCardValue}>128</div>
        </div>
      </div>

      <div className={styles.summaryCard}>
        <div className={styles.summaryCardHeader}>
          <div className={styles.summaryCardIcon}>
            <GraduationCap size={16} />
          </div>
        </div>
        <div>
          <div className={styles.summaryCardLabel}>PROGRAMS LINKED</div>
          <div className={styles.summaryCardValue}>14</div>
        </div>
      </div>

      <div className={styles.summaryCard}>
        <div className={styles.summaryCardHeader}>
          <div className={styles.summaryCardIcon} style={{ backgroundColor: "#f1f5f9", color: "#475569" }}>
            <Building2 size={16} />
          </div>
        </div>
        <div>
          <div className={styles.summaryCardLabel}>DEPARTMENTS</div>
          <div className={styles.summaryCardValue}>8</div>
        </div>
      </div>

      <div className={`${styles.summaryCard} ${styles.complianceCard}`}>
        <div style={{ marginTop: "12px" }}>
          <div className={styles.summaryCardLabel}>COMPLIANCE RATE</div>
          <div className={styles.summaryCardValue}>98.5%</div>
        </div>
        <CheckCircle size={48} className={styles.complianceBgIcon} />
      </div>
    </div>
  );
}
