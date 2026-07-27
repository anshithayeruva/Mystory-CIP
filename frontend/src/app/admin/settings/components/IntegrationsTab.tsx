import React from "react";
import { Database, BookOpen, GraduationCap, Users, LayoutDashboard, Info, CheckCircle } from "lucide-react";
import styles from "../settings.module.css";

export default function IntegrationsTab() {
  return (
    <div className={styles.tabContent}>
      <div className={styles.sectionCard} style={{ padding: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr', padding: '12px 20px', borderBottom: '1px solid var(--surface-border)', backgroundColor: '#f8fafc', fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <div>Service</div>
          <div>Description</div>
          <div style={{ textAlign: 'center' }}>Status</div>
          <div style={{ textAlign: 'right' }}>Action</div>
        </div>
        
        <div className={styles.integrationList} style={{ padding: '0 20px' }}>
          {/* ERP System */}
          <div className={styles.integrationItem}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
              <div className={styles.integrationIconBox}>
                <Database size={20} />
              </div>
              <div className={styles.integrationInfo}>
                <div className={styles.integrationTitle}>ERP System</div>
                <div className={styles.integrationDesc}>Enterprise Resource Planning</div>
              </div>
            </div>
            <div style={{ flex: 2, fontSize: '0.75rem', color: 'var(--text-muted)', paddingRight: 20 }}>
              Centralized database for institutional resources and student financials.
            </div>
            <div className={styles.integrationStatus}>
              <span className={`${styles.badge} ${styles.badgeConnected}`}>
                <span className={styles.badgeDot}></span> Connected
              </span>
            </div>
            <div className={styles.integrationAction}>
              <button className={styles.btnDisconnect}>Disconnect</button>
            </div>
          </div>

          {/* Moodle */}
          <div className={styles.integrationItem}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
              <div className={`${styles.integrationIconBox} ${styles.moodle}`}>
                <GraduationCap size={20} />
              </div>
              <div className={styles.integrationInfo}>
                <div className={styles.integrationTitle}>Moodle</div>
                <div className={styles.integrationDesc}>LMS Platform</div>
              </div>
            </div>
            <div style={{ flex: 2, fontSize: '0.75rem', color: 'var(--text-muted)', paddingRight: 20 }}>
              Sync course materials and student grades directly with your LMS.
            </div>
            <div className={styles.integrationStatus}>
              <span className={`${styles.badge} ${styles.badgeNotConnected}`}>
                <span className={styles.badgeDot}></span> Not Connected
              </span>
            </div>
            <div className={styles.integrationAction}>
              <button className={styles.btnConnect}>Connect</button>
            </div>
          </div>

          {/* Google Classroom */}
          <div className={styles.integrationItem}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
              <div className={`${styles.integrationIconBox} ${styles.google}`}>
                <LayoutDashboard size={20} />
              </div>
              <div className={styles.integrationInfo}>
                <div className={styles.integrationTitle}>Google Classroom</div>
                <div className={styles.integrationDesc}>Education Suite</div>
              </div>
            </div>
            <div style={{ flex: 2, fontSize: '0.75rem', color: 'var(--text-muted)', paddingRight: 20 }}>
              Integration with Google Workspace for Education and assignments.
            </div>
            <div className={styles.integrationStatus}>
              <span className={`${styles.badge} ${styles.badgeConnected}`}>
                <span className={styles.badgeDot}></span> Connected
              </span>
            </div>
            <div className={styles.integrationAction}>
              <button className={styles.btnDisconnect}>Disconnect</button>
            </div>
          </div>

          {/* Microsoft Teams */}
          <div className={styles.integrationItem}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
              <div className={`${styles.integrationIconBox} ${styles.teams}`}>
                <Users size={20} />
              </div>
              <div className={styles.integrationInfo}>
                <div className={styles.integrationTitle}>Microsoft Teams</div>
                <div className={styles.integrationDesc}>Collaboration Tool</div>
              </div>
            </div>
            <div style={{ flex: 2, fontSize: '0.75rem', color: 'var(--text-muted)', paddingRight: 20 }}>
              Enable real-time communication and virtual classroom links.
            </div>
            <div className={styles.integrationStatus}>
              <span className={`${styles.badge} ${styles.badgeConnected}`}>
                <span className={styles.badgeDot}></span> Connected
              </span>
            </div>
            <div className={styles.integrationAction}>
              <button className={styles.btnDisconnect}>Disconnect</button>
            </div>
          </div>

          {/* Canvas */}
          <div className={styles.integrationItem}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
              <div className={`${styles.integrationIconBox} ${styles.canvas}`}>
                <BookOpen size={20} />
              </div>
              <div className={styles.integrationInfo}>
                <div className={styles.integrationTitle}>Canvas</div>
                <div className={styles.integrationDesc}>LMS Platform</div>
              </div>
            </div>
            <div style={{ flex: 2, fontSize: '0.75rem', color: 'var(--text-muted)', paddingRight: 20 }}>
              Comprehensive LMS integration for modern higher education workflows.
            </div>
            <div className={styles.integrationStatus}>
              <span className={`${styles.badge} ${styles.badgeNotConnected}`}>
                <span className={styles.badgeDot}></span> Not Connected
              </span>
            </div>
            <div className={styles.integrationAction}>
              <button className={styles.btnConnect}>Connect</button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.sectionCard} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-muted)', fontSize: '0.75rem' }}>
          <Info size={16} /> Integration changes may take up to 30 minutes to propagate across all systems.
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className={styles.btnCancel}>Cancel</button>
          <button className={styles.btnSave}>Save Changes <CheckCircle size={14} style={{ marginLeft: 4 }} /></button>
        </div>
      </div>
    </div>
  );
}
