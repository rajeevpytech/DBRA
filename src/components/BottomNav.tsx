import React from 'react';
import { AuthUser, Language } from '../types';
import { translations } from '../data/translations';

interface BottomNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  lang: Language;
  currentUser: AuthUser | null;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  lang,
  currentUser,
}) => {
  const t = translations[lang];

  // Base navigation items
  const navItems = [
    {
      id: 'mukhya-prishth',
      label: t.navHome,
      icon: 'home',
    },
    {
      id: 'hamare-karyakram',
      label: t.navPrograms,
      icon: 'menu_book',
    },
    {
      id: 'sahyog-dan',
      label: t.navDonate,
      icon: 'volunteer_activism',
    },
  ];

  // Add 4th item depending on user role
  if (currentUser?.role === 'admin') {
    navItems.push({
      id: 'admin-portal',
      label: lang === 'hi' ? 'एडमिन ऑडिट' : 'Admin',
      icon: 'admin_panel_settings',
    });
  } else if (currentUser?.role === 'agent') {
    navItems.push({
      id: 'agent-portal',
      label: lang === 'hi' ? 'एजेंट डेस्क' : 'Agent',
      icon: 'badge',
    });
  } else {
    navItems.push({
      id: 'dandata-login',
      label: t.navDonor,
      icon: 'receipt_long',
    });
  }

  return (
    <nav
      className="fixed bottom-0 w-full z-50 pb-safe bg-white/95 backdrop-blur-xl border-t border-[#dce9ff]/60 shadow-[0_-2px_12px_rgba(15,41,74,0.06)]"
      aria-label="Bottom Navigation"
    >
      <div className="max-w-2xl mx-auto flex justify-around items-center h-16 px-1">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center gap-0.5 w-20 h-14 transition-colors rounded-lg active:scale-95 ${
                isActive
                  ? 'text-[#9b4500] font-semibold'
                  : 'text-[#44474e] hover:text-[#00142f]'
              }`}
              type="button"
              aria-current={isActive ? 'page' : undefined}
            >
              <span className={`material-symbols-outlined text-[24px] ${isActive ? 'font-bold' : ''}`}>
                {item.icon}
              </span>
              <span className="text-[11px] text-center leading-none truncate max-w-full tracking-tight">
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#9b4500] mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
