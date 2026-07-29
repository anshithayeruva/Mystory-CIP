import React from 'react';
import styles from '../../styles/faculty.module.css';
import { Badge } from '../shared/Badge';
import { mockRecentSessions } from '../../constants/mockData';

export const RecentSessionsTable: React.FC = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader} style={{ marginBottom: 16 }}>
        <h2 className={styles.cardTitle}>Recent Sessions</h2>
        <a href="/faculty/pulse-sessions" style={{ fontSize: 13, color: '#6B7280', textDecoration: 'none', fontWeight: 500 }}>View All</a>
      </div>
      <table className={styles.table}>
        <thead style={{ backgroundColor: '#F3F4F6' }}>
          <tr>
            <th style={{ borderBottom: 'none' }}>SESSION NAME</th>
            <th style={{ borderBottom: 'none' }}>SUBJECT</th>
            <th style={{ borderBottom: 'none' }}>DATE</th>
            <th style={{ borderBottom: 'none' }}>ATTENDANCE</th>
            <th style={{ borderBottom: 'none' }}>AVG SCORE</th>
            <th style={{ borderBottom: 'none' }}>STATUS</th>
            <th style={{ borderBottom: 'none' }}>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {mockRecentSessions.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: 'center', padding: '32px', color: '#6B7280' }}>
                No recent sessions found.
              </td>
            </tr>
          ) : (
            mockRecentSessions.map((session) => (
            <tr key={session.id}>
              <td>
                <div style={{ fontWeight: 600, color: '#111827' }}>{session.subjectCode}</div>
                <div style={{ fontSize: 13, color: '#6B7280' }}>{session.subjectName}</div>
              </td>
              <td>{session.date}</td>
              <td>{session.duration}</td>
              <td style={{ fontWeight: 600 }}>{session.attendancePct}%</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div className={styles.scoreBar}>
                    <div 
                      className={styles.scoreFill} 
                      style={{ 
                        width: `${session.understandingScore}%`,
                        backgroundColor: session.understandingScore > 80 ? '#059669' : '#D97706'
                      }} 
                    />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{session.understandingScore}%</span>
                </div>
              </td>
              <td>
                <Badge status={session.status} />
              </td>
            </tr>
          )))}
        </tbody>
      </table>
    </div>
  );
};
