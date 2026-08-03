"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Award,
  BookOpen,
  CalendarCheck,
  Clock,
  FolderDown,
  Radio,
  Eye,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import styles from "./student.module.css";
import {
  STUDENT_INFO,
  TODAY_CLASSES,
  STUDENT_ASSIGNMENTS,
  STUDENT_COURSES
} from "./mockData";

const formatDueDate = (dateStr: string) => {
  if (!dateStr) return { month: "", day: "" };
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    const monthIdx = parseInt(parts[1], 10) - 1;
    const dayNum = parseInt(parts[2], 10);
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return {
      month: months[monthIdx] || "",
      day: dayNum < 10 ? `0${dayNum}` : `${dayNum}`
    };
  }
  const spaceParts = dateStr.split(" ");
  return { month: spaceParts[0] || "", day: spaceParts[1] || "" };
};

export default function StudentDashboard() {
  const [showAllCourses, setShowAllCourses] = useState(false);
  const pendingAssignments = STUDENT_ASSIGNMENTS.filter(a => a.status === "PENDING");
  const visibleCourses = showAllCourses ? STUDENT_COURSES : STUDENT_COURSES.slice(0, 3);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

      {/* 1. University Banner */}
      <div style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "10px",
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.02)"
      }}>
        {/* Left: Logo + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{
            width: "48px",
            height: "48px",
            backgroundColor: "#00522E",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontWeight: 800,
            fontSize: "0.9rem"
          }}>
            SRM
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", margin: 0, lineHeight: 1.2 }}>
              SRM AP University • Student Academic Portal
            </h2>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.68rem", fontWeight: 700, color: "#00522E", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              <div style={{ width: "8px", height: "8px", backgroundColor: "#00522E", borderRadius: "50%" }} />
              STUDENT PROFILE: ACTIVE ({STUDENT_INFO.name} • {STUDENT_INFO.rollNo})
            </div>
          </div>
        </div>

        {/* Right: Academic Info */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "0.65rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", display: "block" }}>ACADEMIC YEAR</span>
            <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f172a", marginTop: "4px" }}>2025 – 26</div>
          </div>
          <div style={{ width: "1px", height: "24px", backgroundColor: "#e2e8f0", margin: "0 16px" }} />
          <div>
            <span style={{ fontSize: "0.65rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", display: "block" }}>SEMESTER</span>
            <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f172a", marginTop: "4px" }}>Semester 6 (Spring 2026)</div>
          </div>
        </div>
      </div>

      {/* 2. Top 3 Primary Metrics Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {/* Metric 1 */}
        <div style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "10px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.02)"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>CUMULATIVE CGPA</span>
            <Award size={20} color="#0f172a" style={{ opacity: 0.8 }} />
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 800, color: "#0f172a", lineHeight: 1, letterSpacing: "-0.02em" }}>
            {STUDENT_INFO.cgpa}
          </div>
          <div style={{ fontSize: "0.75rem", color: "#00522E", fontWeight: 600 }}>
            Top 5% Department Standing ({STUDENT_INFO.academicStanding})
          </div>
        </div>

        {/* Metric 2 */}
        <div style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "10px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.02)"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>AVG. ATTENDANCE</span>
            <CalendarCheck size={20} color="#0f172a" style={{ opacity: 0.8 }} />
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 800, color: "#0f172a", lineHeight: 1, letterSpacing: "-0.02em" }}>
            {STUDENT_INFO.overallAttendance}%
          </div>
          <div style={{ fontSize: "0.75rem", color: "#00522E", fontWeight: 600 }}>
            Compliant with Min 75.0% Rule
          </div>
        </div>

        {/* Metric 3 */}
        <div style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "10px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.02)"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>CREDITS EARNED</span>
            <BookOpen size={20} color="#0f172a" style={{ opacity: 0.8 }} />
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 800, color: "#0f172a", lineHeight: 1, letterSpacing: "-0.02em" }}>
            {STUDENT_INFO.creditsEarned} <span style={{ fontSize: "1.1rem", fontWeight: 600, color: "#64748b" }}>/ 136</span>
          </div>
          <div style={{ fontSize: "0.75rem", color: "#475569", fontWeight: 500 }}>
            24 Credits Currently in Progress
          </div>
        </div>
      </div>

      {/* 3. Main Two-Column Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "24px", alignItems: "start" }}>

        {/* LEFT COLUMN */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* Card 1: Today's Schedule & Live Session Monitor */}
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", display: "flex", flexDirection: "column", boxShadow: "0 1px 3px rgba(0,0,0,0.02)", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "8px", height: "8px", backgroundColor: "#00522E", borderRadius: "50%", boxShadow: "0 0 0 3px rgba(0, 82, 46, 0.2)" }} />
                <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a" }}>TODAY'S CLASS SCHEDULE & MONITOR</span>
              </div>
              <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "#00522E", backgroundColor: "#e9f2ee", padding: "4px 10px", borderRadius: "20px" }}>
                LIVE FEEDBACK ACTIVE
              </span>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>SUBJECT & ROOM</th>
                    <th>FACULTY INSTRUCTOR</th>
                    <th>SCHEDULE SLOT</th>
                    <th>STATUS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {TODAY_CLASSES.map((c) => (
                    <tr key={c.id}>
                      <td>
                        <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.875rem" }}>{c.courseCode}: {c.courseName}</div>
                        <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "2px" }}>{c.room} ({c.type})</div>
                      </td>
                      <td style={{ fontWeight: 500, color: "#334155" }}>{c.faculty}</td>
                      <td style={{ fontSize: "0.8rem", color: "#64748b" }}>{c.time}</td>
                      <td>
                        <span className={c.status === "LIVE" ? styles.badgeLive : c.status === "UPCOMING" ? styles.badgeUpcoming : styles.badgeCompleted}>
                          {c.status}
                        </span>
                      </td>
                      <td>
                        {c.status === "LIVE" ? (
                          <Link href="/student/pulse" className={styles.btnPrimary} style={{ padding: "4px 10px", fontSize: "0.75rem" }}>
                            <Radio size={12} /> Join Live
                          </Link>
                        ) : (
                          <button className={styles.btnSecondary} style={{ padding: "4px 8px", fontSize: "0.75rem" }} title="View Details">
                            <Eye size={12} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Link href="/student/timetable" style={{ padding: "14px 20px", textAlign: "center", backgroundColor: "#f8fafc", borderTop: "1px solid #e2e8f0", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "#00522E", textDecoration: "none" }}>
              VIEW FULL WEEKLY TIMETABLE →
            </Link>
          </div>

          {/* Card 2: Registered Courses */}
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", display: "flex", flexDirection: "column", boxShadow: "0 1px 3px rgba(0,0,0,0.02)", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a" }}>REGISTERED COURSES</span>
              <Link href="/student/courses" style={{ fontSize: "0.75rem", fontWeight: 700, color: "#00522E", textTransform: "uppercase", textDecoration: "none" }}>
                VIEW ALL COURSES →
              </Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {visibleCourses.map((course) => (
                <div key={course.id} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px 20px", borderBottom: "1px solid #e2e8f0" }}>
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "56px",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    backgroundColor: "#e9f2ee",
                    color: "#00522E",
                    flexShrink: 0
                  }}>
                    {course.code}
                  </div>

                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0f172a" }}>{course.name}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.75rem", color: "#64748b", fontWeight: 500 }}>
                      <span>Faculty: {course.faculty}</span>
                      <span>•</span>
                      <span>{course.credits} Credits</span>
                      <span>•</span>
                      <span>Attendance: <strong>{course.attendance}%</strong></span>
                    </div>
                  </div>

                  <div style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.05em", color: "#00522E", backgroundColor: "#e9f2ee", padding: "3px 8px", borderRadius: "20px", flexShrink: 0 }}>
                    ACTIVE
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowAllCourses(!showAllCourses)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                width: "100%",
                padding: "12px 20px",
                border: "none",
                borderTop: "1px solid #e2e8f0",
                backgroundColor: "#f8fafc",
                color: "#00522E",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                cursor: "pointer"
              }}
            >
              {showAllCourses ? (
                <>SHOW LESS <ChevronUp size={14} /></>
              ) : (
                <>SHOW ALL {STUDENT_COURSES.length} COURSES <ChevronDown size={14} /></>
              )}
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN (340px width) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* Card 1: Upcoming Events & Deadlines */}
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", display: "flex", flexDirection: "column", boxShadow: "0 1px 3px rgba(0,0,0,0.02)", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a" }}>UPCOMING DEADLINES</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", padding: "12px 16px", gap: "12px" }}>
              {STUDENT_ASSIGNMENTS.slice(0, 3).map((asg, idx) => {
                const { month, day } = formatDueDate(asg.dueDate);
                return (
                  <div key={asg.id} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "8px 4px" }}>
                    <div style={{
                      width: "48px",
                      height: "48px",
                      backgroundColor: idx === 0 ? "#0f172a" : "#ffffff",
                      color: idx === 0 ? "#ffffff" : "#0f172a",
                      border: idx === 0 ? "none" : "1px solid #e2e8f0",
                      borderRadius: "8px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}>
                      <span style={{ fontSize: "1.05rem", fontWeight: 800, lineHeight: 1 }}>{day}</span>
                      <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", opacity: 0.8, marginTop: "2px" }}>
                        {month}
                      </span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "2px", overflow: "hidden" }}>
                      <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {asg.title}
                      </span>
                      <span style={{ fontSize: "0.72rem", color: "#64748b" }}>
                        {asg.courseCode} • {asg.daysRemaining === 0 ? "Due Today" : `${asg.daysRemaining} days left`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card 2: Learning Insights (Replaces Quick Actions & Academic Index Bar) */}
          <div style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            overflow: "hidden"
          }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a" }}>LEARNING INSIGHTS</span>
              <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "#00522E", backgroundColor: "#e9f2ee", padding: "4px 10px", borderRadius: "20px" }}>
                AI INSIGHTS
              </span>
            </div>

            <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: "18px" }}>

              {/* 1. Strongest Subject */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.725rem", fontWeight: 700, color: "#00522E", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#00522E" }} />
                  Strongest Subject
                </div>
                <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0f172a" }}>
                  Advanced Data Structures <span style={{ color: "#00522E", fontWeight: 800 }}>(91%)</span>
                </div>
              </div>

              {/* 2. Needs Attention */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.725rem", fontWeight: 700, color: "#991b1b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#991b1b" }} />
                  Needs Attention
                </div>
                <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0f172a" }}>
                  Computer Networks
                </div>
                <div style={{ fontSize: "0.775rem", color: "#64748b", lineHeight: 1.4 }}>
                  Understanding dropped by 12% this week.
                </div>
              </div>

              {/* 3. Current Streak */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.725rem", fontWeight: 700, color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#0f172a" }} />
                  Current Streak
                </div>
                <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0f172a" }}>
                  5 classes attended consecutively
                </div>
              </div>

              {/* 4. AI Recommendation */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", backgroundColor: "#f8fafc", padding: "14px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.725rem", fontWeight: 700, color: "#00522E", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  <Sparkles size={14} color="#00522E" />
                  AI Recommendation
                </div>
                <div style={{ fontSize: "0.825rem", fontWeight: 600, color: "#0f172a", lineHeight: 1.4 }}>
                  Review Binary Trees before tomorrow's quiz.
                </div>
                <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 500 }}>
                  Estimated study time: 25 mins.
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
