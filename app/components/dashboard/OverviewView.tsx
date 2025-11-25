'use client';

import { useRef } from 'react';
import LiquidGlass from 'liquid-glass-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface OverviewViewProps {
  onNavigate: (view: 'overview' | 'blobs' | 'generate') => void;
}

export default function OverviewView({ onNavigate }: OverviewViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mock data - will be replaced with real data from backend
  const stats = {
    totalBlobs: 12,
    resumesGenerated: 5,
    recentActivity: [
      { id: 1, action: 'Generated resume for Software Engineer at Google', date: '2 hours ago' },
      { id: 2, action: 'Added new project: E-commerce Platform', date: '1 day ago' },
      { id: 3, action: 'Updated work experience: Intern at Meta', date: '3 days ago' },
    ],
  };

  return (
    <div ref={containerRef} className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Welcome back!</h1>
        <p className="text-muted-foreground text-lg">
          Here's an overview of your resume building progress
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card glass hover>
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">{stats.totalBlobs}</p>
            <p className="text-muted-foreground">Total Experiences</p>
          </div>
        </Card>

        <Card glass hover>
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">{stats.resumesGenerated}</p>
            <p className="text-muted-foreground">Resumes Generated</p>
          </div>
        </Card>

        <Card glass hover className="md:col-span-2 lg:col-span-1">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">Ready</p>
            <p className="text-muted-foreground">System Status</p>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card hover>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Generate New Resume
                </h3>
                <p className="text-muted-foreground text-sm">
                  Paste a job description and create a tailored resume
                </p>
              </div>
              <Button variant="glass" onClick={() => onNavigate('generate')}>
                Start
              </Button>
            </div>
          </Card>

          <Card hover>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Add Experience
                </h3>
                <p className="text-muted-foreground text-sm">
                  Add new work, projects, or achievements
                </p>
              </div>
              <Button variant="glass" onClick={() => onNavigate('blobs')}>
                Add
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Recent Activity</h2>
        <Card glass>
          <div className="space-y-4">
            {stats.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-foreground">{activity.action}</p>
                  <p className="text-sm text-muted-foreground mt-1">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
