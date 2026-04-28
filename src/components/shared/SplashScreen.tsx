'use client';

import React from 'react';

export default function SplashScreen() {
  return (
    <div 
      id="splash-screen"
      data-testid="splash-screen"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#2DBFAD] text-white"
    >
      <div className="flex flex-col items-center animate-in zoom-in-95 duration-700">
        <div className="w-20 h-20 bg-white/20 rounded-[30px] flex items-center justify-center mb-8 backdrop-blur-sm">
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 60 60" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="10" y="10" width="8" height="40" rx="4" fill="white" />
            <rect x="42" y="10" width="8" height="40" rx="4" fill="white" />
            <path 
              d="M18 30L28 40L45 20" 
              stroke="white" 
              strokeWidth="7" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
        </div>
        <h1 className="text-4xl font-black tracking-tight mb-4">
          HabiTrack
        </h1>
        
        <div className="flex gap-1.5 mt-4">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}
