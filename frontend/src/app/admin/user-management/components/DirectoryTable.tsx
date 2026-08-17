"use client";

import { useEffect, useState } from "react";
import styles from "../directory.module.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  joined: string;
  institutionId?: string;
  department?: string;
  designation?: string;
  mustChangePassword?: boolean;
}

interface ToastState {
  userId: string;
  message: string;
  type: "success" | "error";
}

export default function DirectoryTable() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [resendingId, setResendingId] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);
  const limit = 10;

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/users?page=${page}&limit=${limit}`, {
        credentials: "include",
      });
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

  const handleResendCredentials = async (userId: string) => {
    setResendingId(userId);
    setToast(null);
    try {
      const res = await fetch(`${API_URL}/api/admin/users/${userId}/resend-credentials`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setToast({ userId, message: "New credentials emailed successfully.", type: "success" });
      } else {
        setToast({ userId, message: data.message || "Failed to resend credentials.", type: "error" });
      }
    } catch {
      setToast({ userId, message: "Network error. Please try again.", type: "error" });
    } finally {
      setResendingId(null);
      // Auto-clear toast after 4 seconds
      setTimeout(() => setToast(null), 4000);
    }
  };

  const startIdx = (page - 1) * limit + 1;
  const endIdx = Math.min(page * limit, total);

  return (
    <div>
      {/* Global toast */}
      {toast && (
        <div style={{
          margin: "0 16px 12px",
          padding: "10px 14px",
          borderRadius: "8px",
          fontSize: "13px",
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: toast.type === "success" ? "#f0fdf4" : "#fef2f2",
          border: `1px solid ${toast.type === "success" ? "#bbf7d0" : "#fecaca"}`,
          color: toast.type === "success" ? "#166534" : "#dc2626",
        }}>
          {toast.type === "success" ? "✓" : "✕"} {toast.message}
        </div>
      )}

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Profile</th>
              <th>Institution ID</th>
              <th>Role</th>
              <th>Department</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ textAlign: "center", padding: "20px" }}>Loading users...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: "center", padding: "20px" }}>No users found.</td></tr>
            ) : (
              users.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div className={styles.profileCell}>
                      <div className={styles.avatar} />
                      <div className={styles.profileText}>
                        <div className={styles.profileName}>{row.name}</div>
                        <div className={styles.profileJoined}>{row.joined}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontSize: "14px", color: "var(--text-main)", fontWeight: 400 }}>
                    {row.institutionId || "–"}
                  </td>
                  <td>
                    {row.role === "Faculty" && <span className={styles.roleBadgeFaculty}>Faculty</span>}
                    {row.role === "HoD" && <span className={styles.roleBadgeHod}>HoD</span>}
                    {row.role === "Student" && <span className={styles.roleBadgeStudent}>Student</span>}
                    {row.role === "Admin" && <span className={styles.roleBadgeStaff}>Admin</span>}
                  </td>
                  <td style={{ fontSize: "14px", color: "var(--text-muted)" }}>{row.department || "–"}</td>
                  <td style={{ fontSize: "14px", color: "var(--text-muted)" }}>{row.email}</td>
                  <td>
                    <button
                      onClick={() => handleResendCredentials(row.id)}
                      disabled={resendingId === row.id}
                      title="Generate a new temporary password and email it to this user"
                      style={{
                        background: "none",
                        border: "1px solid #e2e8f0",
                        borderRadius: "6px",
                        padding: "5px 10px",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: resendingId === row.id ? "#94a3b8" : "#00522E",
                        cursor: resendingId === row.id ? "not-allowed" : "pointer",
                        whiteSpace: "nowrap",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        if (resendingId !== row.id)
                          (e.currentTarget as HTMLButtonElement).style.background = "#f0fdf4";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "none";
                      }}
                    >
                      {resendingId === row.id ? "Sending…" : "Resend Credentials"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <div className={styles.paginationText}>
          Showing {total > 0 ? startIdx : 0}–{endIdx} of {total} users
        </div>
        <div className={styles.paginationControls}>
          <button
            className={styles.pageBtnOutlined}
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </button>
          <button
            className={styles.pageBtnOutlined}
            disabled={page * limit >= total}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
