import React, { useState } from 'react';
import { AuthUser, Language, UserRole } from '../types';
import { DEMO_USERS, QUICK_DEMO_ACCOUNTS } from '../data/authDemoData';
import { SOCIETY_LOGO_URL } from '../data/mockData';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onLoginSuccess: (user: AuthUser) => void;
  initialRole?: UserRole;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  lang,
  onLoginSuccess,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otp, setOtp] = useState('');
  const [sentToPhone, setSentToPhone] = useState('');
  const [detectedUser, setDetectedUser] = useState<AuthUser | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const handleSelectQuickDemo = (phone: string) => {
    setPhoneNumber(phone);
    setErrorMsg(null);
    const user = DEMO_USERS[phone];
    if (user) {
      setDetectedUser(user);
      setSentToPhone(phone);
      setOtp('1234'); // Auto-fill 1234 demo OTP for rapid mobile test
      setStep('otp');
    }
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanPhone = phoneNumber.trim().replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg(
        lang === 'hi'
          ? 'कृपया १० अंकों का वैध मोबाइल नंबर दर्ज करें।'
          : 'Please enter a valid 10-digit mobile number.'
      );
      return;
    }

    // Check if it's one of our registered users or dynamically create a donor
    const existing = DEMO_USERS[cleanPhone];
    if (existing) {
      setDetectedUser(existing);
    } else {
      // Create dynamically as guest/donor
      setDetectedUser({
        id: `user_${cleanPhone}`,
        phone: cleanPhone,
        name: cleanPhone === '9450123456' ? 'सुनीता देवी' : `दानदाता (${cleanPhone.slice(-4)})`,
        role: 'donor',
        roleTitleHi: 'पंजीकृत दानदाता (Donor)',
        roleTitleEn: 'Registered Donor',
        badge: 'दानदाता सदस्य',
        location: 'अम्बेडकर नगर',
      });
    }

    setSentToPhone(cleanPhone);
    setOtp('1234');
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      if (otp.trim() === '1234' || otp.trim().length === 4) {
        if (detectedUser) {
          onLoginSuccess(detectedUser);
          onClose();
          // Reset
          setStep('phone');
          setOtp('');
          setPhoneNumber('');
          setErrorMsg(null);
        }
      } else {
        setErrorMsg(
          lang === 'hi'
            ? 'अमान्य OTP! कृपया डेमो OTP 1234 दर्ज करें।'
            : 'Invalid OTP! Please enter demo OTP 1234.'
        );
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#00142f]/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-md w-full p-4 sm:p-6 shadow-2xl space-y-4 my-auto relative animate-scale-in border border-[#dce9ff]">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute right-3.5 top-3.5 w-8 h-8 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] text-[#44474e] flex items-center justify-center transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-[#eff4ff] pb-3">
          <img
            src={SOCIETY_LOGO_URL}
            alt="Logo"
            className="w-12 h-12 rounded-full object-contain border border-[#00142f]/10 p-0.5 bg-white shrink-0"
          />
          <div className="min-w-0 pr-6">
            <h3 className="font-serif font-bold text-base sm:text-lg text-[#00142f] leading-tight">
              {lang === 'hi' ? 'सोसाइटी सुरक्षित लॉगिन' : 'Society Secure Login'}
            </h3>
            <span className="text-[11px] text-[#74777f] block">
              {lang === 'hi'
                ? 'मोबाइल नंबर व OTP द्वारा सुरक्षित प्रवेश'
                : 'Instant OTP login for Donors, Agents & Admins'}
            </span>
          </div>
        </div>

        {step === 'phone' ? (
          <div className="space-y-4">
            {/* Quick Demo Selector Buttons */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#00142f] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[#9b4500] text-[16px]">touch_app</span>
                  <span>{lang === 'hi' ? 'डेमो टेस्ट हेतु सीधा लॉगिन चुनें:' : 'Select Demo Account:'}</span>
                </span>
                <span className="text-[10px] text-[#9b4500] bg-[#ffdbca] px-2 py-0.5 rounded-full font-bold">
                  1-Click Demo
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {QUICK_DEMO_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.role}
                    type="button"
                    onClick={() => handleSelectQuickDemo(acc.phone)}
                    className="p-2.5 rounded-xl border border-[#dce9ff] bg-[#f8f9ff] hover:bg-[#eff4ff] text-left transition-all flex items-start gap-2.5 active:scale-[0.98] group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white border border-[#dce9ff] flex items-center justify-center text-[#00142f] group-hover:border-[#9b4500] shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[20px] text-[#9b4500]">
                        {acc.icon}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#00142f] truncate">
                          {lang === 'hi' ? acc.titleHi : acc.titleEn}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${acc.tagColor}`}>
                          {acc.tagHi}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#44474e] leading-snug mt-0.5">
                        {lang === 'hi' ? acc.subtitleHi : acc.subtitleEn}
                      </p>
                      <div className="flex items-center gap-1 mt-1 text-[10px] font-mono text-[#74777f]">
                        <span className="material-symbols-outlined text-[12px]">phone_android</span>
                        <span>{acc.phone}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-[#dce9ff]" />
              <span className="flex-shrink mx-2 text-[11px] text-[#74777f]">
                {lang === 'hi' ? 'या अपना फ़ोन नंबर दर्ज करें' : 'or enter your phone number'}
              </span>
              <div className="flex-grow border-t border-[#dce9ff]" />
            </div>

            {/* Custom Phone Number Form */}
            <form onSubmit={handleSendOtp} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#00142f] mb-1">
                  {lang === 'hi' ? 'मोबाइल नंबर (Phone Number)' : 'Mobile Number'}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-[#44474e] font-mono">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="9876543210"
                    className="w-full h-11 pl-12 pr-4 rounded-xl bg-[#eff4ff] text-[#0d1c2e] font-mono text-sm tracking-wider focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#00142f] border border-[#dce9ff]"
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="p-2 rounded-lg bg-[#ffdad6] text-[#93000a] text-xs font-medium flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">error</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full h-11 bg-[#00142f] hover:bg-[#0f294a] text-white rounded-xl text-xs sm:text-sm font-bold shadow transition-all active:scale-[0.98] flex items-center justify-center gap-1.5"
              >
                <span>{lang === 'hi' ? 'OTP प्राप्त करें' : 'Request OTP'}</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </form>
          </div>
        ) : (
          /* Step 2: OTP Verification */
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="bg-[#eff4ff] p-3 rounded-xl border border-[#dce9ff] text-center space-y-1">
              <span className="text-xs text-[#74777f] block">
                {lang === 'hi' ? 'मोबाइल नंबर पर OTP भेजा गया है:' : 'OTP has been dispatched to:'}
              </span>
              <span className="text-sm font-bold font-mono text-[#00142f]">
                +91 {sentToPhone}
              </span>
              {detectedUser && (
                <div className="pt-1">
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-white font-semibold text-[#9b4500] border border-[#ffdbca]">
                    {detectedUser.roleTitleHi} • {detectedUser.name}
                  </span>
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-[#00142f]">
                  {lang === 'hi' ? '४-अंकीय OTP दर्ज करें (Demo: 1234)' : 'Enter 4-Digit OTP (Demo: 1234)'}
                </label>
                <span className="text-[11px] text-[#9b4500] font-bold">
                  Demo OTP: 1234
                </span>
              </div>
              <input
                type="text"
                required
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="1234"
                className="w-full h-12 text-center rounded-xl bg-[#eff4ff] text-[#00142f] font-mono text-xl tracking-[0.5em] font-bold focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#00142f] border border-[#dce9ff]"
              />
            </div>

            {errorMsg && (
              <div className="p-2 rounded-lg bg-[#ffdad6] text-[#93000a] text-xs font-medium flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">error</span>
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="space-y-2">
              <button
                type="submit"
                disabled={isVerifying}
                className="w-full h-11 bg-[#9b4500] hover:bg-[#803800] text-white rounded-xl text-xs sm:text-sm font-bold shadow transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 disabled:opacity-75"
              >
                {isVerifying ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                    <span>{lang === 'hi' ? 'सत्यापित हो रहा है...' : 'Verifying...'}</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    <span>{lang === 'hi' ? 'सत्यापित कर लॉगिन करें' : 'Verify & Log In'}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep('phone')}
                className="w-full py-1 text-xs text-[#74777f] hover:text-[#00142f]"
              >
                {lang === 'hi' ? '← नंबर बदलें या दूसरा डेमो चुनें' : '← Change number or choose another demo'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
