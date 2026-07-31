import React from "react";
import styles from "../concept-gap.module.css";

export default function ConceptGapCharts() {
  return (
    <div className={styles.chartsRow}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>Concept Gap Overview</h3>
        </div>
        <div className={styles.chartPlaceholder}>
          [ Overview Chart Visualization ]
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>Understanding Distribution</h3>
        </div>
        <div className={styles.chartPlaceholder}>
          [ Distribution Chart Visualization ]
        </div>
      </div>
    </div>
  );
}
