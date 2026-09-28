import React from 'react';
import { DonationRecord, Language } from '../types';
import { SOCIETY_LOGO_URL, TRUST_DETAILS } from '../data/mockData';

interface OfficialReceiptModalProps {
  record: DonationRecord | null;
  onClose: () => void;
  lang: Language;
}

export const OfficialReceiptModal: React.FC<OfficialReceiptModalProps> = ({ record, onClose, lang }) => {
  if (!record) return null;

  const handlePrint = () => {
    window.print();
  };

  const numberToWords = (num: number) => {
    // Basic helper for Indian rupee representation
    if (num === 100) return 'One Hundred Rupees Only';
    if (num === 250) return 'Two Hundred Fifty Rupees Only';
    if (num === 500) return 'Five Hundred Rupees Only';
    if (num === 1000) return 'One Thousand Rupees Only';
    if (num === 2500) return 'Two Thousand Five Hundred Rupees Only';
    if (num === 5000) return 'Five Thousand Rupees Only';
    return `${num} Rupees Only`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#00142f]/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-4 sm:p-6 shadow-2xl space-y-4 my-auto relative animate-scale-in border border-[#dce9ff]">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 w-8 h-8 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] text-[#44474e] flex items-center justify-center transition-colors"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Printable Receipt Container */}
        <div id="printable-receipt" className="border-2 border-[#00142f]/20 rounded-xl p-4 sm:p-5 bg-gradient-to-b from-[#f8f9ff] to-white relative">
          {/* Header */}
          <div className="flex items-center gap-3 border-b-2 border-[#9b4500]/20 pb-3">
            <img
              src={SOCIETY_LOGO_URL}
              alt="Logo"
              className="w-14 h-14 object-contain rounded-full border border-[#00142f]/10 p-0.5 bg-white shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h3 className="text-base sm:text-lg font-bold text-[#00142f] leading-tight font-serif">
                {TRUST_DETAILS.name}
              </h3>
              <p className="text-[11px] text-[#74777f] leading-tight">
                {TRUST_DETAILS.nameEn}
              </p>
              <p className="text-[10px] text-[#44474e] mt-0.5 font-medium">
                रजिस्ट्रेशन सं: {TRUST_DETAILS.regNo} | PAN: {TRUST_DETAILS.pan}
              </p>
              <p className="text-[9px] text-[#9b4500] font-semibold">
                {TRUST_DETAILS.section80G}
              </p>
            </div>
          </div>

          {/* Receipt Title */}
          <div className="my-3 text-center">
            <span className="inline-block bg-[#00142f] text-white px-3 py-1 rounded text-xs font-bold tracking-wider uppercase">
              दान रसीद / OFFICIAL DONATION RECEIPT
            </span>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs bg-[#eff4ff] p-2.5 rounded-lg mb-3">
            <div>
              <span className="text-[#74777f] block text-[10px]">रसीद सं. (Receipt No):</span>
              <span className="font-bold font-mono text-[#00142f]">
                {record.officialReceiptNo || record.refNumber}
              </span>
            </div>
            <div>
              <span className="text-[#74777f] block text-[10px]">दिनांक (Date):</span>
              <span className="font-semibold text-[#00142f]">
                {record.date} ({record.time})
              </span>
            </div>
            <div>
              <span className="text-[#74777f] block text-[10px]">भुगतान माध्यम (Mode):</span>
              <span className="font-semibold uppercase text-[#9b4500]">
                {record.mode === 'qr' ? 'UPI / QR Direct Bank' : 'Authorized Field Cash'}
              </span>
            </div>
            <div>
              <span className="text-[#74777f] block text-[10px]">
                {record.mode === 'qr' ? 'UTR / Ref No:' : 'Voucher Serial:'}
              </span>
              <span className="font-mono font-bold text-[#00142f]">
                {record.utrNumber || record.voucherNumber || 'N/A'}
              </span>
            </div>
          </div>

          {/* Body Content */}
          <div className="space-y-2 text-xs text-[#0d1c2e]">
            <div className="flex border-b border-dashed border-[#c4c6cf] pb-1">
              <span className="w-36 text-[#74777f] shrink-0">दानदाता का नाम (Name):</span>
              <span className="font-bold text-[#00142f]">{record.donorName}</span>
            </div>
            <div className="flex border-b border-dashed border-[#c4c6cf] pb-1">
              <span className="w-36 text-[#74777f] shrink-0">मोबाइल सं. (Mobile):</span>
              <span className="font-mono text-[#00142f]">{record.donorMobile}</span>
            </div>
            <div className="flex border-b border-dashed border-[#c4c6cf] pb-1">
              <span className="w-36 text-[#74777f] shrink-0">सहयोग उद्देश्य (Purpose):</span>
              <span className="font-semibold text-[#00142f]">
                {lang === 'hi' ? record.purposeLabelHi : record.purposeLabelEn}
              </span>
            </div>
            {record.location && (
              <div className="flex border-b border-dashed border-[#c4c6cf] pb-1">
                <span className="w-36 text-[#74777f] shrink-0">स्थान / गाँव (Location):</span>
                <span className="text-[#00142f]">{record.location}</span>
              </div>
            )}
            {record.remarks && (
              <div className="flex border-b border-dashed border-[#c4c6cf] pb-1">
                <span className="w-36 text-[#74777f] shrink-0">संदेश / Dedication:</span>
                <span className="italic text-[#44474e]">"{record.remarks}"</span>
              </div>
            )}

            {/* Total Amount Box */}
            <div className="mt-3 p-3 bg-[#e6eeff] rounded-lg border border-[#dce9ff] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#44474e] block">प्राप्त राशि (Amount Received):</span>
                <span className="text-xs font-semibold text-[#74777f]">
                  {numberToWords(record.amount)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-[#00142f] font-mono">
                  ₹{record.amount.toLocaleString('en-IN')}/-
                </span>
              </div>
            </div>
          </div>

          {/* Stamp & Signature Footer */}
          <div className="mt-4 pt-3 border-t border-[#00142f]/10 flex items-end justify-between text-[10px]">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full border border-dashed border-[#9b4500] flex flex-col items-center justify-center text-[7px] text-[#9b4500] text-center font-bold p-0.5">
                <span>सोसाइटी</span>
                <span>गोल मुहर</span>
                <span>VERIFIED</span>
              </div>
              <div className="text-[#74777f]">
                <p>प्रमाणित गैर-लाभकारी न्यास</p>
                <p className="text-[9px] text-[#00142f]">अकबरपुर, अम्बेडकर नगर</p>
              </div>
            </div>

            <div className="text-center">
              <div className="font-serif italic text-xs font-bold text-[#00142f] border-b border-[#00142f]/40 pb-0.5 px-2">
                राम आसरे गौतम
              </div>
              <span className="text-[#74777f] block text-[9px] mt-0.5">
                हस्ताक्षर: अधिकृत कोषाध्यक्ष / सचिव
              </span>
            </div>
          </div>

          <p className="text-[8px] text-center text-[#74777f] mt-3">
            * यह रसीद कंप्यूटर जनरेटेड एवं बैंक खाते से सत्यापित है। आयकर अधिनियम 1961 की धारा 80G के तहत छूट मान्य।
          </p>
        </div>

        {/* Modal Buttons */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={handlePrint}
            className="flex-1 py-3 bg-[#00142f] hover:bg-[#0f294a] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 shadow"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>{lang === 'hi' ? 'रसीद प्रिंट / PDF सेव करें' : 'Print / Save PDF'}</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-3 bg-[#eff4ff] hover:bg-[#dce9ff] text-[#00142f] rounded-xl text-sm font-semibold transition-colors"
            type="button"
          >
            {lang === 'hi' ? 'बंद करें' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
