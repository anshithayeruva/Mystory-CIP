"use client";

import { Eye, Edit2, Code, FileDigit, FlaskConical, BookOpen } from "lucide-react";
import styles from "../academic.module.css";

export interface Department {
  id: number;
  name: string;
  hodName: string;
  programs: number;
  faculty: number;
  students: number;
  icon: any; // Lucide icon component
}

export const INITIAL_DEPARTMENTS: Department[] = [
  {
    id: 1,
    name: "Computer Science",
    hodName: "Dr. Alan Turing",
    programs: 4,
    faculty: 42,
    students: 820,
    icon: Code
  },
  {
    id: 2,
    name: "Mathematics",
    hodName: "Dr. Katherine Johnson",
    programs: 3,
    faculty: 28,
    students: 450,
    icon: FileDigit
  },
  {
    id: 3,
    name: "Bio-Engineering",
    hodName: "Dr. Jennifer Doudna",
    programs: 5,
    faculty: 35,
    students: 580,
    icon: FlaskConical
  },
  {
    id: 4,
    name: "Theoretical Physics",
    hodName: "Dr. Richard Feynman",
    programs: 2,
    faculty: 18,
    students: 210,
    icon: BookOpen
  }
];

interface DepartmentTableProps {
  departments: Department[];
}

export default function DepartmentTable({ departments }: DepartmentTableProps) {
  return (
    <div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Department Name</th>
              <th>Head of Department</th>
              <th>Faculty Count</th>
              <th>Student Count</th>
              <th>Programs</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((row) => {
              const Icon = row.icon;
              return (
                <tr key={row.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div className={styles.deptIconBadge}>
                        <Icon size={16} />
                      </div>
                      <div className={styles.subjectTitle}>{row.name}</div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: "0.875rem", color: "var(--text-main)" }}>{row.hodName}</span>
                  </td>
                  <td>
                    <span className={styles.facultyBadge}>{row.faculty} Faculty</span>
                  </td>
                  <td>
                    <span style={{ fontSize: "0.875rem", color: "var(--text-main)" }}>{row.students} Students</span>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.875rem", color: "var(--text-main)" }}>
                      <span style={{ color: "var(--text-muted)" }}>☰</span> {row.programs} Programs
                    </div>
                  </td>
                  <td>
                    <div className={styles.actionsCell}>
                      <button className={styles.iconBtn} aria-label="View">
                        <Eye size={18} />
                      </button>
                      <button className={styles.iconBtn} aria-label="Edit">
                        <Edit2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <div className={styles.paginationText}>
          Showing {departments.length} of {departments.length} Departments
        </div>
        <div className={styles.paginationControls}>
          <button className={styles.pageBtn}>&lt;</button>
          <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
          <button className={styles.pageBtn}>2</button>
          <button className={styles.pageBtn}>&gt;</button>
        </div>
      </div>
    </div>
  );
}
