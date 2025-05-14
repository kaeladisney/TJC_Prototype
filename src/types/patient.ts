export type StatusBadgeType = 'New' | 'Special' | 'Forms' | 'Pay' | 'Notes';

export interface StatusBadge {
  type: StatusBadgeType;
  label: string;
}

export interface PatientDetails {
  dcPreference: string;
  planType: string;
  cycleDate: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  homeClinic?: string;
  visitsLeft?: string;
  careCards?: number;
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
}

export type SectionType = 'checkedIn' | 'withDoctor' | 'completed';

export interface Section {
  type: SectionType;
  title: string;
  notificationCount: number;
  patients: Patient[];
} 