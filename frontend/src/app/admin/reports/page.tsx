import React from 'react';
import { Calendar, Users, BookOpen, User, Settings2, Download, FileText, Table } from 'lucide-react';
import './reports.css';

export default function ReportsPage() {
  const history = [
    {
      name: 'Department Summary',
      icon: <FileText size={18} color="#94a3b8" />,
      datetime: '2023-10-24 14:32:01',
      format: 'PDF',
      formatClass: 'pdf',
      status: 'Completed',
      statusClass: 'completed',
    },
    {
      name: 'Faculty Utilization Q3',
      icon: <Table size={18} color="#94a3b8" />,
      datetime: '2023-10-24 12:15:45',
      format: 'EXCEL',
      formatClass: 'excel',
      status: 'Completed',
      statusClass: 'completed',
    },
    {
      name: 'Institutional Elective Mapping',
      icon: <FileText size={18} color="#94a3b8" />,
      datetime: '2023-10-23 16:05:12',
      format: 'CSV',
      formatClass: 'csv',
      status: 'Completed',
      statusClass: 'completed',
    },
  ];

  return (
    <div className="page-reports">
      <div className="page-header">
        <div className="title-section">
          <h1 className="page-title">Data Extraction</h1>
          <p className="page-subtitle">Extract and export institutional data records in multiple formats.</p>
        </div>
        <button className="btn-year">
          <Calendar size={16} />
          Academic Year: 2023-24
        </button>
      </div>

      <div className="report-cards">
        {/* Card 1 */}
        <div className="report-card">
          <div className="card-header">
            <div className="card-icon">
              <Users size={24} />
            </div>
            <span className="category-badge">HUMAN RESOURCES</span>
          </div>
          <h3 className="card-title">Faculty List</h3>
          <p className="card-desc">List of all active faculty members, their designations, and primary department associations.</p>
          <div className="export-actions">
            <button className="btn-pdf">
              <FileText size={16} />
              PDF Export
            </button>
            <div className="secondary-exports">
              <button className="btn-export-secondary">
                <Table size={14} />
                Excel
              </button>
              <button className="btn-export-secondary">
                <FileText size={14} />
                CSV
              </button>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="report-card">
          <div className="card-header">
            <div className="card-icon">
              <User size={24} />
            </div>
            <span className="category-badge" style={{ backgroundColor: '#fef2f2', color: '#dc2626' }}>ADMINISTRATION</span>
          </div>
          <h3 className="card-title">HoD List</h3>
          <p className="card-desc">Administrative report listing all Heads of Departments and their respective tenure start dates.</p>
          <div className="export-actions">
            <button className="btn-pdf">
              <FileText size={16} />
              PDF Export
            </button>
            <div className="secondary-exports">
              <button className="btn-export-secondary">
                <Table size={14} />
                Excel
              </button>
              <button className="btn-export-secondary">
                <FileText size={14} />
                CSV
              </button>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="report-card">
          <div className="card-header">
            <div className="card-icon">
              <BookOpen size={24} />
            </div>
            <span className="category-badge" style={{ backgroundColor: '#fef3c7', color: '#d97706' }}>CURRICULUM</span>
          </div>
          <h3 className="card-title">Subject List</h3>
          <p className="card-desc">Catalog of all subjects offered across all programs including credit points and course codes.</p>
          <div className="export-actions">
            <button className="btn-pdf">
              <FileText size={16} />
              PDF Export
            </button>
            <div className="secondary-exports">
              <button className="btn-export-secondary">
                <Table size={14} />
                Excel
              </button>
              <button className="btn-export-secondary">
                <FileText size={14} />
                CSV
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="custom-builder-panel">
        <div className="builder-content">
          <h2>Custom Report Builder</h2>
          <p>Don't see what you need? Use our granular data explorer to select custom fields, apply filters, and cross-reference data sets across multiple modules.</p>
        </div>
        <button className="btn-custom-report">
          <Settings2 size={18} />
          Configure Custom Report
        </button>
      </div>

      <div className="history-section">
        <div className="history-header">
          <a href="#" className="link-view-all">View all history</a>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th></th>
                <th>Date & Time</th>
                <th>Format</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <div className="doc-name-cell">
                      {item.icon}
                      {item.name}
                    </div>
                  </td>
                  <td>{item.datetime}</td>
                  <td>
                    <span className={`format-badge ${item.formatClass}`}>
                      {item.format}
                    </span>
                  </td>
                  <td>
                    <div className="status-cell">
                      <span className={`dot ${item.statusClass}`}></span>
                      {item.status}
                    </div>
                  </td>
                  <td>
                    <button className="btn-download">
                      <Download size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
