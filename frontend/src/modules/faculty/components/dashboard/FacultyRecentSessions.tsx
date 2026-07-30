"use client";

import React from "react";
import Link from "next/link";
import { MoreHorizontal, Eye } from "lucide-react";
import styles from "../../styles/faculty-dashboard.module.css";
import { mockRecentSessions } from "../../constants/mockData";

export default function FacultyRecentSessions() {
  return (
    <div className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Recent Sessions</h2>
        <Link href="/faculty/pulse-sessions" style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#10633B', textDecoration: 'none' }}>
          VIEW ALL SESSIONS
        </Link>
      </div>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
              <th style={{ padding: '12px 20px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Session</th>
              <th style={{ padding: '12px 20px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Subject</th>
              <th style={{ padding: '12px 20px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date</th>
              <th style={{ padding: '12px 20px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Attendance</th>
              <th style={{ padding: '12px 20px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Average Score</th>
              <th style={{ padding: '12px 20px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
              <th style={{ padding: '12px 20px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {mockRecentSessions.map((session) => (
              <tr key={session.id} style={{ borderBottom: '1px solid var(--surface-border)' }}>
                <td style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--text-main)', fontSize: '0.875rem' }}>{session.name}</td>
                <td style={{ padding: '16px 20px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>{session.subject}</td>
                <td style={{ padding: '16px 20px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>{session.date}</td>
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ flex: 1, height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${session.attendance}%`, backgroundColor: '#10633B' }} />
                    </div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{session.attendance}%</span>
                  </div>
                </td>
                <td style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--text-main)', fontSize: '0.875rem' }}>{session.averageScore}%</td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{ 
                    padding: '2px 8px', 
                    backgroundColor: '#dcfce7', 
                    color: '#166534', 
                    borderRadius: '12px', 
                    fontSize: '0.75rem', 
                    fontWeight: 600 
                  }}>
                    {session.status}
                  </span>
                </td>
                <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
