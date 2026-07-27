"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import styles from "../academic.module.css";

interface CreateDepartmentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (departmentName: string, hodName: string) => void;
}

export default function CreateDepartmentDrawer({ isOpen, onClose, onSubmit }: CreateDepartmentDrawerProps) {
  const [departmentName, setDepartmentName] = useState("");
  const [hod, setHod] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!departmentName.trim()) return;

    onSubmit(departmentName.trim(), hod || "Not Assigned");
    
    // Reset form
    setDepartmentName("");
    setHod("");
    setDescription("");
  };

  return (
    <div className={styles.drawerOverlay}>
      <div className={styles.drawerContainer}>
        <div className={styles.drawerHeader}>
          <div className={styles.drawerTitleArea}>
            <h2 className={styles.drawerTitle}>Create Department</h2>
            <p className={styles.drawerSubtitle}>Add a new academic department to your institution.</p>
          </div>
          <button className={styles.drawerCloseBtn} onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className={styles.drawerBody}>
          <div className={styles.drawerFormGroup}>
            <label className={styles.drawerLabel}>
              Department Name <span>*</span>
            </label>
            <input 
              type="text" 
              className={styles.drawerInput} 
              placeholder="Enter department name" 
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              autoFocus
            />
          </div>

          <div className={styles.drawerFormGroup}>
            <label className={styles.drawerLabel}>Head of Department (Optional)</label>
            <select 
              className={styles.drawerSelect}
              value={hod}
              onChange={(e) => setHod(e.target.value)}
            >
              <option value="">Select HoD</option>
              <option value="Dr. Sarah Jenkins">Dr. Sarah Jenkins</option>
              <option value="Dr. Alan Turing">Dr. Alan Turing</option>
              <option value="Dr. Katherine Johnson">Dr. Katherine Johnson</option>
            </select>
            {!hod && (
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                No Head of Department assigned
              </span>
            )}
          </div>

          <div className={styles.drawerFormGroup}>
            <label className={styles.drawerLabel}>Description (Optional)</label>
            <textarea 
              className={styles.drawerTextarea} 
              placeholder="Provide a brief description of this department."
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
            disabled={!departmentName.trim()}
          >
            Create Department
          </button>
        </div>
      </div>
    </div>
  );
}
