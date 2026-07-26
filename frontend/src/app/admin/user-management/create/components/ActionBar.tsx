"use client";

import { Info, Plus } from "lucide-react";
import Link from "next/link";
import styles from "../create.module.css";

export default function ActionBar() {
  return (
    <div className={styles.actionBar}>
      <div className={styles.mandatoryInfo}>
        <Info size={16} color="var(--text-main)" />
        <span>Fields marked with <span style={{ color: "#ef4444" }}>*</span> are mandatory for creation.</span>
      </div>
      
      <div className={styles.actionButtons}>
        <button className={styles.btnCancel}>Cancel</button>
        <button className={styles.btnReset}>Reset</button>
        <Link href="/admin/user-management/success" className={styles.btnSubmit} style={{ textDecoration: "none" }}>
          <Plus size={16} />
          Create User
        </Link>
      </div>
    </div>
  );
}
