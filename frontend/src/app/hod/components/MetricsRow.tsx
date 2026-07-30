"use client";

import React from "react";
import { GraduationCap, Users, CalendarCheck } from "lucide-react";
import styles from "../dashboard.module.css";

const metrics = [
  {
    id: "faculty",
    label: "TOTAL FACULTY",
    value: "42",
    subtext: "100% Active status",
    subtextStyle: styles.subtextPositive,
    icon: GraduationCap,
    isHighlighted: false,
  },
  {
    id: "students",
    label: "TOTAL STUDENTS",
    value: "1,102",
    subtext: "+12 from last month",
    subtextStyle: styles.subtextPositive,
    icon: Users,
    isHighlighted: false,
  },
  {
    id: "attendance",
    label: "AVG. ATTENDANCE",
    value: "88%",
    subtext: "-2% weekly trend",
    subtextStyle: styles.subtextNegative,
    icon: CalendarCheck,
    isHighlighted: false,
  },
];

export default function MetricsRow() {
  return (
    <div className={styles.metricsGrid}>
      {metrics.map((item) => {
        const Icon = item.icon;
        return (
          <div 
            key={item.id} 
            className={`${styles.metricCard} ${item.isHighlighted ? styles.metricCardHighlighted : ""}`}
          >
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>{item.label}</span>
              <Icon size={20} className={styles.metricIcon} />
            </div>
            <div className={styles.metricValue}>{item.value}</div>
            <div className={`${styles.metricSubtext} ${item.subtextStyle}`}>
              {item.subtext}
            </div>
          </div>
        );
      })}
    </div>
  );
}
