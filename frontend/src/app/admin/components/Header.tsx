"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "../admin-layout.module.css";
import { usePathname } from "next/navigation";
import { User, LogOut } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getHeaderTitle = () => {
    if (pathname.includes("/admin/academic-structure")) return "Academics";
    if (pathname.includes("/admin/user-management")) return "Directory";
    if (pathname.includes("/admin/settings")) return "Settings";
    if (pathname.includes("/admin/reports")) return "Reports & Analytics";
    return "Dashboard"; 
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle} style={{ color: "black" }}>{getHeaderTitle()}</h1>
      
      <div className={styles.headerActions}>
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <button suppressHydrationWarning 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              overflow: "hidden"
            }}
          >
            <img 
              src="https://api.dicebear.com/7.x/initials/svg?seed=Nitya%20Nara&backgroundColor=e2e8f0&textColor=475569" 
              alt="Profile" 
              style={{
                width: "32px",
                height: "32px",
                objectFit: "cover"
              }}
            />
          </button>

          {isDropdownOpen && (
            <div style={{
              position: "absolute",
              top: "100%",
              right: 0,
              marginTop: "8px",
              width: "250px",
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              border: "1px solid #e2e8f0",
              zIndex: 50,
              overflow: "hidden"
            }}>
              <div style={{ padding: "16px", display: "flex", alignItems: "center", gap: "12px", borderBottom: "1px solid #e2e8f0" }}>
                <img 
                  src="https://api.dicebear.com/7.x/initials/svg?seed=Nitya%20Nara&backgroundColor=e2e8f0&textColor=475569" 
                  alt="Nitya Nara" 
                  style={{ width: "42px", height: "42px", borderRadius: "50%" }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "15px", fontWeight: 600, color: "#0f172a" }}>Nitya Nara</span>
                  <span style={{ fontSize: "13px", color: "#64748b" }}>nitya_nara@srmap.edu.in</span>
                </div>
              </div>
              
              <div style={{ padding: "8px" }}>
                <Link 
                  href="/admin/profile" 
                  onClick={() => setIsDropdownOpen(false)} 
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "10px 12px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "15px",
                    color: "#334155",
                    borderRadius: "8px",
                    textAlign: "left",
                    fontWeight: 500,
                    textDecoration: "none",
                    boxSizing: "border-box"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f8fafc"}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  <User size={18} style={{ color: "#64748b" }} />
                  Account
                </Link>
              </div>

              <div style={{ borderTop: "1px solid #e2e8f0", padding: "8px" }}>
                <button suppressHydrationWarning style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 12px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "15px",
                  color: "#334155",
                  borderRadius: "8px",
                  textAlign: "left",
                  fontWeight: 500
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f8fafc"}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  <LogOut size={18} style={{ color: "#64748b" }} />
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
