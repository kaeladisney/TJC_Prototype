export type StatusBadgeType = 'New' | 'Forms' | 'Pay' | 'Exam' | 'Military';

export interface StatusBadge {
  type: StatusBadgeType;
  label: string;
}

export type SectionType = 'checkedIn' | 'withDoctor' | 'completed';

export interface PatientDetails {
  dcPreference?: string;
  planType: string;
  cycleDate: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  homeClinic?: string;
  visitsLeft?: string;
  careCards?: number;
  section?: SectionType;
  completed?: boolean;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface PersonalInfo {
  dateOfBirth: string;
  sex: string;
  email: string;
  phone: string;
  address: Address;
}

export interface PlanInfo {
  productType: string;
  planStatus: string;
  cycleDate: string;
  arbMonthlyAmount: number;
  nextPaymentDate: string;
  visitBalance: number;
  totalVisits: number;
}

export interface Patient {
  id: string;
  name: string;
  initials: string;
  statusBadges: Array<{
    type: StatusBadgeType;
    label: string;
  }>;
  details: PatientDetails;
  personalInfo: PersonalInfo;
  planInfo: PlanInfo;
}

export interface Section {
  type: SectionType;
  title: string;
  notificationCount: number;
  patients: Patient[];
} 