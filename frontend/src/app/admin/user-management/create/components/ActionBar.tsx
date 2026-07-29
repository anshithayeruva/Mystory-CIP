"use client";

import { Info, Plus } from "lucide-react";
import Link from "next/link";
import styles from "../create.module.css";

interface ActionBarProps {
  onSubmit: () => void;
  loading: boolean;
}

export default function ActionBar({ onSubmit, loading }: ActionBarProps) {
  return (
    <div className={styles.actionBar}>
      <div className={styles.mandatoryInfo}>
        <Info size={16} color="var(--text-main)" />
        <span>Fields marked with <span style={{ color: "#ef4444" }}>*</span> are mandatory for creation.</span>
      </div>
      
      <div className={styles.actionButtons}>
        <Link href="/admin/user-management" className={styles.btnCancel} style={{ textDecoration: 'none' }}>Cancel</Link>
        <button className={styles.btnReset}>Reset</button>
        <button className={styles.btnSubmit} onClick={onSubmit} disabled={loading} style={{ cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
          <Plus size={16} />
          {loading ? 'Creating...' : 'Create User'}
        </button>
      </div>
    </div>
  );
}
