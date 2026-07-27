"use client";

import { Search } from "lucide-react";
import styles from "../academic.module.css";

export default function ProgramFilterBar() {
  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.searchInputWrapper}>
        <Search size={18} className={styles.searchIcon} />
        <input 
          type="text" 
          placeholder="Search Program..." 
          className={styles.wideSearchInput}
        />
      </div>
    </div>
  );
}
