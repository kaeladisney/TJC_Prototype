import React, { useState } from 'react';
import { Box, Typography, styled, Menu, MenuItem, Divider, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DashboardTile from './DashboardTile';
import AppointmentItem from './AppointmentItem';
import DoctorItem from './DoctorItem';
import TasksAndReminders from './TasksAndReminders';
import { DailyPerformance } from '../Performance/DailyPerformance';
import { mockAppointments, mockDoctors } from '../../mockData';

const WelcomeTitle = styled(Typography)({
  fontSize: 24,
  fontWeight: 500,
  color: '#363A3D',
  lineHeight: '36px',
  marginBottom: 24,
});

const TileGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 24,
});

const TileRow = styled(Box)({
  display: 'flex',
  gap: 24,
  marginBottom: 24,
  minWidth: 0,
});

const SmallTile = styled(Box)({
  flex: 1,
  minWidth: 0,
});

const LargeTile = styled(Box)({
  flex: 2,
  minWidth: 0,
});

const AppointmentList = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  padding: '16px 24px',
});

const DoctorList = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: '16px 24px',
});

const StyledDivider = styled(Divider)({
  borderColor: '#E4E7EC',
  margin: '0 24px',
});

type TimeFilter = 'Daily' | 'Monthly';

const Home: React.FC = () => {
  const coordinatorName = "Lisa";
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('Daily');
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = (value?: TimeFilter) => {
    if (value) {
      setTimeFilter(value);
    }
    setFilterAnchorEl(null);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, appointmentId: string) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
    setSelectedAppointment(appointmentId);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedAppointment(null);
  };

  const handleViewProfile = () => {
    // TODO: Implement view profile functionality
    handleMenuClose();
  };

  const handleReschedule = () => {
    // TODO: Implement reschedule functionality
    handleMenuClose();
  };

  const handleCancel = () => {
    // TODO: Implement cancel functionality
    handleMenuClose();
  };

  const handleAddTask = () => {
    // TODO: Implement add task functionality
  };

  const filterButton = (
    <>
      <Button
        endIcon={<ExpandMoreIcon />}
        onClick={handleFilterClick}
        size="small"
        sx={{
          bgcolor: 'grey.100',
          color: 'text.primary',
          minWidth: 'auto',
          padding: '4px 12px',
          '&:hover': {
            bgcolor: 'grey.200',
          },
        }}
      >
        {timeFilter}
      </Button>
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={() => handleFilterClose()}
      >
        <MenuItem onClick={() => handleFilterClose('Daily')}>Daily</MenuItem>
        <MenuItem onClick={() => handleFilterClose('Monthly')}>Monthly</MenuItem>
      </Menu>
    </>
  );

  return (
    <Box sx={{ padding: '32px' }}>
      <WelcomeTitle>
        Hello, {coordinatorName}!
      </WelcomeTitle>
      <TileRow>
        <SmallTile>
          <DashboardTile title="Appointments Today">
            <AppointmentList>
              {mockAppointments.map((appointment) => (
                <AppointmentItem
                  key={appointment.id}
                  appointment={appointment}
                  onMenuClick={(e) => handleMenuClick(e, appointment.id)}
                />
              ))}
            </AppointmentList>
          </DashboardTile>
        </SmallTile>
        <LargeTile>
          <DashboardTile 
            title="Clinic Performance" 
            isLarge
            headerContent={filterButton}
          >
            <DailyPerformance 
              timeFilter={timeFilter}
              onTimeFilterChange={setTimeFilter}
            />
          </DashboardTile>
        </LargeTile>
      </TileRow>
      <TileRow>
        <SmallTile>
          <DashboardTile title="In-Clinic Doctors">
            <DoctorList>
              {mockDoctors.map((doctor, index) => (
                <React.Fragment key={doctor.id}>
                  <DoctorItem doctor={doctor} />
                  {index < mockDoctors.length - 1 && <StyledDivider />}
                </React.Fragment>
              ))}
            </DoctorList>
          </DashboardTile>
        </SmallTile>
        <LargeTile>
          <DashboardTile 
            title="Tasks and Reminders" 
            isLarge
            showAddButton 
            onAddClick={handleAddTask}
          >
            <TasksAndReminders />
          </DashboardTile>
        </LargeTile>
      </TileRow>
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        onClick={(e) => e.stopPropagation()}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleViewProfile}>View patient details</MenuItem>
        <MenuItem onClick={handleReschedule}>Reschedule appointment</MenuItem>
        <MenuItem onClick={handleCancel} sx={{ color: 'error.main' }}>Cancel appointment</MenuItem>
      </Menu>
    </Box>
  );
};

export default Home; 