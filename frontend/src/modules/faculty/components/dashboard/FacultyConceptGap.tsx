"use client";

import React from "react";
import Link from "next/link";
import { MoreHorizontal, AlertCircle } from "lucide-react";
import styles from "../../styles/faculty-dashboard.module.css";

export default function FacultyConceptGap() {
  return (
    <div className={styles.sectionCard}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>Concept Gap Summary</h2>
        <button className={styles.iconButton}>
          <MoreHorizontal size={20} />
        </button>
      </div>
      
      <div style={{ padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
        <AlertCircle size={48} color="#94a3b8" strokeWidth={1.5} />
        <p style={{ color: '#475569', fontSize: '0.9375rem', margin: 0 }}>No concept gap data available.</p>
        <Link 
          href="/faculty/concept-gap-analysis" 
          style={{ 
            color: '#10633B', 
            fontWeight: 600, 
            fontSize: '0.875rem', 
            textDecoration: 'none',
            marginTop: '8px'
          }}
        >
          View Detailed Gap Report →
        </Link>
      </div>
    </div>
  );
}
