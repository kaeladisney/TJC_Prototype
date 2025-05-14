export interface Doctor {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  currentPatient?: {
    name: string;
  };
} 