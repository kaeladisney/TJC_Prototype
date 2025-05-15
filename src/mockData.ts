import { Patient, Section, StatusBadgeType } from './types/patient';
import { Appointment } from './types/appointment';
import { Doctor } from './types/doctor';
import { LinkedUser, Task } from './types/task';
import { STATUS_COLORS } from './constants/statusColors';

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Christopher Anderson',
    initials: 'CA',
    phone: '5551234567',
    statusBadges: [
      { type: 'New', label: 'New' }
    ],
    details: {
      planType: 'Initial Visit',
      cycleDate: '2/15/2024',
      visitsLeft: '10',
      homeClinic: 'Downtown',
      section: 'checkedIn'
    },
    personalInfo: {
      dateOfBirth: '1985-05-15',
      sex: 'Male',
      email: 'christopher.anderson@email.com',
      phone: '(555) 123-4567',
      address: {
        street: '123 Main Street',
        city: 'Gotham',
        state: 'NY',
        zipCode: '10001'
      }
    },
    planInfo: {
      productType: 'Initial Consultation',
      planStatus: 'Pending',
      cycleDate: '2024-02-15',
      arbMonthlyAmount: 99.99,
      nextPaymentDate: '2024-03-15',
      visitBalance: 1,
      totalVisits: 1
    }
  },
  {
    id: '2',
    name: 'Christina Martinez',
    initials: 'CM',
    phone: '5559876543',
    statusBadges: [
      { type: 'Pay', label: 'Pay' }
    ],
    details: {
      dcPreference: 'Dr. James Wilson, D.C.',
      planType: '10 Visits',
      cycleDate: '2/20/2024',
      visitsLeft: '8',
      homeClinic: 'Eastside',
      section: 'checkedIn'
    },
    personalInfo: {
      dateOfBirth: '1990-08-23',
      sex: 'Female',
      email: 'christina.martinez@email.com',
      phone: '(555) 987-6543',
      address: {
        street: '456 Elm Street',
        city: 'Gotham',
        state: 'NY',
        zipCode: '10002'
      }
    },
    planInfo: {
      productType: 'Premium Care Package',
      planStatus: 'Payment Required',
      cycleDate: '2024-02-20',
      arbMonthlyAmount: 199.99,
      nextPaymentDate: '2024-03-20',
      visitBalance: 8,
      totalVisits: 10
    }
  },
  {
    id: '3',
    name: 'Michael Chang',
    initials: 'MC',
    phone: '5552345678',
    statusBadges: [
      { type: 'Pay', label: 'Payment Required' },
      { type: 'Exam', label: 'Exam Required' }
    ],
    details: {
      dcPreference: 'Dr. Sarah Miller, D.C.',
      planType: '10 Visits',
      cycleDate: '1/20/2024',
      section: 'withDoctor'
    },
    personalInfo: {
      dateOfBirth: '1985-07-15',
      sex: 'Male',
      email: 'michael.chang@email.com',
      phone: '(555) 123-4567',
      address: {
        street: '789 Oak Avenue',
        city: 'Gotham',
        state: 'NY',
        zipCode: '10001'
      }
    },
    planInfo: {
      productType: 'Premium Care Package',
      planStatus: 'Active',
      cycleDate: '2024-01-20',
      arbMonthlyAmount: 199.99,
      nextPaymentDate: '2024-02-20',
      visitBalance: 8,
      totalVisits: 10
    }
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    initials: 'ER',
    phone: '5553456789',
    statusBadges: [
      { type: 'New', label: 'New Patient' },
      { type: 'Pay', label: 'Payment Required' },
      { type: 'Exam', label: 'Exam Required' }
    ],
    details: {
      dcPreference: 'Dr. James Wilson, D.C.',
      planType: '6 Visits',
      cycleDate: '1/25/2024',
      section: 'withDoctor'
    },
    personalInfo: {
      dateOfBirth: '1992-03-28',
      sex: 'Female',
      email: 'emily.rodriguez@email.com',
      phone: '(555) 234-5678',
      address: {
        street: '456 Pine Street',
        city: 'Gotham',
        state: 'NY',
        zipCode: '10002'
      }
    },
    planInfo: {
      productType: 'Standard Care Package',
      planStatus: 'Payment Required',
      cycleDate: '2024-01-25',
      arbMonthlyAmount: 149.99,
      nextPaymentDate: '2024-02-25',
      visitBalance: 6,
      totalVisits: 6
    }
  },
  {
    id: '5',
    name: 'Robert Martinez',
    initials: 'RM',
    phone: '5554567890',
    statusBadges: [
      { type: 'Pay', label: 'Payment Required' }
    ],
    details: {
      dcPreference: 'Dr. Sarah Miller, D.C.',
      planType: '6 Visits',
      cycleDate: '1/22/2024',
      section: 'completed'
    },
    personalInfo: {
      dateOfBirth: '1978-11-03',
      sex: 'Male',
      email: 'robert.martinez@email.com',
      phone: '(555) 345-6789',
      address: {
        street: '321 Maple Drive',
        city: 'Gotham',
        state: 'NY',
        zipCode: '10003'
      }
    },
    planInfo: {
      productType: 'Standard Care Package',
      planStatus: 'Active',
      cycleDate: '2024-01-22',
      arbMonthlyAmount: 149.99,
      nextPaymentDate: '2024-02-22',
      visitBalance: 4,
      totalVisits: 6
    }
  },
  {
    id: '6',
    name: 'Lisa Thompson',
    initials: 'LT',
    phone: '5555678901',
    statusBadges: [
      { type: 'New', label: 'New Patient' }
    ],
    details: {
      dcPreference: 'Dr. Will Murillo, D.C.',
      planType: 'Initial Visit',
      cycleDate: '1/23/2024',
      section: 'completed'
    },
    personalInfo: {
      dateOfBirth: '1990-05-17',
      sex: 'Female',
      email: 'lisa.thompson@email.com',
      phone: '(555) 456-7890',
      address: {
        street: '654 Birch Lane',
        city: 'Gotham',
        state: 'NY',
        zipCode: '10004'
      }
    },
    planInfo: {
      productType: 'Initial Consultation',
      planStatus: 'Pending',
      cycleDate: '2024-01-23',
      arbMonthlyAmount: 99.99,
      nextPaymentDate: '2024-02-23',
      visitBalance: 1,
      totalVisits: 1
    }
  },
  {
    id: '7',
    name: 'Charles Thompson',
    initials: 'CT',
    statusBadges: [
      { type: 'Forms', label: 'Forms' },
      { type: 'Pay', label: 'Payment Required' }
    ],
    details: {
      dcPreference: 'Dr. Will Murillo, D.C.',
      planType: '6 Visits',
      cycleDate: '2/25/2024',
      visitsLeft: '4',
      homeClinic: 'Westside'
    },
    personalInfo: {
      dateOfBirth: '1975-11-30',
      sex: 'Male',
      email: 'charles.thompson@email.com',
      phone: '(555) 345-6789',
      address: {
        street: '789 Oak Avenue',
        city: 'Gotham',
        state: 'NY',
        zipCode: '10003'
      }
    },
    planInfo: {
      productType: 'Standard Care Package',
      planStatus: 'Active',
      cycleDate: '2024-02-25',
      arbMonthlyAmount: 149.99,
      nextPaymentDate: '2024-03-25',
      visitBalance: 4,
      totalVisits: 6
    }
  },
  {
    id: '8',
    name: 'Christine Wilson',
    initials: 'CW',
    phone: '9859862787',
    statusBadges: [
      { type: 'Forms', label: 'Forms' }
    ],
    details: {
      dcPreference: 'Dr. Sarah Miller, D.C.',
      planType: 'Wellness Plan',
      cycleDate: '3/1/2024',
      visitsLeft: '12',
      homeClinic: 'Downtown'
    },
    personalInfo: {
      dateOfBirth: '1988-04-15',
      sex: 'Female',
      email: 'christine.wilson@email.com',
      phone: '(555) 567-8901',
      address: {
        street: '321 Pine Street',
        city: 'Gotham',
        state: 'NY',
        zipCode: '10004'
      }
    },
    planInfo: {
      productType: 'Wellness Package',
      planStatus: 'Active',
      cycleDate: '2024-03-01',
      arbMonthlyAmount: 249.99,
      nextPaymentDate: '2024-04-01',
      visitBalance: 12,
      totalVisits: 12
    }
  },
  {
    id: '9',
    name: 'Sarah Johnson',
    initials: 'SJ',
    phone: '5557890123',
    statusBadges: [
      { type: 'New', label: 'New' }
    ],
    details: {
      planType: 'Initial Visit',
      cycleDate: '2/15/2024',
      visitsLeft: '10',
      homeClinic: 'Downtown',
      section: 'completed'
    },
    personalInfo: {
      dateOfBirth: '1995-06-20',
      sex: 'Female',
      email: 'sarah.johnson@email.com',
      phone: '(555) 789-0123',
      address: {
        street: '987 Cedar Court',
        city: 'Gotham',
        state: 'NY',
        zipCode: '10005'
      }
    },
    planInfo: {
      productType: 'Initial Consultation',
      planStatus: 'Pending',
      cycleDate: '2024-02-15',
      arbMonthlyAmount: 99.99,
      nextPaymentDate: '2024-03-15',
      visitBalance: 1,
      totalVisits: 1
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
    notificationCount: 2,
    patients: [mockPatients[2], mockPatients[3]]
  },
  {
    type: 'completed',
    title: 'Completed',
    notificationCount: 2,
    patients: [mockPatients[4], mockPatients[5]]
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    time: '9:00 AM',
    patient: {
      name: 'John Smith',
      initials: 'JS',
      avatarColor: '#024C6F',
      statuses: [
        {
          type: 'New',
          ...STATUS_COLORS.New
        },
        {
          type: 'Forms',
          ...STATUS_COLORS.Forms
        }
      ],
      phone: '(555) 123-4567',
      leadSource: 'Website'
    }
  },
  {
    id: '2',
    time: '10:00 AM',
    patient: {
      name: 'Sarah Johnson',
      initials: 'SJ',
      avatarColor: '#024C6F',
      statuses: [
        {
          type: 'Forms',
          ...STATUS_COLORS.Forms
        },
        {
          type: 'Pay',
          ...STATUS_COLORS.Pay
        }
      ],
      phone: '(555) 987-6543',
      leadSource: 'Google'
    }
  }
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
    type: 'New',
    ...STATUS_COLORS.New,
    label: 'New Patient'
  },
  {
    type: 'Forms',
    ...STATUS_COLORS.Forms,
    label: 'Forms Required'
  },
  {
    type: 'Pay',
    ...STATUS_COLORS.Pay,
    label: 'Payment Required'
  },
  {
    type: 'Exam',
    ...STATUS_COLORS.Exam,
    label: 'Exam Required'
  },
  {
    type: 'Military',
    ...STATUS_COLORS.Military,
    label: 'Military'
  }
]; 