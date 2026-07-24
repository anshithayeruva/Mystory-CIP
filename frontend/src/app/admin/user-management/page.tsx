import React from 'react';
import { UserPlus, Edit2, ChevronLeft, ChevronRight, MoreHorizontal, MessageSquare } from 'lucide-react';
import './user-management.css';

export default function UserManagementPage() {
  const users = [
    {
      initials: 'JD',
      color: 'blue',
      name: 'Dr. Julianne Davis',
      email: 'julianne.davis@mystory.edu',
      empId: 'FAC-2024-0812',
      contactPrimary: '+1 (555)',
      contactSecondary: '012-9988',
      designation: 'Senior Professor',
      department: 'Computer Science',
      status: 'ACTIVE',
      statusClass: 'active',
    },
    {
      initials: 'MR',
      color: 'red',
      name: 'Prof. Marcus Reed',
      email: 'm.reed@mystory.edu',
      empId: 'FAC-2024-0455',
      contactPrimary: '+1 (555)',
      contactSecondary: '234-7711',
      designation: 'Head of Dept.',
      department: 'Applied Mathematics',
      status: 'ON LEAVE',
      statusClass: 'on-leave',
    },
    {
      initials: 'SK',
      color: 'blue',
      name: 'Dr. Sarah Kostic',
      email: 'sarah.k@mystory.edu',
      empId: 'FAC-2024-0129',
      contactPrimary: '+1 (555)',
      contactSecondary: '902-1144',
      designation: 'Associate Professor',
      department: 'Mechanical Engineering',
      status: 'ACTIVE',
      statusClass: 'active',
    },
    {
      initials: 'LB',
      color: 'gray',
      name: 'Leo Blackwell',
      email: 'l.blackwell@mystory.edu',
      empId: 'FAC-2024-0992',
      contactPrimary: '+1 (555)',
      contactSecondary: '333-8800',
      designation: 'Guest Lecturer',
      department: 'Business Administration',
      status: 'INACTIVE',
      statusClass: 'inactive',
    },
  ];

  return (
    <div className="page-user-management">
      <div className="page-header">
        <div className="title-section">
          <h1 className="page-title">Faculty Management</h1>
          <p className="page-subtitle">Review and manage institutional faculty profiles and access permissions.</p>
        </div>
        <button className="btn-create">
          <UserPlus size={16} />
          Create User
        </button>
      </div>

      <div className="filters-container">
        <div className="filter-item">
          <label className="filter-label">Department</label>
          <select className="filter-select">
            <option>All Departments</option>
            <option>Computer Science</option>
            <option>Applied Mathematics</option>
          </select>
        </div>
        <div className="filter-item">
          <label className="filter-label">Subject</label>
          <select className="filter-select">
            <option>All Subjects</option>
            <option>Algorithms</option>
            <option>Calculus</option>
          </select>
        </div>
        <div className="filter-item">
          <label className="filter-label">Designation</label>
          <select className="filter-select">
            <option>All Designations</option>
            <option>Professor</option>
            <option>Associate Professor</option>
          </select>
        </div>
        <div className="filter-item">
          <label className="filter-label">Status</label>
          <select className="filter-select">
            <option>All Statuses</option>
            <option>Active</option>
            <option>On Leave</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMPLOYEE ID</th>
              <th>CONTACT</th>
              <th>DESIGNATION</th>
              <th>DEPARTMENT</th>
              <th>STATUS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx}>
                <td>
                  <div className="user-info-cell">
                    <div className={`avatar ${user.color}`}>{user.initials}</div>
                    <div className="user-details">
                      <span className="user-name">{user.name}</span>
                      <span className="user-email">{user.email}</span>
                    </div>
                  </div>
                </td>
                <td className="text-main">{user.empId}</td>
                <td>
                  <div className="text-cell">
                    <span className="text-main">{user.contactPrimary}</span>
                    <span className="text-main">{user.contactSecondary}</span>
                  </div>
                </td>
                <td>
                  <div className="text-cell">
                    <span className="text-main">{user.designation.split(' ')[0]}</span>
                    <span className="text-main">{user.designation.split(' ').slice(1).join(' ')}</span>
                  </div>
                </td>
                <td>
                  <div className="text-cell">
                    <span className="text-main">{user.department.split(' ')[0]}</span>
                    <span className="text-main">{user.department.split(' ').slice(1).join(' ')}</span>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${user.statusClass}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <button className="btn-icon">
                    <Edit2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="table-footer">
          <div className="pagination-info">Showing 1 to 4 of 128 faculty members</div>
          <div className="pagination">
            <button className="page-item" disabled>
              <ChevronLeft size={16} />
            </button>
            <button className="page-item active">1</button>
            <button className="page-item">2</button>
            <button className="page-item">3</button>
            <button className="page-item" style={{ border: 'none', pointerEvents: 'none', minWidth: '24px' }}>
              <MoreHorizontal size={16} color="#64748b" />
            </button>
            <button className="page-item">13</button>
            <button className="page-item">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="support-bubble">
        <MessageSquare size={24} />
      </div>
    </div>
  );
}
