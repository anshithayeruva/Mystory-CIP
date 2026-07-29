"use client";

import React, { useState } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Download, 
  Pencil, 
  X, 
  Calendar, 
  Users, 
  BookOpen, 
  Activity, 
  CheckCircle2,
  Sliders,
  FileSpreadsheet,
  FileText
} from "lucide-react";
import styles from "./reports.module.css";

interface SubjectReport {
  id: string;
  code: string;
  name: string;
  staff: string;
  score: number;
  status: "EXCELLENT" | "ON TRACK" | "NEEDS ATTENTION" | "UNDER REVIEW";
}

const initialSubjectReports: SubjectReport[] = [
  {
    id: "1",
    code: "DS",
    name: "Data Structures & Algorithms",
    staff: "Prof. Rajesh Kumar",
    score: 88,
    status: "EXCELLENT",
  },
  {
    id: "2",
    code: "OS",
    name: "Operating Systems",
    staff: "Dr. Kavitha S.",
    score: 74,
    status: "ON TRACK",
  },
  {
    id: "3",
    code: "DB",
    name: "Database Management",
    staff: "Prof. Amit Shah",
    score: 52,
    status: "NEEDS ATTENTION",
  },
  {
    id: "4",
    code: "CN",
    name: "Computer Networks",
    staff: "Dr. Aruna Sharma",
    score: 83,
    status: "EXCELLENT",
  },
  {
    id: "5",
    code: "AI",
    name: "Artificial Intelligence & ML",
    staff: "Dr. Vikram Singh",
    score: 62,
    status: "UNDER REVIEW",
  },
  {
    id: "6",
    code: "DAA",
    name: "Design & Analysis of Algorithms",
    staff: "Dr. Sneha Roy",
    score: 91,
    status: "EXCELLENT",
  },
  {
    id: "7",
    code: "SE",
    name: "Software Engineering",
    staff: "Prof. Meera Joshi",
    score: 78,
    status: "ON TRACK",
  },
  {
    id: "8",
    code: "WC",
    name: "Web Development & Cloud",
    staff: "Dr. Ananya Reddy",
    score: 85,
    status: "EXCELLENT",
  },
  {
    id: "9",
    code: "CS",
    name: "Cyber Security & Cryptography",
    staff: "Prof. Sunita Patil",
    score: 58,
    status: "NEEDS ATTENTION",
  },
  {
    id: "10",
    code: "CD",
    name: "Compiler Design",
    staff: "Dr. Manoj Verma",
    score: 72,
    status: "ON TRACK",
  },
  {
    id: "11",
    code: "DM",
    name: "Discrete Mathematics",
    staff: "Prof. R. C. Rao",
    score: 68,
    status: "ON TRACK",
  },
  {
    id: "12",
    code: "CA",
    name: "Computer Architecture",
    staff: "Dr. Alok Nath",
    score: 64,
    status: "UNDER REVIEW",
  },
];

