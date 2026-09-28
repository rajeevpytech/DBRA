import React, { useState } from 'react';
import { AuthUser, DonationRecord, Language } from './types';
import { initialDonations, TRUST_DETAILS } from './data/mockData';
import { DEMO_USERS } from './data/authDemoData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';
import { MukhyaPrishthView } from './components/MukhyaPrishthView';
import { SahyogDanView } from './components/SahyogDanView';
import { KaryakramView } from './components/KaryakramView';
import { DandataPortalView } from './components/DandataPortalView';
import { AgentDashboardView } from './components/AgentDashboardView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { LoginModal } from './components/LoginModal';
import { OfficialReceiptModal } from './components/OfficialReceiptModal';
import { ProfileModal } from './components/ProfileModal';
import { SplashScreen } from './components/SplashScreen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentTab, setCurrentTab] = useState<string>('sahyog-dan');
  const [lang, setLang] = useState<Language>('hi');
  const [donations, setDonations] = useState<DonationRecord[]>(initialDonations);
  const [activeReceipt, setActiveReceipt] = useState<DonationRecord | null>(null);

  // Authentication State
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddDonation = (newRecord: DonationRecord) => {
    setDonations((prev) => [newRecord, ...prev]);
  };

  const handleApproveDonation = (id: string) => {
    setDonations((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          const randRec = `REC-2024-${Math.floor(100 + Math.random() * 900)}`;
          return {
            ...d,
            status: 'approved',
            statusTextHi: 'स्वीकृत (रसीद जारी)',
            statusTextEn: 'Approved (Receipt Issued)',
            officialReceiptNo: d.officialReceiptNo || randRec,
            receiptDownloadAvailable: true,
            approvedBy: currentUser?.name || 'कोषाध्यक्ष',
            approvedAt: 'अभी',
          };
        }
        return d;
      })
    );
  };

  const handleRejectDonation = (id: string) => {
    setDonations((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          return {
            ...d,
            status: 'rejected',
            statusTextHi: 'अस्वीकृत',
            statusTextEn: 'Rejected',
          };
        }
        return d;
      })
    );
  };

  const handleLoginSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    showToast(`सफलतापूर्वक लॉगिन: ${user.name} (${user.roleTitleHi})`);

    // Auto-route to the most appropriate workspace
    if (user.role === 'admin') {
      setCurrentTab('admin-portal');
    } else if (user.role === 'agent') {
      setCurrentTab('agent-portal');
    } else {
      setCurrentTab('dandata-login');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('लॉगआउट संपन्न हुआ।');
    setCurrentTab('sahyog-dan');
  };

  const handleViewReceipt = (record: DonationRecord) => {
    setActiveReceipt(record);
  };

  const handleCloseReceipt = () => {
    setActiveReceipt(null);
  };

  return (
    <div className="bg-[#f8f9ff] min-h-screen text-[#0d1c2e] flex flex-col font-sans relative selection:bg-[#ffdbca] selection:text-[#331200]">
      {/* Grand Opening Logo Splash Screen with 2-3 sec slow-motion reveal */}
      {showSplash && (
        <SplashScreen
          phoneDisplay={TRUST_DETAILS.phone}
          onFinish={() => setShowSplash(false)}
        />
      )}

      {/* Toast Notification Bar */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-[#00142f] text-[#ffdbca] rounded-full shadow-lg border border-[#ffdbca]/40 text-xs font-semibold flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[16px] text-[#fd8a42]">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Quick Demo Switcher floating helper badge for easy evaluator testing */}
      <div className="fixed top-20 right-2 z-40">
        <button
          onClick={() => setIsLoginOpen(true)}
          className="bg-[#fd8a42] text-[#331200] px-2.5 py-1 rounded-full text-[10px] font-bold shadow-md hover:opacity-90 active:scale-95 transition-all flex items-center gap-1 border border-[#682c00]/20"
          type="button"
        >
          <span className="material-symbols-outlined text-[13px]">key</span>
          <span>
            {currentUser
              ? `${currentUser.role === 'admin' ? 'एडमिन' : currentUser.role === 'agent' ? 'एजेंट' : 'दानदाता'} सक्रिय`
              : 'लॉगिन डेमो'}
          </span>
        </button>
      </div>

      {/* Fixed Header */}
      <Header
        currentTab={currentTab}
        lang={lang}
        currentUser={currentUser}
        onLanguageChange={setLang}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-20 pb-24 flex flex-col">
        {currentTab === 'mukhya-prishth' && (
          <MukhyaPrishthView
            lang={lang}
            onNavigateTab={setCurrentTab}
            onOpenQuickDonation={() => setCurrentTab('sahyog-dan')}
          />
        )}

        {currentTab === 'sahyog-dan' && (
          <SahyogDanView
            lang={lang}
            donations={donations}
            onAddDonation={handleAddDonation}
            onViewReceipt={handleViewReceipt}
            onNavigateTab={setCurrentTab}
          />
        )}

        {currentTab === 'hamare-karyakram' && (
          <KaryakramView
            lang={lang}
            onNavigateTab={setCurrentTab}
          />
        )}

        {currentTab === 'dandata-login' && (
          <DandataPortalView
            lang={lang}
            donations={donations}
            currentUser={currentUser}
            onViewReceipt={handleViewReceipt}
            onNavigateTab={setCurrentTab}
            onOpenLogin={() => setIsLoginOpen(true)}
          />
        )}

        {currentTab === 'agent-portal' && currentUser?.role === 'agent' && (
          <AgentDashboardView
            currentUser={currentUser}
            lang={lang}
            donations={donations}
            onAddDonation={handleAddDonation}
            onViewReceipt={handleViewReceipt}
          />
        )}

        {currentTab === 'admin-portal' && currentUser?.role === 'admin' && (
          <AdminDashboardView
            currentUser={currentUser}
            lang={lang}
            donations={donations}
            onApproveDonation={handleApproveDonation}
            onRejectDonation={handleRejectDonation}
            onViewReceipt={handleViewReceipt}
          />
        )}

        {/* Fallback if user navigates to agent/admin tab without being logged in */}
        {((currentTab === 'agent-portal' && currentUser?.role !== 'agent') ||
          (currentTab === 'admin-portal' && currentUser?.role !== 'admin')) && (
          <div className="max-w-md mx-auto px-4 py-12 text-center space-y-3">
            <span className="material-symbols-outlined text-[48px] text-[#9b4500]">lock</span>
            <h3 className="text-base font-bold text-[#00142f]">
              सुरक्षित पोर्टल लॉगिन आवश्यक है
            </h3>
            <p className="text-xs text-[#44474e]">
              इस अनुभाग का उपयोग करने हेतु कृपया अधिकृत क्रेडेंशियल से लॉगिन करें।
            </p>
            <button
              onClick={() => setIsLoginOpen(true)}
              className="px-4 py-2.5 bg-[#00142f] text-white rounded-xl text-xs font-bold shadow"
              type="button"
            >
              डेमो लॉगिन खोलें
            </button>
          </div>
        )}

        {/* Footer */}
        <Footer lang={lang} />
      </main>

      {/* Fixed Bottom Navigation */}
      <BottomNav
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        lang={lang}
        currentUser={currentUser}
      />

      {/* Phone OTP Login Modal with 3 instant demo accounts */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        lang={lang}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Official Receipt Modal */}
      <OfficialReceiptModal
        record={activeReceipt}
        onClose={handleCloseReceipt}
        lang={lang}
      />

      {/* Society Profile / Contact Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        lang={lang}
        currentUser={currentUser}
        onOpenLogin={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
        onNavigateTab={setCurrentTab}
      />
    </div>
  );
}
