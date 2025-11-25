'use client';

import { useState } from 'react';
import { useRef } from 'react';
import LiquidGlass from 'liquid-glass-react';
import Button from '@/components/ui/Button';
import WorkExperienceStep from '@/components/onboarding/WorkExperienceStep';
import VolunteeringStep from '@/components/onboarding/VolunteeringStep';
import ProjectsStep from '@/components/onboarding/ProjectsStep';
import SchoolInvolvementStep from '@/components/onboarding/SchoolInvolvementStep';
import AwardsStep from '@/components/onboarding/AwardsStep';
import SkillsStep from '@/components/onboarding/SkillsStep';

const STEPS = [
  { id: 'work', title: 'Work Experience', component: WorkExperienceStep },
  { id: 'volunteering', title: 'Volunteering', component: VolunteeringStep },
  { id: 'projects', title: 'Projects', component: ProjectsStep },
  { id: 'school', title: 'School Involvement', component: SchoolInvolvementStep },
  { id: 'awards', title: 'Awards & Achievements', component: AwardsStep },
  { id: 'skills', title: 'Technical Skills', component: SkillsStep },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const CurrentStepComponent = STEPS[currentStep].component;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === STEPS.length - 1;

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      console.log('Onboarding complete');
      // TODO: Navigate to dashboard
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-background px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header with progress */}
        <div className="mb-12">
          <div className="mb-8 text-center">
            <LiquidGlass
              mouseContainer={containerRef}
              displacementScale={60}
              blurAmount={0.08}
              saturation={140}
              aberrationIntensity={2}
              elasticity={0.2}
              cornerRadius={16}
            >
              <div className="px-8 py-3">
                <h1 className="text-3xl font-bold text-foreground">
                  Let's build your experience database
                </h1>
              </div>
            </LiquidGlass>
          </div>

          <p className="text-center text-muted-foreground mb-8">
            Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep].title}
          </p>

          {/* Progress bar */}
          <div className="w-full bg-border rounded-full h-2">
            <div
              className="bg-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
            />
          </div>

          {/* Step indicators */}
          <div className="flex justify-between mt-4">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`flex flex-col items-center ${
                  index <= currentStep ? 'text-accent' : 'text-muted-foreground'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                    index <= currentStep ? 'bg-accent text-white' : 'bg-card border border-border'
                  }`}
                >
                  {index < currentStep ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <span className="text-xs hidden sm:block text-center max-w-[80px]">
                  {step.title.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="mb-8">
          <CurrentStepComponent />
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={isFirstStep}
          >
            Back
          </Button>

          <Button
            variant="glass"
            onClick={handleNext}
          >
            {isLastStep ? 'Complete' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
}
