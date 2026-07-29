import React from 'react';
import './faculty.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

export default function FacultyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="faculty-layout">
      {/* Dynamic Client-Side Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="main-content">
        {/* Dynamic Client-Side Top Header */}
        <Header />

        {/* Dynamic Page Content */}
        {children}
      </main>
    </div>
  );
}
