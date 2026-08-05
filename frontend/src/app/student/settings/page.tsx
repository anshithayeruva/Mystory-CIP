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
import { studentDashboardService } from "@/services/studentDashboard.service";

type TabType = "Profile" | "Academic" | "Documents" | "Notifications" | "Security";

export default function StudentSettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("Profile");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Using the same mocked studentId as the dashboard for now
  const studentId = "6a6a3135b6f279c37d3c4bd4";

  // 1. Personal Profile State
  const [profileForm, setProfileForm] = useState({
    name: "",
    rollNo: "",
    email: "",
    phone: "",
    regNo: "",
    address: "",
    emergencyContact: "",
  });

  // 2. Academic Information State
  const [academicForm, setAcademicForm] = useState({
    program: "",
    department: "",
    academicYear: "",
    semester: "",
    advisorName: "",
    cgpa: "N/A", // From backend student info, or we can leave as N/A
    learningMode: "Hybrid / Classroom",
  });

  // 3. Documents State
  const [documents, setDocuments] = useState<any[]>([]);

  // 4. Notifications State
  const [notifications, setNotifications] = useState({
    timetableReminders: true,
    attendanceAlerts: true,
    resourceUploads: true,
    weeklyDigest: false,
  });

  // 5. Security State
  const [securityForm, setSecurityForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    enable2FA: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchSettings();
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const data = await studentDashboardService.getSettings(studentId);
      
      setProfileForm({
        name: data.profile.name,
        rollNo: data.profile.rollNo,
        email: data.profile.email,
        phone: data.profile.phone,
        regNo: data.profile.regNo,
        address: data.profile.address,
        emergencyContact: data.profile.emergencyContact,
      });

      setAcademicForm({
        program: data.academic.program,
        department: data.academic.department,
        academicYear: data.academic.academicYear,
        semester: data.academic.semester,
        advisorName: data.academic.advisorName,
        cgpa: "8.85", // Mock or retrieve from another endpoint
        learningMode: data.academic.learningMode,
      });

      setNotifications(data.notifications);

      setSecurityForm(prev => ({
        ...prev,
        enable2FA: data.security.enable2FA
      }));

      // Fetch documents
      const docs = await studentDashboardService.getDocuments(studentId);
      setDocuments(docs);

    } catch (error) {
      console.error("Failed to load settings:", error);
      triggerToast("Failed to load settings.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await studentDashboardService.updateProfile(studentId, {
        name: profileForm.name,
        phone: profileForm.phone,
        address: profileForm.address,
        emergencyContact: profileForm.emergencyContact,
      });
      triggerToast("Profile settings updated successfully!");
    } catch (error) {
      triggerToast("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAcademic = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await studentDashboardService.updateAcademic(studentId, {
        learningMode: academicForm.learningMode,
      });
      triggerToast("Academic preferences updated successfully!");
    } catch (error) {
      triggerToast("Failed to update academic preferences.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveSecurity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (securityForm.newPassword && securityForm.newPassword !== securityForm.confirmPassword) {
      triggerToast("New passwords do not match!");
      return;
    }
    
    setIsSaving(true);
    try {
      await studentDashboardService.updateSecurity(studentId, {
        currentPassword: securityForm.currentPassword,
        newPassword: securityForm.newPassword,
      });
      setSecurityForm(prev => ({ ...prev, currentPassword: "", newPassword: "", confirmPassword: "" }));
      triggerToast("Security settings updated successfully!");
    } catch (error) {
      triggerToast("Failed to update security settings.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleNotificationChange = async (key: keyof typeof notifications, value: boolean) => {
    const updatedNotifications = { ...notifications, [key]: value };
    setNotifications(updatedNotifications);
    try {
      await studentDashboardService.updateNotifications(studentId, updatedNotifications);
      triggerToast("Alert preference saved!");
    } catch (error) {
      triggerToast("Failed to save alert preference.");
      // Revert if failed
      setNotifications(notifications);
    }
  };

  const handle2FAChange = async (value: boolean) => {
    setSecurityForm(prev => ({ ...prev, enable2FA: value }));
    try {
      await studentDashboardService.updateSecurity(studentId, { enable2FA: value });
      triggerToast("2FA security setting updated!");
    } catch (error) {
      triggerToast("Failed to update 2FA setting.");
      setSecurityForm(prev => ({ ...prev, enable2FA: !value })); // revert
    }
  };

  const tabs: TabType[] = ["Profile", "Academic", "Documents", "Notifications", "Security"];

  if (isLoading) {
    return (
      <div className={styles.container} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-700"></div>
      </div>
    );
  }

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
                <form onSubmit={handleSaveProfile}>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Full Name</label>
                      <input
                        className={styles.input}
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
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
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      />
                    </div>
                    <div className={styles.formGroup} style={{ gridColumn: "span 2" }}>
                      <label className={styles.label}>Campus Address</label>
                      <input
                        className={styles.input}
                        type="text"
                        value={profileForm.address}
                        onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                      />
                    </div>
                    <div className={styles.formGroup} style={{ gridColumn: "span 2" }}>
                      <label className={styles.label}>Emergency Contact</label>
                      <input
                        className={styles.input}
                        type="text"
                        value={profileForm.emergencyContact}
                        onChange={(e) => setProfileForm({ ...profileForm, emergencyContact: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className={styles.btnGroup}>
                    <button type="button" className={styles.btnCancel} onClick={() => { fetchSettings(); triggerToast("Reverted to saved values."); }}>Cancel</button>
                    <button type="submit" className={styles.btnSave} disabled={isSaving}>
                      <Save size={14} /> {isSaving ? "Saving..." : "Save Profile Changes"}
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
                <form onSubmit={handleSaveAcademic}>
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
                         onChange={(e) => setAcademicForm({ ...academicForm, learningMode: e.target.value })}
                      >
                         <option value="Hybrid / Classroom">Hybrid / Classroom</option>
                         <option value="In-Person Campus Only">In-Person Campus Only</option>
                         <option value="Digital / Distance Mode">Digital / Distance Mode</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.btnGroup}>
                    <button type="button" className={styles.btnCancel} onClick={() => { fetchSettings(); triggerToast("Discarded changes."); }}>Discard Changes</button>
                    <button type="submit" className={styles.btnSave} disabled={isSaving}>{isSaving ? "Saving..." : "Save Academic Preferences"}</button>
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
                      {documents.map((doc, idx) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: 600, color: "#0f172a" }}>{doc.name}</td>
                          <td>{doc.category}</td>
                          <td>
                            <span className={styles.badgeCompleted} style={{
                              backgroundColor: doc.status === "VERIFIED" ? "#dcfce7" : doc.status === "PAID" ? "#e0e7ff" : "#fef3c7",
                              color: doc.status === "VERIFIED" ? "#166534" : doc.status === "PAID" ? "#3730a3" : "#92400e"
                            }}>
                              {doc.status}
                            </span>
                          </td>
                          <td>
                            <button className={styles.btnSecondary} onClick={() => triggerToast(`Downloading ${doc.name}...`)}>
                              <Download size={14} /> Download PDF
                            </button>
                          </td>
                        </tr>
                      ))}
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
                      onChange={(e) => handleNotificationChange("timetableReminders", e.target.checked)}
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
                      onChange={(e) => handleNotificationChange("attendanceAlerts", e.target.checked)}
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
                      onChange={(e) => handleNotificationChange("resourceUploads", e.target.checked)}
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
                      onChange={(e) => handleNotificationChange("weeklyDigest", e.target.checked)}
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
                <form onSubmit={handleSaveSecurity}>
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
                        onChange={(e) => handle2FAChange(e.target.checked)}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>

                  <div className={styles.btnGroup}>
                    <button type="button" className={styles.btnCancel} onClick={() => setSecurityForm(prev => ({ ...prev, currentPassword: "", newPassword: "", confirmPassword: "" }))}>Cancel</button>
                    <button type="submit" className={styles.btnSave} disabled={isSaving}>
                      <Lock size={14} /> {isSaving ? "Updating..." : "Update Security"}
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
