import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LiquidGlass from 'liquid-glass-react';
import { Layout } from '../components/Layout';
import { GlassButton } from '../components/GlassButton';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export function NewBlob() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const [category, setCategory] = useState('work_experience');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    { value: 'work_experience', label: 'Work Experience' },
    { value: 'project', label: 'Project' },
    { value: 'volunteering', label: 'Volunteering' },
    { value: 'school', label: 'School Involvement' },
    { value: 'award', label: 'Award / Achievement' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError('');

    try {
      const tagArray = tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const { error } = await supabase.from('blobs').insert({
        user_id: user.id,
        category,
        title,
        description,
        tags: tagArray,
      });

      if (error) throw error;

      navigate('/blobs');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const wordCount = description.trim().split(/\s+/).filter((w) => w.length > 0).length;

  return (
    <Layout>
      <div ref={containerRef} className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gradient">
            Add Experience
          </h1>
          <p className="text-gray-400 text-lg">
            Share your story with as much detail as possible
          </p>
        </div>

        <LiquidGlass
          mouseContainer={containerRef}
          elasticity={0.25}
          displacementScale={50}
          blurAmount={0.08}
          saturation={120}
          className="p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-300 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value} className="bg-slate-900">
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="e.g., Software Engineering Intern at Google"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                  Description
                </label>
                <span className={`text-sm ${wordCount >= 50 ? 'text-green-400' : 'text-gray-500'}`}>
                  {wordCount} words {wordCount < 50 && `(${50 - wordCount} more recommended)`}
                </span>
              </div>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={10}
                placeholder="Tell us everything about this experience. The more detail you provide, the better we can generate tailored resume bullets. Include what you did, technologies used, impact, achievements, etc."
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent resize-none"
              />
              <p className="text-xs text-gray-500 mt-2">
                💡 Tip: Include metrics, specific technologies, and outcomes. More context = better resume bullets!
              </p>
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-2">
                Tags (optional)
              </label>
              <input
                id="tags"
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g., Python, Machine Learning, Leadership"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-2">
                Separate tags with commas
              </p>
            </div>

            <div className="flex gap-4">
              <GlassButton
                type="submit"
                variant="primary"
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Saving...' : 'Save Experience'}
              </GlassButton>
              <GlassButton
                type="button"
                variant="secondary"
                onClick={() => navigate('/blobs')}
              >
                Cancel
              </GlassButton>
            </div>
          </form>
        </LiquidGlass>
      </div>
    </Layout>
  );
}
