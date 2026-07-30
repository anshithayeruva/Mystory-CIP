"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import SubjectFilterBar from "./components/SubjectFilterBar";
import SubjectTable, { Subject } from "./components/SubjectTable";
import styles from "./subjects.module.css";

// Mock Data
const MOCK_SUBJECTS: Subject[] = [
  {
    id: "1",
    name: "Data Structures and Algorithms",
    code: "CS201",
    department: "Computer Science",
    program: "B.Tech",
    semester: "Semester 3",
    assignedFaculty: "Dr. Alan Turing"
  },
  {
    id: "2",
    name: "Database Management Systems",
    code: "CS301",
    department: "Computer Science",
    program: "B.Tech",
    semester: "Semester 5",
    assignedFaculty: "Dr. Edgar Codd"
  },
  {
    id: "3",
    name: "Thermodynamics",
    code: "ME205",
    department: "Mechanical Engineering",
    program: "B.Tech",
    semester: "Semester 3",
    assignedFaculty: "Dr. Nicolas Carnot"
  },
  {
    id: "4",
    name: "Electromagnetic Theory",
    code: "EE302",
    department: "Electrical Engineering",
    program: "B.Tech",
    semester: "Semester 4",
    assignedFaculty: "Dr. James Maxwell"
  },
  {
    id: "5",
    name: "Machine Learning",
    code: "CS405",
    department: "Computer Science",
    program: "M.Tech",
    semester: "Semester 1",
    assignedFaculty: "Dr. Geoffrey Hinton"
  },
];

export default function FacultySubjectsPage() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [program, setProgram] = useState("");
  const [semester, setSemester] = useState("");

  const handleReset = () => {
    setSearch("");
    setDepartment("");
    setProgram("");
    setSemester("");
  };

  const filteredData = useMemo(() => {
    return MOCK_SUBJECTS.filter((subject) => {
      const matchSearch = search.trim() === "" || 
        subject.name.toLowerCase().includes(search.toLowerCase()) || 
        subject.code.toLowerCase().includes(search.toLowerCase());
      const matchDept = department === "" || subject.department === department;
      const matchProgram = program === "" || subject.program === program;
      const matchSemester = semester === "" || subject.semester === semester;
      
      return matchSearch && matchDept && matchProgram && matchSemester;
    });
  }, [search, department, program, semester]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>Subject Configuration</h1>
          <p className={styles.subtitle}>
            Manage all assigned subjects, syllabus documents, course outcomes, units and topics.
          </p>
        </div>
        <Link href="/faculty/subjects/create" className={styles.primaryButton}>
          <Plus size={18} />
          Create Subject
        </Link>
      </div>

      <div className={styles.mainCard}>
        <SubjectFilterBar 
          search={search}
          setSearch={setSearch}
          department={department}
          setDepartment={setDepartment}
          program={program}
          setProgram={setProgram}
          semester={semester}
          setSemester={setSemester}
          onReset={handleReset}
        />
        <div className={styles.tableHeaderRow}>
          <h2 className={styles.tableTitle}>All Subjects</h2>
        </div>
        <SubjectTable data={filteredData} />
      </div>
    </div>
  );
}
