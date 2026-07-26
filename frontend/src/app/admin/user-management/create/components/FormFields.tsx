"use client";

import { CheckCircle2, GraduationCap, Users, UserSquare2, FileText, Settings2, Briefcase } from "lucide-react";
import styles from "../create.module.css";

interface FormFieldsProps {
  userType: "student" | "faculty" | "hod";
  setUserType: (type: "student" | "faculty" | "hod") => void;
}

export default function FormFields({ userType, setUserType }: FormFieldsProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* USER TYPE */}
      <div>
        <h2 style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-main)", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 12px 12px" }}>USER TYPE</h2>
        <div className={styles.userTypeGrid}>
          <div 
            className={`${styles.typeCard} ${userType === "student" ? styles.typeCardActive : ""}`}
            onClick={() => setUserType("student")}
          >
            {userType === "student" && <CheckCircle2 className={styles.checkIcon} size={16} />}
            <GraduationCap className={styles.typeCardIcon} size={24} />
            <div className={styles.typeCardTitle}>Student</div>
            <div className={styles.typeCardDesc}>Enroll new learner</div>
          </div>
          
          <div 
            className={`${styles.typeCard} ${userType === "faculty" ? styles.typeCardActive : ""}`}
            onClick={() => setUserType("faculty")}
          >
            {userType === "faculty" && <CheckCircle2 className={styles.checkIcon} size={16} />}
            <UserSquare2 className={styles.typeCardIcon} size={24} />
            <div className={styles.typeCardTitle}>Faculty</div>
            <div className={styles.typeCardDesc}>Academic staff member</div>
          </div>

          <div 
            className={`${styles.typeCard} ${userType === "hod" ? styles.typeCardActive : ""}`}
            onClick={() => setUserType("hod")}
          >
            {userType === "hod" && <CheckCircle2 className={styles.checkIcon} size={16} />}
            <Users className={styles.typeCardIcon} size={24} />
            <div className={styles.typeCardTitle}>HoD</div>
            <div className={styles.typeCardDesc}>Head of Department</div>
          </div>
        </div>
      </div>

      {/* BASIC INFORMATION */}
      <div className={styles.formSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <UserSquare2 size={20} />
          </div>
          <div className={styles.sectionTitle}>Basic Information</div>
        </div>

        <div className={styles.inputGrid2}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>FIRST NAME <span className={styles.required}>*</span></label>
            <input type="text" className={styles.input} placeholder="e.g. Jonathan" />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>LAST NAME <span className={styles.required}>*</span></label>
            <input type="text" className={styles.input} placeholder="e.g. Doe" />
          </div>
        </div>
        <div className={styles.inputGroup} style={{ width: "50%" }}>
          <label className={styles.label}>PHONE NUMBER (OPTIONAL)</label>
          <div style={{ display: "flex" }}>
            <span style={{ padding: "10px", border: "1px solid var(--surface-border)", borderRight: "none", borderRadius: "var(--radius-sm) 0 0 var(--radius-sm)", backgroundColor: "#f8fafc", color: "var(--text-muted)", fontSize: "0.875rem" }}>+1</span>
            <input type="text" className={styles.input} placeholder="555-0123" style={{ flex: 1, borderRadius: "0 var(--radius-sm) var(--radius-sm) 0" }} />
          </div>
        </div>
      </div>

      {/* ACADEMIC / PROFESSIONAL INFORMATION */}
      <div className={styles.formSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            {userType === "student" ? <FileText size={20} /> : <Briefcase size={20} />}
          </div>
          <div className={styles.sectionTitle}>
            {userType === "student" ? "Academic Information" : "Professional Information"}
          </div>
        </div>

        {userType === "student" ? (
          <>
            <div className={styles.inputGrid3}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>DEPARTMENT <span className={styles.required}>*</span></label>
                <select className={styles.select} defaultValue="Computer Science">
                  <option>Computer Science</option>
                  <option>Engineering</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>PROGRAM <span className={styles.required}>*</span></label>
                <select className={styles.select} defaultValue="BS in Information Technology">
                  <option>BS in Information Technology</option>
                  <option>B.Sc Computer Science</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>SEMESTER <span className={styles.required}>*</span></label>
                <select className={styles.select} defaultValue="Semester 1">
                  <option>Semester 1</option>
                  <option>Semester 2</option>
                </select>
              </div>
            </div>
            <div className={styles.inputGrid3}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>SECTION <span className={styles.required}>*</span></label>
                <input type="text" className={styles.input} placeholder="e.g. A" />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>ROLL NUMBER <span className={styles.required}>*</span></label>
                <input type="text" className={styles.input} placeholder="e.g. CS-24-001" />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>ADMISSION YEAR <span className={styles.required}>*</span></label>
                <select className={styles.select} defaultValue="2024">
                  <option>2024</option>
                  <option>2023</option>
                </select>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.inputGrid3}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>DEPARTMENT <span className={styles.required}>*</span></label>
                <select className={styles.select} defaultValue="Computer Science">
                  <option>Computer Science</option>
                  <option>Engineering</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>DESIGNATION <span className={styles.required}>*</span></label>
                <input type="text" className={styles.input} placeholder="e.g. Assistant Professor" />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>EMPLOYMENT TYPE <span className={styles.required}>*</span></label>
                <select className={styles.select} defaultValue="Full-time">
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                </select>
              </div>
            </div>
            <div className={styles.inputGrid3}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>EMPLOYEE ID</label>
                <input type="text" className={styles.input} placeholder="e.g. EMP-24-001" />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>JOINING DATE <span className={styles.required}>*</span></label>
                <input type="date" className={styles.input} />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>OFFICE EXTENSION (OPTIONAL)</label>
                <input type="text" className={styles.input} placeholder="e.g. x451" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* ACCOUNT SETTINGS */}
      <div className={styles.formSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <Settings2 size={20} />
          </div>
          <div className={styles.sectionTitle}>Account Settings</div>
        </div>

        <div className={styles.settingsList}>
          <label className={styles.settingRow}>
            <input type="checkbox" className={styles.checkbox} defaultChecked />
            <div className={styles.settingInfo}>
              <span className={styles.settingTitle}>Send Welcome Email</span>
              <span className={styles.settingDesc}>User will receive credentials via email immediately.</span>
            </div>
          </label>
          <label className={styles.settingRow}>
            <input type="checkbox" className={styles.checkbox} defaultChecked />
            <div className={styles.settingInfo}>
              <span className={styles.settingTitle}>Force Password Change on First Login</span>
              <span className={styles.settingDesc}>Recommended for security of generated accounts.</span>
            </div>
          </label>
          <label className={styles.settingRow}>
            <input type="checkbox" className={styles.checkbox} defaultChecked />
            <div className={styles.settingInfo}>
              <span className={styles.settingTitle}>Activate Account Immediately</span>
              <span className={styles.settingDesc}>User will be able to log in as soon as created.</span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
