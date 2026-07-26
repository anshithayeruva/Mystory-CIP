"use client";

import { Plus } from "lucide-react";
import styles from "../academic.module.css";
import Link from "next/link";

export default function PageHeader() {
  return (
    <div>
      <div className={styles.breadcrumb}>
        <Link href="/admin">Dashboard</Link>
        <span>›</span>
        <span className={styles.active}>Academics</span>
      </div>
      
      <div className={styles.headerRow}>
        <div>
          <p className={styles.subtitle}>Manage your institution's departments, academic programs, and subjects.</p>
        </div>
        
        <button className={styles.primaryButton}>
          <Plus size={16} />
          Create Subject
        </button>
      </div>
    </div>
  );
}
