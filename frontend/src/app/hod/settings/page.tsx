"use client";

import React, { useState, useEffect } from "react";
import { 
  Building2, 
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
  EyeOff,
  RotateCcw,
  Database,
  ArrowRight
} from "lucide-react";
import styles from "./settings.module.css";

type TabType = "Department" | "Academic" | "Security" | "Notifications" | "Integrations";

export default function HodSettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("Department");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 1. Department Info Form State
  const [deptForm, setDeptForm] = useState({
    name: "Computer Science & Engineering",
    code: "CSE-101",
    mission: "To provide high-quality education in computer science through a curriculum that combines fundamental concepts with hands-on practice, fostering innovation and ethical responsibility.",
    address: "Block B, Academic Complex, Sector 4",
    email: "cse.hod@mystory.edu",
    phone: "+91 98765 43210",
    office: "Room 304 (Third Floor)",
    portalUrl: "https://mystory-cip.edu/dept/cse",
  });

  // 2. HoD Profile Form State
  const [hodForm, setHodForm] = useState({
    name: "Dr. Naveen Nair",
    designation: "Head of Department & Senior Professor",
    staffId: "FAC-CSE-001",
    qualification: "Ph.D. in Computer Science (IIT Bombay), M.Tech",
  });

  // 3. Notifications State
  const [notifications, setNotifications] = useState({
    lowAttendance: true,
    syllabusMilestones: true,
    studentWarning: true,
    weeklyDigest: false,
  });

  // 4. Academic Info State
  const [academicForm, setAcademicForm] = useState({
    academicYear: "2024 - 2025",
    termType: "Odd Semester (July - December)",
    passScore: 40,
    minAttendance: 75,
    attendanceModel: "Activity Based (Auto-tracked)",
    allowRetests: true,
    facultyOverride: true,
  });

  // 5. Security State
  const [securityForm, setSecurityForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    enable2FA: true,
  });
  const [showPassword, setShowPassword] = useState(false);

  // 6. Integrations State
  const [integrations, setIntegrations] = useState([
    { id: "classroom", name: "Google Classroom", category: "LMS Sync & Data Connector", status: "Connected" },
    { id: "moodle", name: "Moodle LMS", category: "Courseware & Exam Portal", status: "Connected" },
    { id: "zoom", name: "Zoom Education", category: "Video Conferencing & Lecture Sync", status: "Disconnected" },
    { id: "turnitin", name: "Turnitin Plagiarism", category: "Academic Audit & Plagiarism Check", status: "Connected" },
  ]);

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
      triggerToast("Settings saved and updated successfully!");
    }, 500);
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

  const tabs: TabType[] = ["Department", "Academic", "Security", "Notifications", "Integrations"];

  return (
    <div className={styles.container}>
      {/* Toast Alert */}
      {toastMessage && (
        <div className={styles.toastSuccess}>
          <Check size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>Department Settings</h1>
          <p className={styles.subtitle}>
            {activeTab === "Department" && "Manage your department profile, office details, and leadership credentials."}
            {activeTab === "Academic" && "Configure department academic parameters, attendance rules, and evaluation cutoffs."}
            {activeTab === "Security" && "Manage department credentials, password policies, and multi-factor authentication."}
            {activeTab === "Notifications" && "Configure automated department alerts, low-attendance warnings, and weekly digests."}
            {activeTab === "Integrations" && "Connect the CIP portal to third-party academic LMS, video, and audit tools."}
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
        {/* TAB 1: Department */}
        {activeTab === "Department" && (
          <div className={styles.tabContent}>
            <div className={styles.sectionGroup}>
              <div className={styles.sectionInfo}>
                <div className={styles.sectionTitle}>Department Profile</div>
                <div className={styles.sectionDesc}>Public information and primary identifiers for your academic department.</div>
              </div>
              <div className={styles.sectionCard}>
                <form onSubmit={handleSave}>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup} style={{ gridColumn: "span 2" }}>
                      <label className={styles.label}>Department Name</label>
                      <input 
                        className={styles.input} 
                        type="text" 
                        value={deptForm.name} 
                        onChange={(e) => setDeptForm({...deptForm, name: e.target.value})}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Department Code</label>
                      <input 
                        className={styles.input} 
                        type="text" 
                        value={deptForm.code} 
                        onChange={(e) => setDeptForm({...deptForm, code: e.target.value})}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Department Email</label>
                      <input 
                        className={styles.input} 
                        type="email" 
                        value={deptForm.email} 
                        onChange={(e) => setDeptForm({...deptForm, email: e.target.value})}
                      />
                    </div>
                    <div className={styles.formGroup} style={{ gridColumn: "span 2" }}>
                      <label className={styles.label}>Mission Statement</label>
                      <textarea 
                        className={styles.textarea} 
                        value={deptForm.mission} 
                        onChange={(e) => setDeptForm({...deptForm, mission: e.target.value})}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Direct Contact Phone</label>
                      <input 
                        className={styles.input} 
                        type="text" 
                        value={deptForm.phone} 
                        onChange={(e) => setDeptForm({...deptForm, phone: e.target.value})}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Office Location / Room</label>
                      <input 
                        className={styles.input} 
                        type="text" 
                        value={deptForm.office} 
                        onChange={(e) => setDeptForm({...deptForm, office: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className={styles.btnGroup}>
                    <button type="button" className={styles.btnCancel} onClick={() => triggerToast("Reverted to saved values.")}>Cancel</button>
                    <button type="submit" className={styles.btnSave} disabled={isSaving}>
                      <Save size={14} /> Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className={styles.sectionGroup}>
              <div className={styles.sectionInfo}>
                <div className={styles.sectionTitle}>HoD Leadership Credentials</div>
                <div className={styles.sectionDesc}>Identity details for the Head of Department registry.</div>
              </div>
              <div className={styles.sectionCard}>
                <form onSubmit={handleSave}>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Full Name</label>
                      <input 
                        className={styles.input} 
                        type="text" 
                        value={hodForm.name} 
                        onChange={(e) => setHodForm({...hodForm, name: e.target.value})}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Staff Registry Code</label>
                      <input 
                        className={styles.input} 
                        type="text" 
                        value={hodForm.staffId} 
                        onChange={(e) => setHodForm({...hodForm, staffId: e.target.value})}
                      />
                    </div>
                    <div className={styles.formGroup} style={{ gridColumn: "span 2" }}>
                      <label className={styles.label}>Designation & Role</label>
                      <input 
                        className={styles.input} 
                        type="text" 
                        value={hodForm.designation} 
                        onChange={(e) => setHodForm({...hodForm, designation: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className={styles.btnGroup}>
                    <button type="button" className={styles.btnCancel} onClick={() => triggerToast("Reverted changes.")}>Cancel</button>
                    <button type="submit" className={styles.btnSave} disabled={isSaving}>
                      <Save size={14} /> Update Credentials
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
                <div className={styles.sectionTitle}>Academic Calendar & Term</div>
                <div className={styles.sectionDesc}>Define current operating academic year and semester cycles.</div>
              </div>
              <div className={styles.sectionCard}>
                <form onSubmit={handleSave}>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Current Academic Year</label>
                      <select 
                        className={styles.select} 
                        value={academicForm.academicYear}
                        onChange={(e) => setAcademicForm({...academicForm, academicYear: e.target.value})}
                      >
                        <option>2024 - 2025</option>
                        <option>2025 - 2026</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Term Semester Type</label>
                      <select 
                        className={styles.select}
                        value={academicForm.termType}
                        onChange={(e) => setAcademicForm({...academicForm, termType: e.target.value})}
                      >
                        <option>Odd Semester (July - December)</option>
                        <option>Even Semester (January - May)</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Passing Score Cutoff (%)</label>
                      <input 
                        className={styles.input} 
                        type="number" 
                        value={academicForm.passScore}
                        onChange={(e) => setAcademicForm({...academicForm, passScore: Number(e.target.value)})}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Min Attendance Cutoff (%)</label>
                      <input 
                        className={styles.input} 
                        type="number" 
                        value={academicForm.minAttendance}
                        onChange={(e) => setAcademicForm({...academicForm, minAttendance: Number(e.target.value)})}
                      />
                    </div>
                  </div>

                  <div className={styles.toggleRow} style={{ marginTop: "12px" }}>
                    <div className={styles.toggleInfo}>
                      <div className={styles.toggleTitle}>Allow Faculty Override</div>
                      <div className={styles.toggleDesc}>Permit course lead professors to adjust calculated semester attendance scores.</div>
                    </div>
                    <label className={styles.switch}>
                      <input 
                        type="checkbox" 
                        checked={academicForm.facultyOverride}
                        onChange={(e) => setAcademicForm({...academicForm, facultyOverride: e.target.checked})}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>

                  <div className={styles.btnGroup}>
                    <button type="button" className={styles.btnCancel} onClick={() => triggerToast("Discarded changes.")}>Discard Changes</button>
                    <button type="submit" className={styles.btnSave}>Save Academic Rules</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Security */}
        {activeTab === "Security" && (
          <div className={styles.tabContent}>
            <div className={styles.sectionGroup}>
              <div className={styles.sectionInfo}>
                <div className={styles.sectionTitle}>Account Credentials</div>
                <div className={styles.sectionDesc}>Update account password and security authorization levels.</div>
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
                      <div className={styles.toggleDesc}>Require a single-use passcode upon login for department admin security.</div>
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

        {/* TAB 4: Notifications */}
        {activeTab === "Notifications" && (
          <div className={styles.tabContent}>
            <div className={styles.sectionGroup}>
              <div className={styles.sectionInfo}>
                <div className={styles.sectionTitle}>Automated Department Alerts</div>
                <div className={styles.sectionDesc}>Control automated email and system alerts for department monitoring.</div>
              </div>
              <div className={styles.sectionCard}>
                <div className={styles.toggleRow}>
                  <div className={styles.toggleInfo}>
                    <div className={styles.toggleTitle}>Low Attendance Alerts</div>
                    <div className={styles.toggleDesc}>Notify HoD automatically when class attendance drops below threshold.</div>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={notifications.lowAttendance}
                      onChange={(e) => {
                        setNotifications({ ...notifications, lowAttendance: e.target.checked });
                        triggerToast("Alert setting updated!");
                      }}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.toggleRow}>
                  <div className={styles.toggleInfo}>
                    <div className={styles.toggleTitle}>Syllabus Milestone Tracking</div>
                    <div className={styles.toggleDesc}>Weekly automated summary of faculty course completion rates.</div>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={notifications.syllabusMilestones}
                      onChange={(e) => {
                        setNotifications({ ...notifications, syllabusMilestones: e.target.checked });
                        triggerToast("Alert setting updated!");
                      }}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.toggleRow}>
                  <div className={styles.toggleInfo}>
                    <div className={styles.toggleTitle}>Student Performance Warnings</div>
                    <div className={styles.toggleDesc}>Instant alert when a student score drops into Critical (&lt; 40%).</div>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={notifications.studentWarning}
                      onChange={(e) => {
                        setNotifications({ ...notifications, studentWarning: e.target.checked });
                        triggerToast("Alert setting updated!");
                      }}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.toggleRow}>
                  <div className={styles.toggleInfo}>
                    <div className={styles.toggleTitle}>Weekly Email Report Digest</div>
                    <div className={styles.toggleDesc}>Receive an aggregated PDF summary of department metrics every Monday.</div>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={notifications.weeklyDigest}
                      onChange={(e) => {
                        setNotifications({ ...notifications, weeklyDigest: e.target.checked });
                        triggerToast("Alert setting updated!");
                      }}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Integrations */}
        {activeTab === "Integrations" && (
          <div className={styles.tabContent}>
            <div className={styles.sectionGroup}>
              <div className={styles.sectionInfo}>
                <div className={styles.sectionTitle}>Connected Academic Tools</div>
                <div className={styles.sectionDesc}>Connect the CIP portal to third-party academic tools, LMS, and video platforms.</div>
              </div>
              <div className={styles.sectionCard}>
                <div className={styles.integrationList}>
                  {integrations.map((tool) => (
                    <div key={tool.id} className={styles.integrationItem}>
                      <div className={styles.integrationIconBox}>
                        <Cpu size={20} />
                      </div>
                      <div className={styles.integrationInfo}>
                        <span className={styles.integrationTitle}>{tool.name}</span>
                        <span className={styles.integrationDesc}>{tool.category}</span>
                      </div>
                      <div>
                        <span className={tool.status === "Connected" ? styles.badgeConnected : styles.badgeDisconnected}>
                          {tool.status === "Connected" ? "Connected ✓" : "Disconnected"}
                        </span>
                      </div>
                      <div>
                        <button
                          type="button"
                          className={tool.status === "Connected" ? styles.btnCancel : styles.btnSave}
                          onClick={() => toggleIntegration(tool.id)}
                        >
                          {tool.status === "Connected" ? "Disconnect" : "Connect Tool"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
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
            <div className={styles.quickActionTitle}>Security & Access Controls</div>
            <div className={styles.quickActionDesc}>Manage security parameters, password policies, and department data permissions.</div>
          </div>
          <button 
            className={styles.quickActionBtn}
            onClick={() => setActiveTab("Security")}
          >
            Manage Security Settings <ArrowRight size={14} />
          </button>
        </div>

        <div className={styles.quickActionCard}>
          <Cpu className={styles.quickActionIcon} size={24} />
          <div>
            <div className={styles.quickActionTitle}>LMS & API Integrations</div>
            <div className={styles.quickActionDesc}>Manage data synchronization with Google Classroom, Moodle LMS, and Turnitin audit engines.</div>
          </div>
          <button 
            className={styles.quickActionBtn}
            onClick={() => setActiveTab("Integrations")}
          >
            Configure Integrations <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
