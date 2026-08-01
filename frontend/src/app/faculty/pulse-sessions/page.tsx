"use client";

import React from "react";
import Link from "next/link";
import { Plus, Calendar, Users, BarChart, Brain, ChevronRight } from "lucide-react";
import styles from "./pulse-sessions.module.css";

interface AssessmentItem {
  id: string;
  name: string;
  subject: string;
  section: string;
  date: string;
  attempted: number;
  totalStudents: number;
  avgScore: string;
  understanding: string;
  status: "Live" | "Completed" | "Evaluating";
}

const MOCK_ASSESSMENTS: AssessmentItem[] = [
  {
    id: "1",
    name: "Arrays Quiz",
    subject: "Data Structures",
    section: "CSE-A",
    date: "2023-11-20",
    attempted: 58,
    totalStudents: 60,
    avgScore: "82%",
    understanding: "Good",
    status: "Completed",
  },
  {
    id: "2",
    name: "SQL Basics",
    subject: "DBMS",
    section: "CSE-B",
    date: "2023-11-18",
    attempted: 45,
    totalStudents: 48,
    avgScore: "91%",
    understanding: "Excellent",
    status: "Evaluating",
  },
  {
    id: "3",
    name: "Thermodynamics Midterm Review",
    subject: "Physics",
    section: "MECH-A",
    date: "2023-11-25",
    attempted: 0,
    totalStudents: 55,
    avgScore: "-",
    understanding: "-",
    status: "Live",
  }
];

export default function FacultyPulseSessionsPage() {
  const getBadgeStyle = (status: string) => {
    switch (status) {
      case "Live":
        return styles.badgeLive;
      case "Completed":
        return styles.badgeCompleted;
      case "Evaluating":
      default:
        return styles.badgeUpcoming;
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>AI Assessments</h1>
          <p className={styles.subtitle}>
            Generate, publish, and monitor AI-powered classroom assessments.
          </p>
        </div>
        <Link href="/faculty/pulse-sessions/create" className={styles.primaryButton}>
          <Plus size={16} />
          Generate Assessment
        </Link>
      </div>

      <div className={styles.mainCard}>
        <div className={styles.tableHeaderRow}>
          <h2 className={styles.tableTitle}>Recent Assessment Results</h2>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "20px", backgroundColor: "#FFFFFF", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px" }}>
          {MOCK_ASSESSMENTS.map((assessment) => (
            <div 
              key={assessment.id}
              style={{
                border: "1px solid var(--surface-border, #e2e8f0)",
                borderRadius: "8px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                backgroundColor: "#fff",
                boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
                    <h3 style={{ margin: 0, fontSize: "1.125rem", color: "var(--text-main)", fontWeight: 600 }}>
                      {assessment.name}
                    </h3>
                    <span className={`${styles.badge} ${getBadgeStyle(assessment.status)}`}>
                      {assessment.status}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--text-muted)" }}>
                    {assessment.subject} • Section {assessment.section}
                  </p>
                </div>
                
                <Link 
                  href={`/faculty/pulse-sessions/${assessment.id}/summary`}
                  style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    padding: "8px 16px", borderRadius: "6px",
                    backgroundColor: "#f8fafc", border: "1px solid #e2e8f0",
                    color: "#10633B", fontSize: "0.875rem", fontWeight: 600,
                    textDecoration: "none", transition: "background-color 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f1f5f9"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#f8fafc"}
                >
                  View Report <ChevronRight size={16} />
                </Link>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", paddingTop: "16px", borderTop: "1px solid #f1f5f9" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ padding: "8px", backgroundColor: "#f8fafc", borderRadius: "6px", color: "#64748b" }}>
                    <Calendar size={16} />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>Date Conducted</p>
                    <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--text-main)", fontWeight: 500 }}>{assessment.date}</p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ padding: "8px", backgroundColor: "#f8fafc", borderRadius: "6px", color: "#64748b" }}>
                    <Users size={16} />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>Students Attempted</p>
                    <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--text-main)", fontWeight: 500 }}>
                      {assessment.attempted}/{assessment.totalStudents} Students
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ padding: "8px", backgroundColor: "#f0fdf4", borderRadius: "6px", color: "#16a34a" }}>
                    <BarChart size={16} />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>Avg Score</p>
                    <p style={{ margin: 0, fontSize: "0.875rem", color: "#16a34a", fontWeight: 700 }}>{assessment.avgScore}</p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ padding: "8px", backgroundColor: "#eff6ff", borderRadius: "6px", color: "#2563eb" }}>
                    <Brain size={16} />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>Understanding</p>
                    <p style={{ margin: 0, fontSize: "0.875rem", color: "#2563eb", fontWeight: 600 }}>{assessment.understanding}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
