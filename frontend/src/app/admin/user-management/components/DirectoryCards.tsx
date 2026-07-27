"use client";

import { TrendingUp, Hourglass, Database } from "lucide-react";
import styles from "../directory.module.css";

export default function DirectoryCards() {
  return (
    <div className={styles.summaryCardsRow}>
      <div className={styles.summaryCard}>
        <div className={styles.cardTopRow}>
          <div className={styles.summaryCardLabel}>Total Active Users</div>
          <TrendingUp size={18} className={styles.cardTopIconGreen} />
        </div>
        <div>
          <div className={styles.summaryCardValue}>1,084</div>
          <div className={styles.summaryCardSubtext}>+12% this month</div>
        </div>
      </div>

      <div className={styles.summaryCard}>
        <div className={styles.cardTopRow}>
          <div className={styles.summaryCardLabel}>Pending Invites</div>
          <Hourglass size={18} className={styles.cardTopIconGray} />
        </div>
        <div>
          <div className={styles.summaryCardValue}>42</div>
          <div className={styles.summaryCardSubtext}>Awaiting verification</div>
        </div>
      </div>

      <div className={styles.summaryCard}>
        <div className={styles.cardTopRow}>
          <div className={styles.summaryCardLabel}>Storage Used</div>
          <Database size={18} className={styles.cardTopIconRed} />
        </div>
        <div>
          <div className={styles.summaryCardValue}>78.4 GB</div>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBarFill} style={{ width: "65%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
