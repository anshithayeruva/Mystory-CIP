"use client";

import styles from "../academic.module.css";

interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <div className={styles.tabsContainer}>
      <div 
        className={`${styles.tab} ${activeTab === "subjects" ? styles.tabActive : ""}`}
        onClick={() => onTabChange("subjects")}
      >
        Subjects
      </div>
      <div 
        className={`${styles.tab} ${activeTab === "programs" ? styles.tabActive : ""}`}
        onClick={() => onTabChange("programs")}
      >
        Programs
      </div>
      <div 
        className={`${styles.tab} ${activeTab === "departments" ? styles.tabActive : ""}`}
        onClick={() => onTabChange("departments")}
      >
        Departments
      </div>
    </div>
  );
}
