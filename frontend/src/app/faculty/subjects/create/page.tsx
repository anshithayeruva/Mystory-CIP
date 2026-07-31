import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import styles from "../subjects.module.css";

export default function CreateSubjectPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>Create Subject</h1>
          <p className={styles.subtitle}>
            Add a new subject configuration to the system.
          </p>
        </div>
        <Link href="/faculty/subjects" className={styles.primaryButton} style={{ backgroundColor: '#ffffff', color: '#10633B', border: '1px solid #10633B' }}>
          <ArrowLeft size={18} />
          Back to Subjects
        </Link>
      </div>

      <div className={styles.mainCard} style={{ padding: '32px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '16px', color: 'var(--text-main)' }}>Create Subject Form</h2>
        <p style={{ color: 'var(--text-muted)' }}>This is a placeholder for the Create Subject form.</p>
      </div>
    </div>
  );
}
