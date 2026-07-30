import React from "react";
import { BookOpen, MoreVertical } from "lucide-react";
import styles from "../subjects.module.css";

export interface Subject {
  id: string;
  name: string;
  code: string;
  department: string;
  program: string;
  semester: string;
  assignedFaculty: string;
}

interface SubjectTableProps {
  data: Subject[];
}

export default function SubjectTable({ data }: SubjectTableProps) {
  if (data.length === 0) {
    return (
      <div className={styles.emptyState}>
        <BookOpen className={styles.emptyStateIcon} />
        <h3 className={styles.emptyStateTitle}>No subjects found</h3>
        <p className={styles.emptyStateDesc}>Try adjusting your filters or create a new subject.</p>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Subject Name</th>
            <th>Subject Code</th>
            <th>Department</th>
            <th>Program</th>
            <th>Semester</th>
            <th>Assigned Faculty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((subject) => (
            <tr key={subject.id}>
              <td className={styles.subjectName}>{subject.name}</td>
              <td>{subject.code}</td>
              <td>{subject.department}</td>
              <td>{subject.program}</td>
              <td>{subject.semester}</td>
              <td>{subject.assignedFaculty}</td>
              <td>
                <button className={styles.actionButton} title="Options">
                  <MoreVertical size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
