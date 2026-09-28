import React, { useState } from 'react';
import { AuthUser, DonationRecord, Language } from '../types';

interface AgentDashboardViewProps {
  currentUser: AuthUser;
  lang: Language;
  donations: DonationRecord[];
  onAddDonation: (donation: DonationRecord) => void;
  onViewReceipt: (donation: DonationRecord) => void;
}

export const AgentDashboardView: React.FC<AgentDashboardViewProps> = ({
  currentUser,
  lang,
  donations,
  onAddDonation,
  onViewReceipt,
}) => {
  const [donorName, setDonorName] = useState('');
  const [donorMobile, setDonorMobile] = useState('');
  const [amount, setAmount] = useState<number | string>(500);
  const [voucherNumber, setVoucherNumber] = useState('');
  const [purpose, setPurpose] = useState('marriage');
  const [villageLocation, setVillageLocation] = useState('ग्राम कटेहरी, अम्बेडकर नगर');
  const [remarks, setRemarks] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [latestIssuedRef, setLatestIssuedRef] = useState('');

  // Agent's recorded donations
  const myAgentRecords = donations.filter(
    (d) =>
      d.workerName?.includes(currentUser.agentCode || '') ||
      d.workerName?.includes(currentUser.name.split(' ')[0]) ||
      d.workerPhone === currentUser.phone ||
      d.mode === 'cash'
  );

  const totalCollected = myAgentRecords.reduce((sum, d) => sum + d.amount, 0);

  const handleSubmitCashDonation = (e: React.FormEvent) => {
    e.preventDefault();

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newRef = `#DON-2024-${randomNum}`;
    setLatestIssuedRef(newRef);

    const purposeMap: Record<string, { hi: string; en: string }> = {
      education: { hi: 'निःशुल्क प्राथमिक शिक्षा', en: 'Free Primary Education' },
      coaching: { hi: 'निःशुल्क कोचिंग सहयोग', en: 'Competitive Exam Coaching' },
      marriage: { hi: 'कन्या विवाह सहयोग', en: 'Girl Marriage Support' },
      general: { hi: 'सामान्य सहयोग एवं सामाजिक कार्य', en: 'General Social Welfare' },
    };

    const newRecord: DonationRecord = {
      id: Date.now().toString(),
      refNumber: newRef,
      donorName: donorName.trim() || 'दानदाता',
      donorMobile: donorMobile.trim(),
      amount: Number(amount) || 500,
      mode: 'cash',
      purpose,
      purposeLabelHi: purposeMap[purpose]?.hi || 'सामान्य सामाजिक कार्य',
      purposeLabelEn: purposeMap[purpose]?.en || 'General Social Welfare',
      date: new Date().toISOString().split('T')[0],
      time: 'आज, अभी',
      status: 'pending',
      statusTextHi: 'सत्यापन लंबित',
      statusTextEn: 'Verification Pending',
      workerName: `${currentUser.name} (${currentUser.agentCode || 'AN-042'})`,
      workerPhone: currentUser.phone,
      voucherNumber: voucherNumber.trim(),
      officialReceiptNo: voucherNumber.trim(),
      location: villageLocation.trim(),
      remarks: remarks.trim() || undefined,
      receiptDownloadAvailable: true,
    };

    onAddDonation(newRecord);
    setIsSuccess(true);
    setDonorName('');
    setDonorMobile('');
    setAmount(500);
    setVoucherNumber('');
    setRemarks('');

    setTimeout(() => {
      setIsSuccess(false);
    }, 4000);
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 py-4 space-y-4">
      {/* Agent Profile Lockup */}
      <div className="bg-[#00142f] text-white rounded-2xl p-5 shadow-md border border-[#ffdbca]/20 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#fd8a42] text-[#331200] flex items-center justify-center font-bold text-xl shadow">
              <span className="material-symbols-outlined text-[28px]">badge</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="bg-[#ffdbca] text-[#9b4500] text-[10px] font-bold px-2 py-0.2 rounded-full">
                  {currentUser.roleTitleHi}
                </span>
                <span className="text-xs font-mono font-bold text-[#ffdbca]">
                  ID: {currentUser.agentCode || 'AN-042'}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
                {currentUser.name}
              </h2>
              <p className="text-xs text-[#7a91b7] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">pin_drop</span>
                <span>{currentUser.location || 'कटेहरी ब्लॉक'}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-[#7a91b7]/20">
          <div className="bg-[#0f294a] p-3 rounded-xl border border-[#7a91b7]/20">
            <span className="text-[10px] text-[#7a91b7] block">कुल नकद संग्रह (Total Cash)</span>
            <span className="text-lg font-bold text-[#ffdbca] font-mono">
              ₹{totalCollected.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="bg-[#0f294a] p-3 rounded-xl border border-[#7a91b7]/20">
            <span className="text-[10px] text-[#7a91b7] block">कुल जारी रसीदें (Slips Issued)</span>
            <span className="text-lg font-bold text-white font-mono">
              {myAgentRecords.length} पर्चियाँ
            </span>
          </div>
        </div>
      </div>

      {/* Field Cash Entry Form */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#dce9ff] space-y-4">
        <div className="flex items-center justify-between border-b border-[#eff4ff] pb-2">
          <div>
            <h3 className="font-serif font-bold text-base text-[#00142f] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#9b4500]">receipt_long</span>
              <span>{lang === 'hi' ? 'फील्ड नकद रसीद प्रविष्टि' : 'Field Cash Collection Entry'}</span>
            </h3>
            <p className="text-xs text-[#44474e]">
              {lang === 'hi'
                ? 'गाँव में ग्रामीण दानदाता को दी गई रसीद की प्रविष्टि तुरंत दर्ज करें'
                : 'Enter details of cash collection voucher issued to donor in the village'}
            </p>
          </div>
          <span className="text-[11px] bg-[#d5e3fc] text-[#00142f] px-2 py-0.5 rounded-full font-bold">
            एजेंट पोर्टल
          </span>
        </div>

        {isSuccess && (
          <div className="p-3 bg-[#d5e3fc] text-[#00142f] rounded-xl text-xs flex items-center gap-2 border border-[#00142f]/10 animate-scale-in">
            <span className="material-symbols-outlined text-[20px] text-[#9b4500]">check_circle</span>
            <div className="min-w-0">
              <span className="font-bold block">नकद सहयोग सफलतापूर्वक दर्ज हुआ!</span>
              <span className="text-[11px] text-[#44474e]">
                संदर्भ क्रमांक: {latestIssuedRef} (लेखा टीम को मिलान हेतु प्रेषित)
              </span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmitCashDonation} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#00142f] mb-1">
                {lang === 'hi' ? 'दानदाता का मोबाइल नंबर *' : 'Donor Mobile *'}
              </label>
              <input
                required
                type="tel"
                maxLength={10}
                value={donorMobile}
                onChange={(e) => setDonorMobile(e.target.value)}
                placeholder="9876543210"
                className="w-full h-11 px-3 rounded-xl bg-[#eff4ff] text-xs sm:text-sm font-mono border border-[#dce9ff]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#00142f] mb-1">
                {lang === 'hi' ? 'दानदाता का पूरा नाम *' : 'Donor Full Name *'}
              </label>
              <input
                required
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder={lang === 'hi' ? 'उदा. राम कुमार' : 'e.g. Ram Kumar'}
                className="w-full h-11 px-3 rounded-xl bg-[#eff4ff] text-xs sm:text-sm border border-[#dce9ff]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#00142f] mb-1">
                {lang === 'hi' ? 'नकद राशि (Amount in ₹) *' : 'Cash Amount (₹) *'}
              </label>
              <input
                required
                type="number"
                min="10"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-[#eff4ff] text-sm font-bold text-[#00142f] border border-[#dce9ff]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#00142f] mb-1">
                {lang === 'hi' ? 'कागजी रसीद क्रम संख्या (Voucher No.) *' : 'Voucher Serial No. *'}
              </label>
              <input
                required
                type="text"
                value={voucherNumber}
                onChange={(e) => setVoucherNumber(e.target.value)}
                placeholder="BK-11 / 450"
                className="w-full h-11 px-3 rounded-xl bg-[#eff4ff] text-xs sm:text-sm font-mono font-bold tracking-wider border border-[#dce9ff]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#00142f] mb-1">
                {lang === 'hi' ? 'सहयोग का उद्देश्य' : 'Purpose'}
              </label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-[#eff4ff] text-xs border border-[#dce9ff]"
              >
                <option value="marriage">कन्या विवाह सहयोग (Beti Vivah Sahayog)</option>
                <option value="education">निःशुल्क प्राथमिक शिक्षा (Education Kit)</option>
                <option value="coaching">प्रतियोगी कोचिंग (Coaching Support)</option>
                <option value="general">सामान्य सामाजिक कार्य (General Fund)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#00142f] mb-1">
                {lang === 'hi' ? 'गाँव / स्थान जहाँ नकद लिया' : 'Village / Location'}
              </label>
              <input
                type="text"
                value={villageLocation}
                onChange={(e) => setVillageLocation(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-[#eff4ff] text-xs border border-[#dce9ff]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#00142f] mb-1">
              {lang === 'hi' ? 'विशेष टिप्पणी (यदि कोई हो)' : 'Remarks'}
            </label>
            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder={lang === 'hi' ? 'हस्तलिखित रसीद देकर नकद प्राप्त किया' : 'Handed paper slip'}
              className="w-full h-10 px-3 rounded-xl bg-[#eff4ff] text-xs border border-[#dce9ff]"
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-[#9b4500] hover:bg-[#803800] text-white rounded-xl text-xs sm:text-sm font-bold shadow flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
            <span>{lang === 'hi' ? 'नकद प्रविष्टि दर्ज करें व रसीद बनाएं' : 'Submit Cash Entry & Generate Slip'}</span>
          </button>
        </form>
      </div>

      {/* Agent's Previous Submissions */}
      <div className="bg-[#eff4ff] rounded-2xl p-4 shadow-sm border border-[#dce9ff] space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-serif font-bold text-sm text-[#00142f]">
            {lang === 'hi' ? 'मेरे द्वारा दर्ज हालिया नकद संग्रह' : 'Recent Collections by You'}
          </h4>
          <span className="text-[11px] font-mono text-[#74777f]">
            {myAgentRecords.length} रिकॉर्ड
          </span>
        </div>

        <div className="space-y-2">
          {myAgentRecords.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-3 shadow-sm border border-[#dce9ff]/60 flex items-center justify-between"
            >
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs font-bold text-[#00142f]">{item.refNumber}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#ffdbca] text-[#9b4500] font-bold">
                    वाउचर: {item.voucherNumber || 'N/A'}
                  </span>
                </div>
                <p className="text-xs text-[#00142f] font-semibold mt-0.5">
                  {item.donorName} ({item.donorMobile})
                </p>
                <span className="text-[10px] text-[#74777f]">{item.time}</span>
              </div>
              <div className="text-right shrink-0">
                <span className="font-mono font-bold text-sm text-[#00142f] block">
                  ₹{item.amount.toLocaleString('en-IN')}
                </span>
                <button
                  type="button"
                  onClick={() => onViewReceipt(item)}
                  className="text-[11px] text-[#9b4500] font-semibold hover:underline flex items-center gap-0.5 justify-end"
                >
                  <span className="material-symbols-outlined text-[13px]">visibility</span>
                  <span>रसीद</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
