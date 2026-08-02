"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  Radio, 
  BarChart3, 
  Clock, 
  FolderDown, 
  Settings, 
  GraduationCap, 
  PanelLeftClose, 
  PanelLeftOpen 
} from "lucide-react";
import styles from "../student-layout.module.css";

const navItems = [
  { label: "Dashboard", href: "/student", icon: LayoutDashboard },
  { label: "Timetable", href: "/student/timetable", icon: Clock },
  { label: "Live Classroom", href: "/student/pulse", icon: Radio },
  { label: "My Courses", href: "/student/courses", icon: BookOpen },
  { label: "Resources", href: "/student/resources", icon: FolderDown },
  { label: "Reports & Analytics", href: "/student/reports", icon: BarChart3 },
  { label: "Settings", href: "/student/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.sidebarCollapsed : ""}`}>
      <div className={styles.logoContainer}>
        <div className={styles.logoIcon}>
          <GraduationCap size={20} />
        </div>
        {!isCollapsed && (
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>MyStory CIP</span>
            <span className={styles.logoSubtitle}>STUDENT PORTAL</span>
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
          const isActive = pathname === item.href || (item.href !== "/student" && pathname.startsWith(item.href));
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon size={19} strokeWidth={isActive ? 2.5 : 2} style={{ minWidth: "19px" }} />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
