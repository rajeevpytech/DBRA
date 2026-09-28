import { AuthUser } from '../types';

export const DEMO_USERS: Record<string, AuthUser> = {
  // User's requested phone number
  '6393608462': {
    id: 'user_donor_primary',
    phone: '6393608462',
    name: 'राजीव कुमार (Rajeev Kumar)',
    role: 'donor',
    roleTitleHi: 'पंजीकृत दानदाता (Donor)',
    roleTitleEn: 'Registered Donor',
    badge: 'सोसाइटी आजीवन सहयोगी',
    location: 'अकबरपुर, अम्बेडकर नगर',
  },
  // 1. Donor User
  '9876543210': {
    id: 'user_donor_1',
    phone: '9876543210',
    name: 'अविनाश कुमार बौद्ध (Avinash Kumar)',
    role: 'donor',
    roleTitleHi: 'पंजीकृत दानदाता (Donor)',
    roleTitleEn: 'Registered Donor',
    badge: 'नियमित सामाजिक सहयोगी',
    location: 'अकबरपुर, अम्बेडकर नगर',
  },
  // 2. Field Agent User
  '9876543211': {
    id: 'user_agent_1',
    phone: '9876543211',
    name: 'राम सजीवन (Ram Sajivan)',
    role: 'agent',
    roleTitleHi: 'अधिकृत ग्राम कार्यकर्ता (Field Agent)',
    roleTitleEn: 'Authorized Field Agent',
    agentCode: 'AN-042',
    badge: 'अधिकृत फील्ड कार्यकर्ता',
    location: 'कटेहरी / कटेहरी देहात क्षेत्र',
  },
  // 3. Admin / Treasurer User
  '9876543212': {
    id: 'user_admin_1',
    phone: '9876543212',
    name: 'इंजी. राम आसरे गौतम (Ram Aasre Gautam)',
    role: 'admin',
    roleTitleHi: 'सोसाइटी कोषाध्यक्ष / एडमिन (Admin)',
    roleTitleEn: 'Society Treasurer / Admin',
    badge: 'सोसाइटी प्रबंधन मंडल',
    location: 'केंद्रीय कार्यालय, अम्बेडकर नगर',
  },
};

export const QUICK_DEMO_ACCOUNTS = [
  {
    role: 'donor' as const,
    phone: '6393608462',
    titleHi: '१. मुख्य दानदाता लॉगिन (+91 63936 08462)',
    titleEn: '1. Primary Donor Login (+91 63936 08462)',
    subtitleHi: 'राजीव कुमार • अपने सहयोग की स्थिति, रसीदें और इतिहास देखें',
    subtitleEn: 'Rajeev Kumar • View contribution status & download 80G receipts',
    icon: 'volunteer_activism',
    tagHi: 'दानदाता',
    tagColor: 'bg-[#d5e3fc] text-[#00142f]',
  },
  {
    role: 'agent' as const,
    phone: '9876543211',
    titleHi: '२. एजेंट / कार्यकर्ता लॉगिन (Field Agent)',
    titleEn: '2. Field Agent Login',
    subtitleHi: 'राम सजीवन (कोड: AN-042) • गाँव में नकद संग्रह व वाउचर प्रविष्टि दर्ज करें',
    subtitleEn: 'Ram Sajivan (Code: AN-042) • Record field cash collections & issue vouchers',
    icon: 'badge',
    tagHi: 'फील्ड एजेंट',
    tagColor: 'bg-[#ffdbca] text-[#9b4500]',
  },
  {
    role: 'admin' as const,
    phone: '9876543212',
    titleHi: '३. एडमिन / ट्रस्टी लॉगिन (Trust Admin)',
    titleEn: '3. Trust Admin / Treasurer Login',
    subtitleHi: 'इंजी. राम आसरे गौतम • बैंक मिलान, एक-क्लिक अप्रूवल व रसीद जारी करें',
    subtitleEn: 'Ram Aasre Gautam • Verify bank credits, 1-click approvals & issue receipts',
    icon: 'admin_panel_settings',
    tagHi: 'सोसाइटी एडमिन',
    tagColor: 'bg-[#dce1ff] text-[#00103e]',
  },
];
