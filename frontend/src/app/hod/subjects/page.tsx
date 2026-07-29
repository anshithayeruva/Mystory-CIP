"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Pencil, 
  X,
  LayoutGrid,
  ListFilter,
  Users
} from "lucide-react";
import Link from "next/link";
import styles from "./subjects.module.css";

interface FacultyMember {
  name: string;
  avatar: string;
  role?: string;
}

interface SubjectItem {
  id: string;
  code: string;
  name: string;
  type: "Core Subject" | "Elective";
  facultyList: FacultyMember[];
  semSec: string;
  studentsCount: number;
  credits: number;
  hoursPerWeek: number;
  completionPercent: number;
  status: "Excellent" | "Active" | "Steady" | "Under Review";
}

const availableFacultyList: FacultyMember[] = [
  { name: "Dr. Aruna Sharma", avatar: "AS", role: "Lead Lecturer" },
  { name: "Prof. Rajesh Kumar", avatar: "RK", role: "Co-Lecturer" },
  { name: "Ms. Sneha Patil", avatar: "SP", role: "Lab Instructor" },
  { name: "Dr. Vikram Singh", avatar: "VS", role: "Lead Lecturer" },
  { name: "Prof. Anita Rao", avatar: "AR", role: "Co-Lecturer" },
  { name: "Dr. Sanjay Gupta", avatar: "SG", role: "Lab Mentor" },
  { name: "Prof. Meera Joshi", avatar: "MJ", role: "Lecturer" },
  { name: "Dr. Ramesh Nair", avatar: "RN", role: "Co-Lecturer" },
];

const initialSubjectData: SubjectItem[] = [
  {
    id: "1",
    code: "CS-302",
    name: "Data Structures & Algorithms",
    type: "Core Subject",
    facultyList: [
      { name: "Dr. Aruna Sharma", avatar: "AS", role: "Lead Lecturer" },
      { name: "Prof. Rajesh Kumar", avatar: "RK", role: "Lab Instructor" },
    ],
    semSec: "SEM-03 • SEC-A",
    studentsCount: 64,
    credits: 4,
    hoursPerWeek: 4,
    completionPercent: 88,
    status: "Excellent",
  },
  {
    id: "2",
    code: "CS-401",
    name: "Operating Systems",
    type: "Core Subject",
    facultyList: [
      { name: "Prof. Rajesh Kumar", avatar: "RK", role: "Lecturer" },
    ],
    semSec: "SEM-04 • SEC-B",
    studentsCount: 58,
    credits: 4,
    hoursPerWeek: 4,
    completionPercent: 76,
    status: "Steady",
  },
  {
    id: "3",
    code: "CS-703",
    name: "Cloud Computing Architecture",
    type: "Elective",
    facultyList: [
      { name: "Ms. Sneha Patil", avatar: "SP", role: "Lead Lecturer" },
      { name: "Dr. Sanjay Gupta", avatar: "SG", role: "Lab Mentor" },
    ],
    semSec: "SEM-07 • SEC-A",
    studentsCount: 45,
    credits: 3,
    hoursPerWeek: 3,
    completionPercent: 92,
    status: "Excellent",
  },
  {
    id: "4",
    code: "CS-505",
    name: "Artificial Intelligence & ML",
    type: "Core Subject",
    facultyList: [
      { name: "Dr. Vikram Singh", avatar: "VS", role: "Lead Lecturer" },
      { name: "Ms. Sneha Patil", avatar: "SP", role: "Co-Lecturer" },
      { name: "Dr. Sanjay Gupta", avatar: "SG", role: "Lab Mentor" },
    ],
    semSec: "SEM-05 • SEC-A",
    studentsCount: 70,
    credits: 4,
    hoursPerWeek: 4,
    completionPercent: 62,
    status: "Under Review",
  },
  {
    id: "5",
    code: "CS-304",
    name: "Database Management Systems",
    type: "Core Subject",
    facultyList: [
      { name: "Prof. Anita Rao", avatar: "AR", role: "Lead Lecturer" },
      { name: "Dr. Ramesh Nair", avatar: "RN", role: "Co-Lecturer" },
    ],
    semSec: "SEM-03 • SEC-B",
    studentsCount: 62,
    credits: 4,
    hoursPerWeek: 4,
    completionPercent: 84,
    status: "Active",
  },
  {
    id: "6",
    code: "CS-601",
    name: "Compiler Design & Construction",
    type: "Core Subject",
    facultyList: [
      { name: "Dr. Sanjay Gupta", avatar: "SG", role: "Lead Lecturer" },
    ],
    semSec: "SEM-06 • SEC-A",
    studentsCount: 55,
    credits: 4,
    hoursPerWeek: 4,
    completionPercent: 80,
    status: "Active",
  },
  {
    id: "7",
    code: "CS-802",
    name: "Cyber Security & Cryptography",
    type: "Elective",
    facultyList: [
      { name: "Prof. Meera Joshi", avatar: "MJ", role: "Lead Lecturer" },
      { name: "Dr. Vikram Singh", avatar: "VS", role: "Guest Mentor" },
    ],
    semSec: "SEM-08 • SEC-A",
    studentsCount: 40,
    credits: 3,
    hoursPerWeek: 3,
    completionPercent: 95,
    status: "Excellent",
  },
  {
    id: "8",
    code: "CS-201",
    name: "Discrete Mathematical Structures",
    type: "Core Subject",
    facultyList: [
      { name: "Dr. Ramesh Nair", avatar: "RN", role: "Lead Lecturer" },
    ],
    semSec: "SEM-02 • SEC-C",
    studentsCount: 68,
    credits: 4,
    hoursPerWeek: 4,
    completionPercent: 78,
    status: "Steady",
  },
  {
    id: "9",
    code: "CS-502",
    name: "Computer Networks & Protocols",
    type: "Core Subject",
    facultyList: [
      { name: "Dr. Aruna Sharma", avatar: "AS", role: "Co-Lecturer" },
      { name: "Prof. Anita Rao", avatar: "AR", role: "Lead Lecturer" },
    ],
    semSec: "SEM-05 • SEC-B",
    studentsCount: 60,
    credits: 4,
    hoursPerWeek: 4,
    completionPercent: 83,
    status: "Active",
  },
];

