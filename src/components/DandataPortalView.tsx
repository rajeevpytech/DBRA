import React, { useState } from 'react';
import { AuthUser, DonationRecord, Language } from '../types';
import { TRUST_DETAILS } from '../data/mockData';

interface DandataPortalViewProps {
  lang: Language;
  donations: DonationRecord[];
  currentUser: AuthUser | null;
  onViewReceipt: (donation: DonationRecord) => void;
  onNavigateTab: (tab: string) => void;
  onOpenLogin: () => void;
}

export const DandataPortalView: React.FC<DandataPortalViewProps> = ({
  lang,
  donations,
  currentUser,
  onViewReceipt,
  onNavigateTab,
  onOpenLogin,
}) => {
  const initialMobile = currentUser?.phone || '9876543210';
  const [searchMobile, setSearchMobile] = useState(initialMobile);
  const [hasSearched, setHasSearched] = useState(true);
  const [activeLedgerTab, setActiveLedgerTab] = useState<'my' | 'public'>('my');

  // Filter donor's records
  const userRecords = donations.filter(
    (d) =>
      d.donorMobile.includes(searchMobile.trim()) ||
      d.donorName.toLowerCase().includes(searchMobile.toLowerCase().trim()) ||
      d.refNumber.toLowerCase().includes(searchMobile.toLowerCase().trim())
  );

  const totalContribution = userRecords
    .filter((d) => d.status === 'approved')
    .reduce((sum, d) => sum + d.amount, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 py-4 space-y-4">
      {/* Header Banner */}
      <div className="bg-[#00142f] text-white rounded-2xl p-5 shadow-md relative overflow-hidden">
        <div className="flex items-center gap-1.5 text-[#ffdbca] mb-1">
          <span className="material-symbols-outlined text-[18px]">badge</span>
          <span className="text-xs font-semibold uppercase tracking-wider">
            {lang === 'hi' ? 'दानदाता सेवा प्रकोष्ठ' : 'Donor Service Desk'}
          </span>
        </div>
        <h2 className="font-serif font-bold text-xl sm:text-2xl text-white">
          {lang === 'hi' ? 'दानदाता पोर्टल व पावती केंद्र' : 'Donor Portal & Receipts'}
        </h2>
        <p className="text-xs text-[#7a91b7] mt-1 leading-relaxed">
          {lang === 'hi'
            ? 'अपने सहयोग की प्रविष्टि स्थिति जांचें तथा आयकर छूट हेतु डिजिटल हस्ताक्षरित रसीद प्राप्त करें।'
            : 'Track your contributions and download digitally verified 80G compliant donation receipts.'}
        </p>

        {/* View Switcher */}
        <div className="flex items-center gap-2 pt-3">
          <button
            onClick={() => setActiveLedgerTab('my')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeLedgerTab === 'my'
                ? 'bg-[#fd8a42] text-[#331200]'
                : 'bg-[#0f294a] text-white hover:bg-[#1a385f]'
            }`}
            type="button"
          >
            {lang === 'hi' ? 'मेरी रसीदें व सहयोग' : 'My Receipts & History'}
          </button>
          <button
            onClick={() => setActiveLedgerTab('public')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeLedgerTab === 'public'
                ? 'bg-[#fd8a42] text-[#331200]'
                : 'bg-[#0f294a] text-white hover:bg-[#1a385f]'
            }`}
            type="button"
          >
            {lang === 'hi' ? 'सार्वजनिक पारदर्शिता लेजर' : 'Public Audit Ledger'}
          </button>
        </div>
      </div>

      {/* User Login State Alert Banner */}
      {!currentUser && (
        <div className="bg-[#eff4ff] p-3 rounded-2xl border border-[#dce9ff] flex items-center justify-between gap-2 shadow-sm">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-[#9b4500] text-[22px] shrink-0">
              account_circle
            </span>
            <div className="min-w-0">
              <span className="text-xs font-bold text-[#00142f] block truncate">
                {lang === 'hi' ? 'अपने मोबाइल से लॉगिन करें' : 'Log in with mobile OTP'}
              </span>
              <span className="text-[11px] text-[#44474e] block truncate">
                {lang === 'hi'
                  ? 'अपनी सभी दान रसीदें सीधे एक जगह सुरक्षित देखें'
                  : 'Instantly view all your verified 80G receipts'}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenLogin}
            className="px-3 py-1.5 bg-[#00142f] hover:bg-[#0f294a] text-white rounded-xl text-xs font-bold shrink-0 shadow"
          >
            {lang === 'hi' ? 'लॉगिन करें' : 'Login'}
          </button>
        </div>
      )}

      {activeLedgerTab === 'my' ? (
        <>
          {/* Search Box */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#dce9ff]">
            <form onSubmit={handleSearch} className="space-y-2">
              <label className="block text-xs font-semibold text-[#00142f]">
                {lang === 'hi'
                  ? 'अपना मोबाइल नंबर या रसीद संदर्भ संख्या डालें:'
                  : 'Enter your Mobile Number or Reference No:'}
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchMobile}
                    onChange={(e) => setSearchMobile(e.target.value)}
                    placeholder="9876543210"
                    className="w-full h-11 px-3.5 pl-9 rounded-xl bg-[#eff4ff] text-[#0d1c2e] text-sm border border-[#dce9ff] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#00142f]"
                  />
                  <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-[#74777f] text-[18px]">
                    search
                  </span>
                </div>
                <button
                  type="submit"
                  className="px-4 h-11 bg-[#00142f] hover:bg-[#0f294a] text-white rounded-xl text-xs font-bold transition-all shadow"
                >
                  {lang === 'hi' ? 'खोजें' : 'Search'}
                </button>
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#74777f] pt-0.5">
                <span>
                  {lang === 'hi'
                    ? '* डेमो नंबर: 9876543210 या 9450123456'
                    : '* Demo numbers: 9876543210 or 9450123456'}
                </span>
                {!currentUser && (
                  <button
                    type="button"
                    onClick={onOpenLogin}
                    className="text-[#9b4500] font-bold hover:underline"
                  >
                    डेमो लॉगिन करें
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Donor Summary Card */}
          {hasSearched && userRecords.length > 0 && (
            <div className="bg-gradient-to-r from-[#0f294a] to-[#00142f] text-white rounded-2xl p-4 shadow-sm flex items-center justify-between border border-[#7a91b7]/20">
              <div>
                <span className="text-[10px] text-[#ffdbca] uppercase tracking-wider block font-semibold">
                  {lang === 'hi' ? 'सत्यापित कुल सहयोग राशि' : 'Verified Contributions'}
                </span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-white">
                  ₹{totalContribution.toLocaleString('en-IN')}/-
                </span>
                <p className="text-[11px] text-[#7a91b7] mt-0.5">
                  {lang === 'hi' ? 'दानदाता:' : 'Donor:'} <strong className="text-white">{userRecords[0].donorName}</strong>
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#fd8a42]/20 border border-[#fd8a42]/40 flex items-center justify-center text-[#ffdbca]">
                <span className="material-symbols-outlined text-[24px]">verified</span>
              </div>
            </div>
          )}

          {/* User's Records List */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-sm sm:text-base text-[#00142f] flex items-center justify-between">
              <span>{lang === 'hi' ? 'आपकी सहयोग प्रविष्टियाँ' : 'Your Contribution Entries'}</span>
              <span className="text-xs text-[#74777f] font-normal font-mono">
                {userRecords.length} {lang === 'hi' ? 'रिकॉर्ड मिले' : 'records found'}
              </span>
            </h3>

            {userRecords.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center space-y-2 border border-[#dce9ff]">
                <div className="w-12 h-12 rounded-full bg-[#eff4ff] text-[#74777f] mx-auto flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">receipt</span>
                </div>
                <p className="text-sm font-semibold text-[#00142f]">
                  {lang === 'hi' ? 'कोई प्रविष्टि नहीं मिली' : 'No records found'}
                </p>
                <p className="text-xs text-[#74777f]">
                  {lang === 'hi'
                    ? 'कृपया सही मोबाइल नंबर दर्ज करें या नया सहयोग दर्ज करें।'
                    : 'Please check your mobile number or record a new donation.'}
                </p>
                <button
                  type="button"
                  onClick={() => onNavigateTab('sahyog-dan')}
                  className="mt-2 px-4 py-2 bg-[#9b4500] text-white rounded-xl text-xs font-semibold"
                >
                  {lang === 'hi' ? 'सहयोग दर्ज करें' : 'Record Donation'}
                </button>
              </div>
            ) : (
              userRecords.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-[#dce9ff] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#00142f]">
                      {item.refNumber}
                    </span>
                    {item.status === 'approved' ? (
                      <span className="bg-[#d5e3fc] text-[#00142f] text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-[#00142f]/10">
                        <span className="material-symbols-outlined text-[13px] text-[#9b4500]">check_circle</span>
                        <span>{lang === 'hi' ? 'स्वीकृत (रसीद जारी)' : 'Approved (Receipt Issued)'}</span>
                      </span>
                    ) : (
                      <span className="bg-[#ffdbca] text-[#331200] text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-[#fd8a42]/30">
                        <span className="material-symbols-outlined text-[13px]">hourglass_empty</span>
                        <span>{lang === 'hi' ? 'सत्यापन प्रक्रिया में' : 'Pending Verification'}</span>
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#44474e] font-medium">
                      {lang === 'hi' ? item.purposeLabelHi : item.purposeLabelEn}
                    </span>
                    <span className="font-mono font-bold text-base text-[#00142f]">
                      ₹{item.amount.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="bg-[#eff4ff] p-2.5 rounded-xl text-xs text-[#0d1c2e] space-y-1">
                    <div className="flex justify-between">
                      <span className="text-[#74777f]">माध्यम (Mode):</span>
                      <span className="font-semibold">{item.mode === 'qr' ? 'UPI / QR Bank' : 'Field Cash'}</span>
                    </div>
                    {item.utrNumber && (
                      <div className="flex justify-between font-mono">
                        <span className="text-[#74777f]">UTR सं.:</span>
                        <span>{item.utrNumber}</span>
                      </div>
                    )}
                    {item.voucherNumber && (
                      <div className="flex justify-between font-mono">
                        <span className="text-[#74777f]">वाउचर सं.:</span>
                        <span>{item.voucherNumber}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[11px] text-[#74777f] pt-0.5">
                      <span>दिनांक: {item.date} ({item.time})</span>
                      {item.officialReceiptNo && (
                        <span>रसीद: {item.officialReceiptNo}</span>
                      )}
                    </div>
                  </div>

                  {item.status === 'approved' ? (
                    <button
                      type="button"
                      onClick={() => onViewReceipt(item)}
                      className="w-full py-2.5 bg-[#00142f] hover:bg-[#0f294a] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow transition-all active:scale-[0.98]"
                    >
                      <span className="material-symbols-outlined text-[16px]">description</span>
                      <span>{lang === 'hi' ? 'आधिकारिक डिजिटल रसीद देखें व प्रिंट करें' : 'View & Print Official 80G Receipt'}</span>
                    </button>
                  ) : (
                    <div className="text-[11px] text-[#74777f] text-center italic py-1">
                      {lang === 'hi'
                        ? 'समिति द्वारा बैंक खाते से मिलान होते ही डिजिटल पावती यहाँ उपलब्ध हो जाएगी।'
                        : 'Official certificate will be downloadable once matched with bank records.'}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        /* Public Audit & Transparency Register */
        <div className="space-y-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#dce9ff] space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#9b4500] font-bold uppercase tracking-wider block">
                  {lang === 'hi' ? 'पारदर्शी सामाजिक निधि' : 'Public Social Fund'}
                </span>
                <h3 className="font-serif font-bold text-base text-[#00142f]">
                  {lang === 'hi' ? 'संस्था सार्वजनिक ऑडिट रजिस्टर' : 'Society Public Audit Ledger'}
                </h3>
              </div>
              <span className="material-symbols-outlined text-[#9b4500] text-[26px]">account_balance_wallet</span>
            </div>
            <p className="text-xs text-[#44474e] leading-relaxed">
              {lang === 'hi'
                ? 'डॉ. भीमराव अंबेडकर एजुकेशनल सोसाइटी में प्रत्येक पाई का सार्वजनिक हिसाब रखा जाता है। कोई भी नागरिक समाज में हुए सहयोग का विवरण देख सकता है।'
                : 'Every single rupee received is audited and accounted for with open community ledger transparency.'}
            </p>
          </div>

          {/* Public Transactions List */}
          <div className="space-y-2">
            {donations.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-3 shadow-sm border border-[#dce9ff]/60 flex items-center justify-between"
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold text-[#00142f]">{item.refNumber}</span>
                    <span className="text-[10px] px-2 py-0.2 rounded-full bg-[#eff4ff] text-[#30476a]">
                      {item.mode === 'qr' ? 'UPI' : 'Cash'}
                    </span>
                  </div>
                  <p className="text-xs text-[#44474e] truncate mt-0.5 font-medium">
                    {lang === 'hi' ? item.purposeLabelHi : item.purposeLabelEn}
                  </p>
                  <span className="text-[10px] text-[#74777f]">{item.time}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono font-bold text-sm text-[#00142f] block">
                    ₹{item.amount.toLocaleString('en-IN')}
                  </span>
                  <span
                    className={`text-[10px] font-semibold ${
                      item.status === 'approved' ? 'text-[#00216c]' : 'text-[#9b4500]'
                    }`}
                  >
                    {item.status === 'approved'
                      ? (lang === 'hi' ? 'सत्यापित' : 'Verified')
                      : (lang === 'hi' ? 'लंबित' : 'Pending')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA Box */}
      <div className="bg-[#eff4ff] rounded-2xl p-4 text-center space-y-2 border border-[#dce9ff]">
        <p className="text-xs text-[#44474e]">
          {lang === 'hi'
            ? 'शिक्षा एवं सामाजिक कल्याण में अपना योगदान दें।'
            : 'Contribute to grassroots rural education and social upliftment.'}
        </p>
        <button
          type="button"
          onClick={() => onNavigateTab('sahyog-dan')}
          className="w-full py-2.5 bg-[#9b4500] hover:bg-[#803800] text-white rounded-xl text-xs sm:text-sm font-bold shadow transition-all active:scale-[0.98]"
        >
          {lang === 'hi' ? 'नया सहयोग / दान दर्ज करें' : 'Record New Contribution'}
        </button>
      </div>
    </div>
  );
};
