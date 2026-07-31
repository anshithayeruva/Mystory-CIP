"use client";

import React from "react";
import Link from "next/link";
import { PlusCircle, Target, FileBarChart, BookOpen } from "lucide-react";
import styles from "../../styles/faculty-dashboard.module.css";

export default function FacultyQuickActions() {
  return (
    <div className={styles.sectionCard} style={{ height: '100%' }}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitleRow}>
          <h2 className={styles.sectionTitle}>Quick Actions</h2>
        </div>
      </div>
      
      <div className={styles.quickActionsGrid}>
        <Link href="/faculty/pulse-sessions/create" className={styles.actionCardBtn}>
          <PlusCircle size={24} />
          Create Session
        </Link>
        <Link href="/faculty/concept-gap-analysis" className={styles.actionCardBtn}>
          <Target size={24} />
          Concept Gap
        </Link>
        <Link href="/faculty/pulse-sessions" className={styles.actionCardBtn}>
          <FileBarChart size={24} />
          Reports
        </Link>
        <Link href="/faculty/subjects" className={styles.actionCardBtn}>
          <BookOpen size={24} />
          View Subjects
        </Link>
      </div>
    </div>
  );
}
