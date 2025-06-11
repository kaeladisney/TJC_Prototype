import React, { useEffect } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { useLeftPaneContext } from '../LeftPane/LeftPaneContext';
import { useNavigation } from '../../context/NavigationContext';
import Home from '../Home';
import Patients from '../Patients';
import PatientDetails from '../Patients/PatientDetails';
import HomeIcon from '../icons/home.svg';
import HomeIconSolid from '../icons/home-1.svg';
import UsersIcon from '../icons/users.svg';
import UsersIconSolid from '../icons/users-1.svg';
import ClipboardIcon from '../icons/clipboard-document-check.svg';
import ClipboardIconSolid from '../icons/document-text-1.svg';
import MagnifyingGlassIcon from '../icons/magnifying-glass.svg';
import MagnifyingGlassIconSolid from '../icons/magnifying-glass-1.svg';
import ChatIcon from '../icons/chat-bubble-bottom-center-text.svg';
import ChatIconSolid from '../icons/chat-bubble-bottom-center-text-1.svg';
import DocumentIcon from '../icons/document-text.svg';
import DocumentIconSolid from '../icons/document-text-1.svg';
import CalendarIcon from '../icons/calendar.svg';
import CalendarIconSolid from '../icons/calendar-1.svg';

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
  icon: string;
  iconSolid: string;
}

const Sidebar = styled(Box)({
  width: 84,
  background: '#F8FAFC',
  borderRight: '1px solid #E5E7EB',
  height: '100vh',
  position: 'fixed',
  top: 76, // below header
  left: 0,
  zIndex: 1100,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: 18,
  gap: 6,
});

const SidebarNavItem = styled(Box)<{ active?: boolean }>(({ active }) => ({
  width: 68,
  height: 'auto',
  padding: '8px 8px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 12,
  background: active ? '#E6F1F8' : 'transparent',
  cursor: 'pointer',
  marginBottom: 4,
  position: 'relative',
  '&:hover': {
    background: '#F0F4F8',
  },
}));

const SidebarIcon = styled('img')({
  width: 22,
  height: 22,
  marginBottom: 4,
});

const SidebarNavText = styled(Typography)<{ active?: boolean }>(({ active }) => ({
  fontSize: 12,
  color: active ? '#004C6F' : '#697586',
  fontWeight: active ? 600 : 400,
  textAlign: 'center',
}));

const SidebarNotificationBadge = styled(Box)({
  position: 'absolute',
  top: 6,
  right: 6,
  backgroundColor: '#F70014',
  color: '#FFFFFF',
  borderRadius: 100,
  padding: '2px 6px',
  fontSize: 11,
  lineHeight: '12px',
  border: '1px solid #FFFFFF',
  minWidth: 18,
  height: 18,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2,
});

const navItems: NavItemData[] = [
  { id: 'home', label: 'Home', icon: HomeIcon, iconSolid: HomeIconSolid },
  { id: 'patients', label: 'Patients', icon: UsersIcon, iconSolid: UsersIconSolid },
  { id: 'tasks', label: 'Tasks', icon: ClipboardIcon, iconSolid: ClipboardIconSolid },
  { id: 'leads', label: 'Leads', icon: MagnifyingGlassIcon, iconSolid: MagnifyingGlassIconSolid, notifications: 24 },
  { id: 'messages', label: 'Messages', icon: ChatIcon, iconSolid: ChatIconSolid, notifications: 5 },
  { id: 'reports', label: 'Reports', icon: DocumentIcon, iconSolid: DocumentIconSolid },
  { id: 'calendar', label: 'Calendar', icon: CalendarIcon, iconSolid: CalendarIconSolid },
];

const Content: React.FC = () => {
  const { isCollapsed, toggleCollapse } = useLeftPaneContext();
  const { activeTab, setActiveTab } = useNavigation();

  // Auto-collapse patient queue pane when not on home page
  useEffect(() => {
    if (activeTab !== 'home' && !isCollapsed) {
      toggleCollapse();
    }
    // Do not auto-expand when returning to home
    // eslint-disable-next-line
  }, [activeTab]);

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
    <Box sx={{ height: '100%', width: '100%' }}>
      <Sidebar>
        {navItems.map((item) => (
          <SidebarNavItem
            key={item.id}
            active={activeTab === item.id}
            onClick={() => setActiveTab(item.id as any)}
          >
            <SidebarIcon src={activeTab === item.id ? item.iconSolid : item.icon} alt={item.label} />
            <SidebarNavText active={activeTab === item.id}>{item.label}</SidebarNavText>
            {item.notifications && (
              <SidebarNotificationBadge>{item.notifications}</SidebarNotificationBadge>
            )}
          </SidebarNavItem>
        ))}
      </Sidebar>
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          height: '100%',
          overflow: 'auto',
          background: '#FFFFFF',
          marginLeft: '76px',
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
};

export default Content; 