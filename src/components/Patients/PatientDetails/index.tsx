import React, { useState } from 'react';
import { Box, Typography, styled, Button, Tabs, Tab, IconButton, Menu, MenuItem } from '@mui/material';
import { useLeftPaneContext } from '../../LeftPane/LeftPaneContext';
import { useNavigation } from '../../../context/NavigationContext';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PersonalInformationCard from './PersonalInformationCard';
import PlanInformationCard from './PlanInformationCard';
import FavoriteNotes from './FavoriteNotes';
import ActivitiesCard from './ActivitiesCard';
import HistoryOverviewCard from './HistoryOverviewCard';
import { ActionItems } from './ActionItems';
import { PatientHistory } from './PatientHistory';

// Styled components
const PatientDetailsWrapper = styled(Box)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#FFFFFF',
  overflowY: 'auto',
  overflowX: 'hidden',
  minWidth: 0,
  width: '100%'
});

const ContentContainer = styled(Box)(({ theme }) => ({
  padding: '24px 32px',
  display: 'flex',
  gap: '24px',
  flex: 1,
  minWidth: 0,
  width: '100%',
  [theme.breakpoints.down('lg')]: {
    flexWrap: 'wrap',
    padding: '24px 16px'
  }
}));

const MainContent = styled(Box)({
  flex: '1 1 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  minWidth: 0,
  width: '100%'
});

const SideContent = styled(Box)(({ theme }) => ({
  flex: '0 0 320px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  minWidth: 0,
  [theme.breakpoints.down('lg')]: {
    flex: '1 1 100%',
    width: '100%'
  }
}));

// Mock data generation functions
const generateMockPersonalInfo = (name: string, id: string) => {
  const [firstName, lastName] = name.split(' ');
  return {
    firstName,
    lastName,
    preferredName: firstName,
    dateOfBirth: '1985-05-15',
    age: 38,
    sexAssignedAtBirth: 'Male',
    phone: '(555) 123-4567',
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
    occupation: 'Software Engineer',
    billingAddress: '123 Main St, Gotham City, NY 10001',
    homeAddress: '123 Main St, Gotham City, NY 10001',
  };
};

const generateMockPlanData = (name: string, id: string) => {
  return {
    productType: 'Initial Visit',
    planStatus: 'Active',
    cycleDate: '2024-02-15',
    keytag: 'ABC123',
    arbMonthlyAmount: '$99.99',
    remainingPaymentVisits: 10,
    vtbc: 1,
    keytagId: 'KT123456',
    careCardExpirationDate: '2025-02-15',
    referredBy: 'Online Search',
    payment: 'Credit Card',
  };
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

const generateMockActivities = (name: string, id: string) => {
  return [
    {
      id: '1',
      type: 'visit',
      description: 'Regular adjustment visit',
      date: new Date(),
    },
    {
      id: '2',
      type: 'payment',
      description: 'Monthly payment processed',
      date: new Date(Date.now() - 86400000),
    },
  ];
};

const generateMockHistoryData = (id: string) => {
  return {
    memberSince: '2024-01-15',
    metrics: {
      totalVisits: {
        ytd: 12,
        thisMonth: 3,
      },
      totalPurchases: {
        ytd: 2,
        thisMonth: 1,
      },
    },
  };
};

const PatientDetails: React.FC = () => {
  const { patients } = useLeftPaneContext();
  const { selectedPatientId, setActiveTab: setNavigationTab } = useNavigation();
  const [selectedTab, setSelectedTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Find the selected patient from the patients array
  const selectedPatient = patients.find(patient => patient.id === selectedPatientId);

  // Generate mock data based on the selected patient
  const mockPersonalInfo = selectedPatient 
    ? generateMockPersonalInfo(selectedPatient.name, selectedPatient.id)
    : null;

  const mockPlanData = selectedPatient 
    ? generateMockPlanData(selectedPatient.name, selectedPatient.id)
    : null;

  const mockFavoriteNotes = generateFavoriteNotes(selectedPatient?.id || '');
  const mockActivities = generateMockActivities(selectedPatient?.name || '', selectedPatient?.id || '');
  const mockHistoryData = generateMockHistoryData(selectedPatient?.id || '');

  const handlePersonalInfoEdit = () => {
    // Placeholder for edit functionality
    console.log('Edit personal information');
  };

  const handlePlanInfoEdit = () => {
    // Placeholder for edit functionality
    console.log('Edit plan information');
  };

  return (
    <PatientDetailsWrapper>
      {/* ... existing header code ... */}

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
              <FavoriteNotes notes={mockFavoriteNotes} />
              <ActivitiesCard activities={mockActivities} />
              <HistoryOverviewCard
                memberSince={mockHistoryData.memberSince}
                metrics={mockHistoryData.metrics}
              />
            </SideContent>
          </>
        )}
        {selectedTab === 1 && (
          <Box sx={{ width: '100%' }}>
            <ActionItems patientId={selectedPatientId || ''} />
          </Box>
        )}
        {selectedTab === 2 && (
          <Box sx={{ width: '100%' }}>
            <PatientHistory patientId={selectedPatientId || ''} />
          </Box>
        )}
        {/* Other tabs will be implemented later */}
      </ContentContainer>
    </PatientDetailsWrapper>
  );
};

export default PatientDetails; 