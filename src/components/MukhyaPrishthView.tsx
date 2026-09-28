import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { SOCIETY_LOGO_URL, programsData, faqList } from '../data/mockData';

interface MukhyaPrishthViewProps {
  lang: Language;
  onNavigateTab: (tab: string) => void;
  onOpenQuickDonation: () => void;
}

export const MukhyaPrishthView: React.FC<MukhyaPrishthViewProps> = ({
  lang,
  onNavigateTab,
  onOpenQuickDonation,
}) => {
  const t = translations[lang];
  const [openFaq, setOpenFaq] = useState<string | null>('faq1');

  const toggleFaq = (id: string) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto">
      {/* Top Ambient Location Pill */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between bg-[#dce9ff] text-[#0d1c2e] px-4 py-2 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-[#9b4500] text-[18px] shrink-0">
              location_on
            </span>
            <span className="text-xs font-semibold truncate">
              {t.societyLocation}
            </span>
          </div>
          <a
            href="tel:+916393608462"
            className="flex items-center gap-1 bg-white text-[#9b4500] text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 shadow-sm hover:bg-[#ffdbca] transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">call</span>
            <span>{t.helplineText}</span>
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-4 pt-1 pb-4">
        <div className="bg-[#00142f] text-white rounded-2xl p-6 sm:p-7 shadow-md relative overflow-hidden flex flex-col items-center text-center">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-12 -right-12 w-44 h-44 bg-[#fd8a42]/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#00216c]/40 rounded-full blur-xl pointer-events-none" />

          {/* Society Emblem Logo */}
          <div className="relative z-10 w-24 h-24 rounded-full bg-white p-1.5 shadow-lg flex items-center justify-center mb-3">
            <img
              alt="Dr. Bhimrao Ambedkar Educational Society Emblem"
              className="w-full h-full object-contain rounded-full"
              src={SOCIETY_LOGO_URL}
            />
          </div>

          {/* Tagline Pill */}
          <div className="relative z-10 inline-flex items-center gap-1.5 bg-[#fd8a42]/20 px-3.5 py-1 rounded-full mb-3 border border-[#fd8a42]/30">
            <span className="material-symbols-outlined text-[#ffdbca] text-[16px]">verified</span>
            <span className="text-xs font-semibold text-[#ffdbca] tracking-wide">
              {t.tagline}
            </span>
          </div>

          {/* Welcoming Headline */}
          <h2 className="relative z-10 font-serif font-bold text-xl sm:text-2xl text-white mb-2 tracking-tight leading-snug max-w-lg">
            {t.heroTitle}
          </h2>

          <p className="relative z-10 text-xs sm:text-sm text-[#7a91b7] max-w-md mb-5 leading-relaxed">
            {t.heroDesc}
          </p>

          {/* Quick Action Buttons */}
          <div className="relative z-10 w-full flex flex-col gap-2 max-w-md">
            <button
              onClick={() => onNavigateTab('hamare-karyakram')}
              className="w-full h-12 bg-[#fd8a42] hover:bg-[#e67a34] text-[#331200] font-bold text-sm sm:text-base rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">menu_book</span>
              <span>{t.viewPrograms}</span>
            </button>

            <div className="grid grid-cols-2 gap-2 w-full">
              <button
                onClick={() => onNavigateTab('sahyog-dan')}
                className="h-11 bg-white hover:bg-[#eff4ff] text-[#00142f] font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-[0.98]"
                type="button"
              >
                <span className="material-symbols-outlined text-[#9b4500] text-[18px]">volunteer_activism</span>
                <span>{t.recordDonation}</span>
              </button>

              <button
                onClick={() => onNavigateTab('dandata-login')}
                className="h-11 bg-[#0f294a] hover:bg-[#1a385f] text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-[0.98] border border-[#7a91b7]/20"
                type="button"
              >
                <span className="material-symbols-outlined text-[#dce1ff] text-[18px]">badge</span>
                <span>{t.donorLogin}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Statutory Notice Banner */}
      <div className="px-4 pb-4">
        <div className="bg-[#ffdbca] text-[#331200] rounded-xl p-4 shadow-sm flex items-start gap-3 border border-[#ffb68e]/50">
          <div className="w-9 h-9 rounded-full bg-[#9b4500] text-white flex items-center justify-center shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[20px]">info</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-[#331200] mb-0.5 flex items-center gap-1">
              {t.statutoryNoticeTitle}
            </span>
            <p className="text-xs text-[#763300] leading-relaxed">
              {t.statutoryNoticeDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Key Focus Programs */}
      <div className="px-4 pb-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-lg text-[#00142f]">
              {t.coreProgramsTitle}
            </h3>
            <p className="text-xs text-[#44474e]">
              {t.coreProgramsSubtitle}
            </p>
          </div>
          <span className="material-symbols-outlined text-[#9b4500] text-[24px]">school</span>
        </div>

        {/* 3 Programs Cards */}
        {programsData.map((prog) => (
          <div
            key={prog.id}
            className="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-2 border border-[#dce9ff]/60 hover:border-[#9b4500]/40 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    prog.id === 'education'
                      ? 'bg-[#dce9ff] text-[#00142f]'
                      : prog.id === 'coaching'
                      ? 'bg-[#dce1ff] text-[#00103e]'
                      : 'bg-[#ffdbca] text-[#9b4500]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px]">{prog.icon}</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#00142f]">
                    {lang === 'hi' ? `${prog.number}. ${prog.titleHi}` : `${prog.number}. ${prog.titleEn}`}
                  </h4>
                  <span className="text-xs text-[#9b4500] font-medium">
                    {lang === 'hi' ? prog.subtitleHi : prog.subtitleEn}
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#30476a] text-[11px] font-semibold">
                {lang === 'hi' ? prog.statusBadgeHi : prog.statusBadgeEn}
              </span>
            </div>

            <p className="text-xs text-[#44474e] leading-relaxed">
              {lang === 'hi' ? prog.descriptionHi : prog.descriptionEn}
            </p>

            {prog.ruleNoticeHi && (
              <div className="bg-[#eff4ff] p-2.5 rounded-lg border-l-2 border-[#ba1a1a]">
                <p className="text-[11px] text-[#ba1a1a] leading-relaxed flex items-start gap-1 font-medium">
                  <span className="material-symbols-outlined text-[14px] shrink-0 mt-0.5">gavel</span>
                  <span>{lang === 'hi' ? prog.ruleNoticeHi : prog.ruleNoticeEn}</span>
                </p>
              </div>
            )}

            <button
              onClick={() => onNavigateTab('hamare-karyakram')}
              className="pt-1 flex items-center text-[#00142f] hover:text-[#9b4500] font-semibold text-xs gap-1 self-start"
              type="button"
            >
              <span>{lang === 'hi' ? 'विवरण व पात्रता देखें' : 'View Details & Eligibility'}</span>
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </button>
          </div>
        ))}
      </div>

      {/* 3-Step Transparent Support Process */}
      <div className="px-4 pb-5">
        <div className="bg-[#eff4ff] rounded-xl p-4 shadow-sm flex flex-col gap-3 border border-[#dce9ff]">
          <div>
            <div className="inline-flex items-center gap-1 bg-[#00142f] text-white px-2.5 py-0.5 rounded-full mb-1">
              <span className="material-symbols-outlined text-[14px]">shield</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider">
                {lang === 'hi' ? 'पारदर्शिता प्रक्रिया' : 'Transparent Process'}
              </span>
            </div>
            <h3 className="font-serif font-bold text-base sm:text-lg text-[#00142f]">
              {t.transparentProcessTitle}
            </h3>
            <p className="text-xs text-[#44474e]">
              {t.transparentProcessSubtitle}
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            {/* Step 1 */}
            <div className="flex gap-3 bg-white p-3 rounded-lg shadow-sm border border-[#dce9ff]/60">
              <div className="w-8 h-8 rounded-full bg-[#00142f] text-white flex items-center justify-center shrink-0 text-sm font-bold">
                १
              </div>
              <div className="flex flex-col min-w-0">
                <h5 className="font-bold text-xs sm:text-sm text-[#00142f]">
                  {t.step1Title}
                </h5>
                <p className="text-xs text-[#44474e] mt-0.5 leading-relaxed">
                  {t.step1Desc}
                </p>
                <button
                  onClick={() => onNavigateTab('sahyog-dan')}
                  className="flex items-center gap-1 mt-1 text-xs text-[#9b4500] font-bold hover:underline self-start"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[15px]">qr_code_scanner</span>
                  <span>{t.step1Action}</span>
                </button>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-3 bg-white p-3 rounded-lg shadow-sm border border-[#dce9ff]/60">
              <div className="w-8 h-8 rounded-full bg-[#9b4500] text-white flex items-center justify-center shrink-0 text-sm font-bold">
                २
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-xs sm:text-sm text-[#00142f]">
                    {t.step2Title}
                  </h5>
                  <span className="bg-[#ffdbca] text-[#331200] text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    {lang === 'hi' ? 'सत्यापन लंबित' : 'Pending'}
                  </span>
                </div>
                <p className="text-xs text-[#44474e] mt-0.5 leading-relaxed">
                  {t.step2Desc}
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-3 bg-white p-3 rounded-lg shadow-sm border border-[#dce9ff]/60">
              <div className="w-8 h-8 rounded-full bg-[#00216c] text-[#dce1ff] flex items-center justify-center shrink-0 text-sm font-bold">
                ३
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-xs sm:text-sm text-[#00142f]">
                    {t.step3Title}
                  </h5>
                  <span className="bg-[#dce9ff] text-[#00142f] text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    {lang === 'hi' ? 'स्वीकृत' : 'Approved'}
                  </span>
                </div>
                <p className="text-xs text-[#44474e] mt-0.5 leading-relaxed">
                  {t.step3Desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Statistics */}
      <div className="px-4 pb-5">
        <div className="bg-[#0f294a] text-white rounded-xl p-4 shadow-md border border-[#7a91b7]/20">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-[10px] text-[#ffdbca] bg-[#9b4500]/40 px-2 py-0.5 rounded-full font-semibold">
                {t.impactBadge}
              </span>
              <h4 className="font-serif font-bold text-base sm:text-lg text-white mt-1">
                {t.impactTitle}
              </h4>
            </div>
            <span className="material-symbols-outlined text-[#fd8a42] text-[28px]">trending_up</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-[#00142f]/80 p-2.5 rounded-lg border border-[#7a91b7]/20">
              <div className="text-lg sm:text-xl font-bold text-[#ffdbca] font-mono leading-tight">
                १२+
              </div>
              <div className="text-[11px] text-[#7a91b7] mt-0.5">
                {lang === 'hi' ? 'गाँव कवर्ड' : 'Villages'}
              </div>
            </div>

            <div className="bg-[#00142f]/80 p-2.5 rounded-lg border border-[#7a91b7]/20">
              <div className="text-lg sm:text-xl font-bold text-white font-mono leading-tight">
                ४५०+
              </div>
              <div className="text-[11px] text-[#7a91b7] mt-0.5">
                {lang === 'hi' ? 'छात्र लाभान्वित' : 'Students'}
              </div>
            </div>

            <div className="bg-[#00142f]/80 p-2.5 rounded-lg border border-[#7a91b7]/20">
              <div className="text-lg sm:text-xl font-bold text-[#dce1ff] font-mono leading-tight">
                १००%
              </div>
              <div className="text-[11px] text-[#7a91b7] mt-0.5">
                {lang === 'hi' ? 'पारदर्शी ऑडिट' : 'Audited'}
              </div>
            </div>
          </div>

          <p className="text-[10px] text-[#7a91b7] text-center mt-3">
            {t.impactNote}
          </p>
        </div>
      </div>

      {/* Interactive Rural FAQ Section */}
      <div className="px-4 pb-5 flex flex-col gap-2">
        <div className="flex flex-col">
          <h3 className="font-serif font-bold text-base sm:text-lg text-[#00142f]">
            {t.faqTitle}
          </h3>
          <p className="text-xs text-[#44474e]">
            {t.faqSubtitle}
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          {faqList.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#dce9ff]/60"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-3.5 text-left flex items-center justify-between gap-3 hover:bg-[#eff4ff] transition-colors"
                  type="button"
                >
                  <span className="font-semibold text-xs sm:text-sm text-[#00142f]">
                    {lang === 'hi' ? faq.questionHi : faq.questionEn}
                  </span>
                  <span
                    className={`material-symbols-outlined text-[#74777f] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#9b4500]' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {isOpen && (
                  <div className="px-3.5 pb-3.5 pt-1 text-xs text-[#44474e] leading-relaxed border-t border-[#eff4ff] bg-[#f8f9ff]">
                    {lang === 'hi' ? faq.answerHi : faq.answerEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Helpline Contact Callout */}
      <div className="px-4 pb-8">
        <div className="bg-[#e6eeff] text-[#0d1c2e] rounded-xl p-4 flex flex-col gap-3 shadow-sm border border-[#dce9ff]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#fd8a42] text-[#331200] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">support_agent</span>
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#00142f]">
                {t.supportCardTitle}
              </h4>
              <span className="text-[11px] text-[#44474e]">
                {t.supportCardSubtitle}
              </span>
            </div>
          </div>

          <p className="text-xs text-[#44474e] leading-relaxed">
            {t.supportCardDesc}
          </p>

          <div className="flex flex-col gap-2 pt-1">
            <a
              className="h-11 bg-[#00142f] hover:bg-[#0f294a] text-white rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold transition-all active:scale-[0.98]"
              href="tel:+916393608462"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span>{t.freeConsult}</span>
            </a>

            <a
              className="h-11 bg-white hover:bg-[#eff4ff] text-[#9b4500] font-semibold rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm shadow-sm border border-[#ffdbca] transition-all active:scale-[0.98]"
              href="https://wa.me/916393608462?text=%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%87%2C%20%E0%A4%AE%E0%A5%88%E0%A4%82%20%E0%A4%A1%E0%A5%89.%20%E0%A4%AD%E0%A5%80%E0%A4%AE%E0%A4%B0%E0%A4%BE%E0%A4%B5%20%E0%A4%85%E0%A4%82%E0%A4%AC%E0%A5%87%E0%A4%A1%E0%A4%95%E0%A4%B0%20%E0%A4%8F%E0%A4%9C%E0%A5%81%E0%A4%95%E0%A5%87%E0%A4%B6%E0%A4%A8%E0%A4%B2%20%E0%A4%B8%E0%A5%8B%E0%A4%B8%E0%A4%BE%E0%A4%87%E0%A4%9F%E0%A5%80%20%E0%A4%B8%E0%A5%87%20%E0%A4%B8%E0%A4%82%E0%A4%AA%E0%A4%B0%E0%A5%8D%E0%A4%95%20%E0%A4%95%E0%A4%B0%E0%A4%A8%E0%A4%BE%20%E0%A4%9A%E0%A4%BE%E0%A4%B9%E0%A4%A4%E0%A4%BE%20%E0%A4%B9%E0%A5%82%E0%A4%82%E0%A5%A4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>{t.whatsappText} (+91 63936 08462)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
