import React from "react";
import { Search } from "lucide-react";
import styles from "../pulse-sessions.module.css";

interface PulseSessionFilterBarProps {
  search: string;
  setSearch: (value: string) => void;
  subject: string;
  setSubject: (value: string) => void;
  sessionType: string;
  setSessionType: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  semester: string;
  setSemester: (value: string) => void;
  onReset: () => void;
}

export default function PulseSessionFilterBar({
  search,
  setSearch,
  subject,
  setSubject,
  sessionType,
  setSessionType,
  status,
  setStatus,
  semester,
  setSemester,
  onReset
}: PulseSessionFilterBarProps) {
  return (
    <div className={styles.filterBar}>
      <div className={styles.searchGroup}>
        <label className={styles.filterLabel}>Search Session</label>
        <div className={styles.searchInputWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by session name or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

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
        <label className={styles.filterLabel}>Session Type</label>
        <select 
          value={sessionType}
          onChange={(e) => setSessionType(e.target.value)}
          className={styles.selectInput}
        >
          <option value="">All Types</option>
          <option value="Quiz">Quiz</option>
          <option value="Feedback">Feedback</option>
          <option value="Poll">Poll</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Status</label>
        <select 
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={styles.selectInput}
        >
          <option value="">All Statuses</option>
          <option value="Live">Live</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Completed">Completed</option>
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

      <div className={styles.filterActions}>
        <button className={styles.resetButton} onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  );
}
