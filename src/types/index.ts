export type Language = 'hi' | 'en';

export type DonationMode = 'qr' | 'cash';

export type VerificationStatus = 'pending' | 'approved' | 'rejected';

export type UserRole = 'donor' | 'agent' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  roleTitleHi: string;
  roleTitleEn: string;
  agentCode?: string;
  badge?: string;
  location?: string;
  avatar?: string;
}

export interface DonationRecord {
  id: string;
  refNumber: string;
  donorName: string;
  donorMobile: string;
  amount: number;
  mode: DonationMode;
  purpose: string;
  purposeLabelHi: string;
  purposeLabelEn: string;
  date: string;
  time: string;
  status: VerificationStatus;
  statusTextHi: string;
  statusTextEn: string;
  utrNumber?: string;
  workerName?: string;
  workerPhone?: string;
  voucherNumber?: string;
  location?: string;
  receiptDownloadAvailable: boolean;
  officialReceiptNo?: string;
  remarks?: string;
  proofUrl?: string;
  approvedBy?: string;
  approvedAt?: string;
}

export interface ProgramItem {
  id: string;
  number: string;
  titleHi: string;
  titleEn: string;
  subtitleHi: string;
  subtitleEn: string;
  statusBadgeHi: string;
  statusBadgeEn: string;
  badgeType: 'active' | 'open' | 'review';
  icon: string;
  descriptionHi: string;
  descriptionEn: string;
  featuresHi: string[];
  featuresEn: string[];
  eligibilityHi?: string;
  eligibilityEn?: string;
  ruleNoticeHi?: string;
  ruleNoticeEn?: string;
}

export interface FaqItem {
  id: string;
  questionHi: string;
  questionEn: string;
  answerHi: string;
  answerEn: string;
}
