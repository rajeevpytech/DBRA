import { DonationRecord, ProgramItem, FaqItem } from '../types';

export const SOCIETY_LOGO_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkGRF7ext3NiWREAEujz8IABpen9-piiK1JFLVNVD9VA06425FXEnDdv-4bheSg7SV5F7wTPYiu2OdjTy7vWmRi3BVZF2gcweRS3jyBWHByqDlyKXEZhoILgm73F_hbz130RJGxd0UrF7iJQwgUuP-fr7QjcjZjGfYWl5OYdBaLfpCGvnyCuw516hjOgWE84E9f0ZBxH9N6se0WioqrA6MryuQYLZfByuTYbOaXDOHoXgoCMWE5fDJ';

export const SAMPLE_PROOF_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaoD7UDRDiYqpFQ12kiRMRsm3dC7tfiD8RNlWqe9eEBqGvUDszw5-zxUnYfyoG2KbYxm81kVV8YkfJ7aS6z-854AAv4RlfZ5tzx0Gbeuw7OEntPl9g-MUnP1kRQaDyW9PV1islhtcTlBx8SpnBtk1ViVcDT06Jxa3O0SuVGRrD_tVPe6k589uPL8xYYmbbMh-gdw_s1wMDbgJQWGhA4EP_tdDHcNdiJ1sgEveNyyiUvIIZgtgHBMm5';

export const initialDonations: DonationRecord[] = [
  {
    id: '0',
    refNumber: '#DON-2024-9102',
    donorName: 'राजीव कुमार (Rajeev Kumar)',
    donorMobile: '6393608462',
    amount: 1100,
    mode: 'qr',
    purpose: 'education',
    purposeLabelHi: 'निःशुल्क प्राथमिक शिक्षा किट',
    purposeLabelEn: 'Free Primary Education Kit',
    date: '2026-09-28',
    time: 'आज, 04:30 PM',
    status: 'approved',
    statusTextHi: 'स्वीकृत (रसीद जारी)',
    statusTextEn: 'Approved (Receipt Issued)',
    utrNumber: '423891028374',
    officialReceiptNo: 'REC-2024-102',
    receiptDownloadAvailable: true,
    remarks: 'ग्रामीण बच्चों की पढ़ाई एवं बैग वितरण हेतु सहयोग।',
    proofUrl: SAMPLE_PROOF_URL,
    approvedBy: 'इंजी. राम आसरे गौतम',
    approvedAt: 'आज, 04:35 PM',
  },
  {
    id: '1',
    refNumber: '#DON-2024-8842',
    donorName: 'अविनाश कुमार बौद्ध',
    donorMobile: '9876543210',
    amount: 500,
    mode: 'qr',
    purpose: 'coaching',
    purposeLabelHi: 'निःशुल्क कोचिंग सहयोग',
    purposeLabelEn: 'Free Coaching Support',
    date: '2026-09-28',
    time: 'आज, 02:40 PM',
    status: 'pending',
    statusTextHi: 'सत्यापन लंबित',
    statusTextEn: 'Verification Pending',
    utrNumber: '423871928371',
    receiptDownloadAvailable: false,
    remarks: 'ग्रामीण युवाओं के उज्ज्वल भविष्य हेतु।',
    proofUrl: SAMPLE_PROOF_URL,
  },
  {
    id: '2',
    refNumber: '#DON-2024-8710',
    donorName: 'राजेश कुमार गौतम',
    donorMobile: '9876543210',
    amount: 1000,
    mode: 'cash',
    purpose: 'marriage',
    purposeLabelHi: 'कन्या विवाह सहयोग',
    purposeLabelEn: 'Girl Marriage Support',
    date: '2026-09-25',
    time: '25 सित., 11:15 AM',
    status: 'approved',
    statusTextHi: 'स्वीकृत (रसीद जारी)',
    statusTextEn: 'Approved (Receipt Issued)',
    workerName: 'राम सजीवन (AN-042)',
    voucherNumber: 'BK-11 / 449',
    officialReceiptNo: 'BK-11 / 449',
    location: 'ग्राम कटेहरी, अम्बेडकर नगर',
    receiptDownloadAvailable: true,
    remarks: 'बेटी के विवाह में उपहार स्वरूप सहयोग।',
  },
  {
    id: '3',
    refNumber: '#DON-2024-8650',
    donorName: 'सुनीता देवी',
    donorMobile: '9450123456',
    amount: 250,
    mode: 'qr',
    purpose: 'education',
    purposeLabelHi: 'प्राथमिक शिक्षा किट',
    purposeLabelEn: 'Primary Education Kit',
    date: '2026-09-22',
    time: '22 सित., 04:30 PM',
    status: 'approved',
    statusTextHi: 'स्वीकृत (रसीद जारी)',
    statusTextEn: 'Approved (Receipt Issued)',
    utrNumber: '321948572184',
    officialReceiptNo: 'REC-2024-089',
    receiptDownloadAvailable: true,
    remarks: 'बच्चों के लिए कॉपी व पेंसिल किट हेतु।',
  },
  {
    id: '4',
    refNumber: '#DON-2024-8592',
    donorName: 'डॉ. महेंद्र प्रताप',
    donorMobile: '9876543210',
    amount: 2500,
    mode: 'qr',
    purpose: 'general',
    purposeLabelHi: 'सामान्य सामाजिक निधि',
    purposeLabelEn: 'General Community Fund',
    date: '2026-09-18',
    time: '18 सित., 10:00 AM',
    status: 'approved',
    statusTextHi: 'स्वीकृत (रसीद जारी)',
    statusTextEn: 'Approved (Receipt Issued)',
    utrNumber: '421893049102',
    officialReceiptNo: 'REC-2024-074',
    receiptDownloadAvailable: true,
    remarks: 'वार्षिक शैक्षिक सम्मेलन एवं मेधावी छात्र सम्मान।',
  }
];

