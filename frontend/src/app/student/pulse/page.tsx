"use client";

import React, { useState } from "react";
import { Radio, CheckCircle2, Download, Play, HelpCircle, ThumbsUp, Flame } from "lucide-react";
import styles from "../student.module.css";
import { LIVE_PULSE_SESSIONS } from "../mockData";

export default function ClassroomPulsePage() {
  const [feedbackSent, setFeedbackSent] = useState<string | null>(null);

  const liveSession = LIVE_PULSE_SESSIONS.find(s => s.status === "LIVE") || LIVE_PULSE_SESSIONS[0];
  const previousSessions = LIVE_PULSE_SESSIONS.filter(s => s.status === "COMPLETED");

  const handleFeedback = (type: string) => {
    setFeedbackSent(type);
    setTimeout(() => setFeedbackSent(null), 3000);
  };

  return (
    <div className={styles.pageContainer}>
      {/* Admin Clean Banner */}
      <div className={styles.welcomeBanner}>
        <div>
          <h1 className={styles.welcomeTitle}>Live Classroom & Realtime Feedback</h1>
          <p className={styles.welcomeSubtitle}>
            Real-time interactive classroom monitoring, attendance verification, and lecture summaries.
          </p>
        </div>
        <div className={styles.bannerMeta}>
          <div className={styles.metaPill}>
            Live Engine
          </div>
        </div>
      </div>

      {/* Live Classroom Active Card (Admin Restrained Clean Styling) */}
      <div className={styles.card} style={{ border: "1px solid #c9e0d3", backgroundColor: "#fcfdfe" }}>
        <div className={styles.cardHeader}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#00522E" }} />
            <h2 className={styles.cardTitle} style={{ color: "#00522E" }}>Current Live Classroom Session</h2>
          </div>
          <span className={styles.badgeLive}>LIVE FEEDBACK ACTIVE</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", margin: "0 0 4px 0" }}>
              {liveSession.courseCode}: {liveSession.courseName}
            </h3>
            <p style={{ fontSize: "0.85rem", color: "#475569", margin: "0 0 14px 0" }}>
              Topic: <strong>{liveSession.topic}</strong>
            </p>

            <div style={{ display: "flex", gap: "16px", fontSize: "0.8rem", color: "#64748b", marginBottom: "16px" }}>
              <div>Faculty: <strong>{liveSession.faculty}</strong></div>
              <div>Duration: <strong>{liveSession.duration}</strong></div>
              <div>Present: <strong>{liveSession.studentsPresent} / {liveSession.totalStudents}</strong></div>
            </div>

            {/* Realtime Feedback Buttons */}
            <div style={{ backgroundColor: "#ffffff", padding: "14px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
                Send Realtime Instant Feedback to Faculty:
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button onClick={() => handleFeedback("Understood")} className={styles.btnSecondary} style={{ fontSize: "0.78rem" }}>
                  <ThumbsUp size={14} /> Concept Clear
                </button>
                <button onClick={() => handleFeedback("Confused")} className={styles.btnSecondary} style={{ fontSize: "0.78rem" }}>
                  <HelpCircle size={14} /> Need Clarification
                </button>
                <button onClick={() => handleFeedback("Slow Down")} className={styles.btnSecondary} style={{ fontSize: "0.78rem" }}>
                  <Flame size={14} /> Please Slow Down
                </button>
              </div>

              {feedbackSent && (
                <div style={{ marginTop: "8px", fontSize: "0.78rem", color: "#00522E", fontWeight: 700 }}>
                  ✓ Feedback "{feedbackSent}" broadcasted to instructor dashboard.
                </div>
              )}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0", textAlign: "center" }}>
            <CheckCircle2 size={32} color="#00522E" style={{ marginBottom: "8px" }} />
            <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#0f172a" }}>Attendance Verified</div>
            <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "4px" }}>
              Location geofence checked. Status logged as PRESENT.
            </div>
          </div>
        </div>
      </div>

      {/* Previous Sessions & Summaries */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Previous Live Sessions & Summaries</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {previousSessions.map((session) => (
            <div key={session.id} style={{ padding: "16px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#00522E", textTransform: "uppercase" }}>{session.courseCode} • {session.startTime}</span>
                  <h3 style={{ fontSize: "0.98rem", fontWeight: 700, color: "#0f172a", margin: "2px 0 0 0" }}>{session.topic}</h3>
                  <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "2px" }}>Faculty: {session.faculty} • {session.studentsPresent} Students Attended</div>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button className={styles.btnSecondary} style={{ fontSize: "0.75rem", padding: "4px 10px" }}>
                    <Play size={14} /> Watch Recording
                  </button>
                  <button className={styles.btnSecondary} style={{ fontSize: "0.75rem", padding: "4px 10px" }}>
                    <Download size={14} /> PDF Summary
                  </button>
                </div>
              </div>

              {/* AI Summary Box */}
              <div style={{ padding: "12px", backgroundColor: "#ffffff", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#00522E", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "4px" }}>
                  Lecture Summary
                </div>
                <p style={{ fontSize: "0.82rem", color: "#334155", margin: "0 0 8px 0", lineHeight: 1.5 }}>
                  {session.aiSummary}
                </p>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748b" }}>Key Concepts:</span>
                  {session.keyConcepts?.map((kc, i) => (
                    <span key={i} style={{ fontSize: "0.7rem", backgroundColor: "#f1f5f9", color: "#334155", padding: "2px 8px", borderRadius: "4px", fontWeight: 600 }}>
                      {kc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
