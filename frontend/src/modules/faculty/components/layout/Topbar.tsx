"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { User, LogOut } from "lucide-react";
import styles from "../../styles/faculty-layout.module.css";

const getPageTitle = (pathname: string) => {
  if (pathname === '/faculty') return 'Dashboard';
  if (pathname.includes('/subjects')) return 'Subjects';
  if (pathname.includes('/pulse-sessions/create')) return 'Create Pulse Session';
  if (pathname.includes('/live')) return 'Live Session';
  if (pathname.includes('/summary')) return 'Session Summary';
  if (pathname.includes('/pulse-sessions')) return 'Pulse Sessions';
  if (pathname.includes('/concept-gap-analysis')) return 'Concept Gap Analysis';
  if (pathname.includes('/reports')) return 'Reports';
  if (pathname.includes('/settings')) return 'Settings';
  if (pathname.includes('/profile')) return 'Profile';
  if (pathname.includes('/help')) return 'Help Center';
  return '';
};

export default function Topbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsProfileOpen(false);
    router.push("/signin");
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>{getPageTitle(pathname)}</h1>
      
      <div className={styles.headerActions}>

        {/* Profile Dropdown Trigger */}
        <div className={styles.profileWrapper} ref={dropdownRef}>
          <button 
            className={styles.avatarBtn} 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            title="User Profile Options"
          >
            AY
          </button>

          {/* Profile Popover Menu */}
          {isProfileOpen && (
            <div className={styles.profilePopover}>
              <div className={styles.popoverHeader}>
                <div className={styles.popoverAvatar}>AY</div>
                <div className={styles.popoverMeta}>
                  <span className={styles.popoverName}>Anshitha Yeruva</span>
                  <span className={styles.popoverEmail}>faculty@mystory.edu</span>
                </div>
              </div>

              <div className={styles.popoverDivider} />

              <Link 
                href="/faculty/account" 
                className={styles.popoverItem}
                onClick={() => setIsProfileOpen(false)}
              >
                <User size={16} />
                <span>Account</span>
              </Link>

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
