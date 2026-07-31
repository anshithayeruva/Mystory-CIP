"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "../../styles/faculty-dashboard.module.css";

export default function FacultyConceptGapSummary() {
  return (
    <div className={styles.sectionCard} style={{ height: '100%' }}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitleRow}>
          <h2 className={styles.sectionTitle}>Concept Gap Summary</h2>
        </div>
      </div>
      
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '16px' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#991b1b', textTransform: 'uppercase', marginBottom: '8px' }}>Weakest Topic</p>
            <p style={{ fontSize: '1rem', fontWeight: 700, color: '#7f1d1d' }}>Dynamic Programming</p>
            <p style={{ fontSize: '0.875rem', color: '#b91c1c', marginTop: '4px' }}>42% average understanding</p>
          </div>
          <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '16px' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#166534', textTransform: 'uppercase', marginBottom: '8px' }}>Strongest Topic</p>
            <p style={{ fontSize: '1rem', fontWeight: 700, color: '#14532d' }}>Hash Tables</p>
            <p style={{ fontSize: '0.875rem', color: '#15803d', marginTop: '4px' }}>89% average understanding</p>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>Recommendation</p>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Students are struggling with Memoization in Dynamic Programming. Consider running a targeted 15-minute Pulse Session focusing exclusively on overlapping subproblems.
          </p>
        </div>

        <Link href="/faculty/concept-gap-analysis" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '8px', 
          backgroundColor: '#004b28', 
          color: '#ffffff', 
          padding: '12px', 
          borderRadius: '8px', 
          textDecoration: 'none', 
          fontSize: '0.875rem', 
          fontWeight: 700,
          marginTop: 'auto'
        }}>
          View Detailed Analysis <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
