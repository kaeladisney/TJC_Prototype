import { Patient, Section } from './types/patient';

export const mockPatients: Patient[] = [
  {
    id: '1',
    initials: 'JD',
    name: 'John Doe',
    statusBadges: [
      { type: 'New', label: 'New Patient' },
      { type: 'Forms', label: 'Forms Pending' },
      { type: 'Special', label: 'Special Care' }
    ],
    details: {
      dcPreference: 'Dr. Smith',
      planType: 'Premium Care Plus',
      cycleDate: '2024-03-15'
    }
  },
  {
    id: '2',
    initials: 'AS',
    name: 'Alice Smith',
    statusBadges: [
      { type: 'Urgent', label: 'Urgent Care' },
      { type: 'Forms', label: 'Forms Complete' }
    ],
    details: {
      dcPreference: 'Dr. Johnson',
      planType: 'Standard Care',
      cycleDate: '2024-03-20'
    }
  },
  {
    id: '3',
    initials: 'RB',
    name: 'Robert Brown',
    statusBadges: [
      { type: 'Special', label: 'Special Diet' },
      { type: 'New', label: 'New Treatment' },
      { type: 'Forms', label: 'Forms Review' },
      { type: 'Urgent', label: 'Priority Care' }
    ],
    details: {
      dcPreference: 'Dr. Williams',
      planType: 'Premium Care',
      cycleDate: '2024-03-18'
    }
  }
];

export const mockSections: Section[] = [
  {
    type: 'checkedIn',
    title: 'Checked In',
    notificationCount: 2,
    patients: [mockPatients[0], mockPatients[1]]
  },
  {
    type: 'withDoctor',
    title: 'With Doctor',
    notificationCount: 1,
    patients: [mockPatients[2]]
  },
  {
    type: 'completed',
    title: 'Completed',
    notificationCount: 0,
    patients: []
  }
]; 