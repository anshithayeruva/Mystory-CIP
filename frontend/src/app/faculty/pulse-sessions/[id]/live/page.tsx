"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Users,
  CheckCircle2,
  Pause,
  Square,
  QrCode,
  Clock,
  Copy,
  Share2,
  AlertTriangle,
  Timer
} from "lucide-react";
import styles from "./live.module.css";

export default function LivePulseSession() {
  const router = useRouter();
  const params = useParams();
  const sessionId = params.id as string;

  const [isPaused, setIsPaused] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes
  const [showEndConfirm, setShowEndConfirm] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isPaused && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused, timeRemaining]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleEndSession = () => {
    setShowEndConfirm(true);
  };

  const confirmEndSession = () => {
    setShowEndConfirm(false);
    router.push(`/faculty/pulse-sessions/${sessionId}/summary`);
  };

  const handleExtendTime = () => {
    setTimeRemaining(prev => prev + 300); // Add 5 minutes
    alert("Added 5 minutes to the assessment time.");
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText("DSA-4921");
    alert("Session code copied to clipboard!");
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText("https://cip.university.edu/join/DSA-4921");
    alert("Join link copied to clipboard!");
  };

  const students = [
    { id: 1, name: "Alice Johnson", roll: "CS-2024-001", joinedAt: "10:00 AM", status: "Submitted" },
    { id: 2, name: "Bob Smith", roll: "CS-2024-002", joinedAt: "10:01 AM", status: "Joined" },
    { id: 3, name: "Charlie Davis", roll: "CS-2024-003", joinedAt: "-", status: "Pending" },
    { id: 4, name: "Diana Prince", roll: "CS-2024-004", joinedAt: "-", status: "Absent" },
    { id: 5, name: "Evan Wright", roll: "CS-2024-005", joinedAt: "10:05 AM", status: "Submitted" },
  ];

  return (
    <div className={styles.pageContainer} style={{ position: "relative" }}>
      {/* End Session Confirmation Modal */}
      {showEndConfirm && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ backgroundColor: "#fff", borderRadius: "8px", padding: "24px", maxWidth: "400px", width: "100%", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", color: "var(--text-main)" }}>
              <AlertTriangle size={24} />
              <h3 style={{ margin: 0, fontSize: "1.25rem", color: "var(--text-main)" }}>End Assessment?</h3>
            </div>
            <p style={{ color: "var(--text-muted)", marginBottom: "24px", lineHeight: "1.5" }}>
              Are you sure you want to end this assessment early? Students will not be able to submit any further answers.
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <button
                onClick={() => setShowEndConfirm(false)}
                style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "#fff", color: "var(--text-main)", fontWeight: 600, cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                onClick={confirmEndSession}
                style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #0f172a", backgroundColor: "#0f172a", color: "#fff", fontWeight: 600, cursor: "pointer" }}
              >
                Yes, End Assessment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className={styles.headerRow}>
        <div className={styles.headerLeft}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>Arrays Quiz</h1>
            <span className={styles.badgeLive} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span className={styles.pulseDot} style={{ width: "8px", height: "8px", backgroundColor: "#10633b", borderRadius: "50%", display: "inline-block" }} />
              Live
            </span>
          </div>
          <p className={styles.subtitle}>Subject: Data Structures • Section: CSE-A</p>
        </div>
        <div className={styles.headerRight} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <p className={styles.timeLabel} style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 600, color: "var(--text-muted)" }}>Time Remaining</p>
            <p className={styles.timeValue} style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-main)" }}>{formatTime(timeRemaining)}</p>
          </div>
        </div>
      </div>

      <div className={styles.mainGrid}>
        {/* Left Column */}
        <div className={styles.leftColumn}>

          <div className={styles.card}>
            <div className={styles.cardHeader} style={{ fontSize: "1.125rem", fontWeight: 600, padding: "16px 20px", borderBottom: "1px solid #e2e8f0", backgroundColor: "#fff", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}>
              Live Progress
            </div>
            <div className={styles.kpiGrid} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", padding: "20px" }}>
              <div className={styles.kpiBox} style={{ padding: "16px", backgroundColor: "#f8fafc", borderRadius: "8px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span className={styles.kpiLabel} style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 600, color: "var(--text-muted)", marginBottom: "8px" }}>Total Students</span>
                <span className={styles.kpiValue} style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-main)" }}>60</span>
              </div>
              <div className={styles.kpiBox} style={{ padding: "16px", backgroundColor: "#f8fafc", borderRadius: "8px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span className={styles.kpiLabel} style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 600, color: "var(--text-muted)", marginBottom: "8px" }}>Students Joined</span>
                <span className={styles.kpiValue} style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-main)" }}>58</span>
              </div>
              <div className={styles.kpiBox} style={{ padding: "16px", backgroundColor: "#f8fafc", borderRadius: "8px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span className={styles.kpiLabel} style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 600, color: "var(--text-muted)", marginBottom: "8px" }}>Submitted</span>
                <span className={styles.kpiValue} style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-main)" }}>24</span>
              </div>
            </div>
          </div>

          <div className={styles.card} style={{ marginTop: "24px" }}>
            <div className={styles.cardHeader} style={{ fontSize: "1.125rem", fontWeight: 600, padding: "16px 20px", borderBottom: "1px solid #e2e8f0", backgroundColor: "#fff", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}>
              Student Participation
            </div>
            <div className={styles.tableContainer} style={{ overflow: "hidden" }}>
              <table className={styles.table} style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                    <th style={{ padding: "12px 20px", textAlign: "left", fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 600 }}>Student Name</th>
                    <th style={{ padding: "12px 20px", textAlign: "left", fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 600 }}>Roll Number</th>
                    <th style={{ padding: "12px 20px", textAlign: "left", fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 600 }}>Joined Time</th>
                    <th style={{ padding: "12px 20px", textAlign: "left", fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 600 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                      <td style={{ padding: "16px 20px", fontWeight: 600, color: "var(--text-main)", fontSize: "0.875rem" }}>{student.name}</td>
                      <td style={{ padding: "16px 20px", color: "var(--text-muted)", fontSize: "0.875rem" }}>{student.roll}</td>
                      <td style={{ padding: "16px 20px", color: "var(--text-muted)", fontSize: "0.875rem" }}>{student.joinedAt}</td>
                      <td style={{ padding: "16px 20px" }}>
                        <span style={{
                          padding: "4px 8px",
                          borderRadius: "999px",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          backgroundColor: "#f1f5f9",
                          color: "#475569",
                          border: "1px solid #e2e8f0"
                        }}>
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>

          <div className={styles.card}>
            <div className={styles.cardHeader} style={{ fontSize: "1.125rem", fontWeight: 600, padding: "16px 20px", borderBottom: "1px solid #e2e8f0", backgroundColor: "#fff", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}>
              Join Details
            </div>
            <div style={{ padding: "24px", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '180px', height: '180px', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <QrCode size={120} color="#334155" />
                </div>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", fontWeight: 500 }}>Scan to Join</p>
              </div>

              <div style={{ width: "100%", padding: "16px", backgroundColor: "#f8fafc", borderRadius: "8px", border: "1px dashed #cbd5e1", textAlign: "center" }}>
                <p style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 600, color: "var(--text-muted)", marginBottom: "4px" }}>Session Code</p>
                <p style={{ fontSize: "2rem", fontWeight: 700, color: "#10633b", letterSpacing: "0.1em" }}>DSA-4921</p>
              </div>

              <div style={{ display: "flex", gap: "12px", width: "100%" }}>
                <button
                  onClick={handleCopyCode}
                  style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "#fff", color: "var(--text-main)", fontWeight: 600, cursor: "pointer", fontSize: "0.875rem", transition: "background-color 0.2s" }}
                >
                  <Copy size={16} /> Copy Code
                </button>
                <button
                  onClick={handleShareLink}
                  style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "#fff", color: "var(--text-main)", fontWeight: 600, cursor: "pointer", fontSize: "0.875rem", transition: "background-color 0.2s" }}
                >
                  <Share2 size={16} /> Share Link
                </button>
              </div>
            </div>
          </div>

          <div className={styles.card} style={{ marginTop: "24px" }}>
            <div className={styles.cardHeader} style={{ fontSize: "1.125rem", fontWeight: 600, padding: "16px 20px", borderBottom: "1px solid #e2e8f0", backgroundColor: "#fff", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}>
              Session Controls
            </div>
            <div className={styles.controlsBox} style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#fff", color: "var(--text-main)", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "0.875rem" }}
              >
                {isPaused ? <CheckCircle2 size={18} /> : <Pause size={18} />}
                {isPaused ? "Resume Assessment" : "Pause Assessment"}
              </button>
              <button
                type="button"
                onClick={handleExtendTime}
                style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#fff", color: "var(--text-main)", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "0.875rem" }}
              >
                <Timer size={18} />
                Extend Time (+5m)
              </button>
              <button
                type="button"
                onClick={handleEndSession}
                style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#fff", color: "var(--text-main)", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "0.875rem", marginTop: "8px" }}
              >
                <Square size={18} />
                End Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
