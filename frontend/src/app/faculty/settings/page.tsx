"use client";

import React, { useState, useEffect } from "react";
import { 
  User, 
  BookOpen,
  Layers,
  ClipboardList,
  Bell, 
  BarChart2,
  ShieldCheck, 
  Save
} from "lucide-react";
import ProfileSettings from "./components/ProfileSettings";
import AcademicPreferences from "./components/AcademicPreferences";
import SubjectConfiguration from "./components/SubjectConfiguration";
import AssessmentConfiguration from "./components/AssessmentConfiguration";
import NotificationSettings from "./components/NotificationSettings";
import ReportsPreferences from "./components/ReportsPreferences";
import SecuritySettings from "./components/SecuritySettings";
import styles from "./settings.module.css";

const MENU_ITEMS = [
  { id: "profile", label: "Personal Information", icon: User, subtitle: "Update the core details of your academic profile." },
  { id: "academic", label: "Academic Preferences", icon: BookOpen, subtitle: "Configure your general academic preferences." },
  { id: "subject", label: "Subject Configuration", icon: Layers, subtitle: "Manage preferences related to the subjects you teach." },
  { id: "assessment", label: "Assessment Configuration", icon: ClipboardList, subtitle: "Configure settings for student assessments." },
  { id: "notifications", label: "Notifications", icon: Bell, subtitle: "Manage your email and platform alerts." },
  { id: "reports", label: "Reports Preferences", icon: BarChart2, subtitle: "Manage how and when your reports are generated." },
  { id: "security", label: "Security & Privacy", icon: ShieldCheck, subtitle: "Manage your password and active devices." },
];

export default function FacultySettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showToast, setShowToast] = useState(false);

  // SECTION 1: Personal Information
  const [profileData, setProfileData] = useState({
    profilePhoto: "/images/dr-sarah.jpg",
    fullName: "Dr. Sarah Jenkins",
    facultyId: "FAC-84920",
    email: "sarah.jenkins@university.edu",
    phone: "+1 (555) 123-4567",
    department: "Computer Science",
    designation: "Associate Professor",
    officeRoom: "Building B, Room 402",
    officeHours: "Mon/Wed 2:00 PM - 4:00 PM",
    biography: "Passionate about AI and student outcomes."
  });

  // SECTION 2: Academic Preferences
  const [academicPrefs, setAcademicPrefs] = useState({
    defaultDepartment: "Computer Science",
    defaultProgram: "BSc Computer Science",
    defaultSemester: "Fall",
    defaultAcademicYear: "2023-2024",
    defaultSection: "Section A",
    preferredSubject: "Data Structures"
  });

  // SECTION 3: Subject Configuration
  const [subjectConfig, setSubjectConfig] = useState({
    displayAssigned: true,
    defaultView: "card",
    defaultSorting: "alphabetical",
    showArchived: false,
    expandUnits: true,
    rememberLastOpened: true
  });

  // SECTION 4: Assessment Configuration
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

  // SECTION 5: Notifications
  const [notifications, setNotifications] = useState({
    pulseCreated: true,
    sessionReminder: true,
    studentJoined: false,
    sessionCompleted: true,
    summaryReady: true,
    gapReportReady: true,
    weeklyReport: true,
    monthlySummary: false,
    systemAnnouncements: true,
    frequency: "instant"
  });

  // SECTION 6: Reports Preferences
  const [reportsPrefs, setReportsPrefs] = useState({
    exportFormat: "pdf",
    defaultPeriod: "weekly",
    autoGenWeekly: true,
    autoGenMonthly: false,
    includeCharts: true,
    downloadAutomatically: false
  });

  // SECTION 7: Security & Privacy
  const [securityPrefs, setSecurityPrefs] = useState({
    twoFactorAuth: false,
    emailLoginAlerts: true,
    rememberDevice: true,
    showEmailStudents: true,
    showPhoneStudents: false,
    allowStudentsContact: true
  });

  // Generic Handlers for State Updates
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleAcademicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAcademicPrefs(prev => ({ ...prev, [name]: value }));
  };

  const handleSubjectToggle = (key: keyof typeof subjectConfig) => {
    setSubjectConfig(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubjectSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSubjectConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleAssessmentToggle = (key: keyof typeof assessmentConfig) => {
    setAssessmentConfig(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAssessmentSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAssessmentConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNotificationSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNotifications(prev => ({ ...prev, [name]: value }));
  };

  const handleReportsToggle = (key: keyof typeof reportsPrefs) => {
    setReportsPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleReportsSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setReportsPrefs(prev => ({ ...prev, [name]: value }));
  };

  const handleSecurityToggle = (key: keyof typeof securityPrefs) => {
    setSecurityPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const activeItem = MENU_ITEMS.find(item => item.id === activeTab) || MENU_ITEMS[0];

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings formData={profileData} onChange={handleProfileChange} />;
      case "academic":
        return <AcademicPreferences formData={academicPrefs} onChange={handleAcademicChange} />;
      case "subject":
        return <SubjectConfiguration formData={subjectConfig} onToggle={(key: string) => handleSubjectToggle(key as any)} onSelect={handleSubjectSelect} />;
      case "assessment":
        return <AssessmentConfiguration formData={assessmentConfig} onToggle={(key: string) => handleAssessmentToggle(key as any)} onSelect={handleAssessmentSelect} />;
      case "notifications":
        return <NotificationSettings formData={notifications} onToggle={(key: string) => handleNotificationToggle(key as any)} onSelect={handleNotificationSelect} />;
      case "reports":
        return <ReportsPreferences formData={reportsPrefs} onToggle={(key: string) => handleReportsToggle(key as any)} onSelect={handleReportsSelect} />;
      case "security":
        return <SecuritySettings formData={securityPrefs} onToggle={(key: string) => handleSecurityToggle(key as any)} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>
          Manage your faculty preferences and account settings.
        </p>
      </div>

      <div className={styles.layoutGrid}>
        
        {/* Left Column - Vertical Tabs Menu */}
        <div className={styles.menuCard}>
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`${styles.menuItem} ${isActive ? styles.menuItemActive : ""}`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right Column - Active Content Card */}
        <div className={styles.contentCard}>
          <div className={styles.contentHeader}>
            <h2 className={styles.contentTitle}>{activeItem.label}</h2>
            <p className={styles.contentSubtitle}>{activeItem.subtitle}</p>
          </div>
          
          {renderContent()}

          <div className={styles.contentFooter}>
            <button type="button" className={styles.secondaryButton}>
              Cancel Changes
            </button>
            <button type="button" onClick={handleSave} className={styles.primaryButton}>
              <Save size={16} />
              Save All Changes
            </button>
          </div>
        </div>

      </div>

      {showToast && (
        <div className={styles.toast}>
          Preferences successfully saved!
        </div>
      )}
    </div>
  );
}
