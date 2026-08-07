"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Search,
  Filter,
  UserPlus,
  GraduationCap,
  CalendarCheck,
  Award,
  Eye,
  Pencil,
  Trash2,
  X
} from "lucide-react";
import styles from "./students.module.css";
import { HodService } from "@/services/hod.service";

interface StudentItem {
  id: string;
  name: string;
  email: string;
  avatar: string;
  regId: string;
  program: string;
  section: string;
  attendance: string;
  status: "Good Standing" | "Honor Roll" | "Academic Warning" | "At-Risk";
}

const initialStudentData: StudentItem[] = [
  {
    id: "1",
    name: "Ethan Rivers",
    email: "e.rivers@university.edu",
    avatar: "ER",
    regId: "2023CS001",
    program: "B.Tech CS • Year III",
    section: "Section A",
    attendance: "92.5%",
    status: "Good Standing",
  },
  {
    id: "2",
    name: "Amara Okafor",
    email: "a.okafor@university.edu",
    avatar: "AO",
    regId: "2023CS012",
    program: "B.Tech CS • Year III",
    section: "Section B",
    attendance: "48.0%",
    status: "At-Risk",
  },
  {
    id: "3",
    name: "Liam Tanaka",
    email: "l.tanaka@university.edu",
    avatar: "LT",
    regId: "2023CS045",
    program: "B.Tech CS • Year III",
    section: "Section C",
    attendance: "76.0%",
    status: "Academic Warning",
  },
  {
    id: "4",
    name: "Sofia Chen",
    email: "s.chen@university.edu",
    avatar: "SC",
    regId: "2023CS008",
    program: "B.Tech CS • Year III",
    section: "Section A",
    attendance: "98.0%",
    status: "Honor Roll",
  },
  {
    id: "5",
    name: "Noah Williams",
    email: "n.williams@university.edu",
    avatar: "NW",
    regId: "2023CS091",
    program: "B.Tech CS • Year II",
    section: "Section D",
    attendance: "89.5%",
    status: "Good Standing",
  },
];

