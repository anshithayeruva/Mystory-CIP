"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Search, 
  Filter, 
  BookOpen, 
  Layers, 
  Users, 
  Clock, 
  X, 
  Check,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import styles from "./subjects.module.css";

export interface FacultySubjectItem {
  id: string;
  initials: string;
  name: string;
  code: string;
  category: "Core" | "Elective" | "Multi-Faculty" | "Lab";
  program: string;
  semester: string;
  programInfo: string;
  credits: number;
  sectionsCount: number;
  studentsCount: number;
  weeklyHours: number;
}

const MOCK_FACULTY_SUBJECTS: FacultySubjectItem[] = [
  {
    id: "1",
    initials: "DS",
    name: "Data Structures & Algorithms",
    code: "CS-302",
    category: "Core",
    program: "B.Tech CSE",
    semester: "Semester 3",
    programInfo: "B.Tech CSE • Semester 3",
    credits: 4,
    sectionsCount: 4,
    studentsCount: 240,
    weeklyHours: 14,
  },
  {
    id: "2",
    initials: "AI",
    name: "Artificial Intelligence & ML",
    code: "CS-401",
    category: "Elective",
    program: "B.Tech CSE",
    semester: "Semester 7",
    programInfo: "B.Tech CSE • Semester 7",
    credits: 3,
    sectionsCount: 2,
    studentsCount: 115,
    weeklyHours: 10,
  },
  {
    id: "3",
    initials: "DB",
    name: "Database Management Systems",
    code: "CS-305",
    category: "Core",
    program: "B.Tech CSE",
    semester: "Semester 4",
    programInfo: "B.Tech CSE • Semester 4",
    credits: 4,
    sectionsCount: 3,
    studentsCount: 180,
    weeklyHours: 16,
  },
  {
    id: "4",
    initials: "OS",
    name: "Operating Systems Concepts",
    code: "CS-304",
    category: "Multi-Faculty",
    program: "B.Tech CSE",
    semester: "Semester 4",
    programInfo: "B.Tech CSE • Semester 4",
    credits: 3,
    sectionsCount: 2,
    studentsCount: 120,
    weeklyHours: 12,
  },
  {
    id: "5",
    initials: "CN",
    name: "Computer Networks & Security",
    code: "CS-306",
    category: "Core",
    program: "B.Tech CSE",
    semester: "Semester 5",
    programInfo: "B.Tech CSE • Semester 5",
    credits: 3,
    sectionsCount: 3,
    studentsCount: 195,
    weeklyHours: 14,
  },
  {
    id: "6",
    initials: "SE",
    name: "Software Engineering & Agile",
    code: "CS-308",
    category: "Lab",
    program: "M.Tech SE",
    semester: "Semester 1",
    programInfo: "M.Tech SE • Semester 1",
    credits: 2,
    sectionsCount: 2,
    studentsCount: 110,
    weeklyHours: 8,
  },
];

