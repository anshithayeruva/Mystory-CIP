import React from 'react';
import { Plus, Filter, Edit2, Trash2, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import './academic-structure.css';

export default function AcademicStructurePage() {
  const tableData = [
    { code: 'CS301', credits: '4.0', department: 'Computer Science', program: 'B.Tech CS', semester: 'Semester III' },
    { code: 'MG105', credits: '3.0', department: 'Business Admin', program: 'BBA General', semester: 'Semester I' },
    { code: 'AI402', credits: '4.0', department: 'Computer Science', program: 'M.Tech AI', semester: 'Semester II' },
    { code: 'ME202', credits: '4.0', department: 'Mech Engineering', program: 'B.Tech ME', semester: 'Semester IV' },
    { code: 'EC110', credits: '3.0', department: 'Social Sciences', program: 'B.A. Economics', semester: 'Semester I' },
  ];

  return (
    <div className="page-academic-structure">
      <div className="page-header">
        <h1 className="page-title">Academic Structure</h1>
        <button className="btn-create">
          <Plus size={16} />
          Create Subject
        </button>
      </div>

      <div className="filters-container">
        <div className="filters-group">
          <div className="filter-item">
            <label className="filter-label">Program</label>
            <select className="filter-select">
              <option>All Programs</option>
              <option>B.Tech CS</option>
              <option>BBA General</option>
              <option>M.Tech AI</option>
            </select>
          </div>
          <div className="filter-item">
            <label className="filter-label">Semester</label>
            <select className="filter-select">
              <option>All Semesters</option>
              <option>Semester I</option>
              <option>Semester II</option>
              <option>Semester III</option>
            </select>
          </div>
        </div>
        
        <div className="filter-actions">
          <button className="btn-apply">
            <Filter size={16} />
            Apply Filters
          </button>
          <button className="btn-reset">Reset</button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>CODE</th>
              <th>CREDITS</th>
              <th>DEPARTMENT</th>
              <th>PROGRAM</th>
              <th>SEMESTER</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td className="code-cell">{row.code}</td>
                <td>
                  <span className="credit-pill">{row.credits}</span>
                </td>
                <td>{row.department}</td>
                <td>{row.program}</td>
                <td>{row.semester}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon">
                      <Edit2 size={16} />
                    </button>
                    <button className="btn-icon delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button className="page-item" disabled>
            <ChevronLeft size={16} />
          </button>
          <button className="page-item active">1</button>
          <button className="page-item">2</button>
          <button className="page-item">3</button>
          <button className="page-item" style={{ border: 'none', pointerEvents: 'none' }}>
            <MoreHorizontal size={16} color="#64748b" />
          </button>
          <button className="page-item">9</button>
          <button className="page-item">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
