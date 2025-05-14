import React from 'react';
import { Box, Typography, styled } from '@mui/material';

const PatientsWrapper = styled(Box)({
  padding: '32px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const PageTitle = styled(Typography)({
  fontSize: 24,
  fontWeight: 500,
  color: '#363A3D',
  marginBottom: 24,
});

const Patients: React.FC = () => {
  return (
    <PatientsWrapper>
      <PageTitle>Patient Management</PageTitle>
      <Typography variant="body1">
        Patient management interface will be implemented here.
      </Typography>
    </PatientsWrapper>
  );
};

export default Patients; 