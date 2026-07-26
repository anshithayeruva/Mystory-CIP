"use client";

import styles from "../academic.module.css";

export default function ProgramFilterBar() {
  return (
    <div className={styles.filterBar}>
      <div className={styles.filterGroup}>
        <span className={styles.filterLabel}>DEPARTMENT</span>
        <select className={styles.selectInput} defaultValue="All Departments">
          <option>All Departments</option>
          <option>School of Engineering</option>
          <option>Business School</option>
        </select>
      </div>
      
      <div className={styles.filterGroup}>
        <span className={styles.filterLabel}>DEGREE TYPE</span>
        <select className={styles.selectInput} defaultValue="All Types">
          <option>All Types</option>
          <option>Undergraduate</option>
          <option>Postgraduate</option>
          <option>Professional</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <span className={styles.filterLabel}>STATUS</span>
        <select className={styles.selectInput} defaultValue="All Status">
          <option>All Status</option>
          <option>Active</option>
          <option>Draft</option>
          <option>Archived</option>
        </select>
      </div>

      <div className={styles.filterActions}>
        <button className={styles.applyButton}>Apply Filters</button>
        <button className={styles.resetButton}>Reset</button>
      </div>
    </div>
  );
}
