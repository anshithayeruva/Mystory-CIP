"use client";

import styles from "./directory.module.css";
import DirectoryHeader from "./components/DirectoryHeader";
import DirectoryFilterBar from "./components/DirectoryFilterBar";
import DirectoryTable from "./components/DirectoryTable";

export default function UserManagementPage() {
  return (
    <div className={styles.pageContainer}>
      <DirectoryHeader />
      
      <div className={styles.mainCard}>
        <DirectoryFilterBar />
        <DirectoryTable />
      </div>
    </div>
  );
}
