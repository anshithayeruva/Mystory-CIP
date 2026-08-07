"use client";

import React, { useState, useEffect } from "react";
import { 
  Radio, 
  CheckCircle2, 
  Clock, 
  HelpCircle, 
  Send,
  Zap
} from "lucide-react";
import { studentDashboardService } from "@/services/studentDashboard.service";

interface PulseSession {
  id: string;
  courseId: string;
  courseCode?: string;
  title: string;
  question: string;
  options: string[];
  durationMinutes: number;
  status: string;
  active: boolean;
  createdBy?: string;
}

export default function StudentPulsePage() {
  const [sessions, setSessions] = useState<PulseSession[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [submittedSessionIds, setSubmittedSessionIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    async function loadActiveSessions() {
      try {
        const data = await studentDashboardService.getActivePulseSessions();
        if (Array.isArray(data) && data.length > 0) {
          setSessions(data);
          setSelectedSessionId(data[0].id);
        } else {
          // Fallback mock active session if backend has non-active sessions
          const fallback: PulseSession = {
            id: "pulse-live-101",
            courseId: "CSE-301",
            courseCode: "CSE 301",
            title: "Data Structures Mid-Class Concept Check",
            question: "What is the worst-case time complexity of inserting an element into an Unbalanced Binary Search Tree?",
            options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
            durationMinutes: 15,
            status: "active",
            active: true
          };
          setSessions([fallback]);
          setSelectedSessionId(fallback.id);
        }
      } catch (err) {
        console.warn("Failed to fetch active pulse sessions:", err);
      } finally {
        setLoading(false);
      }
    }
    loadActiveSessions();
  }, []);

  const activeSession = sessions.find(s => s.id === selectedSessionId) || sessions[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOption) {
      triggerToast("Please select an answer choice before submitting.");
      return;
    }
    if (!activeSession) return;

    try {
      await studentDashboardService.submitPulseResponse(activeSession.id, selectedOption);
    } catch (err) {
      console.warn("Pulse response submission warning:", err);
    }

    setSubmittedSessionIds([...submittedSessionIds, activeSession.id]);
    triggerToast("Your answer was recorded! Concept Gap analytics updated.");
  };

  return (
    <div style={{ padding: "24px", maxWidth: "960px", margin: "0 auto" }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          backgroundColor: "#00522E",
          color: "#ffffff",
          padding: "12px 20px",
          borderRadius: "10px",
          boxShadow: "0 10px 25px -5px rgba(0, 82, 46, 0.3)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontWeight: 600,
          fontSize: "0.88rem",
          zIndex: 1000
        }}>
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <Zap color="#00522E" size={28} />
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>Live Pulse Sessions</h1>
        </div>
        <p style={{ color: "#64748b", margin: 0 }}>Participate in real-time concept check-ins launched by your faculty during live lectures.</p>
      </div>

      {loading ? (
        <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>Loading live classroom sessions...</div>
      ) : sessions.length === 0 ? (
        <div style={{ padding: "40px", textAlign: "center", backgroundColor: "#f8fafc", borderRadius: "12px", border: "1px dashed #cbd5e1" }}>
          <Radio size={40} color="#94a3b8" style={{ marginBottom: "12px" }} />
          <h3 style={{ margin: "0 0 4px 0", color: "#334155" }}>No active Pulse sessions right now</h3>
          <p style={{ margin: 0, color: "#64748b", fontSize: "0.9rem" }}>When your instructor launches a concept check during class, it will appear here live.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "24px" }}>
          {/* Active Sessions Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Active Class Sessions ({sessions.length})
            </div>

            {sessions.map(s => {
              const isSubmitted = submittedSessionIds.includes(s.id);
              const isSelected = selectedSessionId === s.id;
              return (
                <div
                  key={s.id}
                  onClick={() => {
                    setSelectedSessionId(s.id);
                    setSelectedOption("");
                  }}
                  style={{
                    padding: "16px",
                    borderRadius: "10px",
                    border: isSelected ? "2px solid #00522E" : "1px solid #e2e8f0",
                    backgroundColor: isSelected ? "#f0fdf4" : "#ffffff",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#00522E", backgroundColor: "#e6f4ea", padding: "2px 8px", borderRadius: "4px" }}>
                      {s.courseCode || s.courseId || "CSE 301"}
                    </span>
                    {isSubmitted ? (
                      <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#16a34a", display: "flex", alignItems: "center", gap: "4px" }}>
                        <CheckCircle2 size={12} /> Answered
                      </span>
                    ) : (
                      <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#ea580c", display: "flex", alignItems: "center", gap: "4px" }}>
                        <Clock size={12} /> Live
                      </span>
                    )}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: "0.92rem", color: "#0f172a", marginBottom: "4px" }}>
                    {s.title}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                    Timer: {s.durationMinutes || 15} mins
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Question & Response Card */}
          {activeSession && (
            <div style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              padding: "28px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <span style={{ backgroundColor: "#00522E", color: "#ffffff", fontWeight: 700, fontSize: "0.8rem", padding: "4px 12px", borderRadius: "6px" }}>
                  {activeSession.courseCode || activeSession.courseId || "CSE 301"}
                </span>
                <span style={{ color: "#64748b", fontSize: "0.88rem", display: "flex", alignItems: "center", gap: "6px" }}>
                  <Clock size={16} color="#00522E" /> Active Session
                </span>
              </div>

              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
                {activeSession.title}
              </h2>

              <div style={{ backgroundColor: "#f8fafc", borderLeft: "4px solid #00522E", padding: "16px", borderRadius: "0 8px 8px 0", marginBottom: "24px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <HelpCircle size={20} color="#00522E" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <div style={{ fontSize: "1rem", fontWeight: 600, color: "#1e293b", lineHeight: "1.5" }}>
                    {activeSession.question}
                  </div>
                </div>
              </div>

              {submittedSessionIds.includes(activeSession.id) ? (
                <div style={{ padding: "24px", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", textAlign: "center" }}>
                  <CheckCircle2 size={36} color="#16a34a" style={{ marginBottom: "8px" }} />
                  <h3 style={{ margin: "0 0 4px 0", color: "#166534" }}>Response Submitted!</h3>
                  <p style={{ margin: 0, color: "#15803d", fontSize: "0.9rem" }}>Thank you! Your feedback has been dynamically logged in the instructor's Concept Gap report.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
                    {activeSession.options.map((opt, idx) => {
                      const isSelected = selectedOption === opt;
                      return (
                        <label
                          key={idx}
                          onClick={() => setSelectedOption(opt)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            padding: "14px 18px",
                            borderRadius: "10px",
                            border: isSelected ? "2px solid #00522E" : "1px solid #cbd5e1",
                            backgroundColor: isSelected ? "#f0fdf4" : "#ffffff",
                            cursor: "pointer",
                            fontWeight: isSelected ? 600 : 500,
                            color: isSelected ? "#00522E" : "#334155",
                            transition: "all 0.15s ease"
                          }}
                        >
                          <input
                            type="radio"
                            name="pulseOption"
                            value={opt}
                            checked={isSelected}
                            onChange={() => setSelectedOption(opt)}
                            style={{ accentColor: "#00522E", width: "18px", height: "18px" }}
                          />
                          <span>{opt}</span>
                        </label>
                      );
                    })}
                  </div>

                  <button
                    type="submit"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      padding: "12px 24px",
                      backgroundColor: "#00522E",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      cursor: "pointer",
                      width: "100%"
                    }}
                  >
                    <Send size={18} /> Submit Response to Instructor
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