export default function HodSubjectsPage() {
  const [subjectList, setSubjectList] = useState<SubjectItem[]>(initialSubjectData);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("ALL");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Filter State & Ref for click-outside
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [yearSemFilter, setYearSemFilter] = useState("ALL");
  const filterRef = useRef<HTMLDivElement>(null);

  // Auto-close filter dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }
    if (isFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterOpen]);

  // Form State with Multi-Faculty array selection & separate Semester / Section dropdowns
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    type: "Core Subject" as SubjectItem["type"],
    selectedFacultyNames: ["Dr. Aruna Sharma"],
    semester: "SEM-03",
    section: "SEC-A",
    studentsCount: 60,
    credits: 4,
    hoursPerWeek: 4,
    completionPercent: 85,
    status: "Active" as SubjectItem["status"],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFacultyCheckboxToggle = (facultyName: string) => {
    setFormData((prev) => {
      const exists = prev.selectedFacultyNames.includes(facultyName);
      if (exists) {
        if (prev.selectedFacultyNames.length === 1) return prev;
        return {
          ...prev,
          selectedFacultyNames: prev.selectedFacultyNames.filter((n) => n !== facultyName),
        };
      } else {
        return {
          ...prev,
          selectedFacultyNames: [...prev.selectedFacultyNames, facultyName],
        };
      }
    });
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      code: "",
      name: "",
      type: "Core Subject",
      selectedFacultyNames: ["Dr. Aruna Sharma"],
      semester: "SEM-03",
      section: "SEC-A",
      studentsCount: 60,
      credits: 4,
      hoursPerWeek: 4,
      completionPercent: 85,
      status: "Active",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: SubjectItem) => {
    setEditingId(item.id);
    const parts = item.semSec ? item.semSec.split(" • ") : ["SEM-03", "SEC-A"];
    const semVal = parts[0] || "SEM-03";
    const secVal = parts[1] || "SEC-A";

    setFormData({
      code: item.code,
      name: item.name,
      type: item.type,
      selectedFacultyNames: item.facultyList.map((f) => f.name),
      semester: semVal,
      section: secVal,
      studentsCount: item.studentsCount,
      credits: item.credits,
      hoursPerWeek: item.hoursPerWeek,
      completionPercent: item.completionPercent,
      status: item.status,
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    // Map selected names to faculty list objects
    const mappedFaculty: FacultyMember[] = formData.selectedFacultyNames.map((name, index) => {
      const matched = availableFacultyList.find((f) => f.name === name);
      return {
        name,
        avatar: matched ? matched.avatar : name.substring(0, 2).toUpperCase(),
        role: index === 0 ? "Lead Lecturer" : "Co-Lecturer / Mentor",
      };
    });

    const generatedCode = formData.code.trim()
      ? formData.code.trim().toUpperCase()
      : `CS-${Math.floor(100 + Math.random() * 800)}`;

    const combinedSemSec = `${formData.semester} • ${formData.section}`;

    if (editingId) {
      setSubjectList((prev) =>
        prev.map((s) =>
          s.id === editingId
            ? {
                ...s,
                code: generatedCode,
                name: formData.name.trim(),
                type: formData.type,
                facultyList: mappedFaculty,
                semSec: combinedSemSec,
                studentsCount: Number(formData.studentsCount) || 60,
                credits: Number(formData.credits) || 4,
                hoursPerWeek: Number(formData.hoursPerWeek) || 4,
                completionPercent: Number(formData.completionPercent) || 85,
                status: formData.status,
              }
            : s
        )
      );
    } else {
      const newSubjectItem: SubjectItem = {
        id: Date.now().toString(),
        code: generatedCode,
        name: formData.name.trim(),
        type: formData.type,
        facultyList: mappedFaculty,
        semSec: combinedSemSec,
        studentsCount: Number(formData.studentsCount) || 60,
        credits: Number(formData.credits) || 4,
        hoursPerWeek: Number(formData.hoursPerWeek) || 4,
        completionPercent: Number(formData.completionPercent) || 85,
        status: formData.status,
      };
      setSubjectList((prev) => [newSubjectItem, ...prev]);
      setCurrentPage(1);
    }

    setIsModalOpen(false);
  };





  const resetFilters = () => {
    setTypeFilter("ALL");
    setStatusFilter("ALL");
    setYearSemFilter("ALL");
    setActiveTab("ALL");
    setSearchQuery("");
    setCurrentPage(1);
  };

  const isFilterActive =
    typeFilter !== "ALL" ||
    statusFilter !== "ALL" ||
    yearSemFilter !== "ALL" ||
    activeTab !== "ALL" ||
    searchQuery !== "";

  // Apply Filters
  const filteredSubjects = subjectList.filter((item) => {
    let matchesTab = true;
    if (activeTab === "CORE") matchesTab = item.type === "Core Subject";
    if (activeTab === "ELECTIVE") matchesTab = item.type === "Elective";
    if (activeTab === "MULTI_FACULTY") matchesTab = item.facultyList.length > 1;

    let matchesYearSem = true;
    if (yearSemFilter === "YEAR_1") matchesYearSem = item.semSec.includes("SEM-01") || item.semSec.includes("SEM-02");
    if (yearSemFilter === "YEAR_2") matchesYearSem = item.semSec.includes("SEM-03") || item.semSec.includes("SEM-04");
    if (yearSemFilter === "YEAR_3") matchesYearSem = item.semSec.includes("SEM-05") || item.semSec.includes("SEM-06");
    if (yearSemFilter === "YEAR_4") matchesYearSem = item.semSec.includes("SEM-07") || item.semSec.includes("SEM-08");
    if (yearSemFilter === "YEAR_5") matchesYearSem = item.semSec.includes("SEM-09") || item.semSec.includes("SEM-10");

    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.facultyList.some((f) => f.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.semSec.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === "ALL" || item.type === typeFilter;
    const matchesStatus = statusFilter === "ALL" || item.status === statusFilter;

    return matchesTab && matchesYearSem && matchesSearch && matchesType && matchesStatus;
  });
  const totalPages = Math.max(1, Math.ceil(filteredSubjects.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredSubjects.length);
  const paginatedSubjects = filteredSubjects.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getStatusClass = (status: SubjectItem["status"]) => {
    switch (status) {
      case "Excellent":
        return styles.statusExcellent;
      case "Active":
        return styles.statusActive;
      case "Steady":
        return styles.statusSteady;
      case "Under Review":
        return styles.statusReview;
      default:
        return styles.statusActive;
    }
  };

  return (
    <div className={styles.subjectsContainer}>
      {/* Page Header */}
      <div className={styles.headerSection}>
        <div className={styles.titleArea}>
          <h1 className={styles.pageTitle}>Curriculum & Subject Modules</h1>
          <p className={styles.pageSubtitle}>
            Explore offered courses, multi-faculty teaching assignments, syllabus completion, and semester structures.
          </p>
        </div>

        <div className={styles.headerActions}>
          <button 
            className={styles.addBtn}
            onClick={openAddModal}
          >
            <Plus size={18} />
            <span>Add New Subject</span>
          </button>
        </div>
      </div>

      {/* Toolbar: Category Segmented Tabs, Search & View Switcher */}
      <div className={styles.toolbarRow}>
        <div className={styles.categoryTabs}>
          <button
            className={`${styles.tabBtn} ${activeTab === "ALL" ? styles.tabBtnActive : ""}`}
            onClick={() => { setActiveTab("ALL"); setCurrentPage(1); }}
          >
            All Courses
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === "MULTI_FACULTY" ? styles.tabBtnActive : ""}`}
            onClick={() => { setActiveTab("MULTI_FACULTY"); setCurrentPage(1); }}
          >
            Multi-Faculty ({subjectList.filter(s => s.facultyList.length > 1).length})
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === "CORE" ? styles.tabBtnActive : ""}`}
            onClick={() => { setActiveTab("CORE"); setCurrentPage(1); }}
          >
            Core Subjects
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === "ELECTIVE" ? styles.tabBtnActive : ""}`}
            onClick={() => { setActiveTab("ELECTIVE"); setCurrentPage(1); }}
          >
            Electives
          </button>
        </div>

        <div className={styles.controlsRight}>
          <div className={styles.searchWrapper}>
            <Search size={16} className={styles.searchIcon} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search course or faculty..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className={styles.filterBtnWrapper} ref={filterRef}>
            <button
              className={`${styles.filterBtn} ${isFilterActive ? styles.filterBtnActive : ""}`}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={15} />
              <span>Filter</span>
            </button>

            {/* Filter Dropdown Popover */}
            {isFilterOpen && (
              <div className={styles.filterDropdown}>
                <div className={styles.filterHeader}>
                  <span className={styles.filterTitle}>Filter Options</span>
                  {isFilterActive && (
                    <button className={styles.clearFilterText} onClick={resetFilters}>
                      Reset
                    </button>
                  )}
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Academic Year & Semester</label>
                  <select
                    className={styles.filterSelect}
                    value={yearSemFilter}
                    onChange={(e) => {
                      setYearSemFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="ALL">All Years & Semesters</option>
                    <option value="YEAR_1">Year I (SEM 01 – 02)</option>
                    <option value="YEAR_2">Year II (SEM 03 – 04)</option>
                    <option value="YEAR_3">Year III (SEM 05 – 06)</option>
                    <option value="YEAR_4">Year IV (SEM 07 – 08)</option>
                    <option value="YEAR_5">Year V (SEM 09 – 10)</option>
                  </select>
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Course Type</label>
                  <select
                    className={styles.filterSelect}
                    value={typeFilter}
                    onChange={(e) => {
                      setTypeFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="ALL">All Types</option>
                    <option value="Core Subject">Core Subject</option>
                    <option value="Elective">Elective</option>
                  </select>
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Course Status</label>
                  <select
                    className={styles.filterSelect}
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Active">Active</option>
                    <option value="Steady">Steady</option>
                    <option value="Under Review">Under Review</option>
                  </select>
                </div>
              </div>
            )}
          </div>
          <div className={styles.viewToggleGroup}>
            <button
              className={`${styles.viewToggleBtn} ${viewMode === "grid" ? styles.viewToggleBtnActive : ""}`}
              title="Grid View"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              className={`${styles.viewToggleBtn} ${viewMode === "list" ? styles.viewToggleBtnActive : ""}`}
              title="Table View"
              onClick={() => setViewMode("list")}
            >
              <ListFilter size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT DISPLAY */}
      {viewMode === "grid" ? (
        /* COURSE CARDS GRID VIEW */
        <div className={styles.cardsGrid}>
          {paginatedSubjects.length > 0 ? (
            paginatedSubjects.map((item) => {
              const allFacultyNames = item.facultyList.map((f) => f.name).join(", ");
              const leadFaculty = item.facultyList[0];
              const extraCount = item.facultyList.length - 1;

              return (
                <div key={item.id} className={styles.subjectCard}>
                  <div className={styles.cardTopRow}>
                    <div className={styles.codeBadgesGroup}>
                      <span className={styles.codeBadge}>{item.code}</span>
                      <span className={styles.typeBadge}>{item.type}</span>
                    </div>
                    <div className={styles.cardActions}>
                      <button 
                        className={styles.cardActionBtn} 
                        title={`View ${item.name}`}
                      >
                        <Eye size={15} />
                      </button>
                      <button 
                        className={styles.cardActionBtn} 
                        title={`Edit ${item.name}`}
                        onClick={() => openEditModal(item)}
                      >
                        <Pencil size={15} />
                      </button>
                    </div>
                  </div>

                  <div className={styles.cardTitleBlock}>
                    <h3 className={styles.cardTitle}>{item.name}</h3>
                    <span className={styles.cardSemSec}>{item.semSec}</span>
                  </div>

                  <div className={styles.cardMetaGrid}>
                    <div className={styles.metaItemFull}>
                      <div className={styles.facultyStackWrapper}>
                        <span className={styles.metaLabel}>ASSIGNED FACULTY ({item.facultyList.length})</span>
                        {extraCount > 0 && (
                          <span className={styles.coFacultyBadge}>
                            +{extraCount} Co-Instructor{extraCount > 1 ? "s" : ""}
                          </span>
                        )}
                      </div>
                      
                      <div className={styles.facultyStackWrapper} title={`Instructors: ${allFacultyNames}`}>
                        <div className={styles.avatarStack}>
                          {item.facultyList.map((fac, idx) => (
                            <div 
                              key={idx} 
                              className={styles.stackedAvatar} 
                              title={`${fac.name} (${fac.role || "Instructor"})`}
                            >
                              {fac.avatar}
                            </div>
                          ))}
                        </div>
                        <div className={styles.facultyNamesList}>
                          {leadFaculty.name}
                          {extraCount > 0 && <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}> & others</span>}
                        </div>
                      </div>
                    </div>

                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>ENROLLED</span>
                      <span className={styles.metaValue}>{item.studentsCount} Students</span>
                    </div>

                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>LOAD & CREDITS</span>
                      <span className={styles.metaValue}>{item.credits} Cr • {item.hoursPerWeek}h/wk</span>
                    </div>
                  </div>

                  <div className={styles.cardBottomRow}>
                    <div className={styles.progressGroup}>
                      <div className={styles.progressLabelRow}>
                        <span className={styles.progressTitle}>Syllabus Progress</span>
                        <span className={styles.progressPercent}>{item.completionPercent}%</span>
                      </div>
                      <div className={styles.progressBarBg}>
                        <div 
                          className={styles.progressBarFill} 
                          style={{ width: `${item.completionPercent}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <span className={getStatusClass(item.status)}>{item.status}</span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{ gridColumn: "span 3", textAlign: "center", padding: "40px", backgroundColor: "#fff", borderRadius: "12px", border: "1px solid var(--surface-border)", color: "var(--text-muted)" }}>
              No subjects found matching the selected filter criteria.
            </div>
          )}
        </div>
      ) : (
        /* TABLE LIST VIEW WITH MULTI-FACULTY STACK */
        <div className={styles.tableCard}>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Course Code & Title</th>
                  <th>Assigned Teachers</th>
                  <th>Semester & Section</th>
                  <th>Enrolled</th>
                  <th>Credits & Hours</th>
                  <th>Completion</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right", paddingRight: "20px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedSubjects.map((item) => {
                  const allFacultyNames = item.facultyList.map((f) => f.name).join(", ");
                  const leadFaculty = item.facultyList[0];
                  const extraCount = item.facultyList.length - 1;

                  return (
                    <tr key={item.id}>
                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <span className={styles.codeBadge}>{item.code}</span>
                            <span className={styles.typeBadge}>{item.type}</span>
                          </div>
                          <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--text-main)", marginTop: "2px" }}>
                            {item.name}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className={styles.facultyStackWrapper} title={`Instructors: ${allFacultyNames}`}>
                          <div className={styles.avatarStack}>
                            {item.facultyList.map((fac, idx) => (
                              <div key={idx} className={styles.stackedAvatar} title={`${fac.name} (${fac.role || "Instructor"})`}>
                                {fac.avatar}
                              </div>
                            ))}
                          </div>
                          <div style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>{leadFaculty.name}</span>
                            {extraCount > 0 && (
                              <span style={{ fontSize: "0.725rem", color: "#00522E", fontWeight: 700 }}>
                                +{extraCount} Co-Instructor{extraCount > 1 ? "s" : ""}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontWeight: 600, fontSize: "0.85rem" }}>{item.semSec}</span>
                      </td>
                      <td>
                        <span style={{ fontWeight: 700 }}>{item.studentsCount}</span>
                      </td>
                      <td>
                        <span style={{ fontSize: "0.8rem", color: "#334155" }}>
                          {item.credits} Cr • {item.hoursPerWeek}h/wk
                        </span>
                      </td>
                      <td>
                        <span style={{ fontWeight: 700, color: "#00522E" }}>{item.completionPercent}%</span>
                      </td>
                      <td>
                        <span className={getStatusClass(item.status)}>{item.status}</span>
                      </td>
                      <td style={{ textAlign: "right", paddingRight: "20px" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "4px" }}>
                          <button className={styles.cardActionBtn} title={`View ${item.name}`}>
                            <Eye size={16} />
                          </button>
                          <button className={styles.cardActionBtn} title={`Edit ${item.name}`} onClick={() => openEditModal(item)}>
                            <Pencil size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Dynamic Pagination Controls */}
      <div className={styles.paginationRow}>
        <div className={styles.paginationText}>
          Showing <strong>{filteredSubjects.length === 0 ? 0 : startIndex + 1}-{endIndex}</strong> of <strong>{filteredSubjects.length + 33}</strong> course modules
        </div>
        <div className={styles.paginationControls}>
          <button 
            className={styles.pageBtn} 
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              className={`${styles.pageBtn} ${currentPage === pageNum ? styles.pageBtnActive : ""}`}
              onClick={() => handlePageChange(pageNum)}
            >
              {pageNum}
            </button>
          ))}

          <button 
            className={styles.pageBtn}
            disabled={currentPage === totalPages || filteredSubjects.length === 0}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* Add / Edit Subject Modal Popup with Multi-Faculty Checkboxes */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div 
            className={styles.modalContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleArea}>
                <h2 className={styles.modalTitle}>
                  {editingId ? "Edit Course Module" : "Add New Subject"}
                </h2>
                <p className={styles.modalSubtitle}>
                  Assign single or multiple faculty members (lead & co-instructors) to this subject.
                </p>
              </div>
              <button 
                className={styles.closeModalBtn}
                onClick={() => setIsModalOpen(false)}
                title="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit}>
              <div className={styles.modalBody}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Course Code *</label>
                    <input
                      type="text"
                      name="code"
                      required
                      placeholder="e.g. CS-302"
                      className={styles.formInput}
                      value={formData.code}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Course Type *</label>
                    <select
                      name="type"
                      className={styles.formSelect}
                      value={formData.type}
                      onChange={handleInputChange}
                    >
                      <option value="Core Subject">Core Subject</option>
                      <option value="Elective">Elective</option>
                    </select>
                  </div>

                  <div className={styles.formGroupFull}>
                    <label className={styles.formLabel}>Course Title *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Data Structures & Algorithms"
                      className={styles.formInput}
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Multi-Faculty Selection Grid */}
                  <div className={styles.formGroupFull}>
                    <label className={styles.formLabel}>
                      Assigned Faculty Members ({formData.selectedFacultyNames.length} Selected) *
                    </label>
                    <div className={styles.facultyCheckboxGrid}>
                      {availableFacultyList.map((fac) => {
                        const isChecked = formData.selectedFacultyNames.includes(fac.name);
                        return (
                          <label key={fac.name} className={styles.checkboxLabel}>
                            <input
                              type="checkbox"
                              className={styles.checkboxInput}
                              checked={isChecked}
                              onChange={() => handleFacultyCheckboxToggle(fac.name)}
                            />
                            <span>{fac.name}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>



                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Semester *</label>
                    <select
                      name="semester"
                      className={styles.formSelect}
                      value={formData.semester}
                      onChange={handleInputChange}
                    >
                      <option value="SEM-01">SEM-01 (Year 1)</option>
                      <option value="SEM-02">SEM-02 (Year 1)</option>
                      <option value="SEM-03">SEM-03 (Year 2)</option>
                      <option value="SEM-04">SEM-04 (Year 2)</option>
                      <option value="SEM-05">SEM-05 (Year 3)</option>
                      <option value="SEM-06">SEM-06 (Year 3)</option>
                      <option value="SEM-07">SEM-07 (Year 4)</option>
                      <option value="SEM-08">SEM-08 (Year 4)</option>
                      <option value="SEM-09">SEM-09 (Year 5 Integrated)</option>
                      <option value="SEM-10">SEM-10 (Year 5 Integrated)</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Section *</label>
                    <select
                      name="section"
                      className={styles.formSelect}
                      value={formData.section}
                      onChange={handleInputChange}
                    >
                      <option value="SEC-A">SEC-A</option>
                      <option value="SEC-B">SEC-B</option>
                      <option value="SEC-C">SEC-C</option>
                      <option value="SEC-D">SEC-D</option>
                      <option value="SEC-E">SEC-E</option>
                      <option value="ALL SEC">ALL SEC</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Enrolled Students</label>
                    <input
                      type="number"
                      name="studentsCount"
                      placeholder="e.g. 64"
                      className={styles.formInput}
                      value={formData.studentsCount}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Credits</label>
                    <input
                      type="number"
                      name="credits"
                      placeholder="e.g. 4"
                      className={styles.formInput}
                      value={formData.credits}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Weekly Hours</label>
                    <input
                      type="number"
                      name="hoursPerWeek"
                      placeholder="e.g. 4"
                      className={styles.formInput}
                      value={formData.hoursPerWeek}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.formGroupFull}>
                    <label className={styles.formLabel}>Course Status *</label>
                    <select
                      name="status"
                      className={styles.formSelect}
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      <option value="Excellent">Excellent</option>
                      <option value="Active">Active</option>
                      <option value="Steady">Steady</option>
                      <option value="Under Review">Under Review</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.cancelModalBtn}
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.submitModalBtn}
                >
                  {editingId ? "Save Changes" : "Create Subject"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Page Footer */}
      <footer className={styles.pageFooter}>
        <div>© 2024 MyStory CIP Academic Management. All rights reserved.</div>
        <div className={styles.footerLinks}>
          <Link href="#" className={styles.footerLink}>
            Terms of Service
          </Link>
          <Link href="#" className={styles.footerLink}>
            Privacy Policy
          </Link>
          <Link href="#" className={styles.footerLink}>
            Curriculum Guide
          </Link>
        </div>
      </footer>
    </div>
  );
}
