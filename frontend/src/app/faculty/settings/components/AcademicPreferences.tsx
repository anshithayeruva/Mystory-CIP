import React from "react";
import styles from "../settings.module.css";

interface AcademicPreferencesProps {
  formData: {
    defaultDepartment: string;
    defaultProgram: string;
    defaultSemester: string;
    defaultAcademicYear: string;
    defaultSection: string;
    preferredSubject: string;
  };
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function AcademicPreferences({ formData, onChange }: AcademicPreferencesProps) {
  return (
    <div className={styles.contentBody}>
      <p className={styles.contentSubtitle}>Configure your general academic preferences, terms, and defaults here.</p>
      
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Default Department</label>
          <select 
            name="defaultDepartment" 
            value={formData.defaultDepartment} 
            onChange={onChange} 
            className={styles.formSelect}
          >
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Mathematics">Mathematics</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Default Program</label>
          <select 
            name="defaultProgram" 
            value={formData.defaultProgram} 
            onChange={onChange} 
            className={styles.formSelect}
          >
            <option value="BSc Computer Science">BSc Computer Science</option>
            <option value="BSc IT">BSc IT</option>
            <option value="MSc Computer Science">MSc Computer Science</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Default Semester</label>
          <select 
            name="defaultSemester" 
            value={formData.defaultSemester} 
            onChange={onChange} 
            className={styles.formSelect}
          >
            <option value="Fall">Fall Semester</option>
            <option value="Spring">Spring Semester</option>
            <option value="Summer">Summer Semester</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Default Academic Year</label>
          <select 
            name="defaultAcademicYear" 
            value={formData.defaultAcademicYear} 
            onChange={onChange} 
            className={styles.formSelect}
          >
            <option value="2022-2023">2022-2023</option>
            <option value="2023-2024">2023-2024</option>
            <option value="2024-2025">2024-2025</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Default Section</label>
          <select 
            name="defaultSection" 
            value={formData.defaultSection} 
            onChange={onChange} 
            className={styles.formSelect}
          >
            <option value="Section A">Section A</option>
            <option value="Section B">Section B</option>
            <option value="Section C">Section C</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Preferred Subject</label>
          <select 
            name="preferredSubject" 
            value={formData.preferredSubject} 
            onChange={onChange} 
            className={styles.formSelect}
          >
            <option value="Data Structures">Data Structures</option>
            <option value="Algorithms">Algorithms</option>
            <option value="Database Systems">Database Systems</option>
          </select>
        </div>
      </div>
    </div>
  );
}