export default function FacultySubjectsPage() {
  const [subjectsList, setSubjectsList] = useState<FacultySubjectItem[]>(MOCK_FACULTY_SUBJECTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("All");
  const [selectedSemester, setSelectedSemester] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<FacultySubjectItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formState, setFormState] = useState({
    name: "",
    code: "",
    category: "Core" as "Core" | "Elective" | "Multi-Faculty" | "Lab",
    program: "B.Tech CSE",
    semester: "Semester 3",
    programInfo: "B.Tech CSE • Semester 3",
    credits: 4,
    sectionsCount: 2,
    studentsCount: 120,
    weeklyHours: 12,
  });

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered list
  const filteredSubjects = useMemo(() => {
    return subjectsList.filter((item) => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesProgram = selectedProgram === "All" || item.program === selectedProgram;
      const matchesSemester = selectedSemester === "All" || item.semester === selectedSemester;
      const matchesCat = selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesProgram && matchesSemester && matchesCat;
    });
  }, [subjectsList, searchTerm, selectedProgram, selectedSemester, selectedCategory]);

  // Pagination logic
  const totalPages = Math.ceil(filteredSubjects.length / itemsPerPage) || 1;
  const paginatedSubjects = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredSubjects.slice(start, start + itemsPerPage);
  }, [filteredSubjects, currentPage]);

  // Total summary metrics
  const totalSubjectsCount = subjectsList.length;
  const totalSectionsCount = subjectsList.reduce((sum, item) => sum + item.sectionsCount, 0);
  const totalStudentsCount = subjectsList.reduce((sum, item) => sum + item.studentsCount, 0);

  // Modal Handlers
  const handleOpenAddModal = () => {
    setEditingSubject(null);
    setFormState({
      name: "",
      code: "",
      category: "Core",
      program: "B.Tech CSE",
      semester: "Semester 3",
      programInfo: "B.Tech CSE • Semester 3",
      credits: 4,
      sectionsCount: 2,
      studentsCount: 120,
      weeklyHours: 12,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (subject: FacultySubjectItem) => {
    setEditingSubject(subject);
    setFormState({
      name: subject.name,
      code: subject.code,
      category: subject.category,
      program: subject.program,
      semester: subject.semester,
      programInfo: subject.programInfo,
      credits: subject.credits,
      sectionsCount: subject.sectionsCount,
      studentsCount: subject.studentsCount,
      weeklyHours: subject.weeklyHours,
    });
    setIsModalOpen(true);
  };

  const handleSubmitModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.code) {
      triggerToast("Please enter subject name and code.");
      return;
    }

    if (editingSubject) {
      setSubjectsList((prev) =>
        prev.map((s) => (s.id === editingSubject.id ? { ...s, ...formState, programInfo: `${formState.program} • ${formState.semester}` } : s))
      );
      triggerToast(`Subject "${formState.name}" updated successfully!`);
    } else {
      const newSubject: FacultySubjectItem = {
        id: String(Date.now()),
        initials: formState.name.substring(0, 2).toUpperCase(),
        ...formState,
        programInfo: `${formState.program} • ${formState.semester}`,
      };
      setSubjectsList((prev) => [newSubject, ...prev]);
      triggerToast(`Subject "${formState.name}" created successfully!`);
    }
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      {/* Toast Alert */}
      {toastMessage && (
        <div style={{
          position: "fixed",
          top: 24,
          right: 24,
          backgroundColor: "#00522E",
          color: "white",
          padding: "12px 20px",
          borderRadius: 8,
          boxShadow: "0 10px 25px -5px rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontSize: "0.875rem",
          fontWeight: 600,
          zIndex: 9999
        }}>
          <Check size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Area */}
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>Subject Management</h1>
          <p className={styles.subtitle}>Directory of all assigned course subjects and active teaching workloads.</p>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} size={16} />
            <input 
              type="text" 
              className={styles.searchInput} 
              placeholder="Search subjects..."
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
                      setSelectedProgram("All");
                      setSelectedSemester("All");
                      setSelectedCategory("All");
                      setShowFilterMenu(false);
                    }}
                  >
                    Reset All
                  </button>
                </div>

                <div className={styles.filterGroup}>
                  <label>Program</label>
                  <select 
                    className={styles.filterSelect}
                    value={selectedProgram}
                    onChange={(e) => setSelectedProgram(e.target.value)}
                  >
                    <option value="All">All Programs</option>
                    <option value="B.Tech CSE">B.Tech CSE</option>
                    <option value="M.Tech SE">M.Tech SE</option>
                  </select>
                </div>

                <div className={styles.filterGroup}>
                  <label>Semester</label>
                  <select 
                    className={styles.filterSelect}
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                  >
                    <option value="All">All Semesters</option>
                    <option value="Semester 1">Semester 1</option>
                    <option value="Semester 3">Semester 3</option>
                    <option value="Semester 4">Semester 4</option>
                    <option value="Semester 5">Semester 5</option>
                    <option value="Semester 6">Semester 6</option>
                    <option value="Semester 7">Semester 7</option>
                  </select>
                </div>

                <div className={styles.filterGroup}>
                  <label>Subject Category</label>
                  <select 
                    className={styles.filterSelect}
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="All">All Categories</option>
                    <option value="Core">Core</option>
                    <option value="Elective">Elective</option>
                    <option value="Multi-Faculty">Multi-Faculty</option>
                    <option value="Lab">Lab</option>
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
                <th>SUBJECT NAME & CODE</th>
                <th style={{ textAlign: "center" }}>CATEGORY</th>
                <th style={{ textAlign: "center" }}>CREDITS</th>
                <th style={{ textAlign: "center" }}>STUDENTS</th>
                <th style={{ textAlign: "center" }}>VIEW SYLLABUS</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSubjects.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                    No subjects found matching your search criteria.
                  </td>
                </tr>
              ) : (
                paginatedSubjects.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className={styles.subjectProfile}>
                        <div className={styles.avatarCircle}>{item.initials}</div>
                        <div className={styles.subjectDetails}>
                          <span className={styles.subjectTitle}>{item.name}</span>
                          <span className={styles.subjectSubtitle}>{item.programInfo}</span>
                        </div>
                      </div>
                    </td>

                    <td style={{ textAlign: "center" }}>
                      <span className={styles.statValueText} style={{ color: item.category === "Core" ? "#00522E" : item.category === "Elective" ? "#1E40AF" : item.category === "Multi-Faculty" ? "#1F3A5F" : "#334155" }}>
                        {item.category}
                      </span>
                    </td>

                    <td style={{ textAlign: "center" }}>
                      <span className={styles.statValueText}>{item.credits || 4}</span>
                    </td>

                    <td style={{ textAlign: "center" }}>
                      <span className={styles.statValueText}>{item.studentsCount}</span>
                    </td>

                    <td style={{ textAlign: "center" }}>
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <Link href={`/faculty/subjects/${item.id}`} className={styles.actionCellBtn} style={{ color: "#00522E", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px", width: "fit-content", textDecoration: "none" }}>
                          View Syllabus <ChevronRight size={16} />
                        </Link>
                      </div>
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
            Showing <strong>{filteredSubjects.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</strong>-
            <strong>{Math.min(currentPage * itemsPerPage, filteredSubjects.length)}</strong> of <strong>{filteredSubjects.length}</strong> subjects
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



      {/* Add / Edit Subject Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleArea}>
                <h3 className={styles.modalTitle}>{editingSubject ? "Edit Subject" : "Add New Subject"}</h3>
                <p className={styles.modalSubtitle}>Configure subject details, category, weekly hours, and section rosters.</p>
              </div>
              <button className={styles.closeModalBtn} onClick={() => setIsModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmitModal}>
              <div className={styles.modalBody}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroupFull}>
                    <label className={styles.formLabel}>Subject Name</label>
                    <input 
                      type="text" 
                      className={styles.formInput}
                      placeholder="e.g. Data Structures & Algorithms"
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Subject Code</label>
                    <input 
                      type="text" 
                      className={styles.formInput}
                      placeholder="e.g. CS-302"
                      value={formState.code}
                      onChange={(e) => setFormState({...formState, code: e.target.value})}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Category</label>
                    <select 
                      className={styles.formSelect}
                      value={formState.category}
                      onChange={(e) => setFormState({...formState, category: e.target.value as any})}
                    >
                      <option value="Core">Core Subject</option>
                      <option value="Elective">Elective Subject</option>
                      <option value="Multi-Faculty">Multi-Faculty</option>
                      <option value="Lab">Lab Course</option>
                    </select>
                  </div>

                  <div className={styles.formGroupFull}>
                    <label className={styles.formLabel}>Program & Term Info</label>
                    <input 
                      type="text" 
                      className={styles.formInput}
                      placeholder="e.g. B.Tech CSE • Semester 3"
                      value={formState.programInfo}
                      onChange={(e) => setFormState({...formState, programInfo: e.target.value})}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Sections Count</label>
                    <input 
                      type="number" 
                      className={styles.formInput}
                      value={formState.sectionsCount}
                      onChange={(e) => setFormState({...formState, sectionsCount: Number(e.target.value)})}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Total Enrolled Students</label>
                    <input 
                      type="number" 
                      className={styles.formInput}
                      value={formState.studentsCount}
                      onChange={(e) => setFormState({...formState, studentsCount: Number(e.target.value)})}
                    />
                  </div>

                  <div className={styles.formGroup} style={{ gridColumn: "span 2" }}>
                    <label className={styles.formLabel}>Weekly Teaching Hours</label>
                    <input 
                      type="number" 
                      className={styles.formInput}
                      value={formState.weeklyHours}
                      onChange={(e) => setFormState({...formState, weeklyHours: Number(e.target.value)})}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" className={styles.cancelModalBtn} onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className={styles.submitModalBtn}>
                  {editingSubject ? "Save Changes" : "Create Subject"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
