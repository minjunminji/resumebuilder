'use client';

import { useState } from 'react';
import LiquidGlass from 'liquid-glass-react';

interface SidebarProps {
  currentView: 'overview' | 'blobs' | 'generate';
  onViewChange: (view: 'overview' | 'blobs' | 'generate') => void;
}

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'blobs', label: 'My Experiences', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { id: 'generate', label: 'Generate Resume', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  ];

  return (
    <aside
      className={`${
        isCollapsed ? 'w-20' : 'w-64'
      } h-screen bg-card border-r border-border transition-all duration-300 flex flex-col`}
    >
      {/* Logo/Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-foreground">ResumeForge</h1>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-background transition-colors text-muted-foreground"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isCollapsed ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-accent text-white'
                  : 'text-muted-foreground hover:bg-background hover:text-foreground'
              }`}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold">
            U
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">User</p>
              <p className="text-xs text-muted-foreground">user@example.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
