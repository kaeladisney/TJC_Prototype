import React, { useState, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useLeftPaneContext } from './LeftPaneContext';
import CollapseIcon from '../icons/Collapse';
import ExpandIcon from '../icons/Expand';
import PatientCard from './PatientCard';
import PatientCardExpanded from './PatientCardExpanded';
import PatientDetailsDrawer from './PatientDetailsDrawer';
import { Patient, StatusBadgeType } from '../../types/patient';
import { useNavigation } from '../../context/NavigationContext';
import { STATUS_COLORS, StatusColorKey } from '../../constants/statusColors';

const getStatusColor = (type: StatusBadgeType): string => {
  const statusColor = STATUS_COLORS[type as StatusColorKey];
  return statusColor?.color || '#364152';
};

const getStatusBgColor = (type: StatusBadgeType): string => {
  const statusColor = STATUS_COLORS[type as StatusColorKey];
  return statusColor?.bgColor || '#EEF2F6';
};

const PaneWrapper = styled(Box)<{ isCollapsed: boolean }>(({ isCollapsed }) => ({
  width: isCollapsed ? 88 : 450,
  height: '100%',
  backgroundColor: '#F8FAFC',
  borderRight: '1px solid #E5E7EB',
  transition: 'width 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}));

const Header = styled(Box)<{ isCollapsed: boolean }>(({ isCollapsed }) => ({
  width: '100%',
  height: 77,
  padding: isCollapsed ? '0 32px' : '16px 24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: isCollapsed ? 'center' : 'space-between',
  backgroundColor: '#F8FAFC',
  position: 'relative',
  borderBottom: '1px solid #E5E7EB',
}));

const PaneHeaderText = styled(Typography)<{ isCollapsed: boolean }>(({ isCollapsed }) => ({
  color: '#004C6F',
  fontSize: 14,
  fontWeight: 600,
  opacity: isCollapsed ? 0 : 1,
  transition: 'opacity 0.2s ease-in-out',
  whiteSpace: 'nowrap',
  flex: 1,
}));

const Content = styled(Box)<{ isCollapsed: boolean }>(({ isCollapsed }) => ({
  padding: isCollapsed ? '12px 0' : '24px',
  paddingTop: '24px',
  flex: 1,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: isCollapsed ? '24px' : '0px',
  '& > *': {  // Ensure all direct children take full width
    width: '100%'
  }
}));

const IconWrapper = styled(Box)<{ isCollapsed: boolean }>(({ isCollapsed }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    opacity: 0.7,
  },
  '& svg': {
    width: 20,
    height: 20,
    color: '#364152',
  },
}));

const StatusHeaderWrapper = styled(Box)<{ isCollapsed: boolean }>(({ isCollapsed }) => ({
  display: isCollapsed ? 'none' : 'flex',
  alignItems: 'center',
  gap: 8,
  height: 24,
  width: '100%',
  marginBottom: 16,
  marginTop: 8,
}));

const SectionHeaderText = styled(Typography)<{ isCollapsed: boolean }>(({ isCollapsed }) => ({
  fontSize: 14,
  fontWeight: 500,
  color: '#282829',
  lineHeight: '24px',
  display: isCollapsed ? 'none' : 'block',
}));

const NotificationBadge = styled(Box)<{ isCollapsed: boolean }>(({ isCollapsed }) => ({
  width: 22,
  height: 22,
  borderRadius: '9999px',
  backgroundColor: '#EEF2F6',
  border: '1px solid #FFFFFF',
  display: isCollapsed ? 'none' : 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const BadgeText = styled(Typography)({
  fontSize: 12,
  fontWeight: 500,
  color: '#364152',
  lineHeight: '16px',
});

const StatusHeader: React.FC<{ count: number }> = ({ count }) => {
  const { isCollapsed } = useLeftPaneContext();
  return (
    <StatusHeaderWrapper isCollapsed={isCollapsed}>
      <SectionHeaderText isCollapsed={isCollapsed}>Checked In</SectionHeaderText>
      <NotificationBadge isCollapsed={isCollapsed}>
        <BadgeText>{count}</BadgeText>
      </NotificationBadge>
    </StatusHeaderWrapper>
  );
};

const WithDoctorHeader: React.FC<{ count: number }> = ({ count }) => {
  const { isCollapsed } = useLeftPaneContext();
  return (
    <StatusHeaderWrapper isCollapsed={isCollapsed}>
      <SectionHeaderText isCollapsed={isCollapsed}>With Doctor</SectionHeaderText>
      <NotificationBadge isCollapsed={isCollapsed}>
        <BadgeText>{count}</BadgeText>
      </NotificationBadge>
    </StatusHeaderWrapper>
  );
};

const CompletedHeader: React.FC<{ count: number }> = ({ count }) => {
  const { isCollapsed } = useLeftPaneContext();
  return (
    <StatusHeaderWrapper isCollapsed={isCollapsed}>
      <SectionHeaderText isCollapsed={isCollapsed}>Completed</SectionHeaderText>
      <NotificationBadge isCollapsed={isCollapsed}>
        <BadgeText>{count}</BadgeText>
      </NotificationBadge>
    </StatusHeaderWrapper>
  );
};

const PatientSection = styled(Box)<{ isCollapsed: boolean }>(({ isCollapsed }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: isCollapsed ? '20px' : '8px',
  width: '100%',
  minWidth: 0,
  alignItems: 'stretch',
  '& > *': {  // Ensure all direct children take full width
    width: '100%'
  }
}));

const SectionWrapper = styled(Box)<{ isCollapsed: boolean }>(({ isCollapsed }) => ({
  width: '100%',
  marginTop: isCollapsed ? '24px' : '12px',
  '&:first-of-type': {
    marginTop: 0
  }
}));

const DraggableItem = styled(Box)({
  cursor: 'move',
  '&.dragging': {
    opacity: 0.5,
  },
  '&.dragover': {
    marginBottom: '24px',
  }
});

interface CardStatus {
  label: StatusBadgeType;
  color: string;
  bgColor: string;
}

const LeftPane: React.FC = () => {
  const { 
    isCollapsed, 
    toggleCollapse, 
    patients, 
    reorderPatients, 
    removePatient,
    selectedPatient,
    isDetailsDrawerOpen,
    openDetailsDrawer,
    closeDetailsDrawer
  } = useLeftPaneContext();
  const { setActiveTab, setSelectedPatientId } = useNavigation();

  // Filter patients by their section status
  const checkedInPatients = patients.filter(patient => patient.details?.section === 'checkedIn');
  const withDoctorPatients = patients.filter(patient => patient.details?.section === 'withDoctor');
  const completedPatients = patients.filter(patient => patient.details?.section === 'completed');

  const handleMoveUp = (index: number, section: 'checkedIn' | 'withDoctor' | 'completed' = 'checkedIn') => {
    if (index === 0) return;
    
    // Calculate the actual index in the full patients array based on the section
    let actualIndex;
    switch (section) {
      case 'withDoctor':
        actualIndex = index + 2;
        break;
      case 'completed':
        actualIndex = index + 4;
        break;
      default:
        actualIndex = index;
    }
    
    if (actualIndex > 0) {
      reorderPatients(actualIndex, actualIndex - 1);
    }
  };

  const handleMoveDown = (index: number, section: 'checkedIn' | 'withDoctor' | 'completed' = 'checkedIn') => {
    // Calculate the actual index and maximum index for the section
    let actualIndex, maxIndex;
    switch (section) {
      case 'withDoctor':
        actualIndex = index + 2;
        maxIndex = 3;
        break;
      case 'completed':
        actualIndex = index + 4;
        maxIndex = 5;
        break;
      default:
        actualIndex = index;
        maxIndex = 1;
    }
    
    if (actualIndex < maxIndex) {
      reorderPatients(actualIndex, actualIndex + 1);
    }
  };

  const handleViewProfile = () => {
    if (selectedPatient) {
      setSelectedPatientId(selectedPatient.id);
      setActiveTab('patient-details');
      closeDetailsDrawer();
    }
  };

  const handleCheckout = () => {
    // Handle checkout logic
    closeDetailsDrawer();
  };

  const handleRemove = (index: number, section: 'checkedIn' | 'withDoctor' | 'completed' = 'checkedIn') => {
    // Calculate the actual index in the full patients array based on the section
    let actualIndex;
    switch (section) {
      case 'withDoctor':
        actualIndex = index + 2;
        break;
      case 'completed':
        actualIndex = index + 4;
        break;
      default:
        actualIndex = index;
    }
    removePatient(actualIndex);
  };

  return (
    <PaneWrapper isCollapsed={isCollapsed}>
      <Header isCollapsed={isCollapsed}>
        {!isCollapsed && <PaneHeaderText isCollapsed={isCollapsed}>Patient Queue</PaneHeaderText>}
        <IconWrapper isCollapsed={isCollapsed} onClick={toggleCollapse}>
          {isCollapsed ? <ExpandIcon /> : <CollapseIcon />}
        </IconWrapper>
      </Header>
      <Content isCollapsed={isCollapsed}>
        <DndProvider backend={HTML5Backend}>
          <SectionWrapper isCollapsed={isCollapsed}>
            <StatusHeader count={checkedInPatients.length} />
            <PatientSection isCollapsed={isCollapsed}>
              {checkedInPatients.map((patient, index) => (
                <PatientCard
                  key={patient.id}
                  id={patient.id}
                  name={patient.name}
                  initials={patient.initials}
                  statuses={patient.statusBadges.map(badge => ({
                    label: badge.type,
                    color: getStatusColor(badge.type),
                    bgColor: getStatusBgColor(badge.type)
                  }))}
                  isFirst={index === 0}
                  isLast={index === checkedInPatients.length - 1}
                  isCheckedInSection={true}
                  index={index}
                  moveCard={(dragIndex, hoverIndex) => reorderPatients(dragIndex, hoverIndex)}
                  onMoveUp={() => handleMoveUp(index)}
                  onMoveDown={() => handleMoveDown(index)}
                  onRemove={() => handleRemove(index)}
                  onClick={() => openDetailsDrawer(patient)}
                />
              ))}
            </PatientSection>
          </SectionWrapper>

          <SectionWrapper isCollapsed={isCollapsed}>
            <WithDoctorHeader count={withDoctorPatients.length} />
            <PatientSection isCollapsed={isCollapsed}>
              {withDoctorPatients.map((patient, index) => (
                <PatientCardExpanded
                  key={patient.id}
                  name={patient.name}
                  initials={patient.initials}
                  statuses={patient.statusBadges.map(badge => ({
                    label: badge.type,
                    color: getStatusColor(badge.type),
                    bgColor: getStatusBgColor(badge.type)
                  }))}
                  details={patient.details}
                  isFirst={index === 0}
                  isLast={index === withDoctorPatients.length - 1}
                  onClick={() => openDetailsDrawer(patient)}
                />
              ))}
            </PatientSection>
          </SectionWrapper>

          <SectionWrapper isCollapsed={isCollapsed}>
            <CompletedHeader count={completedPatients.length} />
            <PatientSection isCollapsed={isCollapsed}>
              {completedPatients.map((patient, index) => (
                <PatientCard
                  key={patient.id}
                  id={patient.id}
                  name={patient.name}
                  initials={patient.initials}
                  statuses={patient.statusBadges.map(badge => ({
                    label: badge.type,
                    color: getStatusColor(badge.type),
                    bgColor: getStatusBgColor(badge.type)
                  }))}
                  isFirst={index === 0}
                  isLast={index === completedPatients.length - 1}
                  onClick={() => openDetailsDrawer(patient)}
                />
              ))}
            </PatientSection>
          </SectionWrapper>
        </DndProvider>
      </Content>

      <PatientDetailsDrawer
        open={isDetailsDrawerOpen}
        onClose={closeDetailsDrawer}
        patient={selectedPatient}
        onCheckout={handleCheckout}
        onViewProfile={handleViewProfile}
      />
    </PaneWrapper>
  );
};

export default LeftPane; 