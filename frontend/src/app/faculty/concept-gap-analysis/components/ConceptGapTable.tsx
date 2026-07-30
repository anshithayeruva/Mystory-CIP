import React from "react";
import { Target, MoreVertical } from "lucide-react";
import Link from "next/link";
import styles from "../concept-gap.module.css";

export interface ConceptGapData {
  id: string;
  concept: string;
  subject: string;
  understanding: number;
  difficulty: "High" | "Medium" | "Low";
  studentsAffected: number;
  recommendedAction: string;
}

interface ConceptGapTableProps {
  data: ConceptGapData[];
}

export default function ConceptGapTable({ data }: ConceptGapTableProps) {
  if (data.length === 0) {
    return (
      <div className={styles.emptyState}>
        <Target className={styles.emptyStateIcon} />
        <h3 className={styles.emptyStateTitle}>No Concept Gap Analysis Available</h3>
        <p className={styles.emptyStateDesc}>Complete a pulse session to generate concept gap insights.</p>
        <Link href="/faculty/pulse-sessions/create" className={styles.primaryButton} style={{ marginTop: '16px' }}>
          Create Pulse Session
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Concept</th>
            <th>Subject</th>
            <th>Understanding %</th>
            <th>Difficulty</th>
            <th>Students Affected</th>
            <th>Recommended Action</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className={styles.primaryText}>{item.concept}</td>
              <td>{item.subject}</td>
              <td>{item.understanding}%</td>
              <td>
                <span className={`${styles.badge} ${
                  item.difficulty === "High" ? styles.badgeHigh : 
                  item.difficulty === "Medium" ? styles.badgeMedium : 
                  styles.badgeLow
                }`}>
                  {item.difficulty}
                </span>
              </td>
              <td>{item.studentsAffected}</td>
              <td>{item.recommendedAction}</td>
              <td>
                <button className={styles.actionButton} title="Options">
                  <MoreVertical size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
