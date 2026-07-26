"use client";

import { Eye, Edit2, Trash2 } from "lucide-react";
import styles from "../academic.module.css";

const MOCK_DATA = [
  {
    id: 1,
    name: "Data Structures & Algorithms",
    category: "Core Computer Science",
    code: "CS201",
    credits: 4,
    department: "Computer Science",
    program: "B.Sc. CS",
    faculty: "Dr. Alan Turing",
    status: "ACTIVE"
  },
  {
    id: 2,
    name: "Financial Management",
    category: "Corporate Finance Track",
    code: "BUS302",
    credits: 3,
    department: "Business Admin",
    program: "MBA",
    faculty: "Prof. Warren B.",
    status: "ACTIVE"
  },
  {
    id: 3,
    name: "Machine Learning",
    category: "Advanced AI Specialization",
    code: "AI401",
    credits: 4,
    department: "Engineering",
    program: "M.Tech AI",
    faculty: "Dr. Grace Hopper",
    status: "DRAFT"
  },
  {
    id: 4,
    name: "Thermodynamics II",
    category: "Mechanical Engineering Core",
    code: "MECH205",
    credits: 3,
    department: "Engineering",
    program: "B.Eng Mech",
    faculty: "Prof. Kelvin N.",
    status: "ARCHIVED"
  }
];

export default function SubjectTable() {
  return (
    <div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>SUBJECT NAME</th>
              <th>CODE</th>
              <th>CREDITS</th>
              <th>DEPARTMENT</th>
              <th>PROGRAM</th>
              <th>FACULTY</th>
              <th>STATUS</th>
              <th style={{ textAlign: "right" }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_DATA.map((row) => (
              <tr key={row.id}>
                <td>
                  <div className={styles.subjectTitle}>{row.name}</div>
                  <div className={styles.subjectSubtitle}>{row.category}</div>
                </td>
                <td className={styles.codeBadge}>{row.code}</td>
                <td className={styles.creditsValue}>{row.credits}</td>
                <td>{row.department}</td>
                <td>{row.program}</td>
                <td>{row.faculty}</td>
                <td>
                  {row.status === "ACTIVE" && <span className={styles.statusActive}>ACTIVE</span>}
                  {row.status === "DRAFT" && <span className={styles.statusDraft}>DRAFT</span>}
                  {row.status === "ARCHIVED" && <span className={styles.statusArchived}>ARCHIVED</span>}
                </td>
                <td>
                  <div className={styles.actionsCell}>
                    <button className={styles.iconBtn} aria-label="View">
                      <Eye size={16} />
                    </button>
                    <button className={styles.iconBtn} aria-label="Edit">
                      <Edit2 size={16} />
                    </button>
                    <button className={styles.iconBtn} aria-label="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <div className={styles.paginationText}>
          Showing <strong>1 to 4</strong> of 128 results
        </div>
        <div className={styles.paginationControls}>
          <button className={styles.pageBtn} style={{ color: "var(--text-muted)" }}>|&lt;</button>
          <button className={styles.pageBtn} style={{ color: "var(--text-muted)" }}>&lt;</button>
          <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
          <button className={styles.pageBtn}>2</button>
          <button className={styles.pageBtn}>3</button>
          <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", margin: "0 4px" }}>...</span>
          <button className={styles.pageBtn}>32</button>
          <button className={styles.pageBtn} style={{ color: "var(--text-main)" }}>&gt;</button>
          <button className={styles.pageBtn} style={{ color: "var(--text-main)" }}>&gt;|</button>
        </div>
      </div>
    </div>
  );
}
