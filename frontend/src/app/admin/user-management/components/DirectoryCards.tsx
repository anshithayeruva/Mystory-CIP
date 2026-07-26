"use client";

import { GraduationCap, Users, UserCheck } from "lucide-react";
import styles from "../directory.module.css";

export default function DirectoryCards() {
  return (
    <div className={styles.summaryCardsRow}>
      <div className={styles.summaryCard}>
        <div className={styles.summaryCardIcon} style={{ backgroundColor: "#eff6ff", color: "#3b82f6" }}>
          <GraduationCap size={20} />
        </div>
        <div>
          <div className={styles.summaryCardLabel}>FACULTY</div>
          <div className={styles.summaryCardValue}>312</div>
        </div>
      </div>

      <div className={styles.summaryCard}>
        <div className={styles.summaryCardIcon} style={{ backgroundColor: "#faf5ff", color: "#a855f7" }}>
          <Users size={20} />
        </div>
        <div>
          <div className={styles.summaryCardLabel}>STUDENTS</div>
          <div className={styles.summaryCardValue}>1,240</div>
        </div>
      </div>

      <div className={styles.summaryCard}>
        <div className={styles.summaryCardIcon} style={{ backgroundColor: "#ecfdf5", color: "#10b981" }}>
          <UserCheck size={20} />
        </div>
        <div>
          <div className={styles.summaryCardLabel}>HODS</div>
          <div className={styles.summaryCardValue}>24</div>
        </div>
      </div>
    </div>
  );
}
