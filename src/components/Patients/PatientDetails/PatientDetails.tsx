import React, { useState } from 'react';
import { Box, Typography, styled, Button, Tabs, Tab, IconButton, Menu, MenuItem } from '@mui/material';
import { useLeftPaneContext } from '../../LeftPane/LeftPaneContext';
import { useNavigation } from '../../../context/NavigationContext';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import InfoIcon from '@mui/icons-material/Info';
import PersonalInformationCard from './PersonalInformationCard';
import PlanInformationCard from './PlanInformationCard';
import FavoriteNotes from './FavoriteNotes';
import ActivitiesCard from './ActivitiesCard';
import HistoryOverviewCard from './HistoryOverviewCard';
import { ActionItems } from './ActionItems';
import { PatientHistory } from './PatientHistory';
import { Documents } from './Documents';
import { Notes } from './Notes';
import { Settings } from './Settings';
import { Payment } from './Payment/Payment';
import { STATUS_COLORS } from '../../../constants/statusColors';

const PatientDetailsWrapper = styled(Box)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#FFFFFF',
  overflowY: 'auto',
});

const NotificationBanner = styled(Box)({
  margin: '0 32px 24px 32px',
  height: 80,
  backgroundColor: '#F8FAFF',
  borderRadius: 16,
  padding: '16px',
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  layoutAlign: 'STRETCH',
  layoutGrow: 0,
  layoutMode: 'HORIZONTAL',
  itemSpacing: 10,
});

const InfoIconWrapper = styled(Box)({
  width: 36,
  height: 36,
  borderRadius: '9999px',
  backgroundColor: '#004C6F',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.12)',
  '& svg': {
    width: 20,
    height: 20,
    color: '#FCFCFD',
  },
});

const NotificationContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  flex: 1,
});

const NotificationTitle = styled(Typography)({
  fontSize: 14,
  fontWeight: 400,
  color: '#364152',
  lineHeight: '24px',
});

const NotificationText = styled(Typography)({
  fontSize: 14,
  fontWeight: 400,
  color: '#364152',
  lineHeight: '20px',
});

const ActionButtonsContainer = styled(Box)({
  display: 'flex',
  gap: 24,
});

const ActionButton = styled(Button)({
  fontSize: 14,
  fontWeight: 500,
  color: '#004C6F',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'transparent',
    opacity: 0.8,
  },
});

const BreadcrumbsContainer = styled(Box)({
  padding: '36px 32px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const BreadcrumbText = styled(Typography)({
  fontSize: '14px',
  lineHeight: '20px',
  cursor: 'pointer',
});

const BreadcrumbInactive = styled(BreadcrumbText)({
  color: '#697586',
});

const BreadcrumbActive = styled(BreadcrumbText)({
  color: '#364152',
  fontWeight: 500,
});

const BreadcrumbSeparator = styled(Typography)({
  color: '#9AA4B2',
  fontSize: '14px',
  lineHeight: '20px',
});

const PatientHeaderContainer = styled(Box)({
  padding: '0 32px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

const PatientInfoSection = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
});

const PatientInfo = styled(Box)({
  display: 'flex',
  gap: '16px',
  alignItems: 'flex-start',
});

const Avatar = styled(Box)({
  width: '56px',
  height: '56px',
  borderRadius: '9999px',
  backgroundColor: '#004C6F',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#FCFCFD',
  fontSize: '16px',
  fontWeight: 500,
});

const PatientNameSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const PatientName = styled(Typography)({
  fontSize: '24px',
  lineHeight: '36px',
  color: '#007C88',
  fontWeight: 500,
});

const TagsContainer = styled(Box)({
  display: 'flex',
  gap: '4px',
});

const Tag = styled(Box)(({ color }: { color: string }) => ({
  padding: '4px 8px',
  borderRadius: '9999px',
  backgroundColor: color,
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  height: '24px',
}));

const TagText = styled(Typography)(({ color }: { color: string }) => ({
  fontSize: '12px',
  lineHeight: '16px',
  color: color,
  fontWeight: 500,
}));

const ButtonsContainer = styled(Box)({
  display: 'flex',
  gap: '8px',
});

