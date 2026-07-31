"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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

function AcademicStructureContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "departments";
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [departments, setDepartments] = useState<Department[]>(INITIAL_DEPARTMENTS);
  const [programs, setPrograms] = useState<Program[]>(INITIAL_PROGRAMS);
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProgramDrawerOpen, setIsProgramDrawerOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);

  useEffect(() => {
    fetchDepartments();
    fetchPrograms();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/academic/departments');
      if (res.ok) {
        const data = await res.json();
        // Map the backend data to match the UI component's expected shape
        const mapped = data.data.map((d: any) => ({
          id: d.id, // we might need to change id to string in the interface later if needed, but for now we'll pass it as is. If interface is number, this might be a type error since mongo ID is string. Let's cast as any in the component if needed.
          name: d.name,
          hodName: d.hodName,
          programs: d.programs,
          faculty: d.faculty,
          students: d.students,
          icon: CheckCircle // Fallback icon
        }));
        setDepartments(mapped);
      }
    } catch (error) {
      console.error("Failed to fetch departments", error);
    }
  };

  const fetchPrograms = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/academic/programs');
      if (res.ok) {
        const data = await res.json();
        const mapped = data.data.map((p: any) => ({
          id: p.id,
          name: p.name,
          department: p.department,
          duration: p.duration,
          students: `${p.students} Students`,
          badge: "", // Removed per previous request
          icon: BookOpen,
          iconStyle: styles.iconBlue,
          curriculum: p.curriculum
        }));
        setPrograms(mapped);
      }
    } catch (error) {
      console.error("Failed to fetch programs", error);
    }
  };

  const handleCreateDepartment = async (name: string, hodName: string, description?: string, id?: string) => {
    try {
      const url = id ? `http://localhost:5000/api/academic/departments/${id}` : 'http://localhost:5000/api/academic/departments';
      const method = id ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, hodName, description })
      });
      
      if (res.ok) {
        setIsDrawerOpen(false);
        setEditingDepartment(null);
        setToastMessage(`Department ${id ? 'updated' : 'created'} successfully.`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        fetchDepartments(); // Refresh data
      } else {
        const data = await res.json();
        alert(data.error || `Failed to ${id ? 'update' : 'create'} department`);
      }
    } catch (error) {
      console.error(`Error ${id ? 'updating' : 'creating'} department`, error);
    }
  };

  const handleDeleteDepartment = async (id: string | number) => {
    if (!window.confirm("Are you sure you want to delete this department?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/academic/departments/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setToastMessage("Department deleted successfully.");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        fetchDepartments();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete department");
      }
    } catch (error) {
      console.error("Error deleting department", error);
    }
  };

  const handleCreateProgram = async (name: string, departmentName: string, degreeLevel: string, duration: string, intake?: string, description?: string, id?: string) => {
    try {
      const url = id ? `http://localhost:5000/api/academic/programs/${id}` : 'http://localhost:5000/api/academic/programs';
      const method = id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, departmentName, degreeLevel, duration, intake, description })
      });

      if (res.ok) {
        setIsProgramDrawerOpen(false);
        setEditingProgram(null);
        setToastMessage(`Program ${id ? 'updated' : 'created'} successfully.`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        fetchPrograms(); // Refresh data
      } else {
        const data = await res.json();
        alert(data.error || `Failed to ${id ? 'update' : 'create'} program`);
      }
    } catch (error) {
      console.error(`Error ${id ? 'updating' : 'creating'} program`, error);
    }
  };

  const handleDeleteProgram = async (id: string | number) => {
    if (!window.confirm("Are you sure you want to delete this program?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/academic/programs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setToastMessage("Program deleted successfully.");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        fetchPrograms();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete program");
      }
    } catch (error) {
      console.error("Error deleting program", error);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <PageHeader 
        activeTab={activeTab} 
        onCreateClick={() => {
          if (activeTab === "departments") {
            setEditingDepartment(null);
            setIsDrawerOpen(true);
          } else if (activeTab === "programs") {
            setEditingProgram(null);
            setIsProgramDrawerOpen(true);
          }
        }} 
      />
      
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "departments" && (
        <>
          <div className={styles.tableCard}>
            <DepartmentTable 
              departments={departments} 
              onEdit={(dept) => {
                setEditingDepartment(dept);
                setIsDrawerOpen(true);
              }}
              onDelete={handleDeleteDepartment}
            />
          </div>
        </>
      )}

      {activeTab === "programs" && (
        <>
          <div className={styles.tableCard}>
            <ProgramTable 
              programs={programs} 
              onEdit={(prog) => {
                setEditingProgram(prog);
                setIsProgramDrawerOpen(true);
              }}
              onDelete={handleDeleteProgram}
            />
          </div>
        </>
      )}


      
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
        onClose={() => {
          setIsDrawerOpen(false);
          setEditingDepartment(null);
        }} 
        onSubmit={handleCreateDepartment}
        initialData={editingDepartment}
      />
      
      <CreateProgramDrawer 
        isOpen={isProgramDrawerOpen}
        onClose={() => {
          setIsProgramDrawerOpen(false);
          setEditingProgram(null);
        }}
        departments={departments}
        onSubmit={handleCreateProgram}
        initialData={editingProgram}
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

export default function AcademicStructurePage() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Loading academic structure...</div>}>
      <AcademicStructureContent />
    </Suspense>
  );
}
