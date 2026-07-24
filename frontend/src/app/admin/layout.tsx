import { ReactNode } from 'react';
import Link from 'next/link';
import SidebarNav from './components/SidebarNav';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Briefcase, 
  Activity, 
  BarChart2, 
  LogOut, 
  User, 
  Bell, 
  HelpCircle,
  Search
} from 'lucide-react';
import './dashboard/dashboard.css';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-title">MyStory CIP</div>
          <div className="sidebar-subtitle">Admin Portal</div>
        </div>
        
        <SidebarNav />

        <div className="sidebar-footer">
          <Link href="/admin/profile" className="sidebar-footer-link">
            <User size={18} />
            Profile
          </Link>
          <button className="sidebar-footer-link logout" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="search-bar">
            <Search size={18} color="#94a3b8" />
            <input type="text" placeholder="Search students, courses, or sessions..." />
          </div>
          
          <div className="header-actions">
            <button className="icon-btn">
              <Bell size={20} />
              <span className="notification-dot"></span>
            </button>
            <button className="icon-btn">
              <HelpCircle size={20} />
            </button>
            
            <div className="user-profile">
              <div className="user-info">
                <span className="user-name">Super Admin</span>
                <span className="user-role">INSTITUTION HQ</span>
              </div>
              <div className="avatar" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=68")', backgroundSize: 'cover' }}></div>
            </div>
          </div>
        </header>

        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
}
