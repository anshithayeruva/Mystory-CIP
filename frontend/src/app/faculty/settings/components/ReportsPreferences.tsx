import React from "react";
import styles from "../settings.module.css";

interface ReportsPreferencesProps {
  formData: {
    exportFormat: string;
    defaultPeriod: string;
    autoGenWeekly: boolean;
    autoGenMonthly: boolean;
    includeCharts: boolean;
    downloadAutomatically: boolean;
  };
  onToggle: (key: string) => void;
  onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function ReportsPreferences({ formData, onToggle, onSelect }: ReportsPreferencesProps) {
  return (
    <div className={styles.contentBody}>
      <p className={styles.contentSubtitle}>Configure report generation behaviour.</p>

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Preferred Export Format</label>
          <select 
            name="exportFormat" 
            value={formData.exportFormat} 
            onChange={onSelect} 
            className={styles.formSelect}
          >
            <option value="pdf">PDF</option>
            <option value="excel">Excel</option>
            <option value="csv">CSV</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Default Report Period</label>
          <select 
            name="defaultPeriod" 
            value={formData.defaultPeriod} 
            onChange={onSelect} 
            className={styles.formSelect}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="semester">Semester</option>
          </select>
        </div>
      </div>
      
      <div className={styles.toggleList}>
        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleTitle}>Auto Generate Weekly Summary</span>
            <span className={styles.toggleDesc}>Automatically compile student performance every Friday.</span>
          </div>
          <button 
            type="button"
            className={styles.toggleSwitch} 
            aria-checked={formData.autoGenWeekly}
            onClick={() => onToggle('autoGenWeekly')}
          >
            <span className={styles.toggleThumb} />
          </button>
        </div>

        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleTitle}>Auto Generate Monthly Summary</span>
            <span className={styles.toggleDesc}>Create a comprehensive overview at the end of each month.</span>
          </div>
          <button 
            type="button"
            className={styles.toggleSwitch} 
            aria-checked={formData.autoGenMonthly}
            onClick={() => onToggle('autoGenMonthly')}
          >
            <span className={styles.toggleThumb} />
          </button>
        </div>

        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleTitle}>Include Charts in Reports</span>
            <span className={styles.toggleDesc}>Embed visual graphs for attendance and grades in exported PDFs.</span>
          </div>
          <button 
            type="button"
            className={styles.toggleSwitch} 
            aria-checked={formData.includeCharts}
            onClick={() => onToggle('includeCharts')}
          >
            <span className={styles.toggleThumb} />
          </button>
        </div>

        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleTitle}>Download Reports Automatically</span>
            <span className={styles.toggleDesc}>Instantly download files to your device when reports are generated.</span>
          </div>
          <button 
            type="button"
            className={styles.toggleSwitch} 
            aria-checked={formData.downloadAutomatically}
            onClick={() => onToggle('downloadAutomatically')}
          >
            <span className={styles.toggleThumb} />
          </button>
        </div>
      </div>
    </div>
  );
}
