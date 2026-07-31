"use client";

import React, { useState } from "react";
import { Search, Pin, X, Calendar, User } from "lucide-react";
import styles from "../student.module.css";
import { STUDENT_ANNOUNCEMENTS, Announcement } from "../mockData";

export default function StudentAnnouncementsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  const categories = ["ALL", "University", "Department", "Course", "Placements", "Events"];

  const filteredAnnouncements = STUDENT_ANNOUNCEMENTS.filter(a => {
    const matchesCat = selectedCategory === "ALL" || a.category === selectedCategory;
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          a.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className={styles.pageContainer}>
      {/* Admin Clean Banner */}
      <div className={styles.welcomeBanner}>
        <div>
          <h1 className={styles.welcomeTitle}>University Announcements & Notices</h1>
          <p className={styles.welcomeSubtitle}>
            Official institutional circulars, department updates, placement drives, and campus event notices.
          </p>
        </div>
        <div className={styles.bannerMeta}>
          <div className={styles.metaPill}>
            {STUDENT_ANNOUNCEMENTS.length} Circulars
          </div>
        </div>
      </div>

      {/* Category Tabs & Search Bar */}
      <div className={styles.card}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`${styles.btnSecondary} ${selectedCategory === cat ? styles.btnPrimary : ""}`}
              style={{
                padding: "6px 14px",
                fontSize: "0.8rem",
                backgroundColor: selectedCategory === cat ? "#00522E" : "#ffffff",
                color: selectedCategory === cat ? "#ffffff" : "#334155"
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ position: "relative" }}>
          <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
          <input
            type="text"
            placeholder="Search announcements by keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.filterInput}
            style={{ paddingLeft: 36 }}
          />
        </div>
      </div>

      {/* Announcements List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {filteredAnnouncements.map((ann) => (
          <div
            key={ann.id}
            onClick={() => setSelectedAnnouncement(ann)}
            className={styles.card}
            style={{
              cursor: "pointer",
              borderLeft: ann.isPinned ? "4px solid #00522E" : "1px solid #e2e8f0",
              gap: "8px"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#00522E", textTransform: "uppercase", backgroundColor: "#e9f2ee", padding: "2px 8px", borderRadius: "4px" }}>
                  {ann.category}
                </span>
                {ann.isPinned && (
                  <span style={{ fontSize: "0.7rem", color: "#00522E", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 3 }}>
                    <Pin size={11} /> Pinned Notice
                  </span>
                )}
              </div>
              <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{ann.date}</span>
            </div>

            <h3 style={{ fontSize: "0.98rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>
              {ann.title}
            </h3>

            <p style={{ fontSize: "0.82rem", color: "#475569", margin: 0, lineHeight: 1.5 }}>
              {ann.content}
            </p>

            <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>
              Published by: {ann.author}
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Modal */}
      {selectedAnnouncement && (
        <div className={styles.modalOverlay} onClick={() => setSelectedAnnouncement(null)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#00522E" }}>{selectedAnnouncement.category}</span>
                <h3 className={styles.modalTitle}>{selectedAnnouncement.title}</h3>
              </div>
              <button className={styles.modalCloseBtn} onClick={() => setSelectedAnnouncement(null)}>
                <X size={18} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <div style={{ fontSize: "0.78rem", color: "#64748b", display: "flex", gap: "14px" }}>
                <span><User size={14} /> {selectedAnnouncement.author}</span>
                <span><Calendar size={14} /> {selectedAnnouncement.date}</span>
              </div>

              <p style={{ fontSize: "0.88rem", color: "#1e293b", lineHeight: 1.6, margin: 0 }}>
                {selectedAnnouncement.content}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
