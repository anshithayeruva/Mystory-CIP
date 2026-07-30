import React from "react";
import { ShieldAlert } from "lucide-react";
import styles from "../settings.module.css";

interface SecuritySettingsProps {
  formData: {
    twoFactorAuth: boolean;
    emailLoginAlerts: boolean;
    rememberDevice: boolean;
    showEmailStudents: boolean;
    showPhoneStudents: boolean;
    allowStudentsContact: boolean;
  };
  onToggle: (key: string) => void;
}

export default function SecuritySettings({ formData, onToggle }: SecuritySettingsProps) {
  const handleAction = (action: string) => {
    alert(`${action} dialog would open here.`);
  };

  return (
    <div className={styles.contentBody}>
      <p className={styles.contentSubtitle}>Manage your account security and privacy settings.</p>

      {/* Password & Authentication */}
      <div className={styles.formGrid}>
        <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
          <label className={styles.formLabel}>Password</label>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <input 
              type="password" 
              value="********" 
              disabled 
              className={styles.formInput} 
              style={{ maxWidth: '300px' }}
            />
            <button type="button" className={styles.secondaryButton} onClick={() => handleAction('Change Password')}>
              Change Password
            </button>
            <button type="button" className={styles.secondaryButton} onClick={() => handleAction('Manage Devices')}>
              Manage Devices
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '16px' }}>
        <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '16px' }}>Security Settings</h4>
        <div className={styles.toggleList}>
          <div className={styles.toggleRow}>
            <div className={styles.toggleInfo}>
              <span className={styles.toggleTitle}>Two-Factor Authentication (2FA)</span>
              <span className={styles.toggleDesc}>Require an extra security code when logging in.</span>
            </div>
            <button type="button" className={styles.toggleSwitch} aria-checked={formData.twoFactorAuth} onClick={() => onToggle('twoFactorAuth')}>
              <span className={styles.toggleThumb} />
            </button>
          </div>
          <div className={styles.toggleRow}>
            <div className={styles.toggleInfo}>
              <span className={styles.toggleTitle}>Email Login Alerts</span>
              <span className={styles.toggleDesc}>Get notified if anyone logs in from a new device.</span>
            </div>
            <button type="button" className={styles.toggleSwitch} aria-checked={formData.emailLoginAlerts} onClick={() => onToggle('emailLoginAlerts')}>
              <span className={styles.toggleThumb} />
            </button>
          </div>
          <div className={styles.toggleRow}>
            <div className={styles.toggleInfo}>
              <span className={styles.toggleTitle}>Remember This Device</span>
              <span className={styles.toggleDesc}>Skip 2FA on this device for 30 days.</span>
            </div>
            <button type="button" className={styles.toggleSwitch} aria-checked={formData.rememberDevice} onClick={() => onToggle('rememberDevice')}>
              <span className={styles.toggleThumb} />
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '32px' }}>
        <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '16px' }}>Privacy Settings</h4>
        <div className={styles.toggleList}>
          <div className={styles.toggleRow}>
            <div className={styles.toggleInfo}>
              <span className={styles.toggleTitle}>Show Email to Students</span>
              <span className={styles.toggleDesc}>Allow enrolled students to see your faculty email address.</span>
            </div>
            <button type="button" className={styles.toggleSwitch} aria-checked={formData.showEmailStudents} onClick={() => onToggle('showEmailStudents')}>
              <span className={styles.toggleThumb} />
            </button>
          </div>
          <div className={styles.toggleRow}>
            <div className={styles.toggleInfo}>
              <span className={styles.toggleTitle}>Show Phone Number to Students</span>
              <span className={styles.toggleDesc}>Allow enrolled students to see your contact number.</span>
            </div>
            <button type="button" className={styles.toggleSwitch} aria-checked={formData.showPhoneStudents} onClick={() => onToggle('showPhoneStudents')}>
              <span className={styles.toggleThumb} />
            </button>
          </div>
          <div className={styles.toggleRow}>
            <div className={styles.toggleInfo}>
              <span className={styles.toggleTitle}>Allow Students to Contact Me</span>
              <span className={styles.toggleDesc}>Enable the internal messaging system for your students.</span>
            </div>
            <button type="button" className={styles.toggleSwitch} aria-checked={formData.allowStudentsContact} onClick={() => onToggle('allowStudentsContact')}>
              <span className={styles.toggleThumb} />
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div style={{ 
        marginTop: '32px', 
        padding: '24px', 
        border: '1px solid #fecaca', 
        borderRadius: '8px', 
        backgroundColor: '#fef2f2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626' }}>
            <ShieldAlert size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#991b1b', margin: 0 }}>Danger Zone</h4>
            <p style={{ fontSize: '0.875rem', color: '#b91c1c', margin: '4px 0 0 0' }}>Log out from all active sessions across all devices.</p>
          </div>
        </div>
        <button 
          type="button" 
          onClick={() => handleAction('Log out')}
          style={{ 
            backgroundColor: '#dc2626', 
            color: '#ffffff', 
            border: 'none', 
            padding: '10px 16px', 
            borderRadius: '6px', 
            fontWeight: 600, 
            cursor: 'pointer' 
          }}
        >
          Log Out All Devices
        </button>
      </div>

    </div>
  );
}
