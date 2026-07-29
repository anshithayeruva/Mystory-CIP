"use client";

import React, { useState } from "react";
import { 
  Building, 
  Mail, 
  UserCheck, 
  Bell, 
  BookOpen, 
  ShieldCheck, 
  Cpu, 
  Info, 
  Save, 
  Check, 
  Lock, 
  
  
  Eye,
  EyeOff
} from "lucide-react";
import styles from "./settings.module.css";

type SettingsTab = 
  | "dept" 
  | "contact" 
  | "hod" 
  | "notifications" 
  | "academic" 
  | "security" 
  | "integrations";

export default function HodSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("dept");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // 1. Department Info Form State
  const [deptForm, setDeptForm] = useState({
    name: "Computer Science & Engineering",
    code: "CSE-101",
    mission: "To provide high-quality education in computer science through a curriculum that combines fundamental concepts with hands-on practice, fostering innovation and ethical responsibility." });

  // 2. Contact Details Form State
  const [contactForm, setContactForm] = useState({
    email: "cse.hod@mystory.edu",
    phone: "+91 98765 43210",
    office: "Block B, Room 304 (Third Floor)",
    portalUrl: "https://mystory-cip.edu/dept/cse" });

  // 3. HoD Profile Form State
  const [hodForm, setHodForm] = useState({
    name: "Dr. Naveen Nair",
    designation: "Head of Department & Senior Professor",
    staffId: "FAC-CSE-001",
    qualification: "Ph.D. in Computer Science (IIT Bombay), M.Tech" });

  // 4. Notifications State
  const [notifications, setNotifications] = useState({
    lowAttendance: true,
    syllabusMilestones: true,
    studentWarning: true,
    weeklyDigest: false });

  // 5. Academic Info State
  const [academicForm, setAcademicForm] = useState({
    academicYear: "2024 - 2025",
    termType: "Odd Semester (July - December)",
    passScore: 40,
    minAttendance: 75 });

  // 6. Security State
  const [securityForm, setSecurityForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    enable2FA: true });
  const [showPassword, setShowPassword] = useState(false);

  // 7. Integrations State
  const [integrations, setIntegrations] = useState([
    { id: "classroom", name: "Google Classroom", category: "LMS", status: "Connected" },
    { id: "moodle", name: "Moodle LMS", category: "Courseware", status: "Connected" },
    { id: "zoom", name: "Zoom Education", category: "Video Conferencing", status: "Disconnected" },
    { id: "turnitin", name: "Turnitin Plagiarism", category: "Academic Audit", status: "Connected" },
  ]);

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
      triggerToast("Settings saved and updated successfully!");
    }, 500);
  };

  const handleReset = (_tab: SettingsTab) => {
    triggerToast("Form reverted to stored department defaults.");
  };

  const toggleIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "Connected" ? "Disconnected" : "Connected" }
          : item
      )
    );
    triggerToast("Integration status updated!");
  };

  return (
    <div className={styles.container}>
      {/* Page Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>
          Manage your department&apos;s configuration, academic parameters, and personal profile.
        </p>
      </div>

      {/* Success Toast */}
      {toastMessage && (
        <div className={styles.toastSuccess}>
          <Check size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Grid Layout */}
      <div className={styles.mainGrid}>
        {/* Left Navigation Card */}
        <div className={styles.sidebarCard}>
          <button
            className={`${styles.navItem} ${activeTab === "dept" ? styles.navItemActive : ""}`}
            onClick={() => setActiveTab("dept")}
          >
            <Building size={18} className={styles.navIcon} />
            <span>Department Information</span>
          </button>

          <button
            className={`${styles.navItem} ${activeTab === "contact" ? styles.navItemActive : ""}`}
            onClick={() => setActiveTab("contact")}
          >
            <Mail size={18} className={styles.navIcon} />
            <span>Contact Details</span>
          </button>

          <button
            className={`${styles.navItem} ${activeTab === "hod" ? styles.navItemActive : ""}`}
            onClick={() => setActiveTab("hod")}
          >
            <UserCheck size={18} className={styles.navIcon} />
            <span>HoD Profile</span>
          </button>

          <button
            className={`${styles.navItem} ${activeTab === "notifications" ? styles.navItemActive : ""}`}
            onClick={() => setActiveTab("notifications")}
          >
            <Bell size={18} className={styles.navIcon} />
            <span>Notifications</span>
          </button>

          <button
            className={`${styles.navItem} ${activeTab === "academic" ? styles.navItemActive : ""}`}
            onClick={() => setActiveTab("academic")}
          >
            <BookOpen size={18} className={styles.navIcon} />
            <span>Academic Parameters</span>
          </button>

          <button
            className={`${styles.navItem} ${activeTab === "security" ? styles.navItemActive : ""}`}
            onClick={() => setActiveTab("security")}
          >
            <ShieldCheck size={18} className={styles.navIcon} />
            <span>Security & Privacy</span>
          </button>

          <button
            className={`${styles.navItem} ${activeTab === "integrations" ? styles.navItemActive : ""}`}
            onClick={() => setActiveTab("integrations")}
          >
            <Cpu size={18} className={styles.navIcon} />
            <span>API Integrations</span>
          </button>
        </div>

        {/* Right Content Form Card */}
        <div className={styles.formCard}>
          {/* TAB 1: Department Information */}
          {activeTab === "dept" && (
            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Department Information</h2>
                <p className={styles.cardSubtitle}>
                  Update the core details of your academic department.
                </p>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Department Name *</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={deptForm.name}
                    onChange={(e) => setDeptForm((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Department Code *</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={deptForm.code}
                    onChange={(e) => setDeptForm((prev) => ({ ...prev, code: e.target.value }))}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Mission Statement</label>
                <textarea
                  className={styles.textarea}
                  value={deptForm.mission}
                  onChange={(e) => setDeptForm((prev) => ({ ...prev, mission: e.target.value }))}
                />
              </div>

              <div className={styles.infoBox}>
                <Info size={18} className={styles.infoIcon} />
                <span>
                  Updating the Department Name will affect all generated certificates and official reports across the CIP system.
                </span>
              </div>

              <div className={styles.btnRow}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => handleReset("dept")}
                >
                  Cancel Changes
                </button>
                <button type="submit" className={styles.saveBtn} disabled={isSaving}>
                  <Save size={16} />
                  <span>{isSaving ? "Saving..." : "Save All Changes"}</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: Contact Details */}
          {activeTab === "contact" && (
            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Contact Details</h2>
                <p className={styles.cardSubtitle}>
                  Manage public department email, direct extension, and office locations.
                </p>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Department Email *</label>
                  <input
                    type="email"
                    required
                    className={styles.input}
                    value={contactForm.email}
                    onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Direct Contact Number *</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={contactForm.phone}
                    onChange={(e) => setContactForm((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Office Location / Room *</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={contactForm.office}
                    onChange={(e) => setContactForm((prev) => ({ ...prev, office: e.target.value }))}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Department Website URL</label>
                  <input
                    type="url"
                    className={styles.input}
                    value={contactForm.portalUrl}
                    onChange={(e) => setContactForm((prev) => ({ ...prev, portalUrl: e.target.value }))}
                  />
                </div>
              </div>

              <div className={styles.btnRow}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => handleReset("contact")}
                >
                  Cancel Changes
                </button>
                <button type="submit" className={styles.saveBtn} disabled={isSaving}>
                  <Save size={16} />
                  <span>{isSaving ? "Saving..." : "Save All Changes"}</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: HoD Profile */}
          {activeTab === "hod" && (
            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>HoD Personal Profile</h2>
                <p className={styles.cardSubtitle}>
                  Update Head of Department identity, staff registry code, and credentials.
                </p>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Full Name *</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={hodForm.name}
                    onChange={(e) => setHodForm((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Staff Registry ID *</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={hodForm.staffId}
                    onChange={(e) => setHodForm((prev) => ({ ...prev, staffId: e.target.value }))}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Designation *</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={hodForm.designation}
                    onChange={(e) => setHodForm((prev) => ({ ...prev, designation: e.target.value }))}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Qualifications</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={hodForm.qualification}
                    onChange={(e) => setHodForm((prev) => ({ ...prev, qualification: e.target.value }))}
                  />
                </div>
              </div>

              <div className={styles.btnRow}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => handleReset("hod")}
                >
                  Cancel Changes
                </button>
                <button type="submit" className={styles.saveBtn} disabled={isSaving}>
                  <Save size={16} />
                  <span>{isSaving ? "Saving..." : "Save All Changes"}</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: Notifications */}
          {activeTab === "notifications" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Notifications & Alert Preferences</h2>
                <p className={styles.cardSubtitle}>
                  Configure automated department alerts, low-attendance thresholds, and report digests.
                </p>
              </div>

              <div className={styles.toggleList}>
                <div className={styles.toggleRow}>
                  <div className={styles.toggleMeta}>
                    <span className={styles.toggleTitle}>Low Attendance Alerts</span>
                    <span className={styles.toggleDesc}>
                      Notify HoD automatically when class attendance drops below 75%.
                    </span>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={notifications.lowAttendance}
                      onChange={(e) => {
                        setNotifications((prev) => ({ ...prev, lowAttendance: e.target.checked }));
                        triggerToast("Notification preferences updated!");
                      }}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.toggleRow}>
                  <div className={styles.toggleMeta}>
                    <span className={styles.toggleTitle}>Syllabus Milestone Tracking</span>
                    <span className={styles.toggleDesc}>
                      Weekly automated tracking summary of staff course completion rates.
                    </span>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={notifications.syllabusMilestones}
                      onChange={(e) => {
                        setNotifications((prev) => ({ ...prev, syllabusMilestones: e.target.checked }));
                        triggerToast("Notification preferences updated!");
                      }}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.toggleRow}>
                  <div className={styles.toggleMeta}>
                    <span className={styles.toggleTitle}>Student Performance Warnings</span>
                    <span className={styles.toggleDesc}>
                      Instant alert when a student score drops into Critical (&lt; 40%).
                    </span>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={notifications.studentWarning}
                      onChange={(e) => {
                        setNotifications((prev) => ({ ...prev, studentWarning: e.target.checked }));
                        triggerToast("Notification preferences updated!");
                      }}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.toggleRow}>
                  <div className={styles.toggleMeta}>
                    <span className={styles.toggleTitle}>Weekly Email Report Digest</span>
                    <span className={styles.toggleDesc}>
                      Receive an aggregated PDF summary of department metrics every Monday morning.
                    </span>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={notifications.weeklyDigest}
                      onChange={(e) => {
                        setNotifications((prev) => ({ ...prev, weeklyDigest: e.target.checked }));
                        triggerToast("Notification preferences updated!");
                      }}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Academic Parameters */}
          {activeTab === "academic" && (
            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Academic Info & Thresholds</h2>
                <p className={styles.cardSubtitle}>
                  Set active academic years, semester formats, and passing grade cutoffs.
                </p>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Current Academic Year *</label>
                  <select
                    className={styles.select}
                    value={academicForm.academicYear}
                    onChange={(e) => setAcademicForm((prev) => ({ ...prev, academicYear: e.target.value }))}
                  >
                    <option value="2024 - 2025">2024 - 2025</option>
                    <option value="2025 - 2026">2025 - 2026</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Current Term Type *</label>
                  <select
                    className={styles.select}
                    value={academicForm.termType}
                    onChange={(e) => setAcademicForm((prev) => ({ ...prev, termType: e.target.value }))}
                  >
                    <option value="Odd Semester (July - December)">Odd Semester (July - December)</option>
                    <option value="Even Semester (January - May)">Even Semester (January - May)</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Passing Score Cutoff (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className={styles.input}
                    value={academicForm.passScore}
                    onChange={(e) => setAcademicForm((prev) => ({ ...prev, passScore: Number(e.target.value) }))}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Min Attendance Cutoff (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className={styles.input}
                    value={academicForm.minAttendance}
                    onChange={(e) => setAcademicForm((prev) => ({ ...prev, minAttendance: Number(e.target.value) }))}
                  />
                </div>
              </div>

              <div className={styles.btnRow}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => handleReset("academic")}
                >
                  Cancel Changes
                </button>
                <button type="submit" className={styles.saveBtn} disabled={isSaving}>
                  <Save size={16} />
                  <span>{isSaving ? "Saving..." : "Save All Changes"}</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 6: Security & Privacy */}
          {activeTab === "security" && (
            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Security & Privacy</h2>
                <p className={styles.cardSubtitle}>
                  Update account credentials, password policies, and multi-factor authentication.
                </p>
              </div>

              <div className={styles.formGridSingle}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Current Password</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      className={styles.input}
                      placeholder="••••••••••••"
                      style={{ width: "100%" }}
                      value={securityForm.currentPassword}
                      onChange={(e) => setSecurityForm((prev) => ({ ...prev, currentPassword: e.target.value }))}
                    />
                    <button
                      type="button"
                      style={{ position: "absolute", right: "12px", top: "12px", border: "none", background: "none", cursor: "pointer", color: "#64748b" }}
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
                      placeholder="Min 8 chars, 1 number"
                      value={securityForm.newPassword}
                      onChange={(e) => setSecurityForm((prev) => ({ ...prev, newPassword: e.target.value }))}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Confirm New Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className={styles.input}
                      placeholder="Repeat new password"
                      value={securityForm.confirmPassword}
                      onChange={(e) => setSecurityForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.toggleRow}>
                <div className={styles.toggleMeta}>
                  <span className={styles.toggleTitle}>Two-Factor Authentication (2FA)</span>
                  <span className={styles.toggleDesc}>
                    Require a single-use passcode upon login for department admin security.
                  </span>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={securityForm.enable2FA}
                    onChange={(e) => {
                      setSecurityForm((prev) => ({ ...prev, enable2FA: e.target.checked }));
                      triggerToast("2FA security setting updated!");
                    }}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>

              <div className={styles.btnRow}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => handleReset("security")}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.saveBtn} disabled={isSaving}>
                  <Lock size={16} />
                  <span>Update Password & Security</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 7: API Integrations */}
          {activeTab === "integrations" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>API Integrations</h2>
                <p className={styles.cardSubtitle}>
                  Connect the CIP portal to third-party academic tools, LMS, and video platforms.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {integrations.map((tool) => (
                  <div key={tool.id} className={styles.toggleRow} style={{ backgroundColor: "#ffffff" }}>
                    <div className={styles.toggleMeta}>
                      <span className={styles.toggleTitle}>{tool.name}</span>
                      <span className={styles.toggleDesc}>{tool.category} Sync & Data Connector</span>
                    </div>

                    <button
                      type="button"
                      style={{
                        padding: "8px 16px",
                        borderRadius: "8px",
                        border: tool.status === "Connected" ? "1px solid #c2e7da" : "1px solid #cbd5e1",
                        backgroundColor: tool.status === "Connected" ? "#e6f4ea" : "#ffffff",
                        color: tool.status === "Connected" ? "#00522e" : "#475569",
                        fontWeight: 700,
                        fontSize: "0.8rem",
                        cursor: "pointer" }}
                      onClick={() => toggleIntegration(tool.id)}
                    >
                      {tool.status === "Connected" ? "Connected ✓" : "Connect Tool"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Action Bottom Cards Grid (Matching Stitch mockup structure) */}
      <div className={styles.bottomCardsGrid}>
        <div className={styles.quickCard}>
          <div className={styles.quickCardIcon}>
            <ShieldCheck size={22} />
          </div>
          <div>
            <h3 className={styles.quickCardTitle}>Security & Privacy</h3>
            <p className={styles.quickCardDesc}>
              Manage passwords, 2FA authentication, and department data access levels.
            </p>
          </div>
          <button 
            className={styles.quickCardActionBtn}
            onClick={() => setActiveTab("security")}
          >
            Manage Security Settings →
          </button>
        </div>

        <div className={styles.quickCard}>
          <div className={styles.quickCardIcon}>
            <Cpu size={22} />
          </div>
          <div>
            <h3 className={styles.quickCardTitle}>API Integrations</h3>
            <p className={styles.quickCardDesc}>
              Connect the CIP portal to third-party academic tools like LMS & Zoom.
            </p>
          </div>
          <button 
            className={styles.quickCardActionBtn}
            onClick={() => setActiveTab("integrations")}
          >
            Configure Integrations →
          </button>
        </div>
      </div>
    </div>
  );
}
