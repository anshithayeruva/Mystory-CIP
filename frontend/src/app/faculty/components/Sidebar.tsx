"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  Activity, 
  Radio, 
  BarChart2, 
  Target, 
  FileText, 
  User, 
  HelpCircle, 
  LogOut
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname() || '';

  const navItems = [
    { name: 'Dashboard', path: '/faculty/dashboard', icon: LayoutDashboard },
    { name: 'Subjects', path: '/faculty/subjects', icon: BookOpen },
    { name: 'Pulse Sessions', path: '/faculty/pulse-sessions', icon: Activity },

    { name: 'Concept Gap Analysis', path: '/faculty/concept-gap-analysis', icon: Target },
    { name: 'Reports', path: '/faculty/reports', icon: FileText },
  ];

  const bottomNavItems = [
    { name: 'Profile', path: '/faculty/profile', icon: User },
    { name: 'Help Center', path: '/faculty/help', icon: HelpCircle },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-brand">
          MyStory CIP
          <span className="sidebar-subtitle">Academic Intelligence</span>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          // Dashboard needs exact match so it doesn't highlight when on /faculty/dashboard-something-else (not that we have any, but good practice)
          const isActive = item.path === '/faculty/dashboard' 
            ? pathname === item.path 
            : pathname.startsWith(item.path);
            
          return (
            <Link key={item.name} href={item.path} className={`sidebar-nav-item ${isActive ? 'active' : ''}`}>
              <Icon className="sidebar-icon" /> {item.name}
            </Link>
          );
        })}
        
        <div className="sidebar-divider"></div>
        
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.path);
          return (
            <Link key={item.name} href={item.path} className={`sidebar-nav-item ${isActive ? 'active' : ''}`}>
              <Icon className="sidebar-icon" /> {item.name}
            </Link>
          );
        })}
        <Link href="/logout" className="sidebar-nav-item">
          <LogOut className="sidebar-icon" /> Sign Out
        </Link>
      </nav>
    </aside>
  );
}