export const programsData: ProgramItem[] = [
  {
    id: 'education',
    number: '१',
    titleHi: 'निःशुल्क प्राथमिक शिक्षा',
    titleEn: 'Free Primary Education',
    subtitleHi: 'वंचित ग्रामीण बच्चों हेतु',
    subtitleEn: 'For underprivileged rural children',
    statusBadgeHi: 'सक्रिय',
    statusBadgeEn: 'Active',
    badgeType: 'active',
    icon: 'backpack',
    descriptionHi: 'गाँव-गाँव में प्राथमिक स्तर के बच्चों को निःशुल्क पाठ्य सामग्री, कॉपियाँ, बैग और बुनियादी ट्यूशन सहायता। शिक्षा से कोई भी बच्चा वंचित न रहे।',
    descriptionEn: 'Providing free school bags, notebooks, stationery, and evening foundational study centers to underprivileged rural students.',
    featuresHi: [
      'कक्षा १ से ८ के विद्यार्थियों के लिए वार्षिक स्कूल बैग व कॉपियाँ वितरण',
      'गाँवों में शाम को २ घंटे निःशुल्क उपचारात्मक (Remedial) कोचिंग कक्षाएँ',
      'बाबासाहेब अंबेडकर बाल पुस्तकालय का संचालन'
    ],
    featuresEn: [
      'Annual school bags & stationery distribution for classes 1st to 8th',
      'Daily 2-hour free remedial evening village tutoring sessions',
      'Operation of Dr. Ambedkar children learning book-bank'
    ],
    eligibilityHi: 'अम्बेडकर नगर के ग्रामीण क्षेत्रों के आर्थिक रूप से कमजोर एवं वंचित परिवारों के बच्चे।'
  },
  {
    id: 'coaching',
    number: '२',
    titleHi: 'निःशुल्क प्रतियोगी कोचिंग',
    titleEn: 'Free Competitive Exam Coaching',
    subtitleHi: 'युवा मार्गदर्शन व मार्गदर्शन केंद्र',
    subtitleEn: 'Youth Career Guidance & Library Hub',
    statusBadgeHi: 'पंजीकरण खुला',
    statusBadgeEn: 'Registrations Open',
    badgeType: 'open',
    icon: 'psychology',
    descriptionHi: 'सरकारी नौकरियों एवं प्रवेश परीक्षाओं की तैयारी कर रहे मेधावी युवाओं हेतु निःशुल्क मार्गदर्शन, पुस्तकालय सुविधा व ऑनलाइन मॉक टेस्ट सहायता।',
    descriptionEn: 'Dedicated free study room, guidance, and digital test series for rural youths preparing for UP Police, SSC, PET, Railway and Civil Services.',
    featuresHi: [
      'यूपी पुलिस, एसएससी, रेलवे व शिक्षक पात्रता हेतु नियमित मार्गदर्शक व्याख्यान',
      'अकबरपुर व कटेहरी में शांतिपूर्ण अध्ययन कक्ष (Study Room / Library)',
      'डिजिटल मॉक टेस्ट एवं करंट अफेयर्स साप्ताहिक नोट्स'
    ],
    featuresEn: [
      'Regular expert lectures for UP Police, SSC, State exams, and Teaching tests',
      'Quiet air-cooled study rooms in Akbarpur and Katehari blocks',
      'Weekly printed notes and computer-based mock practice tests'
    ],
    eligibilityHi: '१०वीं/१२वीं/स्नातक उत्तीर्ण ग्रामीण युवा जो प्रतियोगी परीक्षाओं की तैयारी कर रहे हैं।'
  },
  {
    id: 'marriage',
    number: '३',
    titleHi: 'बेटी विवाह सामाजिक सहयोग',
    titleEn: 'Beti Vivah Social Welfare Aid',
    subtitleHi: 'सामुदायिक संबल पहल',
    subtitleEn: 'Community Solidarity Program',
    statusBadgeHi: 'सत्यापन अधीन',
    statusBadgeEn: 'Under Verification',
    badgeType: 'review',
    icon: 'diversity_1',
    descriptionHi: 'आर्थिक रूप से अत्यंत निर्बल परिवारों की बेटियों के विवाह में घरेलू आवश्यक वस्तुएँ एवं सामाजिक स्तर पर सहयोग प्रदान करने की पहल।',
    descriptionEn: 'Essential household utility support and dignified social assistance for marriage ceremonies of daughters from economically strained families.',
    featuresHi: [
      'घरेलू आवश्यक वस्तुएँ (बर्तन सेट, बिस्तर, सिलाई मशीन आदि) का सम्मानपूर्वक उपहार',
      'सामूहिक विवाह आयोजनों में समन्वय एवं निःशुल्क व्यवस्था सहायता',
      'सरकारी कल्याणकारी योजनाओं (जैसे मुख्यमंत्री सामूहिक विवाह योजना) से जुड़ाव'
    ],
    featuresEn: [
      'Dignified household assistance kits (kitchen utility sets, sewing machine, bedding)',
      'Facilitation and coordination support in community weddings',
      'Assistance in linking with government welfare schemes'
    ],
    ruleNoticeHi: 'स्पष्ट नियम: यह सहायता पूर्णतः पात्रता, भौतिक सत्यापन एवं सोसाइटी की समिति की स्वीकृति प्रक्रिया के अधीन है। यह कोई स्वचालित नकद अधिकार नहीं है।',
    ruleNoticeEn: 'Strict Rule: Aid is strictly subject to eligibility, physical committee verification, and official trust resolution. This is not an automatic cash entitlement.',
    eligibilityHi: 'अति निर्धन परिवार जिनकी वार्षिक आय निर्धारित सीमा से कम हो और जिन्होंने विवाह से कम से कम ३० दिन पूर्व आवेदन किया हो।'
  }
];

