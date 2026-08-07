"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Radio, 
  Plus, 
  Users, 
  CheckCircle2, 
  Clock, 
  Play, 
  Square, 
  ThumbsUp, 
  HelpCircle, 
  Flame, 
  Calendar,
  X,
  MapPin,
  BookOpen,
  ArrowRight
} from "lucide-react";
import styles from "../pulse-sessions/pulse-sessions.module.css";
import { FacultyService } from "@/services/faculty.service";

interface LiveSessionData {
  id: string;
  courseCode: string;
  courseName: string;
  topic: string;
  room: string;
  time: string;
  duration: string;
  studentsPresent: number;
  totalStudents: number;
  status: "LIVE" | "UPCOMING" | "COMPLETED";
  feedback: {
    clear: number;
    confused: number;
    slowDown: number;
  };
}

export default function FacultyLiveClassroomPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Form State for New Session
  const [newCourse, setNewCourse] = useState("CSE 301");
  const [newTopic, setNewTopic] = useState("");
  const [newRoom, setNewRoom] = useState("AB2 - Hall 301");
  const [newDuration, setNewDuration] = useState("90 mins");

  // Sessions State
  const [sessions, setSessions] = useState<LiveSessionData[]>([
    {
      id: "sess-1",
      courseCode: "CSE 302",
      courseName: "Database Management Systems & Distributed DB",
      topic: "B+ Tree Index Insertion & Deletion Algorithms",
      room: "AB2 - Hall 405",
      time: "10:45 AM - 12:15 PM",
      duration: "90 min",
      studentsPresent: 54,
      totalStudents: 60,
      status: "LIVE",
      feedback: { clear: 42, confused: 8, slowDown: 4 }
    },
    {
      id: "sess-2",
      courseCode: "CSE 301",
      courseName: "Advanced Data Structures & Algorithms",
      topic: "Graph Traversal Algorithms (BFS, DFS & Shortest Path)",
      room: "AB2 - Hall 301",
      time: "02:00 PM - 03:30 PM",
      duration: "90 min",
      studentsPresent: 0,
      totalStudents: 60,
      status: "UPCOMING",
      feedback: { clear: 0, confused: 0, slowDown: 0 }
    },
    {
      id: "sess-3",
      courseCode: "CSE 304",
      courseName: "Computer Networks & Security Protocols",
      topic: "TCP Congestion Control & Window Scaling",
      room: "CS Lab 3",
      time: "Yesterday, 09:00 AM",
      duration: "90 min",
      studentsPresent: 57,
      totalStudents: 60,
      status: "COMPLETED",
      feedback: { clear: 51, confused: 4, slowDown: 2 }
    }
  ]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    async function fetchLiveClassroom() {
      try {
        setLoading(true);
        const res = await FacultyService.getLiveClassroom();
        if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
          setSessions(res.data);
        }
      } catch (err) {
        console.warn("Live classroom API offline, using standard state:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLiveClassroom();
  }, []);

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim()) {
      triggerToast("Please enter a session topic.");
      return;
    }

    try {
      const res = await FacultyService.createLiveClassroomSession({
        courseCode: newCourse,
        topic: newTopic,
        room: newRoom,
        duration: newDuration
      });

      if (res && res.data) {
        setSessions([res.data, ...sessions]);
        triggerToast(`Live session "${res.data.courseCode}: ${res.data.topic}" launched successfully!`);
      } else {
        throw new Error("Invalid response");
      }
    } catch (err) {
      console.warn("Falling back to local session creation:", err);
      const courseNames: Record<string, string> = {
        "CSE 301": "Advanced Data Structures & Algorithms",
        "CSE 302": "Database Management Systems",
        "CSE 303": "Operating Systems & System Programming",
        "CSE 304": "Computer Networks & Security",
        "CSE 305": "Machine Learning & Pattern Recognition"
      };

      const newSess: LiveSessionData = {
        id: `sess-${Date.now()}`,
        courseCode: newCourse,
        courseName: courseNames[newCourse] || "Computer Science Course",
        topic: newTopic,
        room: newRoom,
        time: "Just Now",
        duration: newDuration,
        studentsPresent: 1,
        totalStudents: 60,
        status: "LIVE",
        feedback: { clear: 0, confused: 0, slowDown: 0 }
      };

      setSessions([newSess, ...sessions]);
      triggerToast(`Live session "${newSess.courseCode}: ${newSess.topic}" launched successfully!`);
    } finally {
      setShowCreateModal(false);
      setNewTopic("");
    }
  };

  const handleStartSession = async (id: string) => {
    try {
      await FacultyService.startLiveSession(id);
    } catch (err) {
      console.warn("Start live session API warning:", err);
    }
    setSessions(prev =>
      prev.map(s => (s.id === id ? { ...s, status: "LIVE" as const, studentsPresent: 48 } : s))
    );
    triggerToast("Classroom live session started!");
  };

  const handleEndSession = async (id: string) => {
    try {
      await FacultyService.endLiveSession(id);
    } catch (err) {
      console.warn("End live session API warning:", err);
    }
    setSessions(prev =>
      prev.map(s => (s.id === id ? { ...s, status: "COMPLETED" as const } : s))
    );
    triggerToast("Live session ended and logged.");
  };

  const activeSession = sessions.find(s => s.status === "LIVE");

  return (
    <div className={styles.pageContainer}>
      {/* Toast Alert */}
      {toastMessage && (
        <div style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          backgroundColor: "#00522E",
          color: "#ffffff",
          padding: "12px 20px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontWeight: 600,
          zIndex: 1000
        }}>
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>Live Classroom & Sessions</h1>
          <p className={styles.subtitle}>
            Host live teaching sessions, verify student attendance, and track real-time comprehension feedback.
          </p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)} 
          className={styles.primaryButton}
        >
          <Plus size={16} /> Create New Session
        </button>
      </div>

      {/* 1. Active Live Session Card (If any session is LIVE) */}
      {activeSession ? (
        <div style={{
          backgroundColor: "#ffffff",
          border: "1px solid #c9e0d3",
          borderRadius: "10px",
          padding: "24px",
          boxShadow: "0 2px 6px rgba(0, 82, 46, 0.05)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#00522E" }} />
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#00522E", margin: 0 }}>
                Active Live Session in Progress
              </h2>
            </div>
            <span className={styles.badgeLive}>
              <Radio size={12} style={{ display: "inline", marginRight: "4px" }} />
              LIVE BROADCAST
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px", alignItems: "start" }}>
            <div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px 0" }}>
                {activeSession.courseCode}: {activeSession.courseName}
              </h3>
              <p style={{ fontSize: "0.9rem", color: "#475569", margin: "0 0 16px 0" }}>
                Topic: <strong>{activeSession.topic}</strong>
              </p>

              <div style={{ display: "flex", gap: "20px", fontSize: "0.82rem", color: "#64748b", marginBottom: "20px" }}>
                <div><MapPin size={14} style={{ display: "inline", marginRight: 4 }} /> Room: <strong>{activeSession.room}</strong></div>
                <div><Clock size={14} style={{ display: "inline", marginRight: 4 }} /> Duration: <strong>{activeSession.duration}</strong></div>
                <div><Users size={14} style={{ display: "inline", marginRight: 4 }} /> Attendance: <strong style={{ color: "#00522E" }}>{activeSession.studentsPresent} / {activeSession.totalStudents} ({Math.round((activeSession.studentsPresent / activeSession.totalStudents) * 100)}%)</strong></div>
              </div>

              {/* Realtime Feedback Counter Box */}
              <div style={{ backgroundColor: "#f8fafc", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "10px" }}>
                  Live Student Feedback Signals
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                  <div style={{ backgroundColor: "#ffffff", padding: "10px", borderRadius: "6px", border: "1px solid #e2e8f0", textAlign: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, fontSize: "0.75rem", color: "#00522E", fontWeight: 700 }}>
                      <ThumbsUp size={14} /> Concept Clear
                    </div>
                    <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a", marginTop: 4 }}>{activeSession.feedback.clear}</div>
                  </div>
                  <div style={{ backgroundColor: "#ffffff", padding: "10px", borderRadius: "6px", border: "1px solid #e2e8f0", textAlign: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, fontSize: "0.75rem", color: "#b45309", fontWeight: 700 }}>
                      <HelpCircle size={14} /> Need Help
                    </div>
                    <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a", marginTop: 4 }}>{activeSession.feedback.confused}</div>
                  </div>
                  <div style={{ backgroundColor: "#ffffff", padding: "10px", borderRadius: "6px", border: "1px solid #e2e8f0", textAlign: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, fontSize: "0.75rem", color: "#991b1b", fontWeight: 700 }}>
                      <Flame size={14} /> Slow Down
                    </div>
                    <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a", marginTop: 4 }}>{activeSession.feedback.slowDown}</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", backgroundColor: "#f8fafc", padding: "20px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f172a" }}>Session Controls</div>
              <button 
                onClick={() => triggerToast("Joining live classroom stream...")}
                className={styles.primaryButton} 
                style={{ width: "100%", justifyContent: "center" }}
              >
                <Play size={14} /> Join Live Classroom
              </button>
              <button 
                onClick={() => handleEndSession(activeSession.id)}
                style={{
                  width: "100%",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "1px solid #dc2626",
                  backgroundColor: "#ffffff",
                  color: "#dc2626",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px"
                }}
              >
                <Square size={14} /> End Live Session
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.emptyState}>
          <Radio className={styles.emptyStateIcon} style={{ color: "#00522E" }} />
          <h2 className={styles.emptyStateTitle}>No Active Live Session</h2>
          <p className={styles.emptyStateDesc}>
            Launch a new classroom session to start live lecturing and collect real-time student feedback.
          </p>
          <button onClick={() => setShowCreateModal(true)} className={styles.primaryButton}>
            <Plus size={16} /> Create & Host Session
          </button>
        </div>
      )}

      {/* 2. Scheduled & All Classroom Sessions List */}
      <div className={styles.mainCard}>
        <div className={styles.tableHeaderRow}>
          <h2 className={styles.tableTitle}>Classroom Sessions Directory</h2>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>COURSE & TOPIC</th>
                <th>ROOM / LOCATION</th>
                <th>TIME SLOT</th>
                <th>ATTENDANCE</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s) => (
                <tr key={s.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: "#0f172a" }}>{s.courseCode}: {s.courseName}</div>
                    <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "2px" }}>{s.topic}</div>
                  </td>
                  <td style={{ fontWeight: 600, color: "#334155" }}>{s.room}</td>
                  <td style={{ fontSize: "0.82rem", color: "#64748b" }}>{s.time}</td>
                  <td>
                    <span style={{ fontWeight: 700, color: "#00522E" }}>
                      {s.studentsPresent > 0 ? `${s.studentsPresent}/${s.totalStudents}` : "Not Started"}
                    </span>
                  </td>
                  <td>
                    <span className={s.status === "LIVE" ? styles.badgeLive : s.status === "UPCOMING" ? styles.badgeUpcoming : styles.badgeCompleted}>
                      {s.status}
                    </span>
                  </td>
                  <td>
                    {s.status === "LIVE" ? (
                      <button onClick={() => triggerToast("Joined live classroom.")} className={styles.primaryButton} style={{ padding: "4px 10px", fontSize: "0.75rem" }}>
                        Join Live
                      </button>
                    ) : s.status === "UPCOMING" ? (
                      <button onClick={() => handleStartSession(s.id)} className={styles.resetButton} style={{ padding: "4px 10px", fontSize: "0.75rem", borderColor: "#00522E", color: "#00522E" }}>
                        Start Session
                      </button>
                    ) : (
                      <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE SESSION MODAL */}
      {showCreateModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(15, 23, 42, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999,
          padding: "20px"
        }}>
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            width: "100%",
            maxWidth: "500px",
            padding: "24px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Radio size={20} color="#00522E" />
                <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>Create New Live Classroom Session</h2>
              </div>
              <button 
                onClick={() => setShowCreateModal(false)}
                style={{ border: "none", background: "none", cursor: "pointer", color: "#64748b" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateSession} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#0f172a", textTransform: "uppercase", marginBottom: "6px" }}>Select Course</label>
                <select 
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                  className={styles.selectInput}
                >
                  <option value="CSE 301">CSE 301 - Advanced Data Structures & Algorithms</option>
                  <option value="CSE 302">CSE 302 - Database Management Systems</option>
                  <option value="CSE 303">CSE 303 - Operating Systems & System Programming</option>
                  <option value="CSE 304">CSE 304 - Computer Networks & Security</option>
                  <option value="CSE 305">CSE 305 - Machine Learning</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#0f172a", textTransform: "uppercase", marginBottom: "6px" }}>Lecture Topic Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Dynamic Programming & Matrix Multiplication" 
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  className={styles.searchInput}
                  style={{ paddingLeft: "12px" }}
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#0f172a", textTransform: "uppercase", marginBottom: "6px" }}>Room / Hall</label>
                  <input 
                    type="text" 
                    value={newRoom}
                    onChange={(e) => setNewRoom(e.target.value)}
                    className={styles.searchInput}
                    style={{ paddingLeft: "12px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#0f172a", textTransform: "uppercase", marginBottom: "6px" }}>Duration</label>
                  <select 
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className={styles.selectInput}
                  >
                    <option value="60 mins">60 mins</option>
                    <option value="90 mins">90 mins</option>
                    <option value="120 mins">120 mins</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "12px" }}>
                <button 
                  type="button" 
                  onClick={() => setShowCreateModal(false)}
                  className={styles.resetButton}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className={styles.primaryButton}
                >
                  Launch Live Session Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
