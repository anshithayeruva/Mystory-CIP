"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Plus, 
  Calendar, 
  Users, 
  BarChart2, 
  Brain, 
  ChevronRight, 
  Search, 
  Filter, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Radio,
  FileText,
  RotateCcw
} from "lucide-react";
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
    name: "Arrays & Contiguous Memory Allocation Quiz",
    subject: "Data Structures",
    section: "CSE-A",
    date: "2023-11-20",
    attempted: 58,
    totalStudents: 60,
    avgScore: "82%",
    understanding: "High (Good)",
    status: "Completed",
  },
  {
    id: "2",
    name: "SQL Queries & Index Optimization",
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
    name: "Thermodynamics Midterm Review Assessment",
    subject: "Physics",
    section: "MECH-A",
    date: "2023-11-25",
    attempted: 12,
    totalStudents: 55,
    avgScore: "In Progress",
    understanding: "Monitoring...",
    status: "Live",
  }
];

export default function FacultyPulseSessionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Calculated Metrics
  const totalCount = MOCK_ASSESSMENTS.length;
  const completedCount = MOCK_ASSESSMENTS.filter(a => a.status === "Completed").length;
  const evaluatingCount = MOCK_ASSESSMENTS.filter(a => a.status === "Evaluating").length;
  const liveCount = MOCK_ASSESSMENTS.filter(a => a.status === "Live").length;

  // Filtered Assessments List
  const filteredAssessments = useMemo(() => {
    return MOCK_ASSESSMENTS.filter((item) => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.section.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubject = selectedSubject === "All" || item.subject === selectedSubject;
      const matchesStatus = selectedStatus === "All" || item.status === selectedStatus;
      return matchesSearch && matchesSubject && matchesStatus;
    });
  }, [searchTerm, selectedSubject, selectedStatus]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedSubject("All");
    setSelectedStatus("All");
  };

  return (
    <div className={styles.pageContainer}>
      {/* Top Header */}
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title} style={{ fontWeight: 800, letterSpacing: "-0.02em" }}>
            AI Assessments
          </h1>
          <p className={styles.subtitle}>
            Generate, publish, and monitor AI-powered classroom assessments & concept evaluation.
          </p>
        </div>
        <Link href="/faculty/pulse-sessions/create" className={styles.primaryButton}>
          <Plus size={16} />
          Generate Assessment
        </Link>
      </div>

      {/* Top Summary KPI Cards */}
      <div className={styles.kpiRow}>
        <div className={styles.kpiCard} style={{ borderTop: "3px solid #00522E" }}>
          <div className={styles.kpiLabel}>Total Assessments</div>
          <div className={styles.kpiValue}>{totalCount}</div>
        </div>

        <div className={styles.kpiCard} style={{ borderTop: "3px solid #00522E" }}>
          <div className={styles.kpiLabel}>Completed</div>
          <div className={styles.kpiValue}>{completedCount}</div>
        </div>

        <div className={styles.kpiCard} style={{ borderTop: "3px solid #00522E" }}>
          <div className={styles.kpiLabel}>Under Evaluation</div>
          <div className={styles.kpiValue}>{evaluatingCount}</div>
        </div>

        <div className={styles.kpiCard} style={{ borderTop: "3px solid #00522E" }}>
          <div className={styles.kpiLabel}>Live / Active</div>
          <div className={styles.kpiValue} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {liveCount}
            {liveCount > 0 && (
              <span style={{ display: "inline-flex", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#00522E" }} />
            )}
          </div>
        </div>
      </div>

      {/* Main Container Card */}
      <div className={styles.mainCard} style={{ backgroundColor: "#ffffff" }}>
        {/* Search & Filter Header Bar */}
        <div className={styles.filterBar} style={{ backgroundColor: "#ffffff", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}>
          <div className={styles.searchGroup}>
            <label className={styles.filterLabel}>Search Assessment</label>
            <div className={styles.searchInputWrapper}>
              <Search size={16} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search by topic, subject, or section..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Subject</label>
            <select 
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className={styles.selectInput}
            >
              <option value="All">All Subjects</option>
              <option value="Data Structures">Data Structures</option>
              <option value="DBMS">DBMS</option>
              <option value="Physics">Physics</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Status</label>
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className={styles.selectInput}
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Evaluating">Evaluating</option>
              <option value="Live">Live</option>
            </select>
          </div>

          {(searchTerm || selectedSubject !== "All" || selectedStatus !== "All") && (
            <button 
              type="button" 
              onClick={handleResetFilters}
              className={styles.resetButton}
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <RotateCcw size={14} /> Reset
            </button>
          )}
        </div>

        {/* List of Assessments */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "20px" }}>
          {filteredAssessments.length === 0 ? (
            <div className={styles.emptyState}>
              <FileText className={styles.emptyStateIcon} />
              <h3 className={styles.emptyStateTitle}>No Assessments Found</h3>
              <p className={styles.emptyStateDesc}>Try adjusting your search criteria or create a new AI assessment.</p>
              <button onClick={handleResetFilters} className={styles.secondaryButton}>
                Clear Filters
              </button>
            </div>
          ) : (
            filteredAssessments.map((assessment) => {
              const isLive = assessment.status === "Live";
              const isEvaluating = assessment.status === "Evaluating";

              return (
                <div 
                  key={assessment.id}
                  style={{
                    border: "1px solid #e2e8f0",
                    borderLeft: isLive ? "4px solid #00522E" : "4px solid #cbd5e1",
                    borderRadius: "8px",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                    transition: "box-shadow 0.2s ease, border-color 0.2s ease"
                  }}
                >
                  {/* Card Header Row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", flexWrap: "wrap" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#00522E", backgroundColor: "#e9f2ee", border: "1px solid #cbd5e1", padding: "2px 8px", borderRadius: "4px" }}>
                          {assessment.subject}
                        </span>
                        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#475569", backgroundColor: "#f1f5f9", padding: "2px 8px", borderRadius: "4px" }}>
                          Section {assessment.section}
                        </span>
                        <span className={`${styles.badge} ${
                          isLive ? styles.badgeLive : isEvaluating ? styles.badgeUpcoming : styles.badgeCompleted
                        }`}>
                          {isLive && <Radio size={12} style={{ color: "#00522E" }} />}
                          {assessment.status}
                        </span>
                      </div>
                      
                      <h3 style={{ margin: 0, fontSize: "1.125rem", color: "#0f172a", fontWeight: 700 }}>
                        {assessment.name}
                      </h3>
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                      {isLive ? (
                        <Link 
                          href={`/faculty/pulse-sessions/${assessment.id}/live`}
                          className={styles.primaryButton}
                          style={{ padding: "8px 14px" }}
                        >
                          Monitor Live Session <ChevronRight size={16} />
                        </Link>
                      ) : (
                        <Link 
                          href={`/faculty/pulse-sessions/${assessment.id}/summary`}
                          className={styles.secondaryButton}
                        >
                          View Detailed Report <ChevronRight size={16} />
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Card Metric Grid */}
                  <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", 
                    gap: "16px", 
                    paddingTop: "16px", 
                    borderTop: "1px solid #f1f5f9" 
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ padding: "8px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", color: "#64748b" }}>
                        <Calendar size={16} />
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: "0.725rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>Date Conducted</p>
                        <p style={{ margin: 0, fontSize: "0.875rem", color: "#0f172a", fontWeight: 600 }}>{assessment.date}</p>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ padding: "8px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", color: "#64748b" }}>
                        <Users size={16} />
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: "0.725rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>Students Attempted</p>
                        <p style={{ margin: 0, fontSize: "0.875rem", color: "#0f172a", fontWeight: 600 }}>
                          {assessment.attempted}/{assessment.totalStudents} Students
                        </p>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ padding: "8px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", color: "#00522E" }}>
                        <BarChart2 size={16} />
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: "0.725rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>Avg Score</p>
                        <p style={{ margin: 0, fontSize: "0.875rem", color: "#0f172a", fontWeight: 700 }}>{assessment.avgScore}</p>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ padding: "8px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", color: "#00522E" }}>
                        <Brain size={16} />
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: "0.725rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>Understanding</p>
                        <p style={{ margin: 0, fontSize: "0.875rem", color: "#0f172a", fontWeight: 600 }}>{assessment.understanding}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

