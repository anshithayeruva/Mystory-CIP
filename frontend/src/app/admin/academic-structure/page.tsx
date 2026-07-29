"use client";

import { useState } from "react";
import styles from "./academic.module.css";
import PageHeader from "./components/PageHeader";
import Tabs from "./components/Tabs";

import { CheckCircle } from "lucide-react";

// Department Components
import DepartmentFilterBar from "./components/DepartmentFilterBar";
import DepartmentTable, { INITIAL_DEPARTMENTS, Department } from "./components/DepartmentTable";
import CreateDepartmentDrawer from "./components/CreateDepartmentDrawer";

// Program Components
import ProgramFilterBar from "./components/ProgramFilterBar";
import ProgramTable, { INITIAL_PROGRAMS, Program } from "./components/ProgramTable";
import ProgramInsights from "./components/ProgramInsights";
import CreateProgramDrawer from "./components/CreateProgramDrawer";
import { BookOpen } from "lucide-react";

export default function AcademicStructurePage() {
  const [activeTab, setActiveTab] = useState("departments");
  const [departments, setDepartments] = useState<Department[]>(INITIAL_DEPARTMENTS);
  const [programs, setPrograms] = useState<Program[]>(INITIAL_PROGRAMS);
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProgramDrawerOpen, setIsProgramDrawerOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleCreateDepartment = (name: string, hodName: string) => {
    // Generate a new ID based on current length
    const newId = departments.length > 0 ? Math.max(...departments.map(d => d.id)) + 1 : 1;
    
    // Create new department object with 0 stats
    const newDept: Department = {
      id: newId,
      name,
      hodName,
      programs: 0,
      staff: 0,
      students: 0,
      icon: CheckCircle // Fallback icon for new departments
    };

    setDepartments([...departments, newDept]);
    setIsDrawerOpen(false);
    
    setToastMessage("Department created successfully.");
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleCreateProgram = (name: string, department: string, degreeLevel: string, duration: string) => {
    const newId = programs.length > 0 ? Math.max(...programs.map(p => p.id)) + 1 : 1;
    
    const newProg: Program = {
      id: newId,
      name,
      department,
      duration,
      students: "0 Students",
      badge: "New",
      icon: BookOpen, // Fallback icon
      iconStyle: styles.iconBlue,
      curriculum: "Not Assigned"
    };

    setPrograms([...programs, newProg]);
    setIsProgramDrawerOpen(false);
    
    setToastMessage("Program created successfully.");
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div className={styles.pageContainer}>
      <PageHeader 
        activeTab={activeTab} 
        onCreateClick={() => {
          if (activeTab === "departments") {
            setIsDrawerOpen(true);
          } else if (activeTab === "programs") {
            setIsProgramDrawerOpen(true);
          }
        }} 
      />
      
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "departments" && (
        <>
          <DepartmentFilterBar />
          <div className={styles.tableCard}>
            <DepartmentTable departments={departments} />
          </div>
        </>
      )}

      {activeTab === "programs" && (
        <>
          <ProgramFilterBar />
          <div className={styles.tableCard}>
            <ProgramTable programs={programs} />
          </div>
        </>
      )}

      {activeTab === "programs" && <ProgramInsights />}
      
      {activeTab === "departments" && (
        <div className={styles.footerSection}>
          <span className={styles.footerText}>© 2024 MyStory CIP Academic Management. All rights reserved.</span>
          <div className={styles.footerLinks}>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Documentation</a>
          </div>
        </div>
      )}

      {/* Slide-over Drawers */}
      <CreateDepartmentDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        onSubmit={handleCreateDepartment}
      />
      
      <CreateProgramDrawer 
        isOpen={isProgramDrawerOpen}
        onClose={() => setIsProgramDrawerOpen(false)}
        departments={departments}
        onSubmit={handleCreateProgram}
      />

      {/* Success Toast */}
      {showToast && (
        <div className={styles.toastNotification}>
          <CheckCircle size={18} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
