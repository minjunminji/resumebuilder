import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { GlassCard } from '../components/GlassCard';
import { GlassButton } from '../components/GlassButton';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface Stats {
  blobs: number;
  resumes: number;
  bulletVersions: number;
}

export function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({ blobs: 0, resumes: 0, bulletVersions: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchStats = async () => {
      try {
        const [blobsRes, resumesRes, bulletsRes] = await Promise.all([
          supabase.from('blobs').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
          supabase.from('generated_resumes').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
          supabase.from('bullet_versions').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
        ]);

        setStats({
          blobs: blobsRes.count || 0,
          resumes: resumesRes.count || 0,
          bulletVersions: bulletsRes.count || 0,
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  const quickActions = [
    {
      title: 'Add Experience',
      description: 'Create a new experience blob',
      action: () => navigate('/blobs/new'),
      icon: '✨',
    },
    {
      title: 'Generate Resume',
      description: 'Create a tailored resume',
      action: () => navigate('/generate'),
      icon: '📄',
    },
    {
      title: 'View Experiences',
      description: 'Browse your experience database',
      action: () => navigate('/blobs'),
      icon: '📚',
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 text-gradient">
            Welcome back!
          </h1>
          <p className="text-gray-400 text-lg">
            Ready to craft your perfect resume?
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <GlassCard>
            <div className="p-6">
              <div className="text-gray-400 text-sm mb-1">Experiences</div>
              <div className="text-4xl font-bold text-blue-400">
                {loading ? '...' : stats.blobs}
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="p-6">
              <div className="text-gray-400 text-sm mb-1">Resumes Generated</div>
              <div className="text-4xl font-bold text-purple-400">
                {loading ? '...' : stats.resumes}
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="p-6">
              <div className="text-gray-400 text-sm mb-1">Bullet Versions</div>
              <div className="text-4xl font-bold text-pink-400">
                {loading ? '...' : stats.bulletVersions}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-white">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action) => (
              <GlassCard key={action.title} hover>
                <div className="p-6">
                  <div className="text-4xl mb-4">{action.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {action.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{action.description}</p>
                  <GlassButton onClick={action.action} variant="secondary">
                    Get Started
                  </GlassButton>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Getting Started */}
        {stats.blobs === 0 && !loading && (
          <GlassCard className="mt-8">
            <div className="p-8 text-center">
              <h3 className="text-2xl font-semibold mb-4 text-white">
                Let's Get Started
              </h3>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                Start by adding your experiences, projects, and achievements to your database.
                The more detail you provide, the better resumes we can generate for you!
              </p>
              <GlassButton onClick={() => navigate('/blobs/new')} variant="primary">
                Add Your First Experience
              </GlassButton>
            </div>
          </GlassCard>
        )}
      </div>
    </Layout>
  );
}
