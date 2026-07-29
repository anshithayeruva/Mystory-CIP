"use client";

import React, { useState } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  MapPin, 
  IdCard, 
  ShieldCheck, 
  Lock, 
  Bell, 
  Check, 
  Save, 
  Camera, 
  Eye, 
  EyeOff, 
  Clock, 
  Laptop
} from "lucide-react";
import styles from "./account.module.css";

export default function HodAccountPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Profile Form State
  const [profile, setProfile] = useState({
    fullName: "Anshitha Yeruva",
    email: "anshitha_yeruva@srmap.edu.in",
    phone: "+91 98765 43210",
    staffId: "HOD-CSE-2024",
    office: "Block B, Room 304 (3rd Floor)",
    department: "Computer Science & Engineering",
    institution: "SRM University AP",
  });

  // Password Security Form State
  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    enableMFA: true,
  });
  const [showPassword, setShowPassword] = useState(false);

  // Notification Preferences State
  const [notifications, setNotifications] = useState({
    weeklyDigest: true,
    lowAttendance: true,
    securityAlerts: true,
  });

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      triggerToast("Profile information updated successfully!");
    }, 500);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!security.currentPassword || !security.newPassword) {
      triggerToast("Please enter current and new password.");
      return;
    }
    if (security.newPassword !== security.confirmPassword) {
      triggerToast("New password and confirm password do not match.");
      return;
    }
    triggerToast("Account password updated successfully!");
    setSecurity((prev) => ({ ...prev, currentPassword: "", newPassword: "", confirmPassword: "" }));
  };

  return (
    <div className={styles.container}>
      {/* Toast Alert */}
      {toastMessage && (
        <div className={styles.toastSuccess}>
          <Check size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Header Card */}
      <div className={styles.heroCard}>
        <div className={styles.heroLeft}>
          <div className={styles.avatarCircle}>AY</div>
          <div className={styles.heroMeta}>
            <span className={styles.heroRoleTag}>
              <ShieldCheck size={14} /> Head of Department
            </span>
            <h1 className={styles.heroName}>{profile.fullName}</h1>
            <span className={styles.heroSub}>
              {profile.department} • {profile.institution}
            </span>
          </div>
        </div>

        <div className={styles.heroActions}>
          <button 
            className={styles.photoBtn}
            onClick={() => triggerToast("Photo upload simulation triggered.")}
          >
            <Camera size={16} />
            <span>Change Photo</span>
          </button>
        </div>
      </div>

      {/* 2-Column Layout */}
      <div className={styles.gridTwoCol}>
        {/* Left Column: Personal Profile Details & Meta */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Profile Information Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitleGroup}>
                <User size={20} className={styles.cardIcon} />
                <h2 className={styles.cardTitle}>Profile Information</h2>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Full Name *</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={profile.fullName}
                    onChange={(e) => setProfile((prev) => ({ ...prev, fullName: e.target.value }))}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Email Address *</label>
                  <input
                    type="email"
                    required
                    className={styles.input}
                    value={profile.email}
                    onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Phone Number</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={profile.phone}
                    onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Staff Registry Code</label>
                  <input
                    type="text"
                    readOnly
                    className={`${styles.input} ${styles.inputDisabled}`}
                    value={profile.staffId}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Department</label>
                  <input
                    type="text"
                    readOnly
                    className={`${styles.input} ${styles.inputDisabled}`}
                    value={profile.department}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Office Location</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={profile.office}
                    onChange={(e) => setProfile((prev) => ({ ...prev, office: e.target.value }))}
                  />
                </div>
              </div>

              <div className={styles.btnRow}>
                <button 
                  type="button" 
                  className={styles.cancelBtn}
                  onClick={() => triggerToast("Form reverted to current saved profile.")}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.saveBtn} disabled={isSaving}>
                  <Save size={16} />
                  <span>{isSaving ? "Saving..." : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Account Meta Bar */}
          <div className={styles.metaBoxGrid}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Institution</span>
              <span className={styles.metaVal}>{profile.institution}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Assigned Role</span>
              <span className={styles.metaVal}>Department HoD</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Member Since</span>
              <span className={styles.metaVal}>Jan 2024</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Security Status</span>
              <span className={styles.metaVal} style={{ color: "#00522e" }}>2FA Enabled ✓</span>
            </div>
          </div>
        </div>

        {/* Right Column: Security, Notifications, & Activity */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Account Security Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitleGroup}>
                <Lock size={20} className={styles.cardIcon} />
                <h2 className={styles.cardTitle}>Account Security</h2>
              </div>
            </div>

            <form onSubmit={handleUpdatePassword} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Current Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={styles.input}
                    style={{ width: "100%" }}
                    placeholder="Enter current password"
                    value={security.currentPassword}
                    onChange={(e) => setSecurity((prev) => ({ ...prev, currentPassword: e.target.value }))}
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

              <div className={styles.formGroup}>
                <label className={styles.label}>New Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className={styles.input}
                  placeholder="Min 8 characters"
                  value={security.newPassword}
                  onChange={(e) => setSecurity((prev) => ({ ...prev, newPassword: e.target.value }))}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Confirm New Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className={styles.input}
                  placeholder="Repeat new password"
                  value={security.confirmPassword}
                  onChange={(e) => setSecurity((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                />
              </div>

              <div className={styles.toggleRow}>
                <div className={styles.toggleMeta}>
                  <span className={styles.toggleTitle}>Multi-Factor Authentication (2FA)</span>
                  <span className={styles.toggleDesc}>Add single-use security passcode requirement.</span>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={security.enableMFA}
                    onChange={(e) => {
                      setSecurity((prev) => ({ ...prev, enableMFA: e.target.checked }));
                      triggerToast("2FA security setting updated!");
                    }}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>

              <div className={styles.btnRow}>
                <button type="submit" className={styles.saveBtn} style={{ width: "100%", justifyContent: "center" }}>
                  <Lock size={16} />
                  <span>Update Password</span>
                </button>
              </div>
            </form>
          </div>

          {/* HoD Notification Preferences */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitleGroup}>
                <Bell size={20} className={styles.cardIcon} />
                <h2 className={styles.cardTitle}>Notification Preferences</h2>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div className={styles.toggleRow}>
                <div className={styles.toggleMeta}>
                  <span className={styles.toggleTitle}>Weekly Department Digest</span>
                  <span className={styles.toggleDesc}>Aggregated performance email digest every Monday.</span>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={notifications.weeklyDigest}
                    onChange={(e) => {
                      setNotifications((prev) => ({ ...prev, weeklyDigest: e.target.checked }));
                      triggerToast("Notification setting updated!");
                    }}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>

              <div className={styles.toggleRow}>
                <div className={styles.toggleMeta}>
                  <span className={styles.toggleTitle}>Low Attendance Warnings</span>
                  <span className={styles.toggleDesc}>Instant alert when class average drops &lt; 75%.</span>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={notifications.lowAttendance}
                    onChange={(e) => {
                      setNotifications((prev) => ({ ...prev, lowAttendance: e.target.checked }));
                      triggerToast("Notification setting updated!");
                    }}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>
          </div>

          {/* Recent Login Activity */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitleGroup}>
                <Clock size={20} className={styles.cardIcon} />
                <h2 className={styles.cardTitle}>Recent Login Activity</h2>
              </div>
            </div>

            <div className={styles.sessionList}>
              <div className={styles.sessionRow}>
                <div className={styles.sessionLeft}>
                  <Laptop size={18} style={{ color: "#00522e" }} />
                  <div className={styles.sessionMeta}>
                    <span className={styles.sessionDevice}>Chrome on Windows (Current)</span>
                    <span className={styles.sessionLoc}>SRM AP Campus • Today, 9:42 AM</span>
                  </div>
                </div>
                <span className={styles.statusPill}>Active Now</span>
              </div>

              <div className={styles.sessionRow}>
                <div className={styles.sessionLeft}>
                  <Laptop size={18} style={{ color: "#64748b" }} />
                  <div className={styles.sessionMeta}>
                    <span className={styles.sessionDevice}>Chrome on Windows</span>
                    <span className={styles.sessionLoc}>SRM AP Campus • Yesterday, 10:15 AM</span>
                  </div>
                </div>
                <span className={styles.statusPill}>Successful</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