export default function HodReportsPage() {
  // State for metrics
  const [metrics, setMetrics] = useState({
    understanding: 82.4,
    understandingTrend: "+4.2%",
    attendance: 94.8,
    attendanceTrend: "-1.5%",
    activeEngagement: 452,
  });

  // Semester Selector
  const [selectedSemester, setSelectedSemester] = useState("This Semester");

  // Subject performance list state
  const [subjectReports, setSubjectReports] = useState<SubjectReport[]>(initialSubjectReports);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllSubjects, setShowAllSubjects] = useState(false);

  // Edit Subject Modal
  const [editingSubject, setEditingSubject] = useState<SubjectReport | null>(null);
  const [subjectFormData, setSubjectFormData] = useState({
    staff: "",
    score: 80,
    status: "ON TRACK" as SubjectReport["status"],
  });

  // Edit KPI Metrics Modal
  const [isKpiModalOpen, setIsKpiModalOpen] = useState(false);
  const [kpiFormData, setKpiFormData] = useState({
    understanding: 82.4,
    attendance: 94.8,
    activeEngagement: 452,
  });

  // Export Modal
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<"PDF" | "CSV">("PDF");

  // Mastery Detail Modal
  const [isMasteryModalOpen, setIsMasteryModalOpen] = useState(false);

  // Filtering & Display Slice
  const filteredSubjects = subjectReports.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.staff.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedSubjects = showAllSubjects ? filteredSubjects : filteredSubjects.slice(0, 5);

  const handleOpenEditSubject = (item: SubjectReport) => {
    setEditingSubject(item);
    setSubjectFormData({
      staff: item.staff,
      score: item.score,
      status: item.status,
    });
  };

  const handleSaveSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSubject) return;

    setSubjectReports((prev) =>
      prev.map((s) =>
        s.id === editingSubject.id
          ? {
              ...s,
              staff: subjectFormData.staff,
              score: Number(subjectFormData.score),
              status: subjectFormData.status,
            }
          : s
      )
    );
    setEditingSubject(null);
  };

  const handleSaveKpis = (e: React.FormEvent) => {
    e.preventDefault();
    setMetrics((prev) => ({
      ...prev,
      understanding: Number(kpiFormData.understanding),
      attendance: Number(kpiFormData.attendance),
      activeEngagement: Number(kpiFormData.activeEngagement),
    }));
    setIsKpiModalOpen(false);
  };

  const getStatusBadge = (status: SubjectReport["status"]) => {
    switch (status) {
      case "EXCELLENT":
        return styles.statusExcellent;
      case "ON TRACK":
        return styles.statusOnTrack;
      case "NEEDS ATTENTION":
      case "UNDER REVIEW":
        return styles.statusAttention;
      default:
        return styles.statusOnTrack;
    }
  };

  return (
    <div className={styles.reportsContainer}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <div className={styles.titleArea}>
          <h1 className={styles.pageTitle}>Department Analytics</h1>
          <p className={styles.pageSubtitle}>
            Real-time performance metrics and student engagement reports.
          </p>
        </div>

        <div className={styles.headerActions}>
          <button 
            className={styles.semSelectBtn}
            onClick={() => {
              const options = ["This Semester", "Fall 2024", "Spring 2024", "Academic Year 2023-24"];
              const currentIndex = options.indexOf(selectedSemester);
              const nextIndex = (currentIndex + 1) % options.length;
              setSelectedSemester(options[nextIndex]);
            }}
            title="Click to switch academic term"
          >
            <Calendar size={15} />
            <span>{selectedSemester}</span>
          </button>

          <button 
            className={styles.semSelectBtn}
            onClick={() => {
              setKpiFormData({
                understanding: metrics.understanding,
                attendance: metrics.attendance,
                activeEngagement: metrics.activeEngagement,
              });
              setIsKpiModalOpen(true);
            }}
            title="Tune Department KPI Targets"
          >
            <Sliders size={15} />
            <span>Edit Metrics</span>
          </button>

          <button 
            className={styles.exportBtn}
            onClick={() => setIsExportModalOpen(true)}
          >
            <Download size={16} />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Cards Grid */}
      <div className={styles.kpiGrid}>
        <div className={styles.kpiCard}>
          <div className={styles.kpiCardTop}>
            <div className={styles.kpiIconWrapper}>
              <BookOpen size={20} />
            </div>
            <span className={styles.kpiBadgeUp}>
              <TrendingUp size={12} /> {metrics.understandingTrend}
            </span>
          </div>
          <div className={styles.kpiMeta}>
            <span className={styles.kpiLabel}>DEPT UNDERSTANDING</span>
            <div className={styles.kpiValueRow}>
              <span className={styles.kpiValue}>{metrics.understanding}%</span>
            </div>
            <span className={styles.kpiSubtext}>Avg. concept mastery across all courses.</span>
          </div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiCardTop}>
            <div className={styles.kpiIconWrapper}>
              <Users size={20} />
            </div>
            <span className={styles.kpiBadgeDown}>
              <TrendingDown size={12} /> {metrics.attendanceTrend}
            </span>
          </div>
          <div className={styles.kpiMeta}>
            <span className={styles.kpiLabel}>ATTENDANCE RATE</span>
            <div className={styles.kpiValueRow}>
              <span className={styles.kpiValue}>{metrics.attendance}%</span>
            </div>
            <span className={styles.kpiSubtext}>Current semester department average.</span>
          </div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiCardTop}>
            <div className={styles.kpiIconWrapper}>
              <Activity size={20} />
            </div>
            <span className={styles.kpiBadgeTrack}>
              <CheckCircle2 size={12} /> On Track
            </span>
          </div>
          <div className={styles.kpiMeta}>
            <span className={styles.kpiLabel}>ACTIVE ENGAGEMENT</span>
            <div className={styles.kpiValueRow}>
              <span className={styles.kpiValue}>{metrics.activeEngagement}</span>
            </div>
            <span className={styles.kpiSubtext}>Students active in the last 24 hours.</span>
          </div>
        </div>
      </div>

      {/* Analytics Charts & Mastery Distribution Row */}
      <div className={styles.analysisRow}>
        {/* Left Card: Understanding Trend SVG Chart */}
        <div className={styles.trendCard}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitleGroup}>
              <h3 className={styles.cardTitle}>Understanding Trend</h3>
              <p className={styles.cardSubtitle}>
                Aggregated concept mastery over the current month.
              </p>
            </div>
            <div className={styles.legendPill}>
              <span className={styles.legendDot}></span>
              <span>This Month</span>
            </div>
          </div>

          <div className={styles.svgTrendWrapper}>
            <svg className={styles.svgTrend} viewBox="0 0 500 150" preserveAspectRatio="none">
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00522E" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#00522E" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 10,110 Q 120,95 240,65 T 370,70 T 490,30 L 490,140 L 10,140 Z"
                fill="url(#areaGradient)"
              />
              <path
                d="M 10,110 Q 120,95 240,65 T 370,70 T 490,30"
                fill="none"
                stroke="#00522E"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Plot Data Dots */}
              <circle cx="10" cy="110" r="4" fill="#00522E" />
              <circle cx="170" cy="80" r="4" fill="#00522E" />
              <circle cx="330" cy="72" r="4" fill="#00522E" />
              <circle cx="490" cy="30" r="5" fill="#00522E" stroke="#ffffff" strokeWidth="2" />
            </svg>
          </div>

          <div className={styles.trendXAxis}>
            <span>Week 1</span>
            <span>Week 2</span>
            <span>Week 3</span>
            <span>Week 4</span>
          </div>
        </div>

        {/* Right Card: Mastery Distribution Progress Bars */}
        <div className={styles.masteryCard}>
          <div className={styles.cardTitleGroup}>
            <h3 className={styles.cardTitle}>Mastery Distribution</h3>
            <p className={styles.cardSubtitle}>
              Student categorization based on assessment scores.
            </p>
          </div>



          <div className={styles.masteryList}>
            <div className={styles.masteryItem}>
              <div className={styles.masteryTop}>
                <span className={styles.masteryLabel} style={{ color: "#00522e" }}>
                  Advanced (85-100%)
                </span>
                <span className={styles.masteryCount}>124 students</span>
              </div>
              <div className={styles.masteryBarBg}>
                <div className={styles.masteryBarFill} style={{ width: "32%", backgroundColor: "#00522e" }} />
              </div>
            </div>

            <div className={styles.masteryItem}>
              <div className={styles.masteryTop}>
                <span className={styles.masteryLabel} style={{ color: "#166534" }}>
                  Proficient (60-84%)
                </span>
                <span className={styles.masteryCount}>240 students</span>
              </div>
              <div className={styles.masteryBarBg}>
                <div className={styles.masteryBarFill} style={{ width: "61%", backgroundColor: "#166534" }} />
              </div>
            </div>

            <div className={styles.masteryItem}>
              <div className={styles.masteryTop}>
                <span className={styles.masteryLabel} style={{ color: "#b45309" }}>
                  Developing (40-59%)
                </span>
                <span className={styles.masteryCount}>68 students</span>
              </div>
              <div className={styles.masteryBarBg}>
                <div className={styles.masteryBarFill} style={{ width: "17%", backgroundColor: "#b45309" }} />
              </div>
            </div>

            <div className={styles.masteryItem}>
              <div className={styles.masteryTop}>
                <span className={styles.masteryLabel} style={{ color: "#991b1b" }}>
                  Critical (&lt; 40%)
                </span>
                <span className={styles.masteryCount}>20 students</span>
              </div>
              <div className={styles.masteryBarBg}>
                <div className={styles.masteryBarFill} style={{ width: "5%", backgroundColor: "#991b1b" }} />
              </div>
            </div>
          </div>

          <button 
            className={styles.viewDetailedBtn}
            onClick={() => setIsMasteryModalOpen(true)}
          >
            View Detailed List
          </button>
        </div>
      </div>

      {/* Subject-wise Performance Section */}
      <div className={styles.subjectsSection}>
        <div className={styles.tableToolbar}>
          <div className={styles.cardTitleGroup}>
            <h3 className={styles.cardTitle}>Subject-wise Performance</h3>
          </div>

          <div className={styles.tableSearchWrapper}>
            <Search size={16} style={{ color: "#64748b" }} />
            <input
              type="text"
              placeholder="Search subjects..."
              className={styles.tableSearchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Subject Name</th>
                <th>Staff In-charge</th>
                <th>Avg. Score</th>
                <th>Status</th>
                <th style={{ textAlign: "right", paddingRight: "20px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedSubjects.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className={styles.subjectBadgeCell}>
                      <div className={styles.avatarCode}>{item.code}</div>
                      <span className={styles.subjectName}>{item.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className={styles.staffName}>{item.staff}</span>
                  </td>
                  <td>
                    <span className={item.score < 60 ? styles.scoreValLow : styles.scoreVal}>
                      {item.score}%
                    </span>
                  </td>
                  <td>
                    <span className={getStatusBadge(item.status)}>{item.status}</span>
                  </td>
                  <td style={{ textAlign: "right", paddingRight: "20px" }}>
                    <button 
                      className={styles.actionBtn}
                      title={`Edit ${item.name}`}
                      onClick={() => handleOpenEditSubject(item)}
                    >
                      <Pencil size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.tableFooter}>
          <span>Showing {displayedSubjects.length} of {filteredSubjects.length} active subjects</span>
          <button 
            className={styles.viewAllBtn}
            onClick={() => setShowAllSubjects(!showAllSubjects)}
          >
            {showAllSubjects ? "SHOW LESS ↑" : "VIEW ALL SUBJECT REPORTS →"}
          </button>
        </div>
      </div>

      {/* EDIT SUBJECT MODAL */}
      {editingSubject && (
        <div className={styles.modalOverlay} onClick={() => setEditingSubject(null)}>
          <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Edit Subject Performance</h3>
              <button 
                className={styles.closeModalBtn} 
                onClick={() => setEditingSubject(null)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveSubject}>
              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Subject Name</label>
                  <input
                    type="text"
                    disabled
                    className={styles.formInput}
                    value={`${editingSubject.code} - ${editingSubject.name}`}
                    style={{ backgroundColor: "#f8fafc", color: "#64748b" }}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Staff In-charge *</label>
                  <input
                    type="text"
                    required
                    className={styles.formInput}
                    value={subjectFormData.staff}
                    onChange={(e) => setSubjectFormData((prev) => ({ ...prev, staff: e.target.value }))}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Average Concept Score (%) *</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    className={styles.formInput}
                    value={subjectFormData.score}
                    onChange={(e) => setSubjectFormData((prev) => ({ ...prev, score: Number(e.target.value) }))}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Performance Status *</label>
                  <select
                    className={styles.formSelect}
                    value={subjectFormData.status}
                    onChange={(e) =>
                      setSubjectFormData((prev) => ({
                        ...prev,
                        status: e.target.value as SubjectReport["status"],
                      }))
                    }
                  >
                    <option value="EXCELLENT">EXCELLENT</option>
                    <option value="ON TRACK">ON TRACK</option>
                    <option value="NEEDS ATTENTION">NEEDS ATTENTION</option>
                    <option value="UNDER REVIEW">UNDER REVIEW</option>
                  </select>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.cancelModalBtn}
                  onClick={() => setEditingSubject(null)}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.submitModalBtn}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT KPI METRICS MODAL */}
      {isKpiModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsKpiModalOpen(false)}>
          <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Edit Department KPI Targets</h3>
              <button 
                className={styles.closeModalBtn} 
                onClick={() => setIsKpiModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveKpis}>
              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Dept Understanding Avg (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    className={styles.formInput}
                    value={kpiFormData.understanding}
                    onChange={(e) => setKpiFormData((prev) => ({ ...prev, understanding: Number(e.target.value) }))}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Attendance Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    className={styles.formInput}
                    value={kpiFormData.attendance}
                    onChange={(e) => setKpiFormData((prev) => ({ ...prev, attendance: Number(e.target.value) }))}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Active Engagement Count</label>
                  <input
                    type="number"
                    required
                    className={styles.formInput}
                    value={kpiFormData.activeEngagement}
                    onChange={(e) => setKpiFormData((prev) => ({ ...prev, activeEngagement: Number(e.target.value) }))}
                  />
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.cancelModalBtn}
                  onClick={() => setIsKpiModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.submitModalBtn}>
                  Update Metrics
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EXPORT PDF / CSV MODAL */}
      {isExportModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsExportModalOpen(false)}>
          <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Export Department Analytics</h3>
              <button className={styles.closeModalBtn} onClick={() => setIsExportModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <p style={{ fontSize: "0.875rem", color: "#64748b", margin: 0 }}>
                Select format to download institutional compliance & performance audit reports.
              </p>

              <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                <button
                  type="button"
                  style={{
                    flex: 1,
                    padding: "12px",
                    border: exportFormat === "PDF" ? "2px solid #00522e" : "1px solid #cbd5e1",
                    borderRadius: "8px",
                    backgroundColor: exportFormat === "PDF" ? "#e6f4ea" : "#ffffff",
                    color: exportFormat === "PDF" ? "#00522e" : "#475569",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                  onClick={() => setExportFormat("PDF")}
                >
                  <FileText size={18} /> PDF Report
                </button>

                <button
                  type="button"
                  style={{
                    flex: 1,
                    padding: "12px",
                    border: exportFormat === "CSV" ? "2px solid #00522e" : "1px solid #cbd5e1",
                    borderRadius: "8px",
                    backgroundColor: exportFormat === "CSV" ? "#e6f4ea" : "#ffffff",
                    color: exportFormat === "CSV" ? "#00522e" : "#475569",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                  onClick={() => setExportFormat("CSV")}
                >
                  <FileSpreadsheet size={18} /> CSV Spreadsheet
                </button>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                type="button"
                className={styles.cancelModalBtn}
                onClick={() => setIsExportModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className={styles.submitModalBtn}
                onClick={() => {
                  alert(`Downloading ${selectedSemester} Department Analytics Report (${exportFormat})...`);
                  setIsExportModalOpen(false);
                }}
              >
                Download Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MASTERY DETAIL MODAL */}
      {isMasteryModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsMasteryModalOpen(false)}>
          <div className={styles.modalContainer} style={{ maxWidth: "600px" }} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Mastery Distribution Detail</h3>
              <button className={styles.closeModalBtn} onClick={() => setIsMasteryModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>
                Breakdown of 452 total evaluated students across all active courses:
              </p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", backgroundColor: "#f0fdf4", borderRadius: "8px", borderLeft: "4px solid #16a34a" }}>
                  <span style={{ fontWeight: 700, color: "#16a34a" }}>Advanced Mastery (85% – 100%)</span>
                  <span style={{ fontWeight: 800, color: "#0f172a" }}>124 Students (27.4%)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", backgroundColor: "#e6f4ea", borderRadius: "8px", borderLeft: "4px solid #00522e" }}>
                  <span style={{ fontWeight: 700, color: "#00522e" }}>Proficient (60% – 84%)</span>
                  <span style={{ fontWeight: 800, color: "#0f172a" }}>240 Students (53.1%)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", backgroundColor: "#fffbeb", borderRadius: "8px", borderLeft: "4px solid #d97706" }}>
                  <span style={{ fontWeight: 700, color: "#b45309" }}>Developing (40% – 59%)</span>
                  <span style={{ fontWeight: 800, color: "#0f172a" }}>68 Students (15.0%)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", backgroundColor: "#fef2f2", borderRadius: "8px", borderLeft: "4px solid #dc2626" }}>
                  <span style={{ fontWeight: 700, color: "#b91c1c" }}>Critical Attention (&lt; 40%)</span>
                  <span style={{ fontWeight: 800, color: "#0f172a" }}>20 Students (4.5%)</span>
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                type="button"
                className={styles.submitModalBtn}
                onClick={() => setIsMasteryModalOpen(false)}
              >
                Close Breakdown
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
