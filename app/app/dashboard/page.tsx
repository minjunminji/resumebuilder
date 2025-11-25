'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import OverviewView from '@/components/dashboard/OverviewView';
import BlobsView from '@/components/dashboard/BlobsView';
import GenerateView from '@/components/dashboard/GenerateView';

export default function DashboardPage() {
  const [currentView, setCurrentView] = useState<'overview' | 'blobs' | 'generate'>('overview');

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />

      <main className="flex-1 overflow-auto">
        {currentView === 'overview' && <OverviewView onNavigate={setCurrentView} />}
        {currentView === 'blobs' && <BlobsView />}
        {currentView === 'generate' && <GenerateView />}
      </main>
    </div>
  );
}
