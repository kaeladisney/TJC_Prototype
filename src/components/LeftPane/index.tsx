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
  height: 76,
  padding: isCollapsed ? 0 : '16px 24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: isCollapsed ? 'center' : 'space-between',
  backgroundColor: '#F8FAFC',
  position: 'relative',
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
  paddingTop: '0px',
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
  width: 24,
  height: 24,
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.8,
  },
}));

const StatusHeaderWrapper = styled(Box)<{ isCollapsed: boolean }>(({ isCollapsed }) => ({
  display: isCollapsed ? 'none' : 'flex',
  alignItems: 'center',
  gap: 8,
  height: 24,
  width: '100%',
  marginBottom: 12,
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

const StatusHeader: React.FC = () => {
  const { isCollapsed } = useLeftPaneContext();
  return (
    <StatusHeaderWrapper isCollapsed={isCollapsed}>
      <SectionHeaderText isCollapsed={isCollapsed}>Checked In</SectionHeaderText>
      <NotificationBadge isCollapsed={isCollapsed}>
        <BadgeText>2</BadgeText>
      </NotificationBadge>
    </StatusHeaderWrapper>
  );
};

const WithDoctorHeader: React.FC = () => {
  const { isCollapsed } = useLeftPaneContext();
  return (
    <StatusHeaderWrapper isCollapsed={isCollapsed}>
      <SectionHeaderText isCollapsed={isCollapsed}>With Doctor</SectionHeaderText>
      <NotificationBadge isCollapsed={isCollapsed}>
        <BadgeText>2</BadgeText>
      </NotificationBadge>
    </StatusHeaderWrapper>
  );
};

const CompletedHeader: React.FC = () => {
  const { isCollapsed } = useLeftPaneContext();
  return (
    <StatusHeaderWrapper isCollapsed={isCollapsed}>
      <SectionHeaderText isCollapsed={isCollapsed}>Completed</SectionHeaderText>
      <NotificationBadge isCollapsed={isCollapsed}>
        <BadgeText>2</BadgeText>
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
        { type: 'Forms' as StatusBadgeType, label: 'Forms Complete' },
        { type: 'Special' as StatusBadgeType, label: 'Special Care' }
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
        { type: 'New' as StatusBadgeType, label: 'New Patient' },
        { type: 'Forms' as StatusBadgeType, label: 'Forms Pending' }
      ],
      details: {
        dcPreference: 'Dr. Will Murillo, D.C.',
        planType: 'Initial Visit',
        cycleDate: '1/23/2024',
      }
    }
  ]);

  const handleMoveUp = (index: number, section: 'checkedIn' | 'withDoctor' | 'completed' = 'checkedIn') => {
    if (index === 0) return;
    let targetArray;
    let setFunction;
    
    switch (section) {
      case 'withDoctor':
        targetArray = [...patientsWithDoctor];
        setFunction = setPatientsWithDoctor;
        break;
      case 'completed':
        targetArray = [...completedPatients];
        setFunction = setCompletedPatients;
        break;
      default:
        return; // Let context handle checked-in patients
    }

    [targetArray[index - 1], targetArray[index]] = [targetArray[index], targetArray[index - 1]];
    setFunction(targetArray);
  };

  const handleMoveDown = (index: number, section: 'checkedIn' | 'withDoctor' | 'completed' = 'checkedIn') => {
    let targetArray;
    let setFunction;
    
    switch (section) {
      case 'withDoctor':
        targetArray = [...patientsWithDoctor];
        setFunction = setPatientsWithDoctor;
        break;
      case 'completed':
        targetArray = [...completedPatients];
        setFunction = setCompletedPatients;
        break;
      default:
        return; // Let context handle checked-in patients
    }

    if (index === targetArray.length - 1) return;
    [targetArray[index], targetArray[index + 1]] = [targetArray[index + 1], targetArray[index]];
    setFunction(targetArray);
  };

  const handleViewProfile = (patient: Patient) => {
    openDetailsDrawer(patient);
  };

  const handleCheckout = () => {
    // Handle checkout logic
    closeDetailsDrawer();
  };

  const handleRemove = (index: number, section: 'checkedIn' | 'withDoctor' | 'completed' = 'checkedIn') => {
    switch (section) {
      case 'checkedIn':
        removePatient(index);
        break;
      case 'withDoctor':
        setPatientsWithDoctor(prev => prev.filter((_, i) => i !== index));
        break;
      case 'completed':
        setCompletedPatients(prev => prev.filter((_, i) => i !== index));
        break;
    }
  };

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    reorderPatients(dragIndex, hoverIndex);
  }, [reorderPatients]);

  return (
    <DndProvider backend={HTML5Backend}>
      <PaneWrapper isCollapsed={isCollapsed}>
        <Header isCollapsed={isCollapsed}>
          {!isCollapsed && (
            <PaneHeaderText isCollapsed={isCollapsed}>
              Patient Queue
            </PaneHeaderText>
          )}
          <IconWrapper 
            isCollapsed={isCollapsed}
            onClick={toggleCollapse}
          >
            {isCollapsed ? <ExpandIcon /> : <CollapseIcon />}
          </IconWrapper>
        </Header>

        <Content isCollapsed={isCollapsed}>
          <SectionWrapper isCollapsed={isCollapsed}>
            <StatusHeader />
            <PatientSection isCollapsed={isCollapsed}>
              {patients.map((patient, index) => (
                <PatientCard
                  key={patient.id}
                  name={patient.name}
                  initials={patient.initials}
                  statuses={patient.statusBadges.map(badge => ({
                    label: badge.type,
                    color: getStatusColor(badge.type),
                    bgColor: getStatusBgColor(badge.type)
                  }))}
                  isFirst={index === 0}
                  isLast={index === patients.length - 1}
                  isCheckedInSection={true}
                  index={index}
                  moveCard={moveCard}
                  onMoveUp={() => handleMoveUp(index, 'checkedIn')}
                  onMoveDown={() => handleMoveDown(index, 'checkedIn')}
                  onViewProfile={() => handleViewProfile(patient)}
                  onRemove={() => removePatient(index)}
                  onClick={() => handleViewProfile(patient)}
                />
              ))}
            </PatientSection>
          </SectionWrapper>

          <SectionWrapper isCollapsed={isCollapsed}>
            <WithDoctorHeader />
            <PatientSection isCollapsed={isCollapsed}>
              {patientsWithDoctor.map((patient, index) => (
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
                  isLast={index === patientsWithDoctor.length - 1}
                  onMoveUp={() => handleMoveUp(index, 'withDoctor')}
                  onMoveDown={() => handleMoveDown(index, 'withDoctor')}
                  onViewProfile={() => handleViewProfile(patient)}
                  onRemove={() => handleRemove(index, 'withDoctor')}
                  onClick={() => handleViewProfile(patient)}
                />
              ))}
            </PatientSection>
          </SectionWrapper>

          <SectionWrapper isCollapsed={isCollapsed}>
            <CompletedHeader />
            <PatientSection isCollapsed={isCollapsed}>
              {completedPatients.map((patient, index) => (
                <PatientCard
                  key={patient.id}
                  name={patient.name}
                  initials={patient.initials}
                  statuses={patient.statusBadges.map(badge => ({
                    label: badge.type,
                    color: getStatusColor(badge.type),
                    bgColor: getStatusBgColor(badge.type)
                  }))}
                  isFirst={index === 0}
                  isLast={index === completedPatients.length - 1}
                  onMoveUp={() => handleMoveUp(index, 'completed')}
                  onMoveDown={() => handleMoveDown(index, 'completed')}
                  onViewProfile={() => handleViewProfile(patient)}
                  onRemove={() => handleRemove(index, 'completed')}
                  onClick={() => handleViewProfile(patient)}
                />
              ))}
            </PatientSection>
          </SectionWrapper>
        </Content>

        <PatientDetailsDrawer
          open={isDetailsDrawerOpen}
          patient={selectedPatient}
          onClose={closeDetailsDrawer}
          onViewProfile={() => {
            // Handle view profile navigation
            closeDetailsDrawer();
          }}
          onCheckout={handleCheckout}
        />
      </PaneWrapper>
    </DndProvider>
  );
};

const getStatusColor = (type: StatusBadgeType): string => {
  switch (type) {
    case 'New':
      return '#008D3E';
    case 'Special':
      return '#6941C6';
    case 'Forms':
      return '#026AA2';
    case 'Pay':
      return '#B54708';
    case 'Notes':
      return '#175CD3';
    default:
      return '#364152';
  }
};

const getStatusBgColor = (type: StatusBadgeType): string => {
  switch (type) {
    case 'New':
      return '#E2FFE9';
    case 'Special':
      return '#F4F3FF';
    case 'Forms':
      return '#E0F2FE';
    case 'Pay':
      return '#FEF6EE';
    case 'Notes':
      return '#EEF4FF';
    default:
      return '#EEF2F6';
  }
};

export default LeftPane; 