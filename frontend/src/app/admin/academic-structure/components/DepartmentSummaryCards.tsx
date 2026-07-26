"use client";

import { GraduationCap, Users, ArrowRight } from "lucide-react";
import styles from "../academic.module.css";

export default function DepartmentSummaryCards() {
  return (
    <div className={styles.summaryCardsRow} style={{ gridTemplateColumns: "1fr 1fr 1.5fr" }}>
      <div className={styles.summaryCard}>
        <div className={styles.summaryCardHeader}>
          <div className={styles.summaryCardIcon}>
            <GraduationCap size={16} />
          </div>
        </div>
        <div>
          <div className={styles.summaryCardLabel}>TOTAL PROGRAMS</div>
          <div className={styles.summaryCardValue}>142</div>
          <div style={{ fontSize: "0.6rem", color: "var(--text-main)", fontWeight: 600, marginTop: "4px" }}>
            ↗ +4 this semester
          </div>
        </div>
      </div>

      <div className={styles.summaryCard}>
        <div className={styles.summaryCardHeader}>
          <div className={styles.summaryCardIcon} style={{ backgroundColor: "#eff6ff", color: "#3b82f6" }}>
            <Users size={16} />
          </div>
        </div>
        <div>
          <div className={styles.summaryCardLabel}>STAFF/STUDENT RATIO</div>
          <div className={styles.summaryCardValue}>1:18</div>
          <div style={{ fontSize: "0.6rem", color: "var(--text-muted)", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ border: "1px solid var(--text-muted)", borderRadius: "50%", width: "10px", height: "10px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.45rem" }}>i</span>
            Optimal range
          </div>
        </div>
      </div>

      <div className={`${styles.summaryCard}`} style={{ backgroundColor: "#0f172a", color: "white", border: "none", position: "relative", overflow: "hidden" }}>
        <div style={{ marginTop: "8px", position: "relative", zIndex: 1 }}>
          <div className={styles.summaryCardLabel} style={{ color: "rgba(255, 255, 255, 0.7)" }}>HIERARCHY STATUS</div>
          <div className={styles.summaryCardValue} style={{ color: "white", fontSize: "1.25rem", marginBottom: "16px" }}>Synchronized</div>
          <a href="#" style={{ color: "#34d399", fontSize: "0.75rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px", textDecoration: "none" }}>
            Audit Structure <ArrowRight size={14} />
          </a>
        </div>
        {/* Abstract blocks in background */}
        <div style={{ position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: "4px", opacity: 0.1 }}>
          <div style={{ width: "30px", height: "20px", border: "2px solid white", borderRadius: "2px", marginLeft: "15px" }}></div>
          <div style={{ width: "45px", height: "20px", border: "2px solid white", borderRadius: "2px" }}></div>
          <div style={{ width: "30px", height: "20px", border: "2px solid white", borderRadius: "2px", marginLeft: "15px" }}></div>
        </div>
      </div>
    </div>
  );
}
