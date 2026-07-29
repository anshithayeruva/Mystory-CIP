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
      <div className={styles.headerRow}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', fontSize: '0.8125rem', color: 'var(--text-main)', fontWeight: 600 }}>
            <Link href="/admin/user-management" style={{ textDecoration: 'none', color: 'inherit' }}>Directory</Link>
            <span style={{ margin: '0 8px', color: 'var(--text-muted)' }}>&gt;</span>
            <h1 className={styles.title} style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-main)', display: 'inline' }}>{getTitle()}</h1>
          </div>
          <p className={styles.subtitle}>Create a new institutional account quickly and securely.</p>
        </div>
      </div>
    </div>
  );
}
