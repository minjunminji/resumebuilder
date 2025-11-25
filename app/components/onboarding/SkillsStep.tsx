'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function SkillsStep() {
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState('');

  const handleAdd = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const handleRemove = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-6">
      {/* Guidance */}
      <Card>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            Add Your Technical Skills
          </h3>
          <p className="text-muted-foreground">
            List programming languages, frameworks, tools, and technologies you're proficient in.
            These will be used to match you with relevant job opportunities.
          </p>
        </div>
      </Card>

      {/* Add skill input */}
      <Card glass>
        <div className="flex gap-3">
          <Input
            placeholder="e.g., Python, React, Docker, AWS..."
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button
            variant="glass"
            onClick={handleAdd}
            disabled={!currentSkill.trim()}
          >
            Add
          </Button>
        </div>
      </Card>

      {/* Skills list */}
      {skills.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <div
              key={skill}
              className="group flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:border-accent transition-colors"
            >
              <span className="text-foreground">{skill}</span>
              <button
                onClick={() => handleRemove(skill)}
                className="text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p>No skills added yet. Start adding your technical skills above!</p>
        </div>
      )}
    </div>
  );
}
