"use client";

import React, { useState, useEffect } from "react";
import styles from "./reports.module.css";
import {
  CalendarCheck,
  BrainCircuit,
  Download,
  Check,
  CheckCircle2,
  XCircle,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Layers,
  AlertCircle
} from "lucide-react";
import { studentDashboardService } from "@/services/studentDashboard.service";

type TabType = "attendance" | "understanding";

export default function StudentReportsPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("attendance");
  const [selectedSemester, setSelectedSemester] = useState("Semester 6 (Spring 2026)");
  const [statusFilter, setStatusFilter] = useState("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [dailyLogs, setDailyLogs] = useState<any[]>([]);
  const [subjectTopicUnderstandingData, setSubjectTopicUnderstandingData] = useState<any[]>([]);

  // Using the same mocked studentId as the dashboard for now
  const studentId = "6a6a3135b6f279c37d3c4bd4";

  // All subjects expanded by default so topic breakdowns are instantly visible
  const [expandedSubjects, setExpandedSubjects] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        if (activeTab === "attendance") {
          const data = await studentDashboardService.getAttendanceAnalytics(studentId, selectedSemester);
          if (data) {
            setAttendanceData(data.attendanceData || []);
            setDailyLogs(data.dailyLogs || []);
          }
        } else if (activeTab === "understanding") {
          const data = await studentDashboardService.getUnderstandingAnalytics(studentId, selectedSemester);
          if (data) {
            setSubjectTopicUnderstandingData(data);
            // Initialize expanded state
            const initialExpanded: Record<string, boolean> = {};
            data.forEach((item: any) => {
              initialExpanded[item.code] = true;
            });
            setExpandedSubjects(initialExpanded);
          }
        }
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred while fetching reports.");
      } finally {
        setLoading(false);
      }
    };
    
    if (mounted) {
      fetchData();
    }
  }, [studentId, activeTab, selectedSemester, mounted]);

  if (!mounted) return null;

  const toggleSubjectExpand = (code: string) => {
    setExpandedSubjects(prev => ({
      ...prev,
      [code]: !prev[code]
    }));
  };

  const allExpanded = Object.values(expandedSubjects).length > 0 && Object.values(expandedSubjects).every(Boolean);

  const toggleAllSubjects = () => {
    const nextState = !allExpanded;
    const newState: Record<string, boolean> = {};
    subjectTopicUnderstandingData.forEach(item => {
      newState[item.code] = nextState;
    });
    setExpandedSubjects(newState);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleExportPDF = async () => {
    try {
      triggerToast("Generating & Downloading Official Student Analytics PDF Report...");
      const type = activeTab === "attendance" ? "ATTENDANCE_ANALYTICS" : "CONCEPT_UNDERSTANDING";
      const title = `${activeTab === "attendance" ? "Attendance" : "Understanding"} Report - ${selectedSemester}`;
      
      const response = await studentDashboardService.exportReport(studentId, title, type);
      if (response && response.fileUrl) {
        triggerToast("Report saved to database successfully! Download starting...");
        // In a real application, you might trigger a window.open or <a> tag click here
        console.log("Download URL:", response.fileUrl);
      }
    } catch (err: any) {
      triggerToast(`Failed to generate report: ${err.message}`);
    }
  };

  const filteredLogs = dailyLogs.filter(item => {
    if (statusFilter === "present") return item.status === "Present";
    if (statusFilter === "absent") return item.status === "Absent";
    return true;
  });

  return (
    <div className={styles.container}>
      {/* Toast Alert */}
      {toastMessage && (
        <div className={styles.toastSuccess}>
          <Check size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <div className={styles.titleArea}>
            <h1 className={styles.title}>Reports & Analytics</h1>
            <p className={styles.subtitle}>Comprehensive student attendance compliance and real-time concept clarity reports.</p>
          </div>

          <div className={styles.headerActions}>
            <select
              className={styles.selectInput}
              value={selectedSemester}
              onChange={(e) => {
                setSelectedSemester(e.target.value);
                triggerToast(`Filtered analytics for ${e.target.value}`);
              }}
            >
              <option>Semester 6 (Spring 2026)</option>
              <option>Semester 5 (Fall 2025)</option>
              <option>Semester 4 (Spring 2025)</option>
              <option>All Semesters History</option>
            </select>

            <button className={styles.exportBtn} onClick={handleExportPDF}>
              <Download size={16} />
              Export Report PDF
            </button>
          </div>
        </div>

        {/* TABS: ATTENDANCE TRACKER & CONCEPT UNDERSTANDING */}
        <div className={styles.tabs}>
          <div
            className={`${styles.tab} ${activeTab === "attendance" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("attendance")}
          >
            <CalendarCheck size={18} />
            Attendance Tracker
          </div>

          <div
            className={`${styles.tab} ${activeTab === "understanding" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("understanding")}
          >
            <BrainCircuit size={18} />
            Concept Understanding
          </div>
        </div>
      </div>

      {loading && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "40vh" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-700"></div>
            <p style={{ color: "#64748b", fontWeight: 600 }}>Loading Analytics Data...</p>
          </div>
        </div>
      )}

      {!loading && error && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "40vh" }}>
          <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", padding: "24px", borderRadius: "12px", maxWidth: "500px", textAlign: "center" }}>
            <AlertCircle size={32} color="#dc2626" style={{ margin: "0 auto 12px" }} />
            <h3 style={{ color: "#991b1b", fontSize: "1.2rem", fontWeight: 700, marginBottom: "8px" }}>Connection Error</h3>
            <p style={{ color: "#7f1d1d", fontSize: "0.9rem" }}>{error}</p>
          </div>
        </div>
      )}

      {/* TAB 1: ATTENDANCE TRACKER & DAILY BIOMETRIC LOGS */}
      {!loading && !error && activeTab === "attendance" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Subject Attendance Breakdown Cards */}
          <div className={styles.subjectGrid}>
            {attendanceData.map((item, idx) => (
              <div key={idx} className={styles.subjectCard}>
                <div className={styles.subjectHeader}>
                  <span className={styles.subjectCode}>{item.code}</span>
                  <span className={styles.subjectPercent}>{item.percent}%</span>
                </div>
                <div className={styles.subjectBody}>
                  <h4 className={styles.subjectName}>{item.name}</h4>
                  <p className={styles.subjectFaculty}>{item.faculty}</p>
                </div>
                <div className={styles.subjectFooter}>
                  <span className={styles.subjectSlots}>{item.attended} of {item.total} Slots Attended</span>
                  <span className={styles.subjectBadge}>{item.percent >= 90 ? "Excellent" : "Compliant"}</span>
                </div>
              </div>
            ))}
            {attendanceData.length === 0 && (
              <div style={{ padding: "40px", textAlign: "center", gridColumn: "1 / -1", color: "#64748b", backgroundColor: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                No active course enrollments found for attendance tracking.
              </div>
            )}
          </div>

          {/* Daily Attendance Logs Table */}
          <div className={styles.cardPanel}>
            <div className={styles.cardTitleRow}>
              <h3 className={styles.cardTitle}>
                <CalendarCheck size={20} style={{ color: "#00522E" }} />
                Daily Biometric Attendance Logs
              </h3>
              <select
                className={styles.selectInput}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Logs (Present & Absent)</option>
                <option value="present">Present Only</option>
                <option value="absent">Absent Only</option>
              </select>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Course Code</th>
                    <th>Subject Name</th>
                    <th>Lecture Slot</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 600, color: "#0f172a" }}>{log.date}</td>
                      <td><span className={styles.subjectCode}>{log.code}</span></td>
                      <td style={{ fontWeight: 500 }}>{log.subject}</td>
                      <td style={{ color: "#64748b" }}>{log.time}</td>
                      <td>
                        {log.status === "Present" ? (
                          <span className={styles.badgePresent}>
                            <CheckCircle2 size={13} /> Present
                          </span>
                        ) : (
                          <span className={styles.badgeAbsent}>
                            <XCircle size={13} /> Absent
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filteredLogs.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ textAlign: "center", padding: "30px", color: "#64748b" }}>
                        No attendance logs found matching the selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CONCEPT & PULSE UNDERSTANDING WITH EXPLICIT BREAKDOWN BUTTONS */}
      {!loading && !error && activeTab === "understanding" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className={styles.cardPanel}>
            <div className={styles.cardTitleRow}>
              <h3 className={styles.cardTitle}>
                <BrainCircuit size={20} style={{ color: "#00522E" }} />
                Real-Time Course & Topic Understanding Breakdown
              </h3>

              {subjectTopicUnderstandingData.length > 0 && (
                <button
                  onClick={toggleAllSubjects}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "7px 14px",
                    borderRadius: "8px",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    backgroundColor: "#e6f4ea",
                    color: "#00522E",
                    border: "1px solid #c2e7da",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  <Layers size={14} />
                  {allExpanded ? "Collapse All Topics" : "Expand All Topics"}
                </button>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {subjectTopicUnderstandingData.length === 0 ? (
                <div style={{ padding: "40px", textAlign: "center", color: "#64748b", backgroundColor: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                  No topic analytics data available for your current courses.
                </div>
              ) : subjectTopicUnderstandingData.map((item) => {
                const isExpanded = expandedSubjects[item.code] ?? true;
                return (
                  <div
                    key={item.code}
                    style={{
                      borderRadius: "10px",
                      backgroundColor: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      overflow: "hidden",
                      transition: "all 0.2s ease"
                    }}
                  >
                    {/* Subject Header Row */}
                    <div
                      onClick={() => toggleSubjectExpand(item.code)}
                      style={{
                        padding: "16px 20px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer",
                        backgroundColor: isExpanded ? "#f1f5f9" : "#f8fafc",
                        borderBottom: isExpanded ? "1px solid #e2e8f0" : "none"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <span className={styles.subjectCode}>{item.code}</span>
                        <strong style={{ color: "#0f172a", fontSize: "15px" }}>{item.name}</strong>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <span style={{ fontSize: "13px", color: "#64748b", fontWeight: 500 }}>{item.quizzes}</span>
                        <span style={{ fontSize: "14px", fontWeight: 800, color: "#00522E", backgroundColor: "#e6f4ea", padding: "4px 12px", borderRadius: "20px", border: "1px solid #c2e7da" }}>
                          {item.overallClarity}% Clarity
                        </span>

                        {/* EXPLICIT ACTION BUTTON FOR TOPIC BREAKDOWN */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSubjectExpand(item.code);
                          }}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "6px 14px",
                            borderRadius: "6px",
                            fontSize: "0.775rem",
                            fontWeight: 700,
                            backgroundColor: isExpanded ? "#00522E" : "#ffffff",
                            color: isExpanded ? "#ffffff" : "#00522E",
                            border: "1px solid #00522E",
                            cursor: "pointer",
                            transition: "all 0.2s ease"
                          }}
                        >
                          <span>{isExpanded ? "Hide Breakdown" : "View Breakdown"}</span>
                          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                      </div>
                    </div>

                    {/* TOPIC-WISE BREAKDOWN FOR THIS SUBJECT */}
                    {isExpanded && (
                      <div style={{ padding: "16px 20px", backgroundColor: "#ffffff", display: "flex", flexDirection: "column", gap: "12px" }}>
                        <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#00522E", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                          <Layers size={14} color="#00522E" />
                          Topic Understanding Breakdown ({item.topics.length} Topics Covered)
                        </div>

                        <div className={styles.tableWrapper}>
                          <table className={styles.table}>
                            <thead>
                              <tr>
                                <th>Topic Name</th>
                                <th>Quiz Status</th>
                                <th>Status</th>
                                <th style={{ textAlign: "right" }}>Topic Clarity</th>
                              </tr>
                            </thead>
                            <tbody>
                              {item.topics.map((topic: any, tIdx: number) => (
                                <tr key={tIdx}>
                                  <td style={{ fontWeight: 600, color: "#0f172a", fontSize: "0.85rem" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                      <BookOpen size={14} color="#00522E" />
                                      {topic.name}
                                    </div>
                                  </td>
                                  <td style={{ fontSize: "0.8rem", color: "#64748b" }}>{topic.quizzes}</td>
                                  <td>
                                    <span style={{
                                      fontSize: "0.725rem",
                                      fontWeight: 700,
                                      padding: "3px 9px",
                                      borderRadius: "20px",
                                      backgroundColor: topic.clarity < 80 ? "#fef2f2" : "#e6f4ea",
                                      color: topic.clarity < 80 ? "#991b1b" : "#00522E",
                                      border: topic.clarity < 80 ? "1px solid #fecaca" : "1px solid #c2e7da"
                                    }}>
                                      {topic.status}
                                    </span>
                                  </td>
                                  <td style={{ textAlign: "right", fontWeight: 800, color: topic.clarity < 80 ? "#991b1b" : "#00522E", fontSize: "0.9rem" }}>
                                    {topic.clarity}%
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Concept Gap Alerts */}
          {subjectTopicUnderstandingData.length > 0 && (
            <div className={styles.cardPanel}>
              <h3 className={styles.cardTitle}>
                <Sparkles size={20} style={{ color: "#00522E" }} />
                Recommended Concept Review Areas
              </h3>

              <div className={styles.gapGrid}>
                {subjectTopicUnderstandingData
                  .flatMap((item: any) => 
                    item.topics.filter((t: any) => t.clarity < 80).map((t: any) => ({
                      course: item.name,
                      topic: t.name,
                      clarity: t.clarity
                    }))
                  )
                  .slice(0, 3)
                  .map((gap: any, i: number) => (
                    <div key={i} className={styles.gapCard}>
                      <Info size={20} style={{ color: "#00522E", flexShrink: 0, marginTop: "2px" }} />
                      <div>
                        <h4 className={styles.gapTitle}>{gap.course}: {gap.topic}</h4>
                        <p className={styles.gapDesc}>Topic Clarity: {gap.clarity}%. Recommended: Review core materials and practice problems for this topic.</p>
                      </div>
                    </div>
                ))}
                {subjectTopicUnderstandingData.flatMap((item: any) => item.topics.filter((t: any) => t.clarity < 80)).length === 0 && (
                  <div style={{ color: "#64748b" }}>Great job! No major concept gaps detected.</div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
