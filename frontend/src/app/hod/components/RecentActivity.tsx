"use client";

import React from "react";
import { FileText, CheckCircle2, UserPlus, SlidersHorizontal } from "lucide-react";
import styles from "../dashboard.module.css";

const activities = [
  {
    id: 1,
    icon: FileText,
    content: (
      <>
        <strong>Prof. Rajesh</strong> uploaded a new assessment for <strong>Computer Networks</strong>.
      </>
    ),
    meta: "ACADEMIC OPERATIONS • 24 MINS AGO",
  },
  {
    id: 2,
    icon: CheckCircle2,
    content: (
      <>
        Monthly attendance report for <strong>Semester 5</strong> has been generated.
      </>
    ),
    meta: "SYSTEM • 2 HOURS AGO",
  },
  {
    id: 3,
    icon: UserPlus,
    content: (
      <>
        <strong>12 New Students</strong> enrolled in the Elective: Cloud Computing.
      </>
    ),
    meta: "REGISTRAR • 5 HOURS AGO",
  },
];

export default function RecentActivity() {
  return (
    <div className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Recent Activity</h2>
        <button className={styles.iconActionBtn} aria-label="Filter activity" title="Filter activity">
          <SlidersHorizontal size={18} />
        </button>
      </div>

      <div className={styles.activityList}>
        {activities.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className={styles.activityItem}>
              <div className={styles.activityIconBox}>
                <Icon size={18} />
              </div>
              <div className={styles.activityContent}>
                <div className={styles.activityText}>{item.content}</div>
                <div className={styles.activityMeta}>{item.meta}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
