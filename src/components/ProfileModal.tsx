import React from 'react';
import { AuthUser, Language } from '../types';
import { SOCIETY_LOGO_URL, TRUST_DETAILS } from '../data/mockData';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  currentUser: AuthUser | null;
  onOpenLogin: () => void;
  onLogout: () => void;
  onNavigateTab: (tab: string) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  lang,
  currentUser,
  onOpenLogin,
  onLogout,
  onNavigateTab,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#00142f]/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-sm w-full p-4 sm:p-5 shadow-2xl space-y-4 my-auto relative animate-scale-in border border-[#dce9ff]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#eff4ff] pb-3">
          <div className="flex items-center gap-2.5">
            <img
              src={SOCIETY_LOGO_URL}
              alt="Logo"
              className="w-10 h-10 object-contain rounded-full border border-[#00142f]/10 p-0.5 bg-white shrink-0"
            />
            <div className="min-w-0">
              <h4 className="font-serif font-bold text-sm text-[#00142f] truncate">
                {currentUser ? currentUser.name : (lang === 'hi' ? 'सोसाइटी प्रोफ़ाइल' : 'Society Profile')}
              </h4>
              <span className="text-[11px] text-[#74777f] block truncate">
                {currentUser ? currentUser.roleTitleHi : (lang === 'hi' ? 'पंजीकृत गैर-लाभकारी न्यास' : 'Registered Trust')}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] text-[#44474e] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Current User Card if Logged in */}
        {currentUser ? (
          <div className="bg-[#eff4ff] p-3 rounded-xl border border-[#dce9ff] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#00142f]">सक्रिय लॉगिन खाता</span>
              <span className="text-[10px] bg-[#fd8a42] text-[#331200] px-2 py-0.5 rounded-full font-bold">
                {currentUser.role === 'admin'
                  ? 'एडमिन'
                  : currentUser.role === 'agent'
                  ? 'फील्ड एजेंट'
                  : 'दानदाता'}
              </span>
            </div>
            <div className="text-xs text-[#0d1c2e] space-y-1 font-mono">
              <div className="flex justify-between">
                <span className="text-[#74777f]">मोबाइल:</span>
                <span className="font-bold">+91 {currentUser.phone}</span>
              </div>
              {currentUser.agentCode && (
                <div className="flex justify-between">
                  <span className="text-[#74777f]">एजेंट आईडी:</span>
                  <span className="font-bold text-[#9b4500]">{currentUser.agentCode}</span>
                </div>
              )}
              {currentUser.location && (
                <div className="flex justify-between font-sans">
                  <span className="text-[#74777f]">स्थान:</span>
                  <span>{currentUser.location}</span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full mt-1 py-1.5 bg-[#ffdad6] hover:bg-[#ffb4ab] text-[#93000a] rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              <span>{lang === 'hi' ? 'लॉगआउट करें (Log Out)' : 'Log Out'}</span>
            </button>
          </div>
        ) : (
          /* Login Trigger CTA */
          <div className="bg-[#fff3eb] p-3 rounded-xl border border-[#ffdbca] space-y-2 text-center">
            <p className="text-xs text-[#763300] font-medium leading-relaxed">
              {lang === 'hi'
                ? 'दानदाता, एजेंट या एडमिन के रूप में तुरंत लॉगिन करें'
                : 'Log in as a Donor, Agent, or Admin using Phone OTP'}
            </p>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenLogin();
              }}
              className="w-full py-2 bg-[#9b4500] hover:bg-[#803800] text-white rounded-xl text-xs font-bold shadow flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">login</span>
              <span>{lang === 'hi' ? 'मोबाइल नंबर से लॉगिन करें' : 'Login via Mobile'}</span>
            </button>
          </div>
        )}

        {/* Statutory Details */}
        <div className="space-y-2 text-xs text-[#0d1c2e]">
          <div className="bg-[#f8f9ff] p-3 rounded-xl space-y-1 border border-[#dce9ff]/60">
            <div className="text-[11px] text-[#74777f]">पंजीकरण संख्या (Reg. No.):</div>
            <div className="font-mono font-bold text-[#00142f]">{TRUST_DETAILS.regNo}</div>
            <div className="text-[11px] text-[#74777f] pt-1">आयकर PAN:</div>
            <div className="font-mono font-bold text-[#00142f]">{TRUST_DETAILS.pan}</div>
            <div className="text-[11px] text-[#74777f] pt-1">धारा 80G पंजीकरण:</div>
            <div className="text-[#9b4500] font-semibold">{TRUST_DETAILS.section80G}</div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
            <div className="bg-[#eff4ff] p-2 rounded-lg border border-[#dce9ff]/50">
              <span className="text-[#74777f] block">अध्यक्ष (President):</span>
              <strong className="text-[#00142f]">{TRUST_DETAILS.presidentName}</strong>
            </div>
            <div className="bg-[#eff4ff] p-2 rounded-lg border border-[#dce9ff]/50">
              <span className="text-[#74777f] block">कोषाध्यक्ष (Treasurer):</span>
              <strong className="text-[#00142f]">{TRUST_DETAILS.treasurerName}</strong>
            </div>
          </div>
        </div>

        {/* Helpline Button */}
        <a
          href="tel:+916393608462"
          className="w-full py-2.5 bg-[#00142f] hover:bg-[#0f294a] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow"
        >
          <span className="material-symbols-outlined text-[16px]">call</span>
          <span>{lang === 'hi' ? 'सीधे हेल्पलाइन पर बात करें (+91 63936 08462)' : 'Call Helpline (+91 63936 08462)'}</span>
        </a>
      </div>
    </div>
  );
};
