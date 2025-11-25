'use client';

import { useRef } from 'react';
import LiquidGlass from 'liquid-glass-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-background" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Main heading with glass effect */}
          <div className="mb-8 inline-block">
            <LiquidGlass
              mouseContainer={containerRef}
              displacementScale={80}
              blurAmount={0.08}
              saturation={150}
              aberrationIntensity={3}
              elasticity={0.25}
              cornerRadius={24}
            >
              <div className="px-12 py-4">
                <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-foreground">
                  ResumeForge
                </h1>
              </div>
            </LiquidGlass>
          </div>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            Build tailored resumes for every job application.
            <br />
            <span className="text-foreground font-medium">One experience database. Infinite possibilities.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <Button variant="glass" size="lg">
              Get Started
            </Button>
            <Button variant="ghost" size="lg">
              Learn More
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-20">
            <Card glass hover>
              <div className="text-left">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Experience Database</h3>
                <p className="text-muted-foreground">
                  Store all your experiences once. Reuse them across unlimited resumes.
                </p>
              </div>
            </Card>

            <Card glass hover>
              <div className="text-left">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">AI-Powered Tailoring</h3>
                <p className="text-muted-foreground">
                  Paste a job description and get a perfectly tailored resume in seconds.
                </p>
              </div>
            </Card>

            <Card glass hover>
              <div className="text-left">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Version History</h3>
                <p className="text-muted-foreground">
                  Every bullet point saved. Browse past versions and reuse what works.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">
            How It Works
          </h2>

          <div className="space-y-12">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-foreground">Build Your Database</h3>
                <p className="text-muted-foreground text-lg">
                  Add all your work experiences, projects, volunteering, and achievements in one place. The more detail you provide, the better your resumes will be.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-foreground">Paste Job Description</h3>
                <p className="text-muted-foreground text-lg">
                  Found a job you want to apply for? Simply paste the job description and let AI analyze what matters.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-foreground">Get Your Resume</h3>
                <p className="text-muted-foreground text-lg">
                  Receive a perfectly tailored LaTeX resume highlighting your most relevant experiences. Edit, iterate, and download.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button variant="glass" size="lg">
              Start Building
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <LiquidGlass
            mouseContainer={containerRef}
            displacementScale={70}
            blurAmount={0.1}
            saturation={140}
            aberrationIntensity={2}
            elasticity={0.2}
            cornerRadius={24}
          >
            <div className="px-12 py-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Ready to transform your job search?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join hundreds of students landing their dream internships and jobs.
              </p>
              <Button variant="primary" size="lg">
                Create Your Account
              </Button>
            </div>
          </LiquidGlass>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 ResumeForge. Built with precision.</p>
        </div>
      </footer>
    </div>
  );
}
