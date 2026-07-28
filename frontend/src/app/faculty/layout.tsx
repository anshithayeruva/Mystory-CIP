import React from 'react';
import './faculty.css';
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
  LogOut,
  Bell
} from 'lucide-react';

export default function FacultyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="faculty-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-brand">
            MyStory CIP
            <span className="sidebar-subtitle">Academic Intelligence</span>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <a href="/faculty/dashboard" className="sidebar-nav-item active">
            <LayoutDashboard className="sidebar-icon" /> Dashboard
          </a>
          <a href="#" className="sidebar-nav-item">
            <BookOpen className="sidebar-icon" /> Subjects
          </a>
          <a href="#" className="sidebar-nav-item">
            <Activity className="sidebar-icon" /> Pulse Sessions
          </a>
          <a href="#" className="sidebar-nav-item">
            <Radio className="sidebar-icon" /> Live Sessions
          </a>
          <a href="#" className="sidebar-nav-item">
            <BarChart2 className="sidebar-icon" /> Session Summary
          </a>
          <a href="#" className="sidebar-nav-item">
            <Target className="sidebar-icon" /> Concept Gap Analysis
          </a>
          <a href="#" className="sidebar-nav-item">
            <FileText className="sidebar-icon" /> Reports
          </a>
          
          <div className="sidebar-divider"></div>
          
          <a href="#" className="sidebar-nav-item">
            <User className="sidebar-icon" /> Profile
          </a>
          <a href="#" className="sidebar-nav-item">
            <HelpCircle className="sidebar-icon" /> Help Center
          </a>
          <a href="#" className="sidebar-nav-item">
            <LogOut className="sidebar-icon" /> Sign Out
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Header */}
        <header className="top-header">
          <div className="breadcrumbs">
            <span>Dashboard</span>
            <span className="breadcrumb-separator">{'>'}</span>
            <span>Faculty</span>
            <span className="breadcrumb-separator">{'>'}</span>
            <span className="breadcrumb-active">Faculty Dashboard</span>
          </div>
          
          <div className="header-actions">
            <button className="icon-btn">
              <Bell size={20} />
            </button>
            <button className="icon-btn">
              <HelpCircle size={20} />
            </button>
            
            <div className="user-profile">
              <div className="user-info">
                <span className="user-name">Dr. Aris V. K.</span>
                <span className="user-role">Senior Faculty, CSE</span>
              </div>
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=e2e8f0" 
                alt="Profile Avatar" 
                className="avatar" 
              />
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        {children}
      </main>
    </div>
  );
}
