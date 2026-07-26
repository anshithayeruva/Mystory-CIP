"use client";

import Link from "next/link";
import { CheckCircle2, CheckCircle, ShieldCheck, Copy, Send, FileText, Printer, AlertTriangle } from "lucide-react";
import styles from "./success.module.css";

export default function UserSuccessPage() {
  return (
    <div className={styles.pageContainer}>
      
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link href="/admin">Dashboard</Link>
        <span>›</span>
        <Link href="/admin/user-management">Directory</Link>
        <span>›</span>
        <span className={styles.active}>User Created</span>
      </div>

      <div className={styles.contentWrapper}>
        {/* Hero Section */}
        <div className={styles.hero}>
        <div className={styles.successIcon}>
          <CheckCircle size={32} />
        </div>
        <h1 className={styles.heroTitle}>User Successfully Created</h1>
        <p className={styles.heroSubtitle}>
          The institutional account has been created successfully and is ready for use. System emails have been dispatched to the user.
        </p>
      </div>

      {/* User Information Summary Card */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>User Information Summary</h2>
          <div className={styles.badgeSuccess}>
            <CheckCircle2 size={14} /> Verified Student
          </div>
        </div>

        <div className={styles.summaryGrid}>
          <div className={styles.infoGroup}>
            <span className={styles.infoLabel}>FULL NAME</span>
            <span className={styles.infoValue}>John Smith</span>
          </div>
          <div className={styles.infoGroup}>
            <span className={styles.infoLabel}>INSTITUTION ID</span>
            <span className={styles.infoValue}>STU-2024-8842</span>
          </div>
          <div className={styles.infoGroup}>
            <span className={styles.infoLabel}>USER TYPE</span>
            <span className={styles.infoValue}>Student</span>
          </div>
          <div className={styles.infoGroup}>
            <span className={styles.infoLabel}>DEPARTMENT</span>
            <span className={styles.infoValue}>Computer Science & Engineering</span>
          </div>
          <div className={styles.infoGroup}>
            <span className={styles.infoLabel}>INSTITUTION EMAIL</span>
            <span className={styles.infoValue}>john.smith@mystory.edu.in</span>
          </div>
          <div className={styles.infoGroup}>
            <span className={styles.infoLabel}>ACCOUNT STATUS</span>
            <div>
              <span className={styles.statusActive}>
                <span className={styles.statusDot}></span> ACTIVE
              </span>
            </div>
          </div>
        </div>

        <div className={styles.tagsRow}>
          <div className={styles.tagBlue}>
            <Send size={14} /> Invitation Sent
          </div>
          <div className={styles.tagOrange}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg> 
            Password Reset Required
          </div>
        </div>
      </div>

      {/* Temporary Password Card */}
      <div className={styles.passwordCard}>
        <div className={styles.passwordLeft}>
          <div className={styles.passwordHeader}>
            <ShieldCheck size={20} color="#0f172a" />
            Temporary Password
          </div>
          
          <div className={styles.passwordBox}>
            <span className={styles.passwordText}>M8#qR91@Lp</span>
            <button className={styles.copyBtn} aria-label="Copy Password">
              <Copy size={18} />
            </button>
          </div>

          <div className={styles.warning}>
            <AlertTriangle size={14} className={styles.warningIcon} />
            <span>This temporary password is shown <strong>only once</strong>. Please copy or download the credentials before leaving this page for institutional security compliance.</span>
          </div>
        </div>
        
        <div className={styles.passwordActions}>
          <button className={styles.actionBtn}>
            <Send size={14} /> Send Welcome Email
          </button>
          <button className={styles.actionBtn}>
            <FileText size={14} /> Download PDF
          </button>
          <button className={styles.actionBtn}>
            <Printer size={14} /> Print
          </button>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className={styles.bottomActions}>
        <Link href="/admin/user-management/create" className={styles.primaryBtn}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
          Create Another User
        </Link>
        <Link href="/admin/user-management" className={styles.secondaryBtn}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Return to User Management
        </Link>
      </div>

      </div>
    </div>
  );
}
