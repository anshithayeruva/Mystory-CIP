/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, Edit, Trash2, BookOpen, Download, Upload, PlusCircle, 
  ChevronDown, ChevronUp, FileText, CheckCircle, Eye
} from 'lucide-react';
import styles from '../subjects.module.css';

export default function SubjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [subject, setSubject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>({});

  const fetchSubjectDetails = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/faculty/subjects/${id}`, {
        credentials: 'include'
      });
      if (res.ok) {
        const json = await res.json();
        setSubject(json.data);
      } else {
        router.push('/faculty/subjects');
      }
    } catch (error) {
      console.error("Failed to fetch subject details", error);
    } finally {
      setLoading(false);
    }
  }, [id, router]);

  useEffect(() => {
    fetchSubjectDetails();
  }, [fetchSubjectDetails]);

  const handleDeleteSubject = async () => {
    if (confirm('Are you sure you want to delete this subject entirely?')) {
      try {
        const res = await fetch(`/api/faculty/subjects/${id}`, { 
          method: 'DELETE',
          credentials: 'include'
        });
        if (res.ok) {
          router.push('/faculty/subjects');
        }
      } catch (error) {
        console.error("Delete failed", error);
      }
    }
  };

  const toggleUnit = (unitId: string) => {
    setExpandedUnits(prev => ({
      ...prev,
      [unitId]: !prev[unitId]
    }));
  };

  if (loading) {
    return <div style={{ padding: '24px' }}>Loading subject details...</div>;
  }

  if (!subject) {
    return <div style={{ padding: '24px' }}>Subject not found.</div>;
  }

  return (
    <div className="dashboard-scroll">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-title-section">
          <div className="breadcrumb">
            <Link href="/faculty/subjects">Faculty</Link> &gt; 
            <Link href="/faculty/subjects">Subjects</Link> &gt; 
            Subject Details
          </div>
          <h1 className="page-title" style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            {subject.name} 
            <span style={{ fontSize: '0.85rem', backgroundColor: '#e2e8f0', padding: '2px 8px', borderRadius: '4px', color: '#334155' }}>
              {subject.code}
            </span>
          </h1>
          <div className="page-tags">
            <span className="tag">Department: {subject.department?.name || '-'}</span>
            <span className="tag">Program: {subject.program?.name || '-'}</span>
            <span className="tag">Semester: {subject.semester || '-'}</span>
          </div>
        </div>
        <div className="page-actions">
          <Link href="/faculty/subjects">
            <button className="btn btn-secondary">
              <ArrowLeft size={16} /> Back to Subjects
            </button>
          </Link>
          <Link href={`/faculty/subjects/edit/${id}`}>
            <button className="btn btn-primary" style={{ backgroundColor: 'white', color: '#10633B', border: '1px solid #10633B' }}>
              <Edit size={16} /> Edit Subject
            </button>
          </Link>
          <button className="btn btn-danger" onClick={handleDeleteSubject}>
            <Trash2 size={16} /> Delete Subject
          </button>
        </div>
      </div>

      <div className={styles.container}>
        
        {/* Top Cards Row */}
        <div style={{ display: 'flex', gap: '24px' }}>
          
          {/* Overview Card */}
          <div className={styles.card} style={{ flex: 2 }}>
            <h2 className={styles.sectionTitle}>Subject Information</h2>
            <div className={styles.divider}></div>
            <div className={styles.formGrid}>
              <div>
                <div className={styles.formLabel}>Subject Name</div>
                <div style={{ marginTop: '4px', color: '#475569' }}>{subject.name}</div>
              </div>
              <div>
                <div className={styles.formLabel}>Program</div>
                <div style={{ marginTop: '4px', color: '#475569' }}>{subject.program?.name || 'N/A'}</div>
              </div>
              <div>
                <div className={styles.formLabel}>Subject Code</div>
                <div style={{ marginTop: '4px', color: '#475569' }}>{subject.code}</div>
              </div>
              <div>
                <div className={styles.formLabel}>Semester</div>
                <div style={{ marginTop: '4px', color: '#475569' }}>{subject.semester || 'N/A'}</div>
              </div>
              <div>
                <div className={styles.formLabel}>Department</div>
                <div style={{ marginTop: '4px', color: '#475569' }}>{subject.department?.name || 'N/A'}</div>
              </div>
              <div>
                <div className={styles.formLabel}>Credits</div>
                <div style={{ marginTop: '4px', color: '#475569' }}>{subject.credits || 'N/A'}</div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <div className={styles.formLabel}>Description</div>
                <div style={{ marginTop: '4px', color: '#475569' }}>{subject.description || 'No description provided.'}</div>
              </div>
            </div>
          </div>

          {/* Syllabus Card */}
          <div className={styles.card} style={{ flex: 1 }}>
            <h2 className={styles.sectionTitle}>Syllabus Document</h2>
            <div className={styles.divider}></div>
            {subject.syllabus ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '16px' }}>
                <FileText size={48} color="#ef4444" />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 600 }}>{subject.syllabus.originalFileName}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>
                    Uploaded on {new Date(subject.syllabus.uploadDate).toLocaleDateString()}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => window.open(subject.syllabus.fileUrl, '_blank')}>
                    <Eye size={14} /> View
                  </button>
                  <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => window.open(subject.syllabus.fileUrl, '_blank')}>
                    <Download size={14} /> Download
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.emptyState} style={{ padding: '20px 10px' }}>
                <BookOpen size={32} style={{ marginBottom: '12px', opacity: 0.5 }} />
                <p style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>No syllabus uploaded</p>
                <Link href={`/faculty/subjects/edit/${id}`}>
                  <button className="btn btn-outline" style={{ marginTop: '12px', fontSize: '0.8rem' }}>
                    <Upload size={14} /> Upload PDF
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Cards Row */}
        <div style={{ display: 'flex', gap: '24px' }}>
          
          {/* Course Outcomes */}
          <div className={styles.card} style={{ flex: 1 }}>
            <h2 className={styles.sectionTitle}>
              Course Outcomes ({subject.courseOutcomes?.length || 0})
              <Link href={`/faculty/subjects/edit/${id}`}>
                <span style={{ fontSize: '0.85rem', color: '#10633B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                  <PlusCircle size={14} /> Add Outcome
                </span>
              </Link>
            </h2>
            <div className={styles.divider}></div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {subject.courseOutcomes && subject.courseOutcomes.length > 0 ? (
                subject.courseOutcomes.map((co: any) => (
                  <div key={co.id} style={{ display: 'flex', gap: '12px', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                    <div style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: '4px 8px', borderRadius: '4px', fontWeight: 600, fontSize: '0.8rem', height: 'fit-content' }}>
                      {co.coNumber}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#0f172a' }}>{co.title}</div>
                      <div style={{ fontSize: '0.85rem', color: '#475569', marginTop: '4px' }}>{co.description}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.emptyState} style={{ padding: '20px' }}>
                  No outcomes defined yet.
                </div>
              )}
            </div>
          </div>

          {/* Units & Topics */}
          <div className={styles.card} style={{ flex: 1 }}>
            <h2 className={styles.sectionTitle}>
              Units ({subject.units?.length || 0})
              <Link href={`/faculty/subjects/edit/${id}`}>
                <span style={{ fontSize: '0.85rem', color: '#10633B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                  <PlusCircle size={14} /> Add Unit
                </span>
              </Link>
            </h2>
            <div className={styles.divider}></div>

            <div>
              {subject.units && subject.units.length > 0 ? (
                subject.units.map((unit: any) => {
                  const isExpanded = !!expandedUnits[unit.id];
                  return (
                    <div key={unit.id} className={styles.accordionItem}>
                      <div className={styles.accordionHeader} onClick={() => toggleUnit(unit.id)}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ color: '#10633B', fontWeight: 700 }}>Unit {unit.unitNumber}</span>
                          <span className={styles.accordionTitle}>{unit.unitName}</span>
                        </div>
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                      
                      {isExpanded && (
                        <div className={styles.accordionContent}>
                          {unit.description && (
                            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '12px' }}>
                              {unit.description}
                            </p>
                          )}
                          
                          {unit.topics && unit.topics.length > 0 ? (
                            <div className={styles.topicList}>
                              {unit.topics.map((topic: any) => (
                                <div key={topic.id} className={styles.topicItem}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <CheckCircle size={14} color="#10633B" />
                                    <span style={{ fontSize: '0.9rem', color: '#334155' }}>{topic.topicName}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontStyle: 'italic' }}>
                              No topics added to this unit.
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className={styles.emptyState} style={{ padding: '20px' }}>
                  No units defined yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
