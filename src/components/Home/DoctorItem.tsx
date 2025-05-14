import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { Doctor } from '../../types/doctor';

const ItemContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  width: '100%',
});

const DoctorSection = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 12,
});

const Avatar = styled(Box)<{ bgcolor: string }>(({ bgcolor }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: bgcolor,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const AvatarText = styled(Typography)({
  fontSize: 14,
  fontWeight: 500,
  color: '#FCFCFD',
});

const InfoContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 0,
});

const DoctorName = styled(Typography)({
  fontSize: 14,
  fontWeight: 500,
  color: '#364152',
  lineHeight: '20px',
  paddingTop: '10px',
});

const PatientInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const Label = styled(Typography)({
  fontSize: 14,
  fontWeight: 400,
  color: '#364152',
  lineHeight: '20px',
});

const Status = styled(Typography)({
  fontSize: 12,
  fontWeight: 400,
  color: '#697586',
  lineHeight: '16px',
  paddingTop: '16px',
});

interface DoctorItemProps {
  doctor: Doctor;
}

const DoctorItem: React.FC<DoctorItemProps> = ({ doctor }) => {
  return (
    <ItemContainer>
      <DoctorSection>
        <Avatar bgcolor={doctor.avatarColor}>
          <AvatarText>{doctor.initials}</AvatarText>
        </Avatar>
        <InfoContainer>
          <DoctorName>{doctor.name}, D.C.</DoctorName>
          {doctor.currentPatient && (
            <PatientInfo>
              <Status>With patient</Status>
              <Label>{doctor.currentPatient.name}</Label>
            </PatientInfo>
          )}
        </InfoContainer>
      </DoctorSection>
    </ItemContainer>
  );
};

export default DoctorItem; 