import React from 'react';
import { Plus, Search, Book, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import styles from '@/modules/faculty/styles/faculty.module.css';

export default function SubjectsPage() {
  return (
    <div className={styles.pageContainer}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb} style={{ marginBottom: 24 }}>
        <span>Dashboard</span>
        <span>{'>'}</span>
        <span>Faculty</span>
        <span>{'>'}</span>
        <span className={styles.breadcrumbCurrent} style={{ color: '#10633B' }}>Subjects</span>
      </div>

      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderLeft}>
          <h1 className={styles.pageTitle}>Subject Configuration</h1>
          <p className={styles.pageSubtitle}>
            Manage all assigned subjects, syllabus documents, course outcomes, units and topics.
          </p>
        </div>
        <Link href="/faculty/subjects/create" style={{ textDecoration: 'none' }}>
          <button className={styles.primaryButton}>
            <Plus size={18} />
            <span>Create Subject</span>
          </button>
        </Link>
      </div>

      {/* Filter Section */}
      <div className={styles.filterCard}>
        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} size={18} />
          <input 
            type="text" 
            placeholder="Search subject by name or code..." 
            className={styles.searchInput} 
          />
        </div>
        
        <select className={styles.dropdownInput} defaultValue="">
          <option value="" disabled>Department</option>
          <option value="CSE">Computer Science</option>
          <option value="ECE">Electronics</option>
        </select>

        <select className={styles.dropdownInput} defaultValue="">
          <option value="" disabled>Program</option>
          <option value="BTECH">B.Tech</option>
          <option value="MTECH">M.Tech</option>
        </select>

        <select className={styles.dropdownInput} defaultValue="">
          <option value="" disabled>Semester</option>
          <option value="1">Semester 1</option>
          <option value="2">Semester 2</option>
          <option value="3">Semester 3</option>
          <option value="4">Semester 4</option>
        </select>

        <button className={styles.resetButton} title="Reset filters">
          Reset
        </button>
      </div>

      {/* Subject Table Card */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>All Subjects (0)</h2>
        </div>

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
            {/* Empty State triggers when no rows exist */}
          </tbody>
        </table>

        {/* Empty State */}
        <div className={styles.emptyState}>
          <Book size={48} className={styles.emptyStateIcon} strokeWidth={1.5} />
          <h3 className={styles.emptyStateTitle}>No subjects found</h3>
          <p className={styles.emptyStateSubtitle}>
            Try adjusting your filters or create a new subject.
          </p>
        </div>
      </div>
    </div>
  );
}
