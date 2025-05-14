import React, { createContext, useContext, useState } from 'react';

type TabType = 'home' | 'tasks' | 'leads' | 'messages' | 'calendar' | 'patients' | 'reports';

interface NavigationContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
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

  return (
    <NavigationContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </NavigationContext.Provider>
  );
}; 