"use client";

import { useEffect, useState } from "react";
import styles from "../directory.module.css";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  joined: string;
  institutionId?: string;
  department?: string;
  designation?: string;
}

export default function DirectoryTable() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const limit = 10;

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/users?page=${page}&limit=${limit}`);
      if (res.ok) {
        const data = await res.json();
        setUsers(data.data);
        setTotal(data.pagination.total);
      }
    } catch (error) {
      console.error("Error fetching users", error);
    } finally {
      setLoading(false);
    }
  };

  const startIdx = (page - 1) * limit + 1;
  const endIdx = Math.min(page * limit, total);

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
            {loading ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: '20px' }}>Loading users...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: '20px' }}>No users found.</td></tr>
            ) : (
              users.map((row) => (
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
                    {row.institutionId || "-"}
                  </td>
                  <td>
                    {row.role === "Faculty" && <span className={styles.roleBadgeFaculty}>Faculty</span>}
                    {row.role === "HoD" && <span className={styles.roleBadgeHod}>HoD</span>}
                    {row.role === "Student" && <span className={styles.roleBadgeStudent}>Student</span>}
                  </td>
                  <td style={{ fontSize: "14px", color: "var(--text-muted)" }}>{row.department || "-"}</td>
                  <td style={{ fontSize: "14px", color: "var(--text-muted)" }}>{row.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <div className={styles.paginationText}>
          Showing {total > 0 ? startIdx : 0}-{endIdx} of {total} users
        </div>
        <div className={styles.paginationControls}>
          <button 
            className={styles.pageBtnOutlined} 
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          >
            Previous
          </button>
          <button 
            className={styles.pageBtnOutlined}
            disabled={page * limit >= total}
            onClick={() => setPage(p => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
