"use client";

import styles from "../directory.module.css";

const MOCK_DATA = [
  {
    id: 1,
    name: "Dr. Robert Chen",
    email: "robert.chen@institution.edu",
    institutionId: "FAC-2024-8842",
    role: "FACULTY",
    department: "Computer Science",
    status: "ACTIVE"
  },
  {
    id: 2,
    name: "Prof. Angela Voight",
    email: "angela.voight@institution.edu",
    institutionId: "HOD-2024-0012",
    role: "HOD",
    department: "Business Administration",
    status: "ACTIVE"
  },
  {
    id: 3,
    name: "Jordan Peterson",
    email: "jordan.peterson@institution.edu",
    institutionId: "STU-2024-9910",
    role: "STUDENT",
    department: "Life Sciences",
    status: "INACTIVE"
  },
  {
    id: 4,
    name: "Dr. Maria Garcia",
    email: "maria.garcia@institution.edu",
    institutionId: "FAC-2024-1150",
    role: "FACULTY",
    department: "Computer Science",
    status: "ACTIVE"
  }
];

export default function DirectoryTable() {
  return (
    <div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: "40px", paddingLeft: "24px" }}>
                <input type="checkbox" style={{ cursor: "pointer" }} />
              </th>
              <th>PROFILE</th>
              <th>INSTITUTION ID</th>
              <th>ROLE</th>
              <th>DEPARTMENT</th>
              <th>EMAIL</th>
              <th>ACCOUNT STATUS</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_DATA.map((row) => (
              <tr key={row.id}>
                <td style={{ paddingLeft: "24px" }}>
                  <input type="checkbox" style={{ cursor: "pointer" }} />
                </td>
                <td>
                  <div className={styles.profileCell}>
                    <div className={styles.avatar}></div>
                    <div className={styles.profileName}>{row.name}</div>
                  </div>
                </td>
                <td style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 500 }}>
                  {row.institutionId}
                </td>
                <td>
                  {row.role === "FACULTY" && <span className={styles.roleBadgeFaculty}>FACULTY</span>}
                  {row.role === "HOD" && <span className={styles.roleBadgeHod}>HOD</span>}
                  {row.role === "STUDENT" && <span className={styles.roleBadgeStudent}>STUDENT</span>}
                </td>
                <td>{row.department}</td>
                <td style={{ color: "#115e59" }}>{row.email}</td>
                <td>
                  {row.status === "ACTIVE" && <span className={styles.statusActive}>Active</span>}
                  {row.status === "INACTIVE" && <span className={styles.statusInactive}>Inactive</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <div className={styles.paginationText}>
          Showing <strong>1-10</strong> of 1,598 users
        </div>
        <div className={styles.paginationControls}>
          <button className={styles.pageBtn} style={{ color: "var(--text-muted)", borderColor: "transparent" }}>&lt;</button>
          <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
          <button className={styles.pageBtn} style={{ border: "none" }}>2</button>
          <button className={styles.pageBtn} style={{ border: "none" }}>3</button>
          <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", margin: "0 4px" }}>...</span>
          <button className={styles.pageBtn} style={{ border: "none" }}>125</button>
          <button className={styles.pageBtn} style={{ color: "var(--text-main)" }}>&gt;</button>
        </div>
      </div>
    </div>
  );
}
