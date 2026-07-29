"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, LogOut } from "lucide-react";
import styles from "../hod-layout.module.css";

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
    router.push("/login");
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>Dashboard</h1>
      
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
                  <span className={styles.popoverEmail}>anshitha_yeruva@srmap.edu.in</span>
                </div>
              </div>

              <div className={styles.popoverDivider} />

              <Link 
                href="/hod/settings" 
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
