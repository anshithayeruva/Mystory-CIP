"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, GraduationCap, Users, BarChart3, Settings, Building2, ChevronUp, ChevronDown } from "lucide-react";
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

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <div className={styles.logoIcon}>
          <Building2 size={20} />
        </div>
        <div className={styles.logoText}>
          <span className={styles.logoTitle}>MyStory CIP</span>
          <span className={styles.logoSubtitle}>INSTITUTION ADMIN</span>
        </div>
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
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span>{item.label}</span>
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
          <div>
            <div className={styles.userName}>Admin User</div>
            <div className={styles.userRole}>Super Admin</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", color: "var(--text-muted)" }}>
          <ChevronUp size={14} style={{ marginBottom: "-4px" }} />
          <ChevronDown size={14} />
        </div>
      </div>
    </aside>
  );
}