export const faqList: FaqItem[] = [
  {
    id: 'faq1',
    questionHi: '१. दान देने हेतु क्या खाता (अकाउंट) बनाना आवश्यक है?',
    questionEn: '1. Is it mandatory to create an account to donate?',
    answerHi: 'नहीं, खाता बनाना अनिवार्य नहीं है। यदि आप केवल एक बार सहयोग दे रहे हैं, तो सीधे QR कोड पर भुगतान कर कार्यकर्ता को अपना नाम-पता लिखवा सकते हैं। यदि आप नियमित दानदाता के रूप में हर सहयोग की रसीद ऑनलाइन देखना चाहते हैं, तो केवल मोबाइल नंबर से मुफ्त लॉगिन कर सकते हैं।',
    answerEn: 'No, creating an account is not required. You can directly pay via official bank QR code or hand cash to our field coordinator. If you wish to track your receipts anytime, simply log in using your registered mobile number.'
  },
  {
    id: 'faq2',
    questionHi: '२. दान के बाद आधिकारिक रसीद कैसे और कब मिलेगी?',
    questionEn: '2. How and when will I receive the official verified receipt?',
    answerHi: 'जब आप वेबसाइट पर अपने भुगतान का UTR या लेनदेन नंबर दर्ज करते हैं, तो संस्था का कोषाध्यक्ष बैंक खाते से मिलान करता है (साधारणतः २४ से ४८ घंटे)। सत्यापन पूरा होते ही आपके फोन पर संदेश आएगा और आप \'दानदाता पोर्टल\' से पक्की पीडीएफ रसीद डाउनलोड कर सकेंगे।',
    answerEn: 'Once you submit your 12-digit UTR/UPI number or paper slip details, the society accounting team reconciles it with the bank statement (usually 24-48 hours). Once confirmed, you will receive an SMS and can download the official 80G receipt from the Donor tab.'
  },
  {
    id: 'faq3',
    questionHi: '३. अगर किसी कार्यकर्ता को नकद दिया हो तो पुष्टि कैसे करें?',
    questionEn: '3. If I gave cash to a field volunteer, how do I verify authenticity?',
    answerHi: 'हर अधिकृत कार्यकर्ता के पास संस्था की मुद्रित रसीद बुक (Slips) होती है। नकद देते ही कार्यकर्ता से मुहर लगी रसीद संख्या अवश्य लें। आप उस रसीद संख्या को वेबसाइट पर डालकर कभी भी वैधता जाँच सकते हैं।',
    answerEn: 'Every authorized field volunteer carries an official printed Society receipt book with a round seal. Always insist on receiving a stamped numbered slip. You can enter that voucher number on this portal to authenticate it immediately.'
  },
  {
    id: 'faq4',
    questionHi: '४. बेटी विवाह सहयोग के लिए आवेदन कैसे किया जाता है?',
    questionEn: '4. How do families apply for Beti Vivah assistance?',
    answerHi: 'विवाह से कम से कम ३० दिन पूर्व स्थानीय ग्राम प्रतिनिधि या सोसाइटी के कार्यालय में आवेदन पत्र देना होता है। समिति द्वारा पारिवारिक स्थिति का भौतिक सत्यापन करने के पश्चात ही सहायता स्वीकृत की जाती है।',
    answerEn: 'Applications must be submitted at least 30 days before the wedding date at our local village coordinator desk or main trust office. Assistance is approved only after thorough physical inspection and vetting by the committee.'
  }
];

export const TRUST_DETAILS = {
  name: 'डॉ. भीमराव अंबेडकर एजुकेशनल सोसाइटी',
  nameEn: 'Dr. Bhimrao Ambedkar Educational Society',
  regNo: 'UP/AMB/2023/TRUST/1089',
  pan: 'AABTD8849K',
  section80G: '80G(5)(vi) Reg. No. CIT(EXEMP)/LKO/80G/2023-24',
  bankName: 'State Bank of India (भारतीय स्टेट बैंक)',
  accountNo: '41289055412',
  ifscCode: 'SBIN0001248',
  branch: 'अकबरपुर, अम्बेडकर नगर (उ.प्र.) - 224122',
  upiId: 'ambedkarsociety@sbi',
  phone: '+91 63936 08462',
  rawPhone: '6393608462',
  helplineMobile: '+91 63936 08462',
  email: 'ambedkarsociety.amb@gmail.com',
  address: 'ग्राम व पोस्ट कटेहरी, निकट आंबेडकर प्रतिमा, जनपद अम्बेडकर नगर, उत्तर प्रदेश - 224151',
  treasurerName: 'इंजी. राम आसरे गौतम',
  presidentName: 'श्री संतोष कुमार बौद्ध'
};
