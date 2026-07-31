"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  Radio, 
  FileText, 
  ActivitySquare, 
  BarChart3, 
  PanelLeftClose, 
  PanelLeftOpen,
  UserCircle,
  HelpCircle,
  LogOut,
  Settings,
  GraduationCap
} from "lucide-react";
import styles from "../../styles/faculty-layout.module.css";

const navItems = [
  { label: "Dashboard", href: "/faculty", icon: LayoutDashboard },
  { label: "Subjects", href: "/faculty/subjects", icon: BookOpen },
  { label: "Pulse Sessions", href: "/faculty/pulse-sessions", icon: Radio },
  { label: "Concept Gap Analysis", href: "/faculty/concept-gap-analysis", icon: ActivitySquare },
  { label: "Settings", href: "/faculty/settings", icon: Settings },
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
            <span className={styles.logoSubtitle}>FACULTY PORTAL</span>
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
          const isActive = pathname === item.href || (item.href !== "/faculty" && pathname.startsWith(item.href));
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

    </aside>
  );
}