export default function HodStudentsPage() {
  const [studentList, setStudentList] = useState<StudentItem[]>(initialStudentData);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1284);
  const itemsPerPage = 5;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Filter State & Ref for click-outside
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [programFilter, setProgramFilter] = useState("ALL");
  const [sectionFilter, setSectionFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const filterRef = useRef<HTMLDivElement>(null);

  // Fetch student list from Backend
  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await HodService.getStudentsList({
        search: searchQuery,
        page: currentPage,
        limit: itemsPerPage
      });

      if (response && response.success && response.data?.data) {
        if (response.data.data.length > 0) {
          setStudentList(response.data.data);
          setTotalCount(response.data.pagination?.total || response.data.data.length);
        }
      }
    } catch (err) {
      console.warn("Backend API offline or using demo student data:", err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, currentPage, itemsPerPage]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

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

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    regId: "",
    program: "B.Tech CS • Year III",
    section: "Section A",
    attendance: "90.0%",
    status: "Good Standing" as StudentItem["status"],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      name: "",
      email: "",
      regId: "",
      program: "B.Tech CS • Year III",
      section: "Section A",
      attendance: "90.0%",
      status: "Good Standing",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: StudentItem) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      email: item.email,
      regId: item.regId,
      program: item.program,
      section: item.section,
      attendance: item.attendance,
      status: item.status,
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const nameParts = formData.name.trim().split(" ");
    let initials = "ST";
    if (nameParts.length >= 2) {
      initials = `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
    } else if (nameParts.length === 1 && nameParts[0].length > 0) {
      initials = nameParts[0].substring(0, 2).toUpperCase();
    }

    const generatedRegId = formData.regId.trim()
      ? formData.regId.trim()
      : `2023CS${Math.floor(100 + Math.random() * 900)}`;

    const generatedEmail = formData.email.trim()
      ? formData.email.trim()
      : `${formData.name.toLowerCase().replace(/\s+/g, ".")}@university.edu`;

    try {
      if (editingId) {
        await HodService.updateStudent(editingId, {
          name: formData.name.trim(),
          email: generatedEmail,
          rollNumber: generatedRegId,
        });

        setStudentList((prev) =>
          prev.map((s) =>
            s.id === editingId
              ? {
                ...s,
                name: formData.name.trim(),
                email: generatedEmail,
                avatar: initials,
                regId: generatedRegId,
                program: formData.program,
                section: formData.section,
                attendance: formData.attendance,
                status: formData.status,
              }
              : s
          )
        );
      } else {
        await HodService.createStudent({
          name: formData.name.trim(),
          email: generatedEmail,
          rollNumber: generatedRegId,
        });

        const newStudentItem: StudentItem = {
          id: Date.now().toString(),
          name: formData.name.trim(),
          email: generatedEmail,
          avatar: initials,
          regId: generatedRegId,
          program: formData.program,
          section: formData.section,
          attendance: formData.attendance || "90.0%",
          status: formData.status,
        };
        setStudentList((prev) => [newStudentItem, ...prev]);
        setTotalCount((prev) => prev + 1);
        setCurrentPage(1);
      }
    } catch (err) {
      console.warn("Backend API action error, updating local state:", err);
    }

    setIsModalOpen(false);
  };

  const handleDeleteStudent = async (id: string) => {
    if (!confirm("Are you sure you want to remove this student record?")) return;
    try {
      await HodService.deleteStudent(id);
    } catch (err) {
      console.warn("Backend delete error:", err);
    }
    setStudentList((prev) => prev.filter((s) => s.id !== id));
    setTotalCount((prev) => Math.max(0, prev - 1));
  };

  const resetFilters = () => {
    setProgramFilter("ALL");
    setSectionFilter("ALL");
    setStatusFilter("ALL");
    setSearchQuery("");
    setCurrentPage(1);
  };

  const isFilterActive =
    programFilter !== "ALL" ||
    sectionFilter !== "ALL" ||
    statusFilter !== "ALL" ||
    searchQuery !== "";

  // Apply Search & Filters
  const filteredStudents = studentList.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.regId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.program.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesProgram =
      programFilter === "ALL" || item.program.includes(programFilter);

    const matchesSection =
      sectionFilter === "ALL" || item.section === sectionFilter;

    const matchesStatus =
      statusFilter === "ALL" || item.status === statusFilter;

    return matchesSearch && matchesProgram && matchesSection && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredStudents.length);
  const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getAttendanceClass = (att: string) => {
    const val = parseFloat(att);
    if (val >= 85) return styles.attendanceGreen;
    if (val >= 70) return styles.attendanceOrange;
    return styles.attendanceRed;
  };

  const getStatusClass = (status: StudentItem["status"]) => {
    switch (status) {
      case "Honor Roll":
        return styles.statusHonor;
      case "Good Standing":
        return styles.statusGood;
      case "Academic Warning":
        return styles.statusWarning;
      case "At-Risk":
        return styles.statusRisk;
      default:
        return styles.statusGood;
    }
  };

  return (
    <div className={styles.studentsContainer}>
      {/* Top Header & Actions */}
      <div className={styles.headerSection}>
        <div className={styles.titleArea}>
          <h1 className={styles.pageTitle}>Student Directory</h1>
          <p className={styles.pageSubtitle}>
            Overview of enrolled students, academic performance, and attendance records.
          </p>
        </div>

        <div className={styles.actionArea}>
          <div className={styles.searchWrapper}>
            <Search size={16} className={styles.searchIcon} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search students..."
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
              <Filter size={16} />
              <span>Filter {isFilterActive ? "Active" : ""}</span>
            </button>

            {/* Filter Dropdown Popover */}
            {isFilterOpen && (
              <div className={styles.filterDropdown}>
                <div className={styles.filterHeader}>
                  <span className={styles.filterTitle}>Filter Options</span>
                  {isFilterActive && (
                    <button className={styles.clearFilterText} onClick={resetFilters}>
                      Reset All
                    </button>
                  )}
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Academic Year / Program</label>
                  <select
                    className={styles.filterSelect}
                    value={programFilter}
                    onChange={(e) => {
                      setProgramFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="ALL">All Programs & Years</option>
                    <option value="Year I">Year I</option>
                    <option value="Year II">Year II</option>
                    <option value="Year III">Year III</option>
                    <option value="Year IV">Year IV</option>
                  </select>
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Section</label>
                  <select
                    className={styles.filterSelect}
                    value={sectionFilter}
                    onChange={(e) => {
                      setSectionFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="ALL">All Sections</option>
                    <option value="Section A">Section A</option>
                    <option value="Section B">Section B</option>
                    <option value="Section C">Section C</option>
                    <option value="Section D">Section D</option>
                  </select>
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Academic Status</label>
                  <select
                    className={styles.filterSelect}
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="Honor Roll">Honor Roll</option>
                    <option value="Good Standing">Good Standing</option>
                    <option value="Academic Warning">Academic Warning</option>
                    <option value="At-Risk">At-Risk</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          <button
            className={styles.addBtn}
            onClick={openAddModal}
          >
            <UserPlus size={18} />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className={styles.tableCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Reg. Number</th>
                <th>Program & Year</th>
                <th>Section</th>
                <th>Attendance</th>
                <th>Academic Status</th>
                <th style={{ textAlign: "right", paddingRight: "20px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.length > 0 ? (
                paginatedStudents.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className={styles.studentProfile}>
                        <div className={styles.avatarCircle}>{item.avatar || "ST"}</div>
                        <div className={styles.studentDetails}>
                          <span className={styles.studentName}>{item.name}</span>
                          <span className={styles.studentEmail}>{item.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={styles.regNoText}>{item.regId}</span>
                    </td>
                    <td>
                      <span className={styles.programText}>{item.program}</span>
                    </td>
                    <td>
                      <span className={styles.sectionBadge}>{item.section}</span>
                    </td>
                    <td>
                      <span className={getAttendanceClass(item.attendance)}>
                        {item.attendance}
                      </span>
                    </td>
                    <td>
                      <span className={getStatusClass(item.status)}>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ textAlign: "right", paddingRight: "20px" }}>
                      <div className={styles.actionsGroup}>
                        <button
                          className={styles.actionCellBtn}
                          title={`Edit ${item.name}`}
                          aria-label={`Edit ${item.name}`}
                          onClick={() => openEditModal(item)}
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          className={styles.actionCellBtn}
                          title={`Delete ${item.name}`}
                          aria-label={`Delete ${item.name}`}
                          onClick={() => handleDeleteStudent(item.id)}
                          style={{ color: '#ef4444' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "32px", color: "var(--text-muted)" }}>
                    No student records found matching the selected filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination */}
        <div className={styles.paginationRow}>
          <div className={styles.paginationText}>
            Showing <strong>{filteredStudents.length === 0 ? 0 : startIndex + 1}-{endIndex}</strong> of <strong>{totalCount}</strong> students
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
              disabled={currentPage === totalPages || filteredStudents.length === 0}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards Row (3 Metric Cards) */}
      <div className={styles.summaryGrid}>
        <div className={styles.summaryCard}>
          <div className={styles.iconCircleGreen}>
            <GraduationCap size={22} />
          </div>
          <div className={styles.summaryInfo}>
            <span className={styles.summaryTitle}>Total Enrolled Students</span>
            <div className={styles.summaryValue}>{totalCount.toLocaleString()}</div>
            <div className={styles.summarySubtext}>
              <span className={styles.subtextGreen}>↑ 5.2%</span> from last academic term
            </div>
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.iconCircleBlue}>
            <CalendarCheck size={22} />
          </div>
          <div className={styles.summaryInfo}>
            <span className={styles.summaryTitle}>Avg. Department Attendance</span>
            <div className={styles.summaryValue}>86.4%</div>
            <div className={styles.summarySubtext}>Consistency across 4 academic years</div>
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.iconCircleDark}>
            <Award size={22} />
          </div>
          <div className={styles.summaryInfo}>
            <span className={styles.summaryTitle}>Good Standing Rate</span>
            <div className={styles.summaryValue}>94.2%</div>
            <div className={styles.summarySubtext}>Students in good standing</div>
          </div>
        </div>
      </div>

      {/* Add / Edit Student Popup Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div
            className={styles.modalContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleArea}>
                <h2 className={styles.modalTitle}>
                  {editingId ? "Edit Student Details" : "Add New Student"}
                </h2>
                <p className={styles.modalSubtitle}>
                  {editingId
                    ? "Update enrollment details, section, and academic standing."
                    : "Enter student details to enroll in the department directory."}
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
                    <label className={styles.formLabel}>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Ethan Rivers"
                      className={styles.formInput}
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Registration Number *</label>
                    <input
                      type="text"
                      name="regId"
                      placeholder="e.g. 2023CS001"
                      className={styles.formInput}
                      value={formData.regId}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.formGroupFull}>
                    <label className={styles.formLabel}>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. e.rivers@university.edu"
                      className={styles.formInput}
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Program & Academic Year *</label>
                    <select
                      name="program"
                      className={styles.formSelect}
                      value={formData.program}
                      onChange={handleInputChange}
                    >
                      <option value="B.Tech CS • Year I">B.Tech CS • Year I</option>
                      <option value="B.Tech CS • Year II">B.Tech CS • Year II</option>
                      <option value="B.Tech CS • Year III">B.Tech CS • Year III</option>
                      <option value="B.Tech CS • Year IV">B.Tech CS • Year IV</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Assigned Section *</label>
                    <select
                      name="section"
                      className={styles.formSelect}
                      value={formData.section}
                      onChange={handleInputChange}
                    >
                      <option value="Section A">Section A</option>
                      <option value="Section B">Section B</option>
                      <option value="Section C">Section C</option>
                      <option value="Section D">Section D</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Attendance Percentage</label>
                    <input
                      type="text"
                      name="attendance"
                      placeholder="e.g. 92.5%"
                      className={styles.formInput}
                      value={formData.attendance}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Academic Standing *</label>
                    <select
                      name="status"
                      className={styles.formSelect}
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      <option value="Honor Roll">Honor Roll</option>
                      <option value="Good Standing">Good Standing</option>
                      <option value="Academic Warning">Academic Warning</option>
                      <option value="At-Risk">At-Risk</option>
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
                  {editingId ? "Save Changes" : "Add Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
