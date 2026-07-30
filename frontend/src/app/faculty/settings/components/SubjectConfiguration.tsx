import React from "react";
import styles from "../settings.module.css";

interface SubjectConfigurationProps {
  formData: {
    displayAssigned: boolean;
    defaultView: string;
    defaultSorting: string;
    showArchived: boolean;
    expandUnits: boolean;
    rememberLastOpened: boolean;
  };
  onToggle: (key: string) => void;
  onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SubjectConfiguration({ formData, onToggle, onSelect }: SubjectConfigurationProps) {
  return (
    <div className={styles.contentBody}>
      <p className={styles.contentSubtitle}>Configure default behaviour related to assigned subjects.</p>
      
      <div className={styles.toggleList}>
        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleTitle}>Display Assigned Subjects on Dashboard</span>
            <span className={styles.toggleDesc}>Show quick links to your subjects on the main dashboard.</span>
          </div>
          <button 
            type="button"
            className={styles.toggleSwitch} 
            aria-checked={formData.displayAssigned}
            onClick={() => onToggle('displayAssigned')}
          >
            <span className={styles.toggleThumb} />
          </button>
        </div>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Default Subject View</label>
          <select 
            name="defaultView" 
            value={formData.defaultView} 
            onChange={onSelect} 
            className={styles.formSelect}
          >
            <option value="card">Card View</option>
            <option value="table">Table View</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Default Sorting</label>
          <select 
            name="defaultSorting" 
            value={formData.defaultSorting} 
            onChange={onSelect} 
            className={styles.formSelect}
          >
            <option value="alphabetical">Alphabetical</option>
            <option value="recent">Recently Added</option>
            <option value="semester">Semester</option>
          </select>
        </div>
      </div>

      <div className={styles.toggleList}>
        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleTitle}>Show Archived Subjects</span>
            <span className={styles.toggleDesc}>Include past or archived subjects in your active lists.</span>
          </div>
          <button 
            type="button"
            className={styles.toggleSwitch} 
            aria-checked={formData.showArchived}
            onClick={() => onToggle('showArchived')}
          >
            <span className={styles.toggleThumb} />
          </button>
        </div>

        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleTitle}>Expand Units by Default</span>
            <span className={styles.toggleDesc}>Automatically expand all units when viewing a subject curriculum.</span>
          </div>
          <button 
            type="button"
            className={styles.toggleSwitch} 
            aria-checked={formData.expandUnits}
            onClick={() => onToggle('expandUnits')}
          >
            <span className={styles.toggleThumb} />
          </button>
        </div>

        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleTitle}>Remember Last Opened Subject</span>
            <span className={styles.toggleDesc}>Navigate to the last active subject upon login.</span>
          </div>
          <button 
            type="button"
            className={styles.toggleSwitch} 
            aria-checked={formData.rememberLastOpened}
            onClick={() => onToggle('rememberLastOpened')}
          >
            <span className={styles.toggleThumb} />
          </button>
        </div>
      </div>
    </div>
  );
}
