import { ReactNode, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LiquidGlass from 'liquid-glass-react';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/blobs', label: 'Experiences' },
    { path: '/generate', label: 'Generate Resume' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      {user && (
        <nav className="fixed top-0 left-0 right-0 z-50 p-4">
          <div className="max-w-7xl mx-auto">
            <LiquidGlass
              mouseContainer={containerRef}
              elasticity={0.25}
              displacementScale={50}
              blurAmount={0.08}
              saturation={120}
              className="px-6 py-3"
            >
              <div className="flex items-center justify-between">
                <Link to="/dashboard" className="text-2xl font-bold text-gradient">
                  ResumeForge
                </Link>

                <div className="flex items-center gap-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`transition-colors ${
                        location.pathname === item.path
                          ? 'text-blue-400 font-medium'
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}

                  <button
                    onClick={signOut}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </LiquidGlass>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className={user ? 'pt-24 pb-8 px-4' : 'p-4'}>
        {children}
      </main>
    </div>
  );
}
