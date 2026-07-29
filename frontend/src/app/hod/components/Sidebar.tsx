"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  GraduationCap, 
  Users, 
  BookOpen, 
  BarChart3, 
  Settings, 
  PanelLeftClose, 
  PanelLeftOpen,
  Zap
} from "lucide-react";
import styles from "../hod-layout.module.css";

const navItems = [
  { label: "Dashboard", href: "/hod", icon: LayoutDashboard },
  { label: "Faculty", href: "/hod/faculty", icon: GraduationCap },
  { label: "Students", href: "/hod/students", icon: Users },
  { label: "Subjects", href: "/hod/subjects", icon: BookOpen },
  { label: "Reports & Analytics", href: "/hod/reports", icon: BarChart3 },
  { label: "Settings", href: "/hod/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.sidebarCollapsed : ""}`}>
      <div className={styles.logoContainer}>
        <div className={styles.logoIcon}>
          <GraduationCap size={18} />
        </div>
        {!isCollapsed && (
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>MyStory CIP</span>
            <span className={styles.logoSubtitle}>HOD PORTAL</span>
          </div>
        )}
        <button 
          suppressHydrationWarning 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className={styles.collapseBtn}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      <nav className={styles.navContainer}>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/hod" && pathname.startsWith(item.href));
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

      {/* Sidebar Footer Removed as requested */}
    </aside>
  );
}
