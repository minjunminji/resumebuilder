import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { GlassCard } from '../components/GlassCard';
import { GlassButton } from '../components/GlassButton';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface Blob {
  id: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  created_at: string;
}

export function Blobs() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [blobs, setBlobs] = useState<Blob[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { value: 'all', label: 'All Experiences' },
    { value: 'work_experience', label: 'Work Experience' },
    { value: 'project', label: 'Projects' },
    { value: 'volunteering', label: 'Volunteering' },
    { value: 'school', label: 'School' },
    { value: 'award', label: 'Awards' },
  ];

  useEffect(() => {
    if (!user) return;

    const fetchBlobs = async () => {
      try {
        let query = supabase
          .from('blobs')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (filter !== 'all') {
          query = query.eq('category', filter);
        }

        const { data, error } = await query;

        if (error) throw error;
        setBlobs(data || []);
      } catch (err) {
        console.error('Error fetching blobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlobs();
  }, [user, filter]);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      work_experience: 'text-blue-400',
      project: 'text-purple-400',
      volunteering: 'text-green-400',
      school: 'text-yellow-400',
      award: 'text-pink-400',
    };
    return colors[category] || 'text-gray-400';
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      work_experience: 'Work',
      project: 'Project',
      volunteering: 'Volunteering',
      school: 'School',
      award: 'Award',
    };
    return labels[category] || category;
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-gradient">
              Your Experiences
            </h1>
            <p className="text-gray-400 text-lg">
              Manage your professional experience database
            </p>
          </div>
          <GlassButton onClick={() => navigate('/blobs/new')} variant="primary">
            Add Experience
          </GlassButton>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex gap-3 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-4 py-2 rounded-lg transition-all ${
                filter === cat.value
                  ? 'bg-blue-500/30 text-blue-300 border border-blue-500/50'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Blobs Grid */}
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        ) : blobs.length === 0 ? (
          <GlassCard>
            <div className="p-12 text-center">
              <p className="text-gray-400 mb-4">
                No experiences found. Start building your database!
              </p>
              <GlassButton onClick={() => navigate('/blobs/new')} variant="primary">
                Add Your First Experience
              </GlassButton>
            </div>
          </GlassCard>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blobs.map((blob) => (
              <GlassCard key={blob.id} hover>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`text-sm font-medium ${getCategoryColor(blob.category)}`}>
                      {getCategoryLabel(blob.category)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(blob.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {blob.title}
                  </h3>

                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {blob.description}
                  </p>

                  {blob.tags && blob.tags.length > 0 && (
                    <div className="flex gap-2 flex-wrap mb-4">
                      {blob.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <GlassButton
                    onClick={() => navigate(`/blobs/${blob.id}`)}
                    variant="secondary"
                  >
                    View Details
                  </GlassButton>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
