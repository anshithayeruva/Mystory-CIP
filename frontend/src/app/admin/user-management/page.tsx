"use client";

import styles from "./directory.module.css";
import DirectoryHeader from "./components/DirectoryHeader";
import DirectoryCards from "./components/DirectoryCards";
import DirectoryFilterBar from "./components/DirectoryFilterBar";
import DirectoryTable from "./components/DirectoryTable";

export default function UserManagementPage() {
  return (
    <div className={styles.pageContainer}>
      <DirectoryHeader />
      <DirectoryCards />
      
      <div className={styles.mainCard}>
        <DirectoryFilterBar />
        <DirectoryTable />
      </div>
    </div>
  );
}
