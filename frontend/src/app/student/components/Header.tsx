"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "../student-layout.module.css";
import { usePathname, useRouter } from "next/navigation";
import { User, LogOut } from "lucide-react";
import Link from "next/link";
import { STUDENT_INFO } from "../mockData";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const getHeaderTitle = () => {
    if (pathname.includes("/student/courses")) return "My Registered Courses";
    if (pathname.includes("/student/pulse")) return "Live Classroom Sessions";
    if (pathname.includes("/student/reports") || pathname.includes("/student/attendance")) return "Reports & Analytics";
    if (pathname.includes("/student/timetable")) return "Class & Exam Timetable";
    if (pathname.includes("/student/resources")) return "Digital Learning Resources";
    if (pathname.includes("/student/account")) return "Account";
    if (pathname.includes("/student/settings") || pathname.includes("/student/profile")) return "Settings";
    return "Dashboard";
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentUser");
    }
    router.push("/signin");
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>{getHeaderTitle()}</h1>

      <div className={styles.headerActions}>
        {/* Profile Popover Menu (Matching Admin & HOD design) */}
        <div ref={profileRef} style={{ position: "relative" }}>
          <button 
            suppressHydrationWarning 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              backgroundColor: "#e9f2ee",
              border: "1px solid #c9e0d3",
              color: "#00522E",
              fontWeight: 700,
              fontSize: "0.85rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
            title="User Account Options"
          >
            NN
          </button>

          {isProfileOpen && (
            <div style={{
              position: "absolute",
              top: "100%",
              right: 0,
              marginTop: "8px",
              width: "250px",
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
              border: "1px solid #e2e8f0",
              zIndex: 50,
              overflow: "hidden"
            }}>
              <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: "12px", borderBottom: "1px solid #e2e8f0" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#e9f2ee", color: "#00522E", fontWeight: 700, fontSize: "0.85rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  NN
                </div>
                <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{STUDENT_INFO.name}</span>
                  <span style={{ fontSize: "12px", color: "#64748b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{STUDENT_INFO.email}</span>
                </div>
              </div>
              
              <div style={{ padding: "6px" }}>
                <Link 
                  href="/student/account" 
                  onClick={() => setIsProfileOpen(false)} 
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px 10px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#334155",
                    borderRadius: "6px",
                    textAlign: "left",
                    fontWeight: 500,
                    textDecoration: "none",
                    boxSizing: "border-box"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f8fafc"}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  <User size={16} style={{ color: "#64748b" }} />
                  Account
                </Link>
              </div>

              <div style={{ borderTop: "1px solid #e2e8f0", padding: "6px" }}>
                <button 
                  suppressHydrationWarning 
                  onClick={handleSignOut}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px 10px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#ef4444",
                    borderRadius: "6px",
                    textAlign: "left",
                    fontWeight: 500
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f8fafc"}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  <LogOut size={16} style={{ color: "#ef4444" }} />
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
