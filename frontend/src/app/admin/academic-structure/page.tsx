"use client";

import { useState } from "react";
import styles from "./academic.module.css";
import PageHeader from "./components/PageHeader";
import Tabs from "./components/Tabs";

// Subject Components
import FilterBar from "./components/FilterBar";
import SubjectTable from "./components/SubjectTable";
import SummaryCards from "./components/SummaryCards";

// Program Components
import ProgramFilterBar from "./components/ProgramFilterBar";
import ProgramTable from "./components/ProgramTable";
// Using SummaryCards for programs since they are similar and the screenshot is cut off.

// Department Components
import DepartmentFilterBar from "./components/DepartmentFilterBar";
import DepartmentTable from "./components/DepartmentTable";
import DepartmentSummaryCards from "./components/DepartmentSummaryCards";

export default function AcademicStructurePage() {
  const [activeTab, setActiveTab] = useState("subjects");

  return (
    <div className={styles.pageContainer}>
      <PageHeader />
      
      <div className={styles.mainCard}>
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        {activeTab === "subjects" && (
          <>
            <FilterBar />
            <SubjectTable />
          </>
        )}

        {activeTab === "programs" && (
          <>
            <ProgramFilterBar />
            <ProgramTable />
          </>
        )}

        {activeTab === "departments" && (
          <>
            <DepartmentFilterBar />
            <DepartmentTable />
          </>
        )}
      </div>

      {activeTab === "subjects" && <SummaryCards />}
      {activeTab === "programs" && <SummaryCards />}
      {activeTab === "departments" && <DepartmentSummaryCards />}
    </div>
  );
}
