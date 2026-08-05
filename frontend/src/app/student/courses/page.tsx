"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { User, ArrowRight, Search, AlertCircle } from "lucide-react";
import styles from "../student.module.css";
import { studentDashboardService } from "@/services/studentDashboard.service";

export default function StudentCoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Using the same mocked studentId as the dashboard for now
  const studentId = "6a6a3135b6f279c37d3c4bd4";

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await studentDashboardService.getCourses(studentId);
        if (data) {
          setCourses(data);
        } else {
          setError("Failed to fetch courses.");
        }
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [studentId]);

  const filteredCourses = courses.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.faculty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCredits = courses.reduce((sum, c) => sum + (c.credits || 0), 0);

  if (loading) {
    return (
      <div className={styles.pageContainer} style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-700"></div>
          <p style={{ color: "#64748b", fontWeight: 600 }}>Loading Courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.pageContainer} style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
        <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", padding: "24px", borderRadius: "12px", maxWidth: "500px", textAlign: "center" }}>
          <AlertCircle size={32} color="#dc2626" style={{ margin: "0 auto 12px" }} />
          <h3 style={{ color: "#991b1b", fontSize: "1.2rem", fontWeight: 700, marginBottom: "8px" }}>Connection Error</h3>
          <p style={{ color: "#7f1d1d", fontSize: "0.9rem" }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      {/* Admin-Style Clean Greeting Card */}
      <div className={styles.welcomeBanner}>
        <div>
          <h1 className={styles.welcomeTitle}>Course Enrolment & Syllabus</h1>
          <p className={styles.welcomeSubtitle}>
            Semester 6 (Spring 2026) • {courses.length} Active Enrolled Courses • {totalCredits} Academic Credits
          </p>
        </div>
        <div className={styles.bannerMeta}>
          <div className={styles.metaPill}>
            Total {totalCredits} Credits
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className={styles.filterBar}>
        <div style={{ position: "relative", flex: 1 }}>
          <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
          <input
            type="text"
            placeholder="Search course by name, code, or faculty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.filterInput}
            style={{ paddingLeft: 36 }}
          />
        </div>
      </div>

      {/* Course Cards Grid - Equal Card Height & Uniform Bottom Pinned Buttons */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
        {filteredCourses.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", gridColumn: "1 / -1", color: "#64748b" }}>
            No courses found matching your search.
          </div>
        ) : filteredCourses.map((course) => (
          <div
            key={course.id}
            className={styles.card}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              padding: "20px",
              gap: "16px"
            }}
          >
            {/* Card Header: Code & Credits */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#00522E", backgroundColor: "#e9f2ee", padding: "3px 10px", borderRadius: "4px", border: "1px solid #c9e0d3" }}>
                {course.code}
              </span>
              <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>
                {course.credits} Credits
              </span>
            </div>

            {/* Card Content: Title & Faculty */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", margin: "0 0 6px 0", minHeight: "2.8rem", display: "flex", alignItems: "center", lineHeight: 1.35 }}>
                  {course.name}
                </h3>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", color: "#64748b" }}>
                  <User size={14} /> Faculty: {course.faculty}
                </div>
              </div>

              {/* Course Stats Row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", padding: "12px 14px", backgroundColor: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                <div>
                  <div style={{ fontSize: "0.68rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.03em" }}>Attendance</div>
                  <div style={{ fontSize: "0.98rem", fontWeight: 700, color: "#00522E", marginTop: "2px" }}>{course.attendance}%</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.68rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.03em" }}>Course Progress</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "2px" }}>
                    <div style={{ fontSize: "0.98rem", fontWeight: 700, color: "#0f172a" }}>{course.progress}%</div>
                    <div style={{ width: "100%", height: "4px", backgroundColor: "#e2e8f0", borderRadius: "2px", overflow: "hidden" }}>
                      <div style={{ width: `${course.progress}%`, height: "100%", backgroundColor: "#00522E", borderRadius: "2px" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Uniform Action Button Pinned to Card Bottom */}
            <Link
              href={`/student/courses/${course.id}`}
              className={styles.btnPrimary}
              style={{ justifyContent: "center", marginTop: "auto", width: "100%" }}
            >
              View Course Details <ArrowRight size={14} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
