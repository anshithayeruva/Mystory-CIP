import React from "react";
import styles from "../concept-gap.module.css";

interface ConceptGapFilterBarProps {
  subject: string;
  setSubject: (value: string) => void;
  semester: string;
  setSemester: (value: string) => void;
  session: string;
  setSession: (value: string) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  onReset: () => void;
}

export default function ConceptGapFilterBar({
  subject,
  setSubject,
  semester,
  setSemester,
  session,
  setSession,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onReset
}: ConceptGapFilterBarProps) {
  return (
    <div className={styles.filterBar}>
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Subject</label>
        <select 
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={styles.selectInput}
        >
          <option value="">All Subjects</option>
          <option value="Data Structures">Data Structures</option>
          <option value="Machine Learning">Machine Learning</option>
          <option value="Thermodynamics">Thermodynamics</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Semester</label>
        <select 
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className={styles.selectInput}
        >
          <option value="">All Semesters</option>
          <option value="Semester 1">Semester 1</option>
          <option value="Semester 3">Semester 3</option>
          <option value="Semester 5">Semester 5</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Session</label>
        <select 
          value={session}
          onChange={(e) => setSession(e.target.value)}
          className={styles.selectInput}
        >
          <option value="">All Sessions</option>
          <option value="DS-QZ-01">DS-QZ-01</option>
          <option value="ML-PL-02">ML-PL-02</option>
          <option value="TH-FB-01">TH-FB-01</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Start Date</label>
        <input 
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className={styles.dateInput}
        />
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>End Date</label>
        <input 
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className={styles.dateInput}
        />
      </div>

      <div className={styles.filterActions}>
        <button className={styles.resetButton} onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  );
}
