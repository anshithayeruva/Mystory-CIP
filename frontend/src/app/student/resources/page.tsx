"use client";

import React, { useState } from "react";
import { Search, Download, Bookmark, Eye } from "lucide-react";
import styles from "../student.module.css";
import { LEARNING_RESOURCES, LearningResource } from "../mockData";

export default function StudentResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [resources, setResources] = useState<LearningResource[]>(LEARNING_RESOURCES);

  const toggleBookmark = (id: string) => {
    setResources(resources.map(r => r.id === id ? { ...r, isBookmarked: !r.isBookmarked } : r));
  };

  const filteredResources = resources.filter(res => {
    const matchesCategory = categoryFilter === "ALL" || res.category === categoryFilter;
    const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          res.courseCode.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={styles.pageContainer}>
      {/* Admin Clean Banner */}
      <div className={styles.welcomeBanner}>
        <div>
          <h1 className={styles.welcomeTitle}>Digital Learning Resources Library</h1>
          <p className={styles.welcomeSubtitle}>
            Access course lecture slides, notes, reference textbooks, lab manuals, and previous year exam papers.
          </p>
        </div>
        <div className={styles.bannerMeta}>
          <div className={styles.metaPill}>
            {resources.length} Materials
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className={styles.filterBar}>
        <div style={{ position: "relative", flex: 1 }}>
          <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
          <input
            type="text"
            placeholder="Search resource name, topic, or course code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.filterInput}
            style={{ paddingLeft: 36 }}
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="ALL">All Categories</option>
          <option value="Slides">Slides</option>
          <option value="Notes">Notes</option>
          <option value="Books">Books</option>
          <option value="Manuals">Manuals</option>
          <option value="Past Papers">Past Papers</option>
        </select>
      </div>

      {/* Resource Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
        {filteredResources.map((res) => (
          <div key={res.id} className={styles.card} style={{ justifyContent: "space-between", gap: "12px" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#00522E" }}>{res.courseCode}</span>
                <button
                  onClick={() => toggleBookmark(res.id)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: res.isBookmarked ? "#00522E" : "#cbd5e1" }}
                  title="Bookmark Resource"
                >
                  <Bookmark size={16} fill={res.isBookmarked ? "#00522E" : "none"} />
                </button>
              </div>

              <h3 style={{ fontSize: "0.92rem", fontWeight: 700, color: "#0f172a", margin: "0 0 4px 0", lineHeight: 1.4 }}>
                {res.title}
              </h3>

              <div style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "10px" }}>
                Faculty: {res.faculty} • Uploaded: {res.uploadDate}
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#64748b", marginBottom: "10px", borderTop: "1px solid #f1f5f9", paddingTop: "8px" }}>
                <span>Format: <strong>{res.fileType}</strong> ({res.fileSize})</span>
                <span>Downloads: <strong>{res.downloadCount}</strong></span>
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <button className={styles.btnSecondary} style={{ flex: 1, justifyContent: "center", fontSize: "0.75rem", padding: "4px 8px" }}>
                  <Eye size={12} /> Preview
                </button>
                <button className={styles.btnPrimary} style={{ flex: 1, justifyContent: "center", fontSize: "0.75rem", padding: "4px 8px" }}>
                  <Download size={12} /> Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
