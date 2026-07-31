"use client";

import React, { useState, useMemo } from "react";
import ConceptGapKPIs from "./components/ConceptGapKPIs";
import ConceptGapFilterBar from "./components/ConceptGapFilterBar";
import ConceptGapCharts from "./components/ConceptGapCharts";
import ConceptGapTable, { ConceptGapData } from "./components/ConceptGapTable";
import ConceptGapInsights from "./components/ConceptGapInsights";
import styles from "./concept-gap.module.css";

// Mock Data
const MOCK_DATA: ConceptGapData[] = [
  {
    id: "1",
    concept: "Dynamic Programming",
    subject: "Data Structures",
    understanding: 45,
    difficulty: "High",
    studentsAffected: 28,
    recommendedAction: "Schedule Remedial Session"
  },
  {
    id: "2",
    concept: "Backpropagation",
    subject: "Machine Learning",
    understanding: 52,
    difficulty: "High",
    studentsAffected: 22,
    recommendedAction: "Share Supplementary Video"
  },
  {
    id: "3",
    concept: "Entropy",
    subject: "Thermodynamics",
    understanding: 65,
    difficulty: "Medium",
    studentsAffected: 15,
    recommendedAction: "Review in next class"
  },
  {
    id: "4",
    concept: "Linked Lists",
    subject: "Data Structures",
    understanding: 88,
    difficulty: "Low",
    studentsAffected: 3,
    recommendedAction: "None required"
  }
];

export default function ConceptGapAnalysisPage() {
  const [subject, setSubject] = useState("");
  const [semester, setSemester] = useState("");
  const [session, setSession] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleReset = () => {
    setSubject("");
    setSemester("");
    setSession("");
    setStartDate("");
    setEndDate("");
  };

  const filteredData = useMemo(() => {
    return MOCK_DATA.filter((item) => {
      const matchSubject = subject === "" || item.subject === subject;
      // Other filters are placeholders for mock data
      return matchSubject;
    });
  }, [subject]);

  const stats = {
    sessionsAnalyzed: 12,
    conceptsCovered: 48,
    studentsAssessed: 124,
    averageUnderstanding: 72,
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>Concept Gap Analysis</h1>
          <p className={styles.subtitle}>
            Analyze student learning gaps and identify concepts requiring additional attention.
          </p>
        </div>
      </div>

      <ConceptGapKPIs stats={stats} />

      <div className={styles.card}>
        <ConceptGapFilterBar 
          subject={subject}
          setSubject={setSubject}
          semester={semester}
          setSemester={setSemester}
          session={session}
          setSession={setSession}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          onReset={handleReset}
        />
      </div>

      <div className={styles.layoutGrid}>
        <div className={styles.mainColumn}>
          <ConceptGapCharts />
          
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Concepts at Risk</h3>
            </div>
            <ConceptGapTable data={filteredData} />
          </div>
        </div>
        
        <div>
          <ConceptGapInsights />
        </div>
      </div>
    </div>
  );
}
