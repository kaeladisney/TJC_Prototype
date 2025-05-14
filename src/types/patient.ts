export type StatusBadgeType = 'New' | 'Special' | 'Forms' | 'Urgent';

export interface StatusBadge {
  type: StatusBadgeType;
  label: string;
}

export interface PatientDetails {
  dcPreference: string;
  planType: string;
  cycleDate: string;
}

export interface Patient {
  id: string;
  initials: string;
  name: string;
  statusBadges: StatusBadge[];
  details: PatientDetails;
}

export type SectionType = 'checkedIn' | 'withDoctor' | 'completed';

export interface Section {
  type: SectionType;
  title: string;
  notificationCount: number;
  patients: Patient[];
} 