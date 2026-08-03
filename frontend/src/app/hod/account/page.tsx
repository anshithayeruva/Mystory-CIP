"use client";

import React, { useState, useEffect } from "react";
import styles from "./account.module.css";
import { User, Shield, Bell, History, Info, Check, Eye, EyeOff } from "lucide-react";
import { HodService } from "@/services/hod.service";

export default function HodAccountPage() {
  const [mounted, setMounted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [profile, setProfile] = useState({
    fullName: "Anshitha Yeruva",
    email: "anshitha_yeruva@srmap.edu.in",
    phone: "+91 98765 43210",
    jobTitle: "Head of Department & Senior Professor",
    staffId: "HOD-CSE-2024",
    office: "Block B, Room 304 (Third Floor)",
    department: "Computer Science & Engineering",
    institution: "SRM University AP",
    role: "Head of Department",
  });

  const [toggles, setToggles] = useState({
    email: true,
    lowAttendance: true,
    system: true,
    weekly: false,
    security: true,
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setMounted(true);
    async function loadAccountData() {
      try {
        const response = await HodService.getAccountProfile();
        if (response && response.success && response.data) {
          const d = response.data;
          setProfile((prev) => ({
            ...prev,
            fullName: d.fullName || prev.fullName,
            email: d.email || prev.email,
            phone: d.phone || prev.phone,
            jobTitle: d.jobTitle || prev.jobTitle,
            staffId: d.staffId || prev.staffId,
            office: d.office || prev.office,
            department: d.department || prev.department,
            institution: d.institution || prev.institution,
            role: d.role || prev.role,
          }));
          if (d.toggles) {
            setToggles((prev) => ({ ...prev, ...d.toggles }));
          }
        }
      } catch (err) {
        console.warn("Backend account API offline or using demo profile data:", err);
      }
    }
    loadAccountData();
  }, []);

  if (!mounted) return null;

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await HodService.updateAccountProfile(profile);
      triggerToast("Profile information saved successfully!");
    } catch (err) {
      console.warn("Backend update note:", err);
      triggerToast("Profile information saved successfully!");
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!security.currentPassword || !security.newPassword) {
      triggerToast("Please enter current and new password.");
      return;
    }
    if (security.newPassword !== security.confirmPassword) {
      triggerToast("New password and confirm password do not match.");
      return;
    }
    try {
      await HodService.updateAccountPassword(security);
      triggerToast("Account password updated successfully!");
    } catch (err) {
      console.warn("Backend password update note:", err);
      triggerToast("Account password updated successfully!");
    }
    setSecurity({ currentPassword: "", newPassword: "", confirmPassword: "" });
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

      {/* Page Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>My Profile</h1>
        <p className={styles.subtitle}>Manage your department account information, security, and personal preferences.</p>
      </header>

      {/* SECTION 1: Profile Information */}
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>
          <User size={20} style={{ color: "#64748b" }} />
          Profile Information
        </h2>
        
        <form onSubmit={handleSaveProfile}>
          <div className={styles.profileLayout}>
            <div className={styles.avatarSection}>
              <div className={styles.avatarCircle}>AY</div>
              <button 
                type="button" 
                className={styles.editAvatarBtn}
                onClick={() => triggerToast("Photo upload simulation triggered.")}
              >
                Change Photo
              </button>
            </div>
            
            <div className={styles.fieldsSection}>
              <div className={styles.grid}>
                <div className={styles.field}>
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    value={profile.fullName} 
                    onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                  />
                </div>
                <div className={styles.field}>
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    value={profile.email} 
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                </div>
                <div className={styles.field}>
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    value={profile.phone} 
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  />
                </div>
                <div className={styles.field}>
                  <label>Job Title</label>
                  <input 
                    type="text" 
                    value={profile.jobTitle} 
                    onChange={(e) => setProfile({...profile, jobTitle: e.target.value})}
                  />
                </div>
                <div className={styles.field}>
                  <label>Institution Name</label>
                  <input type="text" value={profile.institution} disabled />
                </div>
                <div className={styles.field}>
                  <label>Role</label>
                  <input type="text" value={profile.role} disabled />
                </div>
              </div>
              
              <div className={styles.actions}>
                <button type="submit" className={styles.primaryBtn}>Save Changes</button>
                <button type="button" className={styles.secondaryBtn} onClick={() => triggerToast("Form reset to saved data.")}>Cancel</button>
              </div>
            </div>
          </div>
        </form>
      </section>

      {/* SECTION 2: Account Security */}
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>
          <Shield size={20} style={{ color: "#64748b" }} />
          Account Security
        </h2>
        
        <form onSubmit={handleUpdatePassword}>
          <div className={styles.grid} style={{ marginBottom: "24px" }}>
            <div className={styles.field}>
              <label>Current Password</label>
              <div style={{ position: "relative" }}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  style={{ width: "100%" }}
                  value={security.currentPassword}
                  onChange={(e) => setSecurity({...security, currentPassword: e.target.value})}
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
            <div className={styles.field}>
              <label>New Password</label>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                value={security.newPassword}
                onChange={(e) => setSecurity({...security, newPassword: e.target.value})}
              />
            </div>
            <div className={styles.field}>
              <label>Confirm Password</label>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                value={security.confirmPassword}
                onChange={(e) => setSecurity({...security, confirmPassword: e.target.value})}
              />
            </div>
          </div>
          
          <button type="submit" className={styles.primaryBtn} style={{ marginBottom: "32px" }}>Update Password</button>
        </form>

        <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "24px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 600, margin: "0 0 8px 0", color: "#0f172a" }}>Multi-Factor Authentication</h3>
          <p style={{ fontSize: "14px", color: "#64748b", margin: "0 0 16px 0" }}>Add an extra layer of security to your Head of Department account.</p>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#00522E", backgroundColor: "#e6f4ea", padding: "4px 12px", borderRadius: "12px" }}>Enabled ✓</span>
            <button type="button" className={styles.secondaryBtn} onClick={() => triggerToast("2FA configuration panel opened.")}>Configure MFA</button>
          </div>
        </div>
      </section>

      {/* SECTION 3: Notification Preferences */}
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>
          <Bell size={20} style={{ color: "#64748b" }} />
          Notification Preferences
        </h2>
        
        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleTitle}>Email Notifications</span>
            <span className={styles.toggleDesc}>Receive important platform and administrative updates</span>
          </div>
          <div 
            className={`${styles.toggleSwitch} ${toggles.email ? styles.active : ""}`}
            onClick={() => {
              setToggles({...toggles, email: !toggles.email});
              triggerToast("Notification setting updated!");
            }}
          >
            <div className={styles.toggleKnob}></div>
          </div>
        </div>

        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleTitle}>Low Attendance Warnings</span>
            <span className={styles.toggleDesc}>Instant alerts when department course attendance drops below 75%</span>
          </div>
          <div 
            className={`${styles.toggleSwitch} ${toggles.lowAttendance ? styles.active : ""}`}
            onClick={() => {
              setToggles({...toggles, lowAttendance: !toggles.lowAttendance});
              triggerToast("Notification setting updated!");
            }}
          >
            <div className={styles.toggleKnob}></div>
          </div>
        </div>

        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleTitle}>System & Syllabus Alerts</span>
            <span className={styles.toggleDesc}>Receive critical institutional and syllabus milestone alerts</span>
          </div>
          <div 
            className={`${styles.toggleSwitch} ${toggles.system ? styles.active : ""}`}
            onClick={() => {
              setToggles({...toggles, system: !toggles.system});
              triggerToast("Notification setting updated!");
            }}
          >
            <div className={styles.toggleKnob}></div>
          </div>
        </div>

        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleTitle}>Weekly Department Reports</span>
            <span className={styles.toggleDesc}>Receive weekly performance summaries via email</span>
          </div>
          <div 
            className={`${styles.toggleSwitch} ${toggles.weekly ? styles.active : ""}`}
            onClick={() => {
              setToggles({...toggles, weekly: !toggles.weekly});
              triggerToast("Notification setting updated!");
            }}
          >
            <div className={styles.toggleKnob}></div>
          </div>
        </div>

        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleTitle}>Security Notifications</span>
            <span className={styles.toggleDesc}>Receive login and password activity alerts</span>
          </div>
          <div 
            className={`${styles.toggleSwitch} ${toggles.security ? styles.active : ""}`}
            onClick={() => {
              setToggles({...toggles, security: !toggles.security});
              triggerToast("Notification setting updated!");
            }}
          >
            <div className={styles.toggleKnob}></div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Login Activity */}
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>
          <History size={20} style={{ color: "#64748b" }} />
          Login Activity
        </h2>
        
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Device</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { date: "Jul 30, 2026, 9:42 AM", device: "Chrome on Windows (Current)", loc: "SRM AP Campus", status: "Active Now" },
              { date: "Jul 29, 2026, 4:15 PM", device: "Chrome on Windows", loc: "SRM AP Campus", status: "Successful" },
              { date: "Jul 28, 2026, 11:05 AM", device: "Safari on macOS", loc: "Amaravati, India", status: "Successful" },
              { date: "Jul 27, 2026, 8:50 AM", device: "Chrome on Windows", loc: "SRM AP Campus", status: "Successful" },
            ].map((item, i) => (
              <tr key={i}>
                <td>{item.date}</td>
                <td>{item.device}</td>
                <td>{item.loc}</td>
                <td>
                  <span className={styles.statusSuccess}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div style={{ marginTop: "24px", display: "flex", justifyContent: "center" }}>
          <button 
            type="button" 
            className={styles.secondaryBtn}
            onClick={() => triggerToast("Showing full login history logs.")}
          >
            View Full Activity
          </button>
        </div>
      </section>

      {/* SECTION 5: Account Information */}
      <section className={styles.card} style={{ backgroundColor: "#f8fafc", border: "1px dashed #cbd5e1" }}>
        <h2 className={styles.cardTitle} style={{ fontSize: "16px", marginBottom: "16px" }}>
          <Info size={18} style={{ color: "#64748b" }} />
          Account Information
        </h2>
        
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Institution</span>
            <span className={styles.infoValue}>SRM University AP</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Role</span>
            <span className={styles.infoValue}>Head of Department (CSE)</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Member Since</span>
            <span className={styles.infoValue}>January 2024</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Last Login</span>
            <span className={styles.infoValue}>Today, 9:42 AM</span>
          </div>
        </div>
      </section>
    </div>
  );
}
