"use client";

import styles from "../admin-layout.module.css";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const getHeaderTitle = () => {
    if (pathname.includes("/admin/academic-structure")) return "Academics";
    if (pathname.includes("/admin/user-management")) return "Directory";
    if (pathname.includes("/admin/settings")) return "Settings";
    if (pathname.includes("/admin/reports")) return "Reports & Analytics";
    return "Dashboard"; 
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle} style={{ color: "black" }}>{getHeaderTitle()}</h1>
      
      <div className={styles.headerActions}>
        <div className={styles.profileDropdown}>
          <div className={styles.initialsAvatar}>AU</div>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}>
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
    </header>
  );
}
