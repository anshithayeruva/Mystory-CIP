"use client";

import { Plus } from "lucide-react";
import styles from "../academic.module.css";


interface PageHeaderProps {
  activeTab: string;
  onCreateClick?: () => void;
}

export default function PageHeader({ activeTab, onCreateClick }: PageHeaderProps) {
  const isDepartments = activeTab === "departments";

  return (
    <div>
      <div className={styles.headerRow}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <h1 className={styles.title} style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-main)' }}>
              {isDepartments ? "Departments" : "Programs"}
            </h1>
          </div>
          <p className={styles.subtitle}>
            {isDepartments 
              ? "Manage your institution's academic structure and departmental hierarchy."
              : "Manage your institution's academic structure, including departments and academic programs."}
          </p>
        </div>
        
        <button className={styles.primaryButton} onClick={onCreateClick}>
          <Plus size={16} />
          {isDepartments ? "Create Department" : "Create Program"}
        </button>
      </div>
    </div>
  );
}
