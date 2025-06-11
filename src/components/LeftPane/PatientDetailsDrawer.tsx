import React from 'react';
import { Box, Typography, Button, IconButton, Collapse, Slide } from '@mui/material';
import { styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Patient, StatusBadgeType } from '../../types/patient';
import { useNavigation } from '../../context/NavigationContext';
import { STATUS_COLORS, StatusColorKey } from '../../constants/statusColors';

const DrawerContainer = styled(Box)({
  position: 'fixed',
  top: 76,
  right: 0,
  width: 360,
  height: 'calc(100vh - 76px)',
  zIndex: 200,
  borderLeft: '1px solid #E5E7EB', 
});

const DrawerWrapper = styled(Box)({
  width: '100%',
  height: '100%',
  backgroundColor: '#F8FAFC',
  borderRight: '1px solid #E5E7EB',
  display: 'flex',
  flexDirection: 'column',
});

const Header = styled(Box)({
  padding: '16px 24px',
  borderBottom: '1px solid #E2E2E6',
  backgroundColor: '#F8FAFC',
  position: 'sticky',
  top: 0,
  zIndex: 10,
  height: 77,
  alignContent: 'center',
});

const BackButton = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  cursor: 'pointer',
  padding: 8,
  minWidth: 32,
  minHeight: 32,
  borderRadius: 8,
});

const BackText = styled(Typography)({
  fontSize: '16pt',
  fontWeight: 500,
  color: '#364152',
  lineHeight: '24px',
});

const ScrollableContent = styled(Box)({
  flex: 1,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,
});

const Content = styled(Box)({
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});

const PatientInfoSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

const Avatar = styled(Box)({
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: '#024C6F',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const AvatarText = styled(Typography)({
  fontSize: 14,
  fontWeight: 500,
  color: '#FCFCFD',
});

const PatientName = styled(Typography)({
  fontSize: 16,
  fontWeight: 600,
  color: '#364152',
});

const BadgesContainer = styled(Box)({
  display: 'flex',
  gap: 4,
  flexWrap: 'wrap',
});

const StatusBadge = styled(Box)<{ color: string; bgColor: string }>(({ color, bgColor }) => ({
  height: 24,
  padding: '4px 8px',
  borderRadius: 9999,
  backgroundColor: bgColor,
  display: 'flex',
  alignItems: 'center',
  gap: 4,
}));

const BadgeText = styled(Typography)<{ color: string }>(({ color }) => ({
  fontSize: '12px',
  fontWeight: 500,
  color: color,
  lineHeight: '16px',
})) as typeof Typography;

const InfoGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '16px 24px',
});

const InfoItem = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});

const InfoLabel = styled(Typography)({
  fontSize: 12,
  color: '#697586',
  fontWeight: 400,
});

const InfoValue = styled(Typography)({
  fontSize: 14,
  color: '#364152',
  fontWeight: 400,
});

const ExpandableSection = styled(Box)({
  borderRadius: 12,
  border: '1px solid #9AA4B2',
  overflow: 'hidden',
  marginTop: 12,
});

const ExpandableHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  padding: '12px 16px',
  '&:hover': {
    backgroundColor: '#F8FAFC',
  },
});

const HeaderContent = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const CountBadge = styled(Box)({
  backgroundColor: '#EEF2F6',
  borderRadius: '9999px',
  padding: '2px 8px',
  minWidth: '22px',
  height: '22px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const ExpandableContent = styled(Box)({
  padding: '8px 16px 16px 16px',
  borderTop: '1px solid #E5E7EB',
});

const Footer = styled(Box)({
  padding: '24px',
  backgroundColor: '#F8FAFC',
  borderTop: '1px solid #E5E7EB',
  display: 'flex',
  gap: 8,
  //boxShadow: '0px -1p x 2px 0px rgba(0, 0, 0, 0.12), 0px 0px 2px 0px rgba(0, 0, 0, 0.12)',
});

const SecondaryButton = styled(Button)({
  flex: 1,
  height: 36,
  minWidth: 0,
  color: '#004C6F',
  backgroundColor: '#F2F6F8',
  borderRadius: 8,
  textTransform: 'none',
  fontSize: 13,
  fontWeight: 500,
  padding: '0 10px',
  whiteSpace: 'nowrap',
  '&:hover': {
    backgroundColor: '#E5EEF2',
  },
});

const PrimaryButton = styled(Button)({
  flex: 1,
  height: 36,
  minWidth: 0,
  color: '#FCFCFD',
  backgroundColor: '#004C6F',
  borderRadius: 8,
  textTransform: 'none',
  fontSize: 13,
  fontWeight: 500,
  padding: '0 10px',
  whiteSpace: 'nowrap',
  boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.12)',
  '&:hover': {
    backgroundColor: '#003B56',
  },
});

