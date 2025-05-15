import React from 'react';
import { Box, Typography, styled, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const Card = styled(Box)({
  backgroundColor: '#FFFFFF',
  borderRadius: '24px',
  border: '1px solid #9AA4B2',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  minWidth: 0,
  width: '100%',
  overflow: 'hidden'
});

const Header = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: '16px',
});

const Title = styled(Typography)({
  color: '#282829',
  fontSize: '20px',
  fontWeight: 500,
  lineHeight: '28px',
});

const EditButton = styled(Button)({
  color: '#004C6F',
  textTransform: 'none',
  padding: '4px 8px',
  gap: '8px',
  '&:hover': {
    backgroundColor: '#F8F9FA',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '16px',
  },
});

const Grid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '24px',
  minWidth: 0,
  width: '100%',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)'
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr'
  }
}));

const InfoField = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  minWidth: 0,
  overflow: 'hidden'
});

const Label = styled(Typography)({
  color: '#697586',
  fontSize: '14px',
  lineHeight: '16px',
});

const Value = styled(Typography)({
  color: '#364152',
  fontSize: '14px',
  lineHeight: '16px',
  fontWeight: 500,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
});

interface PersonalInformationCardProps {
  patient: {
    firstName: string;
    preferredName: string;
    lastName: string;
    dateOfBirth: string;
    age: number;
    sexAssignedAtBirth: string;
    phone: string;
    email: string;
    occupation: string;
    billingAddress: string;
    homeAddress: string;
  };
  onEdit?: () => void;
}

const PersonalInformationCard: React.FC<PersonalInformationCardProps> = ({ patient, onEdit }) => {
  const handleEdit = () => {
    if (onEdit) {
      onEdit();
    }
  };

  return (
    <Card>
      <Header>
        <Title>Personal Information</Title>
        <EditButton startIcon={<EditIcon />} onClick={handleEdit}>
          Edit
        </EditButton>
      </Header>

      <Grid>
        <InfoField>
          <Label>First Name</Label>
          <Value>{patient.firstName}</Value>
        </InfoField>

        <InfoField>
          <Label>Preferred Name</Label>
          <Value>{patient.preferredName}</Value>
        </InfoField>

        <InfoField>
          <Label>Last Name</Label>
          <Value>{patient.lastName}</Value>
        </InfoField>

        <InfoField>
          <Label>Date of Birth</Label>
          <Value>{patient.dateOfBirth}</Value>
        </InfoField>

        <InfoField>
          <Label>Age</Label>
          <Value>{patient.age}</Value>
        </InfoField>

        <InfoField>
          <Label>Sex Assigned at Birth</Label>
          <Value>{patient.sexAssignedAtBirth}</Value>
        </InfoField>

        <InfoField style={{ gridColumn: 'span 2' }}>
          <Label>Phone</Label>
          <Value>{patient.phone}</Value>
        </InfoField>

        <InfoField style={{ gridColumn: 'span 1' }}>
          <Label>Occupation</Label>
          <Value>{patient.occupation}</Value>
        </InfoField>

        <InfoField style={{ gridColumn: 'span 3' }}>
          <Label>Email Address</Label>
          <Value>{patient.email}</Value>
        </InfoField>

        <InfoField style={{ gridColumn: 'span 3' }}>
          <Label>Billing Address</Label>
          <Value>{patient.billingAddress}</Value>
        </InfoField>

        <InfoField style={{ gridColumn: 'span 3' }}>
          <Label>Home Address</Label>
          <Value>{patient.homeAddress}</Value>
        </InfoField>
      </Grid>
    </Card>
  );
};

export default PersonalInformationCard; 