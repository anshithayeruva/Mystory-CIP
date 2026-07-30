import React from "react";
import { Search } from "lucide-react";
import styles from "../subjects.module.css";

interface SubjectFilterBarProps {
  search: string;
  setSearch: (value: string) => void;
  department: string;
  setDepartment: (value: string) => void;
  program: string;
  setProgram: (value: string) => void;
  semester: string;
  setSemester: (value: string) => void;
  onReset: () => void;
}

export default function SubjectFilterBar({
  search,
  setSearch,
  department,
  setDepartment,
  program,
  setProgram,
  semester,
  setSemester,
  onReset
}: SubjectFilterBarProps) {
  return (
    <div className={styles.filterBar}>
      <div className={styles.searchGroup}>
        <label className={styles.filterLabel}>Search Subject</label>
        <div className={styles.searchInputWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by name or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Department</label>
        <select 
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className={styles.selectInput}
        >
          <option value="">All Departments</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Electrical Engineering">Electrical Engineering</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Program</label>
        <select 
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          className={styles.selectInput}
        >
          <option value="">All Programs</option>
          <option value="B.Tech">B.Tech</option>
          <option value="M.Tech">M.Tech</option>
          <option value="Ph.D">Ph.D</option>
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
          <option value="Semester 2">Semester 2</option>
          <option value="Semester 3">Semester 3</option>
          <option value="Semester 4">Semester 4</option>
          <option value="Semester 5">Semester 5</option>
          <option value="Semester 6">Semester 6</option>
          <option value="Semester 7">Semester 7</option>
          <option value="Semester 8">Semester 8</option>
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
