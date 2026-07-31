"use client";

import React from "react";
import { Award, TrendingUp, BookOpen, CheckCircle2 } from "lucide-react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  LineChart, 
  Line 
} from "recharts";
import styles from "../student.module.css";
import { STUDENT_INFO } from "../mockData";

const SEMESTER_GPA_HISTORY = [
  { semester: "Sem 1", gpa: 8.70 },
  { semester: "Sem 2", gpa: 8.85 },
  { semester: "Sem 3", gpa: 8.90 },
  { semester: "Sem 4", gpa: 9.05 },
  { semester: "Sem 5", gpa: 9.10 },
  { semester: "Sem 6", gpa: 9.12 },
];

const GRADE_DISTRIBUTION = [
  { grade: "A+", count: 3 },
  { grade: "A", count: 2 },
  { grade: "B+", count: 1 },
  { grade: "B", count: 0 },
];

const SUBJECT_GRADES = [
  { code: "CSE 301", name: "Advanced Data Structures", internal: 24, assignment: 28, midSem: 23, endSem: 45, bonus: 5, total: 95, finalGrade: "A+" },
  { code: "CSE 302", name: "Database Management Systems", internal: 23, assignment: 26, midSem: 22, endSem: 43, bonus: 5, total: 89, finalGrade: "A" },
  { code: "CSE 303", name: "Operating Systems", internal: 22, assignment: 25, midSem: 20, endSem: 40, bonus: 4, total: 85, finalGrade: "A-" },
  { code: "CSE 304", name: "Computer Networks", internal: 25, assignment: 29, midSem: 24, endSem: 46, bonus: 5, total: 96, finalGrade: "A+" },
  { code: "CSE 305", name: "Machine Learning", internal: 20, assignment: 22, midSem: 18, endSem: 36, bonus: 3, total: 79, finalGrade: "B+" },
  { code: "CSE 306", name: "Software Engineering", internal: 23, assignment: 27, midSem: 22, endSem: 42, bonus: 5, total: 88, finalGrade: "A" },
];

export default function StudentGradesPage() {
  return (
    <div className={styles.pageContainer}>
      {/* Admin Clean Banner */}
      <div className={styles.welcomeBanner}>
        <div>
          <h1 className={styles.welcomeTitle}>Academic Performance & Grades</h1>
          <p className={styles.welcomeSubtitle}>
            Comprehensive transcript metrics, GPA trends, and subject-wise grade distributions.
          </p>
        </div>
        <div className={styles.bannerMeta}>
          <div className={styles.metaPill}>
            CGPA: {STUDENT_INFO.cgpa}
          </div>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className={styles.kpiGrid}>
        <div className={styles.kpiCard}>
          <div className={styles.kpiIconBox}>
            <Award size={20} />
          </div>
          <div>
            <div className={styles.kpiValue}>{STUDENT_INFO.cgpa}</div>
            <div className={styles.kpiLabel}>Cumulative CGPA</div>
          </div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiIconBox}>
            <TrendingUp size={20} />
          </div>
          <div>
            <div className={styles.kpiValue}>{STUDENT_INFO.sgpa}</div>
            <div className={styles.kpiLabel}>Semester 6 SGPA</div>
          </div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiIconBox}>
            <BookOpen size={20} />
          </div>
          <div>
            <div className={styles.kpiValue}>{STUDENT_INFO.creditsEarned}</div>
            <div className={styles.kpiLabel}>Credits Completed</div>
          </div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiIconBox}>
            <Award size={20} />
          </div>
          <div>
            <div className={styles.kpiValue}>{STUDENT_INFO.classRank}</div>
            <div className={styles.kpiLabel}>Department Rank</div>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {/* Semester GPA Trend */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Semester-wise SGPA Progress Trend</h2>
          <div style={{ height: "220px", width: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={SEMESTER_GPA_HISTORY}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="semester" stroke="#64748b" fontSize={11} />
                <YAxis domain={[7.5, 10]} stroke="#64748b" fontSize={11} />
                <Tooltip />
                <Line type="monotone" dataKey="gpa" stroke="#00522E" strokeWidth={2.5} dot={{ r: 4, fill: "#00522E" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Current Grade Distribution */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Current Semester Grade Breakdown</h2>
          <div style={{ height: "220px", width: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={GRADE_DISTRIBUTION}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="grade" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#00522E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Subject-Wise Grade Breakdown Table */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Subject-wise Component Grade Breakdown</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Internal (25)</th>
                <th>Assignments (30)</th>
                <th>Mid Sem (25)</th>
                <th>End Sem (50)</th>
                <th>Bonus (5)</th>
                <th>Total (100)</th>
                <th>Final Grade</th>
              </tr>
            </thead>
            <tbody>
              {SUBJECT_GRADES.map((sub, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 700, color: "#00522E" }}>{sub.code}</td>
                  <td style={{ fontWeight: 600, color: "#0f172a" }}>{sub.name}</td>
                  <td>{sub.internal}</td>
                  <td>{sub.assignment}</td>
                  <td>{sub.midSem}</td>
                  <td>{sub.endSem}</td>
                  <td>{sub.bonus}</td>
                  <td style={{ fontWeight: 700, color: "#0f172a" }}>{sub.total}</td>
                  <td>
                    <span className={styles.badgeCompleted}>
                      {sub.finalGrade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Academic Insights Box (Admin Clean Style) */}
      <div className={styles.mainGrid}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            <CheckCircle2 size={18} color="#00522E" /> Top Performing Subjects
          </h2>
          <p style={{ fontSize: "0.82rem", color: "#334155", margin: 0, lineHeight: 1.5 }}>
            You are excelling in <strong>CSE 304 (Computer Networks)</strong> and <strong>CSE 301 (Advanced Data Structures)</strong> with an average score of 95.5%.
          </p>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            Academic Focus & Recommendations
          </h2>
          <p style={{ fontSize: "0.82rem", color: "#334155", margin: 0, lineHeight: 1.5 }}>
            <strong>CSE 305 (Machine Learning)</strong> score is currently 79%. Attending faculty office hours prior to End-Sem exams is recommended.
          </p>
        </div>
      </div>
    </div>
  );
}
