import React from "react";
import styles from "../settings.module.css";

interface NotificationSettingsProps {
  formData: {
    pulseCreated: boolean;
    sessionReminder: boolean;
    studentJoined: boolean;
    sessionCompleted: boolean;
    summaryReady: boolean;
    gapReportReady: boolean;
    weeklyReport: boolean;
    monthlySummary: boolean;
    systemAnnouncements: boolean;
    frequency: string;
  };
  onToggle: (key: string) => void;
  onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function NotificationSettings({ formData, onToggle, onSelect }: NotificationSettingsProps) {
  return (
    <div className={styles.contentBody}>
      <p className={styles.contentSubtitle}>Control your email and platform notification preferences.</p>

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Notification Frequency</label>
          <select 
            name="frequency" 
            value={formData.frequency} 
            onChange={onSelect} 
            className={styles.formSelect}
          >
            <option value="instant">Instant</option>
            <option value="daily">Daily Digest</option>
            <option value="weekly">Weekly Digest</option>
          </select>
        </div>
      </div>

      <div className={styles.toggleList}>
        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleTitle}>Pulse Session Created</span>
            <span className={styles.toggleDesc}>Notify when a new session is scheduled.</span>
          </div>
          <button type="button" className={styles.toggleSwitch} aria-checked={formData.pulseCreated} onClick={() => onToggle('pulseCreated')}>
            <span className={styles.toggleThumb} />
          </button>
        </div>

        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleTitle}>Session Reminder</span>
            <span className={styles.toggleDesc}>Reminder before a scheduled session starts.</span>
          </div>
          <button type="button" className={styles.toggleSwitch} aria-checked={formData.sessionReminder} onClick={() => onToggle('sessionReminder')}>
            <span className={styles.toggleThumb} />
          </button>
        </div>

        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleTitle}>Student Joined Session</span>
            <span className={styles.toggleDesc}>Alert when students join a waiting room.</span>
          </div>
          <button type="button" className={styles.toggleSwitch} aria-checked={formData.studentJoined} onClick={() => onToggle('studentJoined')}>
            <span className={styles.toggleThumb} />
          </button>
        </div>

        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleTitle}>Session Completed</span>
            <span className={styles.toggleDesc}>Confirmation when a session is marked complete.</span>
          </div>
          <button type="button" className={styles.toggleSwitch} aria-checked={formData.sessionCompleted} onClick={() => onToggle('sessionCompleted')}>
            <span className={styles.toggleThumb} />
          </button>
        </div>

        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleTitle}>Session Summary Ready</span>
            <span className={styles.toggleDesc}>Notification when post-session analysis is available.</span>
          </div>
          <button type="button" className={styles.toggleSwitch} aria-checked={formData.summaryReady} onClick={() => onToggle('summaryReady')}>
            <span className={styles.toggleThumb} />
          </button>
        </div>

        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleTitle}>Concept Gap Report Ready</span>
            <span className={styles.toggleDesc}>Alert when a new concept gap report is generated.</span>
          </div>
          <button type="button" className={styles.toggleSwitch} aria-checked={formData.gapReportReady} onClick={() => onToggle('gapReportReady')}>
            <span className={styles.toggleThumb} />
          </button>
        </div>

        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleTitle}>Weekly Report Email</span>
            <span className={styles.toggleDesc}>Receive an aggregated summary every week.</span>
          </div>
          <button type="button" className={styles.toggleSwitch} aria-checked={formData.weeklyReport} onClick={() => onToggle('weeklyReport')}>
            <span className={styles.toggleThumb} />
          </button>
        </div>

        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleTitle}>Monthly Performance Summary</span>
            <span className={styles.toggleDesc}>Receive a detailed monthly performance review.</span>
          </div>
          <button type="button" className={styles.toggleSwitch} aria-checked={formData.monthlySummary} onClick={() => onToggle('monthlySummary')}>
            <span className={styles.toggleThumb} />
          </button>
        </div>

        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleTitle}>System Announcements</span>
            <span className={styles.toggleDesc}>Important platform updates and maintenance notices.</span>
          </div>
          <button type="button" className={styles.toggleSwitch} aria-checked={formData.systemAnnouncements} onClick={() => onToggle('systemAnnouncements')}>
            <span className={styles.toggleThumb} />
          </button>
        </div>
      </div>
    </div>
  );
}
