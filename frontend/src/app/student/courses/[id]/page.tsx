"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  User, 
  Mail, 
  Clock, 
  CheckCircle2, 
  FileText, 
  ChevronDown, 
  ChevronRight,
  Download,
  Send,
  ArrowLeft
} from "lucide-react";
import styles from "../../student.module.css";
import { STUDENT_COURSES, LEARNING_RESOURCES } from "../../mockData";

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params?.id as string;
  const course = STUDENT_COURSES.find(c => c.id === courseId) || STUDENT_COURSES[0];

  const [activeTab, setActiveTab] = useState<"overview" | "curriculum" | "resources" | "discussions">("overview");
  const [expandedModule, setExpandedModule] = useState<number | null>(0);
  const [doubtText, setDoubtText] = useState("");
  const [doubts, setDoubts] = useState([
    {
      id: "d-1",
      student: "Nitya Nara",
      question: "Is Dijkstra's algorithm applicable for graphs with negative edge weights if we add a constant offset?",
      time: "2 days ago",
      answer: "No, adding a constant offset changes the shortest paths because paths with more edges get penalized more. You must use Bellman-Ford for negative edge weights.",
      faculty: "Dr. Aris Thorne"
    }
  ]);

  const handlePostDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtText.trim()) return;
    setDoubts([
      {
        id: `d-${Date.now()}`,
        student: "Nitya Nara",
        question: doubtText,
        time: "Just now",
        answer: "Thank you for asking! Your question has been forwarded to the faculty.",
        faculty: course.faculty
      },
      ...doubts
    ]);
    setDoubtText("");
  };

  const modules = [
    {
      title: "Module 1: Advanced Graph Algorithms & Flow Networks",
      lessons: [
        "Lesson 1: Dijkstra & A* Pathfinding Algorithms",
        "Lesson 2: Bellman-Ford & Floyd-Warshall All-Pairs Shortest Path",
        "Lesson 3: Ford-Fulkerson & Edmonds-Karp Max-Flow Algorithm"
      ]
    },
    {
      title: "Module 2: Dynamic Programming & Matrix Operations",
      lessons: [
        "Lesson 1: 0/1 Knapsack & Subset Sum Problems",
        "Lesson 2: Matrix Chain Multiplication & Optimal Binary Search Trees",
        "Lesson 3: Longest Common Subsequence & Edit Distance"
      ]
    },
    {
      title: "Module 3: Advanced Tree Structures & Range Queries",
      lessons: [
        "Lesson 1: Red-Black Trees & AVL Self-Balancing Trees",
        "Lesson 2: Segment Trees & Fenwick Binary Indexed Trees",
        "Lesson 3: Disjoint Set Union (DSU) with Path Compression"
      ]
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <Link href="/student/courses" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.82rem", fontWeight: 700, color: "#00522E", textDecoration: "none" }}>
        <ArrowLeft size={14} /> Back to My Courses
      </Link>

      {/* Admin Clean Banner */}
      <div className={styles.welcomeBanner}>
        <div>
          <span className={styles.metaPill}>
            {course.code}
          </span>
          <h1 className={styles.welcomeTitle} style={{ marginTop: 8 }}>{course.name}</h1>
          <p className={styles.welcomeSubtitle}>
            Instructor: {course.faculty} • {course.credits} Credits • {course.attendance}% Attendance
          </p>
        </div>
      </div>

      {/* Tab Bar */}
      <div className={styles.tabsContainer}>
        <button className={`${styles.tabBtn} ${activeTab === "overview" ? styles.tabBtnActive : ""}`} onClick={() => setActiveTab("overview")}>
          Course Overview
        </button>
        <button className={`${styles.tabBtn} ${activeTab === "curriculum" ? styles.tabBtnActive : ""}`} onClick={() => setActiveTab("curriculum")}>
          Modules & Curriculum
        </button>
        <button className={`${styles.tabBtn} ${activeTab === "resources" ? styles.tabBtnActive : ""}`} onClick={() => setActiveTab("resources")}>
          Learning Resources
        </button>
        <button className={`${styles.tabBtn} ${activeTab === "discussions" ? styles.tabBtnActive : ""}`} onClick={() => setActiveTab("discussions")}>
          Doubts & Discussion Board
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className={styles.mainGrid}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Course Description</h2>
              <p style={{ fontSize: "0.88rem", color: "#334155", lineHeight: 1.6, margin: 0 }}>
                {course.description}
              </p>
            </div>

            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Course Learning Outcomes (CLOs)</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {course.outcomes.map((outcome, idx) => (
                  <div key={idx} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <CheckCircle2 size={16} color="#00522E" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: "0.85rem", color: "#1e293b", fontWeight: 500 }}>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Faculty Details Card */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Faculty Contact Information</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <User size={16} color="#00522E" />
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f172a" }}>{course.faculty}</div>
                    <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Course Lead & Professor</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Mail size={16} color="#00522E" />
                  <span style={{ fontSize: "0.82rem", color: "#334155" }}>{course.facultyEmail}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Clock size={16} color="#00522E" />
                  <span style={{ fontSize: "0.82rem", color: "#334155" }}>Office Hours: {course.officeHours}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CURRICULUM */}
      {activeTab === "curriculum" && (
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Course Curriculum & Modules</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {modules.map((mod, idx) => (
              <div key={idx} style={{ border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden" }}>
                <div
                  onClick={() => setExpandedModule(expandedModule === idx ? null : idx)}
                  style={{
                    padding: "14px 16px",
                    backgroundColor: "#f8fafc",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    color: "#0f172a"
                  }}
                >
                  <span>{mod.title}</span>
                  {expandedModule === idx ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </div>

                {expandedModule === idx && (
                  <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: "8px", backgroundColor: "#ffffff" }}>
                    {mod.lessons.map((les, lIdx) => (
                      <div key={lIdx} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.82rem", color: "#334155", padding: "8px 12px", backgroundColor: "#f1f5f9", borderRadius: "6px" }}>
                        <FileText size={14} color="#00522E" />
                        <span>{les}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: RESOURCES */}
      {activeTab === "resources" && (
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Course Learning Materials</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Resource Title</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Size</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {LEARNING_RESOURCES.map((res) => (
                  <tr key={res.id}>
                    <td style={{ fontWeight: 600, color: "#0f172a" }}>{res.title}</td>
                    <td><span style={{ fontSize: "0.7rem", padding: "2px 6px", backgroundColor: "#e2e8f0", borderRadius: "4px", fontWeight: 700 }}>{res.fileType}</span></td>
                    <td>{res.category}</td>
                    <td>{res.fileSize}</td>
                    <td>
                      <button className={styles.btnSecondary} style={{ padding: "4px 10px", fontSize: "0.75rem" }}>
                        <Download size={14} /> Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: DISCUSSIONS */}
      {activeTab === "discussions" && (
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Ask a Doubt / Discussion Board</h2>

          <form onSubmit={handlePostDoubt} style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
            <input
              type="text"
              placeholder="Ask Dr. Thorne a question about this course..."
              value={doubtText}
              onChange={(e) => setDoubtText(e.target.value)}
              className={styles.filterInput}
              style={{ flex: 1 }}
            />
            <button type="submit" className={styles.btnPrimary}>
              <Send size={14} /> Submit Question
            </button>
          </form>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {doubts.map((d) => (
              <div key={d.id} style={{ padding: "14px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "#64748b", marginBottom: "4px" }}>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>{d.student}</span>
                  <span>{d.time}</span>
                </div>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#0f172a", marginBottom: "8px" }}>
                  Q: {d.question}
                </div>
                <div style={{ padding: "10px", backgroundColor: "#e9f2ee", borderRadius: "6px", borderLeft: "3px solid #00522E" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#00522E", marginBottom: "2px" }}>
                    Faculty Answer ({d.faculty}):
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "#1e293b" }}>
                    {d.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
