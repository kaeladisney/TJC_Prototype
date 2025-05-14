import { Patient, Section, StatusBadgeType } from './types/patient';
import { Appointment } from './types/appointment';
import { Doctor } from './types/doctor';
import { LinkedUser, Task } from './types/task';

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Christopher Anderson',
    initials: 'CA',
    statusBadges: [
      { type: 'New', label: 'New' },
      { type: 'Forms', label: 'Forms' }
    ],
    details: {
      dcPreference: 'Dr. Sarah Miller, D.C.',
      planType: 'Initial Visit',
      cycleDate: '2/15/2024',
      visitsLeft: '10',
      homeClinic: 'Downtown'
    }
  },
  {
    id: '2',
    name: 'Christina Martinez',
    initials: 'CM',
    statusBadges: [
      { type: 'Special', label: 'Special' },
      { type: 'Pay', label: 'Pay' }
    ],
    details: {
      dcPreference: 'Dr. James Wilson, D.C.',
      planType: '10 Visits',
      cycleDate: '2/20/2024',
      visitsLeft: '8',
      homeClinic: 'Eastside'
    }
  },
  {
    id: '7',
    name: 'Charles Thompson',
    initials: 'CT',
    statusBadges: [
      { type: 'Forms', label: 'Forms' },
      { type: 'Notes', label: 'Notes' }
    ],
    details: {
      dcPreference: 'Dr. Will Murillo, D.C.',
      planType: '6 Visits',
      cycleDate: '2/25/2024',
      visitsLeft: '4',
      homeClinic: 'Westside'
    }
  },
  {
    id: '8',
    name: 'Christine Wilson',
    initials: 'CW',
    statusBadges: [
      { type: 'Special', label: 'Special' },
      { type: 'Forms', label: 'Forms' },
      { type: 'Notes', label: 'Notes' }
    ],
    details: {
      dcPreference: 'Dr. Sarah Miller, D.C.',
      planType: 'Wellness Plan',
      cycleDate: '3/1/2024',
      visitsLeft: '12',
      homeClinic: 'Downtown'
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

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    time: '9:30 AM',
    patient: {
      name: 'Thomas Newman',
      initials: 'TN',
      avatarColor: '#024C6F',
      statuses: [
        {
          type: 'New',
          color: '#008D3E',
          bgColor: '#E2FFE9',
        },
        {
          type: 'Special',
          color: '#6941C6',
          bgColor: '#F4F3FF',
        },
      ],
      phone: '(555) 123-4567',
      leadSource: 'Facebook',
    },
  },
  {
    id: '2',
    time: '10:15 AM',
    patient: {
      name: 'Sarah Johnson',
      initials: 'SJ',
      avatarColor: '#024C6F',
      statuses: [
        {
          type: 'Forms',
          color: '#026AA2',
          bgColor: '#E0F2FE',
        },
        {
          type: 'Pay',
          color: '#B54708',
          bgColor: '#FEF6EE',
        },
      ],
      phone: '(555) 987-6543',
      leadSource: 'Google',
    },
  },
  {
    id: '3',
    time: '11:00 AM',
    patient: {
      name: 'Michael Chang',
      initials: 'MC',
      avatarColor: '#024C6F',
      statuses: [
        {
          type: 'Special',
          color: '#6941C6',
          bgColor: '#F4F3FF',
        },
        {
          type: 'Notes',
          color: '#175CD3',
          bgColor: '#EEF4FF',
        },
      ],
      phone: '(555) 456-7890',
      leadSource: 'LinkedIn',
    },
  },
];

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Williams',
    initials: 'SW',
    avatarColor: '#024C6F',
    currentPatient: {
      name: 'Thomas Newman',
    },
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    initials: 'MC',
    avatarColor: '#024C6F',
    currentPatient: {
      name: 'Sarah Johnson',
    },
  },
];

export const mockUsers: LinkedUser[] = [
  {
    id: '1',
    name: 'Sarah Adams',
    initials: 'SA',
    avatarColor: '#024C6F'
  },
  {
    id: '2',
    name: 'John Henry',
    initials: 'JH',
    avatarColor: '#024C6F'
  },
  {
    id: '3',
    name: 'Parker Thomas',
    initials: 'PT',
    avatarColor: '#024C6F'
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    description: 'Follow up on incomplete intake forms',
    isCompleted: true,
    dueDate: new Date(),
    assignedUser: mockUsers[0]
  },
  {
    id: '2',
    description: 'Schedule follow-up appointment',
    isCompleted: false,
    dueDate: new Date(),
  },
  {
    id: '3',
    description: 'Review patient feedback forms',
    isCompleted: true,
    dueDate: new Date(),
  },
  {
    id: '4',
    description: 'Remind to come in to pay cash for plan',
    isCompleted: false,
    dueDate: new Date(Date.now() + 86400000),
    assignedUser: mockUsers[1]
  },
  {
    id: '5',
    description: 'Send insurance verification forms',
    isCompleted: false,
    dueDate: new Date(Date.now() + 86400000),
  },
  {
    id: '6',
    description: 'Log all outgoing calls and notes in AXIS',
    isCompleted: false,
    dueDate: new Date(Date.now() + 86400000),
    assignedUser: mockUsers[2]
  }
];

export const statusOptions: Array<{
  type: StatusBadgeType;
  color: string;
  bgColor: string;
  label: string;
}> = [
  {
    type: 'Special',
    color: '#6941C6',
    bgColor: '#F4F3FF',
    label: 'Special Care'
  },
  {
    type: 'Forms',
    color: '#026AA2',
    bgColor: '#E0F2FE',
    label: 'Forms'
  },
  {
    type: 'Pay',
    color: '#B54708',
    bgColor: '#FEF6EE',
    label: 'Payment Required'
  },
  {
    type: 'Notes',
    color: '#175CD3',
    bgColor: '#EEF4FF',
    label: 'Notes'
  },
  {
    type: 'New',
    color: '#008D3E',
    bgColor: '#E2FFE9',
    label: 'New Patient'
  }
]; 