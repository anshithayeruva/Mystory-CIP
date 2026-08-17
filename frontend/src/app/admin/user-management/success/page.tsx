"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, CheckCircle, ShieldCheck, Mail, AlertTriangle } from "lucide-react";
import styles from "./success.module.css";

export default function UserSuccessPage() {
  const [createdUser, setCreatedUser] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('lastCreatedUser');
    if (data) {
      setCreatedUser(JSON.parse(data));
    }
  }, []);

  if (!createdUser) {
    return <div style={{ padding: "2rem" }}>Loading... (or no user data found)</div>;
  }

  const roleName = createdUser.role === 'HOD' ? 'HoD' : createdUser.role === 'FACULTY' ? 'Faculty' : 'Student';

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
            <span className={styles.infoValue}>{createdUser.name}</span>
          </div>
          <div className={styles.infoGroup}>
            <span className={styles.infoLabel}>USER TYPE</span>
            <span className={styles.infoValue}>{roleName}</span>
          </div>
          <div className={styles.infoGroup}>
            <span className={styles.infoLabel}>INSTITUTION EMAIL</span>
            <span className={styles.infoValue}>{createdUser.email}</span>
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
      </div>

      {/* Credential Delivery Notice */}
      <div className={styles.passwordCard}>
        <div className={styles.passwordLeft}>
          <div className={styles.passwordHeader}>
            <ShieldCheck size={20} color="#0f172a" />
            Secure Credentials Dispatched
          </div>
          
          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <Mail size={24} color="#00522E" />
            <div>
              <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '14px' }}>Credentials sent to {createdUser.email}</div>
              <div style={{ color: '#64748b', fontSize: '13px', marginTop: '4px' }}>A secure temporary password has been emailed directly to the user.</div>
            </div>
          </div>

          <div className={styles.warning} style={{ marginTop: '16px' }}>
            <AlertTriangle size={14} className={styles.warningIcon} />
            <span>For security reasons, temporary passwords are <strong>never displayed on screen</strong>. The user will be required to set a permanent password upon first login.</span>
          </div>
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
