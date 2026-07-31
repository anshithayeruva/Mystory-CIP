import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import styles from "../../styles/faculty-layout.module.css";

interface FacultyLayoutProps {
  children: React.ReactNode;
}

export default function FacultyLayout({ children }: FacultyLayoutProps) {
  return (
    <div className={styles.facultyContainer}>
      <Sidebar />
      <div className={styles.mainWrapper}>
        <Topbar />
        <main style={{ flex: 1, padding: "24px 32px", overflowY: "auto", minWidth: 0, backgroundColor: "var(--background)" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
