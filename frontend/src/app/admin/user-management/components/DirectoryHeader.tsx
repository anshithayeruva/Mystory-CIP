"use client";

import { Plus } from "lucide-react";
import styles from "../directory.module.css";
import Link from "next/link";

export default function DirectoryHeader() {
  return (
    <div>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.pageTitle}>Directory</h1>
          <p className={styles.subtitle}>Create, manage, and monitor all institution users from a single workspace.</p>
        </div>
        
        <Link href="/admin/user-management/create" className={styles.primaryButton} style={{ textDecoration: "none" }}>
          <Plus size={16} />
          Create User
        </Link>
      </div>
    </div>
  );
}
