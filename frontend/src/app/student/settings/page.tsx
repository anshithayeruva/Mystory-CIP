"use client";

import React, { useState, useEffect } from "react";
import { 
  User, 
  Award, 
  Download, 
  Bell, 
  ShieldCheck, 
  Save, 
  Check, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  FileText
} from "lucide-react";
import styles from "./settings.module.css";
import { STUDENT_INFO } from "../mockData";

type TabType = "Profile" | "Academic" | "Documents" | "Notifications" | "Security";

export default function StudentSettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("Profile");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 1. Personal Profile State
  const [profileForm, setProfileForm] = useState({
    name: STUDENT_INFO.name,
    rollNo: STUDENT_INFO.rollNo,
    email: STUDENT_INFO.email,
    phone: STUDENT_INFO.phone,
    regNo: STUDENT_INFO.regNo,
    address: STUDENT_INFO.address,
    emergencyContact: STUDENT_INFO.emergencyContact,
  });

  // 2. Academic Information State
  const [academicForm, setAcademicForm] = useState({
    program: STUDENT_INFO.program,
    department: "Computer Science & Engineering",
    academicYear: "2025 - 2026",
    semester: "Semester 6 (Spring 2026)",
    advisorName: STUDENT_INFO.advisorName,
    cgpa: STUDENT_INFO.cgpa,
    learningMode: "Hybrid / Classroom",
  });

  // 3. Notifications State
  const [notifications, setNotifications] = useState({
    timetableReminders: true,
    attendanceAlerts: true,
    resourceUploads: true,
    weeklyDigest: false,
  });

  // 4. Security State
  const [securityForm, setSecurityForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    enable2FA: true,
  });
  const [showPassword, setShowPassword] = useState(false);

  if (!mounted) return null;

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      triggerToast("Student profile settings updated successfully!");
    }, 400);
  };

  const tabs: TabType[] = ["Profile", "Academic", "Documents", "Notifications", "Security"];

  return (
    <div className={styles.container}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className={styles.toastSuccess}>
          <Check size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header with Horizontal Tabs */}
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>Student Settings</h1>
          <p className={styles.subtitle}>
            {activeTab === "Profile" && "Manage your personal information, campus address, and emergency contact details."}
            {activeTab === "Academic" && "View academic standing, degree program credentials, advisor info, and learning mode."}
            {activeTab === "Documents" && "Access and download official university certificates, student IDs, and transcripts."}
            {activeTab === "Notifications" && "Configure automated timetable reminders, low-attendance alerts, and academic digests."}
            {activeTab === "Security" && "Update account credentials, login passwords, and multi-factor authentication."}
          </p>
        </div>
        
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <div 
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>

      {/* TAB CONTENTS */}
      <div style={{ marginTop: 12 }}>

        {/* TAB 1: Profile */}
        {activeTab === "Profile" && (
          <div className={styles.tabContent}>
            <div className={styles.sectionGroup}>
              <div className={styles.sectionInfo}>
                <div className={styles.sectionTitle}>Personal Profile</div>
                <div className={styles.sectionDesc}>Primary personal details and identity information for your student account.</div>
              </div>
              <div className={styles.sectionCard}>
                <form onSubmit={handleSave}>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Full Name</label>
                      <input 
                        className={styles.input} 
                        type="text" 
                        value={profileForm.name} 
                        onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Roll Number</label>
                      <input 
                        className={`${styles.input} ${styles.inputDisabled}`} 
                        type="text" 
                        value={profileForm.rollNo} 
                        disabled
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Email Address</label>
                      <input 
                        className={`${styles.input} ${styles.inputDisabled}`} 
                        type="email" 
                        value={profileForm.email} 
                        disabled
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Registration Number</label>
                      <input 
                        className={`${styles.input} ${styles.inputDisabled}`} 
                        type="text" 
                        value={profileForm.regNo} 
                        disabled
                      />
                    </div>
                    <div className={styles.formGroup} style={{ gridColumn: "span 2" }}>
                      <label className={styles.label}>Phone Number</label>
                      <input 
                        className={styles.input} 
                        type="text" 
                        value={profileForm.phone} 
                        onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                      />
                    </div>
                    <div className={styles.formGroup} style={{ gridColumn: "span 2" }}>
                      <label className={styles.label}>Campus Address</label>
                      <input 
                        className={styles.input} 
                        type="text" 
                        value={profileForm.address} 
                        onChange={(e) => setProfileForm({...profileForm, address: e.target.value})}
                      />
                    </div>
                    <div className={styles.formGroup} style={{ gridColumn: "span 2" }}>
                      <label className={styles.label}>Emergency Contact</label>
                      <input 
                        className={styles.input} 
                        type="text" 
                        value={profileForm.emergencyContact} 
                        onChange={(e) => setProfileForm({...profileForm, emergencyContact: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className={styles.btnGroup}>
                    <button type="button" className={styles.btnCancel} onClick={() => triggerToast("Reverted to saved values.")}>Cancel</button>
                    <button type="submit" className={styles.btnSave} disabled={isSaving}>
                      <Save size={14} /> Save Profile Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Academic */}
        {activeTab === "Academic" && (
          <div className={styles.tabContent}>
            <div className={styles.sectionGroup}>
              <div className={styles.sectionInfo}>
                <div className={styles.sectionTitle}>Academic Credentials</div>
                <div className={styles.sectionDesc}>Enrolled degree program, academic advisor, and standing metrics.</div>
              </div>
              <div className={styles.sectionCard}>
                <form onSubmit={handleSave}>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Degree Program</label>
                      <input 
                        className={`${styles.input} ${styles.inputDisabled}`} 
                        type="text" 
                        value={academicForm.program} 
                        disabled
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Department</label>
                      <input 
                        className={`${styles.input} ${styles.inputDisabled}`} 
                        type="text" 
                        value={academicForm.department} 
                        disabled
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Academic Year</label>
                      <input 
                        className={`${styles.input} ${styles.inputDisabled}`} 
                        type="text" 
                        value={academicForm.academicYear} 
                        disabled
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Active Semester</label>
                      <input 
                        className={`${styles.input} ${styles.inputDisabled}`} 
                        type="text" 
                        value={academicForm.semester} 
                        disabled
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Faculty Advisor</label>
                      <input 
                        className={`${styles.input} ${styles.inputDisabled}`} 
                        type="text" 
                        value={academicForm.advisorName} 
                        disabled
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Cumulative CGPA</label>
                      <input 
                        className={`${styles.input} ${styles.inputDisabled}`} 
                        type="text" 
                        value={academicForm.cgpa} 
                        disabled
                      />
                    </div>
                    <div className={styles.formGroup} style={{ gridColumn: "span 2" }}>
                      <label className={styles.label}>Preferred Learning Mode</label>
                      <select 
                        className={styles.select} 
                        value={academicForm.learningMode}
                        onChange={(e) => setAcademicForm({...academicForm, learningMode: e.target.value})}
                      >
                        <option>Hybrid / Classroom</option>
                        <option>In-Person Campus Only</option>
                        <option>Digital / Distance Mode</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.btnGroup}>
                    <button type="button" className={styles.btnCancel} onClick={() => triggerToast("Discarded changes.")}>Discard Changes</button>
                    <button type="submit" className={styles.btnSave}>Save Academic Preferences</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Documents */}
        {activeTab === "Documents" && (
          <div className={styles.tabContent}>
            <div className={styles.sectionGroup}>
              <div className={styles.sectionInfo}>
                <div className={styles.sectionTitle}>Official Records & Certificates</div>
                <div className={styles.sectionDesc}>Download verified academic transcripts, bonafide letters, and digital ID cards.</div>
              </div>
              <div className={styles.sectionCard}>
                <div className={styles.tableWrapper}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Document Name</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ fontWeight: 600, color: "#0f172a" }}>Digital Student ID Card</td>
                        <td>Identity</td>
                        <td><span className={styles.badgeCompleted}>VERIFIED</span></td>
                        <td>
                          <button className={styles.btnSecondary} onClick={() => triggerToast("Downloading Digital Student ID...")}>
                            <Download size={14} /> Download PDF
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 600, color: "#0f172a" }}>Official Academic Transcript (Sem 1-5)</td>
                        <td>Academic Record</td>
                        <td><span className={styles.badgeCompleted}>VERIFIED</span></td>
                        <td>
                          <button className={styles.btnSecondary} onClick={() => triggerToast("Downloading Academic Transcript...")}>
                            <Download size={14} /> Download PDF
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 600, color: "#0f172a" }}>Semester 6 Fee Payment Receipt</td>
                        <td>Financial</td>
                        <td><span className={styles.badgeCompleted}>PAID</span></td>
                        <td>
                          <button className={styles.btnSecondary} onClick={() => triggerToast("Downloading Fee Receipt...")}>
                            <Download size={14} /> Download Receipt
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 600, color: "#0f172a" }}>Bonafide Student Certificate</td>
                        <td>Administrative</td>
                        <td><span className={styles.badgeCompleted}>ISSUED</span></td>
                        <td>
                          <button className={styles.btnSecondary} onClick={() => triggerToast("Downloading Bonafide Certificate...")}>
                            <Download size={14} /> Download PDF
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Notifications */}
        {activeTab === "Notifications" && (
          <div className={styles.tabContent}>
            <div className={styles.sectionGroup}>
              <div className={styles.sectionInfo}>
                <div className={styles.sectionTitle}>Automated Student Alerts</div>
                <div className={styles.sectionDesc}>Configure reminders for classes, low attendance warnings, and new learning resources.</div>
              </div>
              <div className={styles.sectionCard}>
                <div className={styles.toggleRow}>
                  <div className={styles.toggleInfo}>
                    <div className={styles.toggleTitle}>Timetable & Class Slot Reminders</div>
                    <div className={styles.toggleDesc}>Get notified 15 minutes before scheduled lectures and practical sessions.</div>
                  </div>
                  <label className={styles.switch}>
                    <input 
                      type="checkbox" 
                      checked={notifications.timetableReminders}
                      onChange={(e) => {
                        setNotifications({...notifications, timetableReminders: e.target.checked});
                        triggerToast("Alert preference saved!");
                      }}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.toggleRow}>
                  <div className={styles.toggleInfo}>
                    <div className={styles.toggleTitle}>Low Attendance Threshold Warning</div>
                    <div className={styles.toggleDesc}>Receive immediate notification if course attendance drops close to 75%.</div>
                  </div>
                  <label className={styles.switch}>
                    <input 
                      type="checkbox" 
                      checked={notifications.attendanceAlerts}
                      onChange={(e) => {
                        setNotifications({...notifications, attendanceAlerts: e.target.checked});
                        triggerToast("Alert preference saved!");
                      }}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.toggleRow}>
                  <div className={styles.toggleInfo}>
                    <div className={styles.toggleTitle}>Digital Resource Upload Notifications</div>
                    <div className={styles.toggleDesc}>Instant alerts when faculty upload new study notes or lecture slides.</div>
                  </div>
                  <label className={styles.switch}>
                    <input 
                      type="checkbox" 
                      checked={notifications.resourceUploads}
                      onChange={(e) => {
                        setNotifications({...notifications, resourceUploads: e.target.checked});
                        triggerToast("Alert preference saved!");
                      }}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.toggleRow}>
                  <div className={styles.toggleInfo}>
                    <div className={styles.toggleTitle}>Weekly Academic Performance Summary</div>
                    <div className={styles.toggleDesc}>Receive an aggregated email summary of attendance and course updates every Monday.</div>
                  </div>
                  <label className={styles.switch}>
                    <input 
                      type="checkbox" 
                      checked={notifications.weeklyDigest}
                      onChange={(e) => {
                        setNotifications({...notifications, weeklyDigest: e.target.checked});
                        triggerToast("Alert preference saved!");
                      }}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Security */}
        {activeTab === "Security" && (
          <div className={styles.tabContent}>
            <div className={styles.sectionGroup}>
              <div className={styles.sectionInfo}>
                <div className={styles.sectionTitle}>Account Credentials</div>
                <div className={styles.sectionDesc}>Update your account password and security credentials.</div>
              </div>
              <div className={styles.sectionCard}>
                <form onSubmit={handleSave}>
                  <div className={styles.formGridSingle}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Current Password</label>
                      <div style={{ position: "relative" }}>
                        <input
                          type={showPassword ? "text" : "password"}
                          className={styles.input}
                          style={{ width: "100%" }}
                          placeholder="••••••••••••"
                          value={securityForm.currentPassword}
                          onChange={(e) => setSecurityForm({ ...securityForm, currentPassword: e.target.value })}
                        />
                        <button
                          type="button"
                          style={{ position: "absolute", right: "12px", top: "11px", border: "none", background: "none", cursor: "pointer", color: "#64748b" }}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>New Password</label>
                        <input
                          type={showPassword ? "text" : "password"}
                          className={styles.input}
                          placeholder="Min 8 characters"
                          value={securityForm.newPassword}
                          onChange={(e) => setSecurityForm({ ...securityForm, newPassword: e.target.value })}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.label}>Confirm New Password</label>
                        <input
                          type={showPassword ? "text" : "password"}
                          className={styles.input}
                          placeholder="Repeat new password"
                          value={securityForm.confirmPassword}
                          onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={styles.toggleRow} style={{ marginTop: "16px" }}>
                    <div className={styles.toggleInfo}>
                      <div className={styles.toggleTitle}>Two-Factor Authentication (2FA)</div>
                      <div className={styles.toggleDesc}>Require a single-use passcode upon login for student portal security.</div>
                    </div>
                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        checked={securityForm.enable2FA}
                        onChange={(e) => {
                          setSecurityForm({ ...securityForm, enable2FA: e.target.checked });
                          triggerToast("2FA security setting updated!");
                        }}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>

                  <div className={styles.btnGroup}>
                    <button type="button" className={styles.btnCancel}>Cancel</button>
                    <button type="submit" className={styles.btnSave}>
                      <Lock size={14} /> Update Security
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Action Bottom Cards Grid */}
      <div className={styles.quickActionGrid}>
        <div className={styles.quickActionCard}>
          <ShieldCheck className={styles.quickActionIcon} size={24} />
          <div>
            <div className={styles.quickActionTitle}>Security & Account Credentials</div>
            <div className={styles.quickActionDesc}>Manage password security, active student portal sessions, and multi-factor authentication.</div>
          </div>
          <button 
            className={styles.quickActionBtn}
            onClick={() => setActiveTab("Security")}
          >
            Manage Security Settings <ArrowRight size={14} />
          </button>
        </div>

        <div className={styles.quickActionCard}>
          <FileText className={styles.quickActionIcon} size={24} />
          <div>
            <div className={styles.quickActionTitle}>Official Documents & Records</div>
            <div className={styles.quickActionDesc}>View and download verified university student ID, academic transcripts, and bonafide letters.</div>
          </div>
          <button 
            className={styles.quickActionBtn}
            onClick={() => setActiveTab("Documents")}
          >
            View Certificates & Documents <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