const CheckoutButton = styled(Button)({
  height: '44px',
  backgroundColor: '#004C6F',
  color: '#FCFCFD',
  textTransform: 'none',
  padding: '10px 16px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: '#003B56',
  },
});

const MoreButton = styled(IconButton)({
  width: '44px',
  height: '44px',
  backgroundColor: '#F2F4F7',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: '#E4E7EC',
  },
});

const TabsContainer = styled(Box)({
  borderBottom: '1px solid #E5E7EB',
});

const StyledTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    backgroundColor: '#004C6F',
  },
});

const StyledTab = styled(Tab)({
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: 500,
  color: '#364152',
  '&.Mui-selected': {
    color: '#004C6F',
  },
});

const StyledMenu = styled(Menu)({
  '& .MuiPaper-root': {
    borderRadius: '8px',
    marginTop: '8px',
    minWidth: 180,
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.08)',
  },
});

const StyledMenuItem = styled(MenuItem)({
  fontSize: '14px',
  padding: '10px 16px',
  color: '#364152',
  '&:hover': {
    backgroundColor: '#F8F9FA',
  },
});

const ContentContainer = styled(Box)({
  padding: '24px 32px',
  display: 'flex',
  gap: '24px',
  flex: 1,
});

const MainContent = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

const SideContent = styled(Box)({
  width: '510px',
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

// Helper function to get a consistent number from a string
const getNumberFromString = (str: string, max: number, min = 0) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash % (max - min)) + min;
};

const generatePhoneNumber = (seed: string) => {
  const hash = seed || 'default';
  const areaCode = 100 + getNumberFromString(hash + '1', 900);
  const prefix = 100 + getNumberFromString(hash + '2', 900);
  const lineNum = 1000 + getNumberFromString(hash + '3', 9000);
  return `${areaCode}-${prefix}-${lineNum}`;
};

