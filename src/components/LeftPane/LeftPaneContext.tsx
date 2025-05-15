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
  const [patients, setPatients] = useState<Patient[]>(mockPatients);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const addPatientToQueue = (patient: Patient) => {
    setPatients(prevPatients => {
      // Find the original patient data from mockData to ensure we have the correct status badges
      const originalPatient = mockPatients.find(p => p.id === patient.id);
      
      // If we found the original patient, use their data, otherwise use the provided patient data
      const newPatient: Patient = {
        ...(originalPatient || patient),
        details: {
          ...(originalPatient?.details || patient.details),
          section: 'checkedIn' // Always set to checkedIn when manually adding to queue
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
    // First check if the patient is in the current queue
    const queuePatient = patients.find(p => p.id === patient.id);
    // If not in queue, use the original data from mockData
    const originalPatient = mockPatients.find(p => p.id === patient.id);
    setSelectedPatient(queuePatient || originalPatient || patient);
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