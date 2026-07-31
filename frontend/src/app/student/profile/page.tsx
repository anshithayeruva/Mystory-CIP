"use client";

import React, { useState } from "react";
import { User, Download, Award, Lock, History } from "lucide-react";
import styles from "../student.module.css";
import { STUDENT_INFO } from "../mockData";

export default function StudentProfilePage() {
  const [activeTab, setActiveTab] = useState<"profile" | "documents" | "security">("profile");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className={styles.pageContainer}>
      {/* Admin Clean Banner */}
      <div className={styles.welcomeBanner}>
        <div>
          <h1 className={styles.welcomeTitle}>{STUDENT_INFO.name}</h1>
          <p className={styles.welcomeSubtitle}>
            {STUDENT_INFO.program} • Roll: {STUDENT_INFO.rollNo} • Reg: {STUDENT_INFO.regNo}
          </p>
        </div>
        <div className={styles.bannerMeta}>
          <div className={styles.metaPill}>
            Student Profile
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className={styles.tabsContainer}>
        <button className={`${styles.tabBtn} ${activeTab === "profile" ? styles.tabBtnActive : ""}`} onClick={() => setActiveTab("profile")}>
          Personal & Academic Profile
        </button>
        <button className={`${styles.tabBtn} ${activeTab === "documents" ? styles.tabBtnActive : ""}`} onClick={() => setActiveTab("documents")}>
          Official Documents & Certificates
        </button>
        <button className={`${styles.tabBtn} ${activeTab === "security" ? styles.tabBtnActive : ""}`} onClick={() => setActiveTab("security")}>
          Security & Privacy Settings
        </button>
      </div>

      {/* TAB 1: PROFILE OVERVIEW */}
      {activeTab === "profile" && (
        <div className={styles.mainGrid}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Profile Info Form */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>
                <User size={18} color="#00522E" /> Personal Information
              </h2>

              <form onSubmit={handleSaveProfile} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748b" }}>FULL NAME</label>
                  <input type="text" defaultValue={STUDENT_INFO.name} className={styles.filterInput} style={{ width: "100%", boxSizing: "border-box", marginTop: 4 }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748b" }}>EMAIL ADDRESS</label>
                  <input type="email" defaultValue={STUDENT_INFO.email} disabled className={styles.filterInput} style={{ width: "100%", boxSizing: "border-box", marginTop: 4, backgroundColor: "#f1f5f9" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748b" }}>PHONE NUMBER</label>
                  <input type="text" defaultValue={STUDENT_INFO.phone} className={styles.filterInput} style={{ width: "100%", boxSizing: "border-box", marginTop: 4 }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748b" }}>REGISTRATION NUMBER</label>
                  <input type="text" defaultValue={STUDENT_INFO.regNo} disabled className={styles.filterInput} style={{ width: "100%", boxSizing: "border-box", marginTop: 4, backgroundColor: "#f1f5f9" }} />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748b" }}>CAMPUS ADDRESS</label>
                  <input type="text" defaultValue={STUDENT_INFO.address} className={styles.filterInput} style={{ width: "100%", boxSizing: "border-box", marginTop: 4 }} />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748b" }}>EMERGENCY CONTACT</label>
                  <input type="text" defaultValue={STUDENT_INFO.emergencyContact} className={styles.filterInput} style={{ width: "100%", boxSizing: "border-box", marginTop: 4 }} />
                </div>

                <div style={{ gridColumn: "1 / -1", marginTop: "4px" }}>
                  <button type="submit" className={styles.btnPrimary}>
                    Save Changes
                  </button>
                  {saveSuccess && <span style={{ marginLeft: "12px", color: "#00522E", fontWeight: 700, fontSize: "0.82rem" }}>✓ Profile updated successfully!</span>}
                </div>
              </form>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Academic Summary */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>
                <Award size={18} color="#00522E" /> Academic Summary
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "6px" }}>
                  <span style={{ color: "#64748b", fontSize: "0.82rem" }}>Program:</span>
                  <span style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.82rem" }}>B.Tech CSE</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "6px" }}>
                  <span style={{ color: "#64748b", fontSize: "0.82rem" }}>Department:</span>
                  <span style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.82rem" }}>Computer Science</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "6px" }}>
                  <span style={{ color: "#64748b", fontSize: "0.82rem" }}>Current CGPA:</span>
                  <span style={{ fontWeight: 800, color: "#00522E", fontSize: "0.88rem" }}>{STUDENT_INFO.cgpa}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "6px" }}>
                  <span style={{ color: "#64748b", fontSize: "0.82rem" }}>Faculty Advisor:</span>
                  <span style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.82rem" }}>{STUDENT_INFO.advisorName}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DOCUMENTS */}
      {activeTab === "documents" && (
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Official University Documents & Certificates</h2>
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
                  <td><button className={styles.btnSecondary} style={{ padding: "4px 10px", fontSize: "0.75rem" }}><Download size={14} /> Download PDF</button></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: "#0f172a" }}>Official Academic Transcript (Sem 1-5)</td>
                  <td>Academic Record</td>
                  <td><span className={styles.badgeCompleted}>VERIFIED</span></td>
                  <td><button className={styles.btnSecondary} style={{ padding: "4px 10px", fontSize: "0.75rem" }}><Download size={14} /> Download PDF</button></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: "#0f172a" }}>Semester 6 Fee Payment Receipt</td>
                  <td>Financial</td>
                  <td><span className={styles.badgeCompleted}>PAID</span></td>
                  <td><button className={styles.btnSecondary} style={{ padding: "4px 10px", fontSize: "0.75rem" }}><Download size={14} /> Download Receipt</button></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: "#0f172a" }}>Bonafide Student Certificate</td>
                  <td>Administrative</td>
                  <td><span className={styles.badgeCompleted}>ISSUED</span></td>
                  <td><button className={styles.btnSecondary} style={{ padding: "4px 10px", fontSize: "0.75rem" }}><Download size={14} /> Download PDF</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SECURITY */}
      {activeTab === "security" && (
        <div className={styles.mainGrid}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              <Lock size={18} color="#00522E" /> Change Password
            </h2>
            <form style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748b" }}>CURRENT PASSWORD</label>
                <input type="password" placeholder="••••••••" className={styles.filterInput} style={{ width: "100%", boxSizing: "border-box", marginTop: 4 }} />
              </div>
              <div>
                <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748b" }}>NEW PASSWORD</label>
                <input type="password" placeholder="••••••••" className={styles.filterInput} style={{ width: "100%", boxSizing: "border-box", marginTop: 4 }} />
              </div>
              <div>
                <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748b" }}>CONFIRM NEW PASSWORD</label>
                <input type="password" placeholder="••••••••" className={styles.filterInput} style={{ width: "100%", boxSizing: "border-box", marginTop: 4 }} />
              </div>
              <button type="button" className={styles.btnPrimary} style={{ width: "max-content", marginTop: 4 }}>
                Update Password
              </button>
            </form>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              <History size={18} color="#00522E" /> Active Sessions & Login History
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.82rem" }}>
              <div style={{ padding: "8px 12px", backgroundColor: "#f8fafc", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontWeight: 700, color: "#0f172a" }}>Windows PC • Chrome Browser (Current Session)</div>
                <div style={{ fontSize: "0.72rem", color: "#64748b" }}>IP: 192.168.0.102 • SRM AP Campus Network</div>
              </div>
              <div style={{ padding: "8px 12px", backgroundColor: "#f8fafc", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontWeight: 700, color: "#0f172a" }}>Android Phone • MyStory Mobile App</div>
                <div style={{ fontSize: "0.72rem", color: "#64748b" }}>Last active: Yesterday at 09:40 PM</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
