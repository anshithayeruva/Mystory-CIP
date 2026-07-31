"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  Radio, 
  FileCheck2, 
  Award, 
  CalendarCheck, 
  Clock, 
  FolderDown, 
  Megaphone, 
  MessageSquareText, 
  User, 
  GraduationCap, 
  PanelLeftClose, 
  PanelLeftOpen 
} from "lucide-react";
import styles from "../student-layout.module.css";

const navItems = [
  { label: "Dashboard", href: "/student", icon: LayoutDashboard },
  { label: "My Courses", href: "/student/courses", icon: BookOpen },
  { label: "Live Classroom", href: "/student/pulse", icon: Radio },
  { label: "Assignments", href: "/student/assignments", icon: FileCheck2 },
  { label: "Grades & Progress", href: "/student/grades", icon: Award },
  { label: "Attendance", href: "/student/attendance", icon: CalendarCheck },
  { label: "Timetable", href: "/student/timetable", icon: Clock },
  { label: "Resources", href: "/student/resources", icon: FolderDown },
  { label: "Announcements", href: "/student/announcements", icon: Megaphone },
  { label: "Messages", href: "/student/messages", icon: MessageSquareText },
  { label: "My Profile", href: "/student/profile", icon: User },
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
