"use client";

import React, { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import styles from "../student.module.css";
import { STUDENT_INFO, STUDENT_COURSES } from "../mockData";

const ATTENDANCE_LOGS = [
  { id: "at-1", date: "2026-07-31", courseCode: "CSE 301", courseName: "Advanced Data Structures", status: "PRESENT", time: "09:00 AM - 10:30 AM" },
  { id: "at-2", date: "2026-07-31", courseCode: "CSE 302", courseName: "Database Management Systems", status: "PRESENT", time: "10:45 AM - 12:15 PM" },
  { id: "at-3", date: "2026-07-30", courseCode: "CSE 305", courseName: "Machine Learning", status: "LATE", time: "02:00 PM - 03:30 PM" },
  { id: "at-4", date: "2026-07-29", courseCode: "CSE 303", courseName: "Operating Systems", status: "PRESENT", time: "09:00 AM - 10:30 AM" },
  { id: "at-5", date: "2026-07-28", courseCode: "CSE 304", courseName: "Computer Networks Lab", status: "MEDICAL_LEAVE", time: "02:00 PM - 04:00 PM" },
  { id: "at-6", date: "2026-07-27", courseCode: "CSE 306", courseName: "Software Engineering", status: "ABSENT", time: "11:00 AM - 12:30 PM" },
];

export default function StudentAttendancePage() {
  const [filterStatus, setFilterStatus] = useState("ALL");

  const filteredLogs = ATTENDANCE_LOGS.filter(log => filterStatus === "ALL" || log.status === filterStatus);

  return (
    <div className={styles.pageContainer}>
      {/* Admin Clean Banner */}
      <div className={styles.welcomeBanner}>
        <div>
          <h1 className={styles.welcomeTitle}>Attendance Tracker & Verification</h1>
          <p className={styles.welcomeSubtitle}>
            Track overall attendance percentage, subject compliance, and daily biometric logs.
          </p>
        </div>
        <div className={styles.bannerMeta}>
          <div className={styles.metaPill}>
            Overall: {STUDENT_INFO.overallAttendance}%
          </div>
        </div>
      </div>

      {/* Overall Attendance Summary Card (Admin Style) */}
      <div className={styles.card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Overall Semester Attendance</div>
            <div style={{ fontSize: "2.2rem", fontWeight: 700, color: "#00522E" }}>{STUDENT_INFO.overallAttendance}%</div>
            <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
              Compliant with University minimum 75.0% threshold rule.
            </div>
          </div>

          <div style={{ minWidth: "260px" }}>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748b", marginBottom: "6px" }}>Threshold Compliance</div>
            <div style={{ height: "8px", backgroundColor: "#e2e8f0", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ width: `${STUDENT_INFO.overallAttendance}%`, height: "100%", backgroundColor: "#00522E" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "#64748b", marginTop: "4px" }}>
              <span>0%</span>
              <span style={{ fontWeight: 700 }}>Min 75%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subject-Wise Attendance Cards Grid */}
      <div>
        <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a", marginBottom: "14px" }}>Subject-wise Attendance Breakdown</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
          {STUDENT_COURSES.map((course) => (
            <div key={course.id} className={styles.card} style={{ padding: "16px", gap: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#00522E" }}>{course.code}</span>
                  <h4 style={{ fontSize: "0.88rem", fontWeight: 700, color: "#0f172a", margin: "2px 0 0 0" }}>{course.name}</h4>
                </div>
                <span style={{ fontSize: "1rem", fontWeight: 700, color: "#00522E" }}>
                  {course.attendance}%
                </span>
              </div>

              <div style={{ height: "5px", backgroundColor: "#e2e8f0", borderRadius: "3px", overflow: "hidden" }}>
                <div style={{ width: `${course.attendance}%`, height: "100%", backgroundColor: "#00522E" }} />
              </div>
              <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                Faculty: {course.faculty}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Attendance Logs Table */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>
            <CalendarIcon size={16} color="#00522E" /> Daily Attendance Logs
          </h2>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="ALL">All Statuses</option>
            <option value="PRESENT">Present</option>
            <option value="ABSENT">Absent</option>
            <option value="LATE">Late</option>
            <option value="MEDICAL_LEAVE">Medical Leave</option>
          </select>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Time Slot</th>
                <th>Attendance Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td style={{ fontWeight: 600, color: "#0f172a" }}>{log.date}</td>
                  <td style={{ fontWeight: 700, color: "#00522E" }}>{log.courseCode}</td>
                  <td>{log.courseName}</td>
                  <td>{log.time}</td>
                  <td>
                    <span className={log.status === "PRESENT" ? styles.badgeCompleted : styles.badgeUpcoming}>
                      {log.status.replace("_", " ")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
