import React from "react";
import styles from "../concept-gap.module.css";

interface InsightData {
  label: string;
  value: string;
  type: "normal" | "highlight" | "warning";
}

const MOCK_INSIGHTS: InsightData[] = [
  { label: "Most Difficult Concept", value: "Dynamic Programming", type: "warning" },
  { label: "Highest Performing Concept", value: "Linked Lists", type: "highlight" },
  { label: "Average Understanding", value: "72%", type: "normal" },
  { label: "Students Requiring Attention", value: "14", type: "warning" },
];

export default function ConceptGapInsights() {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Actionable Insights</h3>
      </div>
      <div className={styles.insightList}>
        {MOCK_INSIGHTS.map((insight, index) => (
          <div key={index} className={styles.insightItem}>
            <div className={styles.insightLabel}>{insight.label}</div>
            <div className={`${styles.insightValue} ${
              insight.type === "highlight" ? styles.insightHighlight :
              insight.type === "warning" ? styles.insightWarning : ""
            }`}>
              {insight.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
