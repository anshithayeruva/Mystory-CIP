"use client";

import { Eye, Edit2, Trash2 } from "lucide-react";
import styles from "../academic.module.css";

const MOCK_DATA = [
  {
    id: 1,
    name: "B.Sc. Computer Science",
    category: "Undergraduate Program",
    code: "BCS-2024",
    department: "School of Engineering",
    duration: "4 Years",
    students: "1,240",
    status: "ACTIVE"
  },
  {
    id: 2,
    name: "M.A. Global Economics",
    category: "Postgraduate Program",
    code: "MGE-2024",
    department: "Business School",
    duration: "2 Years",
    students: "450",
    status: "DRAFT"
  },
  {
    id: 3,
    name: "B.Eng. Civil Engineering",
    category: "Undergraduate Program",
    code: "BCE-2024",
    department: "School of Engineering",
    duration: "4 Years",
    students: "890",
    status: "ACTIVE"
  },
  {
    id: 4,
    name: "MBA Strategic Management",
    category: "Professional Masters",
    code: "MBA-2024",
    department: "Business School",
    duration: "1 Year",
    students: "210",
    status: "ARCHIVED"
  }
];

export default function ProgramTable() {
  return (
    <div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>PROGRAM NAME</th>
              <th>PROGRAM CODE</th>
              <th>DEPARTMENT</th>
              <th>DURATION</th>
              <th>STUDENTS</th>
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
                <td>{row.department}</td>
                <td>{row.duration}</td>
                <td>{row.students}</td>
                <td>
                  {row.status === "ACTIVE" && <span className={styles.statusActive}>Active</span>}
                  {row.status === "DRAFT" && <span className={styles.statusDraft}>Draft</span>}
                  {row.status === "ARCHIVED" && <span className={styles.statusArchived}>Archived</span>}
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
          Showing <strong>1 to 10</strong> of 156 results
        </div>
        <div className={styles.paginationControls}>
          <button className={styles.pageBtn} style={{ color: "var(--text-muted)" }}>&lt;</button>
          <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
          <button className={styles.pageBtn}>2</button>
          <button className={styles.pageBtn}>3</button>
          <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", margin: "0 4px" }}>...</span>
          <button className={styles.pageBtn}>16</button>
          <button className={styles.pageBtn} style={{ color: "var(--text-main)" }}>&gt;</button>
        </div>
      </div>
    </div>
  );
}
