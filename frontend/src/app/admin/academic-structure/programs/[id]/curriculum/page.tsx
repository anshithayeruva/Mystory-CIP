"use client";

import Link from "next/link";
import { Building2, Clock, FileText, Printer, FileDown, Lock, ShieldCheck } from "lucide-react";
import styles from "./curriculum.module.css";

export default function CurriculumPage({}) {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.breadcrumb}>
        <Link href="/admin">Dashboard</Link>
        <span>&gt;</span>
        <Link href="/admin/academic-structure">Academics</Link>
        <span>&gt;</span>
        <Link href="/admin/academic-structure">Programs</Link>
        <span>&gt;</span>
        <span className={styles.active}>B.Tech Computer Science Curriculum</span>
      </div>

      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>B.Tech Computer Science</h1>
          <div className={styles.metaRow}>
            <div className={styles.metaItem}>
              <Building2 size={16} />
              <span>Department: <strong>Computer Science</strong></span>
            </div>
            <div className={styles.metaItem}>
              <Clock size={16} />
              <span>Duration: <strong>4 Years</strong></span>
            </div>
            <div className={styles.metaItem}>
              <FileText size={16} />
              <span>Total Credits: <strong>160</strong></span>
            </div>
          </div>
        </div>
        <div className={styles.actions}>
          <button className={styles.printBtn}>
            <Printer size={16} />
            Print
          </button>
          <button className={styles.downloadBtn}>
            <FileDown size={16} />
            Download Curriculum<br />PDF
          </button>
        </div>
      </div>

      {/* Academic Year I */}
      <div className={styles.timelineYear}>
        <div className={styles.yearHeader}>
          <div className={styles.yearBadge}>1</div>
          <h2 className={styles.yearTitle}>Academic Year I</h2>
          <div className={styles.yearLine}></div>
        </div>

        <div className={styles.semesterGrid}>
          {/* Semester I */}
          <div className={styles.semesterCard}>
            <div className={styles.semesterHeader}>SEMESTER I</div>
            <div className={styles.courseList}>
              <div className={styles.courseItem}>
                <div className={styles.courseTop}>
                  <span className={styles.courseTitle}>CS101 - Programming Fundamentals</span>
                  <span className={styles.creditsBadge}>4.0 Credits</span>
                </div>
                <span className={styles.courseCategory}>Core Computer Science</span>
              </div>
              <div className={styles.courseItem}>
                <div className={styles.courseTop}>
                  <span className={styles.courseTitle}>MA101 - Calculus I</span>
                  <span className={styles.creditsBadge}>3.0 Credits</span>
                </div>
                <span className={styles.courseCategory}>Mathematics & Basic Sciences</span>
              </div>
              <div className={styles.courseItem}>
                <div className={styles.courseTop}>
                  <span className={styles.courseTitle}>PH101 - Engineering Physics</span>
                  <span className={styles.creditsBadge}>4.0 Credits</span>
                </div>
                <span className={styles.courseCategory}>Mathematics & Basic Sciences</span>
              </div>
            </div>
          </div>

          {/* Semester II */}
          <div className={styles.semesterCard}>
            <div className={styles.semesterHeader}>SEMESTER II</div>
            <div className={styles.courseList}>
              <div className={styles.courseItem}>
                <div className={styles.courseTop}>
                  <span className={styles.courseTitle}>CS102 - Object-Oriented Programming</span>
                  <span className={styles.creditsBadge}>4.0 Credits</span>
                </div>
                <span className={styles.courseCategory}>Core Computer Science</span>
              </div>
              <div className={styles.courseItem}>
                <div className={styles.courseTop}>
                  <span className={styles.courseTitle}>MA102 - Discrete Mathematics</span>
                  <span className={styles.creditsBadge}>3.0 Credits</span>
                </div>
                <span className={styles.courseCategory}>Mathematics & Basic Sciences</span>
              </div>
              <div className={styles.courseItem}>
                <div className={styles.courseTop}>
                  <span className={styles.courseTitle}>EE101 - Basic Electronics</span>
                  <span className={styles.creditsBadge}>3.0 Credits</span>
                </div>
                <span className={styles.courseCategory}>Engineering Sciences</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Year II */}
      <div className={styles.timelineYear}>
        <div className={styles.yearHeader}>
          <div className={styles.yearBadge}>2</div>
          <h2 className={styles.yearTitle}>Academic Year II</h2>
          <div className={styles.yearLine}></div>
        </div>

        <div className={styles.semesterGrid}>
          {/* Semester III */}
          <div className={styles.semesterCard}>
            <div className={styles.semesterHeader}>SEMESTER III</div>
            <div className={styles.courseList}>
              <div className={styles.courseItem}>
                <div className={styles.courseTop}>
                  <span className={styles.courseTitle}>CS201 - Data Structures & Algorithms</span>
                  <span className={styles.creditsBadge}>4.0 Credits</span>
                </div>
                <span className={styles.courseCategory}>Core Computer Science</span>
              </div>
              <div className={styles.courseItem}>
                <div className={styles.courseTop}>
                  <span className={styles.courseTitle}>CS202 - Database Management Systems</span>
                  <span className={styles.creditsBadge}>4.0 Credits</span>
                </div>
                <span className={styles.courseCategory}>Core Computer Science</span>
              </div>
              <div className={styles.courseItem}>
                <div className={styles.courseTop}>
                  <span className={styles.courseTitle}>MA201 - Probability & Statistics</span>
                  <span className={styles.creditsBadge}>3.0 Credits</span>
                </div>
                <span className={styles.courseCategory}>Mathematics & Basic Sciences</span>
              </div>
            </div>
          </div>

          {/* Semester IV Locked */}
          <div className={styles.lockedCard}>
            <Lock size={32} className={styles.lockedCardIcon} />
            <span>Semester IV Curriculum details coming soon</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.shieldText}>
          <ShieldCheck size={16} />
          Official Program Curriculum - Approved by Academic Council
        </div>
        <div className={styles.versionText}>
          Version 2024.01 | Effective from Academic Year 2024-25
        </div>
      </div>

    </div>
  );
}
