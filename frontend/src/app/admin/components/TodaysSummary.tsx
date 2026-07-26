"use client";

import { CalendarCheck, FileText, Users, BarChart3, FileWarning } from "lucide-react";
import styles from "../dashboard.module.css";

const summaries = [
  { id: 1, label: "Sessions Conducted", value: "42", icon: CalendarCheck, isDanger: false },
  { id: 2, label: "Assessments Created", value: "18", icon: FileText, isDanger: false },
  { id: 3, label: "Students Participated", value: "1,102", icon: Users, isDanger: false },
  { id: 4, label: "Reports Generated", value: "12", icon: BarChart3, isDanger: false },
  { id: 5, label: "Pending Approvals", value: "3", icon: FileWarning, isDanger: true },
];

export default function TodaysSummary() {
  return (
    <div className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Today's Summary</h3>
      </div>
      <div className={styles.summaryList}>
        {summaries.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className={styles.summaryItem}>
              <div className={styles.summaryLabel}>
                <Icon size={20} className={styles.summaryIcon} />
                {item.label}
              </div>
              <div className={`${styles.summaryValue} ${item.isDanger ? styles.danger : ""}`}>
                {item.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
