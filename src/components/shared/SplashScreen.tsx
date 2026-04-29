'use client';

import React from 'react';

export default function SplashScreen() {
  return (
    <div 
      data-testid="splash-screen"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-[#111111]"
    >
      <div className="flex flex-col items-center animate-in zoom-in-95 duration-700">
        <div className="w-20 h-20 bg-[#2DBFAD]/20 rounded-[30px] flex items-center justify-center mb-8 backdrop-blur-sm">
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 60 60" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="10" y="10" width="8" height="40" rx="4" fill="#2DBFAD" />
            <rect x="42" y="10" width="8" height="40" rx="4" fill="#2DBFAD" />
            <path 
              d="M18 30L28 40L45 20" 
              stroke="#2DBFAD" 
              strokeWidth="7" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
        </div>
        <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">
          Habit Tracker
        </h1>
        
        <div className="flex gap-1.5 mt-4">
          <div className="w-2 h-2 bg-[#2DBFAD] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-[#2DBFAD] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-[#2DBFAD] rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}
