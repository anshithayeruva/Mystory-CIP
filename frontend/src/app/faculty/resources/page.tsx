"use client";

import React, { useState } from "react";
import { 
  Search, 
  UploadCloud, 
  Eye, 
  Edit2, 
  Trash2, 
  Bookmark,
  FileText,
  Filter
} from "lucide-react";
import styles from "./resources.module.css";

const MOCK_RESOURCES = [
  {
    id: 1,
    course: "CSE 301",
    title: "Graph Algorithms Complete Lecture Notes (Ch 1-6)",
    format: "PDF (8.4 MB)",
    uploadedAt: "July 25, 2026",
    downloads: 142,
    visibleTo: "CSE-A, CSE-B"
  },
  {
    id: 2,
    course: "CSE 302",
    title: "SQL Query Tuning & Indexing Presentation Deck",
    format: "PPTX (14.2 MB)",
    uploadedAt: "July 22, 2026",
    downloads: 98,
    visibleTo: "CSE-C"
  },
  {
    id: 3,
    course: "CSE 303",
    title: "Linux Kernel Process Management Reference Guide",
    format: "PDF (22.1 MB)",
    uploadedAt: "July 18, 2026",
    downloads: 210,
    visibleTo: "All Sections"
  },
  {
    id: 4,
    course: "CSE 304",
    title: "Computer Networks Lab Manual - Wireshark Experiments",
    format: "PDF (5.1 MB)",
    uploadedAt: "July 15, 2026",
    downloads: 185,
    visibleTo: "CSE-A, CSE-C"
  },
  {
    id: 5,
    course: "CSE 301",
    title: "Previous Year Mid-Semester Question Papers (2023-2025)",
    format: "PDF (12.0 MB)",
    uploadedAt: "July 10, 2026",
    downloads: 320,
    visibleTo: "All Sections"
  }
];

export default function FacultyResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className={styles.pageContainer}>
      
      {/* Upload Section */}
      <div className={styles.uploadCard}>
        <div className={styles.uploadHeader}>
          <UploadCloud color="#10633b" size={24} />
          <h2 className={styles.uploadTitle}>Upload New Material</h2>
        </div>
        
        <div className={styles.uploadBody}>
          <div className={styles.uploadFormGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Course Code</label>
              <select className={styles.formSelect}>
                <option value="">Select Course</option>
                <option value="CSE 301">CSE 301 - Data Structures</option>
                <option value="CSE 302">CSE 302 - Database Management</option>
                <option value="CSE 303">CSE 303 - Operating Systems</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Category</label>
              <select className={styles.formSelect}>
                <option value="Lecture Notes">Lecture Notes</option>
                <option value="Presentation Deck">Presentation Deck</option>
                <option value="Lab Manual">Lab Manual</option>
                <option value="Exam Papers">Previous Exam Papers</option>
                <option value="Reference Guide">Reference Guide</option>
              </select>
            </div>
            <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
              <label className={styles.formLabel}>Resource Title</label>
              <input type="text" className={styles.formInput} placeholder="e.g. Graph Algorithms Complete Lecture Notes..." />
            </div>
          </div>

          <div className={styles.dragDropZone}>
            <FileText size={32} color="#94a3b8" />
            <p className={styles.dragDropText}>Drag and drop your file here, or click to browse</p>
            <p className={styles.dragDropSubtext}>Supported formats: PDF, PPTX, DOCX (Max 50MB)</p>
          </div>

          <button className={styles.submitButton}>
            <UploadCloud size={16} />
            Upload Resource
          </button>
        </div>
      </div>

      {/* Library Section */}
      <div>
        <div className={styles.libraryHeader}>
          <h2 className={styles.libraryTitle}>Your Uploaded Resources</h2>
          <div style={{ display: "flex", gap: "12px", width: "100%", maxWidth: "500px" }}>
            <div className={styles.searchBar}>
              <Search size={16} color="#94a3b8" />
              <input 
                type="text" 
                className={styles.searchInput} 
                placeholder="Search resource name, topic, or course code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", backgroundColor: "#fff", border: "1px solid #cbd5e1", borderRadius: "8px", cursor: "pointer", fontSize: "0.875rem", fontWeight: 500, color: "var(--text-main)" }}>
              <Filter size={16} /> All Categories
            </button>
          </div>
        </div>

        <div className={styles.resourcesGrid}>
          {MOCK_RESOURCES.filter(r => r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.course.toLowerCase().includes(searchQuery.toLowerCase())).map(resource => (
            <div key={resource.id} className={styles.resourceCard}>
              <div className={styles.cardTop}>
                <span className={styles.courseTag}>{resource.course}</span>
                <Bookmark size={16} color="#cbd5e1" style={{ cursor: "pointer" }} />
              </div>
              
              <div>
                <h3 className={styles.cardTitle}>{resource.title}</h3>
                <p className={styles.cardSubtitle}>Visible to: {resource.visibleTo} • Uploaded: {resource.uploadedAt}</p>
              </div>

              <div className={styles.cardMeta}>
                <span>Format: <strong>{resource.format}</strong></span>
                <span>Downloads: <strong>{resource.downloads}</strong></span>
              </div>

              <div className={styles.cardActions}>
                <button className={`${styles.actionBtn} ${styles.previewBtn}`}>
                  <Eye size={14} /> Preview
                </button>
                <button className={`${styles.actionBtn} ${styles.editBtn}`}>
                  <Edit2 size={14} /> Edit
                </button>
                <button className={`${styles.actionBtn} ${styles.deleteBtn}`}>
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
