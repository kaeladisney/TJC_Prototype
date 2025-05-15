import React from 'react';
import { Box, Typography, styled, Button, Tabs, Tab } from '@mui/material';
import { useLeftPaneContext } from '../LeftPane/LeftPaneContext';
import { useNavigation } from '../../context/NavigationContext';
import { STATUS_COLORS, StatusColorKey } from '../../constants/statusColors';

const PatientsWrapper = styled(Box)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#FFFFFF',
});

const PageHeader = styled(Box)({
  padding: '24px',
  borderBottom: '1px solid #E5E7EB',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const PageTitle = styled(Typography)({
  fontSize: 24,
  fontWeight: 500,
  color: '#363A3D',
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
  fontSize: 14,
  fontWeight: 400,
  color: '#282829',
  '&.Mui-selected': {
    color: '#004C6F',
    fontWeight: 600,
  },
});

const ContentArea = styled(Box)({
  flex: 1,
  padding: '24px',
  backgroundColor: '#FFFFFF',
  overflowY: 'auto',
});

const PatientGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '24px',
  padding: '24px',
});

const PatientCard = styled(Box)({
  backgroundColor: '#FFFFFF',
  borderRadius: '12px',
  border: '1px solid #E5E7EB',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  cursor: 'pointer',
  '&:hover': {
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`patient-tabpanel-${index}`}
      aria-labelledby={`patient-tab-${index}`}
      {...other}
      sx={{ flex: 1 }}
    >
      {value === index && children}
    </Box>
  );
};

const Patients: React.FC = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const { patients } = useLeftPaneContext();
  const { setActiveTab, setSelectedPatientId } = useNavigation();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handlePatientClick = (patientId: string) => {
    setSelectedPatientId(patientId);
    setActiveTab('patient-details');
  };

  return (
    <PatientsWrapper>
      <PageHeader>
        <PageTitle>Patients</PageTitle>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#004C6F',
            color: '#FFFFFF',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#003B56',
            },
          }}
        >
          Add New Patient
        </Button>
      </PageHeader>

      <TabsContainer>
        <StyledTabs 
          value={tabValue} 
          onChange={handleTabChange}
          sx={{ px: 3 }}
        >
          <StyledTab label="All Patients" />
          <StyledTab label="Active" />
          <StyledTab label="Inactive" />
          <StyledTab label="Archived" />
        </StyledTabs>
      </TabsContainer>

      <TabPanel value={tabValue} index={0}>
        <ContentArea>
          <PatientGrid>
            {patients.map((patient) => (
              <PatientCard 
                key={patient.id}
                onClick={() => handlePatientClick(patient.id)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: '#024C6F',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  >
                    {patient.initials}
                  </Box>
                  <Typography
                    sx={{
                      fontSize: 16,
                      fontWeight: 500,
                      color: '#364152',
                    }}
                  >
                    {patient.name}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {patient.statusBadges.map((badge, index) => {
                    const statusColor = STATUS_COLORS[badge.type as StatusColorKey] || { color: '#364152', bgColor: '#EEF2F6' };
                    return (
                      <Box
                        key={index}
                        sx={{
                          height: 24,
                          padding: '4px 8px',
                          borderRadius: 9999,
                          backgroundColor: statusColor.bgColor,
                          color: statusColor.color,
                          fontSize: 12,
                          fontWeight: 500,
                          lineHeight: '16px',
                        }}
                      >
                        {badge.type}
                      </Box>
                    );
                  })}
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                  <Box>
                    <Typography sx={{ fontSize: 12, color: '#697586' }}>
                      DC Preference
                    </Typography>
                    <Typography sx={{ fontSize: 14, color: '#364152' }}>
                      {patient.details.dcPreference}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 12, color: '#697586' }}>
                      Plan Type
                    </Typography>
                    <Typography sx={{ fontSize: 14, color: '#364152' }}>
                      {patient.details.planType}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 12, color: '#697586' }}>
                      Visits Left
                    </Typography>
                    <Typography sx={{ fontSize: 14, color: '#364152' }}>
                      {patient.details.visitsLeft || 'N/A'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 12, color: '#697586' }}>
                      Home Clinic
                    </Typography>
                    <Typography sx={{ fontSize: 14, color: '#364152' }}>
                      {patient.details.homeClinic || 'N/A'}
                    </Typography>
                  </Box>
                </Box>
              </PatientCard>
            ))}
          </PatientGrid>
        </ContentArea>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <ContentArea>
          <Typography>Active patients will be shown here</Typography>
        </ContentArea>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <ContentArea>
          <Typography>Inactive patients will be shown here</Typography>
        </ContentArea>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <ContentArea>
          <Typography>Archived patients will be shown here</Typography>
        </ContentArea>
      </TabPanel>
    </PatientsWrapper>
  );
};

export default Patients; 