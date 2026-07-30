"use client";

import React from "react";
import { MoreHorizontal } from "lucide-react";
import styles from "../../styles/faculty-dashboard.module.css";

export default function FacultyDistributionChart() {
  return (
    <div className={styles.sectionCard}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>Distribution by Subject</h2>
        <button className={styles.iconButton}>
          <MoreHorizontal size={20} />
        </button>
      </div>
      
      <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
        <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Large chart placeholder</p>
      </div>
    </div>
  );
}
