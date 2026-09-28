import React, { useState, useEffect } from 'react';
import { SOCIETY_LOGO_URL } from '../data/mockData';

interface SplashScreenProps {
  onFinish: () => void;
  phoneDisplay: string;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish, phoneDisplay }) => {
  const [stage, setStage] = useState<'enter' | 'reveal' | 'exit'>('enter');

  useEffect(() => {
    // 1. Stage 1: Initial grand logo entrance & pulsing glow (0ms - 1800ms)
    const revealTimer = setTimeout(() => {
      setStage('reveal');
    }, 1800);

    // 2. Stage 2: Slow motion expand and fade reveal to open the full app (2600ms)
    const exitTimer = setTimeout(() => {
      setStage('exit');
    }, 2800);

    // 3. Stage 3: Complete transition after smooth slow-motion crossfade (3600ms total)
    const finishTimer = setTimeout(() => {
      onFinish();
    }, 3600);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#00142f] text-white overflow-hidden transition-all duration-1000 ease-out select-none ${
        stage === 'exit'
          ? 'opacity-0 scale-105 pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient background rays / glow rings */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#fd8a42]/15 blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute w-[350px] h-[350px] rounded-full bg-[#00216c]/40 blur-2xl pointer-events-none" />

      {/* Center Grand Logo Container */}
      <div className="relative flex flex-col items-center justify-center z-10 px-6 text-center max-w-sm">
        {/* Animated Rings around the Big Logo */}
        <div className="relative mb-6">
          <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#fd8a42]/30 via-transparent to-[#ffdbca]/40 blur-md animate-spin-slow" />
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-white p-2 sm:p-2.5 shadow-[0_0_50px_rgba(253,138,66,0.45)] flex items-center justify-center transform transition-transform duration-1000 ease-out hover:scale-105">
            <img
              src={SOCIETY_LOGO_URL}
              alt="डॉ. भीमराव अंबेडकर एजुकेशनल सोसाइटी"
              className="w-full h-full object-contain rounded-full drop-shadow-md"
            />
          </div>
        </div>

        {/* Title with Slow Fade & Slide Up */}
        <div className="space-y-2 transform transition-all duration-1000 ease-out">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fd8a42]/20 border border-[#fd8a42]/40 text-[#ffdbca] text-xs font-semibold tracking-wide uppercase">
            <span className="material-symbols-outlined text-[15px]">verified</span>
            <span>अम्बेडकर नगर • उत्तर प्रदेश</span>
          </span>

          <h1 className="font-serif font-bold text-xl sm:text-2xl text-white tracking-tight leading-snug drop-shadow-sm">
            डॉ. भीमराव अंबेडकर एजुकेशनल सोसाइटी
          </h1>

          <p className="text-xs sm:text-sm text-[#7a91b7] font-medium leading-relaxed">
            शिक्षा, सहयोग और सम्मान की दिशा में
          </p>
        </div>

        {/* Direct Phone Helpline badge */}
        <div className="mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0f294a]/80 border border-[#7a91b7]/30 text-xs text-[#ffdbca] shadow-sm">
          <span className="material-symbols-outlined text-[16px] text-[#fd8a42]">call</span>
          <span className="font-mono font-semibold tracking-wider">{phoneDisplay}</span>
        </div>

        {/* Slow Motion Loading Bar */}
        <div className="w-48 h-1.5 bg-[#0f294a] rounded-full mt-7 overflow-hidden relative shadow-inner">
          <div className="h-full bg-gradient-to-r from-[#fd8a42] via-[#ffdbca] to-[#fd8a42] rounded-full animate-splash-progress" />
        </div>

        <span className="text-[11px] text-[#7a91b7] mt-2.5 tracking-wide">
          पोर्टल प्रारंभ हो रहा है...
        </span>

        {/* Skip button for quick convenience */}
        <button
          onClick={onFinish}
          className="mt-4 text-[11px] text-[#7a91b7] hover:text-white underline underline-offset-2 transition-colors active:scale-95"
          type="button"
        >
          सीधे प्रवेश करें (Skip)
        </button>
      </div>
    </div>
  );
};
