"use client";

import React from "react";
import Link from "next/link";
import { MoreHorizontal, Users } from "lucide-react";
import styles from "../../styles/faculty-dashboard.module.css";
import { mockAssignedSubjects } from "../../constants/mockData";

export default function FacultyAssignedSubjects() {
  return (
    <div className={styles.sectionCard}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>Assigned Subjects</h2>
        <button className={styles.iconButton}>
          <MoreHorizontal size={20} />
        </button>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '0 20px 20px' }}>
        {mockAssignedSubjects.length === 0 ? (
          <p style={{ color: '#64748b', fontSize: '0.875rem', textAlign: 'center', padding: '20px 0' }}>
            No subjects assigned yet.
          </p>
        ) : (
          mockAssignedSubjects.map((subject) => (
            <div key={subject.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid var(--surface-border)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <Link href="/faculty/subjects" style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.875rem', textDecoration: 'none' }}>
                  {subject.name}
                </Link>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{subject.code}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '0.75rem', fontWeight: 500 }}>
                <Users size={14} />
                {subject.students}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
