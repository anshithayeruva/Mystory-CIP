"use client";

import { Eye, Edit2, Trash2 } from "lucide-react";
import styles from "../academic.module.css";

const MOCK_DATA = [
  {
    id: 1,
    name: "Computer Science & Engineering",
    code: "CSE-01",
    hodInitials: "AK",
    hodName: "Dr. Alan Turing",
    programs: 12,
    faculty: 45,
    students: 850,
    status: "ACTIVE"
  },
  {
    id: 2,
    name: "Molecular Biotechnology",
    code: "MBT-04",
    hodInitials: "RC",
    hodName: "Dr. Rosalind Franklin",
    programs: 6,
    faculty: 22,
    students: 320,
    status: "ACTIVE"
  },
  {
    id: 3,
    name: "Structural Engineering",
    code: "STE-09",
    hodInitials: "EL",
    hodName: "Prof. Emily Levesque",
    programs: 8,
    faculty: 18,
    students: 410,
    status: "PENDING"
  },
  {
    id: 4,
    name: "Department of Mathematics",
    code: "MAT-02",
    hodInitials: "GH",
    hodName: "Prof. Godfrey Hardy",
    programs: 15,
    faculty: 30,
    students: 540,
    status: "INACTIVE"
  }
];

export default function DepartmentTable() {
  return (
    <div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>DEPARTMENT NAME</th>
              <th>CODE</th>
              <th>HOD</th>
              <th>PROGRAMS</th>
              <th>FACULTY</th>
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
                </td>
                <td className={styles.codeBadge}>{row.code}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ 
                      width: "28px", height: "28px", borderRadius: "50%", backgroundColor: "#e2e8f0", 
                      display: "flex", alignItems: "center", justifyContent: "center", 
                      fontSize: "0.6rem", fontWeight: 700, color: "#475569" 
                    }}>
                      {row.hodInitials}
                    </div>
                    <span style={{ fontSize: "0.75rem" }}>{row.hodName}</span>
                  </div>
                </td>
                <td>{row.programs}</td>
                <td>{row.faculty}</td>
                <td>{row.students}</td>
                <td>
                  {row.status === "ACTIVE" && <span className={styles.statusActive}>Active</span>}
                  {row.status === "PENDING" && <span className={styles.statusDraft}>Pending</span>}
                  {row.status === "INACTIVE" && <span className={styles.statusArchived}>Inactive</span>}
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
          Showing <strong>1 to 4</strong> of 24 departments
        </div>
        <div className={styles.paginationControls}>
          <button className={styles.pageBtn} style={{ color: "var(--text-muted)" }}>&lt;</button>
          <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
          <button className={styles.pageBtn}>2</button>
          <button className={styles.pageBtn}>3</button>
          <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", margin: "0 4px" }}>...</span>
          <button className={styles.pageBtn}>6</button>
          <button className={styles.pageBtn} style={{ color: "var(--text-main)" }}>&gt;</button>
        </div>
      </div>
    </div>
  );
}
