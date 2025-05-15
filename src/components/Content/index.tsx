import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { useLeftPaneContext } from '../LeftPane/LeftPaneContext';
import { useNavigation } from '../../context/NavigationContext';
import Home from '../Home';
import Patients from '../Patients';
import PatientDetails from '../Patients/PatientDetails';

const ContentWrapper = styled(Box)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#FFFFFF',
});

const TabsWrapper = styled(Box)({
  backgroundColor: '#FFFFFF',
  borderBottom: '1px solid #E5E7EB',
  flex: 'none',
});

const ContentArea = styled(Box)({
  flex: 1,
  overflowY: 'auto',
});

const NavigationBar = styled(Box)({
  width: '100%',
  height: 76,
  borderBottom: '1px solid #E2E2E6',
  padding: '16px 24px',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  position: 'sticky',
  top: 0,
  zIndex: 1,
});

const ScrollableContent = styled(Box)({
  flexGrow: 1,
  overflowY: 'auto',
  height: 'calc(100vh - 152px)', // Subtract both headers
});

const NavItem = styled(Box)<{ active?: boolean }>(({ active }) => ({
  height: 44,
  padding: '10px 29px',
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  borderRadius: active ? 8 : 0,
  backgroundColor: active ? '#F6F6FA' : 'transparent',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#F6F6FA',
  },
}));

const NavText = styled(Typography)<{ active?: boolean }>(({ active }) => ({
  color: active ? '#004C6F' : '#282829',
  fontSize: 14,
  fontWeight: active ? 600 : 400,
}));

const NotificationBadge = styled(Box)({
  backgroundColor: '#F70014',
  color: '#FFFFFF',
  borderRadius: 100,
  padding: '3px 5px',
  fontSize: 12,
  lineHeight: '12px',
  border: '1px solid #FFFFFF',
  minWidth: 18,
  height: 18,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

interface NavItemData {
  id: string;
  label: string;
  notifications?: number;
}

const navItems: NavItemData[] = [
  { id: 'home', label: 'Home' },
  { id: 'tasks', label: 'Tasks' },
  { id: 'leads', label: 'Leads', notifications: 24 },
  { id: 'messages', label: 'Messages', notifications: 5 },
  { id: 'calendar', label: 'Calendar' },
  { id: 'patients', label: 'Patients' },
  { id: 'reports', label: 'Reports' },
];

const Content: React.FC = () => {
  const { isCollapsed } = useLeftPaneContext();
  const { activeTab, setActiveTab } = useNavigation();

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'patients':
        return <Patients />;
      case 'patient-details':
        return <PatientDetails />;
      default:
        return (
          <Box sx={{ p: 4 }}>
            <Typography variant="h5">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Page
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              This page is under construction.
            </Typography>
          </Box>
        );
    }
  };

  return (
    <ContentWrapper>
      <TabsWrapper>
        {/* Your tabs component here */}
      </TabsWrapper>
      <ContentArea>
        <NavigationBar>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {navItems.map((item) => (
              <NavItem
                key={item.id}
                active={activeTab === item.id}
                onClick={() => setActiveTab(item.id as any)}
              >
                <NavText active={activeTab === item.id}>{item.label}</NavText>
                {item.notifications && (
                  <NotificationBadge>{item.notifications}</NotificationBadge>
                )}
              </NavItem>
            ))}
          </Box>
        </NavigationBar>
        <ScrollableContent>
          {renderContent()}
        </ScrollableContent>
      </ContentArea>
    </ContentWrapper>
  );
};

export default Content; 