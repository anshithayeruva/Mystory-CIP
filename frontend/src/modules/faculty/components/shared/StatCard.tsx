import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import styles from '../../styles/faculty.module.css';
import { KPIData } from '../../types';

export const StatCard: React.FC<{ data: KPIData }> = ({ data }) => {
  return (
    <div className={styles.kpiCard}>
      <span className={styles.kpiLabel}>{data.label}</span>
      <span className={styles.kpiValue}>{data.value}</span>
      {data.trend && (
        <span className={`${styles.kpiTrend} ${data.trendUp ? styles.trendUp : styles.trendDown}`}>
          {data.trendUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {data.trend} from last week
        </span>
      )}
    </div>
  );
};
