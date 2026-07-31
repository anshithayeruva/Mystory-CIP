"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Search, 
  Filter, 
  UserPlus, 
  GraduationCap,
  BookOpen,
  Users,
  Clock,
  Eye,
  Pencil,
  X
} from "lucide-react";
import Link from "next/link";
import styles from "./faculty.module.css";

interface FacultyItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  empId: string;
  subjects: string[];
  sections: string;
  students: string;
  teachingHours: number;
}

const initialFacultyData: FacultyItem[] = [
  // Page 1
  {
    id: "1",
    name: "Dr. Albert Thorne",
    role: "Associate Professor",
    avatar: "AT",
    empId: "EMP-88219",
    subjects: ["Data Structures", "Algorithms"],
    sections: "04",
    students: "240",
    teachingHours: 14,
  },
  {
    id: "2",
    name: "Prof. Sarah Jenkins",
    role: "Senior Faculty",
    avatar: "SJ",
    empId: "EMP-77102",
    subjects: ["Machine Learning"],
    sections: "02",
    students: "115",
    teachingHours: 10,
  },
  {
    id: "3",
    name: "Dr. Rahul Mehta",
    role: "Assistant Professor",
    avatar: "RM",
    empId: "EMP-90224",
    subjects: ["Operating Systems", "C++ Lab"],
    sections: "03",
    students: "180",
    teachingHours: 16,
  },
  {
    id: "4",
    name: "Prof. Elena Rodriguez",
    role: "HOD (In-charge)",
    avatar: "ER",
    empId: "EMP-66321",
    subjects: ["Database Management"],
    sections: "02",
    students: "120",
    teachingHours: 8,
  },
  {
    id: "5",
    name: "Mr. Kevin Zhang",
    role: "Lab Instructor",
    avatar: "KZ",
    empId: "EMP-11204",
    subjects: ["Web Technologies", "UI/UX Design"],
    sections: "05",
    students: "300",
    teachingHours: 18,
  },
  // Page 2
  {
    id: "6",
    name: "Dr. Marcus Vance",
    role: "Professor",
    avatar: "MV",
    empId: "EMP-33910",
    subjects: ["Artificial Intelligence"],
    sections: "03",
    students: "165",
    teachingHours: 12,
  },
  {
    id: "7",
    name: "Prof. Anita Sharma",
    role: "Associate Professor",
    avatar: "AS",
    empId: "EMP-55192",
    subjects: ["Computer Networks"],
    sections: "04",
    students: "210",
    teachingHours: 14,
  },
  {
    id: "8",
    name: "Mr. David Miller",
    role: "Assistant Professor",
    avatar: "DM",
    empId: "EMP-44821",
    subjects: ["Software Engineering"],
    sections: "02",
    students: "130",
    teachingHours: 10,
  },
  {
    id: "9",
    name: "Dr. Priya Patel",
    role: "Senior Faculty",
    avatar: "PP",
    empId: "EMP-22983",
    subjects: ["Cybersecurity"],
    sections: "03",
    students: "175",
    teachingHours: 15,
  },
  {
    id: "10",
    name: "Prof. Robert Chen",
    role: "Professor",
    avatar: "RC",
    empId: "EMP-66104",
    subjects: ["Cloud Computing"],
    sections: "04",
    students: "220",
    teachingHours: 16,
  },
  // Page 3
  {
    id: "11",
    name: "Dr. Sophia Al-Mansoor",
    role: "Associate Professor",
    avatar: "SA",
    empId: "EMP-99231",
    subjects: ["Compiler Design"],
    sections: "02",
    students: "110",
    teachingHours: 12,
  },
  {
    id: "12",
    name: "Mr. James Wilson",
    role: "Lab Instructor",
    avatar: "JW",
    empId: "EMP-88123",
    subjects: ["Python Programming"],
    sections: "05",
    students: "290",
    teachingHours: 20,
  },
  {
    id: "13",
    name: "Dr. Karen Taylor",
    role: "Assistant Professor",
    avatar: "KT",
    empId: "EMP-77412",
    subjects: ["Discrete Mathematics"],
    sections: "03",
    students: "160",
    teachingHours: 11,
  },
  {
    id: "14",
    name: "Prof. Vikram Singh",
    role: "Senior Faculty",
    avatar: "VS",
    empId: "EMP-55320",
    subjects: ["Big Data Analytics"],
    sections: "02",
    students: "140",
    teachingHours: 13,
  },
  {
    id: "15",
    name: "Dr. Chloe Bennett",
    role: "Associate Professor",
    avatar: "CB",
    empId: "EMP-11943",
    subjects: ["Computer Architecture"],
    sections: "03",
    students: "155",
    teachingHours: 14,
  },
];

