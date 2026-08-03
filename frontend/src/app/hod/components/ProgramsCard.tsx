"use client";

import React, { useState } from "react";
import { Users, GraduationCap, Clock, X } from "lucide-react";
import styles from "../dashboard.module.css";

interface ProgramItem {
  id: string | number;
  code: string;
  name: string;
  studentCount?: number;
  students?: number;
  courseCount?: number;
  faculty?: number;
  degreeLevel?: string;
  duration?: string;
}

interface ProgramsCardProps {
  programsData?: ProgramItem[];
}

const fallbackPrograms: ProgramItem[] = [
  { id: 1, code: "B.Tech", name: "Computer Science & Engineering",      students: 480, faculty: 18, duration: "4 Years" },
  { id: 2, code: "B.Tech", name: "CSE – Artificial Intelligence & ML",  students: 120, faculty: 8,  duration: "4 Years" },
  { id: 3, code: "B.Tech", name: "CSE – Data Science",                  students: 120, faculty: 7,  duration: "4 Years" },
  { id: 4, code: "B.Tech", name: "CSE – Cyber Security",                students: 90,  faculty: 6,  duration: "4 Years" },
  { id: 5, code: "B.Tech", name: "CSE – Internet of Things",            students: 60,  faculty: 5,  duration: "4 Years" },
  { id: 6, code: "M.Tech", name: "Computer Science & Engineering",      students: 60,  faculty: 10, duration: "2 Years" },
  { id: 7, code: "M.Tech", name: "Artificial Intelligence",             students: 30,  faculty: 6,  duration: "2 Years" },
  { id: 8, code: "Ph.D",   name: "Computer Science & Engineering",      students: 22,  faculty: 6,  duration: "3–5 Years" },
];

const INITIAL_VISIBLE = 4;

const degreeColor: Record<string, string> = {
  "B.Tech": styles.degreeBadgeBtech,
  "M.Tech": styles.degreeBadgeMtech,
  "Ph.D":   styles.degreeBadgePhd,
};

function ProgramRow({ prog }: { prog: ProgramItem }) {
  const code = prog.code || prog.degreeLevel || "B.Tech";
  const studentCount = prog.studentCount !== undefined ? prog.studentCount : (prog.students || 0);
  const facultyCount = prog.courseCount !== undefined ? prog.courseCount : (prog.faculty || 0);
  const duration = prog.duration || "4 Years";

  return (
    <div className={styles.programItem}>
      <span className={`${styles.degreeBadge} ${degreeColor[code] ?? ""}`}>
        {code}
      </span>
      <div className={styles.programInfo}>
        <div className={styles.programName}>{prog.name}</div>
        <div className={styles.programMeta}>
          <span><Users size={11} style={{ display: "inline", marginRight: 3 }} />{studentCount} Students</span>
          <span className={styles.programMetaDot}>·</span>
          <span><GraduationCap size={11} style={{ display: "inline", marginRight: 3 }} />{facultyCount} Courses/Faculty</span>
          <span className={styles.programMetaDot}>·</span>
          <span><Clock size={11} style={{ display: "inline", marginRight: 3 }} />{duration}</span>
        </div>
      </div>
      <span className={styles.programStatusActive}>ACTIVE</span>
    </div>
  );
}

export default function ProgramsCard({ programsData }: ProgramsCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const programs = (programsData && programsData.length > 0) ? programsData : fallbackPrograms;

  return (
    <>
      {/* Card */}
      <div className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Department Programs</h2>
          <button
            className={styles.viewAllLink}
            style={{ background: "none", border: "none", cursor: "pointer" }}
            onClick={() => setModalOpen(true)}
          >
            VIEW ALL
          </button>
        </div>

        <div className={styles.programsList}>
          {programs.slice(0, INITIAL_VISIBLE).map((prog) => (
            <ProgramRow key={prog.id} prog={prog} />
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
        >
          <div className={styles.programsModal}>
            {/* Modal header */}
            <div className={styles.modalHeader}>
              <div>
                <h3 className={styles.modalTitle}>All Department Programs</h3>
                <p className={styles.programsModalSubtitle}>{programs.length} programs · Computer Science & Engineering</p>
              </div>
              <button className={styles.modalCloseBtn} onClick={() => setModalOpen(false)} aria-label="Close">
                <X size={18} />
              </button>
            </div>

            {/* Scrollable list */}
            <div className={styles.programsModalBody}>
              {programs.map((prog) => (
                <ProgramRow key={prog.id} prog={prog} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
