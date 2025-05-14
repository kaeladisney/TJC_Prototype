import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LeftPaneContextType {
  isCollapsed: boolean;
  toggleCollapse: () => void;
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

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <LeftPaneContext.Provider value={{ isCollapsed, toggleCollapse }}>
      {children}
    </LeftPaneContext.Provider>
  );
}; 