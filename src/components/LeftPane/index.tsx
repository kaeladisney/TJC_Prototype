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

const PaneWrapper = styled(Box)<{ isCollapsed: boolean }>(({ isCollapsed }) => ({
  width: isCollapsed ? 88 : 450,
  height: 'calc(100vh - 76px)', // Subtract header height
  backgroundColor: '#F8FAFC',
  position: 'fixed',
  left: 0,
  top: 76, // Position below header
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.12)',
  transition: 'width 0.3s ease-in-out',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 100 // Increased z-index to ensure it's above other content
}));

const Header = styled(Box)<{ isCollapsed: boolean }>(({ isCollapsed }) => ({
  width: '100%',
  height: 76,
  borderBottom: '1px solid #E2E2E6',
  padding: isCollapsed ? '27px 0' : '16px 24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  backgroundColor: '#F8FAFC', // Match parent background color
  zIndex: 101 // Higher than PaneWrapper
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
  height: 'calc(100vh - 152px)', // Subtract both headers
  overflowY: 'auto',
  position: 'relative',
  zIndex: 99, // Lower than PaneWrapper
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: isCollapsed ? '12px' : '24px'
}));

const IconWrapper = styled(Box)<{ isCollapsed: boolean }>(({ isCollapsed }) => ({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 22,
  height: 22,
  '&:hover': {
    opacity: 0.8,
  },
  ...(isCollapsed && {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
  })
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
  gap: isCollapsed ? '12px' : '12px',
  width: '100%',
  alignItems: isCollapsed ? 'center' : 'stretch',
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

interface Status {
  label: 'New' | 'Special' | 'Forms' | 'Urgent';
  color: string;
  bgColor: string;
}

interface Patient {
  name: string;
  initials: string;
  statuses: Status[];
  details: {
    dcPreference: string;
    planType: string;
    cycleDate: string;
  };
  isExpanded: boolean;
}

const LeftPane: React.FC = () => {
  const { isCollapsed, toggleCollapse } = useLeftPaneContext();
  const [patients, setPatients] = useState<Patient[]>([
    {
      name: 'Thomas Newman',
      initials: 'TN',
      statuses: [
        {
          label: 'New' as const,
          color: '#008D3E',
          bgColor: '#E2FFE9',
        },
        {
          label: 'Urgent' as const,
          color: '#B15A17',
          bgColor: '#FFEBDC',
        },
        {
          label: 'Forms' as const,
          color: '#026AA2',
          bgColor: '#E0F2FE',
        }
      ],
      details: {
        dcPreference: 'Dr. Will Murillo, D.C.',
        planType: 'Wellness Plan',
        cycleDate: '1/15/2024',
      },
      isExpanded: true,
    },
    {
      name: 'Sarah Johnson',
      initials: 'SJ',
      statuses: [
        {
          label: 'Special' as const,
          color: '#6941C6',
          bgColor: '#F4F3FF',
        },
        {
          label: 'Forms' as const,
          color: '#026AA2',
          bgColor: '#E0F2FE',
        },
        {
          label: 'New' as const,
          color: '#008D3E',
          bgColor: '#E2FFE9',
        },
        {
          label: 'Urgent' as const,
          color: '#B15A17',
          bgColor: '#FFEBDC',
        }
      ],
      details: {
        dcPreference: 'none',
        planType: '20 Visits',
        cycleDate: '2/1/2024',
      },
      isExpanded: false,
    },
  ]);

  const [patientsWithDoctor, setPatientsWithDoctor] = useState<Patient[]>([
    {
      name: 'Michael Chang',
      initials: 'MC',
      statuses: [
        {
          label: 'Special' as const,
          color: '#6941C6',
          bgColor: '#F4F3FF',
        },
        {
          label: 'Forms' as const,
          color: '#026AA2',
          bgColor: '#E0F2FE',
        }
      ],
      details: {
        dcPreference: 'Dr. Sarah Miller, D.C.',
        planType: '10 Visits',
        cycleDate: '1/20/2024',
      },
      isExpanded: true,
    },
    {
      name: 'Emily Rodriguez',
      initials: 'ER',
      statuses: [
        {
          label: 'New' as const,
          color: '#008D3E',
          bgColor: '#E2FFE9',
        },
        {
          label: 'Urgent' as const,
          color: '#B15A17',
          bgColor: '#FFEBDC',
        },
        {
          label: 'Forms' as const,
          color: '#026AA2',
          bgColor: '#E0F2FE',
        }
      ],
      details: {
        dcPreference: 'Dr. James Wilson, D.C.',
        planType: '6 Visits',
        cycleDate: '1/25/2024',
      },
      isExpanded: false,
    }
  ]);

  const [completedPatients, setCompletedPatients] = useState<Patient[]>([
    {
      name: 'Robert Martinez',
      initials: 'RM',
      statuses: [
        {
          label: 'Forms' as const,
          color: '#026AA2',
          bgColor: '#E0F2FE',
        },
        {
          label: 'Special' as const,
          color: '#6941C6',
          bgColor: '#F4F3FF',
        }
      ],
      details: {
        dcPreference: 'Dr. Sarah Miller, D.C.',
        planType: '6 Visits',
        cycleDate: '1/22/2024',
      },
      isExpanded: true,
    },
    {
      name: 'Lisa Thompson',
      initials: 'LT',
      statuses: [
        {
          label: 'New' as const,
          color: '#008D3E',
          bgColor: '#E2FFE9',
        },
        {
          label: 'Forms' as const,
          color: '#026AA2',
          bgColor: '#E0F2FE',
        }
      ],
      details: {
        dcPreference: 'Dr. Will Murillo, D.C.',
        planType: 'Initial Visit',
        cycleDate: '1/23/2024',
      },
      isExpanded: false,
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
        targetArray = [...patients];
        setFunction = setPatients;
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
        targetArray = [...patients];
        setFunction = setPatients;
    }

    if (index === targetArray.length - 1) return;
    [targetArray[index], targetArray[index + 1]] = [targetArray[index + 1], targetArray[index]];
    setFunction(targetArray);
  };

  const handleViewProfile = (index: number, section: 'checkedIn' | 'withDoctor' | 'completed' = 'checkedIn') => {
    let targetArray;
    switch (section) {
      case 'withDoctor':
        targetArray = patientsWithDoctor;
        break;
      case 'completed':
        targetArray = completedPatients;
        break;
      default:
        targetArray = patients;
    }
    console.log('View profile:', targetArray[index].name);
  };

  const handleRemove = (index: number, section: 'checkedIn' | 'withDoctor' | 'completed' = 'checkedIn') => {
    switch (section) {
      case 'withDoctor':
        setPatientsWithDoctor(prev => prev.filter((_, i) => i !== index));
        break;
      case 'completed':
        setCompletedPatients(prev => prev.filter((_, i) => i !== index));
        break;
      default:
        setPatients(prev => prev.filter((_, i) => i !== index));
    }
  };

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setPatients((prevPatients) => {
      const newPatients = [...prevPatients];
      const draggedPatient = newPatients[dragIndex];
      newPatients.splice(dragIndex, 1);
      newPatients.splice(hoverIndex, 0, draggedPatient);
      return newPatients;
    });
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <PaneWrapper isCollapsed={isCollapsed}>
        <Header isCollapsed={isCollapsed}>
          <PaneHeaderText isCollapsed={isCollapsed}>Patient Queue</PaneHeaderText>
          <IconWrapper isCollapsed={isCollapsed} onClick={toggleCollapse}>
            {isCollapsed ? <ExpandIcon /> : <CollapseIcon />}
          </IconWrapper>
        </Header>
        <Content isCollapsed={isCollapsed}>
          <StatusHeader />
          <PatientSection isCollapsed={isCollapsed}>
            {patients.map((patient, index) => (
              patient.isExpanded ? (
                <PatientCardExpanded
                  key={patient.name}
                  name={patient.name}
                  initials={patient.initials}
                  details={patient.details}
                  statuses={[
                    { label: 'New', color: '#008D3E', bgColor: '#E2FFE9' },
                    { label: 'Forms', color: '#026AA2', bgColor: '#E0F2FE' }
                  ]}
                  isFirst={index === 0}
                  isLast={index === patients.length - 1}
                  isCheckedInSection={true}
                  index={index}
                  moveCard={moveCard}
                  onMoveUp={() => handleMoveUp(index, 'checkedIn')}
                  onMoveDown={() => handleMoveDown(index, 'checkedIn')}
                  onViewProfile={() => handleViewProfile(index, 'checkedIn')}
                  onRemove={() => handleRemove(index, 'checkedIn')}
                />
              ) : (
                <PatientCard
                  key={patient.name}
                  name={patient.name}
                  initials={patient.initials}
                  statuses={patient.statuses}
                  isFirst={index === 0}
                  isLast={index === patients.length - 1}
                  isCheckedInSection={true}
                  index={index}
                  moveCard={moveCard}
                  onMoveUp={() => handleMoveUp(index, 'checkedIn')}
                  onMoveDown={() => handleMoveDown(index, 'checkedIn')}
                  onViewProfile={() => handleViewProfile(index, 'checkedIn')}
                  onRemove={() => handleRemove(index, 'checkedIn')}
                />
              )
            ))}
          </PatientSection>
          <Box mt={isCollapsed ? 0 : 3}>
            <WithDoctorHeader />
            <PatientSection isCollapsed={isCollapsed}>
              {patientsWithDoctor.map((patient, index) => (
                patient.isExpanded ? (
                  <PatientCardExpanded
                    key={patient.name}
                    name={patient.name}
                    initials={patient.initials}
                    details={patient.details}
                    statuses={[
                      { label: 'Special', color: '#6941C6', bgColor: '#F4F3FF' },
                      { label: 'Forms', color: '#026AA2', bgColor: '#E0F2FE' }
                    ]}
                    isFirst={index === 0}
                    isLast={index === patientsWithDoctor.length - 1}
                    onMoveUp={() => handleMoveUp(index, 'withDoctor')}
                    onMoveDown={() => handleMoveDown(index, 'withDoctor')}
                    onViewProfile={() => handleViewProfile(index, 'withDoctor')}
                    onRemove={() => handleRemove(index, 'withDoctor')}
                  />
                ) : (
                  <PatientCard
                    key={patient.name}
                    name={patient.name}
                    initials={patient.initials}
                    statuses={patient.statuses}
                    isFirst={index === 0}
                    isLast={index === patientsWithDoctor.length - 1}
                    onMoveUp={() => handleMoveUp(index, 'withDoctor')}
                    onMoveDown={() => handleMoveDown(index, 'withDoctor')}
                    onViewProfile={() => handleViewProfile(index, 'withDoctor')}
                    onRemove={() => handleRemove(index, 'withDoctor')}
                  />
                )
              ))}
            </PatientSection>
          </Box>
          <Box mt={isCollapsed ? 0 : 3}>
            <CompletedHeader />
            <PatientSection isCollapsed={isCollapsed}>
              {completedPatients.map((patient, index) => (
                patient.isExpanded ? (
                  <PatientCardExpanded
                    key={patient.name}
                    name={patient.name}
                    initials={patient.initials}
                    details={patient.details}
                    statuses={[
                      { label: 'Forms', color: '#026AA2', bgColor: '#E0F2FE' }
                    ]}
                    isFirst={index === 0}
                    isLast={index === completedPatients.length - 1}
                    onMoveUp={() => handleMoveUp(index, 'completed')}
                    onMoveDown={() => handleMoveDown(index, 'completed')}
                    onViewProfile={() => handleViewProfile(index, 'completed')}
                    onRemove={() => handleRemove(index, 'completed')}
                  />
                ) : (
                  <PatientCard
                    key={patient.name}
                    name={patient.name}
                    initials={patient.initials}
                    statuses={patient.statuses}
                    isFirst={index === 0}
                    isLast={index === completedPatients.length - 1}
                    onMoveUp={() => handleMoveUp(index, 'completed')}
                    onMoveDown={() => handleMoveDown(index, 'completed')}
                    onViewProfile={() => handleViewProfile(index, 'completed')}
                    onRemove={() => handleRemove(index, 'completed')}
                  />
                )
              ))}
            </PatientSection>
          </Box>
        </Content>
      </PaneWrapper>
    </DndProvider>
  );
};

export default LeftPane; 