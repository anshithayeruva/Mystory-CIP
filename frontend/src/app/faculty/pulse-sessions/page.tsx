"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import PulseSessionKPIs from "./components/PulseSessionKPIs";
import PulseSessionFilterBar from "./components/PulseSessionFilterBar";
import PulseSessionTable, { PulseSession } from "./components/PulseSessionTable";
import styles from "./pulse-sessions.module.css";

// Mock Data
const MOCK_SESSIONS: PulseSession[] = [
  {
    id: "1",
    name: "Mid-Term Review Quiz",
    subject: "Data Structures",
    type: "Quiz",
    code: "DS-QZ-01",
    date: "2023-10-15",
    time: "10:00 AM",
    status: "Completed",
    participants: 45
  },
  {
    id: "2",
    name: "End of Chapter Understanding",
    subject: "Machine Learning",
    type: "Poll",
    code: "ML-PL-02",
    date: "2023-11-02",
    time: "02:00 PM",
    status: "Live",
    participants: 58
  },
  {
    id: "3",
    name: "Course Feedback",
    subject: "Thermodynamics",
    type: "Feedback",
    code: "TH-FB-01",
    date: "2023-11-20",
    time: "11:30 AM",
    status: "Upcoming",
    participants: 0
  },
  {
    id: "4",
    name: "Quick Sort Implementation",
    subject: "Data Structures",
    type: "Quiz",
    code: "DS-QZ-02",
    date: "2023-11-25",
    time: "09:00 AM",
    status: "Upcoming",
    participants: 0
  }
];

export default function FacultyPulseSessionsPage() {
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");
  const [sessionType, setSessionType] = useState("");
  const [status, setStatus] = useState("");
  const [semester, setSemester] = useState("");

  const handleReset = () => {
    setSearch("");
    setSubject("");
    setSessionType("");
    setStatus("");
    setSemester("");
  };

  const filteredData = useMemo(() => {
    return MOCK_SESSIONS.filter((session) => {
      const matchSearch = search.trim() === "" || 
        session.name.toLowerCase().includes(search.toLowerCase()) || 
        session.code.toLowerCase().includes(search.toLowerCase());
      const matchSubject = subject === "" || session.subject === subject;
      const matchType = sessionType === "" || session.type === sessionType;
      const matchStatus = status === "" || session.status === status;
      // Mock data doesn't have semester, but pretending it does for filter parity
      
      return matchSearch && matchSubject && matchType && matchStatus;
    });
  }, [search, subject, sessionType, status]);

  const stats = {
    total: MOCK_SESSIONS.length,
    live: MOCK_SESSIONS.filter(s => s.status === "Live").length,
    upcoming: MOCK_SESSIONS.filter(s => s.status === "Upcoming").length,
    completed: MOCK_SESSIONS.filter(s => s.status === "Completed").length,
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>Pulse Sessions</h1>
          <p className={styles.subtitle}>
            Create, manage and monitor classroom pulse assessment sessions.
          </p>
        </div>
        <Link href="/faculty/pulse-sessions/create" className={styles.primaryButton}>
          <Plus size={16} />
          Create Pulse Session
        </Link>
      </div>

      <PulseSessionKPIs stats={stats} />

      <div className={styles.mainCard}>
        <PulseSessionFilterBar 
          search={search}
          setSearch={setSearch}
          subject={subject}
          setSubject={setSubject}
          sessionType={sessionType}
          setSessionType={setSessionType}
          status={status}
          setStatus={setStatus}
          semester={semester}
          setSemester={setSemester}
          onReset={handleReset}
        />
        <div className={styles.tableHeaderRow}>
          <h2 className={styles.tableTitle}>All Sessions</h2>
        </div>
        <PulseSessionTable data={filteredData} />
      </div>
    </div>
  );
}
