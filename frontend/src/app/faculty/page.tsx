import React from 'react';
import { Plus, FileText, Settings, BookOpen } from 'lucide-react';
import styles from '@/modules/faculty/styles/faculty.module.css';
import { mockKPIs } from '@/modules/faculty/constants/mockData';
import { StatCard } from '@/modules/faculty/components/shared/StatCard';
import { RecentSessionsTable } from '@/modules/faculty/components/dashboard/RecentSessionsTable';
import { ConceptGapCard } from '@/modules/faculty/components/dashboard/ConceptGapCard';

export default function FacultyDashboard() {
  return (
    <>
      <div className={styles.dashboardHeader} style={{ alignItems: 'flex-start' }}>
        <div>
          <h1 className={styles.pageTitle}>Faculty Dashboard</h1>
          <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
            <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', color: '#6B7280', padding: '6px 16px', borderRadius: '9999px', fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Settings size={14} /> Department: Computer Science Engineering
            </div>
            <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', color: '#6B7280', padding: '6px 16px', borderRadius: '9999px', fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
              <BookOpen size={14} /> Assigned Subjects: 00
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button className={styles.primaryButton} style={{ backgroundColor: '#FFFFFF', color: '#111827', border: '1px solid #E5E7EB' }}>
            <FileText size={18} color="#10633B" />
            <span style={{ color: '#10633B' }}>View Reports</span>
          </button>
          <button className={styles.primaryButton}>
            <Plus size={18} />
            Create Pulse Session
          </button>
        </div>
      </div>

      <div className={styles.kpiGrid}>
        {mockKPIs.map((kpi, index) => (
          <StatCard key={index} data={kpi} />
        ))}
      </div>

      <div className={styles.dashboardGrid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Distribution by Subject</h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', color: '#6B7280', fontSize: 14 }}>
            No data
          </div>
        </div>
        <ConceptGapCard />
      </div>

      <div style={{ marginTop: 24 }}>
        <RecentSessionsTable />
      </div>

      <div className={styles.card} style={{ marginTop: 24 }}>
        <div className={styles.cardHeader} style={{ marginBottom: 16 }}>
          <h2 className={styles.cardTitle}>Assigned Subjects</h2>
        </div>
        <div style={{ color: '#6B7280', fontSize: 14 }}>
          No subjects assigned.
        </div>
      </div>
    </>
  );
}
