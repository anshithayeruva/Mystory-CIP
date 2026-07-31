"use client";

import React, { useState } from "react";
import { 
  FileCheck2, 
  Clock, 
  Award, 
  Upload, 
  Search, 
  X,
  AlertCircle
} from "lucide-react";
import styles from "../student.module.css";
import { STUDENT_ASSIGNMENTS, Assignment } from "../mockData";

export default function StudentAssignmentsPage() {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [submissionFile, setSubmissionFile] = useState<File | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const pendingCount = STUDENT_ASSIGNMENTS.filter(a => a.status === "PENDING").length;
  const submittedCount = STUDENT_ASSIGNMENTS.filter(a => a.status === "SUBMITTED").length;
  const gradedCount = STUDENT_ASSIGNMENTS.filter(a => a.status === "GRADED").length;
  const overdueCount = STUDENT_ASSIGNMENTS.filter(a => a.status === "OVERDUE").length;

  const filteredAssignments = STUDENT_ASSIGNMENTS.filter(a => {
    const matchesStatus = statusFilter === "ALL" || a.status === statusFilter;
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          a.courseCode.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionFile) return;
    setSubmissionSuccess(true);
    setTimeout(() => {
      setSubmissionSuccess(false);
      setSelectedAssignment(null);
    }, 2000);
  };

  return (
    <div className={styles.pageContainer}>
      {/* Admin Clean Banner */}
      <div className={styles.welcomeBanner}>
        <div>
          <h1 className={styles.welcomeTitle}>Assignments & Projects</h1>
          <p className={styles.welcomeSubtitle}>
            Track assignment deadlines, submit coursework online, and review faculty feedback.
          </p>
        </div>
        <div className={styles.bannerMeta}>
          <div className={styles.metaPill}>
            {pendingCount} Pending
          </div>
        </div>
      </div>

      {/* 4 Summary Cards (Admin Restrained Theme) */}
      <div className={styles.kpiGrid}>
        <div className={styles.kpiCard}>
          <div className={styles.kpiIconBox}>
            <Clock size={20} />
          </div>
          <div>
            <div className={styles.kpiValue}>{pendingCount}</div>
            <div className={styles.kpiLabel}>Pending Assignments</div>
          </div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiIconBox}>
            <FileCheck2 size={20} />
          </div>
          <div>
            <div className={styles.kpiValue}>{submittedCount}</div>
            <div className={styles.kpiLabel}>Submitted</div>
          </div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiIconBox}>
            <Award size={20} />
          </div>
          <div>
            <div className={styles.kpiValue}>{gradedCount}</div>
            <div className={styles.kpiLabel}>Graded</div>
          </div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiIconBox}>
            <AlertCircle size={20} />
          </div>
          <div>
            <div className={styles.kpiValue}>{overdueCount}</div>
            <div className={styles.kpiLabel}>Overdue</div>
          </div>
        </div>
      </div>

      {/* Filters & Table */}
      <div className={styles.card}>
        <div className={styles.filterBar}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
            <input
              type="text"
              placeholder="Search assignment title or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.filterInput}
              style={{ paddingLeft: 36 }}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="GRADED">Graded</option>
            <option value="OVERDUE">Overdue</option>
          </select>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Assignment Name</th>
                <th>Course</th>
                <th>Due Date</th>
                <th>Max Marks</th>
                <th>Status</th>
                <th>Marks / Grade</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssignments.map((asg) => (
                <tr key={asg.id}>
                  <td style={{ fontWeight: 600, color: "#0f172a" }}>{asg.title}</td>
                  <td>{asg.courseCode}</td>
                  <td style={{ color: asg.daysRemaining <= 2 && asg.status === "PENDING" ? "#b91c1c" : "#64748b", fontWeight: 600 }}>
                    {asg.dueDate} ({asg.daysRemaining === 0 ? "Today" : `${asg.daysRemaining}d left`})
                  </td>
                  <td>{asg.maxMarks}</td>
                  <td>
                    <span className={
                      asg.status === "GRADED" ? styles.badgeCompleted :
                      asg.status === "SUBMITTED" ? styles.badgeUpcoming :
                      styles.badgeLive
                    }>
                      {asg.status}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700, color: "#0f172a" }}>
                    {asg.obtainedMarks !== undefined ? `${asg.obtainedMarks} / ${asg.maxMarks}` : "—"}
                  </td>
                  <td>
                    <button
                      className={asg.status === "PENDING" || asg.status === "OVERDUE" ? styles.btnPrimary : styles.btnSecondary}
                      onClick={() => setSelectedAssignment(asg)}
                      style={{ padding: "4px 12px", fontSize: "0.75rem" }}
                    >
                      {asg.status === "SUBMITTED" || asg.status === "GRADED" ? "View" : "Submit"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assignment Detail & Submission Modal */}
      {selectedAssignment && (
        <div className={styles.modalOverlay} onClick={() => setSelectedAssignment(null)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#00522E" }}>{selectedAssignment.courseCode}</span>
                <h3 className={styles.modalTitle}>{selectedAssignment.title}</h3>
              </div>
              <button className={styles.modalCloseBtn} onClick={() => setSelectedAssignment(null)}>
                <X size={18} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", padding: "10px 12px", backgroundColor: "#f8fafc", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                <div>
                  <div style={{ fontSize: "0.68rem", color: "#64748b", fontWeight: 600 }}>FACULTY</div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f172a" }}>{selectedAssignment.faculty}</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.68rem", color: "#64748b", fontWeight: 600 }}>DUE DATE</div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#b91c1c" }}>{selectedAssignment.dueDate} {selectedAssignment.dueTime}</div>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>Instructions</h4>
                <p style={{ fontSize: "0.82rem", color: "#334155", lineHeight: 1.5, margin: 0 }}>
                  {selectedAssignment.instructions}
                </p>
              </div>

              {/* Faculty Feedback Section for Graded Assignments */}
              {selectedAssignment.status === "GRADED" && (
                <div style={{ padding: "12px", backgroundColor: "#e9f2ee", border: "1px solid #c9e0d3", borderRadius: "6px" }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#00522E", marginBottom: "2px" }}>
                    Faculty Evaluation ({selectedAssignment.obtainedMarks} / {selectedAssignment.maxMarks} Marks)
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "#1e293b" }}>
                    "{selectedAssignment.feedback}"
                  </div>
                </div>
              )}

              {/* Submitted Work Info Section */}
              {(selectedAssignment.status === "SUBMITTED" || selectedAssignment.status === "GRADED") && (
                <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>Submission Details</h4>
                  <div style={{ padding: "12px", backgroundColor: "#f8fafc", borderRadius: "6px", border: "1px solid #e2e8f0", fontSize: "0.82rem", display: "flex", flexDirection: "column", gap: "6px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ color: "#64748b", fontWeight: 600 }}>Attached File:</span>
                      <span style={{ fontWeight: 700, color: "#00522E" }}>{selectedAssignment.fileAttachment || "solution_submission.pdf"}</span>
                    </div>
                    {selectedAssignment.submissionDate && (
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ color: "#64748b", fontWeight: 600 }}>Submitted On:</span>
                        <span style={{ color: "#0f172a", fontWeight: 600 }}>{selectedAssignment.submissionDate}</span>
                      </div>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ color: "#64748b", fontWeight: 600 }}>Status:</span>
                      <span style={{ fontWeight: 700, color: selectedAssignment.status === "GRADED" ? "#00522E" : "#2563eb" }}>
                        {selectedAssignment.status === "GRADED" ? `GRADED (${selectedAssignment.obtainedMarks}/${selectedAssignment.maxMarks})` : "SUBMITTED - AWAITING GRADING"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Upload Submission Form for Pending / Overdue Assignments */}
              {(selectedAssignment.status === "PENDING" || selectedAssignment.status === "OVERDUE") && (
                <form onSubmit={handleUploadSubmit} style={{ borderTop: "1px solid #e2e8f0", paddingTop: "14px" }}>
                  <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>Upload Solution File</h4>
                  <input
                    type="file"
                    onChange={(e) => setSubmissionFile(e.target.files?.[0] || null)}
                    style={{ fontSize: "0.82rem", marginBottom: "12px" }}
                  />
                  {submissionSuccess ? (
                    <div style={{ color: "#00522E", fontWeight: 700, fontSize: "0.82rem" }}>
                      ✓ Assignment submitted successfully!
                    </div>
                  ) : (
                    <button type="submit" className={styles.btnPrimary} disabled={!submissionFile}>
                      <Upload size={14} /> Submit Work
                    </button>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
