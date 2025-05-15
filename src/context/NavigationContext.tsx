import React, { createContext, useContext, useState } from 'react';

type TabType = 'home' | 'tasks' | 'leads' | 'messages' | 'calendar' | 'patients' | 'reports' | 'patient-details';

interface NavigationContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  selectedPatientId: string | null;
  setSelectedPatientId: (id: string | null) => void;
  navigateToPatients: () => void;
  navigateToPatientDetails: (patientId: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

interface NavigationProviderProps {
  children: React.ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

  const navigateToPatients = () => {
    setActiveTab('patients');
    setSelectedPatientId(null);
  };

  const navigateToPatientDetails = (patientId: string) => {
    setSelectedPatientId(patientId);
    setActiveTab('patient-details');
  };

  return (
    <NavigationContext.Provider value={{ 
      activeTab, 
      setActiveTab,
      selectedPatientId,
      setSelectedPatientId,
      navigateToPatients,
      navigateToPatientDetails
    }}>
      {children}
    </NavigationContext.Provider>
  );
}; 