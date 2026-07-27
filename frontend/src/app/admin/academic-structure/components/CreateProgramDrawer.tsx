"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import styles from "../academic.module.css";
import { Department } from "./DepartmentTable";

interface CreateProgramDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  departments: Department[];
  onSubmit: (programName: string, department: string, degreeLevel: string, duration: string) => void;
}

export default function CreateProgramDrawer({ isOpen, onClose, departments, onSubmit }: CreateProgramDrawerProps) {
  const [programName, setProgramName] = useState("");
  const [department, setDepartment] = useState("");
  const [degreeLevel, setDegreeLevel] = useState("");
  const [duration, setDuration] = useState("");
  const [intake, setIntake] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const isFormValid = programName.trim() && department && degreeLevel && duration;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    onSubmit(programName.trim(), department, degreeLevel, duration);
    
    // Reset form
    setProgramName("");
    setDepartment("");
    setDegreeLevel("");
    setDuration("");
    setIntake("");
    setDescription("");
  };

  return (
    <div className={styles.drawerOverlay}>
      <div className={styles.drawerContainer}>
        <div className={styles.drawerHeader}>
          <div className={styles.drawerTitleArea}>
            <h2 className={styles.drawerTitle}>Create Academic Program</h2>
            <p className={styles.drawerSubtitle}>Add a new academic program under an existing department.</p>
          </div>
          <button className={styles.drawerCloseBtn} onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className={styles.drawerBody}>
          <div className={styles.drawerFormGroup}>
            <label className={styles.drawerLabel}>
              Program Name <span>*</span>
            </label>
            <input 
              type="text" 
              className={styles.drawerInput} 
              placeholder="Enter program name (e.g. B.Tech Computer Science)" 
              value={programName}
              onChange={(e) => setProgramName(e.target.value)}
              autoFocus
            />
          </div>

          <div className={styles.drawerFormGroup}>
            <label className={styles.drawerLabel}>
              Department <span>*</span>
            </label>
            <select 
              className={styles.drawerSelect}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.name}>{dept.name}</option>
              ))}
            </select>
          </div>

          <div className={styles.drawerFormGroup}>
            <label className={styles.drawerLabel}>
              Degree Level <span>*</span>
            </label>
            <select 
              className={styles.drawerSelect}
              value={degreeLevel}
              onChange={(e) => setDegreeLevel(e.target.value)}
            >
              <option value="">Select Degree Level</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="Diploma">Diploma</option>
              <option value="Doctorate">Doctorate</option>
            </select>
          </div>

          <div className={styles.drawerFormGroup}>
            <label className={styles.drawerLabel}>
              Duration <span>*</span>
            </label>
            <select 
              className={styles.drawerSelect}
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="">Select Duration</option>
              <option value="1 Year">1 Year</option>
              <option value="2 Years">2 Years</option>
              <option value="3 Years">3 Years</option>
              <option value="4 Years">4 Years</option>
              <option value="5 Years">5 Years</option>
              <option value="6 Years">6 Years</option>
            </select>
          </div>

          <div className={styles.drawerFormGroup}>
            <label className={styles.drawerLabel}>Intake Capacity (Optional)</label>
            <input 
              type="number" 
              className={styles.drawerInput} 
              placeholder="Example: 240" 
              value={intake}
              onChange={(e) => setIntake(e.target.value)}
            />
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Maximum number of students that can enroll in this program.
            </span>
          </div>

          <div className={styles.drawerFormGroup}>
            <label className={styles.drawerLabel}>Description (Optional)</label>
            <textarea 
              className={styles.drawerTextarea} 
              placeholder="Provide a brief description of this academic program."
              rows={4}
              style={{ resize: "none" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.drawerFooter}>
          <button className={styles.drawerBtnCancel} onClick={onClose}>
            Cancel
          </button>
          <button 
            className={styles.drawerBtnCreate} 
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            Create Program
          </button>
        </div>
      </div>
    </div>
  );
}
