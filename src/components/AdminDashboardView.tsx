import React, { useState } from 'react';
import { AuthUser, DonationRecord, Language } from '../types';

interface AdminDashboardViewProps {
  currentUser: AuthUser;
  lang: Language;
  donations: DonationRecord[];
  onApproveDonation: (id: string) => void;
  onRejectDonation: (id: string) => void;
  onViewReceipt: (donation: DonationRecord) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  currentUser,
  lang,
  donations,
  onApproveDonation,
  onRejectDonation,
  onViewReceipt,
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const pendingCount = donations.filter((d) => d.status === 'pending').length;
  const approvedCount = donations.filter((d) => d.status === 'approved').length;
  const totalApprovedSum = donations
    .filter((d) => d.status === 'approved')
    .reduce((sum, d) => sum + d.amount, 0);

  const filteredRecords = donations
    .filter((d) => {
      if (filter === 'pending') return d.status === 'pending';
      if (filter === 'approved') return d.status === 'approved';
      return true;
    })
    .filter((d) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        d.refNumber.toLowerCase().includes(q) ||
        d.donorName.toLowerCase().includes(q) ||
        d.donorMobile.includes(q) ||
        (d.utrNumber && d.utrNumber.includes(q)) ||
        (d.voucherNumber && d.voucherNumber.toLowerCase().includes(q))
      );
    });

  const handleApprove = (id: string, ref: string) => {
    onApproveDonation(id);
    setActionNotice(`प्रविष्टि ${ref} स्वीकृत की गई व आधिकारिक 80G रसीद जारी हो गई!`);
    setTimeout(() => setActionNotice(null), 3500);
  };

  const handleReject = (id: string, ref: string) => {
    onRejectDonation(id);
    setActionNotice(`प्रविष्टि ${ref} अस्वीकृत की गई।`);
    setTimeout(() => setActionNotice(null), 3500);
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 py-4 space-y-4">
      {/* Admin Profile & Trust Control Header */}
      <div className="bg-[#00103e] text-white rounded-2xl p-5 shadow-md border border-[#dce1ff]/20 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#dce1ff] text-[#00103e] flex items-center justify-center font-bold text-xl shadow">
              <span className="material-symbols-outlined text-[28px]">admin_panel_settings</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="bg-[#fd8a42] text-[#331200] text-[10px] font-bold px-2 py-0.2 rounded-full">
                  {currentUser.roleTitleHi}
                </span>
                <span className="text-xs font-mono font-bold text-[#ffdbca]">
                  Audit Desk
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
                {currentUser.name}
              </h2>
              <p className="text-xs text-[#738ce0] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">account_balance</span>
                <span>SBI खाता: 41289055412 (सत्यापन पैनल)</span>
              </p>
            </div>
          </div>
        </div>

        {/* Financial Highlights */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-[#738ce0]/30 text-center">
          <div className="bg-[#00216c]/70 p-2.5 rounded-xl border border-[#738ce0]/20">
            <span className="text-[10px] text-[#b6c4ff] block">लंबित सत्यापन</span>
            <span className="text-lg font-bold text-[#ffdbca] font-mono">
              {pendingCount}
            </span>
          </div>
          <div className="bg-[#00216c]/70 p-2.5 rounded-xl border border-[#738ce0]/20">
            <span className="text-[10px] text-[#b6c4ff] block">स्वीकृत रसीदें</span>
            <span className="text-lg font-bold text-white font-mono">
              {approvedCount}
            </span>
          </div>
          <div className="bg-[#00216c]/70 p-2.5 rounded-xl border border-[#738ce0]/20">
            <span className="text-[10px] text-[#b6c4ff] block">सत्यापित कोष</span>
            <span className="text-base font-bold text-[#ffdbca] font-mono leading-tight">
              ₹{totalApprovedSum.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Action Notification Alert */}
      {actionNotice && (
        <div className="p-3 bg-[#d5e3fc] text-[#00142f] rounded-xl text-xs font-semibold flex items-center gap-2 border border-[#00142f]/10 animate-scale-in">
          <span className="material-symbols-outlined text-[18px] text-[#9b4500]">verified</span>
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Audit Controls & Filter Tabs */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#dce9ff] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="font-serif font-bold text-sm sm:text-base text-[#00142f] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#9b4500]">rule</span>
            <span>{lang === 'hi' ? 'दान सत्यापन व मिलान डैशबोर्ड' : 'Audit & Verification Queue'}</span>
          </h3>

          {/* Segmented Filter */}
          <div className="inline-flex bg-[#eff4ff] p-1 rounded-xl border border-[#dce9ff]">
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                filter === 'pending'
                  ? 'bg-[#9b4500] text-white shadow-sm'
                  : 'text-[#44474e] hover:text-[#00142f]'
              }`}
              type="button"
            >
              लंबित ({pendingCount})
            </button>
            <button
              onClick={() => setFilter('approved')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                filter === 'approved'
                  ? 'bg-[#00142f] text-white shadow-sm'
                  : 'text-[#44474e] hover:text-[#00142f]'
              }`}
              type="button"
            >
              स्वीकृत ({approvedCount})
            </button>
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-[#00142f] text-white shadow-sm'
                  : 'text-[#44474e] hover:text-[#00142f]'
              }`}
              type="button"
            >
              सभी ({donations.length})
            </button>
          </div>
        </div>

        {/* Search Filter */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="मोबाइल नंबर, UTR या नाम से खोजें..."
            className="w-full h-10 px-3 pl-9 rounded-xl bg-[#eff4ff] text-xs text-[#0d1c2e] border border-[#dce9ff] focus:outline-none focus:bg-white"
          />
          <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-[#74777f] text-[18px]">
            search
          </span>
        </div>
      </div>

      {/* Record Cards in Audit Queue */}
      <div className="space-y-3">
        {filteredRecords.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center space-y-2 border border-[#dce9ff]">
            <span className="material-symbols-outlined text-[32px] text-[#74777f]">
              task_alt
            </span>
            <p className="text-sm font-semibold text-[#00142f]">
              {lang === 'hi' ? 'कोई प्रविष्टि लंबित नहीं है' : 'No records match filter'}
            </p>
          </div>
        ) : (
          filteredRecords.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl p-4 shadow-sm border space-y-3 transition-all ${
                item.status === 'pending'
                  ? 'border-[#ffdbca] bg-gradient-to-b from-[#fffaf7] to-white'
                  : 'border-[#dce9ff]'
              }`}
            >
              {/* Header Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#00142f]">
                    {item.refNumber}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.mode === 'qr'
                        ? 'bg-[#d5e3ff] text-[#001b3b]'
                        : 'bg-[#ffdbca] text-[#9b4500]'
                    }`}
                  >
                    {item.mode === 'qr' ? 'UPI Bank' : 'Field Cash'}
                  </span>
                </div>

                {item.status === 'pending' ? (
                  <span className="bg-[#ffdbca] text-[#331200] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">hourglass_top</span>
                    <span>बैंक मिलान प्रतीक्षित</span>
                  </span>
                ) : (
                  <span className="bg-[#d5e3fc] text-[#00142f] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px] text-[#9b4500]">check_circle</span>
                    <span>सत्यापित व रसीद जारी</span>
                  </span>
                )}
              </div>

              {/* Donor & Amount Details */}
              <div className="flex justify-between items-start text-xs">
                <div>
                  <h4 className="font-bold text-sm text-[#00142f]">{item.donorName}</h4>
                  <p className="text-[#44474e] font-mono">{item.donorMobile}</p>
                  <p className="text-[11px] text-[#74777f] mt-0.5">
                    {lang === 'hi' ? item.purposeLabelHi : item.purposeLabelEn}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold font-mono text-[#00142f]">
                    ₹{item.amount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-[#74777f] block">{item.time}</span>
                </div>
              </div>

              {/* Proof / Reference Box */}
              <div className="bg-[#eff4ff] p-2.5 rounded-xl text-xs space-y-1 border border-[#dce9ff]/60">
                {item.mode === 'qr' && item.utrNumber && (
                  <div className="flex justify-between font-mono">
                    <span className="text-[#74777f]">12-अंक UTR:</span>
                    <strong className="text-[#00142f] select-all">{item.utrNumber}</strong>
                  </div>
                )}
                {item.mode === 'cash' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-[#74777f]">कार्यकर्ता (Agent):</span>
                      <strong className="text-[#00142f]">{item.workerName || 'राम सजीवन'}</strong>
                    </div>
                    <div className="flex justify-between font-mono">
                      <span className="text-[#74777f]">वाउचर संख्या:</span>
                      <strong className="text-[#9b4500]">{item.voucherNumber || 'N/A'}</strong>
                    </div>
                  </>
                )}
                {item.remarks && (
                  <div className="text-[11px] text-[#44474e] italic pt-0.5">
                    टिप्पणी: "{item.remarks}"
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                {item.status === 'pending' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handleApprove(item.id, item.refNumber)}
                      className="flex-1 py-2.5 bg-[#00142f] hover:bg-[#0f294a] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow transition-all active:scale-[0.98]"
                    >
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      <span>खाता मिलान करें व रसीद स्वीकृत करें</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReject(item.id, item.refNumber)}
                      className="px-3 py-2.5 bg-[#ffdad6] hover:bg-[#ffb4ab] text-[#93000a] rounded-xl text-xs font-bold transition-all"
                    >
                      अस्वीकृत
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => onViewReceipt(item)}
                    className="w-full py-2 bg-[#eff4ff] hover:bg-[#dce9ff] text-[#00142f] rounded-xl text-xs font-bold flex items-center justify-center gap-1 border border-[#dce9ff]"
                  >
                    <span className="material-symbols-outlined text-[16px]">print</span>
                    <span>जारी 80G डिजिटल रसीद देखें</span>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
