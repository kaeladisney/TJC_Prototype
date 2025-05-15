import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { useNavigation } from '../../../../context/NavigationContext';

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#FFFFFF',
  minHeight: '100vh',
  width: '100%',
});

const BreadcrumbsContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '24px 32px 0',
  backgroundColor: '#FFFFFF',
  width: '100%',
  boxSizing: 'border-box',
});

const BreadcrumbInactive = styled(Typography)({
  fontSize: '14px',
  lineHeight: '20px',
  color: '#697586',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const BreadcrumbActive = styled(Typography)({
  fontSize: '14px',
  lineHeight: '20px',
  color: '#282829',
  fontWeight: 500,
});

const BreadcrumbSeparator = styled(Typography)({
  fontSize: '14px',
  lineHeight: '20px',
  color: '#697586',
});

const PageTitle = styled(Typography)({
  fontSize: '24px',
  lineHeight: '32px',
  fontWeight: 500,
  color: '#282829',
  padding: '24px 32px',
});

interface PaymentProps {
  patientId: string;
  patientName: string;
}

export const Payment: React.FC<PaymentProps> = ({ patientId, patientName }) => {
  const { navigateToPatients, navigateToPatientDetails } = useNavigation();

  const handlePatientsClick = () => {
    navigateToPatients();
  };

  const handlePatientClick = () => {
    navigateToPatientDetails(patientId);
  };

  return (
    <Container>
      <BreadcrumbsContainer>
        <BreadcrumbInactive onClick={handlePatientsClick}>Patients</BreadcrumbInactive>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbInactive onClick={handlePatientClick}>{patientName}</BreadcrumbInactive>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbActive>Payment</BreadcrumbActive>
      </BreadcrumbsContainer>
      <PageTitle>Payment</PageTitle>
    </Container>
  );
}; 