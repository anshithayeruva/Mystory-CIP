"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { 
  Download, 
  FileSpreadsheet, 
  Printer, 
  ArrowLeft, 
  Plus,
  BarChart2
} from "lucide-react";
import styles from "./summary.module.css";

export default function SessionSummary() {
  const router = useRouter();

  const handleConceptGapNav = () => {
    router.push('/faculty/concept-gap-analysis');
  };

  const handleBackToPulse = () => {
    router.push('/faculty/pulse-sessions');
  };

  const handleCreateNew = () => {
    router.push('/faculty/pulse-sessions/create');
  };

  const kpis = [
    { label: "Total Students", value: "45" },
    { label: "Attendance", value: "93%", highlight: true },
    { label: "Avg Score", value: "76%" },
    { label: "Avg Understanding", value: "High", highlight: true },
    { label: "Questions Asked", value: "10" },
    { label: "Participation Rate", value: "98%" }
  ];

  const questionAnalysis = [
    { id: "Q1", text: "What is the primary function of a hash table?", correct: "85%", incorrect: "15%", skipped: "0", difficulty: "Easy" },
    { id: "Q2", text: "Describe the time complexity of a binary search tree.", correct: "60%", incorrect: "35%", skipped: "5%", difficulty: "Medium" },
    { id: "Q3", text: "What is the time complexity of QuickSort in the worst case?", correct: "40%", incorrect: "50%", skipped: "10%", difficulty: "Hard" },
  ];

  const studentPerformance = [
    { name: "Alice Johnson", attendance: "Present", score: "90%", understanding: 90, status: "Excellent" },
    { name: "Bob Smith", attendance: "Present", score: "60%", understanding: 60, status: "Needs Review" },
    { name: "Charlie Davis", attendance: "Present", score: "80%", understanding: 80, status: "Good" },
    { name: "Diana Prince", attendance: "Absent", score: "-", understanding: 0, status: "Missed" },
  ];

  return (
    <div className={styles.pageContainer}>
      {/* Top Navigation Bar */}
      <div className={styles.topNavRow}>
        <button type="button" className={styles.secondaryButton} onClick={handleBackToPulse}>
          <ArrowLeft size={16} />
          Back to AI Assessments
        </button>
        <div className={styles.headerActions}>
          <button type="button" className={styles.primaryButton} onClick={handleCreateNew}>
            <Plus size={16} />
            Create Another Assessment
          </button>
        </div>
      </div>

      {/* Header Card */}
      <div className={styles.headerCard}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>Session Summary: Mid-Term Review</h1>
          <span className={styles.badgeCompleted}>Completed</span>
        </div>
        <div className={styles.metadataGrid}>
          <div className={styles.metadataItem}>
            <span className={styles.metaLabel}>Subject</span>
            <span className={styles.metaValue}>Data Structures</span>
          </div>
          <div className={styles.metadataItem}>
            <span className={styles.metaLabel}>Faculty</span>
            <span className={styles.metaValue}>Dr. Sarah Jenkins</span>
          </div>
          <div className={styles.metadataItem}>
            <span className={styles.metaLabel}>Date</span>
            <span className={styles.metaValue}>Oct 15, 2024</span>
          </div>
          <div className={styles.metadataItem}>
            <span className={styles.metaLabel}>Duration</span>
            <span className={styles.metaValue}>15 Minutes</span>
          </div>
          <div className={styles.metadataItem}>
            <span className={styles.metaLabel}>Type</span>
            <span className={styles.metaValue}>Mid-Class Check</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className={styles.kpiGrid}>
        {kpis.map((kpi, idx) => (
          <div key={idx} className={styles.kpiCard}>
            <span className={styles.kpiLabel}>{kpi.label}</span>
            <span className={`${styles.kpiValue} ${kpi.highlight ? styles.kpiHighlight : ''}`}>{kpi.value}</span>
          </div>
        ))}
      </div>

      <div className={styles.mainGrid}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          
          <div className={styles.card}>
            <div className={styles.cardHeader}>Performance Overview</div>
            <div className={styles.cardBody}>
              <div className={styles.chartPlaceholder}>
                <BarChart2 size={32} style={{ marginRight: '12px' }} />
                [ Average Understanding Chart Placeholder ]
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>Question Analysis</div>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Question</th>
                    <th>Correct %</th>
                    <th>Incorrect %</th>
                    <th>Skipped</th>
                    <th>Difficulty</th>
                  </tr>
                </thead>
                <tbody>
                  {questionAnalysis.map((q, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600 }}>{q.id}: {q.text}</td>
                      <td style={{ color: '#00522E', fontWeight: 600 }}>{q.correct}</td>
                      <td style={{ color: '#64748b', fontWeight: 600 }}>{q.incorrect}</td>
                      <td>{q.skipped}</td>
                      <td>
                        <span className={styles.statusBadge} style={{ 
                          backgroundColor: q.difficulty === 'Hard' ? '#f1f5f9' : q.difficulty === 'Medium' ? '#fef3c7' : '#ecfdf5',
                          color: q.difficulty === 'Hard' ? '#475569' : q.difficulty === 'Medium' ? '#92400e' : '#00522E'
                        }}>
                          {q.difficulty}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>Student Performance</div>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Attendance</th>
                    <th>Score</th>
                    <th>Understanding</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {studentPerformance.map((s, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600 }}>{s.name}</td>
                      <td>
                        <span className={`${styles.statusBadge} ${s.attendance === 'Present' ? styles.statusSuccess : styles.statusWarning}`}>
                          {s.attendance}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600 }}>{s.score}</td>
                      <td>
                        {s.attendance === 'Present' ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div className={styles.progressWrapper}>
                              <div className={styles.progressFill} style={{ width: `${s.understanding}%`, backgroundColor: '#00522E' }} />
                            </div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{s.understanding}%</span>
                          </div>
                        ) : (
                          <span style={{ color: 'var(--text-muted)' }}>-</span>
                        )}
                      </td>
                      <td>
                        <span className={styles.statusBadge} style={{
                          backgroundColor: s.status === 'Excellent' || s.status === 'Good' ? '#ecfdf5' : '#f1f5f9',
                          color: s.status === 'Excellent' || s.status === 'Good' ? '#00522E' : '#475569'
                        }}>
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          
          <div className={styles.card}>
            <div className={styles.cardHeader}>Concept Gap Summary</div>
            <div className={styles.cardBody}>
              <div className={styles.gapBox}>
                <div className={styles.gapBoxTitle}>Weak Concepts</div>
                <ul className={styles.gapList}>
                  <li>QuickSort Time Complexity</li>
                  <li>Dynamic Programming Memoization</li>
                </ul>
              </div>
              <div className={styles.strongBox}>
                <div className={styles.strongBoxTitle}>Strong Concepts</div>
                <ul className={styles.strongList}>
                  <li>Hash Tables</li>
                  <li>Binary Search Trees</li>
                </ul>
              </div>
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px' }}>Recommendations:</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Spend 10 minutes reviewing worst-case scenarios for sorting algorithms in the next lecture.</p>
              </div>
              <button type="button" className={styles.primaryButton} onClick={handleConceptGapNav} style={{ marginTop: '16px' }}>
                View Concept Gap Analysis
              </button>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>Export Actions</div>
            <div className={styles.cardBody} style={{ gap: '12px' }}>
              <button type="button" className={styles.secondaryButton}>
                <Download size={16} />
                Download PDF
              </button>
              <button type="button" className={styles.secondaryButton}>
                <FileSpreadsheet size={16} />
                Export Excel
              </button>
              <button type="button" className={styles.secondaryButton}>
                <Printer size={16} />
                Print Summary
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
