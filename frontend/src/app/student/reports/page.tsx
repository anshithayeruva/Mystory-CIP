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
  Layers
} from "lucide-react";

type TabType = "attendance" | "understanding";

export default function StudentReportsPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("attendance");
  const [selectedSemester, setSelectedSemester] = useState("Semester 6 (Spring 2026)");
  const [statusFilter, setStatusFilter] = useState("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // All subjects expanded by default so topic breakdowns are instantly visible
  const [expandedSubjects, setExpandedSubjects] = useState<Record<string, boolean>>({
    "CSE 301": true,
    "CSE 302": true,
    "CSE 303": true,
    "CSE 304": true,
    "CSE 305": true,
    "CSE 306": true,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleSubjectExpand = (code: string) => {
    setExpandedSubjects(prev => ({
      ...prev,
      [code]: !prev[code]
    }));
  };

  const allExpanded = Object.values(expandedSubjects).every(Boolean);

  const toggleAllSubjects = () => {
    const nextState = !allExpanded;
    setExpandedSubjects({
      "CSE 301": nextState,
      "CSE 302": nextState,
      "CSE 303": nextState,
      "CSE 304": nextState,
      "CSE 305": nextState,
      "CSE 306": nextState,
    });
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleExportPDF = () => {
    triggerToast("Generating & Downloading Official Student Analytics PDF Report...");
  };

  const attendanceData = [
    { code: "CSE 301", name: "Advanced Data Structures & Algorithms", faculty: "Dr. Aris Thorne", percent: 94.5, attended: 36, total: 38 },
    { code: "CSE 302", name: "Database Management Systems & Distributed DB", faculty: "Dr. Sarah Jenkins", percent: 91.2, attended: 31, total: 34 },
    { code: "CSE 303", name: "Operating Systems & System Programming", faculty: "Prof. Kevin Ellis", percent: 88.0, attended: 29, total: 33 },
    { code: "CSE 304", name: "Computer Networks & Security Protocols", faculty: "Dr. Lisa Muller", percent: 96.0, attended: 24, total: 25 },
    { code: "CSE 305", name: "Machine Learning & Statistical Pattern Rec.", faculty: "Dr. Robert Vance", percent: 86.4, attended: 19, total: 22 },
    { code: "CSE 306", name: "Software Engineering & Agile Methodologies", faculty: "Prof. Anita Desai", percent: 93.0, attended: 26, total: 28 },
  ];

  const dailyLogs = [
    { date: "Aug 01, 2026", code: "CSE 301", subject: "Advanced Data Structures", time: "09:00 AM - 10:00 AM", status: "Present" },
    { date: "Aug 01, 2026", code: "CSE 302", subject: "Database Systems", time: "10:15 AM - 11:15 AM", status: "Present" },
    { date: "Jul 31, 2026", code: "CSE 303", subject: "Operating Systems", time: "02:00 PM - 03:00 PM", status: "Present" },
    { date: "Jul 31, 2026", code: "CSE 305", subject: "Machine Learning", time: "03:15 PM - 04:15 PM", status: "Absent" },
    { date: "Jul 30, 2026", code: "CSE 304", subject: "Computer Networks", time: "11:30 AM - 12:30 PM", status: "Present" },
    { date: "Jul 30, 2026", code: "CSE 306", subject: "Software Engineering", time: "04:30 PM - 05:30 PM", status: "Present" },
  ];

  const filteredLogs = dailyLogs.filter(item => {
    if (statusFilter === "present") return item.status === "Present";
    if (statusFilter === "absent") return item.status === "Absent";
    return true;
  });

  const subjectTopicUnderstandingData = [
    {
      code: "CSE 301",
      name: "Advanced Data Structures",
      overallClarity: 92,
      quizzes: "12 / 12 Completed",
      topics: [
        { name: "Binary Search Trees & AVL Balance", clarity: 96, status: "Mastery", quizzes: "4/4 Passed" },
        { name: "Graph Traversal (BFS & DFS)", clarity: 94, status: "Mastery", quizzes: "3/3 Passed" },
        { name: "Dynamic Programming & Knapsack Problem", clarity: 84, status: "Needs Practice", quizzes: "3/4 Passed" },
        { name: "Min & Max Heaps & Priority Queues", clarity: 95, status: "Mastery", quizzes: "2/2 Passed" },
      ]
    },
    {
      code: "CSE 302",
      name: "Database Management Systems",
      overallClarity: 88,
      quizzes: "10 / 10 Completed",
      topics: [
        { name: "Relational Algebra & SQL Complex Joins", clarity: 94, status: "Mastery", quizzes: "3/3 Passed" },
        { name: "Normalization (1NF, 2NF, 3NF & BCNF)", clarity: 88, status: "Good Understanding", quizzes: "3/3 Passed" },
        { name: "Transaction Concurrency & ACID Protocols", clarity: 82, status: "Needs Practice", quizzes: "2/3 Passed" },
        { name: "B+ Tree Indexing & Query Plans", clarity: 90, status: "Good Understanding", quizzes: "2/2 Passed" },
      ]
    },
    {
      code: "CSE 303",
      name: "Operating Systems",
      overallClarity: 84,
      quizzes: "8 / 9 Completed",
      topics: [
        { name: "CPU Scheduling Algorithms (Round Robin, SJF)", clarity: 92, status: "Mastery", quizzes: "3/3 Passed" },
        { name: "Process Synchronization & Semaphores", clarity: 76, status: "Review Recommended", quizzes: "2/3 Passed" },
        { name: "Virtual Memory Paging & Page Replacement", clarity: 86, status: "Good Understanding", quizzes: "3/3 Passed" },
      ]
    },
    {
      code: "CSE 304",
      name: "Computer Networks",
      overallClarity: 95,
      quizzes: "11 / 11 Completed",
      topics: [
        { name: "TCP/IP Protocol Stack & Congestion Control", clarity: 98, status: "Mastery", quizzes: "4/4 Passed" },
        { name: "Subnetting, CIDR & IP Routing Tables", clarity: 94, status: "Mastery", quizzes: "3/3 Passed" },
        { name: "DNS Architecture & Application Layer", clarity: 95, status: "Mastery", quizzes: "2/2 Passed" },
      ]
    },
    {
      code: "CSE 305",
      name: "Machine Learning",
      overallClarity: 86,
      quizzes: "9 / 10 Completed",
      topics: [
        { name: "Linear & Logistic Regression Models", clarity: 90, status: "Good Understanding", quizzes: "3/3 Passed" },
        { name: "Decision Trees & Random Forests", clarity: 88, status: "Good Understanding", quizzes: "3/3 Passed" },
        { name: "Gradient Descent Convergence & Learning Rate", clarity: 78, status: "Review Recommended", quizzes: "1/2 Passed" },
      ]
    },
    {
      code: "CSE 306",
      name: "Software Engineering",
      overallClarity: 90,
      quizzes: "10 / 10 Completed",
      topics: [
        { name: "Agile Scrum Sprint Planning & User Stories", clarity: 95, status: "Mastery", quizzes: "3/3 Passed" },
        { name: "UML Class & Sequence Diagrams", clarity: 90, status: "Good Understanding", quizzes: "3/3 Passed" },
        { name: "CI/CD Pipelines & Automated Unit Testing", clarity: 88, status: "Good Understanding", quizzes: "2/2 Passed" },
      ]
    }
  ];

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
            Concept & Pulse Understanding
          </div>
        </div>
      </div>

      {/* TAB 1: ATTENDANCE TRACKER & DAILY BIOMETRIC LOGS */}
      {activeTab === "attendance" && (
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CONCEPT & PULSE UNDERSTANDING WITH EXPLICIT BREAKDOWN BUTTONS */}
      {activeTab === "understanding" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className={styles.cardPanel}>
            <div className={styles.cardTitleRow}>
              <h3 className={styles.cardTitle}>
                <BrainCircuit size={20} style={{ color: "#00522E" }} />
                Real-Time Course & Topic Understanding Breakdown
              </h3>
              
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
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {subjectTopicUnderstandingData.map((item) => {
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
                              {item.topics.map((topic, tIdx) => (
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
          <div className={styles.cardPanel}>
            <h3 className={styles.cardTitle}>
              <Sparkles size={20} style={{ color: "#00522E" }} />
              Recommended Concept Review Areas
            </h3>
            
            <div className={styles.gapGrid}>
              <div className={styles.gapCard}>
                <Info size={20} style={{ color: "#00522E", flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <h4 className={styles.gapTitle}>Operating Systems: Process Synchronization</h4>
                  <p className={styles.gapDesc}>Topic Clarity: 76%. Recommended: Review Mutex locks, Peterson's algorithm, and Semaphore practice problems before the upcoming Mid-Term exam.</p>
                </div>
              </div>

              <div className={styles.gapCard}>
                <Info size={20} style={{ color: "#00522E", flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <h4 className={styles.gapTitle}>Machine Learning: Gradient Descent Convergence</h4>
                  <p className={styles.gapDesc}>Topic Clarity: 78%. Recommended: Practice learning rate tuning and mini-batch stochastic gradient descent numerical calculations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
