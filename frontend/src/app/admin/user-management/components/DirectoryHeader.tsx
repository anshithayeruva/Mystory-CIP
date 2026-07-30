"use client";

import { Plus } from "lucide-react";
import styles from "../directory.module.css";
import Link from "next/link";

export default function DirectoryHeader() {
  return (
    <div>
      <div className={styles.headerRow}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <h1 className={styles.pageTitle} style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-main)' }}>Directory</h1>
          </div>
          <p className={styles.subtitle}>Manage faculty, students, HoDs, and administrators across the institution.</p>
        </div>
        
        <Link href="/admin/user-management/create" className={styles.primaryButton} style={{ textDecoration: "none" }}>
          <Plus size={16} />
          Create User
        </Link>
      </div>
    </div>
  );
}
