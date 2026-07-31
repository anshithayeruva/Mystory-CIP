"use client";

import React, { useState, useMemo } from "react";
import { 
  Search, 
  Filter
} from "lucide-react";
import styles from "@/modules/faculty/styles/faculty-students.module.css";

export interface StudentItem {
  id: string;
  initials: string;
  name: string;
  rollNo: string;
  subject: string;
  section: string;
  attendance: string;
  assessment: string;
}

const MOCK_STUDENTS: StudentItem[] = [
  {
    id: "1",
    initials: "RS",
    name: "Rahul Sharma",
    rollNo: "CSE21015",
    subject: "Data Structures",
    section: "CSE-A",
    attendance: "95%",
    assessment: "18/20 (90%)",
  },
  {
    id: "2",
    initials: "PS",
    name: "Priya Singh",
    rollNo: "CSE21022",
    subject: "Data Structures",
    section: "CSE-A",
    attendance: "88%",
    assessment: "16/20 (80%)",
  },
  {
    id: "3",
    initials: "AR",
    name: "Akash Reddy",
    rollNo: "CSE21031",
    subject: "DBMS",
    section: "CSE-B",
    attendance: "72%",
    assessment: "14/20 (70%)",
  }
];

export default function FacultyStudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedClass, setSelectedClass] = useState("All");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtered list
  const filteredStudents = useMemo(() => {
    return MOCK_STUDENTS.filter((item) => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubject = selectedSubject === "All" || item.subject === selectedSubject;
      const matchesClass = selectedClass === "All" || item.section === selectedClass;
      return matchesSearch && matchesSubject && matchesClass;
    });
  }, [searchTerm, selectedSubject, selectedClass]);

  // Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage) || 1;
  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredStudents.slice(start, start + itemsPerPage);
  }, [filteredStudents, currentPage]);

  return (
    <div className={styles.container}>
      {/* Header Area */}
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>Student Directory</h1>
          <p className={styles.subtitle}>Directory of all enrolled students in your classes.</p>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} size={16} />
            <input 
              type="text" 
              className={styles.searchInput} 
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={styles.filterPopover}>
            <button 
              className={styles.filterBtn}
              onClick={() => setShowFilterMenu(!showFilterMenu)}
            >
              <Filter size={16} />
              Filter
            </button>

            {showFilterMenu && (
              <div className={styles.filterMenu}>
                <div className={styles.filterHeaderRow}>
                  <span className={styles.filterMenuTitle}>Filter Options</span>
                  <button 
                    className={styles.resetFilterBtn}
                    onClick={() => {
                      setSelectedSubject("All");
                      setSelectedClass("All");
                      setShowFilterMenu(false);
                    }}
                  >
                    Reset All
                  </button>
                </div>

                <div className={styles.filterGroup}>
                  <label>Subject</label>
                  <select 
                    className={styles.filterSelect}
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                  >
                    <option value="All">All Subjects</option>
                    <option value="Data Structures">Data Structures</option>
                    <option value="DBMS">DBMS</option>
                  </select>
                </div>

                <div className={styles.filterGroup}>
                  <label>Class/Section</label>
                  <select 
                    className={styles.filterSelect}
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                  >
                    <option value="All">All Classes</option>
                    <option value="CSE-A">CSE-A</option>
                    <option value="CSE-B">CSE-B</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className={styles.tableCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>STUDENT NAME & ROLL NO</th>
                <th>SUBJECT</th>
                <th>SECTION</th>
                <th>ATTENDANCE</th>
                <th>LATEST ASSESSMENT</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                    No students found matching your search criteria.
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className={styles.subjectProfile}>
                        <div className={styles.avatarCircle}>{item.initials}</div>
                        <div className={styles.subjectDetails}>
                          <span className={styles.subjectTitle}>{item.name}</span>
                          <span className={styles.subjectSubtitle}>{item.rollNo}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className={styles.badgePill}>
                        {item.subject}
                      </span>
                    </td>

                    <td>
                      <span className={styles.statValueText}>{item.section}</span>
                    </td>

                    <td>
                      <span className={styles.statValueText}>{item.attendance}</span>
                    </td>

                    <td>
                      <span className={styles.hoursBadge}>
                        {item.assessment}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Row */}
        <div className={styles.paginationRow}>
          <div className={styles.paginationText}>
            Showing <strong>{filteredStudents.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</strong>-
            <strong>{Math.min(currentPage * itemsPerPage, filteredStudents.length)}</strong> of <strong>{filteredStudents.length}</strong> students
          </div>

          <div className={styles.paginationControls}>
            <button 
              className={styles.pageBtn}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                className={`${styles.pageBtn} ${currentPage === pg ? styles.pageBtnActive : ""}`}
                onClick={() => setCurrentPage(pg)}
              >
                {pg}
              </button>
            ))}
            <button 
              className={styles.pageBtn}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
