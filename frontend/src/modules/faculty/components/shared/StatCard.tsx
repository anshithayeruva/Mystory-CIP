import React from 'react';
import styles from '../../styles/faculty.module.css';
import { KPIData } from '../../types';

export const StatCard: React.FC<{ data: KPIData }> = ({ data }) => {
  return (
    <div className={styles.kpiCard}>
      <span className={styles.kpiLabel}>{data.label}</span>
      <span className={styles.kpiValue}>{data.value}</span>
    </div>
  );
};
