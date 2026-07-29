"use client";

import Link from "next/link";
import styles from "../create.module.css";

interface HeaderAreaProps {
  userType: "student" | "staff" | "hod";
}

export default function HeaderArea({ userType }: HeaderAreaProps) {
  const getTitle = () => {
    switch (userType) {
      case "student": return "Create User";
      case "staff": return "Create Staff";
      case "hod": return "Create HoD";
      default: return "Create User";
    }
  };

  return (
    <div>
      <div className={styles.breadcrumb} style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", gap: "6px", marginBottom: "8px" }}>
        <Link href="/admin">Dashboard</Link>
        <span>›</span>
        <Link href="/admin/user-management">Directory</Link>
        <span>›</span>
        <span style={{ color: "var(--text-main)", fontWeight: 600 }}>{getTitle()}</span>
      </div>
      
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>{getTitle()}</h1>
          <p className={styles.subtitle}>Create a new institutional account quickly and securely.</p>
        </div>
      </div>
    </div>
  );
}
