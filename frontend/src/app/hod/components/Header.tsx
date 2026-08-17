"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { User, LogOut } from "lucide-react";
import styles from "../hod-layout.module.css";

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const getHeaderTitle = () => {
    if (pathname.includes("/hod/timetable")) return "Timetable Management";
    if (pathname.includes("/hod/faculty")) return "Faculty";
    if (pathname.includes("/hod/students")) return "Students";
    if (pathname.includes("/hod/subjects")) return "Subjects";
    if (pathname.includes("/hod/reports")) return "Reports & Analytics";
    if (pathname.includes("/hod/settings")) return "Settings";
    if (pathname.includes("/hod/account")) return "Account";
    return "Dashboard";
  };

  const [initials, setInitials] = useState("HD");
  const [userName, setUserName] = useState("HOD Name");
  const [userEmail, setUserEmail] = useState("hod@srmap.edu.in");

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("currentUser");
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user.name) {
          setUserName(user.name);
          const parts = user.name.split(' ');
          const f = parts[0]?.[0] || '';
          const l = parts[1]?.[0] || '';
          setInitials((f + l).toUpperCase() || "HD");
        }
        if (user.email) {
          setUserEmail(user.email);
        }
      }
    }
    
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsProfileOpen(false);
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

        {/* Profile Dropdown Trigger */}
        <div className={styles.profileWrapper} ref={dropdownRef}>
          <button 
            className={styles.avatarBtn} 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            title="User Profile Options"
          >
            {initials}
          </button>

          {/* Profile Popover Menu */}
          {isProfileOpen && (
            <div className={styles.profilePopover}>
              <div className={styles.popoverHeader}>
                <div className={styles.popoverAvatar}>{initials}</div>
                <div className={styles.popoverMeta}>
                  <span className={styles.popoverName}>{userName}</span>
                  <span className={styles.popoverEmail}>{userEmail}</span>
                </div>
              </div>

              <div className={styles.popoverDivider} />

              <Link 
                href="/hod/account" 
                className={styles.popoverItem}
                onClick={() => setIsProfileOpen(false)}
              >
                <User size={16} />
                <span>Account</span>
              </Link>

              <div className={styles.popoverDivider} />

              <button className={styles.popoverItem} onClick={handleLogout}>
                <LogOut size={16} />
                <span>Log out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