export default function HodFacultyPage() {
  const [facultyList, setFacultyList] = useState<FacultyItem[]>(initialFacultyData);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Filter State & Ref for click-outside
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [subjectFilter, setSubjectFilter] = useState("ALL");
  const [hoursFilter, setHoursFilter] = useState("ALL");
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

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    role: "Assistant Professor",
    empId: "",
    subjects: "",
    sections: "02",
    students: "120",
    teachingHours: "12",
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
      role: "Assistant Professor",
      empId: "",
      subjects: "",
      sections: "02",
      students: "120",
      teachingHours: "12",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: FacultyItem) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      role: item.role,
      empId: item.empId,
      subjects: item.subjects.join(", "),
      sections: item.sections,
      students: item.students,
      teachingHours: item.teachingHours.toString(),
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    // Generate Initials
    const nameParts = formData.name.trim().split(" ");
    let initials = "FC";
    if (nameParts.length >= 2) {
      initials = `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
    } else if (nameParts.length === 1 && nameParts[0].length > 0) {
      initials = nameParts[0].substring(0, 2).toUpperCase();
    }

    const generatedEmpId = formData.empId.trim()
      ? formData.empId.trim()
      : `EMP-${Math.floor(10000 + Math.random() * 90000)}`;

    const parsedSubjects = formData.subjects.trim()
      ? formData.subjects.split(",").map((s) => s.trim()).filter(Boolean)
      : ["General CS"];

    if (editingId) {
      // Edit existing
      setFacultyList((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                name: formData.name.trim(),
                role: formData.role,
                empId: generatedEmpId,
                subjects: parsedSubjects,
                sections: formData.sections.padStart(2, "0"),
                students: formData.students,
                teachingHours: Number(formData.teachingHours) || 12,
              }
            : item
        )
      );
    } else {
      // Add new
      const newItem: FacultyItem = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        role: formData.role,
        avatar: initials,
        empId: generatedEmpId,
        subjects: parsedSubjects,
        sections: formData.sections.padStart(2, "0"),
        students: formData.students,
        teachingHours: Number(formData.teachingHours) || 12,
      };
      setFacultyList((prev) => [newItem, ...prev]);
    }

    setIsModalOpen(false);
  };

  // Filter Logic
  const filteredFaculty = facultyList.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.empId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subjects.some((sub) => sub.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRole = roleFilter === "ALL" || item.role === roleFilter;

    const matchesSubject =
      subjectFilter === "ALL" ||
      item.subjects.some((sub) => sub.toLowerCase() === subjectFilter.toLowerCase());

    let matchesHours = true;
    if (hoursFilter === "0-8") matchesHours = item.teachingHours <= 8;
    else if (hoursFilter === "8-12") matchesHours = item.teachingHours > 8 && item.teachingHours <= 12;
    else if (hoursFilter === "12-16") matchesHours = item.teachingHours > 12 && item.teachingHours <= 16;
    else if (hoursFilter === "16+") matchesHours = item.teachingHours > 16;

    return matchesSearch && matchesRole && matchesSubject && matchesHours;
  });

  // Pagination Slice
  const totalPages = Math.ceil(filteredFaculty.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredFaculty.length);
  const paginatedFaculty = filteredFaculty.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={styles.container}>
      {/* Top Header Row */}
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>Faculty Management</h1>
          <p className={styles.subtitle}>
            Directory of all academic staff and assigned teaching workloads.
          </p>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.searchWrapper}>
            <Search size={16} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search faculty..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div style={{ position: "relative" }} ref={filterRef}>
            <button 
              className={styles.filterBtn}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={16} />
              <span>Filter</span>
            </button>

            {isFilterOpen && (
              <div 
                style={{
                  position: "absolute",
                  right: 0,
                  top: "calc(100% + 8px)",
                  width: "260px",
                  backgroundColor: "#ffffff",
                  border: "1px solid var(--surface-border)",
                  borderRadius: "10px",
                  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                  padding: "16px",
                  zIndex: 50,
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "#334155" }}>Filter Options</span>
                  <button
                    onClick={() => {
                      setRoleFilter("ALL");
                      setSubjectFilter("ALL");
                      setHoursFilter("ALL");
                    }}
                    style={{ background: "none", border: "none", color: "#00522E", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer" }}
                  >
                    Reset All
                  </button>
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Academic Rank</label>
                  <select
                    className={styles.filterSelect}
                    value={roleFilter}
                    onChange={(e) => {
                      setRoleFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="ALL">All Roles</option>
                    <option value="Professor">Professor</option>
                    <option value="Associate Professor">Associate Professor</option>
                    <option value="Assistant Professor">Assistant Professor</option>
                    <option value="Senior Faculty">Senior Faculty</option>
                    <option value="Lab Instructor">Lab Instructor</option>
                    <option value="HOD (In-charge)">HOD (In-charge)</option>
                  </select>
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Subject</label>
                  <select
                    className={styles.filterSelect}
                    value={subjectFilter}
                    onChange={(e) => {
                      setSubjectFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="ALL">All Subjects</option>
                    <option value="Data Structures">Data Structures</option>
                    <option value="Algorithms">Algorithms</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Operating Systems">Operating Systems</option>
                    <option value="Database Management">Database Management</option>
                    <option value="Web Technologies">Web Technologies</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Computer Networks">Computer Networks</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                  </select>
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Teaching Hours</label>
                  <select
                    className={styles.filterSelect}
                    value={hoursFilter}
                    onChange={(e) => {
                      setHoursFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="ALL">All Hours</option>
                    <option value="0-8">0-8 hrs / wk</option>
                    <option value="8-12">8-12 hrs / wk</option>
                    <option value="12-16">12-16 hrs / wk</option>
                    <option value="16+">16+ hrs / wk</option>
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
            <span>Add Faculty</span>
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className={styles.tableCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Faculty Name</th>
                <th>Employee ID</th>
                <th>Assigned Subjects</th>
                <th>Sections</th>
                <th>Students</th>
                <th>Teaching Hours</th>
                <th style={{ textAlign: "right", paddingRight: "20px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedFaculty.length > 0 ? (
                paginatedFaculty.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className={styles.facultyProfile}>
                        <div className={styles.avatarCircle}>{item.avatar}</div>
                        <div className={styles.facultyDetails}>
                          <span className={styles.facultyName}>{item.name}</span>
                          <span className={styles.facultyRole}>{item.role}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={styles.empIdText}>{item.empId}</span>
                    </td>
                    <td>
                      <div className={styles.subjectBadges}>
                        {item.subjects.map((sub, idx) => (
                          <span key={idx} className={styles.subjectBadge}>
                            {sub}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <span className={styles.statValueText}>{item.sections}</span>
                    </td>
                    <td>
                      <span className={styles.statValueText}>{item.students}</span>
                    </td>
                    <td>
                      <span className={styles.teachingHoursBadge}>
                        <Clock size={13} />
                        {item.teachingHours} hrs/wk
                      </span>
                    </td>
                    <td style={{ textAlign: "right", paddingRight: "20px" }}>
                      <div className={styles.actionsGroup}>
                        <button 
                          className={styles.actionCellBtn}
                          title={`View ${item.name}`}
                          aria-label={`View ${item.name}`}
                        >
                          <Eye size={17} />
                        </button>
                        <button 
                          className={styles.actionCellBtn}
                          title={`Edit ${item.name}`}
                          aria-label={`Edit ${item.name}`}
                          onClick={() => openEditModal(item)}
                        >
                          <Pencil size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "32px", color: "var(--text-muted)" }}>
                    No faculty members found matching the selected filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination */}
        <div className={styles.paginationRow}>
          <div className={styles.paginationText}>
            Showing <strong>{filteredFaculty.length === 0 ? 0 : startIndex + 1}-{endIndex}</strong> of <strong>{filteredFaculty.length}</strong> faculty members
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
              disabled={currentPage === totalPages || filteredFaculty.length === 0}
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
            <span className={styles.summaryTitle}>Total Faculty Count</span>
            <div className={styles.summaryValue}>{facultyList.length}</div>
            <div className={styles.summarySubtext}>
              <span className={styles.subtextGreen}>100% Active</span> status across department
            </div>
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.iconCircleBlue}>
            <BookOpen size={22} />
          </div>
          <div className={styles.summaryInfo}>
            <span className={styles.summaryTitle}>Assigned Sections</span>
            <div className={styles.summaryValue}>16</div>
            <div className={styles.summarySubtext}>Active teaching sections</div>
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.iconCircleDark}>
            <Users size={22} />
          </div>
          <div className={styles.summaryInfo}>
            <span className={styles.summaryTitle}>Total Student Coverage</span>
            <div className={styles.summaryValue}>1,842</div>
            <div className={styles.summarySubtext}>1:44 Faculty-Student Ratio</div>
          </div>
        </div>
      </div>

      {/* Add / Edit Faculty Popup Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div 
            className={styles.modalContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleArea}>
                <h2 className={styles.modalTitle}>
                  {editingId ? "Edit Faculty Details" : "Add New Faculty Member"}
                </h2>
                <p className={styles.modalSubtitle}>
                  {editingId 
                    ? "Update academic designation, subjects, and teaching workload hours." 
                    : "Enter faculty details to assign subjects, sections, and teaching hours."}
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
                      placeholder="e.g. Dr. Jane Doe"
                      className={styles.formInput}
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Academic Rank / Role *</label>
                    <select
                      name="role"
                      className={styles.formSelect}
                      value={formData.role}
                      onChange={handleInputChange}
                    >
                      <option value="Professor">Professor</option>
                      <option value="Associate Professor">Associate Professor</option>
                      <option value="Assistant Professor">Assistant Professor</option>
                      <option value="Senior Faculty">Senior Faculty</option>
                      <option value="Lab Instructor">Lab Instructor</option>
                      <option value="HOD (In-charge)">HOD (In-charge)</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Employee ID</label>
                    <input
                      type="text"
                      name="empId"
                      placeholder="e.g. EMP-10492"
                      className={styles.formInput}
                      value={formData.empId}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Teaching Hours / Week *</label>
                    <input
                      type="number"
                      name="teachingHours"
                      min="1"
                      required
                      placeholder="e.g. 14"
                      className={styles.formInput}
                      value={formData.teachingHours}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Assigned Sections</label>
                    <input
                      type="text"
                      name="sections"
                      placeholder="e.g. 03"
                      className={styles.formInput}
                      value={formData.sections}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Total Students Count</label>
                    <input
                      type="number"
                      name="students"
                      placeholder="e.g. 140"
                      className={styles.formInput}
                      value={formData.students}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.formGroupFull}>
                    <label className={styles.formLabel}>Assigned Subjects (comma separated)</label>
                    <input
                      type="text"
                      name="subjects"
                      placeholder="e.g. Data Structures, Machine Learning"
                      className={styles.formInput}
                      value={formData.subjects}
                      onChange={handleInputChange}
                    />
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
                  {editingId ? "Save Changes" : "Add Faculty"}
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
            Faculty Portal Guide
          </Link>
        </div>
      </footer>
    </div>
  );
}
