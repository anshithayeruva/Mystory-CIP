"use client";

import React from "react";
import styles from "../../styles/faculty-dashboard.module.css";
import { mockKPIs } from "../../constants/mockData";

export default function FacultyMetricsRow() {
  return (
    <div className={styles.metricsGrid}>
      {mockKPIs.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <div 
            key={index} 
            className={`${styles.metricCard} ${kpi.isHighlighted ? styles.metricCardHighlighted : ''}`}
          >
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>{kpi.title}</span>
              {Icon && <Icon size={18} className={styles.metricIcon} />}
            </div>
            <div className={styles.metricValue}>{kpi.value}</div>
            
            {kpi.subtext && (
              <div 
                className={`${styles.metricSubtext} ${
                  kpi.subtextType === 'positive' ? styles.subtextPositive :
                  kpi.subtextType === 'negative' ? styles.subtextNegative :
                  styles.subtextAlert
                }`}
              >
                {kpi.subtext}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
