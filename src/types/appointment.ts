import { StatusBadgeType } from './patient';

export interface AppointmentStatus {
  type: StatusBadgeType;
  color: string;
  bgColor: string;
}

export interface AppointmentPatient {
  name: string;
  initials: string;
  avatarColor: string;
  statuses: AppointmentStatus[];
  phone: string;
  leadSource: string;
}

export interface Appointment {
  id: string;
  time: string;
  patient: AppointmentPatient;
} 