/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, Trash2, Upload, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import styles from './subjects.module.css';

interface SubjectFormProps {
  initialData?: any;
  isEdit?: boolean;
  subjectId?: string;
}

export default function SubjectForm({ initialData, isEdit, subjectId }: SubjectFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Dropdown data (mocked)
  const [departments, setDepartments] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);

  // Section 1: Subject Info
  const [name, setName] = useState(initialData?.name || '');
  const [code, setCode] = useState(initialData?.code || '');
  const [departmentId, setDepartmentId] = useState(initialData?.departmentId || '');
  const [programId, setProgramId] = useState(initialData?.programId || '');
  const [semester, setSemester] = useState(initialData?.semester || '');
  const [credits, setCredits] = useState(initialData?.credits || '');
  const [description, setDescription] = useState(initialData?.description || '');

  // Section 2: Syllabus
  // Syllabus upload logic would go here, currently using placeholder UI

  // Section 3: Course Outcomes
  const [outcomes, setOutcomes] = useState<any[]>(initialData?.courseOutcomes || []);

  // Section 4: Units and Topics
  const [units, setUnits] = useState<any[]>(initialData?.units || []);
  const [expandedUnits, setExpandedUnits] = useState<Record<number, boolean>>({});

  useEffect(() => {
    // Fetch departments and programs
    const fetchOptions = async () => {
      try {
        const deptRes = await fetch('/api/departments').catch(() => null);
        if (deptRes?.ok) setDepartments((await deptRes.json()).data || []);
        const progRes = await fetch('/api/programs').catch(() => null);
        if (progRes?.ok) setPrograms((await progRes.json()).data || []);
      } catch (err) {
        console.error("Failed to fetch dropdown options", err);
      }
    };
    fetchOptions();
  }, []);

  const handleAddOutcome = () => {
    setOutcomes([...outcomes, { coNumber: `CO${outcomes.length + 1}`, title: '', description: '' }]);
  };

  const handleUpdateOutcome = (index: number, field: string, value: string) => {
    const updated = [...outcomes];
    updated[index][field] = value;
    setOutcomes(updated);
  };

  const handleRemoveOutcome = (index: number) => {
    setOutcomes(outcomes.filter((_, i) => i !== index));
  };

  const handleAddUnit = () => {
    const nextUnitNum = units.length + 1;
    setUnits([...units, { unitNumber: nextUnitNum, unitName: '', description: '', topics: [] }]);
    setExpandedUnits({ ...expandedUnits, [units.length]: true });
  };

  const handleUpdateUnit = (index: number, field: string, value: string | number) => {
    const updated = [...units];
    updated[index][field] = value;
    setUnits(updated);
  };

  const handleRemoveUnit = (index: number) => {
    setUnits(units.filter((_, i) => i !== index));
  };

  const handleAddTopic = (unitIndex: number) => {
    const updated = [...units];
    updated[unitIndex].topics.push({ topicName: '', description: '' });
    setUnits(updated);
  };

  const handleUpdateTopic = (unitIndex: number, topicIndex: number, field: string, value: string) => {
    const updated = [...units];
    updated[unitIndex].topics[topicIndex][field] = value;
    setUnits(updated);
  };

  const handleRemoveTopic = (unitIndex: number, topicIndex: number) => {
    const updated = [...units];
    updated[unitIndex].topics = updated[unitIndex].topics.filter((_: any, i: number) => i !== topicIndex);
    setUnits(updated);
  };

  const toggleUnit = (index: number) => {
    setExpandedUnits(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !code || !departmentId || !credits) {
      setError('Please fill in all required fields (Name, Code, Department, Credits).');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      // 1. Create or Update Subject
      const subjectPayload = {
        name,
        code,
        departmentId,
        programId: programId || undefined,
        semester: semester ? parseInt(semester.toString()) : undefined,
        credits: parseInt(credits.toString()),
      };

      let targetSubjectId = subjectId;

      if (isEdit && targetSubjectId) {
        const res = await fetch(`/api/faculty/subjects/${targetSubjectId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(subjectPayload)
        });
        if (!res.ok) throw new Error('Failed to update subject info');
      } else {
        const res = await fetch(`/api/faculty/subjects`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(subjectPayload)
        });
        if (!res.ok) throw new Error('Failed to create subject');
        const json = await res.json();
        targetSubjectId = json.data.id;
      }

      if (!targetSubjectId) throw new Error("Missing subject ID");

      // Note: Full Syllabus upload and dynamic outcome/unit creation would require chained calls here.
      // Since this is a massive enterprise form, we execute them sequentially or Promise.all.
      
      // 2. Add Outcomes (for creation only, edit would require diffing which is complex for a simple mock)
      if (!isEdit && outcomes.length > 0) {
        for (const out of outcomes) {
          if (out.title && out.coNumber) {
            await fetch(`/api/faculty/subjects/${targetSubjectId}/outcomes`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ coNumber: out.coNumber, title: out.title, description: out.description || ' ' })
            });
          }
        }
      }

      // 3. Add Units & Topics (for creation only)
      if (!isEdit && units.length > 0) {
        for (const unit of units) {
          if (unit.unitName) {
            const unitRes = await fetch(`/api/faculty/subjects/${targetSubjectId}/units`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ unitNumber: unit.unitNumber, unitName: unit.unitName, description: unit.description })
            });
            
            if (unitRes.ok) {
              const uJson = await unitRes.json();
              const newUnitId = uJson.data.id;
              
              if (unit.topics && unit.topics.length > 0) {
                for (const topic of unit.topics) {
                  if (topic.topicName) {
                    await fetch(`/api/faculty/subjects/${targetSubjectId}/units/${newUnitId}/topics`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ topicName: topic.topicName, description: topic.description })
                    });
                  }
                }
              }
            }
          }
        }
      }

      router.push(`/faculty/subjects/${targetSubjectId}`);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during submission.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="dashboard-scroll">
      <div className="page-header">
        <div className="page-title-section">
          <div className="breadcrumb">
            <Link href="/faculty/subjects">Faculty</Link> &gt; 
            <Link href="/faculty/subjects">Subjects</Link> &gt; 
            {isEdit ? 'Edit Subject' : 'Create Subject'}
          </div>
          <h1 className="page-title" style={{ marginTop: '4px' }}>
            {isEdit ? 'Edit Subject' : 'Create New Subject'}
          </h1>
          <div className="page-tags">
            <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
              Add a new subject with syllabus, outcomes, units and topics.
            </span>
          </div>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary" onClick={() => router.back()} disabled={submitting}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Saving...' : 'Save Subject'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.container}>
        {error && (
          <div style={{ backgroundColor: '#fef2f2', color: '#ef4444', padding: '12px 16px', borderRadius: '8px', border: '1px solid #fecaca' }}>
            {error}
          </div>
        )}

        {/* Section 1: Subject Information */}
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Subject Information</h2>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Subject Name <span>*</span></label>
              <input type="text" className={styles.input} placeholder="Enter subject name" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Subject Code <span>*</span></label>
              <input type="text" className={styles.input} placeholder="e.g., CS201" value={code} onChange={e => setCode(e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Department <span>*</span></label>
              <select className={styles.select} value={departmentId} onChange={e => setDepartmentId(e.target.value)} required>
                <option value="">Select department</option>
                <option value="60d5ec49f3b5a1234567890a">Computer Science Engineering (Mock)</option>
                {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Program</label>
              <select className={styles.select} value={programId} onChange={e => setProgramId(e.target.value)}>
                <option value="">Select program</option>
                <option value="60d5ec49f3b5a1234567890b">B.Tech CSE (Mock)</option>
                {programs.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Semester</label>
              <select className={styles.select} value={semester} onChange={e => setSemester(e.target.value)}>
                <option value="">Select semester</option>
                {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Credits <span>*</span></label>
              <input type="number" className={styles.input} placeholder="e.g., 4" value={credits} onChange={e => setCredits(e.target.value)} required min="1" max="20" />
            </div>
            <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
              <label className={styles.formLabel}>Description</label>
              <textarea className={styles.input} style={{ minHeight: '80px', resize: 'vertical' }} placeholder="Enter subject description..." value={description} onChange={e => setDescription(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Section 2: Syllabus Upload */}
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Syllabus</h2>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Upload Syllabus (PDF only)</label>
            <div style={{ border: '2px dashed #cbd5e1', borderRadius: '12px', padding: '40px', textAlign: 'center', backgroundColor: '#f8fafc' }}>
              <Upload size={32} color="#94a3b8" style={{ margin: '0 auto 12px' }} />
              <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '8px' }}>Drag and drop file here or <span style={{ color: '#10633B', fontWeight: 600, cursor: 'pointer' }}>click to browse</span></p>
              <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Max file size: 10MB</p>
            </div>
          </div>
        </div>

        {/* Section 3: Course Outcomes */}
        <div className={styles.card}>
          <div className={styles.sectionTitle}>
            <span>Course Outcomes</span>
            <button type="button" className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '4px 10px' }} onClick={handleAddOutcome}>
              <PlusCircle size={14} /> Add Outcome
            </button>
          </div>
          <div className={styles.divider} style={{ marginTop: '0', marginBottom: '16px' }}></div>
          
          {outcomes.length === 0 ? (
            <div className={styles.emptyState} style={{ padding: '20px' }}>No outcomes added yet.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {outcomes.map((co, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <input type="text" className={styles.input} style={{ width: '80px', textAlign: 'center' }} value={co.coNumber} onChange={e => handleUpdateOutcome(idx, 'coNumber', e.target.value)} placeholder="CO1" />
                  <input type="text" className={styles.input} style={{ flex: 1 }} value={co.title} onChange={e => handleUpdateOutcome(idx, 'title', e.target.value)} placeholder="Outcome title" />
                  <Trash2 className={`${styles.actionIcon} ${styles.danger}`} size={20} style={{ marginTop: '10px' }} onClick={() => handleRemoveOutcome(idx)} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 4: Units and Topics */}
        <div className={styles.card}>
          <div className={styles.sectionTitle}>
            <span>Units & Topics</span>
            <button type="button" className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '4px 10px' }} onClick={handleAddUnit}>
              <PlusCircle size={14} /> Add Unit
            </button>
          </div>
          <div className={styles.divider} style={{ marginTop: '0', marginBottom: '16px' }}></div>
          
          {units.length === 0 ? (
            <div className={styles.emptyState} style={{ padding: '20px' }}>No units added yet.</div>
          ) : (
            <div>
              {units.map((unit, uIdx) => (
                <div key={uIdx} className={styles.accordionItem}>
                  <div className={styles.accordionHeader}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                      <span style={{ color: '#10633B', fontWeight: 700 }}>Unit {unit.unitNumber}</span>
                      <input 
                        type="text" 
                        className={styles.input} 
                        style={{ flex: 1, padding: '4px 8px' }} 
                        value={unit.unitName} 
                        onChange={e => handleUpdateUnit(uIdx, 'unitName', e.target.value)} 
                        placeholder="Unit name" 
                        onClick={e => e.stopPropagation()}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginLeft: '12px' }}>
                      <Trash2 className={`${styles.actionIcon} ${styles.danger}`} size={18} onClick={(e) => { e.stopPropagation(); handleRemoveUnit(uIdx); }} />
                      <div onClick={() => toggleUnit(uIdx)}>
                        {expandedUnits[uIdx] ? <ChevronUp size={20} className={styles.actionIcon} /> : <ChevronDown size={20} className={styles.actionIcon} />}
                      </div>
                    </div>
                  </div>
                  
                  {expandedUnits[uIdx] && (
                    <div className={styles.accordionContent}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Topics</span>
                        <button type="button" className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '2px 8px', border: 'none' }} onClick={() => handleAddTopic(uIdx)}>
                          <PlusCircle size={14} /> Add Topic
                        </button>
                      </div>
                      
                      {unit.topics.length === 0 ? (
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic', marginBottom: '12px' }}>No topics added to this unit.</div>
                      ) : (
                        <div className={styles.topicList}>
                          {unit.topics.map((topic: any, tIdx: number) => (
                            <div key={tIdx} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                              <FileText size={16} color="#cbd5e1" />
                              <input 
                                type="text" 
                                className={styles.input} 
                                style={{ flex: 1, padding: '4px 8px', fontSize: '0.85rem' }} 
                                value={topic.topicName} 
                                onChange={e => handleUpdateTopic(uIdx, tIdx, 'topicName', e.target.value)} 
                                placeholder="Topic name" 
                              />
                              <Trash2 className={`${styles.actionIcon} ${styles.danger}`} size={16} onClick={() => handleRemoveTopic(uIdx, tIdx)} />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