const generateEmail = (firstName: string, lastName: string, seed: string) => {
  const emailProviders = ['gmail.com', 'yahoo.com', 'outlook.com', 'icloud.com', 'hotmail.com'];
  const hash = seed || 'default';
  const provider = emailProviders[getNumberFromString(hash, emailProviders.length)];
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${provider}`;
};

const generateAddress = (seed: string, type: 'billing' | 'home') => {
  const hash = (seed || 'default') + type;
  const streetNumbers = [123, 456, 789, 321, 654, 987];
  const streetNames = ['Alpine', 'Maple', 'Oak', 'Cedar', 'Pine', 'Elm'];
  const streetTypes = ['St', 'Ave', 'Blvd', 'Dr', 'Ln', 'Rd'];
  const cities = ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento', 'San Jose', 'Oakland'];
  
  const number = streetNumbers[getNumberFromString(hash + '1', streetNumbers.length)];
  const street = streetNames[getNumberFromString(hash + '2', streetNames.length)];
  const streetType = streetTypes[getNumberFromString(hash + '3', streetTypes.length)];
  const city = cities[getNumberFromString(hash + '4', cities.length)];
  const zipCode = 90000 + getNumberFromString(hash + '5', 10000);
  
  return `${number} ${street} ${streetType}, ${city}, CA ${zipCode}`;
};

const generateOccupation = (seed: string) => {
  const hash = seed || 'default';
  const occupations = [
    'Software Engineer',
    'Marketing Director',
    'Sales Manager',
    'Teacher',
    'Nurse',
    'Business Analyst',
    'Graphic Designer',
    'Project Manager',
    'Chef',
    'Architect'
  ];
  return occupations[getNumberFromString(hash, occupations.length)];
};

const generateFavoriteNotes = (patientName: string, patientId: string) => {
  // Generate unique notes based on patient characteristics
  const notes: string[] = [];
  
  // Add condition-based notes
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

const generateMockPersonalInfo = (patientName: string, patientId: string) => {
  if (!patientName || !patientId) {
    return null;
  }

  // Split the name into parts and handle edge cases
  const nameParts = patientName.trim().split(' ');
  const firstName = nameParts[0] || 'Unknown';
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : 'Unknown';
  
  const hash = patientId || 'default';
  
  // Generate preferred name variations
  const preferredNames = ['', firstName.substring(0, firstName.length - 1), firstName + 'y', firstName.substring(0, 3)];
  const preferredName = preferredNames[getNumberFromString(hash + 'pref', preferredNames.length)] || firstName;
  
  // Generate birth date and age
  const today = new Date();
  const birthYear = 1960 + getNumberFromString(hash + 'year', 50); // Ages between ~15-65
  const birthMonth = getNumberFromString(hash + 'month', 12);
  const birthDay = 1 + getNumberFromString(hash + 'day', 28);
  const birthDate = new Date(birthYear, birthMonth, birthDay);
  const age = today.getFullYear() - birthYear;
  
  // Generate sex assigned at birth
  const sexOptions = ['Female', 'Male', 'Intersex'];
  const sexAssignedAtBirth = sexOptions[getNumberFromString(hash + 'sex', sexOptions.length)];

  return {
    firstName,
    preferredName,
    lastName,
    dateOfBirth: birthDate.toLocaleDateString(),
    age,
    sexAssignedAtBirth,
    phone: generatePhoneNumber(hash),
    email: generateEmail(firstName, lastName, hash),
    occupation: generateOccupation(hash),
    billingAddress: generateAddress(hash, 'billing'),
    homeAddress: generateAddress(hash, 'home'),
  };
};

const generateMockPlanData = (patientName: string, patientId: string) => {
  if (!patientName || !patientId) {
    return null;
  }

  const hash = patientId || 'default';
  
  // Generate a unique monthly amount based on patient ID
  const baseAmount = 20 + getNumberFromString(hash + 'amount', 30);
  
  // Generate unique dates based on patient ID
  const today = new Date();
  const cycleOffset = getNumberFromString(hash + 'cycle', 365);
  const cycleDate = new Date(today.getTime() + cycleOffset * 24 * 60 * 60 * 1000);
  const expirationDate = new Date(cycleDate.getTime() + 365 * 24 * 60 * 60 * 1000);

  // Generate a unique keytag ID
  const keytagId = `#${hash.substring(0, 6).toUpperCase()}`;

  // Different product types based on patient
  const productTypes = ['Walk-In', 'Monthly', 'Annual', 'Premium', 'Family'];
  const productType = productTypes[getNumberFromString(hash + 'product', productTypes.length)];

  // Different referral sources
  const referralSources = ['Google', 'Friend', 'Social Media', 'Doctor', 'Insurance'];
  const referredBy = referralSources[getNumberFromString(hash + 'referral', referralSources.length)];

  // Different payment methods
  const paymentMethods = ['Visa', 'Mastercard', 'Amex', 'Discover'];
  const paymentMethod = paymentMethods[getNumberFromString(hash + 'payment', paymentMethods.length)];
  const lastFour = hash.substring(Math.max(0, hash.length - 4)).padStart(4, '0');

  return {
    productType,
    planStatus: 'Active',
    cycleDate: cycleDate.toLocaleDateString(),
    keytag: cycleDate.toLocaleDateString(),
    arbMonthlyAmount: `$${baseAmount}`,
    remainingPaymentVisits: 4 + getNumberFromString(hash + 'visits', 8),
    vtbc: 1 + getNumberFromString(hash + 'vtbc', 3),
    keytagId,
    careCardExpirationDate: expirationDate.toLocaleDateString(),
    referredBy,
    payment: `${paymentMethod} **** **** **** ${lastFour}`,
  };
};

// Add this function to generate mock activities
const generateMockActivities = (patientName: string, patientId: string) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const inFiveDays = new Date(today);
  inFiveDays.setDate(inFiveDays.getDate() + 5);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Generate unique activities based on patient ID
  const activities = [];

  // Add a task for tomorrow
  activities.push({
    type: 'Task',
    description: 'Remind to come in to pay cash for plan',
    date: tomorrow,
  });

  // Add a billing activity in 5 days
  activities.push({
    type: 'Billing',
    description: 'Bill cycle renews',
    date: inFiveDays,
  });

  // Add some overdue tasks based on patient ID
  if (getNumberFromString(patientId + 'overdue1', 2) === 0) {
    activities.push({
      type: 'Task',
      description: 'Follow up on previous appointment',
      date: yesterday,
    });
  }

  // Add some patient-specific tasks
  if (getNumberFromString(patientId + 'task1', 2) === 0) {
    activities.push({
      type: 'Task',
      description: 'Schedule annual check-up',
      date: inFiveDays,
    });
  }

  if (getNumberFromString(patientId + 'task2', 2) === 0) {
    activities.push({
      type: 'Billing',
      description: 'Update payment method',
      date: tomorrow,
    });
  }

  return activities;
};

