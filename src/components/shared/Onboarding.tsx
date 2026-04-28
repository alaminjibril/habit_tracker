'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface OnboardingProps {
  onComplete: () => void;
}

const steps = [
  {
    title: "Welcome To HabiTrack!",
    subtitle: "Build your routine and choose from suggested habits or create your own to suit your life.",
    image: "/images/onboarding-1.png",
  },
  {
    title: "Create Better Habits",
    subtitle: "Start building routines that help you grow, one day at a time.",
    image: "/images/onboarding-2.png",
  },
  {
    title: "Track Your Progress",
    subtitle: "Stay motivated by watching your daily progress.",
    image: "/images/onboarding-3.png",
  }
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    onComplete();
  };

  const step = steps[currentStep];

  return (
    <div className="flex flex-col min-h-screen w-full bg-white dark:bg-[#232323] px-8 py-12 animate-in fade-in duration-500">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex gap-2">
          {steps.map((_, index) => (
            <div 
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentStep ? 'w-8 bg-[#02CAA9]' : 'w-4 bg-zinc-200 dark:bg-zinc-800'
              }`}
            />
          ))}
        </div>
        
        {currentStep < steps.length - 1 ? (
          <button 
            onClick={handleFinish}
            className="text-zinc-400 dark:text-zinc-500 font-medium hover:text-[#02CAA9] transition-colors"
          >
            Skip
          </button>
        ) : (
          <button 
            onClick={handleFinish}
            className="flex items-center gap-1 text-[#02CAA9] font-bold hover:underline"
          >
            Let's Start
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Illustration Area */}
      <div className="flex-1 flex items-center justify-center mb-12 relative">
        <div className="w-full max-w-sm aspect-square relative transition-all duration-500 transform animate-in slide-in-from-right-8">
          <Image 
            src={step.image}
            alt={step.title}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="text-center mb-12 animate-in slide-in-from-bottom-8 duration-500">
        <h2 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">
          {step.title}
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed max-w-[280px] mx-auto">
          {step.subtitle}
        </p>
      </div>

      {/* Bottom Button */}
      <div className="flex justify-center pb-8">
        <button
          onClick={handleNext}
          className="group relative w-16 h-16 rounded-full bg-[#02CAA9] flex items-center justify-center shadow-xl shadow-[#02CAA9]/30 transition-all hover:scale-110 active:scale-95"
        >
          {/* Circular progress track (decorative) */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="30"
              stroke="white"
              strokeWidth="1"
              fill="transparent"
              strokeDasharray="188.4"
              strokeDashoffset={188.4 - (188.4 * (currentStep + 1)) / 3}
              className="transition-all duration-500"
            />
          </svg>
          
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
