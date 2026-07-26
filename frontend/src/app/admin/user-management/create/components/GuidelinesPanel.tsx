"use client";

import { Info, Mail, ShieldCheck, AtSign, Lightbulb } from "lucide-react";
import styles from "../create.module.css";

export default function GuidelinesPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div className={styles.guideCard}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <Info size={20} color="#064e3b" />
          <span style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-main)" }}>Account Guidelines</span>
        </div>
        
        <div className={styles.guideList}>
          <div className={styles.guideItem}>
            <AtSign className={styles.guideIcon} size={28} />
            <div className={styles.guideText}>
              Institution email will be generated automatically based on <strong>roll number and department formatting</strong>.
            </div>
          </div>
          <div className={styles.guideItem}>
            <ShieldCheck className={styles.guideIcon} size={28} />
            <div className={styles.guideText}>
              Temporary password will be generated securely and shared via the welcome email.
            </div>
          </div>
          <div className={styles.guideItem}>
            <ShieldCheck className={styles.guideIcon} size={28} />
            <div className={styles.guideText}>
              User will be prompted to <strong>change password</strong> on first login to ensure full <strong>personal ownership</strong>.
            </div>
          </div>
          <div className={styles.guideItem}>
            <Mail className={styles.guideIcon} size={28} />
            <div className={styles.guideText}>
              Welcome email will be sent automatically to the official domain mailbox <strong>upon creation</strong>.
            </div>
          </div>
        </div>

        <div className={styles.quickTip}>
          <div className={styles.quickTipHeader}>
            <Lightbulb size={14} /> QUICK TIP
          </div>
          <div className={styles.quickTipText}>
            Student IDs are immutable once created. Double-check the Roll Number and Admission Year before finalizing.
          </div>
        </div>
      </div>

      <div className={styles.integrityCard}>
        <div className={styles.integrityLabel}>INSTITUTIONAL INTEGRITY</div>
        <div className={styles.integrityText}>Securing the next generation of academic leaders.</div>
      </div>
    </div>
  );
}
