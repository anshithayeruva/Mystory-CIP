"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, 
  Download, 
  Eye, 
  FileText, 
  Filter, 
  BookOpen, 
  Bookmark,
  CheckCircle2
} from "lucide-react";
import { studentDashboardService } from "@/services/studentDashboard.service";

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

export default function StudentResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    async function loadSharedResources() {
      try {
        const data = await studentDashboardService.getCourseResources();
        if (Array.isArray(data)) {
          setResources(data);
        }
      } catch (err) {
        console.warn("Failed to fetch shared faculty resources:", err);
      } finally {
        setLoading(false);
      }
    }
    loadSharedResources();
  }, []);

  const handleDownload = (resource: ResourceItem) => {
    if (resource.fileUrl) {
      window.open(`http://localhost:5000${resource.fileUrl}`, "_blank");
    } else {
      triggerToast(`Downloading material: "${resource.title}"`);
    }
  };

  const filteredResources = resources.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = selectedCourse === "All" || r.course === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  const courseCodes = ["All", ...Array.from(new Set(resources.map(r => r.course)))];

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
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

      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <BookOpen color="#00522E" size={28} />
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>Course Learning Resources</h1>
        </div>
        <p style={{ color: "#64748b", margin: 0 }}>Access lecture notes, presentation decks, and reference materials uploaded by your course faculty.</p>
      </div>

      {/* Filter & Search Bar */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div style={{ position: "relative", flex: 1, minWidth: "280px" }}>
          <Search size={18} color="#94a3b8" style={{ position: "absolute", left: "14px", top: "12px" }} />
          <input 
            type="text" 
            placeholder="Search by topic, keyword, or course..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 14px 10px 42px",
              borderRadius: "10px",
              border: "1px solid #cbd5e1",
              fontSize: "0.9rem",
              outline: "none"
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Filter size={16} color="#64748b" />
          <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#475569" }}>Course Filter:</span>
          {courseCodes.map(code => (
            <button
              key={code}
              onClick={() => setSelectedCourse(code)}
              style={{
                padding: "6px 14px",
                borderRadius: "20px",
                border: "none",
                backgroundColor: selectedCourse === code ? "#00522E" : "#f1f5f9",
                color: selectedCourse === code ? "#ffffff" : "#475569",
                fontWeight: 600,
                fontSize: "0.82rem",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              {code}
            </button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      {loading ? (
        <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>Loading course resources...</div>
      ) : filteredResources.length === 0 ? (
        <div style={{ padding: "40px", textAlign: "center", backgroundColor: "#f8fafc", borderRadius: "12px", border: "1px dashed #cbd5e1" }}>
          <FileText size={40} color="#94a3b8" style={{ marginBottom: "12px" }} />
          <h3 style={{ margin: "0 0 4px 0", color: "#334155" }}>No matching resources found</h3>
          <p style={{ margin: 0, color: "#64748b", fontSize: "0.9rem" }}>Try adjusting your search filters or course selection.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
          {filteredResources.map((resource) => (
            <div key={resource.id} style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              padding: "20px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
              display: "flex",
              flexDirection: "column",
              justify: "space-between"
            }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{
                    backgroundColor: "#e6f4ea",
                    color: "#00522E",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    padding: "4px 10px",
                    borderRadius: "6px"
                  }}>
                    {resource.course}
                  </span>
                  <Bookmark size={16} color="#cbd5e1" style={{ cursor: "pointer" }} />
                </div>

                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", margin: "0 0 8px 0", lineHeight: "1.4" }}>
                  {resource.title}
                </h3>
                
                <p style={{ fontSize: "0.82rem", color: "#64748b", margin: "0 0 16px 0" }}>
                  Category: {resource.category || "Lecture Material"} • {resource.uploadedAt}
                </p>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "#475569", marginBottom: "14px", borderTop: "1px solid #f1f5f9", paddingTop: "12px" }}>
                  <span>Format: <strong>{resource.format}</strong></span>
                  <span>Downloads: <strong>{resource.downloads}</strong></span>
                </div>

                <button 
                  onClick={() => handleDownload(resource)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "10px",
                    backgroundColor: "#00522E",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: 600,
                    fontSize: "0.88rem",
                    cursor: "pointer"
                  }}
                >
                  {resource.fileUrl ? <Download size={16} /> : <Eye size={16} />}
                  {resource.fileUrl ? "Download File" : "Preview Material"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
