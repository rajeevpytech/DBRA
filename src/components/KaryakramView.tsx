import React, { useState } from 'react';
import { Language } from '../types';
import { programsData, TRUST_DETAILS } from '../data/mockData';

interface KaryakramViewProps {
  lang: Language;
  onNavigateTab: (tab: string) => void;
}

export const KaryakramView: React.FC<KaryakramViewProps> = ({ lang, onNavigateTab }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'education' | 'coaching' | 'marriage'>('all');
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyProgram, setApplyProgram] = useState('education');
  const [studentName, setStudentName] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [phone, setPhone] = useState('');
  const [village, setVillage] = useState('');
  const [applySuccess, setApplySuccess] = useState(false);

  const filteredPrograms =
    activeTab === 'all'
      ? programsData
      : programsData.filter((p) => p.id === activeTab);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplySuccess(true);
    setTimeout(() => {
      setApplySuccess(false);
      setShowApplyModal(false);
      setStudentName('');
      setGuardianName('');
      setPhone('');
      setVillage('');
    }, 2000);
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 py-4 space-y-4">
      {/* Top Banner */}
      <div className="bg-[#00142f] text-white rounded-2xl p-5 shadow-md relative overflow-hidden">
        <div className="flex items-center gap-1.5 text-[#ffdbca] mb-1">
          <span className="material-symbols-outlined text-[18px]">menu_book</span>
          <span className="text-xs font-semibold uppercase tracking-wider">
            {lang === 'hi' ? 'सेवा एवं सामाजिक उत्थान' : 'Service & Upliftment'}
          </span>
        </div>
        <h2 className="font-serif font-bold text-xl sm:text-2xl text-white">
          {lang === 'hi' ? 'हमारे मुख्य सेवा कार्यक्रम' : 'Our Welfare Programs'}
        </h2>
        <p className="text-xs text-[#7a91b7] mt-1 leading-relaxed">
          {lang === 'hi'
            ? 'शिक्षा, स्वावलंबन और सम्मान के संकल्प के साथ संचालित जमीनी सेवा योजनाएँ।'
            : 'Grassroots welfare initiatives grounded in Babasaheb’s ideals of education and empowerment.'}
        </p>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-3 pb-1">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'all'
                ? 'bg-[#fd8a42] text-[#331200]'
                : 'bg-[#0f294a] text-white hover:bg-[#1a385f]'
            }`}
            type="button"
          >
            {lang === 'hi' ? 'सभी कार्यक्रम' : 'All Programs'}
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'education'
                ? 'bg-[#fd8a42] text-[#331200]'
                : 'bg-[#0f294a] text-white hover:bg-[#1a385f]'
            }`}
            type="button"
          >
            {lang === 'hi' ? '१. प्राथमिक शिक्षा' : '1. Primary Education'}
          </button>
          <button
            onClick={() => setActiveTab('coaching')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'coaching'
                ? 'bg-[#fd8a42] text-[#331200]'
                : 'bg-[#0f294a] text-white hover:bg-[#1a385f]'
            }`}
            type="button"
          >
            {lang === 'hi' ? '२. प्रतियोगी कोचिंग' : '2. Coaching Hub'}
          </button>
          <button
            onClick={() => setActiveTab('marriage')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'marriage'
                ? 'bg-[#fd8a42] text-[#331200]'
                : 'bg-[#0f294a] text-white hover:bg-[#1a385f]'
            }`}
            type="button"
          >
            {lang === 'hi' ? '३. बेटी विवाह' : '3. Beti Vivah'}
          </button>
        </div>
      </div>

      {/* Program Cards Detailed */}
      <div className="space-y-4">
        {filteredPrograms.map((prog) => (
          <div
            key={prog.id}
            className="bg-white rounded-2xl p-5 shadow-sm border border-[#dce9ff] space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    prog.id === 'education'
                      ? 'bg-[#dce9ff] text-[#00142f]'
                      : prog.id === 'coaching'
                      ? 'bg-[#dce1ff] text-[#00103e]'
                      : 'bg-[#ffdbca] text-[#9b4500]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[26px]">{prog.icon}</span>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#00142f]">
                    {lang === 'hi' ? `${prog.number}. ${prog.titleHi}` : `${prog.number}. ${prog.titleEn}`}
                  </h3>
                  <span className="text-xs text-[#9b4500] font-semibold">
                    {lang === 'hi' ? prog.subtitleHi : prog.subtitleEn}
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#eff4ff] text-[#00142f] text-xs font-bold shrink-0 border border-[#dce9ff]">
                {lang === 'hi' ? prog.statusBadgeHi : prog.statusBadgeEn}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#44474e] leading-relaxed">
              {lang === 'hi' ? prog.descriptionHi : prog.descriptionEn}
            </p>

            {/* Key Features Bullet Points */}
            <div className="bg-[#eff4ff] rounded-xl p-3.5 space-y-1.5 border border-[#dce9ff]/60">
              <h4 className="text-xs font-bold text-[#00142f] flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#9b4500]">task_alt</span>
                <span>{lang === 'hi' ? 'प्रमुख बिंदु व सुविधाएँ:' : 'Key Highlights:'}</span>
              </h4>
              <ul className="space-y-1 text-xs text-[#0d1c2e]">
                {(lang === 'hi' ? prog.featuresHi : prog.featuresEn).map((f, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[#9b4500] font-bold">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Strict Notice if present */}
            {prog.ruleNoticeHi && (
              <div className="bg-[#ffdad6] text-[#93000a] p-3 rounded-xl text-xs flex items-start gap-2 border border-[#ba1a1a]/20">
                <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">gavel</span>
                <span className="font-medium leading-relaxed">
                  {lang === 'hi' ? prog.ruleNoticeHi : prog.ruleNoticeEn}
                </span>
              </div>
            )}

            {/* Eligibility Note */}
            {prog.eligibilityHi && (
              <div className="text-xs text-[#44474e] flex items-start gap-1.5 pt-1">
                <span className="font-bold text-[#00142f] shrink-0">
                  {lang === 'hi' ? 'पात्रता:' : 'Eligibility:'}
                </span>
                <span>{lang === 'hi' ? prog.eligibilityHi : prog.eligibilityEn}</span>
              </div>
            )}

            {/* Action buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => {
                  setApplyProgram(prog.id);
                  setShowApplyModal(true);
                }}
                className="flex-1 py-2.5 px-4 bg-[#00142f] hover:bg-[#0f294a] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 shadow transition-all active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                <span>
                  {prog.id === 'marriage'
                    ? (lang === 'hi' ? 'सहयोग हेतु आवेदन / पूछताछ' : 'Apply for Marriage Aid')
                    : (lang === 'hi' ? 'निःशुल्क पंजीकरण करें' : 'Register Free')}
                </span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('sahyog-dan')}
                className="py-2.5 px-4 bg-[#ffdbca] hover:bg-[#ffb68e] text-[#331200] rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <span className="material-symbols-outlined text-[18px] text-[#9b4500]">volunteer_activism</span>
                <span>{lang === 'hi' ? 'इस कार्य हेतु दान दें' : 'Support this Cause'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Rural Centers Information */}
      <div className="bg-[#eff4ff] rounded-2xl p-4 shadow-sm border border-[#dce9ff] space-y-2">
        <h4 className="font-serif font-bold text-sm sm:text-base text-[#00142f] flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#9b4500] text-[20px]">pin_drop</span>
          <span>{lang === 'hi' ? 'अम्बेडकर नगर में प्रमुख कार्यक्षेत्र केंद्र' : 'Key Field Centers in Ambedkar Nagar'}</span>
        </h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white p-2.5 rounded-lg border border-[#dce9ff]/60">
            <span className="font-bold text-[#00142f] block">कटेहरी ब्लॉक (मुख्यालय)</span>
            <span className="text-[11px] text-[#74777f]">बाल पुस्तकालय व प्राथमिक कोचिंग</span>
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-[#dce9ff]/60">
            <span className="font-bold text-[#00142f] block">अकबरपुर नगर</span>
            <span className="text-[11px] text-[#74777f]">प्रतियोगी परीक्षा रीडिंग रूम</span>
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-[#dce9ff]/60">
            <span className="font-bold text-[#00142f] block">जलालपुर तहसील</span>
            <span className="text-[11px] text-[#74777f]">सामुदायिक विवाह सहायता समन्वय</span>
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-[#dce9ff]/60">
            <span className="font-bold text-[#00142f] block">टांडा / भीटी क्षेत्र</span>
            <span className="text-[11px] text-[#74777f]">गाँव अध्ययन समूह</span>
          </div>
        </div>
      </div>

      {/* Registration / Inquiry Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#00142f]/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl space-y-4 animate-scale-in border border-[#dce9ff]">
            <div className="flex items-center justify-between border-b pb-2">
              <h4 className="font-serif font-bold text-base text-[#00142f] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#9b4500]">assignment</span>
                <span>{lang === 'hi' ? 'सेवा योजना पंजीकरण व आवेदन' : 'Program Registration / Inquiry'}</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowApplyModal(false)}
                className="w-8 h-8 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#74777f]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {applySuccess ? (
              <div className="p-6 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#d5e3fc] text-[#00142f] mx-auto flex items-center justify-center">
                  <span className="material-symbols-outlined text-[28px]">check</span>
                </div>
                <h5 className="font-bold text-sm text-[#00142f]">
                  {lang === 'hi' ? 'आवेदन सफलतापूर्वक प्राप्त हुआ!' : 'Application Submitted!'}
                </h5>
                <p className="text-xs text-[#44474e]">
                  {lang === 'hi'
                    ? 'संस्था के ब्लॉक समन्वयक शीघ्र ही आपसे संपर्क करेंगे।'
                    : 'Our field coordinator will contact you shortly.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#00142f] mb-1">
                    {lang === 'hi' ? 'कार्यक्रम चुनें' : 'Select Program'}
                  </label>
                  <select
                    value={applyProgram}
                    onChange={(e) => setApplyProgram(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-[#eff4ff] text-xs border border-[#dce9ff] text-[#00142f]"
                  >
                    <option value="education">निःशुल्क प्राथमिक शिक्षा (Free Primary Education)</option>
                    <option value="coaching">निःशुल्क प्रतियोगी कोचिंग (Competitive Coaching)</option>
                    <option value="marriage">बेटी विवाह सामाजिक सहयोग (Beti Vivah Sahayog)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#00142f] mb-1">
                    {lang === 'hi' ? 'विद्यार्थी / लाभार्थी का नाम *' : 'Beneficiary Name *'}
                  </label>
                  <input
                    required
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder={lang === 'hi' ? 'नाम दर्ज करें' : 'Enter name'}
                    className="w-full h-10 px-3 rounded-xl bg-[#eff4ff] text-xs border border-[#dce9ff]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#00142f] mb-1">
                    {lang === 'hi' ? 'अभिभावक / पिता का नाम *' : 'Guardian / Father Name *'}
                  </label>
                  <input
                    required
                    type="text"
                    value={guardianName}
                    onChange={(e) => setGuardianName(e.target.value)}
                    placeholder={lang === 'hi' ? 'पिता / अभिभावक का नाम' : 'Guardian name'}
                    className="w-full h-10 px-3 rounded-xl bg-[#eff4ff] text-xs border border-[#dce9ff]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#00142f] mb-1">
                    {lang === 'hi' ? 'मोबाइल नंबर *' : 'Mobile Number *'}
                  </label>
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9876543210"
                    className="w-full h-10 px-3 rounded-xl bg-[#eff4ff] text-xs border border-[#dce9ff]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#00142f] mb-1">
                    {lang === 'hi' ? 'ग्राम / मोहल्ला / ब्लॉक *' : 'Village / Block *'}
                  </label>
                  <input
                    required
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    placeholder={lang === 'hi' ? 'उदा. ग्राम कटेहरी' : 'e.g. Village Katehari'}
                    className="w-full h-10 px-3 rounded-xl bg-[#eff4ff] text-xs border border-[#dce9ff]"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#00142f] hover:bg-[#0f294a] text-white rounded-xl text-xs font-bold shadow"
                  >
                    {lang === 'hi' ? 'आवेदन प्रेषित करें' : 'Submit Application'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    className="px-3 py-2.5 bg-[#eff4ff] text-[#44474e] rounded-xl text-xs font-semibold"
                  >
                    {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
