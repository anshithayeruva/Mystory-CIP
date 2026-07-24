import React from 'react';
import { UserPlus, Filter, Download } from 'lucide-react';
import './faculty-assignment.css';

export default function FacultyAssignmentPage() {
  const assignments = [
    {
      subject: 'Advanced Algorithms',
      semester: 'Fall 2024',
      section: 'Section A',
      status: 'Active',
      statusClass: 'active',
    },
    {
      subject: 'Neural Networks',
      semester: 'Fall 2024',
      section: 'Section B',
      status: 'Active',
      statusClass: 'active',
    },
    {
      subject: 'Database Systems',
      semester: 'Spring 2025',
      section: 'Section A',
      status: 'Pending',
      statusClass: 'pending',
    },
    {
      subject: 'Operating Systems',
      semester: 'Fall 2024',
      section: 'Section C',
      status: 'Active',
      statusClass: 'active',
    },
  ];

  return (
    <div className="page-faculty-assignment">
      <div className="page-header">
        <h1 className="page-title">Faculty Assignment</h1>
        <p className="page-subtitle">Manage and allocate faculty allocations for the current academic session.</p>
      </div>

      <div className="assignment-form">
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Subject</label>
            <select className="form-select">
              <option>Select Subject</option>
              <option>Advanced Algorithms</option>
              <option>Neural Networks</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Semester</label>
            <select className="form-select">
              <option>Select Semester</option>
              <option>Fall 2024</option>
              <option>Spring 2025</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Section</label>
            <select className="form-select">
              <option>Select Section</option>
              <option>Section A</option>
              <option>Section B</option>
            </select>
          </div>
        </div>
        <div className="form-actions">
          <button className="btn-assign">
            <UserPlus size={18} />
            Assign Faculty
          </button>
        </div>
      </div>

      <div className="table-wrapper">
        <div className="table-toolbar">
          <button className="toolbar-btn">
            <Filter size={20} />
          </button>
          <button className="toolbar-btn">
            <Download size={20} />
          </button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>SUBJECT</th>
              <th>SEMESTER</th>
              <th>SECTION</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((row, idx) => (
              <tr key={idx}>
                <td style={{ fontWeight: 500 }}>{row.subject}</td>
                <td>{row.semester}</td>
                <td>{row.section}</td>
                <td>
                  <span className={`status-badge ${row.statusClass}`}>
                    {row.status}
                  </span>
                </td>
                <td>
                  <button className="btn-reassign">Reassign</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-footer">
          <button className="btn-page" disabled>Previous</button>
          <button className="btn-page">Next</button>
        </div>
      </div>
    </div>
  );
}
