'use client';

import React, { useState, useRef } from 'react';
import { Plus, Upload, Trash2, FileText } from 'lucide-react';
import commonStyles from '@/modules/faculty/styles/faculty.module.css';
import styles from '@/modules/faculty/styles/create-subject.module.css';

interface Outcome {
  id: string;
  title: string;
  description: string;
  level: string;
}

interface Topic {
  id: string;
  title: string;
  description: string;
}

interface Unit {
  id: string;
  title: string;
  description: string;
  hours: string;
  topics: Topic[];
}

export default function CreateSubjectPage() {
  const [outcomes, setOutcomes] = useState<Outcome[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddOutcome = () => {
    setOutcomes([
      ...outcomes,
      { id: Date.now().toString(), title: '', description: '', level: '' }
    ]);
  };

  const handleRemoveOutcome = (id: string) => {
    setOutcomes(outcomes.filter(o => o.id !== id));
  };

  const handleOutcomeChange = (id: string, field: keyof Outcome, value: string) => {
    setOutcomes(outcomes.map(o => o.id === id ? { ...o, [field]: value } : o));
  };

  const handleAddUnit = () => {
    setUnits([
      ...units,
      { id: Date.now().toString(), title: '', description: '', hours: '', topics: [] }
    ]);
  };

  const handleRemoveUnit = (id: string) => {
    setUnits(units.filter(u => u.id !== id));
  };

  const handleUnitChange = (id: string, field: keyof Unit, value: string) => {
    setUnits(units.map(u => u.id === id ? { ...u, [field]: value } : u));
  };

  const handleAddTopic = (unitId: string) => {
    setUnits(units.map(u => {
      if (u.id === unitId) {
        return {
          ...u,
          topics: [...u.topics, { id: Date.now().toString(), title: '', description: '' }]
        };
      }
      return u;
    }));
  };

  const handleRemoveTopic = (unitId: string, topicId: string) => {
    setUnits(units.map(u => {
      if (u.id === unitId) {
        return { ...u, topics: u.topics.filter(t => t.id !== topicId) };
      }
      return u;
    }));
  };

  const handleTopicChange = (unitId: string, topicId: string, field: keyof Topic, value: string) => {
    setUnits(units.map(u => {
      if (u.id === unitId) {
        return {
          ...u,
          topics: u.topics.map(t => t.id === topicId ? { ...t, [field]: value } : t)
        };
      }
      return u;
    }));
  };

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={commonStyles.pageContainer}>
      {/* Breadcrumb */}
      <div className={commonStyles.breadcrumb} style={{ marginBottom: 24 }}>
        <span>Dashboard</span>
        <span>{'>'}</span>
        <span>Faculty</span>
        <span>{'>'}</span>
        <span>Subjects</span>
        <span>{'>'}</span>
        <span className={commonStyles.breadcrumbCurrent} style={{ color: '#10633B' }}>Create Subject</span>
      </div>

      {/* Page Header */}
      <div className={commonStyles.pageHeader}>
        <div className={commonStyles.pageHeaderLeft}>
          <h1 className={commonStyles.pageTitle}>Create New Subject</h1>
          <p className={commonStyles.pageSubtitle}>
            Add a new subject with syllabus, outcomes, units and topics.
          </p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.secondaryButton}>
            Cancel
          </button>
          <button className={commonStyles.primaryButton}>
            Save Subject
          </button>
        </div>
      </div>

      {/* SECTION 1: Subject Information */}
      <div className={styles.formSectionCard}>
        <div className={styles.cardHeaderRow} style={{ marginBottom: 24 }}>
          <h2 className={styles.cardHeaderTitle}>Subject Information</h2>
        </div>

        <div className={styles.inputGrid}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Subject Name <span className={styles.required}>*</span></label>
            <input type="text" placeholder="Enter subject name" className={styles.input} />
          </div>
          
          <div className={styles.inputGroup}>
            <label className={styles.label}>Subject Code <span className={styles.required}>*</span></label>
            <input type="text" placeholder="e.g., CS201" className={styles.input} />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Department <span className={styles.required}>*</span></label>
            <select className={styles.select} defaultValue="">
              <option value="" disabled>Select department</option>
              <option value="CSE">Computer Science</option>
              <option value="ECE">Electronics</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Program</label>
            <select className={styles.select} defaultValue="">
              <option value="" disabled>Select program</option>
              <option value="BTECH">B.Tech</option>
              <option value="MTECH">M.Tech</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Semester</label>
            <select className={styles.select} defaultValue="">
              <option value="" disabled>Select semester</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Credits <span className={styles.required}>*</span></label>
            <input type="number" placeholder="e.g., 4" className={styles.input} />
          </div>

          <div className={styles.inputGroupFull}>
            <label className={styles.label}>Description</label>
            <textarea placeholder="Enter subject description..." className={styles.textarea}></textarea>
          </div>
        </div>
      </div>

      {/* SECTION 2: Syllabus */}
      <div className={styles.formSectionCard}>
        <div className={styles.cardHeaderRow}>
          <h2 className={styles.cardHeaderTitle}>Syllabus</h2>
        </div>
        
        <div style={{ marginBottom: 16 }}>
          <label className={styles.label} style={{ display: 'block', marginBottom: 8 }}>Upload Syllabus (PDF only)</label>
          <input 
            type="file" 
            accept=".pdf" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            style={{ display: 'none' }} 
          />
          
          {file ? (
            <div className={styles.filePreview}>
              <div className={styles.fileInfo}>
                <FileText className={styles.fileIcon} size={24} />
                <div>
                  <div className={styles.fileName}>{file.name}</div>
                  <div className={styles.fileSize}>{formatFileSize(file.size)}</div>
                </div>
              </div>
              <button className={styles.removeButton} onClick={() => setFile(null)}>
                <Trash2 size={16} /> Remove
              </button>
            </div>
          ) : (
            <div className={styles.uploadArea} onClick={handleFileClick}>
              <Upload className={styles.uploadIcon} size={32} />
              <div className={styles.uploadTitle}>
                Drag and drop file here or <span className={styles.uploadTitleHighlight}>click to browse</span>
              </div>
              <div className={styles.uploadSubtitle}>Max file size: 10MB</div>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 3: Course Outcomes */}
      <div className={styles.formSectionCard}>
        <div className={styles.cardHeaderRow}>
          <h2 className={styles.cardHeaderTitle}>Course Outcomes</h2>
          <button className={styles.secondaryButton} onClick={handleAddOutcome}>
            <Plus size={16} /> Add Outcome
          </button>
        </div>

        {outcomes.length === 0 ? (
          <div className={commonStyles.emptyState} style={{ padding: '40px 24px' }}>
            <p className={commonStyles.emptyStateSubtitle}>No outcomes added yet.</p>
          </div>
        ) : (
          <div>
            {outcomes.map((outcome, index) => (
              <div key={outcome.id} className={styles.dynamicCard}>
                <div className={styles.dynamicCardHeader}>
                  <div className={styles.dynamicCardTitle}>Outcome CO{index + 1}</div>
                  <button className={styles.removeButton} onClick={() => handleRemoveOutcome(outcome.id)}>
                    <Trash2 size={16} /> Remove Outcome
                  </button>
                </div>
                
                <div className={styles.inputGrid}>
                  <div className={styles.inputGroupFull}>
                    <label className={styles.label}>Outcome Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Understand basic algorithms" 
                      className={styles.input}
                      value={outcome.title}
                      onChange={(e) => handleOutcomeChange(outcome.id, 'title', e.target.value)}
                    />
                  </div>
                  
                  <div className={styles.inputGroupFull}>
                    <label className={styles.label}>Bloom's Taxonomy Level</label>
                    <select 
                      className={styles.select}
                      value={outcome.level}
                      onChange={(e) => handleOutcomeChange(outcome.id, 'level', e.target.value)}
                    >
                      <option value="" disabled>Select level</option>
                      <option value="Remember">Remember</option>
                      <option value="Understand">Understand</option>
                      <option value="Apply">Apply</option>
                      <option value="Analyze">Analyze</option>
                      <option value="Evaluate">Evaluate</option>
                      <option value="Create">Create</option>
                    </select>
                  </div>

                  <div className={styles.inputGroupFull}>
                    <label className={styles.label}>Description</label>
                    <textarea 
                      placeholder="Detailed outcome description..." 
                      className={styles.textarea} style={{ minHeight: '80px' }}
                      value={outcome.description}
                      onChange={(e) => handleOutcomeChange(outcome.id, 'description', e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 4: Units & Topics */}
      <div className={styles.formSectionCard}>
        <div className={styles.cardHeaderRow}>
          <h2 className={styles.cardHeaderTitle}>Units & Topics</h2>
          <button className={styles.secondaryButton} onClick={handleAddUnit}>
            <Plus size={16} /> Add Unit
          </button>
        </div>

        {units.length === 0 ? (
          <div className={commonStyles.emptyState} style={{ padding: '40px 24px' }}>
            <p className={commonStyles.emptyStateSubtitle}>No units added yet.</p>
          </div>
        ) : (
          <div>
            {units.map((unit, index) => (
              <div key={unit.id} className={styles.dynamicCard}>
                <div className={styles.dynamicCardHeader}>
                  <div className={styles.dynamicCardTitle}>Unit {index + 1}</div>
                  <button className={styles.removeButton} onClick={() => handleRemoveUnit(unit.id)}>
                    <Trash2 size={16} /> Remove Unit
                  </button>
                </div>
                
                <div className={styles.inputGrid}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Unit Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Introduction to Data Structures" 
                      className={styles.input}
                      value={unit.title}
                      onChange={(e) => handleUnitChange(unit.id, 'title', e.target.value)}
                    />
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Recommended Hours</label>
                    <input 
                      type="number" 
                      placeholder="e.g., 10" 
                      className={styles.input}
                      value={unit.hours}
                      onChange={(e) => handleUnitChange(unit.id, 'hours', e.target.value)}
                    />
                  </div>

                  <div className={styles.inputGroupFull}>
                    <label className={styles.label}>Description</label>
                    <textarea 
                      placeholder="Unit description..." 
                      className={styles.textarea} style={{ minHeight: '80px' }}
                      value={unit.description}
                      onChange={(e) => handleUnitChange(unit.id, 'description', e.target.value)}
                    ></textarea>
                  </div>
                </div>

                {/* Topics Area inside Unit */}
                <div style={{ marginTop: 24 }}>
                  <label className={styles.label} style={{ display: 'block', marginBottom: 12 }}>Topics in this Unit</label>
                  
                  {unit.topics.length === 0 ? (
                    <div style={{ color: '#6B7280', fontSize: '14px', marginBottom: '12px' }}>No topics added.</div>
                  ) : (
                    unit.topics.map((topic, tIndex) => (
                      <div key={topic.id} className={styles.topicCard}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                          <span style={{ fontSize: '14px', fontWeight: 600 }}>Topic {tIndex + 1}</span>
                          <button className={styles.removeButton} style={{ padding: 0 }} onClick={() => handleRemoveTopic(unit.id, topic.id)}>
                            <Trash2 size={14} /> Remove Topic
                          </button>
                        </div>
                        <div className={styles.inputGrid} style={{ marginBottom: 0, gap: 16 }}>
                          <div className={styles.inputGroupFull}>
                            <input 
                              type="text" 
                              placeholder="Topic Name" 
                              className={styles.input}
                              value={topic.title}
                              onChange={(e) => handleTopicChange(unit.id, topic.id, 'title', e.target.value)}
                            />
                          </div>
                          <div className={styles.inputGroupFull}>
                            <textarea 
                              placeholder="Topic Description (optional)" 
                              className={styles.textarea} style={{ minHeight: '60px' }}
                              value={topic.description}
                              onChange={(e) => handleTopicChange(unit.id, topic.id, 'description', e.target.value)}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  
                  <button className={styles.addTopicButton} onClick={() => handleAddTopic(unit.id)}>
                    <Plus size={14} /> Add Topic
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