const ListItem = styled(Box)({
  padding: '8px 0',
  display: 'flex',
  alignItems: 'flex-start',
  gap: 12,
});

const ListItemIcon = styled(Box)({
  width: 6,
  height: 6,
  borderRadius: '50%',
  backgroundColor: '#697586',
  marginTop: 8,
  flexShrink: 0,
});

const ListItemText = styled(Typography)({
  fontSize: 14,
  color: '#364152',
  lineHeight: '24px',
});

const ActionItemsList = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});

const FavoriteNotesList = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});

const POSSIBLE_ACTION_ITEMS = [
  'Call patient to confirm upcoming appointment',
  'Follow up on payment issues (declined card)',
  'Contact patient about expired membership',
  'Schedule follow-up consultation',
  'Review recent lab results',
  'Update insurance information',
  'Send appointment reminder',
  'Check medication refill status',
  'Coordinate with specialist for referral',
  'Review treatment plan progress',
  'Schedule annual wellness check',
  'Update emergency contact information',
  'Follow up on missed appointment',
  'Verify current medications list',
  'Schedule physical therapy session'
];

const getRandomItems = (array: string[], count: number): string[] => {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const getNumberFromString = (str: string, mod: number): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash) % mod;
};

const generateFavoriteNotes = (patientId: string): string[] => {
  const notes: string[] = [];
  
  if (getNumberFromString(patientId + '1', 2) === 0) {
    notes.push('Allergic to aloe');
  }
  if (getNumberFromString(patientId + '2', 2) === 0) {
    notes.push('Pregnant');
  }
  if (getNumberFromString(patientId + '3', 2) === 0) {
    notes.push('Prefers morning appointments');
  }
  if (getNumberFromString(patientId + '4', 2) === 0) {
    notes.push('Service dog present');
  }
  if (getNumberFromString(patientId + '5', 2) === 0) {
    notes.push('Requires wheelchair access');
  }

  return notes;
};

const getStatusColors = (label: StatusBadgeType): { color: string; bgColor: string } => {
  const statusColor = STATUS_COLORS[label as StatusColorKey];
  return statusColor || { color: '#364152', bgColor: '#EEF2F6' };
};

interface PatientDetailsDrawerProps {
  open: boolean;
  patient: Patient | null;
  onClose: () => void;
  onViewProfile: () => void;
  onCheckout: () => void;
  favoriteNotes?: string[];
}

