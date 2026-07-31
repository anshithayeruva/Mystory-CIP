import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import styles from "../pulse-sessions.module.css";

export default function CreatePulseSessionPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>Create Pulse Session</h1>
          <p className={styles.subtitle}>
            Configure a new live classroom pulse assessment.
          </p>
        </div>
        <Link href="/faculty/pulse-sessions" className={styles.primaryButton} style={{ backgroundColor: '#ffffff', color: '#004b28', border: '1px solid #004b28' }}>
          <ArrowLeft size={16} />
          Back to Sessions
        </Link>
      </div>

      <div className={styles.mainCard} style={{ padding: '32px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '16px', color: 'var(--text-main)' }}>Create Pulse Session Form</h2>
        <p style={{ color: 'var(--text-muted)' }}>This is a placeholder for the Create Pulse Session form.</p>
      </div>
    </div>
  );
}
