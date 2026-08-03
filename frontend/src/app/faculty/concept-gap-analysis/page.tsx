"use client";

import React, { useState, useEffect } from "react";
import styles from "./concept-gap.module.css";
import { FacultyService } from "@/services/faculty.service";

// --- Mock Data Fallbacks ---

// Section 1: Students Requiring Attention
const initialStudentsAtRisk = [
  { id: 1, name: "Rahul Sharma", subject: "Data Structures", understanding: 42, weakConcept: "Recursion", priority: "High", action: "Review concepts before next class" },
  { id: 2, name: "Priya Singh", subject: "DBMS", understanding: 58, weakConcept: "SQL Joins", priority: "Medium", action: "Assign additional practice" },
  { id: 3, name: "Akash Reddy", subject: "Data Structures", understanding: 35, weakConcept: "Trees", priority: "High", action: "Schedule one-to-one discussion" },
  { id: 4, name: "Neha Gupta", subject: "Machine Learning", understanding: 61, weakConcept: "Gradient Descent", priority: "Low", action: "Share supplementary reading" },
];

// Section 2: Concept Mastery
const initialConceptMastery = [
  { concept: "Recursion", score: 78 },
  { concept: "Trees", score: 92 },
  { concept: "Binary Search", score: 64 },
  { concept: "Linked Lists", score: 88 },
  { concept: "Dynamic Programming", score: 42 },
];

// Section 3: Class Performance Distribution
const initialClassPerformance = [
  { level: "Excellent", range: "85-100%", count: 18, color: "#10633b" },
  { level: "Good", range: "70-84%", count: 24, color: "rgba(0, 59, 130, 0.85)" },
  { level: "Needs Review", range: "50-69%", count: 12, color: "rgba(0, 59, 130, 0.5)" },
  { level: "Critical", range: "<50%", count: 6, color: "rgba(0, 59, 130, 0.25)" },
];

export default function LearningInsightsPage() {
  const [studentsAtRisk, setStudentsAtRisk] = useState(initialStudentsAtRisk);
  const [conceptMastery, setConceptMastery] = useState(initialConceptMastery);
  const [classPerformance, setClassPerformance] = useState(initialClassPerformance);

  useEffect(() => {
    async function loadConceptGaps() {
      try {
        const response = await FacultyService.getAllConceptGaps();
        if (response && response.success && response.data) {
          if (response.data.studentsAtRisk) setStudentsAtRisk(response.data.studentsAtRisk);
          if (response.data.conceptMastery) setConceptMastery(response.data.conceptMastery);
          if (response.data.classPerformance) setClassPerformance(response.data.classPerformance);
        }
      } catch (err) {
        console.warn("Backend concept gap API offline, using interactive state:", err);
      }
    }
    loadConceptGaps();
  }, []);

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>Reports</h1>
          <p className={styles.subtitle}>
            AI-generated insights to help improve classroom learning based on completed AI assessments.
          </p>
        </div>
      </div>

      {/* Section 1 - Students Requiring Attention */}
      <div className={styles.card} style={{ marginBottom: "24px" }}>
        <div className={styles.cardHeader} style={{ padding: "20px 24px", borderBottom: "1px solid #e2e8f0", backgroundColor: "#fff", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}>
          <h2 style={{ fontSize: "1.25rem", color: "var(--text-main)", margin: 0 }}>
            Students Requiring Attention
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginTop: "4px" }}>
            AI has identified students who may benefit from additional academic support based on recent classroom assessments.
          </p>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                <th style={{ padding: "12px 24px", textAlign: "left", fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 600 }}>Student</th>
                <th style={{ padding: "12px 24px", textAlign: "left", fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 600 }}>Subject</th>
                <th style={{ padding: "12px 24px", textAlign: "left", fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 600 }}>Understanding</th>
                <th style={{ padding: "12px 24px", textAlign: "left", fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 600 }}>Weak Concept</th>
                <th style={{ padding: "12px 24px", textAlign: "left", fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 600 }}>Suggested Action</th>
              </tr>
            </thead>
            <tbody>
              {studentsAtRisk.map((student) => (
                <tr key={student.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "16px 24px", fontWeight: 600, color: "var(--text-main)", fontSize: "0.875rem" }}>{student.name}</td>
                  <td style={{ padding: "16px 24px", color: "var(--text-muted)", fontSize: "0.875rem" }}>{student.subject}</td>
                  <td style={{ padding: "16px 24px", fontSize: "0.875rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontWeight: 600, color: student.understanding < 50 ? "#475569" : "var(--text-main)" }}>{student.understanding}%</span>
                      <div style={{ width: "60px", height: "6px", backgroundColor: "#e2e8f0", borderRadius: "3px", overflow: "hidden" }}>
                        <div style={{ width: `${student.understanding}%`, height: "100%", backgroundColor: student.understanding < 50 ? "#64748b" : "#10633b" }} />
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "16px 24px", color: "var(--text-main)", fontSize: "0.875rem", fontWeight: 500 }}>{student.weakConcept}</td>
                  <td style={{ padding: "16px 24px", color: "var(--text-muted)", fontSize: "0.875rem" }}>{student.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 2 - Two-Column Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "24px", marginBottom: "24px" }}>
        
        {/* Left Card - Concept Mastery */}
        <div className={styles.card}>
          <div className={styles.cardHeader} style={{ padding: "20px 24px", borderBottom: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: "1.125rem", color: "var(--text-main)", margin: 0 }}>Concept Mastery</h3>
          </div>
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {conceptMastery.map((item, index) => (
              <div key={index}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--text-main)" }}>{item.concept}</span>
                  <span style={{ fontSize: "0.875rem", fontWeight: 600, color: item.score < 50 ? "#475569" : "var(--text-main)" }}>{item.score}%</span>
                </div>
                <div style={{ width: "100%", height: "8px", backgroundColor: "#f1f5f9", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ 
                    width: `${item.score}%`, 
                    height: "100%", 
                    backgroundColor: item.score < 50 ? "#94a3b8" : item.score < 75 ? "#64748b" : "#10633b",
                    borderRadius: "4px"
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Card - Class Performance */}
        <div className={styles.card}>
          <div className={styles.cardHeader} style={{ padding: "20px 24px", borderBottom: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: "1.125rem", color: "var(--text-main)", margin: 0 }}>Class Performance Distribution</h3>
          </div>
          <div style={{ padding: "24px" }}>
            
            {/* Unified Stacked Bar */}
            <div style={{ display: 'flex', height: '24px', borderRadius: '12px', overflow: 'hidden', marginBottom: '24px' }}>
              {classPerformance.map((item, index) => (
                <div key={index} style={{ width: `${(item.count / 60) * 100}%`, backgroundColor: item.color }} title={`${item.level}: ${item.count} students`} />
              ))}
            </div>

            {/* KPI Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {classPerformance.map((item, index) => (
                <div key={index} style={{ padding: '16px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.color }} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      {item.level}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>{item.count}</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)' }}>
                      ({Math.round((item.count / 60) * 100)}%)
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Score: {item.range}</div>
                </div>
              ))}
            </div>
            
            <div style={{ marginTop: "24px", padding: "12px", backgroundColor: "#f1f5f9", borderRadius: "6px", textAlign: "center" }}>
              <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--text-muted)" }}>Based on <strong>60</strong> total students assessed.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
