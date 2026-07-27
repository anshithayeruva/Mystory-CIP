import React from "react";
import { Search, Download, ShieldCheck, Clock, Shield, RotateCcw } from "lucide-react";
import styles from "../settings.module.css";
import reportsStyles from "../../reports/reports.module.css";

export default function SecurityTab() {
  return (
    <div className={styles.tabContent}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
        {/* Password Policy */}
        <div className={styles.sectionCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 32, height: 32, backgroundColor: '#ecfdf5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#064e3b' }}>
              <ShieldCheck size={18} />
            </div>
            <div className={styles.sectionTitle}>Password Policy</div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Min Length</label>
            <input className={styles.input} type="number" defaultValue="12" />
          </div>
          <div className={styles.toggleRow} style={{ padding: '8px 0' }}>
            <span className={styles.toggleTitle} style={{ fontSize: '0.75rem', fontWeight: 500 }}>Require Uppercase</span>
            <label className={styles.switch}>
              <input type="checkbox" defaultChecked />
              <span className={styles.slider}></span>
            </label>
          </div>
          <div className={styles.toggleRow} style={{ padding: '8px 0' }}>
            <span className={styles.toggleTitle} style={{ fontSize: '0.75rem', fontWeight: 500 }}>Require Numbers</span>
            <label className={styles.switch}>
              <input type="checkbox" defaultChecked />
              <span className={styles.slider}></span>
            </label>
          </div>
          <div className={styles.toggleRow} style={{ padding: '8px 0' }}>
            <span className={styles.toggleTitle} style={{ fontSize: '0.75rem', fontWeight: 500 }}>Special Characters</span>
            <label className={styles.switch}>
              <input type="checkbox" defaultChecked />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>

        {/* Session Management */}
        <div className={styles.sectionCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 32, height: 32, backgroundColor: '#f1f5f9', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569' }}>
              <Clock size={18} />
            </div>
            <div className={styles.sectionTitle}>Session Management</div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Timeout (Minutes)</label>
            <input className={styles.input} type="number" defaultValue="30" />
          </div>
          <div className={styles.toggleRow} style={{ padding: '8px 0' }}>
            <span className={styles.toggleTitle} style={{ fontSize: '0.75rem', fontWeight: 500 }}>Auto Logout</span>
            <label className={styles.switch}>
              <input type="checkbox" defaultChecked />
              <span className={styles.slider}></span>
            </label>
          </div>
          <div className={styles.formGroup} style={{ marginTop: 8 }}>
            <label className={styles.label}>Concurrent Login Limit</label>
            <select className={styles.select} defaultValue="3 Devices">
              <option>1 Device</option>
              <option>3 Devices</option>
              <option>Unlimited</option>
            </select>
          </div>
        </div>

        {/* Authentication */}
        <div className={styles.sectionCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 32, height: 32, backgroundColor: '#f0fdf4', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#166534' }}>
              <Shield size={18} />
            </div>
            <div className={styles.sectionTitle}>Authentication</div>
          </div>
          
          <div style={{ padding: 12, backgroundColor: '#f8fafc', borderRadius: 8, border: '1px solid var(--surface-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div className={styles.toggleInfo}>
              <div className={styles.toggleTitle}>Two-Factor Auth (2FA)</div>
              <div className={styles.toggleDesc}>Add an extra layer of security via mobile app.</div>
            </div>
            <button className={styles.btnSave} style={{ padding: '4px 10px' }}>Enable</button>
          </div>

          <div style={{ padding: 12, backgroundColor: '#f8fafc', borderRadius: 8, border: '1px solid var(--surface-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div className={styles.toggleInfo}>
              <div className={styles.toggleTitle}>OTP Login</div>
              <div className={styles.toggleDesc}>Require one-time password for every new login.</div>
            </div>
            <button className={styles.btnCancel} style={{ padding: '4px 10px', fontSize: '0.7rem' }}>Enabled</button>
          </div>
        </div>
      </div>

      <div className={styles.sectionCard} style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--surface-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <RotateCcw size={20} color="#064e3b" />
            <div className={styles.sectionTitle} style={{ fontSize: '1.05rem' }}>Audit Logs</div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: 10, top: 10, color: 'var(--text-muted)' }} />
              <input type="text" className={styles.input} placeholder="Filter logs..." style={{ paddingLeft: 32, width: 200 }} />
            </div>
            <button className={styles.btnCancel} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Download size={14} /> Export
            </button>
          </div>
        </div>
        
        <div className={reportsStyles.tableWrapper}>
          <table className={reportsStyles.table}>
            <thead>
              <tr>
                <th>User</th>
                <th>Action</th>
                <th>Date</th>
                <th>IP Address</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: '#e0e7ff', color: '#3730a3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 600 }}>JD</div>
                    <span style={{ fontWeight: 600, fontSize: '0.8rem' }}>Jane Doe</span>
                  </div>
                </td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Changed Password Policy</td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Oct 24, 2023 • 14:22</td>
                <td>
                  <span style={{ backgroundColor: '#f1f5f9', padding: '2px 6px', borderRadius: 4, fontFamily: 'monospace', fontSize: '0.75rem', color: '#475569' }}>192.168.1.104</span>
                </td>
              </tr>
              <tr>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: '#dcfce7', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 600 }}>SM</div>
                    <span style={{ fontWeight: 600, fontSize: '0.8rem' }}>Samuel Miller</span>
                  </div>
                </td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Enabled 2FA</td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Oct 24, 2023 • 11:05</td>
                <td>
                  <span style={{ backgroundColor: '#f1f5f9', padding: '2px 6px', borderRadius: 4, fontFamily: 'monospace', fontSize: '0.75rem', color: '#475569' }}>45.22.109.12</span>
                </td>
              </tr>
              <tr>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: '#f1f5f9', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 600 }}>AK</div>
                    <span style={{ fontWeight: 600, fontSize: '0.8rem' }}>Ahmed Khan</span>
                  </div>
                </td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Failed Login Attempt</td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Oct 23, 2023 • 23:58</td>
                <td>
                  <span style={{ backgroundColor: '#fee2e2', padding: '2px 6px', borderRadius: 4, fontFamily: 'monospace', fontSize: '0.75rem', color: '#b91c1c' }}>172.16.254.1</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ padding: '12px 20px', backgroundColor: '#f8fafc', borderTop: '1px solid var(--surface-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span>Showing 4 of 2,450 results</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className={styles.btnCancel} style={{ padding: '4px 8px', fontSize: '0.75rem' }}>&lt;</button>
            <button className={styles.btnCancel} style={{ padding: '4px 8px', fontSize: '0.75rem' }}>&gt;</button>
          </div>
        </div>
      </div>
      
      <div className={styles.btnGroupPageLevel}>
        <button className={styles.btnCancel}>Discard</button>
        <button className={styles.btnSave}>Save Changes</button>
      </div>
    </div>
  );
}
