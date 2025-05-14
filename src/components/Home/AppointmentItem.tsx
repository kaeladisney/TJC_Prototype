import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { Appointment } from '../../types/appointment';
import EllipsisHorizontal from '../icons/EllipsisHorizontal';

const ItemContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  width: '100%',
  borderBottom: '1px solid #E5E7EB',
  paddingBottom: '24px',
});

const TimeText = styled(Typography)({
  fontSize: 16,
  fontWeight: 500,
  color: '#282829',
  lineHeight: '24px',
});

const PatientSection = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  
});

const PatientInfo = styled(Box)({
  display: 'flex',
  gap: 12,
  alignItems: 'flex-start',
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
  gap: 4,
  
});

const PatientName = styled(Typography)({
  fontSize: 14,
  fontWeight: 500,
  color: '#364152',
  lineHeight: '20px',
});

const BadgesContainer = styled(Box)({
  display: 'flex',
  gap: 4,
  flexWrap: 'wrap',
});

const StatusBadge = styled(Box)<{ color: string; bgcolor: string }>(({ color, bgcolor }) => ({
  height: 24,
  padding: '4px 8px',
  borderRadius: 9999,
  backgroundColor: bgcolor,
  display: 'flex',
  alignItems: 'center',
  gap: 4,
}));

const BadgeText = styled(Typography)<{ color: string }>(({ color }) => ({
  fontSize: 12,
  fontWeight: 500,
  color: color,
  lineHeight: '16px',
}));

const MenuButton = styled(Box)({
  width: 24,
  height: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.8,
  },
});

const ContactSection = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 0,
  marginRight: '120px',
});

const ContactInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const Label = styled(Typography)({
  fontSize: 12,
  fontWeight: 400,
  color: '#697586',
  lineHeight: '16px',
});

const Value = styled(Typography)({
  fontSize: 14,
  fontWeight: 400,
  color: '#364152',
  lineHeight: '20px',
});

interface AppointmentItemProps {
  appointment: Appointment;
  onMenuClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const AppointmentItem: React.FC<AppointmentItemProps> = ({ appointment, onMenuClick }) => {
  const { time, patient } = appointment;

  return (
    <ItemContainer>
      <TimeText>{time}</TimeText>
      <PatientSection>
        <PatientInfo>
          <Avatar bgcolor={patient.avatarColor}>
            <AvatarText>{patient.initials}</AvatarText>
          </Avatar>
          <InfoContainer>
            <PatientName>{patient.name}</PatientName>
            <BadgesContainer>
              {patient.statuses.map((status, index) => (
                <StatusBadge
                  key={index}
                  color={status.color}
                  bgcolor={status.bgColor}
                >
                  <BadgeText color={status.color}>
                    {status.type}
                  </BadgeText>
                </StatusBadge>
              ))}
            </BadgesContainer>
          </InfoContainer>
        </PatientInfo>
        <MenuButton onClick={onMenuClick}>
          <EllipsisHorizontal />
        </MenuButton>
      </PatientSection>
      <ContactSection>
        <ContactInfo>
          <Label>Phone Number</Label>
          <Value>{patient.phone}</Value>
        </ContactInfo>
        <ContactInfo>
          <Label>Lead Source</Label>
          <Value>{patient.leadSource}</Value>
        </ContactInfo>
      </ContactSection>
    </ItemContainer>
  );
};

export default AppointmentItem; 