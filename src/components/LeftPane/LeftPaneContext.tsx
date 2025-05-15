import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Patient, StatusBadgeType } from '../../types/patient';
import { mockPatients } from '../../mockData';

interface LeftPaneContextType {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  patients: Patient[];
  addPatientToQueue: (patient: Patient) => void;
  reorderPatients: (fromIndex: number, toIndex: number) => void;
  removePatient: (index: number) => void;
  selectedPatient: Patient | null;
  isDetailsDrawerOpen: boolean;
  openDetailsDrawer: (patient: Patient) => void;
  closeDetailsDrawer: () => void;
}

const LeftPaneContext = createContext<LeftPaneContextType | undefined>(undefined);

export const useLeftPaneContext = () => {
  const context = useContext(LeftPaneContext);
  if (context === undefined) {
    throw new Error('useLeftPaneContext must be used within a LeftPaneProvider');
  }
  return context;
};

interface LeftPaneProviderProps {
  children: ReactNode;
}

export const LeftPaneProvider: React.FC<LeftPaneProviderProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([
    // Checked In Patients
    {
      id: '1',
      name: 'Christopher Anderson',
      initials: 'CA',
      statusBadges: [
        { type: 'New', label: 'New Patient' },
        { type: 'Forms', label: 'Forms Pending' }
      ],
      details: {
        dcPreference: undefined,
        planType: 'Initial Visit',
        cycleDate: '2/15/2024',
        dateOfBirth: '05/15/1985',
        phoneNumber: '(555) 123-4567',
        homeClinic: 'Downtown Clinic',
        visitsLeft: '10',
        careCards: 2,
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
      statusBadges: [
        { type: 'Pay', label: 'Payment Required' },
        { type: 'Forms', label: 'Forms Required' }
      ],
      details: {
        dcPreference: undefined,
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
    // With Doctor Patients
    {
      id: '3',
      name: 'Michael Chang',
      initials: 'MC',
      statusBadges: [
        { type: 'Forms', label: 'Forms Pending' },
        { type: 'Pay', label: 'Payment Required' }
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
      statusBadges: [
        { type: 'New', label: 'New Patient' },
        { type: 'Pay', label: 'Payment Required' },
        { type: 'Forms', label: 'Forms Pending' }
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
    // Completed Patients
    {
      id: '5',
      name: 'Robert Martinez',
      initials: 'RM',
      statusBadges: [
        { type: 'Forms', label: 'Forms Complete' },
        { type: 'Pay', label: 'Payment Required' }
      ],
      details: {
        dcPreference: 'Dr. Sarah Miller, D.C.',
        planType: '6 Visits',
        cycleDate: '1/22/2024',
        section: 'completed',
        completed: true
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
      statusBadges: [
        { type: 'New', label: 'New Patient' },
        { type: 'Forms', label: 'Forms Pending' }
      ],
      details: {
        dcPreference: 'Dr. Will Murillo, D.C.',
        planType: 'Initial Visit',
        cycleDate: '1/23/2024',
        section: 'completed',
        completed: true
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
    }
  ]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const addPatientToQueue = (patient: Patient) => {
    setPatients(prevPatients => {
      // Set the new patient's section to 'checkedIn'
      const newPatient: Patient = {
        ...patient,
        details: {
          ...patient.details,
          section: 'checkedIn' as const,
          dcPreference: undefined,
          completed: false
        }
      };
      
      // Add the new patient at the beginning of the array
      return [newPatient, ...prevPatients];
    });
  };

  const reorderPatients = (fromIndex: number, toIndex: number) => {
    setPatients(prevPatients => {
      const result = Array.from(prevPatients);
      const [removed] = result.splice(fromIndex, 1);
      result.splice(toIndex, 0, removed);
      return result;
    });
  };

  const removePatient = (index: number) => {
    setPatients(prevPatients => prevPatients.filter((_, i) => i !== index));
  };

  const openDetailsDrawer = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDetailsDrawerOpen(true);
  };

  const closeDetailsDrawer = () => {
    setIsDetailsDrawerOpen(false);
    setSelectedPatient(null);
  };

  return (
    <LeftPaneContext.Provider
      value={{
        isCollapsed,
        toggleCollapse,
        patients,
        addPatientToQueue,
        reorderPatients,
        removePatient,
        selectedPatient,
        isDetailsDrawerOpen,
        openDetailsDrawer,
        closeDetailsDrawer,
      }}
    >
      {children}
    </LeftPaneContext.Provider>
  );
}; 