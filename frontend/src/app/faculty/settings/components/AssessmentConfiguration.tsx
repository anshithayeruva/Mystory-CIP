import React from "react";
import styles from "../settings.module.css";

interface AssessmentConfigurationProps {
  formData: {
    defaultSessionType: string;
    defaultQuestionType: string;
    defaultDifficulty: string;
    defaultDuration: string;
    attendanceRule: string;
    resultVisibility: string;
    autoSaveDrafts: boolean;
    autoGenerateCode: boolean;
    enableQrByDefault: boolean;
    publishImmediately: boolean;
  };
  onToggle: (key: string) => void;
  onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function AssessmentConfiguration({ formData, onToggle, onSelect }: AssessmentConfigurationProps) {
  return (
    <div className={styles.contentBody}>
      <p className={styles.contentSubtitle}>Configure default Pulse Session behaviour.</p>
      
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Default Session Type</label>
          <select 
            name="defaultSessionType" 
            value={formData.defaultSessionType} 
            onChange={onSelect} 
            className={styles.formSelect}
          >
            <option value="mid-class-check">Mid-Class Check</option>
            <option value="exit-ticket">Exit Ticket</option>
            <option value="quiz">Quiz</option>
            <option value="assignment-review">Assignment Review</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Default Question Type</label>
          <select 
            name="defaultQuestionType" 
            value={formData.defaultQuestionType} 
            onChange={onSelect} 
            className={styles.formSelect}
          >
            <option value="mcq">Multiple Choice Question (MCQ)</option>
            <option value="true-false">True / False</option>
            <option value="short-answer">Short Answer</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Default Difficulty</label>
          <select 
            name="defaultDifficulty" 
            value={formData.defaultDifficulty} 
            onChange={onSelect} 
            className={styles.formSelect}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Default Session Duration</label>
          <select 
            name="defaultDuration" 
            value={formData.defaultDuration} 
            onChange={onSelect} 
            className={styles.formSelect}
          >
            <option value="5">5 Minutes</option>
            <option value="10">10 Minutes</option>
            <option value="15">15 Minutes</option>
            <option value="20">20 Minutes</option>
            <option value="30">30 Minutes</option>
            <option value="45">45 Minutes</option>
            <option value="60">60 Minutes</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Attendance Rule</label>
          <select 
            name="attendanceRule" 
            value={formData.attendanceRule} 
            onChange={onSelect} 
            className={styles.formSelect}
          >
            <option value="mandatory">Mandatory</option>
            <option value="optional">Optional</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Result Visibility</label>
          <select 
            name="resultVisibility" 
            value={formData.resultVisibility} 
            onChange={onSelect} 
            className={styles.formSelect}
          >
            <option value="immediately">Immediately</option>
            <option value="after-ends">After Session Ends</option>
          </select>
        </div>
      </div>

      <div className={styles.toggleList}>
        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleTitle}>Auto Save Draft Sessions</span>
            <span className={styles.toggleDesc}>Automatically save changes while creating a session.</span>
          </div>
          <button 
            type="button"
            className={styles.toggleSwitch} 
            aria-checked={formData.autoSaveDrafts}
            onClick={() => onToggle('autoSaveDrafts')}
          >
            <span className={styles.toggleThumb} />
          </button>
        </div>

        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleTitle}>Auto Generate Session Code</span>
            <span className={styles.toggleDesc}>Generate a unique 6-digit code for new sessions.</span>
          </div>
          <button 
            type="button"
            className={styles.toggleSwitch} 
            aria-checked={formData.autoGenerateCode}
            onClick={() => onToggle('autoGenerateCode')}
          >
            <span className={styles.toggleThumb} />
          </button>
        </div>

        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleTitle}>Enable QR Code by Default</span>
            <span className={styles.toggleDesc}>Display a scannable QR code when a session goes live.</span>
          </div>
          <button 
            type="button"
            className={styles.toggleSwitch} 
            aria-checked={formData.enableQrByDefault}
            onClick={() => onToggle('enableQrByDefault')}
          >
            <span className={styles.toggleThumb} />
          </button>
        </div>

        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleTitle}>Publish Immediately by Default</span>
            <span className={styles.toggleDesc}>Skip the draft state and launch sessions immediately.</span>
          </div>
          <button 
            type="button"
            className={styles.toggleSwitch} 
            aria-checked={formData.publishImmediately}
            onClick={() => onToggle('publishImmediately')}
          >
            <span className={styles.toggleThumb} />
          </button>
        </div>
      </div>
    </div>
  );
}
