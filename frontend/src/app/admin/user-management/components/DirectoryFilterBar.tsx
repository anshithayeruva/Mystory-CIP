"use client";

import styles from "../directory.module.css";

export default function DirectoryFilterBar() {
  return (
    <div className={styles.filterBar}>
      <div className={styles.searchWrapper}>
        <span className={styles.searchIcon}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </span>
        <input 
          type="text" 
          placeholder="Search by name, email, or Institution ID..." 
          className={styles.searchInput} 
        />
      </div>

      <div className={styles.filterGroup}>
        <select className={styles.selectInput} defaultValue="All Users">
          <option>All Users</option>
          <option>Student</option>
          <option>Faculty</option>
          <option>HoD</option>
        </select>
      </div>
    </div>
  );
}
