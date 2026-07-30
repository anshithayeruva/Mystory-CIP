"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { Building2, Clock, FileText, Printer, FileDown, ShieldCheck, Loader2 } from "lucide-react";
import styles from "./curriculum.module.css";

interface ProgramDetails {
  id: string;
  name: string;
  department: string;
  duration: string;
  degreeLevel: string;
}

interface DummyCourse {
  title: string;
  code: string;
  credits: number;
  category: string;
}

const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
const toRoman = (num: number) => romanNumerals[num - 1] || num.toString();

export default function CurriculumPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  
  const [program, setProgram] = useState<ProgramDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [years, setYears] = useState<number>(0);

  useEffect(() => {
    fetchProgramDetails();
  }, [id]);

  const fetchProgramDetails = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/academic/programs/${id}`);
      if (res.ok) {
        const data = await res.json();
        setProgram(data.data);
        
        // Parse duration, e.g. "4 Years" -> 4
        const durationStr = data.data.duration;
        const match = durationStr.match(/\d+/);
        if (match) {
          setYears(parseInt(match[0], 10));
        } else {
          setYears(1); // Default
        }
      }
    } catch (error) {
      console.error("Failed to fetch program details", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Helper to generate dummy subjects based on the program name/department for variety
  const getDummyCourses = (semesterNum: number, progName: string): DummyCourse[] => {
    const categories = ["Core Subject", "Mathematics & Sciences", "Applied Engineering", "Humanities", "Elective"];
    
    // Generate a code prefix based on program name
    const prefix = progName.split(" ").map(w => w[0]).join("").toUpperCase().substring(0, 3) || "SUB";

    return Array.from({ length: 4 }).map((_, i) => ({
      title: `Advanced Topics in ${progName.split(" ").pop()} ${i + 1}`,
      code: `${prefix}${semesterNum}0${i + 1}`,
      credits: Math.floor(Math.random() * 2) + 3, // 3 or 4
      category: categories[Math.floor(Math.random() * categories.length)],
    }));
  };

  if (loading) {
    return (
      <div className={styles.pageContainer} style={{ justifyContent: 'center', alignItems: 'center', height: '60vh', display: 'flex' }}>
        <Loader2 className={styles.spinner} size={32} />
      </div>
    );
  }

  if (!program) {
    return <div className={styles.pageContainer}>Program not found.</div>;
  }

  const totalCredits = years * 2 * 4 * 3.5; // Dummy calculation

  return (
    <div className={styles.pageContainer}>
      <div className={styles.breadcrumb}>
        <Link href="/admin">Dashboard</Link>
        <span>&gt;</span>
        <Link href="/admin/academic-structure">Academics</Link>
        <span>&gt;</span>
        <Link href="/admin/academic-structure?tab=programs">Programs</Link>
        <span>&gt;</span>
        <span className={styles.active}>{program.name} Curriculum</span>
      </div>

      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>{program.name}</h1>
          <div className={styles.metaRow}>
            <div className={styles.metaItem}>
              <Building2 size={16} />
              <span>Department: <strong>{program.department}</strong></span>
            </div>
            <div className={styles.metaItem}>
              <Clock size={16} />
              <span>Duration: <strong>{program.duration}</strong></span>
            </div>
            <div className={styles.metaItem}>
              <FileText size={16} />
              <span>Total Credits: <strong>~{Math.round(totalCredits)}</strong></span>
            </div>
          </div>
        </div>
        <div className={styles.actions}>
          <button className={styles.printBtn} onClick={handlePrint}>
            <Printer size={16} />
            Print
          </button>
          <button className={styles.downloadBtn} onClick={handlePrint}>
            <FileDown size={16} />
            Download Curriculum<br />PDF
          </button>
        </div>
      </div>

      {Array.from({ length: years }).map((_, yearIndex) => {
        const currentYear = yearIndex + 1;
        const sem1 = yearIndex * 2 + 1;
        const sem2 = yearIndex * 2 + 2;
        
        return (
          <div key={currentYear} className={styles.timelineYear}>
            <div className={styles.yearHeader}>
              <div className={styles.yearBadge}>{currentYear}</div>
              <h2 className={styles.yearTitle}>Academic Year {toRoman(currentYear)}</h2>
              <div className={styles.yearLine}></div>
            </div>

            <div className={styles.semesterGrid}>
              {/* Semester 1 of this year */}
              <div className={styles.semesterCard}>
                <div className={styles.semesterHeader}>SEMESTER {toRoman(sem1)}</div>
                <div className={styles.courseList}>
                  {getDummyCourses(sem1, program.name).map((course, idx) => (
                    <div key={idx} className={styles.courseItem}>
                      <div className={styles.courseTop}>
                        <span className={styles.courseTitle}>{course.code} - {course.title}</span>
                        <span className={styles.creditsBadge}>{course.credits.toFixed(1)} Credits</span>
                      </div>
                      <span className={styles.courseCategory}>{course.category}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Semester 2 of this year */}
              <div className={styles.semesterCard}>
                <div className={styles.semesterHeader}>SEMESTER {toRoman(sem2)}</div>
                <div className={styles.courseList}>
                  {getDummyCourses(sem2, program.name).map((course, idx) => (
                    <div key={idx} className={styles.courseItem}>
                      <div className={styles.courseTop}>
                        <span className={styles.courseTitle}>{course.code} - {course.title}</span>
                        <span className={styles.creditsBadge}>{course.credits.toFixed(1)} Credits</span>
                      </div>
                      <span className={styles.courseCategory}>{course.category}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.shieldText}>
          <ShieldCheck size={16} />
          Official Program Curriculum - Approved by Academic Council
        </div>
        <div className={styles.versionText}>
          Version {new Date().getFullYear()}.01 | Effective from Academic Year {new Date().getFullYear()}-{new Date().getFullYear() + 1}
        </div>
      </div>

    </div>
  );
}
