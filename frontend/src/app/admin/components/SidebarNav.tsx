"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Briefcase, 
  Activity, 
  BarChart2 
} from 'lucide-react';

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="sidebar-nav">
      <Link 
        href="/admin/dashboard" 
        className={`sidebar-link ${pathname === '/admin/dashboard' ? 'active' : ''}`}
      >
        <LayoutDashboard size={18} />
        Dashboard
      </Link>
      <Link 
        href="/admin/academic-structure" 
        className={`sidebar-link ${pathname === '/admin/academic-structure' ? 'active' : ''}`}
      >
        <BookOpen size={18} />
        Academic Structure
      </Link>
      <Link 
        href="/admin/user-management" 
        className={`sidebar-link ${pathname === '/admin/user-management' ? 'active' : ''}`}
      >
        <Users size={18} />
        User Management
      </Link>
      <Link 
        href="/admin/faculty-assignment" 
        className={`sidebar-link ${pathname === '/admin/faculty-assignment' ? 'active' : ''}`}
      >
        <Briefcase size={18} />
        Faculty Assignment
      </Link>
      <Link 
        href="/admin/session-monitoring" 
        className={`sidebar-link ${pathname === '/admin/session-monitoring' ? 'active' : ''}`}
      >
        <Activity size={18} />
        Session Monitoring
      </Link>
      <Link 
        href="/admin/reports" 
        className={`sidebar-link ${pathname === '/admin/reports' ? 'active' : ''}`}
      >
        <BarChart2 size={18} />
        Reports
      </Link>
    </nav>
  );
}
