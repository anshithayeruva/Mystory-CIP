"use client";

import styles from "../academic.module.css";

export default function FilterBar() {
  return (
    <div className={styles.filterBar}>
      <div className={styles.filterGroup}>
        <span className={styles.filterLabel}>DEPARTMENT</span>
        <select className={styles.selectInput} defaultValue="All Departments">
          <option>All Departments</option>
          <option>Computer Science</option>
          <option>Engineering</option>
          <option>Business Admin</option>
        </select>
      </div>
      
      <div className={styles.filterGroup}>
        <span className={styles.filterLabel}>PROGRAM</span>
        <select className={styles.selectInput} defaultValue="All Programs">
          <option>All Programs</option>
          <option>B.Sc. CS</option>
          <option>B.Eng Mech</option>
          <option>MBA</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <span className={styles.filterLabel}>SEMESTER</span>
        <select className={styles.selectInput} defaultValue="All Semesters">
          <option>All Semesters</option>
          <option>Fall 2024</option>
          <option>Spring 2025</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <span className={styles.filterLabel}>FACULTY</span>
        <select className={styles.selectInput} defaultValue="All Faculties">
          <option>All Faculties</option>
          <option>Dr. Alan Turing</option>
          <option>Prof. Warren B.</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <span className={styles.filterLabel}>STATUS</span>
        <select className={styles.selectInput} defaultValue="All Statuses">
          <option>All Statuses</option>
          <option>Active</option>
          <option>Draft</option>
          <option>Archived</option>
        </select>
      </div>

      <div className={styles.filterActions}>
        <button className={styles.applyButton}>Apply</button>
        <button className={styles.resetButton}>Reset</button>
      </div>
    </div>
  );
}
