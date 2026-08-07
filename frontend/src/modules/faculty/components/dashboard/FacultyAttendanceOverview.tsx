"use client";

import React from "react";
import styles from "../../styles/faculty-dashboard.module.css";

interface SubjectAttendance {
  id: string;
  subjectName: string;
  subjectCode: string;
  percentage: number;
}

const mockAttendanceData: SubjectAttendance[] = [
  { id: "1", subjectName: "Java Programming", subjectCode: "CS-201", percentage: 95 },
  { id: "2", subjectName: "DBMS", subjectCode: "IT-204", percentage: 88 },
  { id: "3", subjectName: "Operating Systems", subjectCode: "CS-308", percentage: 92 },
  { id: "4", subjectName: "Computer Networks", subjectCode: "CS-402", percentage: 84 },
];

interface FacultyAttendanceOverviewProps {
  data?: SubjectAttendance[];
}

export default function FacultyAttendanceOverview({ data }: FacultyAttendanceOverviewProps) {
  const displayData = data && data.length > 0 ? data : mockAttendanceData;

  return (
    <div className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Attendance Overview</h2>
      </div>

      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
        {displayData.map((item) => (
          <div key={item.id} style={{ display: "grid", gridTemplateColumns: "160px 1fr 50px", alignItems: "center", gap: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text-main)" }}>
                {item.subjectName}
              </span>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "monospace", fontWeight: 600 }}>
                {item.subjectCode}
              </span>
            </div>

            {/* Segmented / Smooth Progress Bar */}
            <div 
              style={{ 
                height: "10px", 
                backgroundColor: "#e2e8f0", 
                borderRadius: "6px", 
                overflow: "hidden", 
                position: "relative",
                width: "100%"
              }}
            >
              <div 
                style={{ 
                  height: "100%", 
                  width: `${item.percentage}%`, 
                  backgroundColor: "#00522E",
                  borderRadius: "6px",
                  transition: "width 0.4s ease"
                }} 
              />
            </div>

            <span style={{ fontSize: "0.875rem", fontWeight: 800, color: "var(--text-main)", textAlign: "right" }}>
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
