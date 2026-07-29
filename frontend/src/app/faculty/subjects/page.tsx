/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { apiClient } from '@/lib/apiClient';


import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { PlusCircle, Search, Eye, Edit, Trash2, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import styles from './subjects.module.css';

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Filters
  const [search, setSearch] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [programId, setProgramId] = useState('');
  const [semester, setSemester] = useState('');

  // Dropdown options (mocked endpoints for now)
  const [departments, setDepartments] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);

  const fetchSubjects = useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(search && { search }),
        ...(departmentId && { departmentId }),
        ...(programId && { programId }),
        ...(semester && { semester }),
      });

      const res = await apiClient.fetch(`/api/faculty/subjects?${query.toString()}`, {
        credentials: 'include'
      });
      if (res.ok) {
        const json = await res.json();
        setSubjects(json.data?.subjects || []);
        setTotalPages(json.data?.pagination?.totalPages || 1);
        setTotalItems(json.data?.pagination?.total || 0);
      }
    } catch (error) {
      console.error("Failed to fetch subjects:", error);
    } finally {
      setLoading(false);
    }
  }, [page, search, departmentId, programId, semester]);

  const fetchFilters = async () => {
    try {
      // These endpoints do not exist currently, but we follow the instruction to use API data only.
      const deptRes = await fetch('/api/departments').catch(() => null);
      if (deptRes && deptRes.ok) {
        const json = await deptRes.json();
        setDepartments(json.data || []);
      }
      const progRes = await fetch('/api/programs').catch(() => null);
      if (progRes && progRes.ok) {
        const json = await progRes.json();
        setPrograms(json.data || []);
      }
    } catch (e) {
      console.error("Filter fetch failed", e);
    }
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    fetchSubjects();
  }, [page, search, departmentId, programId, semester]);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this subject?')) {
      try {
        const res = await apiClient.fetch(`/api/faculty/subjects/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        if (res.ok) {
          fetchSubjects();
        } else {
          alert('Failed to delete subject.');
        }
      } catch (error) {
        console.error("Delete error", error);
      }
    }
  };

  const resetFilters = () => {
    setSearch('');
    setDepartmentId('');
    setProgramId('');
    setSemester('');
    setPage(1);
  };

  return (
    <div className="dashboard-scroll">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-title-section">

          <h1 className="page-title" style={{ marginTop: '4px' }}>Subject Configuration</h1>
          <div className="page-tags">
            <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
              Manage all assigned subjects, syllabus documents, course outcomes, units and topics.
            </span>
          </div>
        </div>
        <div className="page-actions">
          <Link href="/faculty/subjects/create">
            <button className="btn btn-primary">
              <PlusCircle size={18} /> Create Subject
            </button>
          </Link>
        </div>
      </div>

      <div className={styles.container}>
        {/* Filters */}
        <div className={styles.filters}>
          <div className={styles.filterGroup} style={{ flex: 2 }}>
            <label>Search Subject</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                className={styles.input} 
                placeholder="Search subject by name or code..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: '32px' }}
              />
              <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '10px' }} />
            </div>
          </div>
          <div className={styles.filterGroup}>
            <label>Department</label>
            <select className={styles.select} value={departmentId} onChange={(e) => setDepartmentId(e.target.value)}>
              <option value="">All</option>
              {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label>Program</label>
            <select className={styles.select} value={programId} onChange={(e) => setProgramId(e.target.value)}>
              <option value="">All</option>
              {programs.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label>Semester</label>
            <select className={styles.select} value={semester} onChange={(e) => setSemester(e.target.value)}>
              <option value="">All</option>
              {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <button className="btn btn-secondary" style={{ height: '40px' }} onClick={resetFilters}>
              Reset
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="recent-sessions-card">
          <div className="table-header">
            <span className="table-title">All Subjects ({totalItems})</span>
          </div>
          
          <table className="table-container">
            <thead>
              <tr>
                <th>Subject Name</th>
                <th>Subject Code</th>
                <th>Department</th>
                <th>Program</th>
                <th>Semester</th>
                <th>Assigned Faculty</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                    Loading subjects...
                  </td>
                </tr>
              ) : subjects.length > 0 ? (
                subjects.map((subject, i) => (
                  <tr key={subject.id || i}>
                    <td style={{ fontWeight: 600 }}>{subject.name}</td>
                    <td>{subject.code}</td>
                    <td>{subject.department?.name || '-'}</td>
                    <td>{subject.program?.name || '-'}</td>
                    <td>{subject.semester || '-'}</td>
                    <td>
                      {subject.assignedFaculty && subject.assignedFaculty.length > 0
                        ? `${subject.assignedFaculty[0].firstName} ${subject.assignedFaculty[0].lastName}` 
                        : 'You'}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                        <Link href={`/faculty/subjects/${subject.id}`}>
                          <Eye className={styles.actionIcon} size={18} />
                        </Link>
                        <Link href={`/faculty/subjects/edit/${subject.id}`}>
                          <Edit className={styles.actionIcon} size={18} />
                        </Link>
                        <Trash2 
                          className={`${styles.actionIcon} ${styles.danger}`} 
                          size={18} 
                          onClick={() => handleDelete(subject.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>
                    <div className={styles.emptyState}>
                      <BookOpen size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                      <p style={{ fontWeight: 600, color: '#334155', marginBottom: '8px' }}>No subjects found</p>
                      <p>Try adjusting your filters or create a new subject.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className={styles.pagination} style={{ padding: '20px' }}>
              <button 
                className={styles.pageBtn} 
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
              >
                <ChevronLeft size={16} />
              </button>
              
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button 
                  key={idx}
                  className={`${styles.pageBtn} ${page === idx + 1 ? styles.active : ''}`}
                  onClick={() => setPage(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}

              <button 
                className={styles.pageBtn} 
                disabled={page === totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
