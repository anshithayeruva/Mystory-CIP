"use client";

import { useState } from "react";
import Link from "next/link";
import { PlusCircle, FileText, UserPlus, Settings, X, Check, Calendar, MapPin, User, BookOpen } from "lucide-react";
import styles from "../dashboard.module.css";

export default function QuickActions() {
  const [showModal, setShowModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    subject: "CS-302: Data Structures",
    staff: "Dr. Anita Sharma",
    room: "Lab Room 4A",
    time: "11:30 AM - 01:00 PM",
  });

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
    setToastMsg("New session scheduled successfully!");
    setTimeout(() => setToastMsg(null), 3500);
  };

  return (
    <div className={styles.sectionCard}>
      {toastMsg && (
        <div 
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            backgroundColor: "#e6f4ea",
            border: "1px solid #c2e7da",
            color: "#00522e",
            padding: "12px 20px",
            borderRadius: "10px",
            fontWeight: 700,
            fontSize: "0.875rem",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
            zIndex: 2000,
          }}
        >
          <Check size={18} />
          <span>{toastMsg}</span>
        </div>
      )}

      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
      </div>

      <div className={styles.quickActionsGrid}>
        <button
          type="button"
          className={styles.actionCardBtn}
          onClick={() => setShowModal(true)}
        >
          <PlusCircle size={22} />
          <span>NEW SESSION</span>
        </button>

        <Link href="/hod/reports" className={styles.actionCardBtn}>
          <FileText size={22} />
          <span>REPORT</span>
        </Link>

        <Link href="/hod/students" className={styles.actionCardBtn}>
          <UserPlus size={22} />
          <span>ENROLL</span>
        </Link>

        <Link href="/hod/settings" className={styles.actionCardBtn}>
          <Settings size={22} />
          <span>SETTINGS</span>
        </Link>
      </div>

      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Schedule New Class Session</h3>
              <button 
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setShowModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateSession} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#475569", textTransform: "uppercase" }}>
                  Select Subject *
                </label>
                <div style={{ position: "relative" }}>
                  <BookOpen size={16} style={{ position: "absolute", left: "12px", top: "12px", color: "#64748b" }} />
                  <select
                    required
                    style={{
                      width: "100%",
                      padding: "10px 12px 10px 38px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "0.875rem",
                      color: "#0f172a",
                      backgroundColor: "#ffffff",
                    }}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="CS-302: Data Structures">CS-302: Data Structures</option>
                    <option value="CS-501: AI & Robotics">CS-501: AI & Robotics</option>
                    <option value="IT-204: Database Systems">IT-204: Database Systems</option>
                    <option value="CS-404: Web Technologies">CS-404: Web Technologies</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#475569", textTransform: "uppercase" }}>
                  Assigned Staff *
                </label>
                <div style={{ position: "relative" }}>
                  <User size={16} style={{ position: "absolute", left: "12px", top: "12px", color: "#64748b" }} />
                  <input
                    type="text"
                    required
                    style={{
                      width: "100%",
                      padding: "10px 12px 10px 38px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "0.875rem",
                      color: "#0f172a",
                    }}
                    value={formData.staff}
                    onChange={(e) => setFormData({ ...formData, staff: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#475569", textTransform: "uppercase" }}>
                    Room / Lab
                  </label>
                  <div style={{ position: "relative" }}>
                    <MapPin size={16} style={{ position: "absolute", left: "12px", top: "12px", color: "#64748b" }} />
                    <input
                      type="text"
                      style={{
                        width: "100%",
                        padding: "10px 12px 10px 38px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        fontSize: "0.85rem",
                        color: "#0f172a",
                      }}
                      value={formData.room}
                      onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#475569", textTransform: "uppercase" }}>
                    Time Slot
                  </label>
                  <div style={{ position: "relative" }}>
                    <Calendar size={16} style={{ position: "absolute", left: "12px", top: "12px", color: "#64748b" }} />
                    <input
                      type="text"
                      style={{
                        width: "100%",
                        padding: "10px 12px 10px 38px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        fontSize: "0.85rem",
                        color: "#0f172a",
                      }}
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
                <button
                  type="button"
                  style={{
                    padding: "9px 16px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    backgroundColor: "#ffffff",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    color: "#475569",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "9px 20px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#00522e",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    color: "#ffffff",
                    cursor: "pointer",
                    boxShadow: "0 2px 6px rgba(0,82,46,0.2)",
                  }}
                >
                  Confirm Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
