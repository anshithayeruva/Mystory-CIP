"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  Radio, 
  FileText, 
  ActivitySquare, 
  BarChart3, 
  UserCircle, 
  HelpCircle, 
  LogOut,
  Zap
} from 'lucide-react';
import styles from '../../styles/faculty.module.css';

const menuItems = [
  { name: 'Dashboard', href: '/faculty', icon: LayoutDashboard },
  { name: 'Subjects', href: '/faculty/subjects', icon: BookOpen },
  { name: 'Pulse Sessions', href: '/faculty/pulse-sessions', icon: Radio },
  { name: 'Session Summary', href: '/faculty/session-summary', icon: FileText },
  { name: 'Concept Gap Analysis', href: '/faculty/concept-gap-analysis', icon: ActivitySquare },
  { name: 'Reports', href: '/faculty/reports', icon: BarChart3 },
];

const bottomItems = [
  { name: 'Profile', href: '/faculty/profile', icon: UserCircle },
  { name: 'Help Center', href: '/faculty/help', icon: HelpCircle },
  { name: 'Sign Out', href: '/signin', icon: LogOut },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarLogo} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 4, padding: '32px 24px' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#10633B' }}>MyStory CIP</div>
        <div style={{ fontSize: 10, fontWeight: 600, color: '#6B7280', letterSpacing: '0.05em' }}>ACADEMIC INTELLIGENCE</div>
      </div>
      
      <div className={styles.sidebarMenu}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link 
              key={item.name} 
              href={item.href} 
              className={`${styles.sidebarItem} ${isActive ? styles.sidebarItemActive : ''}`}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className={styles.sidebarDivider}></div>

      <div className={styles.sidebarMenu} style={{ flex: 'none', paddingBottom: 24 }}>
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link 
              key={item.name} 
              href={item.href} 
              className={styles.sidebarItem}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </div>
      
      <div style={{ padding: '24px' }}>
        <div style={{ width: 32, height: 32, backgroundColor: '#111827', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <Zap size={16} fill="white" />
        </div>
      </div>
    </aside>
  );
};
