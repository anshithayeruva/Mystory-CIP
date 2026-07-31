"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, CheckCircle, ShieldCheck, Copy, Send, FileText, Printer, AlertTriangle } from "lucide-react";
import styles from "./success.module.css";

export default function UserSuccessPage() {
  const [createdUser, setCreatedUser] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('createdUser');
    if (data) {
      setCreatedUser(JSON.parse(data));
    }
  }, []);

  const copyPassword = () => {
    if (createdUser?.generatedCredentials?.password) {
      navigator.clipboard.writeText(createdUser.generatedCredentials.password);
      alert("Password copied to clipboard!");
    }
  };

  if (!createdUser) {
    return <div style={{ padding: "2rem" }}>Loading... (or no user data found)</div>;
  }

  const { user, generatedCredentials } = createdUser;
  const roleName = user.role === 'HOD' ? 'HoD' : user.role === 'FACULTY' ? 'Faculty' : 'Student';

  return (
    <div className={styles.pageContainer}>
      
      {/* Header Section */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', fontSize: '0.8125rem', color: 'var(--text-main)', fontWeight: 600 }}>
          <Link href="/admin/user-management" style={{ textDecoration: 'none', color: 'inherit' }}>Directory</Link>
          <span style={{ margin: '0 8px', color: 'var(--text-muted)' }}>&gt;</span>
          <Link href="/admin/user-management/create" style={{ textDecoration: 'none', color: 'inherit' }}>Create User</Link>
          <span style={{ margin: '0 8px', color: 'var(--text-muted)' }}>&gt;</span>
          <h1 className={styles.heroTitle} style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-main)', display: 'inline' }}>User Successfully Created</h1>
          <CheckCircle size={16} color="#166534" style={{ marginLeft: '6px' }} />
        </div>
        <p className={styles.heroSubtitle} style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '24px', marginTop: '0' }}>
          The institutional account has been created successfully and is ready for use. System emails have been dispatched to the user.
        </p>
      </div>

      <div className={styles.contentWrapper}>

      {/* User Information Summary Card */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>User Information Summary</h2>
          <div className={styles.badgeSuccess}>
            <CheckCircle2 size={14} /> Verified {roleName}
          </div>
        </div>

        <div className={styles.summaryGrid}>
          <div className={styles.infoGroup}>
            <span className={styles.infoLabel}>FULL NAME</span>
            <span className={styles.infoValue}>{user.firstName} {user.lastName}</span>
          </div>
          <div className={styles.infoGroup}>
            <span className={styles.infoLabel}>USER TYPE</span>
            <span className={styles.infoValue}>{roleName}</span>
          </div>
          <div className={styles.infoGroup}>
            <span className={styles.infoLabel}>INSTITUTION EMAIL</span>
            <span className={styles.infoValue}>{user.email}</span>
          </div>
          <div className={styles.infoGroup}>
            <span className={styles.infoLabel}>ACCOUNT STATUS</span>
            <div>
              {user.isActive ? (
                <span className={styles.statusActive}>
                  <span className={styles.statusDot}></span> ACTIVE
                </span>
              ) : (
                <span style={{ color: 'orange', fontSize: '0.8125rem', fontWeight: 600 }}>INACTIVE</span>
              )}
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
            <span className={styles.passwordText}>{generatedCredentials?.password}</span>
            <button className={styles.copyBtn} aria-label="Copy Password" onClick={copyPassword}>
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
