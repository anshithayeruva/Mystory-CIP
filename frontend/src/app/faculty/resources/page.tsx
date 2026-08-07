"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Search, 
  UploadCloud, 
  Eye, 
  Edit2, 
  Trash2, 
  Bookmark,
  FileText,
  Filter,
  CheckCircle2,
  Download
} from "lucide-react";
import styles from "./resources.module.css";
import { FacultyService } from "@/services/faculty.service";

interface ResourceItem {
  id: string | number;
  course: string;
  title: string;
  format: string;
  uploadedAt: string;
  downloads: number;
  visibleTo: string;
  category?: string;
  fileUrl?: string;
}

const MOCK_RESOURCES: ResourceItem[] = [
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
  const [resources, setResources] = useState<ResourceItem[]>(MOCK_RESOURCES);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formCourse, setFormCourse] = useState("CSE 301");
  const [formCategory, setFormCategory] = useState("Lecture Notes");
  const [formTitle, setFormTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    async function loadResources() {
      try {
        const res = await FacultyService.getResources();
        if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
          setResources(res.data);
        }
      } catch (err) {
        console.warn("Resources API warning, using local state:", err);
      }
    }
    loadResources();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (!formTitle) {
        setFormTitle(file.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      triggerToast("Please enter a resource title.");
      return;
    }

    const formData = new FormData();
    formData.append("courseCode", formCourse);
    formData.append("category", formCategory);
    formData.append("title", formTitle);
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    let newRes: ResourceItem = {
      id: String(Date.now()),
      course: formCourse,
      title: formTitle,
      format: selectedFile ? `${selectedFile.name.split('.').pop()?.toUpperCase()} (${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB)` : "PDF (6.5 MB)",
      uploadedAt: "Just Now",
      downloads: 0,
      visibleTo: "All Sections",
      category: formCategory
    };

    try {
      const res = await FacultyService.uploadResource(formData);
      if (res && res.data) {
        newRes = res.data;
      }
    } catch (err) {
      console.warn("Upload resource API warning:", err);
    }

    setResources([newRes, ...resources]);
    setFormTitle("");
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    triggerToast(`Resource "${newRes.title}" uploaded successfully!`);
  };

  const handleDelete = async (id: string | number) => {
    try {
      await FacultyService.deleteResource(String(id));
    } catch (err) {
      console.warn("Delete resource API warning:", err);
    }
    setResources(prev => prev.filter(r => r.id !== id));
    triggerToast("Resource deleted successfully.");
  };

  const handlePreview = (resource: ResourceItem) => {
    if (resource.fileUrl) {
      window.open(`http://localhost:5000${resource.fileUrl}`, '_blank');
    } else {
      triggerToast(`Opening preview for "${resource.title}"`);
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* Toast Alert */}
      {toastMessage && (
        <div style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          backgroundColor: "#00522E",
          color: "#ffffff",
          padding: "12px 20px",
          borderRadius: "10px",
          boxShadow: "0 10px 25px -5px rgba(0, 82, 46, 0.3)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontWeight: 600,
          fontSize: "0.88rem",
          zIndex: 1000
        }}>
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}
      
      {/* Upload Section */}
      <div className={styles.uploadCard}>
        <div className={styles.uploadHeader}>
          <UploadCloud color="#10633b" size={24} />
          <h2 className={styles.uploadTitle}>Upload New Material</h2>
        </div>
        
        <form onSubmit={handleUpload} className={styles.uploadBody}>
          <div className={styles.uploadFormGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Course Code</label>
              <select 
                className={styles.formSelect}
                value={formCourse}
                onChange={(e) => setFormCourse(e.target.value)}
              >
                <option value="CSE 301">CSE 301 - Data Structures</option>
                <option value="CSE 302">CSE 302 - Database Management</option>
                <option value="CSE 303">CSE 303 - Operating Systems</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Category</label>
              <select 
                className={styles.formSelect}
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
              >
                <option value="Lecture Notes">Lecture Notes</option>
                <option value="Presentation Deck">Presentation Deck</option>
                <option value="Lab Manual">Lab Manual</option>
                <option value="Exam Papers">Previous Exam Papers</option>
                <option value="Reference Guide">Reference Guide</option>
              </select>
            </div>
            <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
              <label className={styles.formLabel}>Resource Title</label>
              <input 
                type="text" 
                className={styles.formInput} 
                placeholder="e.g. Graph Algorithms Complete Lecture Notes..." 
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
              />
            </div>
          </div>

          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: "none" }} 
            onChange={handleFileChange}
            accept=".pdf,.pptx,.ppt,.docx,.doc,.png,.jpg,.jpeg,.zip"
          />

          <div 
            className={styles.dragDropZone} 
            onClick={() => fileInputRef.current?.click()}
            style={{ cursor: "pointer", border: selectedFile ? "2px dashed #00522E" : undefined, backgroundColor: selectedFile ? "#f0fdf4" : undefined }}
          >
            <FileText size={32} color={selectedFile ? "#00522E" : "#94a3b8"} />
            <p className={styles.dragDropText}>
              {selectedFile ? `Selected: ${selectedFile.name}` : "Drag and drop your file here, or click to browse"}
            </p>
            <p className={styles.dragDropSubtext}>
              {selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB` : "Supported formats: PDF, PPTX, DOCX (Max 50MB)"}
            </p>
          </div>

          <button type="submit" className={styles.submitButton}>
            <UploadCloud size={16} />
            Upload Resource
          </button>
        </form>
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
          {resources.filter(r => r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.course.toLowerCase().includes(searchQuery.toLowerCase())).map(resource => (
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
                <button 
                  onClick={() => handlePreview(resource)}
                  className={`${styles.actionBtn} ${styles.previewBtn}`}
                >
                  {resource.fileUrl ? <Download size={14} /> : <Eye size={14} />} {resource.fileUrl ? "Download" : "Preview"}
                </button>
                <button className={`${styles.actionBtn} ${styles.editBtn}`}>
                  <Edit2 size={14} /> Edit
                </button>
                <button 
                  onClick={() => handleDelete(resource.id)}
                  className={`${styles.actionBtn} ${styles.deleteBtn}`}
                >
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
