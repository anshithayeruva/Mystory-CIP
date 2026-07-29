"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { Bell, HelpCircle } from 'lucide-react';

export default function Header() {
  const pathname = usePathname() || '';

  // Determine breadcrumb based on route
  let activePageName = 'Faculty Dashboard';
  
  if (pathname.startsWith('/faculty/subjects')) {
    activePageName = 'Subjects';
  } else if (pathname.startsWith('/faculty/pulse-sessions')) {
    activePageName = 'Pulse Sessions';
  } else if (pathname.startsWith('/faculty/live-sessions')) {
    activePageName = 'Live Sessions';
  } else if (pathname.startsWith('/faculty/session-summary')) {
    activePageName = 'Session Summary';
  } else if (pathname.startsWith('/faculty/concept-gap-analysis')) {
    activePageName = 'Concept Gap Analysis';
  } else if (pathname.startsWith('/faculty/reports')) {
    activePageName = 'Reports';
  } else if (pathname.startsWith('/faculty/profile')) {
    activePageName = 'Profile';
  } else if (pathname.startsWith('/faculty/help')) {
    activePageName = 'Help Center';
  }

  return (
    <header className="top-header">
      <div className="breadcrumbs">
        <span>Dashboard</span>
        <span className="breadcrumb-separator">{'>'}</span>
        <span>Faculty</span>
        <span className="breadcrumb-separator">{'>'}</span>
        <span className="breadcrumb-active">{activePageName}</span>
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
  );
}
