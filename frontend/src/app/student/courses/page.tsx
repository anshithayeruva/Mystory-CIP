"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, ArrowRight, Search } from "lucide-react";
import styles from "../student.module.css";
import { STUDENT_COURSES } from "../mockData";

export default function StudentCoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = STUDENT_COURSES.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.faculty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.pageContainer}>
      {/* Admin-Style Clean Greeting Card */}
      <div className={styles.welcomeBanner}>
        <div>
          <h1 className={styles.welcomeTitle}>Course Enrolment & Syllabus</h1>
          <p className={styles.welcomeSubtitle}>
            Semester 6 (Spring 2026) • 6 Active Enrolled Courses • 24 Academic Credits
          </p>
        </div>
        <div className={styles.bannerMeta}>
          <div className={styles.metaPill}>
            Total 24 Credits
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
        {filteredCourses.map((course) => (
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
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", padding: "12px 14px", backgroundColor: "#f8fafc", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                <div>
                  <div style={{ fontSize: "0.68rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase" }}>Attendance</div>
                  <div style={{ fontSize: "1rem", fontWeight: 700, color: "#00522E" }}>{course.attendance}%</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.68rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase" }}>Grade</div>
                  <div style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a" }}>{course.currentGrade}</div>
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
