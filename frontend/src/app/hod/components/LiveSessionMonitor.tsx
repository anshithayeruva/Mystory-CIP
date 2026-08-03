"use client";

import React from "react";
import { Eye } from "lucide-react";
import styles from "../dashboard.module.css";
import Link from "next/link";

interface LiveSessionItem {
  id: string | number;
  courseCode?: string;
  code?: string;
  courseName?: string;
  name?: string;
  facultyName?: string;
  room?: string;
  startTime?: string;
  time?: string;
  attendance?: number;
  status?: string;
}

interface LiveSessionMonitorProps {
  sessionsData?: LiveSessionItem[];
}

const fallbackLiveSessions: LiveSessionItem[] = [
  {
    id: 1,
    code: "CS-302",
    name: "Data Structures",
    facultyName: "Dr. Albert Thorne",
    room: "Lab Room 4A",
    time: "10:00 - 11:30",
    attendance: 92,
  },
  {
    id: 2,
    code: "CS-501",
    name: "AI & Robotics",
    facultyName: "Prof. Sarah Jenkins",
    room: "Lecture Hall 2",
    time: "10:30 - 12:00",
    attendance: 78,
  },
  {
    id: 3,
    code: "IT-204",
    name: "Database Systems",
    facultyName: "Dr. Rahul Mehta",
    room: "Seminar Hall",
    time: "11:00 - 12:30",
    attendance: 85,
  },
];

export default function LiveSessionMonitor({ sessionsData }: LiveSessionMonitorProps) {
  const liveSessions = (sessionsData && sessionsData.length > 0) ? sessionsData : fallbackLiveSessions;

  return (
    <div className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitleRow}>
          <div className={styles.liveDot} />
          <h2 className={styles.sectionTitle}>Live Session Monitoring</h2>
        </div>
        <span className={styles.liveBadge}>{liveSessions.length} SESSIONS ACTIVE</span>
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
            {liveSessions.map((session) => {
              const code = session.courseCode || session.code || "CS-101";
              const name = session.courseName || session.name || "Computer Science";
              const staff = session.facultyName || "Faculty Member";
              const roomAndTime = session.time || `${session.room || 'Room 101'} • ${session.startTime || '10:00 AM'}`;
              const attendance = session.attendance || 85;

              return (
                <tr key={session.id}>
                  <td>
                    <div className={styles.subjectTitle}>
                      {code}: {name}
                    </div>
                    <div className={styles.subjectRoom}>
                      {roomAndTime}
                    </div>
                  </td>
                  <td>
                    <div className={styles.subjectTitle} style={{ fontWeight: 500 }}>
                      {staff}
                    </div>
                  </td>
                  <td>
                    <div className={styles.attendanceCol}>
                      <div className={styles.progressTrack}>
                        <div 
                          className={styles.progressFill} 
                          style={{ width: `${attendance}%` }} 
                        />
                      </div>
                      <span className={styles.attendancePct}>{attendance}%</span>
                    </div>
                  </td>
                  <td style={{ textAlign: "right", paddingRight: "24px" }}>
                    <button 
                      className={styles.eyeBtn} 
                      aria-label={`View ${name}`}
                      title="View Session"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Link href="/hod/subjects" className={styles.cardFooterLink}>
        VIEW ALL SESSIONS
      </Link>
    </div>
  );
}
