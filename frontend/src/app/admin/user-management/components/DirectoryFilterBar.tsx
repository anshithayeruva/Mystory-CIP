"use client";

import styles from "../directory.module.css";

export default function DirectoryFilterBar() {
  return (
    <div className={styles.filterBar}>
      <div className={styles.filterGroup}>
        <span className={styles.filterLabel}>ROLE</span>
        <select className={styles.selectInput} defaultValue="All Users">
          <option>All Users</option>
          <option>Faculty</option>
          <option>HOD</option>
          <option>Student</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <span className={styles.filterLabel}>DEPARTMENT</span>
        <select className={styles.selectInput} defaultValue="All Departments">
          <option>All Departments</option>
          <option>Computer Science</option>
          <option>Business Administration</option>
          <option>Life Sciences</option>
        </select>
      </div>
      
      <div className={styles.filterGroup}>
        <span className={styles.filterLabel}>PROGRAM</span>
        <select className={styles.selectInput} defaultValue="All Programs">
          <option>All Programs</option>
          <option>B.Sc. Computer Science</option>
          <option>MBA</option>
          <option>B.Sc. Biology</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <span className={styles.filterLabel}>STATUS</span>
        <select className={styles.selectInput} defaultValue="All Statuses">
          <option>All Statuses</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      <div className={styles.filterActions}>
        <button className={styles.applyButton}>Apply Filters</button>
        <button className={styles.resetButton}>Reset</button>
      </div>
    </div>
  );
}
