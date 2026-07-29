"use client";

import { ArrowRight, MonitorPlay, Banknote, Microscope, Edit2, Trash2 } from "lucide-react";
import styles from "../academic.module.css";
import Link from "next/link";

export interface Program {
  id: string | number;
  name: string;
  department: string;
  degreeLevel?: string;
  duration: string;
  students: string;
  badge: string;
  icon: any;
  iconStyle: string;
  curriculum: string; // "Not Assigned" or a view link
}

export const INITIAL_PROGRAMS: Program[] = [
  // Keeping this empty or as is, I will restore it correctly below. I can just copy the original.
  {
    id: 1,
    name: "B.Tech Computer Science",
    department: "Computer Science",
    duration: "4 Years",
    students: "420 Students",
    badge: "+12%",
    icon: MonitorPlay,
    iconStyle: styles.iconGreen,
    curriculum: "Assigned"
  },
  {
    id: 2,
    name: "MBA Finance & Strategy",
    department: "Business Management",
    duration: "2 Years",
    students: "185 Students",
    badge: "Full",
    icon: Banknote,
    iconStyle: styles.iconRed,
    curriculum: "Assigned"
  },
  {
    id: 3,
    name: "M.Sc Molecular Biology",
    department: "Life Sciences",
    duration: "2 Years",
    students: "94 Students",
    badge: "-3%",
    icon: Microscope,
    iconStyle: styles.iconGray,
    curriculum: "Assigned"
  }
];

interface ProgramTableProps {
  programs: Program[];
  onEdit?: (program: Program) => void;
  onDelete?: (id: string | number) => void;
}

export default function ProgramTable({ programs, onEdit, onDelete }: ProgramTableProps) {
  return (
    <div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>PROGRAM NAME</th>
              <th>DEPARTMENT</th>
              <th>DURATION</th>
              <th>STUDENTS</th>
              <th>CURRICULUM</th>
              <th style={{ textAlign: "right" }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((row) => {
              const Icon = row.icon;
              return (
                <tr key={row.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div className={`${styles.activityIcon} ${row.iconStyle}`}>
                        <Icon size={16} />
                      </div>
                      <div className={styles.subjectTitle} style={{ fontWeight: 600 }}>{row.name}</div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>{row.department}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>{row.duration}</span>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "0.875rem", color: "var(--text-main)", fontWeight: 500 }}>{row.students}</span>
                    </div>
                  </td>
                  <td>
                    {row.curriculum === "Not Assigned" ? (
                      <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Not Assigned</span>
                    ) : (
                      <Link href={`/admin/academic-structure/programs/${row.id}/curriculum`} className={styles.curriculumLink}>
                        View Curriculum <ArrowRight size={14} />
                      </Link>
                    )}
                  </td>
                  <td>
                    <div className={styles.actionsCell}>
                      <button className={styles.iconBtn} aria-label="Edit" onClick={() => onEdit && onEdit(row)}>
                        <Edit2 size={18} />
                      </button>
                      <button className={styles.iconBtn} aria-label="Delete" onClick={() => onDelete && onDelete(row.id)}>
                        <Trash2 size={18} />
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
          Showing {programs.length} of {programs.length} programs
        </div>
        <div className={styles.paginationControls}>
          <button className={styles.pageBtn}>&lt;</button>
          <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
          <button className={styles.pageBtn}>2</button>
          <button className={styles.pageBtn}>3</button>
          <button className={styles.pageBtn}>&gt;</button>
        </div>
      </div>
    </div>
  );
}
