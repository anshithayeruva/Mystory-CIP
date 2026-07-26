"use client";

import styles from "../academic.module.css";

export default function DepartmentFilterBar() {
  return (
    <div className={styles.filterBar}>
      <div className={styles.filterGroup} style={{ flex: 1, display: "flex", flexDirection: "row", alignItems: "center", gap: "16px" }}>
        <span className={styles.filterLabel}>STATUS:</span>
        <select className={styles.selectInput} defaultValue="All Statuses">
          <option>All Statuses</option>
          <option>Active</option>
          <option>Pending</option>
          <option>Inactive</option>
        </select>
      </div>
      
      <div className={styles.filterActions}>
        <button className={styles.resetButton}>Reset</button>
        <button className={styles.applyButton}>Apply Filters</button>
      </div>
    </div>
  );
}
