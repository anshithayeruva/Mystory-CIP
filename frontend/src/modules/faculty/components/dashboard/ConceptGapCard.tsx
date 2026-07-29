import React from 'react';
import styles from '../../styles/faculty.module.css';
import { Badge } from '../shared/Badge';
import { mockConceptGaps } from '../../constants/mockData';

export const ConceptGapCard: React.FC = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>Concept Gap Summary</h2>
      </div>
      <div>
        {mockConceptGaps.length === 0 ? (
          <div style={{ padding: '32px 0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <p style={{ color: '#6B7280', fontSize: 14 }}>No concept gap data available.</p>
            <a href="/faculty/concept-gap-analysis" style={{ color: '#10633B', fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>View detailed gap report →</a>
          </div>
        ) : (
          mockConceptGaps.map((gap, index) => (
          <div key={index} className={styles.conceptGapItem}>
            <div className={styles.gapInfo}>
              <span className={styles.gapSubject}>{gap.subject}</span>
              <span className={styles.gapTopic}>{gap.topic}</span>
            </div>
            <div className={styles.gapScore}>
              <div className={styles.scoreBar}>
                <div 
                  className={styles.scoreFill} 
                  style={{ 
                    width: `${gap.gapScore}%`,
                    backgroundColor: gap.status === 'Critical' ? '#B91C1C' : gap.status === 'Warning' ? '#D97706' : '#059669'
                  }} 
                />
              </div>
              <Badge status={gap.status} />
            </div>
          </div>
        )))}
      </div>
    </div>
  );
};