const generateMockHistoryData = (patientId: string) => {
  const ytdVisits = 50 + getNumberFromString(patientId + 'visits', 50);
  const thisMonthVisits = getNumberFromString(patientId + 'monthly', 5);
  const ytdPurchases = 2 + getNumberFromString(patientId + 'purchases', 5);
  const thisMonthPurchases = getNumberFromString(patientId + 'monthly_purchases', 2);
  
  const memberSinceDate = new Date(2022, 1, 6); // February 6, 2022
  
  return {
    memberSince: memberSinceDate.toLocaleDateString('en-US', { 
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }),
    metrics: {
      totalVisits: {
        ytd: ytdVisits,
        thisMonth: thisMonthVisits
      },
      totalPurchases: {
        ytd: ytdPurchases,
        thisMonth: thisMonthPurchases
      }
    }
  };
};

const PatientDetails: React.FC = () => {
  const { patients } = useLeftPaneContext();
  const { selectedPatientId, setActiveTab: setNavigationTab } = useNavigation();
  const [selectedTab, setSelectedTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [customFavoriteNotes, setCustomFavoriteNotes] = useState<string[]>([]);
  const [showBanner, setShowBanner] = useState(true);

  // Find the selected patient from the patients array
  const selectedPatient = patients.find(patient => patient.id === selectedPatientId);

  // Generate mock data based on the selected patient
  const mockPersonalInfo = selectedPatient 
    ? generateMockPersonalInfo(selectedPatient.name, selectedPatient.id)
    : null;

  const mockPlanData = selectedPatient 
    ? generateMockPlanData(selectedPatient.name, selectedPatient.id)
    : null;

  // Combine generated favorite notes with custom ones
  const allFavoriteNotes = React.useMemo(() => {
    const generatedNotes = generateFavoriteNotes(selectedPatient?.name || '', selectedPatient?.id || '');
    return Array.from(new Set([...generatedNotes, ...customFavoriteNotes]));
  }, [selectedPatient?.id, customFavoriteNotes]);

  const mockActivities = generateMockActivities(selectedPatient?.name || '', selectedPatient?.id || '');
  const mockHistoryData = generateMockHistoryData(selectedPatient?.id || '');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handlePatientsClick = () => {
    setNavigationTab('patients');
  };

  const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuAnchorEl(null);
  };

  const handlePersonalInfoEdit = () => {
    // Placeholder for edit functionality
    console.log('Edit personal information');
  };

  const handlePlanInfoEdit = () => {
    // Placeholder for edit functionality
    console.log('Edit plan information');
  };

  const handleFavoriteNoteToggle = (note: string, isFavorite: boolean) => {
    if (isFavorite) {
      setCustomFavoriteNotes(prev => [...prev, note]);
    } else {
      setCustomFavoriteNotes(prev => prev.filter(n => n !== note));
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const handleCheckoutClick = () => {
    setShowPayment(true);
  };

  const handleSendReminder = () => {
    // TODO: Implement send reminder functionality
    console.log('Sending reminder...');
  };

  const handleSendForms = () => {
    // Dismiss the banner
    setShowBanner(false);
    // TODO: Implement send forms functionality
    console.log('Sending forms...');
  };

  if (showPayment && selectedPatient) {
    return <Payment patientId={selectedPatient.id} patientName={selectedPatient.name} />;
  }

  return (
    <PatientDetailsWrapper>
      <BreadcrumbsContainer>
        <BreadcrumbInactive onClick={handlePatientsClick}>Patients</BreadcrumbInactive>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbActive>{selectedPatient?.name || 'Patient Not Found'}</BreadcrumbActive>
      </BreadcrumbsContainer>

      {selectedPatient?.name === 'Christine Wilson' && showBanner && (
          <NotificationBanner>
            <InfoIconWrapper>
              <InfoIcon />
            </InfoIconWrapper>
            <NotificationContent>
              <NotificationTitle>Intake Forms Expired</NotificationTitle>
              <NotificationText>
                The patient needs to fill out this form before being able to be treated.
              </NotificationText>
            </NotificationContent>
            <ActionButtonsContainer>
              <ActionButton onClick={handleSendReminder}>Send Reminder</ActionButton>
              <ActionButton onClick={handleSendForms}>Send Forms</ActionButton>
            </ActionButtonsContainer>
          </NotificationBanner>
        )}

      <PatientHeaderContainer>
        <PatientInfoSection>
          <PatientInfo>
            <Avatar>{selectedPatient ? getInitials(selectedPatient.name) : ''}</Avatar>
            <PatientNameSection>
              <PatientName>{selectedPatient?.name}</PatientName>
              <TagsContainer>
                {selectedPatient?.statusBadges.map((badge, index) => {
                  const statusColor = STATUS_COLORS[badge.type];
                  return (
                    <Tag key={index} color={statusColor.bgColor}>
                      <TagText color={statusColor.color}>{badge.type}</TagText>
                    </Tag>
                  );
                })}
              </TagsContainer>
            </PatientNameSection>
          </PatientInfo>

          <ButtonsContainer>
            <CheckoutButton variant="contained" onClick={handleCheckoutClick}>
              Checkout
            </CheckoutButton>
            <MoreButton onClick={handleMoreClick}>
              <MoreHorizIcon />
            </MoreButton>
            <StyledMenu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <StyledMenuItem onClick={handleMenuClose}>Add to queue</StyledMenuItem>
              <StyledMenuItem onClick={handleMenuClose}>Add a task</StyledMenuItem>
              <StyledMenuItem onClick={handleMenuClose}>Add notes</StyledMenuItem>
            </StyledMenu>
          </ButtonsContainer>
        </PatientInfoSection>

        <TabsContainer>
          <StyledTabs value={selectedTab} onChange={handleTabChange}>
            <StyledTab label="General" value={0} />
            <StyledTab label="Action Items" value={1} />
            <StyledTab label="Patient History" value={2} />
            <StyledTab label="Documents" value={3} />
            <StyledTab label="Messages" value={4} />
            <StyledTab label="Notes" value={5} />
            <StyledTab label="Settings" value={6} />
          </StyledTabs>
        </TabsContainer>
      </PatientHeaderContainer>

      <ContentContainer>
        {selectedTab === 0 && (
          <>
            <MainContent>
              {mockPersonalInfo && (
                <PersonalInformationCard
                  patient={mockPersonalInfo}
                  onEdit={handlePersonalInfoEdit}
                />
              )}
              {mockPlanData && (
                <PlanInformationCard
                  plan={mockPlanData}
                  onEdit={handlePlanInfoEdit}
                />
              )}
            </MainContent>
            <SideContent>
              <FavoriteNotes notes={allFavoriteNotes} />
              <ActivitiesCard activities={mockActivities} />
              <HistoryOverviewCard
                memberSince={mockHistoryData.memberSince}
                metrics={mockHistoryData.metrics}
              />
            </SideContent>
          </>
        )}
        {selectedTab === 1 && <ActionItems patientId={selectedPatientId || ''} />}
        {selectedTab === 2 && <PatientHistory patientId={selectedPatientId || ''} />}
        {selectedTab === 3 && <Documents patientId={selectedPatientId || ''} />}
        {selectedTab === 4 && <Box>Messages content</Box>}
        {selectedTab === 5 && (
          <Notes 
            patientId={selectedPatientId || ''} 
            favoriteNotes={allFavoriteNotes}
            onFavoriteToggle={handleFavoriteNoteToggle}
          />
        )}
        {selectedTab === 6 && <Settings patientId={selectedPatientId || ''} />}
      </ContentContainer>

      <StyledMenu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <StyledMenuItem onClick={handleMenuClose}>Edit Patient</StyledMenuItem>
        <StyledMenuItem onClick={handleMenuClose}>Delete Patient</StyledMenuItem>
      </StyledMenu>
    </PatientDetailsWrapper>
  );
};

export default PatientDetails; 