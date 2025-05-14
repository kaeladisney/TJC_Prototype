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
    {
      id: '1',
      name: 'Christopher Anderson',
      initials: 'CA',
      statusBadges: [
        { type: 'New', label: 'New Patient' },
        { type: 'Forms', label: 'Forms Pending' }
      ],
      details: {
        dcPreference: 'Dr. Sarah Miller, D.C.',
        planType: 'Initial Visit',
        cycleDate: '2/15/2024',
        dateOfBirth: '05/15/1985',
        phoneNumber: '(555) 123-4567',
        homeClinic: 'Downtown Clinic',
        visitsLeft: '10',
        careCards: 2
      }
    },
    {
      id: '2',
      name: 'Christina Martinez',
      initials: 'CM',
      statusBadges: [
        { type: 'Special', label: 'Special Care' },
        { type: 'Pay', label: 'Payment Required' },
        { type: 'Notes', label: 'Notes Available' }
      ],
      details: {
        dcPreference: 'Dr. James Wilson, D.C.',
        planType: '10 Visits',
        cycleDate: '2/20/2024',
        dateOfBirth: '08/23/1990',
        phoneNumber: '(555) 987-6543',
        homeClinic: 'Eastside Clinic',
        visitsLeft: '8',
        careCards: 1
      }
    }
  ]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const addPatientToQueue = (patient: Patient) => {
    setPatients(prevPatients => [patient, ...prevPatients]);
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

  const [patientsWithDoctor, setPatientsWithDoctor] = useState<Patient[]>([
    {
      id: '3',
      name: 'Michael Chang',
      initials: 'MC',
      statusBadges: [
        { type: 'Special', label: 'Special Care' },
        { type: 'Forms', label: 'Forms Pending' },
        { type: 'Notes', label: 'Notes Available' }
      ],
      details: {
        dcPreference: 'Dr. Sarah Miller, D.C.',
        planType: '10 Visits',
        cycleDate: '1/20/2024',
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
      }
    }
  ]);

  const [completedPatients, setCompletedPatients] = useState<Patient[]>([
    {
      id: '5',
      name: 'Robert Martinez',
      initials: 'RM',
      statusBadges: [
        { type: 'Forms', label: 'Forms Complete' },
        { type: 'Special', label: 'Special Care' },
        { type: 'Notes', label: 'Notes Available' }
      ],
      details: {
        dcPreference: 'Dr. Sarah Miller, D.C.',
        planType: '6 Visits',
        cycleDate: '1/22/2024',
      }
    },
    {
      id: '6',
      name: 'Lisa Thompson',
      initials: 'LT',
      statusBadges: [
        { type: 'New', label: 'New Patient' },
        { type: 'Forms', label: 'Forms Pending' },
        { type: 'Pay', label: 'Payment Required' }
      ],
      details: {
        dcPreference: 'Dr. Will Murillo, D.C.',
        planType: 'Initial Visit',
        cycleDate: '1/23/2024',
      }
    }
  ]);

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