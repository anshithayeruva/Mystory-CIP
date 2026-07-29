"use client";

import React from "react";
import { Eye } from "lucide-react";
import styles from "../dashboard.module.css";
import Link from "next/link";

const liveSessions = [
  {
    id: 1,
    code: "CS-302",
    name: "Data Structures",
    room: "Lab Room 4A",
    time: "10:00 - 11:30",
    attendance: 92,
  },
  {
    id: 2,
    code: "CS-501",
    name: "AI & Robotics",
    room: "Lecture Hall 2",
    time: "10:30 - 12:00",
    attendance: 78,
  },
  {
    id: 3,
    code: "IT-204",
    name: "Database Systems",
    room: "Seminar Hall",
    time: "11:00 - 12:30",
    attendance: 85,
  },
];

export default function LiveSessionMonitor() {
  return (
    <div className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitleRow}>
          <div className={styles.liveDot} />
          <h2 className={styles.sectionTitle}>Live Session Monitoring</h2>
        </div>
        <span className={styles.liveBadge}>6 SESSIONS ACTIVE</span>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Class / Subject</th>
              <th>Staff</th>
              <th>Attendance</th>
              <th style={{ textAlign: "right", paddingRight: "24px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {liveSessions.map((session) => (
              <tr key={session.id}>
                <td>
                  <div className={styles.subjectTitle}>
                    {session.code}: {session.name}
                  </div>
                  <div className={styles.subjectRoom}>
                    {session.room} • {session.time}
                  </div>
                </td>
                <td>
                  <div className={styles.attendanceCol}>
                    <div className={styles.progressTrack}>
                      <div 
                        className={styles.progressFill} 
                        style={{ width: `${session.attendance}%` }} 
                      />
                    </div>
                    <span className={styles.attendancePct}>{session.attendance}%</span>
                  </div>
                </td>
                <td style={{ textAlign: "right", paddingRight: "24px" }}>
                  <button 
                    className={styles.eyeBtn} 
                    aria-label={`View ${session.name}`}
                    title="View Session"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link href="/hod/sessions" className={styles.cardFooterLink}>
        VIEW ALL SESSIONS
      </Link>
    </div>
  );
}
