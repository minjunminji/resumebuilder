import { useState, useRef } from 'react';
import LiquidGlass from 'liquid-glass-react';
import { Layout } from '../components/Layout';
import { GlassButton } from '../components/GlassButton';

export function Generate() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [jobDescription, setJobDescription] = useState('');

  return (
    <Layout>
      <div ref={containerRef} className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gradient">
            Generate Resume
          </h1>
          <p className="text-gray-400 text-lg">
            Paste a job description and we'll create a tailored resume for you
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Job Description Input */}
          <div>
            <LiquidGlass
              mouseContainer={containerRef}
              elasticity={0.25}
              displacementScale={50}
              blurAmount={0.08}
              saturation={120}
              className="p-6"
            >
              <h2 className="text-xl font-semibold mb-4 text-white">
                Job Description
              </h2>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                rows={15}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent resize-none mb-4"
              />
              <GlassButton
                variant="primary"
                className="w-full"
                disabled={!jobDescription.trim()}
              >
                Analyze & Generate
              </GlassButton>
            </LiquidGlass>
          </div>

          {/* Preview / Results */}
          <div>
            <LiquidGlass
              mouseContainer={containerRef}
              elasticity={0.25}
              displacementScale={50}
              blurAmount={0.08}
              saturation={120}
              className="p-6 h-full"
            >
              <h2 className="text-xl font-semibold mb-4 text-white">
                Preview
              </h2>
              <div className="text-gray-400 text-center py-12">
                {jobDescription.trim()
                  ? 'Click "Analyze & Generate" to create your tailored resume'
                  : 'Paste a job description to get started'}
              </div>
            </LiquidGlass>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-8">
          <LiquidGlass
            mouseContainer={containerRef}
            elasticity={0.2}
            displacementScale={40}
            blurAmount={0.075}
            saturation={130}
            className="p-6"
          >
            <h3 className="text-lg font-semibold mb-3 text-white">
              How it works
            </h3>
            <ol className="text-gray-400 space-y-2">
              <li>1. Paste the job description for the role you're applying to</li>
              <li>2. Our AI analyzes the requirements and selects relevant experiences from your database</li>
              <li>3. We generate tailored bullet points that highlight your most relevant skills and achievements</li>
              <li>4. Review and refine the generated resume</li>
              <li>5. Download your polished, LaTeX-formatted PDF</li>
            </ol>
          </LiquidGlass>
        </div>
      </div>
    </Layout>
  );
}
