"use client";

import styles from "../directory.module.css";

const MOCK_DATA = [
  {
    id: 1,
    name: "Dr. Elena Rodriguez",
    joined: "Joined Oct 2023",
    email: "e.rodriguez@mystory.edu",
    institutionId: "FAC-2023-8842",
    role: "Staff",
    department: "Biomedical Engineering"
  },
  {
    id: 2,
    name: "Marcus Chen",
    joined: "Joined Sep 2024",
    email: "m.chen99@mystory.edu",
    institutionId: "STU-2024-1102",
    role: "Student",
    department: "Computer Science"
  },
  {
    id: 3,
    name: "Prof. Sarah Jenkins",
    joined: "Joined Jan 2018",
    email: "s.jenkins@mystory.edu",
    institutionId: "HOD-2018-0021",
    role: "HoD",
    department: "Philosophy & Ethics"
  },
  {
    id: 4,
    name: "Amir Al-Farsi",
    joined: "Joined Mar 2024",
    email: "amir.farsi@mystory.edu",
    institutionId: "STU-2024-5590",
    role: "Student",
    department: "Artificial Intelligence"
  },
  {
    id: 5,
    name: "Dr. Thomas Wright",
    joined: "Joined Nov 2015",
    email: "t.wright@mystory.edu",
    institutionId: "FAC-2015-0911",
    role: "Staff",
    department: "History of Art"
  }
];

export default function DirectoryTable() {
  return (
    <div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Profile</th>
              <th>Institution ID</th>
              <th>Role</th>
              <th>Department</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_DATA.map((row) => (
              <tr key={row.id}>
                <td>
                  <div className={styles.profileCell}>
                    <div className={styles.avatar}></div>
                    <div className={styles.profileText}>
                      <div className={styles.profileName}>{row.name}</div>
                      <div className={styles.profileJoined}>{row.joined}</div>
                    </div>
                  </div>
                </td>
                <td style={{ fontSize: "14px", color: "var(--text-main)", fontWeight: 400 }}>
                  {row.institutionId}
                </td>
                <td>
                  {row.role === "Staff" && <span className={styles.roleBadgeStaff}>Staff</span>}
                  {row.role === "HoD" && <span className={styles.roleBadgeHod}>HoD</span>}
                  {row.role === "Student" && <span className={styles.roleBadgeStudent}>Student</span>}
                </td>
                <td style={{ fontSize: "14px", color: "var(--text-muted)" }}>{row.department}</td>
                <td style={{ fontSize: "14px", color: "var(--text-muted)" }}>{row.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <div className={styles.paginationText}>
          Showing 1-5 of 1,240 users
        </div>
        <div className={styles.paginationControls}>
          <button className={styles.pageBtnOutlined}>Previous</button>
          <button className={styles.pageBtnOutlined}>Next</button>
        </div>
      </div>
    </div>
  );
}
