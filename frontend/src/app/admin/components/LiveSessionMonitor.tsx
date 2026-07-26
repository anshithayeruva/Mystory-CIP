"use client";

import { Eye } from "lucide-react";
import styles from "../dashboard.module.css";
import Link from "next/link";

const sessions = [
  { id: 1, subject: "Data Structures", instructor: "Dr. Aris Thorne", status: "LIVE", schedule: "09:00 - 11:00" },
  { id: 2, subject: "Advanced Macroeconomics", instructor: "Prof. Sarah Jenkins", status: "SCHEDULED", schedule: "11:30 - 13:00" },
  { id: 3, subject: "Microbiology Fundamentals", instructor: "Dr. Lisa Muller", status: "COMPLETED", schedule: "07:00 - 09:00" },
  { id: 4, subject: "Introduction to Ethics", instructor: "Rev. John Davis", status: "LIVE", schedule: "09:30 - 11:30" },
  { id: 5, subject: "Digital Marketing Trends", instructor: "Prof. Kevin Ellis", status: "SCHEDULED", schedule: "14:00 - 15:30" },
];

export default function LiveSessionMonitor() {
  return (
    <div className={styles.monitorCard}>
      <div className={styles.monitorHeader}>
        <div className={styles.monitorTitleContainer}>
          <h3 className={styles.sectionTitle}>Live Session Monitor</h3>
          <span className={styles.monitorSubtitle}>Real-time status of academic sessions across departments</span>
        </div>
        <Link href="#" className={styles.viewAllLink} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          View All Sessions →
        </Link>
      </div>
      
      <div style={{ overflowX: "auto" }}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>SUBJECT NAME</th>
              <th>INSTRUCTOR</th>
              <th>STATUS</th>
              <th>SCHEDULE</th>
              <th style={{ textAlign: "right", paddingRight: "32px" }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session.id}>
                <td className={styles.subjectName}>{session.subject}</td>
                <td className={styles.instructorName}>{session.instructor}</td>
                <td>
                  {session.status === "LIVE" && (
                    <span className={styles.statusLive}>{session.status}</span>
                  )}
                  {session.status === "SCHEDULED" && (
                    <span className={styles.statusScheduled}>{session.status}</span>
                  )}
                  {session.status === "COMPLETED" && (
                    <span className={styles.statusCompleted}>{session.status}</span>
                  )}
                </td>
                <td className={styles.scheduleText}>{session.schedule}</td>
                <td style={{ textAlign: "right", paddingRight: "32px" }}>
                  <button className={styles.actionButton} aria-label={`View ${session.subject}`}>
                    <Eye size={20} />
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
