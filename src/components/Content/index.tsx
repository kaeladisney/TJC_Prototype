import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { useLeftPaneContext } from '../LeftPane/LeftPaneContext';

const ContentWrapper = styled(Box)<{ isLeftPaneCollapsed: boolean }>(({ isLeftPaneCollapsed }) => ({
  backgroundColor: '#FFFFFF',
  width: 'auto',
  flexGrow: 1,
  height: 'calc(100vh - 76px)', // Subtract main header height
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.12)',
  display: 'flex',
  flexDirection: 'column',
  marginLeft: isLeftPaneCollapsed ? 88 : 450,
  transition: 'margin-left 0.3s ease-in-out',
}));

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

const Content: React.FC = () => {
  const { isCollapsed } = useLeftPaneContext();

  return (
    <ContentWrapper isLeftPaneCollapsed={isCollapsed}>
      <NavigationBar>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <NavItem active>
            <NavText active>Home</NavText>
          </NavItem>
          <NavItem>
            <NavText>Tasks</NavText>
            <NotificationBadge>2</NotificationBadge>
          </NavItem>
          <NavItem>
            <NavText>Leads</NavText>
            <NotificationBadge>24</NotificationBadge>
          </NavItem>
          <NavItem>
            <NavText>Messages</NavText>
            <NotificationBadge>5</NotificationBadge>
          </NavItem>
          <NavItem>
            <NavText>Calendar</NavText>
          </NavItem>
          <NavItem>
            <NavText>Patients</NavText>
          </NavItem>
          <NavItem>
            <NavText>Reports</NavText>
          </NavItem>
        </Box>
      </NavigationBar>
      <ScrollableContent>
        {/* Content will be added here */}
      </ScrollableContent>
    </ContentWrapper>
  );
};

export default Content; 