"use client";

import React, { useState } from "react";
import styles from "./profile.module.css";
import { User, Shield, Bell, History, Info } from "lucide-react";

export default function ProfilePage() {
  const [toggles, setToggles] = useState({
    email: true,
    system: true,
    weekly: false,
    security: true,
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Profile</h1>
        <p className={styles.subtitle}>Manage your account information, security, and personal preferences.</p>
      </header>

      {/* SECTION 1: Profile Information */}
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>
          <User size={20} style={{ color: "#64748b" }} />
          Profile Information
        </h2>
        
        <div className={styles.profileLayout}>
          <div className={styles.avatarSection}>
            <img 
              src="https://api.dicebear.com/7.x/initials/svg?seed=Nitya%20Nara&backgroundColor=e2e8f0&textColor=475569" 
              alt="Profile" 
              className={styles.avatarImage}
            />
            <button suppressHydrationWarning className={styles.editAvatarBtn}>Change Photo</button>
          </div>
          
          <div className={styles.fieldsSection}>
            <div className={styles.grid}>
              <div className={styles.field}>
                <label>Full Name</label>
                <input suppressHydrationWarning type="text" defaultValue="Nitya Nara" />
              </div>
              <div className={styles.field}>
                <label>Email Address</label>
                <input suppressHydrationWarning type="email" defaultValue="nitya_nara@srmap.edu.in" />
              </div>
              <div className={styles.field}>
                <label>Phone Number</label>
                <input suppressHydrationWarning type="tel" defaultValue="+91 98765 43210" />
              </div>
              <div className={styles.field}>
                <label>Job Title</label>
                <input suppressHydrationWarning type="text" defaultValue="Head of Administration" />
              </div>
              <div className={styles.field}>
                <label>Institution Name</label>
                <input suppressHydrationWarning type="text" defaultValue="SRM University AP" disabled />
              </div>
              <div className={styles.field}>
                <label>Role</label>
                <input suppressHydrationWarning type="text" defaultValue="Institution Admin" disabled />
              </div>
            </div>
            
            <div className={styles.actions}>
              <button suppressHydrationWarning className={styles.primaryBtn}>Save Changes</button>
              <button suppressHydrationWarning className={styles.secondaryBtn}>Cancel</button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Account Security */}
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>
          <Shield size={20} style={{ color: "#64748b" }} />
          Account Security
        </h2>
        
        <div className={styles.grid} style={{ marginBottom: "32px" }}>
          <div className={styles.field}>
            <label>Current Password</label>
            <input suppressHydrationWarning type="password" placeholder="••••••••" />
          </div>
          <div className={styles.field}>
            <label>New Password</label>
            <input suppressHydrationWarning type="password" placeholder="••••••••" />
          </div>
          <div className={styles.field}>
            <label>Confirm Password</label>
            <input suppressHydrationWarning type="password" placeholder="••••••••" />
          </div>
        </div>
        
        <button suppressHydrationWarning className={styles.primaryBtn} style={{ marginBottom: "40px" }}>Update Password</button>

        <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "32px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 500, margin: "0 0 8px 0" }}>Multi-Factor Authentication</h3>
          <p style={{ fontSize: "14px", color: "#64748b", margin: "0 0 16px 0" }}>Add an extra layer of security to your account.</p>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "14px", fontWeight: 500, color: "#10b981", backgroundColor: "#ecfdf5", padding: "4px 10px", borderRadius: "12px" }}>Enabled</span>
            <button suppressHydrationWarning className={styles.secondaryBtn}>Configure MFA</button>
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
            <span className={styles.toggleDesc}>Receive important platform updates</span>
          </div>
          <div 
            className={`${styles.toggleSwitch} ${toggles.email ? styles.active : ""}`}
            onClick={() => setToggles({...toggles, email: !toggles.email})}
          >
            <div className={styles.toggleKnob}></div>
          </div>
        </div>

        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleTitle}>System Alerts</span>
            <span className={styles.toggleDesc}>Receive critical institutional alerts</span>
          </div>
          <div 
            className={`${styles.toggleSwitch} ${toggles.system ? styles.active : ""}`}
            onClick={() => setToggles({...toggles, system: !toggles.system})}
          >
            <div className={styles.toggleKnob}></div>
          </div>
        </div>

        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleTitle}>Weekly Reports</span>
            <span className={styles.toggleDesc}>Receive weekly institutional summaries</span>
          </div>
          <div 
            className={`${styles.toggleSwitch} ${toggles.weekly ? styles.active : ""}`}
            onClick={() => setToggles({...toggles, weekly: !toggles.weekly})}
          >
            <div className={styles.toggleKnob}></div>
          </div>
        </div>

        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleTitle}>Security Notifications</span>
            <span className={styles.toggleDesc}>Receive login and security alerts</span>
          </div>
          <div 
            className={`${styles.toggleSwitch} ${toggles.security ? styles.active : ""}`}
            onClick={() => setToggles({...toggles, security: !toggles.security})}
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
            {[1, 2, 3, 4, 5].map((item, i) => (
              <tr key={item}>
                <td>Jul {28 - i}, 2026, 9:42 AM</td>
                <td>Chrome on Windows</td>
                <td>Hyderabad, India</td>
                <td><span className={styles.statusSuccess}>Successful</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div style={{ marginTop: "24px", display: "flex", justifyContent: "center" }}>
          <button suppressHydrationWarning className={styles.secondaryBtn}>View Full Activity</button>
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
            <span className={styles.infoValue}>Institution Admin</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Member Since</span>
            <span className={styles.infoValue}>January 2026</span>
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
