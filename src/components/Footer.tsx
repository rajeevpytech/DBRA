import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <footer className="w-full bg-[#eff4ff] px-4 pt-8 pb-6 text-center mt-auto border-t border-[#dce9ff]/50">
      <div className="max-w-md mx-auto flex flex-col items-center gap-2">
        <div className="w-8 h-1 rounded-full bg-[#fd8a42]/40" />
        <p className="text-sm text-[#44474e] font-medium leading-relaxed">
          {t.footerNote}
        </p>
        <div className="flex items-center justify-center gap-1.5 text-xs text-[#74777f]">
          <span className="material-symbols-outlined text-[15px] text-[#9b4500]">verified</span>
          <span>{t.registeredTrust}</span>
        </div>
        <p className="text-xs text-[#74777f] pt-1">
          Website designed and developed by{' '}
          <a
            className="text-[#00142f] font-semibold underline decoration-[#9b4500] decoration-1 underline-offset-2 hover:text-[#9b4500]"
            href="https://www.pytechdigital.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            PyTech Digital Pvt Ltd
          </a>
        </p>
      </div>
    </footer>
  );
};
