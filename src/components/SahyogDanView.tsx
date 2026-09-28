import React, { useState } from 'react';
import { DonationMode, DonationRecord, Language } from '../types';
import { translations } from '../data/translations';
import { SAMPLE_PROOF_URL, TRUST_DETAILS } from '../data/mockData';

interface SahyogDanViewProps {
  lang: Language;
  donations: DonationRecord[];
  onAddDonation: (donation: DonationRecord) => void;
  onViewReceipt: (donation: DonationRecord) => void;
  onNavigateTab: (tab: string) => void;
}

export const SahyogDanView: React.FC<SahyogDanViewProps> = ({
  lang,
  donations,
  onAddDonation,
  onViewReceipt,
  onNavigateTab,
}) => {
  const t = translations[lang];

  // State
  const [mode, setMode] = useState<DonationMode>('qr');
  const [mobileId, setMobileId] = useState('');
  const [fullName, setFullName] = useState('');
  const [amount, setAmount] = useState<number | string>(500);
  const [purpose, setPurpose] = useState('general');
  const [paymentDate, setPaymentDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [utrNumber, setUtrNumber] = useState('');
  const [workerName, setWorkerName] = useState('');
  const [voucherNumber, setVoucherNumber] = useState('');
  const [location, setLocation] = useState('');
  const [remarks, setRemarks] = useState('');

  // Upload proof state
  const [proofPreview, setProofPreview] = useState<string | null>(SAMPLE_PROOF_URL);
  const [proofFileName, setProofFileName] = useState('screenshot_upi.jpg');

  // Modals and feedback
  const [showUtrModal, setShowUtrModal] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [generatedRefId, setGeneratedRefId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(`${label} ${lang === 'hi' ? 'कॉपी हो गया' : 'copied'}`);
    setTimeout(() => setCopyFeedback(null), 2500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProofFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setProofPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getPurposeLabel = (p: string) => {
    switch (p) {
      case 'education':
        return { hi: 'निःशुल्क प्राथमिक शिक्षा', en: 'Free Primary Education' };
      case 'coaching':
        return { hi: 'निःशुल्क कोचिंग सहयोग', en: 'Competitive Exam Coaching' };
      case 'marriage':
        return { hi: 'कन्या विवाह सहयोग', en: 'Girl Marriage Support' };
      case 'medical':
        return { hi: 'आपातकालीन स्वास्थ्य सहायता', en: 'Emergency Medical Aid' };
      default:
        return { hi: 'सामान्य सहयोग एवं सामाजिक कार्य', en: 'General Social Welfare' };
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newRef = `#DON-2024-${randomNum}`;
    setGeneratedRefId(newRef);

    setTimeout(() => {
      const pLabel = getPurposeLabel(purpose);
      const newRecord: DonationRecord = {
        id: Date.now().toString(),
        refNumber: newRef,
        donorName: fullName.trim() || (lang === 'hi' ? 'दानदाता' : 'Donor'),
        donorMobile: mobileId.trim(),
        amount: Number(amount) || 500,
        mode: mode,
        purpose: purpose,
        purposeLabelHi: pLabel.hi,
        purposeLabelEn: pLabel.en,
        date: paymentDate,
        time: lang === 'hi' ? 'आज, अभी' : 'Just now',
        status: 'pending',
        statusTextHi: 'सत्यापन लंबित',
        statusTextEn: 'Verification Pending',
        utrNumber: mode === 'qr' ? utrNumber.trim() : undefined,
        workerName: mode === 'cash' ? workerName.trim() : undefined,
        voucherNumber: mode === 'cash' ? voucherNumber.trim() : undefined,
        location: mode === 'cash' ? location.trim() : undefined,
        remarks: remarks.trim() || undefined,
        receiptDownloadAvailable: false,
        proofUrl: proofPreview || undefined,
      };

      onAddDonation(newRecord);
      setIsSubmitting(false);
      setShowSuccessDialog(true);
    }, 800);
  };

  const resetForm = () => {
    setShowSuccessDialog(false);
    setMobileId('');
    setFullName('');
    setAmount(500);
    setUtrNumber('');
    setWorkerName('');
    setVoucherNumber('');
    setLocation('');
    setRemarks('');
    setProofPreview(SAMPLE_PROOF_URL);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto">
      {/* Top Visual Ambient Hero & Page Header */}
      <div className="relative w-full bg-[#00142f] text-white px-4 pt-4 pb-6 shadow-md">
        <div className="flex items-center gap-1.5 text-[#ffdbca] mb-1">
          <span className="material-symbols-outlined text-[18px]">verified_user</span>
          <span className="text-xs font-semibold tracking-wide uppercase">
            {t.transparentCivic}
          </span>
        </div>
        <h2 className="font-serif font-bold text-xl sm:text-2xl text-white leading-tight">
          {t.sahyogDanTitle}
        </h2>
        <p className="text-xs text-[#7a91b7] mt-1">
          {t.sahyogDanSub}
        </p>

        {/* Stat/Highlight Pill Bar */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="bg-[#0f294a]/80 border border-[#7a91b7]/20 rounded-xl p-2.5 flex items-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-[#fd8a42] text-[22px]">
              receipt_long
            </span>
            <div className="min-w-0">
              <p className="text-[11px] text-[#7a91b7] leading-none">
                {t.digitalReceiptTime}
              </p>
              <p className="text-sm text-white font-bold mt-1 leading-none">
                {t.digitalReceiptDuration}
              </p>
            </div>
          </div>

          <div className="bg-[#0f294a]/80 border border-[#7a91b7]/20 rounded-xl p-2.5 flex items-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-[#ffdbca] text-[22px]">
              policy
            </span>
            <div className="min-w-0">
              <p className="text-[11px] text-[#7a91b7] leading-none">
                {t.certifiedTrust80g}
              </p>
              <p className="text-sm text-white font-bold mt-1 leading-none">
                {t.certifiedTrustLabel}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-2 space-y-4 z-10 mb-6">
        {/* Copy Toast feedback */}
        {copyFeedback && (
          <div className="bg-[#00142f] text-[#ffdbca] px-3 py-1.5 rounded-lg text-xs font-semibold shadow text-center animate-fade-in border border-[#ffdbca]/40">
            {copyFeedback}
          </div>
        )}

        {/* Mandatory Grassroots Notice Callout */}
        <div className="bg-[#ffdbca] text-[#331200] rounded-xl p-4 shadow-sm border border-[#ffb68e]/50">
          <div className="flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[#9b4500] text-[24px] flex-shrink-0 mt-0.5">
              info
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-[#331200]">
                {t.directOfflineNoticeTitle}
              </h3>
              <p className="text-xs text-[#763300] mt-1 leading-relaxed">
                {t.directOfflineNoticeDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Mode Selector Tabs (Segmented Control) */}
        <div className="bg-[#dce9ff] p-1 rounded-full flex items-center shadow-sm">
          <button
            onClick={() => setMode('qr')}
            className={`flex-1 py-2.5 px-2 rounded-full text-xs sm:text-sm font-semibold text-center flex items-center justify-center gap-1.5 transition-all ${
              mode === 'qr'
                ? 'bg-[#00142f] text-white shadow-sm'
                : 'text-[#44474e] hover:text-[#00142f]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
            <span>{t.modeQrBtn}</span>
          </button>
          <button
            onClick={() => setMode('cash')}
            className={`flex-1 py-2.5 px-2 rounded-full text-xs sm:text-sm font-semibold text-center flex items-center justify-center gap-1.5 transition-all ${
              mode === 'cash'
                ? 'bg-[#00142f] text-white shadow-sm'
                : 'text-[#44474e] hover:text-[#00142f]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">payments</span>
            <span>{t.modeCashBtn}</span>
          </button>
        </div>

        {/* QR Mode Instructions & Bank Details */}
        {mode === 'qr' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm space-y-3 border border-[#dce9ff]">
              <div className="flex items-center justify-between">
                <span className="bg-[#d5e3ff] text-[#001b3b] text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">account_balance</span>
                  {t.sbiAccount}
                </span>
                <span className="text-xs text-[#74777f] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-[#9b4500]">security</span>
                  {t.secureUpi}
                </span>
              </div>

              {/* QR Graphic with center Society emblem */}
              <div className="flex flex-col items-center justify-center bg-[#eff4ff] rounded-xl p-4 text-center border border-[#dce9ff]/60">
                <p className="font-bold text-sm text-[#00142f]">
                  {TRUST_DETAILS.name}
                </p>
                <div className="flex items-center justify-center gap-1 mt-0.5">
                  <p className="text-xs text-[#9b4500] font-medium">
                    {t.upiIdLabel} <span className="font-bold tracking-wider font-mono">{TRUST_DETAILS.upiId}</span>
                  </p>
                  <button
                    onClick={() => handleCopy(TRUST_DETAILS.upiId, 'UPI ID')}
                    className="p-1 text-[#00142f] hover:text-[#9b4500] transition-colors"
                    title="Copy UPI ID"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[15px]">content_copy</span>
                  </button>
                </div>

                {/* Crisp SVG QR Graphic with Official Center Touch */}
                <div className="relative mt-3 p-3 bg-white rounded-xl shadow-md border border-[#dce9ff]">
                  <svg className="w-44 h-44 text-[#00142f]" fill="currentColor" viewBox="0 0 160 160">
                    {/* Corner Finder 1 */}
                    <rect fill="currentColor" height="40" rx="4" width="40" x="10" y="10" />
                    <rect fill="#ffffff" height="28" rx="2" width="28" x="16" y="16" />
                    <rect fill="currentColor" height="16" rx="1" width="16" x="22" y="22" />
                    {/* Corner Finder 2 */}
                    <rect fill="currentColor" height="40" rx="4" width="40" x="110" y="10" />
                    <rect fill="#ffffff" height="28" rx="2" width="28" x="116" y="16" />
                    <rect fill="currentColor" height="16" rx="1" width="16" x="122" y="22" />
                    {/* Corner Finder 3 */}
                    <rect fill="currentColor" height="40" rx="4" width="40" x="10" y="110" />
                    <rect fill="#ffffff" height="28" rx="2" width="28" x="16" y="116" />
                    <rect fill="currentColor" height="16" rx="1" width="16" x="22" y="122" />
                    {/* Patterns */}
                    <rect height="8" rx="1" width="8" x="58" y="12" />
                    <rect height="18" rx="1" width="8" x="74" y="12" />
                    <rect height="8" rx="1" width="10" x="90" y="20" />
                    <rect height="8" rx="1" width="14" x="58" y="32" />
                    <rect height="12" rx="1" width="8" x="80" y="38" />
                    <rect height="10" rx="1" width="10" x="14" y="58" />
                    <rect height="8" rx="1" width="18" x="32" y="60" />
                    <rect fill="#0f294a" height="44" rx="2" width="44" x="58" y="58" />
                    <rect height="12" rx="1" width="12" x="110" y="60" />
                    <rect height="10" rx="1" width="18" x="130" y="58" />
                    <rect height="12" rx="1" width="26" x="18" y="78" />
                    <rect height="8" rx="1" width="16" x="114" y="80" />
                    <rect height="18" rx="1" width="10" x="138" y="78" />
                    <rect height="18" rx="1" width="10" x="58" y="110" />
                    <rect height="8" rx="1" width="14" x="76" y="118" />
                    <rect height="24" rx="1" width="8" x="98" y="110" />
                    <rect height="14" rx="1" width="16" x="114" y="118" />
                    <rect height="10" rx="1" width="10" x="138" y="110" />
                    <rect height="12" rx="1" width="26" x="62" y="136" />
                    <rect height="6" rx="1" width="12" x="98" y="142" />
                    <rect height="10" rx="1" width="26" x="122" y="138" />
                    {/* Center Society Badge */}
                    <circle cx="80" cy="80" fill="#fd8a42" r="16" />
                    <circle cx="80" cy="80" fill="#ffffff" r="13" />
                    <text
                      fill="#00142f"
                      fontFamily="'Noto Serif', serif"
                      fontSize="11"
                      fontWeight="bold"
                      textAnchor="middle"
                      x="80"
                      y="84"
                    >
                      अ
                    </text>
                  </svg>
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-[#00142f] text-white px-3 py-0.5 rounded-full text-[11px] font-semibold shadow whitespace-nowrap border border-[#7a91b7]/40">
                    Google Pay • PhonePe • Paytm • BHIM
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[#ba1a1a] mt-4 text-center">
                  <span className="material-symbols-outlined text-[16px] shrink-0">priority_high</span>
                  <span className="text-[11px] font-semibold leading-tight">
                    {t.scanPayWarning}
                  </span>
                </div>
              </div>

              {/* Direct Banking Reference */}
              <div className="bg-[#eff4ff] rounded-xl p-3 space-y-1.5 text-[#0d1c2e] border border-[#dce9ff]/60">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#44474e]">{t.accNoLabel}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold tracking-wider font-mono text-sm">{TRUST_DETAILS.accountNo}</span>
                    <button
                      onClick={() => handleCopy(TRUST_DETAILS.accountNo, 'खाता संख्या')}
                      className="text-[#00142f] hover:text-[#9b4500]"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[14px]">content_copy</span>
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#44474e]">{t.ifscLabel}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold tracking-wider font-mono text-sm">{TRUST_DETAILS.ifscCode}</span>
                    <button
                      onClick={() => handleCopy(TRUST_DETAILS.ifscCode, 'IFSC कोड')}
                      className="text-[#00142f] hover:text-[#9b4500]"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[14px]">content_copy</span>
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#44474e]">{t.branchLabel}</span>
                  <span className="font-semibold text-right">{TRUST_DETAILS.branch}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cash Mode Guidelines */}
        {mode === 'cash' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm space-y-3 border border-[#dce9ff]">
              <div className="flex items-center gap-2 text-[#9b4500]">
                <span className="material-symbols-outlined text-[24px]">verified</span>
                <h3 className="font-bold text-sm sm:text-base text-[#00142f]">
                  {t.cashGuideTitle}
                </h3>
              </div>
              <p className="text-xs text-[#44474e] leading-relaxed">
                {t.cashGuideDesc}
              </p>

              {/* Official Agent Card Preview */}
              <div className="bg-[#eff4ff] rounded-xl p-3.5 space-y-2 border border-[#dce9ff]/60">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#00142f] flex items-center justify-center text-white shrink-0">
                    <span className="material-symbols-outlined text-[22px]">badge</span>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-[#00142f]">
                      {t.cashVoucherVerify}
                    </p>
                    <p className="text-[11px] text-[#74777f]">
                      {t.cashVoucherRule}
                    </p>
                  </div>
                </div>
                <div className="bg-[#ffdad6] text-[#93000a] p-2.5 rounded-lg text-xs mt-2 flex items-start gap-1.5 font-medium">
                  <span className="material-symbols-outlined text-[16px] flex-shrink-0 mt-0.5">warning</span>
                  <span>{t.cashWarning}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DONATION RECORDING FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl p-4 shadow-sm space-y-4 border border-[#dce9ff]"
        >
          <div className="pb-1 border-b border-[#eff4ff]">
            <h3 className="text-base font-bold text-[#00142f] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#9b4500] text-[22px]">edit_document</span>
              <span>{t.formHeading}</span>
            </h3>
            <p className="text-xs text-[#44474e] mt-0.5">
              {t.formSubheading}
            </p>
          </div>

          {/* Field 1: Donor Mobile / Member ID */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-[#00142f]" htmlFor="donor_id">
              {t.labelMobileMember}
            </label>
            <div className="relative">
              <input
                id="donor_id"
                required
                type="tel"
                value={mobileId}
                onChange={(e) => setMobileId(e.target.value)}
                placeholder={t.placeholderMobileMember}
                className="w-full h-11 px-3.5 pr-10 rounded-xl bg-[#eff4ff] text-[#0d1c2e] text-sm placeholder:text-[#74777f] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#00142f] border border-[#dce9ff]"
              />
              <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#74777f] pointer-events-none text-[20px]">
                call
              </span>
            </div>
            <span className="text-[11px] text-[#74777f]">
              {t.hintSms}
            </span>
          </div>

          {/* Field 2: Donor Full Name */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-[#00142f]" htmlFor="donor_name">
              {t.labelFullName}
            </label>
            <input
              id="donor_name"
              required
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={t.placeholderFullName}
              className="w-full h-11 px-3.5 rounded-xl bg-[#eff4ff] text-[#0d1c2e] text-sm placeholder:text-[#74777f] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#00142f] border border-[#dce9ff]"
            />
          </div>

          {/* Field 3: Amount & Quick Chips */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[#00142f]" htmlFor="donation_amount">
              {t.labelAmount}
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 font-bold text-lg text-[#00142f]">₹</span>
              <input
                id="donation_amount"
                required
                type="number"
                min="10"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="500"
                className="w-full h-11 pl-8 pr-3.5 rounded-xl bg-[#eff4ff] text-[#00142f] font-bold text-base placeholder:text-[#74777f] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#00142f] border border-[#dce9ff]"
              />
            </div>

            {/* Quick Amount Chips */}
            <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
              {[100, 250, 500, 1000].map((amt) => {
                const isSelected = Number(amount) === amt;
                return (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold active:scale-95 transition-all ${
                      isSelected
                        ? 'bg-[#ffdbca] text-[#331200] border border-[#fd8a42]'
                        : 'bg-[#e6eeff] text-[#00142f] hover:bg-[#dce9ff]'
                    }`}
                  >
                    ₹{amt.toLocaleString('en-IN')} {amt === 1000 ? '★' : ''}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => setAmount('')}
                className="px-3 py-1.5 rounded-full bg-[#e6eeff] text-[#44474e] text-xs font-medium hover:bg-[#dce9ff]"
              >
                {t.chipCustom}
              </button>
            </div>
          </div>

          {/* Field 4: Purpose */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-[#00142f]" htmlFor="donation_purpose">
              {t.labelPurpose}
            </label>
            <div className="relative">
              <select
                id="donation_purpose"
                required
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full h-11 px-3.5 pr-10 rounded-xl bg-[#eff4ff] text-[#0d1c2e] text-xs sm:text-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#00142f] appearance-none border border-[#dce9ff]"
              >
                <option value="general">सामान्य सहयोग एवं सामाजिक कार्य (General Fund)</option>
                <option value="education">निःशुल्क प्राथमिक एवं माध्यमिक शिक्षा (Free Education)</option>
                <option value="coaching">प्रतियोगी परीक्षा पुस्तकालय एवं कोचिंग (Library & Coaching)</option>
                <option value="marriage">निर्धन कन्या विवाह सहायता (Beti Vivah Sahayog)</option>
                <option value="medical">आपातकालीन स्वास्थ्य सहायता (Medical Emergency Aid)</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#74777f] pointer-events-none text-[20px]">
                arrow_drop_down
              </span>
            </div>
          </div>

          {/* Field 5: Date of Payment */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-[#00142f]" htmlFor="payment_date">
              {t.labelPaymentDate}
            </label>
            <input
              id="payment_date"
              required
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-[#eff4ff] text-[#0d1c2e] text-xs sm:text-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#00142f] border border-[#dce9ff]"
            />
          </div>

          {/* DYNAMIC SECTION: QR Mode Fields */}
          {mode === 'qr' && (
            <div className="space-y-3 pt-1">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-[#00142f]" htmlFor="upi_ref">
                    {t.labelUtr}
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowUtrModal(true)}
                    className="text-xs text-[#9b4500] font-semibold flex items-center gap-0.5 hover:underline"
                  >
                    <span className="material-symbols-outlined text-[14px]">help</span>
                    {t.whatIsUtr}
                  </button>
                </div>
                <input
                  id="upi_ref"
                  required
                  type="text"
                  maxLength={20}
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  placeholder={t.placeholderUtr}
                  className="w-full h-11 px-3.5 rounded-xl bg-[#eff4ff] text-[#0d1c2e] font-mono font-bold tracking-wider placeholder:font-normal placeholder:tracking-normal placeholder:text-[#74777f] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#00142f] border border-[#dce9ff]"
                />
                <span className="text-[11px] text-[#74777f]">
                  {t.hintUtr}
                </span>
              </div>

              {/* Upload Proof */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#00142f]">
                  {t.labelUploadProof}
                </label>
                <div
                  onClick={() => document.getElementById('receipt_file')?.click()}
                  className="p-4 bg-[#eff4ff] hover:bg-[#e6eeff] transition-colors rounded-xl flex flex-col items-center justify-center text-center cursor-pointer border border-dashed border-[#7a91b7]/40 relative"
                >
                  <input
                    id="receipt_file"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {proofPreview ? (
                    <div className="flex flex-col items-center">
                      <img
                        src={proofPreview}
                        alt="Proof preview"
                        className="w-24 h-24 object-cover rounded-lg shadow-sm mb-2 border border-[#dce9ff]"
                      />
                      <span className="text-xs font-bold text-[#00142f] truncate max-w-[200px]">
                        {proofFileName}
                      </span>
                      <span className="text-[11px] text-[#9b4500] mt-0.5 underline">
                        {t.changePhoto}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-11 h-11 rounded-full bg-[#0f294a] text-white flex items-center justify-center mb-1">
                        <span className="material-symbols-outlined text-[22px]">add_a_photo</span>
                      </div>
                      <p className="text-xs font-semibold text-[#00142f]">
                        {t.uploadProofPrompt}
                      </p>
                      <p className="text-[11px] text-[#74777f] mt-0.5">
                        {t.uploadProofHint}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* DYNAMIC SECTION: Cash Mode Fields */}
          {mode === 'cash' && (
            <div className="space-y-3 pt-1">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#00142f]" htmlFor="worker_info">
                  {t.labelWorkerInfo}
                </label>
                <input
                  id="worker_info"
                  required
                  type="text"
                  value={workerName}
                  onChange={(e) => setWorkerName(e.target.value)}
                  placeholder={t.placeholderWorkerInfo}
                  className="w-full h-11 px-3.5 rounded-xl bg-[#eff4ff] text-[#0d1c2e] text-xs sm:text-sm placeholder:text-[#74777f] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#00142f] border border-[#dce9ff]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#00142f]" htmlFor="paper_receipt">
                  {t.labelPaperReceipt}
                </label>
                <input
                  id="paper_receipt"
                  required
                  type="text"
                  value={voucherNumber}
                  onChange={(e) => setVoucherNumber(e.target.value)}
                  placeholder={t.placeholderPaperReceipt}
                  className="w-full h-11 px-3.5 rounded-xl bg-[#eff4ff] text-[#0d1c2e] font-mono font-bold tracking-wider placeholder:font-normal placeholder:tracking-normal placeholder:text-[#74777f] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#00142f] border border-[#dce9ff]"
                />
                <span className="text-[11px] text-[#74777f]">
                  {t.hintPaperReceipt}
                </span>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#00142f]" htmlFor="village_loc">
                  {t.labelLocation}
                </label>
                <input
                  id="village_loc"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={t.placeholderLocation}
                  className="w-full h-11 px-3.5 rounded-xl bg-[#eff4ff] text-[#0d1c2e] text-xs sm:text-sm placeholder:text-[#74777f] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#00142f] border border-[#dce9ff]"
                />
              </div>
            </div>
          )}

          {/* Remarks / Message */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-[#00142f]" htmlFor="donor_remarks">
              {t.labelRemarks}
            </label>
            <textarea
              id="donor_remarks"
              rows={2}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder={t.placeholderRemarks}
              className="w-full p-3 rounded-xl bg-[#eff4ff] text-[#0d1c2e] text-xs sm:text-sm placeholder:text-[#74777f] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#00142f] resize-none border border-[#dce9ff]"
            />
          </div>

          {/* Verification Pending Trust Notice */}
          <div className="bg-[#e6eeff] rounded-xl p-3 flex items-start gap-2 border border-[#dce9ff]">
            <span className="material-symbols-outlined text-[#9b4500] text-[20px] flex-shrink-0 mt-0.5">
              hourglass_top
            </span>
            <div className="min-w-0">
              <span className="text-xs font-bold text-[#00142f] block">
                {t.statusIndicatorTitle}
              </span>
              <p className="text-[11px] text-[#44474e] leading-snug mt-0.5">
                {t.statusIndicatorDesc}
              </p>
            </div>
          </div>

          {/* Action Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-13 py-3.5 bg-[#9b4500] hover:bg-[#803800] text-white rounded-xl text-sm sm:text-base font-bold shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-75"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                <span>{t.submittingBtn}</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">send</span>
                <span>{t.submitBtn}</span>
              </>
            )}
          </button>
        </form>

        {/* RECENT SUBMISSIONS & STATUS TRACKER CARD */}
        <div className="bg-[#eff4ff] rounded-xl p-4 shadow-sm space-y-3 border border-[#dce9ff]">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-[#00142f]">
              {t.recentSubmissionsTitle}
            </h4>
            <span className="text-xs text-[#9b4500] font-semibold bg-[#ffdbca] px-2 py-0.5 rounded-full">
              {t.liveUpdates}
            </span>
          </div>

          {/* Donation list items */}
          <div className="space-y-2.5">
            {donations.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-3 space-y-1 shadow-sm border border-[#dce9ff]/60"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#00142f]">
                    {item.refNumber}
                  </span>
                  {item.status === 'pending' ? (
                    <span className="bg-[#ffdbca] text-[#331200] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">hourglass_empty</span>
                      {lang === 'hi' ? item.statusTextHi : item.statusTextEn}
                    </span>
                  ) : (
                    <span className="bg-[#d5e3fc] text-[#00142f] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px] text-[#9b4500]">check_circle</span>
                      {lang === 'hi' ? item.statusTextHi : item.statusTextEn}
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#44474e] font-medium">
                    {lang === 'hi' ? item.purposeLabelHi : item.purposeLabelEn}
                  </span>
                  <span className="font-bold text-[#00142f] font-mono">
                    ₹{item.amount.toLocaleString('en-IN')} • {item.mode === 'qr' ? 'UPI' : (lang === 'hi' ? 'नकद' : 'Cash')}
                  </span>
                </div>

                <div className="flex justify-between items-center text-[11px] text-[#74777f] pt-0.5">
                  <span>दिनांक: {item.time}</span>
                  {item.status === 'approved' ? (
                    <button
                      type="button"
                      onClick={() => onViewReceipt(item)}
                      className="text-[#9b4500] font-semibold flex items-center gap-0.5 hover:underline"
                    >
                      <span className="material-symbols-outlined text-[13px]">download</span>
                      <span>{t.downloadReceipt}</span>
                    </button>
                  ) : (
                    <span className="italic">बैंक मिलान प्रक्रिया में</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Help & Assistance Footer Note */}
        <div className="bg-white rounded-xl p-4 text-center shadow-sm space-y-2 border border-[#dce9ff]">
          <div className="w-10 h-10 rounded-full bg-[#fd8a42] text-[#331200] mx-auto flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">support_agent</span>
          </div>
          <p className="text-sm font-bold text-[#00142f]">
            {t.difficultyFormTitle}
          </p>
          <p className="text-xs text-[#44474e] leading-relaxed">
            {t.difficultyFormDesc}
          </p>
          <div className="pt-1">
            <a
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#00142f] text-white text-xs sm:text-sm font-semibold shadow-sm active:scale-95 transition-transform"
              href="tel:+916393608462"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span>{t.tollFreeHelpline}</span>
            </a>
          </div>
        </div>
      </div>

      {/* UTR Help Modal */}
      {showUtrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-[#00142f]/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full p-4 shadow-xl space-y-3 animate-scale-in border border-[#dce9ff]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[#00142f]">
                <span className="material-symbols-outlined text-[#9b4500]">info</span>
                <h4 className="font-bold text-sm sm:text-base">
                  {t.utrModalTitle}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowUtrModal(false)}
                className="w-8 h-8 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#74777f] hover:text-[#00142f]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <p className="text-xs text-[#44474e] leading-relaxed">
              {t.utrModalDesc}
            </p>
            <div className="bg-[#eff4ff] rounded-xl p-3 space-y-1.5 text-xs text-[#00142f] font-medium border border-[#dce9ff]">
              <div>• <strong>Google Pay:</strong> "UPI transaction ID"</div>
              <div>• <strong>PhonePe:</strong> "UTR" या "Transaction ID"</div>
              <div>• <strong>Paytm:</strong> "UPI Ref No."</div>
            </div>
            <button
              type="button"
              onClick={() => setShowUtrModal(false)}
              className="w-full py-2.5 bg-[#00142f] hover:bg-[#0f294a] text-white rounded-xl text-xs sm:text-sm font-bold transition-colors"
            >
              {t.gotIt}
            </button>
          </div>
        </div>
      )}

      {/* Interactive Submission Success Dialog */}
      {showSuccessDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-[#00142f]/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 sm:p-6 shadow-xl text-center space-y-3 border border-[#dce9ff] animate-scale-in">
            <div className="w-14 h-14 rounded-full bg-[#d5e3fc] text-[#00142f] mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-[32px]">mark_email_read</span>
            </div>

            <div className="space-y-1">
              <span className="bg-[#ffdbca] text-[#331200] text-[11px] px-3 py-1 rounded-full font-bold inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">hourglass_top</span>
                {t.pendingBadge}
              </span>
              <h4 className="font-serif font-bold text-base sm:text-lg text-[#00142f] mt-2">
                {t.submissionSuccessTitle}
              </h4>
              <p className="text-xs text-[#44474e]">
                {t.entryRefNo} <span className="font-mono font-bold text-[#00142f]">{generatedRefId}</span>
              </p>
            </div>

            <div className="bg-[#eff4ff] rounded-xl p-3 text-left space-y-1 text-xs text-[#44474e] border border-[#dce9ff]">
              <p className="leading-relaxed">
                {t.successSubDesc}
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowSuccessDialog(false);
                  onNavigateTab('dandata-login');
                }}
                className="w-full py-3 bg-[#00142f] hover:bg-[#0f294a] text-white rounded-xl text-xs sm:text-sm font-bold shadow"
              >
                {t.goToDashboard}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="w-full py-2 text-[#9b4500] text-xs sm:text-sm font-semibold hover:underline"
              >
                {t.recordAnother}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
