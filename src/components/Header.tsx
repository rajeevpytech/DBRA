import React from 'react';
import { AuthUser, Language } from '../types';
import { SOCIETY_LOGO_URL } from '../data/mockData';

interface HeaderProps {
  currentTab: string;
  lang: Language;
  currentUser: AuthUser | null;
  onLanguageChange: (lang: Language) => void;
  onOpenLogin: () => void;
  onOpenProfile: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  lang,
  currentUser,
  onLanguageChange,
  onOpenLogin,
  onOpenProfile,
  onLogout,
}) => {
  const getTabLabel = () => {
    switch (currentTab) {
      case 'mukhya-prishth':
        return lang === 'hi' ? 'Mukhya Prishth' : 'Home';
      case 'hamare-karyakram':
        return lang === 'hi' ? 'Karyakram' : 'Programs';
      case 'sahyog-dan':
        return lang === 'hi' ? 'Sahyog Dan' : 'Donate';
      case 'dandata-login':
        return lang === 'hi' ? 'Dandata Portal' : 'Donors';
      case 'agent-portal':
        return lang === 'hi' ? 'Agent Desk' : 'Agent';
      case 'admin-portal':
        return lang === 'hi' ? 'Admin Audit' : 'Admin';
      default:
        return 'Sahyog Dan';
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#00142f] text-white shadow-[0_4px_16px_rgba(0,20,47,0.18)]">
      <div className="h-20 px-3 sm:px-4 max-w-2xl mx-auto flex items-center justify-between gap-1.5 sm:gap-2">
        {/* Brand Lockup */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <img
            alt="Dr. Bhimrao Ambedkar Educational Society Logo"
            className="h-10 w-10 object-contain flex-shrink-0 rounded-full bg-white p-0.5"
            src={SOCIETY_LOGO_URL}
          />
          <div className="flex flex-col min-w-0 pr-1">
            <h1 className="font-semibold text-[14px] sm:text-[16px] text-white truncate leading-tight">
              {lang === 'hi' ? 'डॉ. भीमराव अंबेडकर एजुकेशनल सोसाइटी' : 'Dr. Bhimrao Ambedkar Educational Society'}
            </h1>
            <span className="text-[11px] text-[#7a91b7] truncate font-normal opacity-90">
              {lang === 'hi' ? 'शिक्षा, सहयोग और सम्मान की दिशा में' : 'Towards Education, Mutual Support & Dignity'}
            </span>
            <span className="text-[11px] text-[#ffdbca] font-semibold truncate pt-0.5">
              {getTabLabel()}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Bilingual Switcher */}
          <div className="inline-flex items-center bg-[#0f294a] p-0.5 rounded-full h-9 sm:h-10">
            <button
              onClick={() => onLanguageChange('hi')}
              className={`h-7 sm:h-8 px-2 sm:px-2.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all flex items-center justify-center ${
                lang === 'hi'
                  ? 'bg-white text-[#00142f] shadow-[0_1px_4px_rgba(0,0,0,0.12)]'
                  : 'text-[#7a91b7] hover:text-white'
              }`}
              type="button"
            >
              हिंदी
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`h-7 sm:h-8 px-2 sm:px-2.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all flex items-center justify-center ${
                lang === 'en'
                  ? 'bg-white text-[#00142f] shadow-[0_1px_4px_rgba(0,0,0,0.12)]'
                  : 'text-[#7a91b7] hover:text-white'
              }`}
              type="button"
            >
              Eng
            </button>
          </div>

          {/* User Status / Login Button */}
          {currentUser ? (
            <div className="flex items-center gap-1">
              <button
                onClick={onOpenProfile}
                title={currentUser.name}
                className="h-9 px-2 sm:px-2.5 rounded-full bg-[#0f294a] hover:bg-[#1a385f] active:scale-95 transition-all flex items-center gap-1 border border-[#ffdbca]/40"
                type="button"
              >
                <span className="w-2 h-2 rounded-full bg-[#fd8a42]" />
                <span className="text-[11px] text-white font-bold max-w-[65px] sm:max-w-[90px] truncate">
                  {currentUser.role === 'admin'
                    ? 'एडमिन'
                    : currentUser.role === 'agent'
                    ? 'एजेंट'
                    : currentUser.name.split(' ')[0]}
                </span>
              </button>
              <button
                onClick={onLogout}
                title="Logout"
                className="w-9 h-9 rounded-full bg-[#0f294a] hover:bg-[#ffdad6] hover:text-[#93000a] text-[#7a91b7] active:scale-95 transition-all flex items-center justify-center"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="h-9 sm:h-10 px-2.5 sm:px-3 bg-[#fd8a42] hover:bg-[#e67a34] text-[#331200] rounded-full text-xs font-bold shadow-sm active:scale-95 transition-all flex items-center gap-1"
              type="button"
            >
              <span className="material-symbols-outlined text-[17px]">login</span>
              <span>{lang === 'hi' ? 'लॉगिन' : 'Login'}</span>
            </button>
          )}

          {/* Helpline Call Button */}
          <a
            aria-label="Call Helpline"
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#0f294a] hover:bg-[#1a385f] text-white active:scale-95 transition-all border border-[#7a91b7]/20"
            href="tel:+916393608462"
          >
            <span className="material-symbols-outlined text-[19px] text-[#ffdbca]">call</span>
          </a>
        </div>
      </div>
    </header>
  );
};
