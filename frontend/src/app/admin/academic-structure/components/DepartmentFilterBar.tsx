"use client";

import styles from "../academic.module.css";

export default function DepartmentFilterBar() {
  return (
    <div className={styles.filterBar}>
      <div className={styles.searchWrapper}>
        <span className={styles.searchIcon}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </span>
        <input 
          type="text" 
          placeholder="Search departments..." 
          className={styles.searchInput} 
        />
      </div>

      <div className={styles.filterGroup}>
        <select className={styles.selectInput} defaultValue="All Departments">
          <option>All Departments</option>
          <option>Active</option>
          <option>Archived</option>
        </select>
      </div>
    </div>
  );
}