const PatientDetailsDrawer: React.FC<PatientDetailsDrawerProps> = ({
  open,
  patient,
  onClose,
  onViewProfile,
  onCheckout,
  favoriteNotes = [],
}) => {
  const [actionItemsExpanded, setActionItemsExpanded] = React.useState(false);
  const [favoriteNotesExpanded, setFavoriteNotesExpanded] = React.useState(false);
  const { setActiveTab } = useNavigation();

  // Generate random items based on patient ID to maintain consistency
  const actionItems = React.useMemo(() => 
    getRandomItems(POSSIBLE_ACTION_ITEMS, 4),
    [patient?.id] // Re-generate when patient changes
  );

  const handleViewProfile = () => {
    setActiveTab('patients');
    onViewProfile();
  };

  if (!patient) return null;

  return (
    <Slide 
      in={open} 
      direction="left" 
      mountOnEnter 
      unmountOnExit
      timeout={{
        enter: 300,
        exit: 200,
      }}
    >
      <DrawerContainer>
        <DrawerWrapper>
          <Header>
            <BackButton onClick={onClose}>
              <ChevronLeftIcon sx={{ color: '#364152', width: 24, height: 24 }} />
              <BackText>Back</BackText>
            </BackButton>
          </Header>

          <ScrollableContent>
            <Content>
              <PatientInfoSection>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar>
                    <AvatarText>{patient.initials}</AvatarText>
                  </Avatar>
                  <PatientName>{patient.name}</PatientName>
                </Box>

                <BadgesContainer>
                  {patient.statusBadges.map((badge, index) => {
                    const colors = getStatusColors(badge.type);
                    return (
                      <StatusBadge key={index} color={colors.color} bgColor={colors.bgColor}>
                        <BadgeText color={colors.color}>{badge.type}</BadgeText>
                      </StatusBadge>
                    );
                  })}
                </BadgesContainer>

                <InfoGrid>
                  <InfoItem>
                    <InfoLabel>Date of Birth</InfoLabel>
                    <InfoValue>{patient.details.dateOfBirth || 'Not specified'}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Phone Number</InfoLabel>
                    <InfoValue>{patient.details.phoneNumber || 'Not specified'}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Home Clinic</InfoLabel>
                    <InfoValue>{patient.details.homeClinic || 'Not specified'}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Plan Type</InfoLabel>
                    <InfoValue>{patient.details.planType}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Cycle Date</InfoLabel>
                    <InfoValue>{patient.details.cycleDate}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Visits Remaining</InfoLabel>
                    <InfoValue>{patient.details.visitsLeft || 'Not specified'}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Care Cards</InfoLabel>
                    <InfoValue>{patient.details.careCards || '0'}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>DC Preference</InfoLabel>
                    <InfoValue>{patient.details.dcPreference}</InfoValue>
                  </InfoItem>
                </InfoGrid>
              </PatientInfoSection>

              <ExpandableSection>
                <ExpandableHeader onClick={() => setActionItemsExpanded(!actionItemsExpanded)}>
                  <HeaderContent>
                    <Typography variant="subtitle2" color="#364152">
                      Tasks
                    </Typography>
                    <CountBadge>
                      <BadgeText>{actionItems.length}</BadgeText>
                    </CountBadge>
                  </HeaderContent>
                  <IconButton
                    size="small"
                    sx={{
                      transform: actionItemsExpanded ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s',
                    }}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </ExpandableHeader>
                <Collapse in={actionItemsExpanded}>
                  <ExpandableContent>
                    <ActionItemsList>
                      {actionItems.map((item, index) => (
                        <ListItem key={index}>
                          <ListItemIcon />
                          <ListItemText>{item}</ListItemText>
                        </ListItem>
                      ))}
                    </ActionItemsList>
                  </ExpandableContent>
                </Collapse>
              </ExpandableSection>

              <ExpandableSection style={{ marginTop: 8 }}>
                <ExpandableHeader onClick={() => setFavoriteNotesExpanded(!favoriteNotesExpanded)}>
                  <HeaderContent>
                    <Typography variant="subtitle2" color="#364152">
                      Favorite Notes
                    </Typography>
                    <CountBadge>
                      <BadgeText>{favoriteNotes.length}</BadgeText>
                    </CountBadge>
                  </HeaderContent>
                  <IconButton
                    size="small"
                    sx={{
                      transform: favoriteNotesExpanded ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s',
                    }}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </ExpandableHeader>
                <Collapse in={favoriteNotesExpanded}>
                  <ExpandableContent>
                    <FavoriteNotesList>
                      {favoriteNotes.map((note, index) => (
                        <ListItem key={index}>
                          <ListItemIcon />
                          <ListItemText>{note}</ListItemText>
                        </ListItem>
                      ))}
                    </FavoriteNotesList>
                  </ExpandableContent>
                </Collapse>
              </ExpandableSection>

              {/* Automated Summary Section */}
              <Box sx={{ mt: 2 }}>
                <InfoLabel>Automated Summary</InfoLabel>
                <InfoValue>
                  {(() => {
                    // Example pseudo-random assignment based on patient id or name
                    if (!patient.id && !patient.name) return null;
                    const summaries = [
                      "Last seen 3 weeks ago. It's almost their birthday. Prefers to do walk-ins. Was asked 4 times in the last 6 months to upgrade to a plan/package. Has a history of low back pain—responded well to prior adjustments. Usually comes Tuesday and Thursday mornings.",
                      "Patient is a regular visitor, typically arriving after work hours. Has a history of neck stiffness, improved with recent treatments. Missed one appointment last month. Prefers text reminders. Has not yet upgraded to a premium plan.",
                      "Recently completed a care plan. Reports significant improvement in mobility. Enjoys chatting with front desk staff. Has referred two friends in the past year. Birthday is next month.",
                      "Has a recurring membership. Often brings family members for visits. Responds well to adjustments for upper back pain. Usually books appointments online. Last seen 10 days ago."
                    ];
                    // Use patient id or name to pick a summary
                    const key = patient.id || patient.name || '';
                    let hash = 0;
                    for (let i = 0; i < key.length; i++) hash += key.charCodeAt(i);
                    const idx = hash % summaries.length;
                    return summaries[idx];
                  })()}
                </InfoValue>
              </Box>
            </Content>
          </ScrollableContent>

          <Footer>
            <SecondaryButton onClick={handleViewProfile}>
              View patient details
            </SecondaryButton>
            <PrimaryButton onClick={onCheckout}>
              Checkout
            </PrimaryButton>
          </Footer>
        </DrawerWrapper>
      </DrawerContainer>
    </Slide>
  );
};

export default PatientDetailsDrawer; 