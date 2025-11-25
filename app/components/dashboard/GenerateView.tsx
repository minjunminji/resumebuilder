'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Textarea from '@/components/ui/Textarea';

interface SelectedBlob {
  id: string;
  title: string;
  category: string;
  selected: boolean;
  pinned: boolean;
}

export default function GenerateView() {
  const [step, setStep] = useState<'input' | 'select' | 'preview'>('input');
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock data - will be replaced with real data from backend
  const [suggestedBlobs, setSuggestedBlobs] = useState<SelectedBlob[]>([
    { id: '1', title: 'Software Engineering Intern at Google', category: 'Work Experience', selected: true, pinned: false },
    { id: '2', title: 'E-commerce Platform', category: 'Projects', selected: true, pinned: false },
    { id: '3', title: 'Teaching Assistant', category: 'School Involvement', selected: false, pinned: false },
  ]);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setStep('select');
    }, 2000);
  };

  const toggleBlob = (id: string) => {
    setSuggestedBlobs(suggestedBlobs.map(blob =>
      blob.id === id ? { ...blob, selected: !blob.selected } : blob
    ));
  };

  const togglePin = (id: string) => {
    setSuggestedBlobs(suggestedBlobs.map(blob =>
      blob.id === id ? { ...blob, pinned: !blob.pinned, selected: true } : blob
    ));
  };

  const handleGenerate = () => {
    setStep('preview');
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Generate Resume</h1>
        <p className="text-muted-foreground text-lg">
          Create a tailored resume for your next job application
        </p>
      </div>

      {/* Step indicator */}
      <div className="mb-8 flex items-center justify-center gap-4">
        <div className={`flex items-center ${step === 'input' ? 'text-accent' : 'text-muted-foreground'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'input' ? 'bg-accent text-white' : 'bg-card border border-border'}`}>
            1
          </div>
          <span className="ml-2 hidden sm:inline">Job Description</span>
        </div>
        <div className="w-12 h-0.5 bg-border" />
        <div className={`flex items-center ${step === 'select' ? 'text-accent' : 'text-muted-foreground'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'select' ? 'bg-accent text-white' : 'bg-card border border-border'}`}>
            2
          </div>
          <span className="ml-2 hidden sm:inline">Select Experiences</span>
        </div>
        <div className="w-12 h-0.5 bg-border" />
        <div className={`flex items-center ${step === 'preview' ? 'text-accent' : 'text-muted-foreground'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'preview' ? 'bg-accent text-white' : 'bg-card border border-border'}`}>
            3
          </div>
          <span className="ml-2 hidden sm:inline">Preview & Download</span>
        </div>
      </div>

      {/* Step 1: Job Description Input */}
      {step === 'input' && (
        <Card glass>
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Paste Job Description
              </h2>
              <p className="text-muted-foreground">
                Copy and paste the full job description. Our AI will analyze it to suggest the most relevant experiences.
              </p>
            </div>

            <Textarea
              placeholder="Paste the job description here..."
              rows={16}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              characterCount={jobDescription.length}
            />

            <Button
              variant="glass"
              className="w-full"
              onClick={handleAnalyze}
              disabled={!jobDescription.trim() || isAnalyzing}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze & Continue'}
            </Button>
          </div>
        </Card>
      )}

      {/* Step 2: Select Experiences */}
      {step === 'select' && (
        <div className="space-y-6">
          <Card glass>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Select Experiences
              </h2>
              <p className="text-muted-foreground">
                We've suggested experiences that match this job. You can add, remove, or pin must-include items.
              </p>
            </div>
          </Card>

          <div className="space-y-3">
            {suggestedBlobs.map((blob) => (
              <Card key={blob.id} hover>
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={blob.selected}
                    onChange={() => toggleBlob(blob.id)}
                    className="w-5 h-5 rounded border-border bg-card text-accent focus:ring-accent"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{blob.title}</h3>
                      {blob.pinned && (
                        <span className="text-xs px-2 py-0.5 rounded bg-accent/20 text-accent">
                          Pinned
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{blob.category}</p>
                  </div>
                  <button
                    onClick={() => togglePin(blob.id)}
                    className={`p-2 rounded-lg transition-colors ${blob.pinned ? 'text-accent' : 'text-muted-foreground hover:text-accent'}`}
                  >
                    <svg className="w-5 h-5" fill={blob.pinned ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex gap-4">
            <Button variant="ghost" onClick={() => setStep('input')}>
              Back
            </Button>
            <Button
              variant="glass"
              className="flex-1"
              onClick={handleGenerate}
              disabled={suggestedBlobs.filter(b => b.selected).length === 0}
            >
              Generate Resume
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Preview & Download */}
      {step === 'preview' && (
        <div className="space-y-6">
          <Card glass>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Your Resume is Ready!
              </h2>
              <p className="text-muted-foreground">
                Review your generated resume below. You can provide feedback to refine it further.
              </p>
            </div>
          </Card>

          {/* Resume Preview */}
          <Card>
            <div className="aspect-[8.5/11] bg-background rounded-lg p-8 border border-border">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-foreground mb-2">John Doe</h1>
                <p className="text-muted-foreground">john.doe@example.com | (555) 123-4567</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-foreground border-b border-border pb-2 mb-3">
                    Experience
                  </h2>
                  <div className="space-y-4">
                    {suggestedBlobs.filter(b => b.selected && b.category === 'Work Experience').map((blob) => (
                      <div key={blob.id}>
                        <h3 className="font-semibold text-foreground">{blob.title}</h3>
                        <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                          <li>AI-generated bullet point highlighting relevant skills</li>
                          <li>Another tailored bullet emphasizing impact</li>
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground border-b border-border pb-2 mb-3">
                    Projects
                  </h2>
                  <div className="space-y-4">
                    {suggestedBlobs.filter(b => b.selected && b.category === 'Projects').map((blob) => (
                      <div key={blob.id}>
                        <h3 className="font-semibold text-foreground">{blob.title}</h3>
                        <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                          <li>AI-generated project description</li>
                          <li>Technical achievements and technologies used</li>
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="flex gap-4">
            <Button variant="ghost" onClick={() => setStep('select')}>
              Back
            </Button>
            <Button variant="secondary" className="flex-1">
              Request Changes
            </Button>
            <Button variant="glass" className="flex-1">
              Download PDF
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
