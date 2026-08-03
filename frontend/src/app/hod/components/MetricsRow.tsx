"use client";

import React from "react";
import { GraduationCap, Users, CalendarCheck } from "lucide-react";
import styles from "../dashboard.module.css";

interface MetricsProps {
  data?: {
    totalFaculty?: number;
    totalStudents?: number;
    overallIndex?: number;
  };
}

export default function MetricsRow({ data }: MetricsProps) {
  const metrics = [
    {
      id: "staff",
      label: "TOTAL STAFF",
      value: data?.totalFaculty !== undefined ? String(data.totalFaculty) : "42",
      subtext: "100% Active status",
      subtextStyle: styles.subtextPositive,
      icon: GraduationCap,
      isHighlighted: false,
    },
    {
      id: "students",
      label: "TOTAL STUDENTS",
      value: data?.totalStudents !== undefined ? data.totalStudents.toLocaleString() : "1,102",
      subtext: "+12 from last month",
      subtextStyle: styles.subtextPositive,
      icon: Users,
      isHighlighted: false,
    },
    {
      id: "attendance",
      label: "AVG. ATTENDANCE",
      value: data?.overallIndex !== undefined ? `${Math.round(data.overallIndex * 10)}%` : "88%",
      subtext: "Academic performance index",
      subtextStyle: styles.subtextPositive,
      icon: CalendarCheck,
      isHighlighted: false,
    },
  ];

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
