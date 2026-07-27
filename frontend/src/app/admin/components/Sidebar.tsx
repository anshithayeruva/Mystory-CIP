"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, GraduationCap, Users, BarChart3, Settings, Building2, ChevronUp, ChevronDown, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import styles from "../admin-layout.module.css";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Academics", href: "/admin/academic-structure", icon: GraduationCap },
  { label: "Directory", href: "/admin/user-management", icon: Users },
  { label: "Reports & Analytics", href: "/admin/reports", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.sidebarCollapsed : ""}`}>
      <div className={styles.logoContainer}>
        <div className={styles.logoIcon}>
          <Building2 size={20} />
        </div>
        {!isCollapsed && (
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>MyStory CIP</span>
            <span className={styles.logoSubtitle}>INSTITUTION ADMIN</span>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className={styles.collapseBtn}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      <nav className={styles.navContainer}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} style={{ minWidth: "20px" }} />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className={styles.userProfile}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" 
              alt="Admin User" 
              className={styles.avatar}
            />
          </div>
          {!isCollapsed && (
            <div>
              <div className={styles.userName}>Admin User</div>
              <div className={styles.userRole}>Super Admin</div>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <div style={{ display: "flex", flexDirection: "column", color: "var(--text-muted)" }}>
            <ChevronUp size={14} style={{ marginBottom: "-4px" }} />
            <ChevronDown size={14} />
          </div>
        )}
      </div>
    </aside>
  );
}
