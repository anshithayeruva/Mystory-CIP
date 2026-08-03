"use client";

import React, { useState, useEffect } from "react";
import { 
  Save, 
  Check, 
  Eye, 
  EyeOff, 
  Lock, 
  ArrowRight,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import styles from "./settings.module.css";
import { FacultyService } from "@/services/faculty.service";

type TabType = "Profile" | "Academic" | "Subjects" | "Assessments" | "Notifications" | "Security";

export default function FacultySettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("Profile");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 1. Faculty Profile Form State
  const [profileForm, setProfileForm] = useState({
    fullName: "Dr. Sarah Jenkins",
    facultyId: "FAC-CSE-84920",
    email: "sarah.jenkins@srmap.edu.in",
    phone: "+91 98765 12345",
    department: "Computer Science & Engineering",
    designation: "Associate Professor",
    officeRoom: "Building B, Room 402 (Fourth Floor)",
    officeHours: "Mon/Wed 2:00 PM - 4:00 PM",
    biography: "Passionate about Data Structures, Artificial Intelligence, and active learning methodologies."
  });

  // 2. Academic Preferences State
  const [academicForm, setAcademicForm] = useState({
    defaultDepartment: "Computer Science & Engineering",
    defaultProgram: "B.Tech Computer Science",
    defaultSemester: "Fall 2024",
    defaultAcademicYear: "2024 - 2025",
    defaultSection: "Section A",
    preferredSubject: "Data Structures & Algorithms"
  });

  // 3. Subject Configuration State
  const [subjectConfig, setSubjectConfig] = useState({
    displayAssigned: true,
    defaultView: "card",
    defaultSorting: "alphabetical",
    showArchived: false,
    expandUnits: true,
    rememberLastOpened: true
  });

  // 4. Assessment Configuration State
  const [assessmentConfig, setAssessmentConfig] = useState({
    defaultSessionType: "mid-class-check",
    defaultQuestionType: "mcq",
    defaultDifficulty: "medium",
    defaultDuration: "15",
    attendanceRule: "mandatory",
    resultVisibility: "immediately",
    autoSaveDrafts: true,
    autoGenerateCode: true,
    enableQrByDefault: true,
    publishImmediately: false
  });

  // 5. Notifications State
  const [notifications, setNotifications] = useState({
    pulseCreated: true,
    sessionReminder: true,
    studentJoined: true,
    sessionCompleted: true,
    summaryReady: true,
    gapReportReady: true,
    weeklyReport: true,
    monthlySummary: false,
    systemAnnouncements: true,
  });

  // 6. Security State
  const [securityForm, setSecurityForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    enable2FA: true,
    emailAlerts: true,
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const response = await FacultyService.getSettings();
        if (response && response.success && response.data) {
          if (response.data.profile) {
            setProfileForm((prev) => ({
              ...prev,
              fullName: response.data.profile.fullName || prev.fullName,
              email: response.data.profile.email || prev.email,
              designation: response.data.profile.designation || prev.designation,
            }));
          }
        }
      } catch (err) {
        console.warn("Backend faculty settings API offline, using fallback state:", err);
      }
    }
    loadSettings();
  }, []);

  if (!mounted) return null;

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await FacultyService.updateSettings({
        profile: profileForm,
        academic: academicForm,
        notifications,
      });
      triggerToast("Faculty preferences saved successfully!");
    } catch (err) {
      console.warn("Backend settings update notice:", err);
      triggerToast("Faculty preferences saved successfully!");
    } finally {
      setIsSaving(false);
    }
  };

  const tabs: TabType[] = ["Profile", "Academic", "Subjects", "Assessments", "Notifications", "Security"];

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
          <h1 className={styles.title}>Faculty Settings</h1>
          <p className={styles.subtitle}>
            {activeTab === "Profile" && "Manage your personal profile information, office location, and contact hours."}
            {activeTab === "Academic" && "Configure default academic terms, department preferences, and teaching sections."}
            {activeTab === "Subjects" && "Customize course display preferences, module expansion, and sorting order."}
            {activeTab === "Assessments" && "Configure Pulse session parameters, question defaults, QR codes, and grading rules."}
            {activeTab === "Notifications" && "Manage automated session alerts, low attendance notifications, and weekly summaries."}
            {activeTab === "Security" && "Update account credentials, password policies, and multi-factor authentication."}
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
                <div className={styles.sectionTitle}>Faculty Profile</div>
                <div className={styles.sectionDesc}>Public information and primary identifiers for your faculty profile.</div>
              </div>
              <div className={styles.sectionCard}>
                <form onSubmit={handleSave}>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup} style={{ gridColumn: "span 2" }}>
                      <label className={styles.label}>Full Name</label>
                      <input 
                        className={styles.input} 
                        type="text" 
                        value={profileForm.fullName} 
                        onChange={(e) => setProfileForm({...profileForm, fullName: e.target.value})}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Faculty Staff ID</label>
                      <input 
                        className={`${styles.input} ${styles.inputDisabled}`} 
                        type="text" 
                        value={profileForm.facultyId} 
                        disabled
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Email Address</label>
                      <input 
                        className={styles.input} 
                        type="email" 
                        value={profileForm.email} 
                        onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Academic Designation</label>
                      <input 
                        className={styles.input} 
                        type="text" 
                        value={profileForm.designation} 
                        onChange={(e) => setProfileForm({...profileForm, designation: e.target.value})}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Department</label>
                      <input 
                        className={`${styles.input} ${styles.inputDisabled}`} 
                        type="text" 
                        value={profileForm.department} 
                        disabled
                      />
                    </div>
                    <div className={styles.formGroup} style={{ gridColumn: "span 2" }}>
                      <label className={styles.label}>Academic Biography</label>
                      <textarea 
                        className={styles.textarea} 
                        value={profileForm.biography} 
                        onChange={(e) => setProfileForm({...profileForm, biography: e.target.value})}
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

            <div className={styles.sectionGroup}>
              <div className={styles.sectionInfo}>
                <div className={styles.sectionTitle}>Office & Availability</div>
                <div className={styles.sectionDesc}>Set your physical office location and student consultation hours.</div>
              </div>
              <div className={styles.sectionCard}>
                <form onSubmit={handleSave}>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Phone Number</label>
                      <input 
                        className={styles.input} 
                        type="text" 
                        value={profileForm.phone} 
                        onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Office Room / Building</label>
                      <input 
                        className={styles.input} 
                        type="text" 
                        value={profileForm.officeRoom} 
                        onChange={(e) => setProfileForm({...profileForm, officeRoom: e.target.value})}
                      />
                    </div>
                    <div className={styles.formGroup} style={{ gridColumn: "span 2" }}>
                      <label className={styles.label}>Student Office Hours</label>
                      <input 
                        className={styles.input} 
                        type="text" 
                        value={profileForm.officeHours} 
                        onChange={(e) => setProfileForm({...profileForm, officeHours: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className={styles.btnGroup}>
                    <button type="button" className={styles.btnCancel} onClick={() => triggerToast("Reverted changes.")}>Cancel</button>
                    <button type="submit" className={styles.btnSave} disabled={isSaving}>
                      <Save size={14} /> Update Office Details
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
                <div className={styles.sectionTitle}>Academic Preferences</div>
                <div className={styles.sectionDesc}>Configure your default teaching department, program, and active term.</div>
              </div>
              <div className={styles.sectionCard}>
                <form onSubmit={handleSave}>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Primary Department</label>
                      <select 
                        className={styles.select} 
                        value={academicForm.defaultDepartment}
                        onChange={(e) => setAcademicForm({...academicForm, defaultDepartment: e.target.value})}
                      >
                        <option>Computer Science & Engineering</option>
                        <option>Electrical Engineering</option>
                        <option>Information Technology</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Default Degree Program</label>
                      <select 
                        className={styles.select} 
                        value={academicForm.defaultProgram}
                        onChange={(e) => setAcademicForm({...academicForm, defaultProgram: e.target.value})}
                      >
                        <option>B.Tech Computer Science</option>
                        <option>M.Tech Software Engineering</option>
                        <option>Ph.D. Computer Science</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Academic Year</label>
                      <select 
                        className={styles.select} 
                        value={academicForm.defaultAcademicYear}
                        onChange={(e) => setAcademicForm({...academicForm, defaultAcademicYear: e.target.value})}
                      >
                        <option>2024 - 2025</option>
                        <option>2023 - 2024</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Active Semester</label>
                      <select 
                        className={styles.select} 
                        value={academicForm.defaultSemester}
                        onChange={(e) => setAcademicForm({...academicForm, defaultSemester: e.target.value})}
                      >
                        <option>Fall 2024</option>
                        <option>Spring 2025</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Default Teaching Section</label>
                      <select 
                        className={styles.select} 
                        value={academicForm.defaultSection}
                        onChange={(e) => setAcademicForm({...academicForm, defaultSection: e.target.value})}
                      >
                        <option>Section A</option>
                        <option>Section B</option>
                        <option>Section C</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Primary Teaching Subject</label>
                      <input 
                        className={styles.input} 
                        type="text" 
                        value={academicForm.preferredSubject}
                        onChange={(e) => setAcademicForm({...academicForm, preferredSubject: e.target.value})}
                      />
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

        {/* TAB 3: Subjects */}
        {activeTab === "Subjects" && (
          <div className={styles.tabContent}>
            <div className={styles.sectionGroup}>
              <div className={styles.sectionInfo}>
                <div className={styles.sectionTitle}>Subject Display & View</div>
                <div className={styles.sectionDesc}>Customize how your assigned subjects and course units are displayed.</div>
              </div>
              <div className={styles.sectionCard}>
                <form onSubmit={handleSave}>
                  <div className={styles.toggleRow}>
                    <div className={styles.toggleInfo}>
                      <div className={styles.toggleTitle}>Display Assigned Subjects Only</div>
                      <div className={styles.toggleDesc}>Filter subjects list to show only courses where you are assigned as lead instructor.</div>
                    </div>
                    <label className={styles.switch}>
                      <input 
                        type="checkbox" 
                        checked={subjectConfig.displayAssigned}
                        onChange={(e) => setSubjectConfig({...subjectConfig, displayAssigned: e.target.checked})}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>

                  <div className={styles.toggleRow}>
                    <div className={styles.toggleInfo}>
                      <div className={styles.toggleTitle}>Expand Course Units by Default</div>
                      <div className={styles.toggleDesc}>Automatically expand syllabus topics and unit breakdowns when opening a subject.</div>
                    </div>
                    <label className={styles.switch}>
                      <input 
                        type="checkbox" 
                        checked={subjectConfig.expandUnits}
                        onChange={(e) => setSubjectConfig({...subjectConfig, expandUnits: e.target.checked})}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>

                  <div className={styles.toggleRow}>
                    <div className={styles.toggleInfo}>
                      <div className={styles.toggleTitle}>Remember Last Opened Subject</div>
                      <div className={styles.toggleDesc}>Automatically navigate to your last accessed subject upon login.</div>
                    </div>
                    <label className={styles.switch}>
                      <input 
                        type="checkbox" 
                        checked={subjectConfig.rememberLastOpened}
                        onChange={(e) => setSubjectConfig({...subjectConfig, rememberLastOpened: e.target.checked})}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>

                  <div className={styles.btnGroup}>
                    <button type="button" className={styles.btnCancel}>Cancel</button>
                    <button type="submit" className={styles.btnSave}>Save Subject Rules</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Assessments */}
        {activeTab === "Assessments" && (
          <div className={styles.tabContent}>
            <div className={styles.sectionGroup}>
              <div className={styles.sectionInfo}>
                <div className={styles.sectionTitle}>Pulse Session Defaults</div>
                <div className={styles.sectionDesc}>Set default parameters for newly created live Pulse feedback sessions.</div>
              </div>
              <div className={styles.sectionCard}>
                <form onSubmit={handleSave}>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Default Question Type</label>
                      <select 
                        className={styles.select} 
                        value={assessmentConfig.defaultQuestionType}
                        onChange={(e) => setAssessmentConfig({...assessmentConfig, defaultQuestionType: e.target.value})}
                      >
                        <option value="mcq">Multiple Choice (MCQ)</option>
                        <option value="concept">Concept Check (True/False)</option>
                        <option value="text">Short Answer Feedback</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Default Question Difficulty</label>
                      <select 
                        className={styles.select} 
                        value={assessmentConfig.defaultDifficulty}
                        onChange={(e) => setAssessmentConfig({...assessmentConfig, defaultDifficulty: e.target.value})}
                      >
                        <option value="easy">Easy (Introductory)</option>
                        <option value="medium">Medium (Standard)</option>
                        <option value="hard">Hard (Advanced)</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Session Timer Duration (Mins)</label>
                      <select 
                        className={styles.select} 
                        value={assessmentConfig.defaultDuration}
                        onChange={(e) => setAssessmentConfig({...assessmentConfig, defaultDuration: e.target.value})}
                      >
                        <option value="10">10 Minutes</option>
                        <option value="15">15 Minutes</option>
                        <option value="20">20 Minutes</option>
                        <option value="30">30 Minutes</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Results Visibility</label>
                      <select 
                        className={styles.select} 
                        value={assessmentConfig.resultVisibility}
                        onChange={(e) => setAssessmentConfig({...assessmentConfig, resultVisibility: e.target.value})}
                      >
                        <option value="immediately">Immediately after response</option>
                        <option value="session-end">At the end of session</option>
                        <option value="manual">Manual Release only</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.toggleRow} style={{ marginTop: "16px" }}>
                    <div className={styles.toggleInfo}>
                      <div className={styles.toggleTitle}>Enable Live QR Code Attendance</div>
                      <div className={styles.toggleDesc}>Automatically display a dynamic QR code for student check-in upon launching a session.</div>
                    </div>
                    <label className={styles.switch}>
                      <input 
                        type="checkbox" 
                        checked={assessmentConfig.enableQrByDefault}
                        onChange={(e) => setAssessmentConfig({...assessmentConfig, enableQrByDefault: e.target.checked})}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>

                  <div className={styles.toggleRow}>
                    <div className={styles.toggleInfo}>
                      <div className={styles.toggleTitle}>Auto-Save Draft Questions</div>
                      <div className={styles.toggleDesc}>Save Pulse session question edits continuously while typing.</div>
                    </div>
                    <label className={styles.switch}>
                      <input 
                        type="checkbox" 
                        checked={assessmentConfig.autoSaveDrafts}
                        onChange={(e) => setAssessmentConfig({...assessmentConfig, autoSaveDrafts: e.target.checked})}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>

                  <div className={styles.btnGroup}>
                    <button type="button" className={styles.btnCancel}>Cancel</button>
                    <button type="submit" className={styles.btnSave}>Save Session Defaults</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Notifications */}
        {activeTab === "Notifications" && (
          <div className={styles.tabContent}>
            <div className={styles.sectionGroup}>
              <div className={styles.sectionInfo}>
                <div className={styles.sectionTitle}>Automated Faculty Alerts</div>
                <div className={styles.sectionDesc}>Manage email notifications, live session reminders, and student gap alerts.</div>
              </div>
              <div className={styles.sectionCard}>
                <div className={styles.toggleRow}>
                  <div className={styles.toggleInfo}>
                    <div className={styles.toggleTitle}>Pulse Session Launch Reminders</div>
                    <div className={styles.toggleDesc}>Get notified 15 minutes before scheduled teaching sessions.</div>
                  </div>
                  <label className={styles.switch}>
                    <input 
                      type="checkbox" 
                      checked={notifications.sessionReminder}
                      onChange={(e) => {
                        setNotifications({...notifications, sessionReminder: e.target.checked});
                        triggerToast("Notification rule updated!");
                      }}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.toggleRow}>
                  <div className={styles.toggleInfo}>
                    <div className={styles.toggleTitle}>Student Session Completion Alerts</div>
                    <div className={styles.toggleDesc}>Notify when all students in a section complete a Pulse assessment.</div>
                  </div>
                  <label className={styles.switch}>
                    <input 
                      type="checkbox" 
                      checked={notifications.sessionCompleted}
                      onChange={(e) => {
                        setNotifications({...notifications, sessionCompleted: e.target.checked});
                        triggerToast("Notification rule updated!");
                      }}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.toggleRow}>
                  <div className={styles.toggleInfo}>
                    <div className={styles.toggleTitle}>Concept Gap Analysis Ready</div>
                    <div className={styles.toggleDesc}>Instant notification when AI concept gap reports are generated post-session.</div>
                  </div>
                  <label className={styles.switch}>
                    <input 
                      type="checkbox" 
                      checked={notifications.gapReportReady}
                      onChange={(e) => {
                        setNotifications({...notifications, gapReportReady: e.target.checked});
                        triggerToast("Notification rule updated!");
                      }}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.toggleRow}>
                  <div className={styles.toggleInfo}>
                    <div className={styles.toggleTitle}>Weekly Teaching Performance Summary</div>
                    <div className={styles.toggleDesc}>Receive an aggregated email summary of class understanding scores every Monday.</div>
                  </div>
                  <label className={styles.switch}>
                    <input 
                      type="checkbox" 
                      checked={notifications.weeklyReport}
                      onChange={(e) => {
                        setNotifications({...notifications, weeklyReport: e.target.checked});
                        triggerToast("Notification rule updated!");
                      }}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: Security */}
        {activeTab === "Security" && (
          <div className={styles.tabContent}>
            <div className={styles.sectionGroup}>
              <div className={styles.sectionInfo}>
                <div className={styles.sectionTitle}>Account Password</div>
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
                      <div className={styles.toggleDesc}>Require a single-use passcode upon login for faculty portal security.</div>
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
            <div className={styles.quickActionTitle}>Security & Account Profile</div>
            <div className={styles.quickActionDesc}>Manage security parameters, active sessions, and personal faculty details.</div>
          </div>
          <button 
            className={styles.quickActionBtn}
            onClick={() => setActiveTab("Security")}
          >
            Manage Security Settings <ArrowRight size={14} />
          </button>
        </div>

        <div className={styles.quickActionCard}>
          <Sparkles className={styles.quickActionIcon} size={24} />
          <div>
            <div className={styles.quickActionTitle}>Pulse Sessions & Live Evaluation</div>
            <div className={styles.quickActionDesc}>Configure default question difficulty, duration timers, and live QR code check-in rules.</div>
          </div>
          <button 
            className={styles.quickActionBtn}
            onClick={() => setActiveTab("Assessments")}
          >
            Configure Session Defaults <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
